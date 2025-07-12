/*!
 * JWTAuditor - Author Attribution & Anti-Tampering
 * https://github.com/dr34mhacks/jwtauditor
 * Copyright (c) 2025 Sid Joshi (@dr34mhacks)
 * Licensed under MIT License
 */

const JWTAuditorAuthor = {
    name: 'Sid Joshi',
    github: 'dr34mhacks',
    repository: 'https://github.com/dr34mhacks/jwtauditor',
    website: 'https://jwtauditor.com',
    year: '2025',
    license: 'Apache-2.0',
    
    // Verification methods
    verify: function() {
        return {
            author: this.name,
            github: this.github,
            repo: this.repository,
            created: this.year,
            license: this.license,
            verified: true
        };
    },
    
    // Console signature (will be called on load)
    signature: function() {
        console.log(`%c
     ██╗██╗    ██╗████████╗ █████╗ ██╗   ██╗██████╗ ██╗████████╗ ██████╗ ██████╗ 
     ██║██║    ██║╚══██╔══╝██╔══██╗██║   ██║██╔══██╗██║╚══██╔══╝██╔═══██╗██╔══██╗
     ██║██║ █╗ ██║   ██║   ███████║██║   ██║██║  ██║██║   ██║   ██║   ██║██████╔╝
██   ██║██║███╗██║   ██║   ██╔══██║██║   ██║██║  ██║██║   ██║   ██║   ██║██╔══██╗
╚█████╔╝╚███╔███╔╝   ██║   ██║  ██║╚██████╔╝██████╔╝██║   ██║   ╚██████╔╝██║  ██║
 ╚════╝  ╚══╝╚══╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
                                                                                   
    🔐 JWT Security Testing Platform
    👨‍💻 Created by: ${this.name} (@${this.github})
    🌐 Repository: ${this.repository}
    📅 Year: ${this.year}
    📜 License: ${this.license}
    
    💡 If you find this tool useful, please give it a star on GitHub!
    🐛 Found a bug? Report it at: ${this.repository}/issues
        `, 'color: #00D4AA; font-weight: bold;');
    },
    
    // Embed in global scope
    init: function() {
        // Add to window object for persistence
        if (typeof window !== 'undefined') {
            window.JWTAuditorAuthor = this;
            window.jwtAuditorInfo = this.verify();
        }
        
        // Add to global scope
        if (typeof global !== 'undefined') {
            global.JWTAuditorAuthor = this;
        }
        
        // Show signature
        this.signature();
    }
};

// Initialize on load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        JWTAuditorAuthor.init();
    });
} else {
    // For Node.js environments
    JWTAuditorAuthor.init();
}