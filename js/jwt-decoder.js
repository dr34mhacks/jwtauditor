class JWTDecoder {
    constructor() {
        this.token = null;
        this.header = null;
        this.payload = null;
        this.signature = null;
        this.parts = [];
    }

    // Validate JWT format before decoding
    validateJWTFormat(token) {
        if (!token) {
            throw new Error('JWT token is required');
        }
        
        // Trim whitespace and normalize
        token = token.trim();
        
        // Check if token is empty after trimming
        if (!token) {
            throw new Error('JWT token cannot be empty');
        }
        
        // Check for basic JWT pattern (should contain dots)
        if (!token.includes('.')) {
            throw new Error('Invalid JWT format: Token must contain dots as separators');
        }
        
        // Split the token into parts
        const parts = token.split('.');
        
        // JWT must have exactly 3 parts
        if (parts.length !== 3) {
            throw new Error(`Invalid JWT format: Expected 3 parts separated by dots, got ${parts.length} parts`);
        }
        
        // Check if all parts are non-empty
        for (let i = 0; i < parts.length; i++) {
            if (!parts[i] || parts[i].trim() === '') {
                const partNames = ['header', 'payload', 'signature'];
                throw new Error(`Invalid JWT format: ${partNames[i]} part cannot be empty`);
            }
        }
        
        // Validate base64url format for each part
        const base64UrlPattern = /^[A-Za-z0-9_-]+$/;
        for (let i = 0; i < parts.length; i++) {
            if (!base64UrlPattern.test(parts[i])) {
                const partNames = ['header', 'payload', 'signature'];
                throw new Error(`Invalid JWT format: ${partNames[i]} contains invalid base64url characters`);
            }
        }
        
        return { token, parts };
    }

    // Validate JWT header
    validateHeader(header) {
        if (!header || typeof header !== 'object') {
            throw new Error('Invalid JWT: Header must be a valid JSON object');
        }
        
        // Check for required 'alg' field
        if (!header.alg) {
            throw new Error('Invalid JWT: Header must contain "alg" (algorithm) field');
        }
        
        // Check for valid algorithm
        const supportedAlgorithms = [
            'HS256', 'HS384', 'HS512',  // HMAC
            'RS256', 'RS384', 'RS512',  // RSA
            'ES256', 'ES384', 'ES512',  // ECDSA
            'PS256', 'PS384', 'PS512',  // RSA-PSS
            'none'                      // None algorithm
        ];
        
        if (!supportedAlgorithms.includes(header.alg)) {
            throw new Error(`Invalid JWT: Unsupported algorithm "${header.alg}". Supported algorithms: ${supportedAlgorithms.join(', ')}`);
        }
        
        // Check for 'typ' field if present
        if (header.typ && header.typ !== 'JWT') {
            throw new Error(`Invalid JWT: Token type "${header.typ}" is not supported. Expected "JWT"`);
        }
        
        return true;
    }

    // Validate JWT payload
    validatePayload(payload) {
        if (!payload || typeof payload !== 'object') {
            throw new Error('Invalid JWT: Payload must be a valid JSON object');
        }
        
        // Validate timestamp claims if present
        const timestampClaims = ['iat', 'exp', 'nbf'];
        for (const claim of timestampClaims) {
            if (payload[claim] !== undefined) {
                if (typeof payload[claim] !== 'number' || payload[claim] < 0) {
                    throw new Error(`Invalid JWT: "${claim}" claim must be a positive number (Unix timestamp)`);
                }
            }
        }
        
        // Validate logical timestamp relationships
        if (payload.iat && payload.exp && payload.iat > payload.exp) {
            throw new Error('Invalid JWT: "iat" (issued at) cannot be after "exp" (expiration time)');
        }
        
        if (payload.nbf && payload.exp && payload.nbf > payload.exp) {
            throw new Error('Invalid JWT: "nbf" (not before) cannot be after "exp" (expiration time)');
        }
        
        return true;
    }

    decode(token) {
        try {
            // Step 1: Validate JWT format
            const { token: validatedToken, parts } = this.validateJWTFormat(token);
            
            // Step 2: Decode parts
            let decodedHeader, decodedPayload;
            
            try {
                decodedHeader = base64UrlDecode(parts[0]);
            } catch (error) {
                throw new Error(`Failed to decode JWT header: ${error.message}`);
            }
            
            try {
                decodedPayload = base64UrlDecode(parts[1]);
            } catch (error) {
                throw new Error(`Failed to decode JWT payload: ${error.message}`);
            }
            
            // Step 3: Parse JSON
            let headerObj, payloadObj;
            
            try {
                headerObj = JSON.parse(decodedHeader);
            } catch (error) {
                throw new Error(`Invalid JWT header: Header is not valid JSON - ${error.message}`);
            }
            
            try {
                payloadObj = JSON.parse(decodedPayload);
            } catch (error) {
                throw new Error(`Invalid JWT payload: Payload is not valid JSON - ${error.message}`);
            }
            
            // Step 4: Validate header and payload
            this.validateHeader(headerObj);
            this.validatePayload(payloadObj);
            
            // Step 5: Store results
            this.token = validatedToken;
            this.parts = parts;
            this.header = headerObj;
            this.payload = payloadObj;
            this.signature = parts[2];
            
            return {
                header: this.header,
                payload: this.payload,
                signature: this.signature,
                raw: {
                    header: parts[0],
                    payload: parts[1],
                    signature: parts[2]
                }
            };
            
        } catch (error) {
            // Clear any partial state on error
            this.token = null;
            this.header = null;
            this.payload = null;
            this.signature = null;
            this.parts = [];
            
            throw error;
        }
    }

    isExpired() {
        if (!this.payload || !this.payload.exp) return false;
        return isExpired(this.payload.exp);
    }

    getTimeUntilExpiration() {
        if (!this.payload || !this.payload.exp) return 'No expiration';
        return timeUntilExpiration(this.payload.exp);
    }

    isValidForUse() {
        if (!this.payload) return false;
        const currentTime = getCurrentTimestamp();
        
        // Check expiration
        if (this.payload.exp && this.payload.exp < currentTime) return false;
        
        // Check not before
        if (this.payload.nbf && this.payload.nbf > currentTime) return false;
        
        return true;
    }

    getFormattedPayload() {
        if (!this.payload) return null;
        
        const formatted = { ...this.payload };
        const timestampFields = ['exp', 'iat', 'nbf'];
        
        for (const field of timestampFields) {
            if (formatted[field] && typeof formatted[field] === 'number') {
                formatted[`${field}_formatted`] = formatTimestamp(formatted[field]);
            }
        }
        
        return formatted;
    }

    getAlgorithm() {
        return this.header ? this.header.alg : null;
    }

    usesNoneAlgorithm() {
        return this.getAlgorithm() === 'none';
    }

    usesSymmetricAlgorithm() {
        const alg = this.getAlgorithm();
        return alg && alg.startsWith('HS');
    }

    usesAsymmetricAlgorithm() {
        const alg = this.getAlgorithm();
        return alg && (alg.startsWith('RS') || alg.startsWith('ES') || alg.startsWith('PS'));
    }

    getSigningInput() {
        if (!this.parts || this.parts.length < 2) return '';
        return `${this.parts[0]}.${this.parts[1]}`;
    }

    async verifySignature(secret) {
        if (!this.token) return false;
        
        try {
            const algorithm = this.getAlgorithm();
            
            if (algorithm === 'none') {
                return true;
            }
            
            if (!algorithm.startsWith('HS')) {
                throw new Error(`Algorithm ${algorithm} not supported in fallback mode`);
            }
            
            const signingInput = this.getSigningInput();
            const computedSignature = await computeHmac(algorithm, secret, signingInput);
            const computedSignatureBase64Url = computedSignature
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, '');
            
            return computedSignatureBase64Url === this.signature;
            
        } catch (error) {
            console.error('Error verifying signature:', error);
            return false;
        }
    }
}

// Create global instance
const jwtDecoder = new JWTDecoder();