/*!
 * JWTAuditor - Enhanced JWT Decoder with None Algorithm Support
 * https://github.com/dr34mhacks/jwtauditor
 * Copyright (c) 2025 Sid Joshi (@dr34mhacks)
 * Licensed under Apache-2.0 License
 */

// Enhanced JWT Decoder that supports all none algorithm variations
function enhanceJWTDecoder() {
    if (typeof jwtDecoder === 'undefined') {
        console.error('Original JWT decoder not found');
        return;
    }

    // Store original decode method
    const originalDecode = jwtDecoder.decode.bind(jwtDecoder);
    
    // Enhanced validation for none algorithm variations
    jwtDecoder.validateJWTFormatEnhanced = function(token) {
        if (!token) throw new Error('JWT token is required');
        token = token.trim();
        if (!token) throw new Error('JWT token cannot be empty');
        
        // URL detection
        if (token.startsWith('http') || token.includes('://') || token.includes('www.') || 
            token.includes('.com') || token.includes('.org') || token.includes('.net')) {
            throw new Error('URLs are not valid JWT tokens');
        }
        
        // Text detection
        if (token.includes(' ') && token.split(' ').length > 3) {
            throw new Error('Invalid input: This appears to be text, not a JWT token');
        }
        
        // Minimum length check (reduced for none algorithm tokens)
        if (token.length < 15) {
            throw new Error('Invalid JWT: Token too short to be a valid JWT');
        }
        
        // Must contain dots
        if (!token.includes('.')) {
            throw new Error('Invalid JWT format: Token must contain dots as separators');
        }
        
        const parts = token.split('.');
        
        // Allow 2 or 3 parts (for none algorithm support)
        if (parts.length < 2 || parts.length > 4) {
            throw new Error(`Invalid JWT format: Expected 2-3 parts separated by dots, got ${parts.length} parts`);
        }
        
        // Validate header and payload
        for (let i = 0; i < 2; i++) {
            if (!parts[i] || parts[i].trim() === '') {
                throw new Error(`Invalid JWT format: ${['header', 'payload'][i]} part cannot be empty`);
            }
            
            // Skip malicious payload detection for attack testing
            // this.detectMaliciousPayloads(parts[i]);
            
            if (!/^[A-Za-z0-9_-]+$/.test(parts[i])) {
                throw new Error(`Invalid JWT format: ${['header', 'payload'][i]} contains invalid base64url characters`);
            }
        }
        
        // Enhanced signature validation - allow empty signatures
        if (parts.length >= 3 && parts[2] !== undefined) {
            // Allow empty signature for none algorithm
            if (parts[2] !== '' && !/^[A-Za-z0-9_-]*$/.test(parts[2])) {
                throw new Error('Invalid JWT format: signature contains invalid base64url characters');
            }
        }
        
        return { 
            token: token, 
            parts: parts, 
            hasSignature: !!(parts[2] && parts[2].length > 0) 
        };
    };

    // Enhanced algorithm validation
    jwtDecoder.validateAlgorithmEnhanced = function(alg) {
        // Supported algorithms including all none variations
        const supportedAlgorithms = [
            'HS256', 'HS384', 'HS512',
            'RS256', 'RS384', 'RS512',
            'ES256', 'ES384', 'ES512',
            'PS256', 'PS384', 'PS512',
            'none', 'NONE', 'None',  // Case variations
            '', ' none ', 'none\x00'  // Edge cases
        ];
        
        // Normalize algorithm for comparison
        const normalizedAlg = alg ? alg.trim().toLowerCase().replace(/\x00/g, '') : '';
        
        if (normalizedAlg === 'none' || normalizedAlg === '') {
            return 'none'; // Normalize to 'none'
        }
        
        if (supportedAlgorithms.includes(alg)) {
            return alg;
        }
        
        // Check if it's a case variation of none
        if (['none', 'NONE', 'None'].includes(alg)) {
            return 'none';
        }
        
        throw new Error(`Invalid JWT: Unsupported algorithm "${alg}". Supported algorithms: ${supportedAlgorithms.join(', ')}`);
    };

    // Enhanced decode method
    jwtDecoder.decode = function(token) {
        try {
            const { token: cleanToken, parts, hasSignature } = this.validateJWTFormatEnhanced(token);
            
            // Decode header and payload
            let headerString, payloadString;
            try {
                headerString = base64UrlDecode(parts[0]);
            } catch (error) {
                throw new Error(`Failed to decode JWT header: ${error.message}`);
            }
            
            try {
                payloadString = base64UrlDecode(parts[1]);
            } catch (error) {
                throw new Error(`Failed to decode JWT payload: ${error.message}`);
            }
            
            // Parse JSON
            let header, payload;
            try {
                header = JSON.parse(headerString);
            } catch (error) {
                throw new Error(`Invalid JWT header: Header is not valid JSON - ${error.message}`);
            }
            
            try {
                payload = JSON.parse(payloadString);
            } catch (error) {
                throw new Error(`Invalid JWT payload: Payload is not valid JSON - ${error.message}`);
            }
            
            // Validate header structure
            if (!header || typeof header !== 'object') {
                throw new Error('Invalid JWT: Header must be a valid JSON object');
            }
            
            // Enhanced algorithm validation - allow missing algorithm for edge case testing
            if (header.alg !== undefined) {
                header.alg = this.validateAlgorithmEnhanced(header.alg);
            } else {
                console.warn('JWT header missing algorithm field - treating as none algorithm');
                header.alg = 'none';
            }
            
            // Validate typ header if present (allow case variations)
            if (header.typ && !['JWT', 'jwt'].includes(header.typ)) {
                console.warn(`Non-standard token type "${header.typ}" - expected "JWT" or "jwt"`);
            }
            
            // Validate payload structure
            if (!payload || typeof payload !== 'object') {
                throw new Error('Invalid JWT: Payload must be a valid JSON object');
            }
            
            // Enhanced timestamp validation
            const timestampClaims = ['iat', 'exp', 'nbf'];
            for (const claim of timestampClaims) {
                if (payload[claim] !== undefined) {
                    if (typeof payload[claim] !== 'number' || payload[claim] < 0) {
                        console.warn(`Invalid timestamp in "${claim}" claim: ${payload[claim]}`);
                    }
                }
            }
            
            // Timestamp logic validation
            if (payload.iat && payload.exp && payload.iat > payload.exp) {
                console.warn('JWT "iat" (issued at) is after "exp" (expiration time)');
            }
            
            if (payload.nbf && payload.exp && payload.nbf > payload.exp) {
                console.warn('JWT "nbf" (not before) is after "exp" (expiration time)');
            }
            
            // Warning for none algorithm
            if (header.alg === 'none') {
                if (typeof showNotification === 'function') {
                    showNotification('⚠️ None Algorithm Detected: This token has no signature verification!', 'warning', 7000);
                }
            }
            
            // Warning for missing signature
            if (!hasSignature && header.alg !== 'none') {
                if (typeof showNotification === 'function') {
                    showNotification('⚠️ Missing Signature: Token is missing signature but algorithm is not "none"', 'warning', 5000);
                }
            }
            
            // Store decoded values
            this.token = cleanToken;
            this.parts = parts;
            this.header = header;
            this.payload = payload;
            this.signature = parts[2] || '';
            
            return {
                header: this.header,
                payload: this.payload,
                signature: this.signature,
                raw: {
                    header: parts[0],
                    payload: parts[1],
                    signature: parts[2] || ''
                }
            };
            
        } catch (error) {
            this.token = null;
            this.header = null;
            this.payload = null;
            this.signature = null;
            this.parts = [];
            throw error;
        }
    };

    console.log('✅ JWT Decoder enhanced to support none algorithm variations');
}

// Initialize enhanced decoder when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        enhanceJWTDecoder();
    }, 100);
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceJWTDecoder);
} else {
    enhanceJWTDecoder();
}