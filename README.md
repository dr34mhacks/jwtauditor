# 🔐 JWTAuditor - Advanced JWT Security Testing Platform

<div align="center">

![JWTAuditor Logo](https://img.shields.io/badge/JWT-Auditor-00d4aa?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**Professional JWT security testing platform for penetration testers and cybersecurity professionals**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-jwtauditor.com-00d4aa?style=for-the-badge)](https://jwtauditor.com)
[![GitHub Stars](https://img.shields.io/github/stars/dr34mhacks/jwtauditor?style=for-the-badge&color=yellow)](https://github.com/dr34mhacks/jwtauditor/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/dr34mhacks/jwtauditor?style=for-the-badge&color=red)](https://github.com/dr34mhacks/jwtauditor/issues)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

*Decode • Analyze • Exploit • Secure*

</div>

## 🚀 What is JWTAuditor?

JWTAuditor is a comprehensive, **100% client-side** JWT (JSON Web Token) security testing platform designed by penetration testers, for penetration testers. Born out of real-world frustrations with existing tools, JWTAuditor provides everything you need to audit JWT implementations without compromising your data privacy.

### ✨ Key Features

- 🔍 **Advanced Security Analysis** - Automated vulnerability detection with detailed explanations
- ⚡ **Secret Bruteforcing** - Test against common secrets and custom wordlists
- ✏️ **JWT Editor** - Modify tokens with support for various signing algorithms
- 🔧 **JWT Generator** - Create tokens from scratch with RSA key generation
- 📚 **Comprehensive Documentation** - Learn JWT security with our detailed guides
- 🔒 **100% Client-Side** - Your tokens never leave your browser
- 📱 **Works Everywhere** - No installation required, runs in any modern browser

## 🎯 Why JWTAuditor?

### The Problem We Solved
During penetration testing engagements, we constantly encountered JWT tokens but struggled with:
- Complex tools requiring server-side processing
- Inconsistent tooling across different environments  
- Privacy concerns with online JWT tools
- Limited vulnerability detection capabilities
- Poor documentation and learning resources

### Our Solution
JWTAuditor addresses all these pain points with:
- **Privacy-First Design** - All processing happens locally in your browser
- **Comprehensive Analysis** - Detects 15+ vulnerability types automatically
- **Educational Value** - Each finding includes detailed explanations and remediation advice
- **Professional Grade** - Built by experienced pentesters who understand real-world needs

## 🛠️ Features Deep Dive

### 🔍 Security Analyzer
- Algorithm vulnerability detection (none, weak algorithms, confusion attacks)
- Sensitive data exposure (PII, credentials, credit cards)
- Missing security claims (exp, iss, aud, jti)
- Header injection vulnerabilities (kid parameter attacks)
- Token lifetime and replay attack analysis
- **15+ security checks** with detailed remediation guidance

### ⚡ Secret Bruteforcer
- Built-in JWT secrets wordlist (1000+ common secrets)
- Custom wordlist support with file upload
- Real-time progress tracking
- Supports HS256, HS384, HS512 algorithms
- Web Worker implementation for optimal performance

### ✏️ JWT Editor & Generator
- Visual JSON editor with syntax highlighting
- Support for symmetric (HS*) and asymmetric (RS*) algorithms
- RSA key pair generation for testing
- Signature verification capabilities
- Token manipulation for exploit development

### 📚 Documentation Hub
- JWT fundamentals and best practices
- Comprehensive vulnerability guide
- Attack technique explanations
- Secure implementation guidelines
- Tool-specific usage guides

## 🚀 Quick Start

### Option 1: Use Online (Recommended)
Visit [jwtauditor.com](https://jwtauditor.com) and start testing immediately!

### Option 2: Run Locally
```bash
# Clone the repository
git clone https://github.com/dr34mhacks/jwtauditor.git
cd jwtauditor

# Serve locally (Python 3)
python -m http.server 8000

# Or with Node.js
npx serve .

# Open in browser
open http://localhost:8000
```

## 💡 Usage Examples

### Basic JWT Analysis
1. Navigate to the **Decode & Analyze** tab
2. Paste your JWT token
3. Click **Decode & Analyze**
4. Review the security analysis results

### Secret Bruteforcing
1. Go to the **Secret Bruteforce** tab
2. Paste the JWT token to test
3. Choose between built-in wordlist or custom secrets
4. Click **Start Bruteforce** and wait for results

### Token Manipulation
1. Use the **JWT Editor** tab to modify existing tokens
2. Or create new tokens with the **JWT Generator**
3. Test different algorithms and signing keys
4. Verify signatures with the built-in validator

## 🔒 Security & Privacy

- **🛡️ Zero Data Transmission** - All operations happen client-side
- **🔐 No Server Logs** - We can't see your tokens because we never receive them
- **📴 Offline Capable** - Works without internet connection after initial load
- **🔍 Open Source** - Full transparency, audit the code yourself

## 🤝 Contributing

We welcome contributions from the security community! Here's how you can help:

### 🌟 Star the Project
If JWTAuditor has helped you in your security assessments, please consider giving us a star! It helps others discover the tool and motivates us to keep improving.

[![Star this repo](https://img.shields.io/github/stars/dr34mhacks/jwtauditor?style=social)](https://github.com/dr34mhacks/jwtauditor/stargazers)

### 🐛 Report Issues
Found a bug or have a feature request? [Open an issue](https://github.com/dr34mhacks/jwtauditor/issues/new) and let us know!

**When reporting issues, please include:**
- Browser version and operating system
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable

### 📝 Documentation Improvements
Help us improve our documentation by:
- Fixing typos or unclear explanations
- Adding new vulnerability examples
- Contributing use cases and tutorials
- Translating content to other languages

### 🎯 Areas We Need Help With
- [ ] Additional JWT vulnerability patterns
- [ ] Performance optimizations
- [ ] Mobile UI improvements
- [ ] Browser extension development
- [ ] Integration with other security tools
- [ ] Additional language translations

## 🏗️ Technical Architecture

### Frontend Stack
- **Vanilla JavaScript** - No framework dependencies for maximum compatibility
- **Web Crypto API** - Native cryptographic operations
- **Web Workers** - Background processing for intensive tasks
- **CSS3 with CSS Variables** - Modern, responsive design
- **Font Awesome** - Professional iconography

### Security Libraries
- **CryptoJS** - HMAC operations and hashing
- **jsrsasign** - RSA signature operations
- **Custom JWT Parser** - Optimized for security analysis

## 🎯 Use Cases

### For Penetration Testers
- Analyze JWT tokens during web application assessments
- Test for common JWT vulnerabilities and misconfigurations
- Brute-force weak secrets in controlled environments
- Generate proof-of-concept exploits

### For Developers
- Validate JWT implementations before deployment
- Learn about JWT security best practices
- Test token handling in development environments
- Understand potential attack vectors

### For Security Researchers
- Research new JWT attack techniques
- Analyze real-world JWT implementations
- Contribute to JWT security knowledge base
- Develop new security tools and extensions

### For Educators
- Teach JWT security concepts
- Demonstrate common vulnerabilities
- Provide hands-on learning experiences
- Create security training materials

## 📊 Project Stats

- **🚀 Launched:** July 2025
- **🔍 Vulnerabilities Detected:** 500+ (and counting)
- **👥 Users:** Security professionals worldwide
- **📚 Documentation Pages:** 15+ comprehensive guides
- **🔒 Privacy Violations:** 0 (and always will be)

## 🏆 Recognition & Community

JWTAuditor is proud to be:
- **Community Driven** - Built with feedback from penetration testers
- **Privacy Focused** - No tracking, no analytics, no data collection
- **Educational** - Helping security professionals learn and grow
- **Open Source** - Transparent and auditable codebase

### 🤝 Backed By
[Infosecmania.com](https://infosecmania.com) - Leading cybersecurity community and resource hub

## 📞 Connect With Us

<div align="center">

### 👥 Meet the Team

<table>
<tr>
<td align="center" width="50%">
<a href="https://github.com/dr34mhacks">
<img src="https://github.com/dr34mhacks.png" width="150" height="150" style="border-radius: 50%; border: 3px solid #00d4aa;" alt="Sid Joshi">
</a>
<br><br>
<h3><a href="https://github.com/dr34mhacks" style="text-decoration: none; color: #333;">Siddharth Joshi</a></h3>
<p>
<a href="https://github.com/dr34mhacks">
<img src="https://img.shields.io/badge/GitHub-dr34mhacks-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub">
</a>
<br>
<a href="https://www.linkedin.com/in/sid-j0shi/">
<img src="https://img.shields.io/badge/LinkedIn-sid--j0shi-0077B5?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>
</p>
</td>
<td align="center" width="50%">
<a href="https://github.com/thecybersandeep">
<img src="https://github.com/thecybersandeep.png" width="150" height="150" style="border-radius: 50%; border: 3px solid #00d4aa;" alt="Sandeep Wawdane">
</a>
<br><br>
<h3><a href="https://github.com/thecybersandeep" style="text-decoration: none; color: #333;">Sandeep Wawdane</a></h3>
<p>
<a href="https://github.com/thecybersandeep">
<img src="https://img.shields.io/badge/GitHub-thecybersandeep-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub">
</a>
<br>
<a href="https://www.linkedin.com/in/sandeepwawdane/">
<img src="https://img.shields.io/badge/LinkedIn-sandeepwawdane-0077B5?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>
</p>
</td>
</tr>
</table>

### 🌐 Community Links

[![Website](https://img.shields.io/badge/🌐_Website-jwtauditor.com-00d4aa?style=for-the-badge)](https://jwtauditor.com)
[![Twitter](https://img.shields.io/badge/Twitter-@infosecmania-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/infosecmania)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-infosecmania-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/infosecmania)

</div>

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Legal Disclaimer

JWTAuditor is intended for authorized security testing and educational purposes only. Users are responsible for ensuring they have proper authorization before testing any systems. The developers are not responsible for any misuse of this tool.

## 🙏 Acknowledgments

- **Security Community** - For sharing JWT vulnerabilities and attack techniques
- **Wallarm** - For the comprehensive JWT secrets wordlist
- **PortSwigger** - For JWT security research and documentation
- **Open Source Contributors** - For cryptographic libraries and tools
- **Penetration Testers Worldwide** - For feedback and real-world testing

---

<div align="center">

**⭐ Don't forget to star this repository if it helped you! ⭐**

**Built with ❤️ by security professionals, for security professionals**

*JWTAuditor - Because your tokens deserve better security*

</div>