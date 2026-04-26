export default [
  {
    id: 1,
    name: 'General Security Concepts',
    weight: 12,
    color: '#9B7B4C',
    description: 'Foundational security principles, control types, cryptography, PKI, authentication, and frameworks. Everything the exam builds on.',
    topics: [
      {
        id: 'D1-T1',
        title: 'CIA Triad & Core Security Principles',
        objectives: ['1.1'],
        notes: `The CIA Triad is the cornerstone of information security: Confidentiality, Integrity, and Availability.

**Confidentiality** ensures data is only accessible to authorized parties. Controls include encryption, access controls, data classification, and need-to-know policies. Threats: eavesdropping, unauthorized access, data exfiltration.

**Integrity** ensures data is accurate and has not been altered in an unauthorized way. Controls include hashing (checksums), digital signatures, version control, and audit trails. Threats: data tampering, man-in-the-middle attacks, corruption.

**Availability** ensures systems and data are accessible when needed by authorized users. Controls include redundancy, backups, failover systems, DDoS protection, and disaster recovery planning. Threats: DDoS attacks, ransomware, hardware failure, natural disasters.

**Beyond the Triad:**
- **Non-repudiation**: The sender cannot deny having sent a message. Achieved through digital signatures and audit logs.
- **Authenticity**: Verifying that data or identity is genuine.
- **Privacy**: Protecting personal information from unauthorized disclosure.
- **Safety**: Protecting physical assets and personnel.

**DAD Triad** (the threat model opposite to CIA): Disclosure (breaks Confidentiality), Alteration (breaks Integrity), Destruction/Denial (breaks Availability).

**Least Privilege**: Users/systems should have only the minimum access needed to perform their job.
**Separation of Duties**: No single person should control all aspects of a critical process (prevents fraud).
**Defense in Depth**: Layered security controls so that if one fails, others still protect the system.
**Job Rotation**: Rotating employees through roles reduces fraud risk and builds cross-training.
**Dual Control**: Two authorized people required to perform a sensitive action (e.g., nuclear launch, root access).`,
        keyPoints: [
          'CIA = Confidentiality, Integrity, Availability — the three pillars of information security',
          'Non-repudiation: sender cannot deny sending. Achieved via digital signatures.',
          'Least Privilege: minimum access needed. Separation of Duties: no single point of control.',
          'Defense in depth = layered controls; if one fails, others compensate.',
          'DAD triad = threats to CIA: Disclosure, Alteration, Destruction/Denial',
        ],
        mnemonics: 'CIA → "Confidential spies guard Integrity and Availability of secrets." DAD = the enemy of CIA.',
        acronyms: ['CIA', 'DAD'],
      },
      {
        id: 'D1-T2',
        title: 'Security Controls',
        objectives: ['1.1'],
        notes: `Security controls are safeguards or countermeasures to reduce risk. They are categorized by TYPE and FUNCTION.

**Control Types (by function):**
- **Technical (Logical)**: Software/hardware-based. Examples: firewalls, encryption, IDS/IPS, antivirus, MFA, access control lists.
- **Managerial (Administrative)**: Policies and procedures. Examples: security policies, risk assessments, background checks, security awareness training, change management.
- **Operational**: Day-to-day processes performed by people. Examples: guard patrols, log reviews, incident response procedures, backups.
- **Physical**: Tangible protections. Examples: locks, fences, cameras, badges, biometric access, mantraps/airlocks.

**Control Functions (by purpose):**
- **Preventive**: Stop an incident before it occurs. Examples: firewall rules, access controls, fences.
- **Detective**: Identify incidents that have occurred. Examples: IDS, log monitoring, CCTV cameras, security audits.
- **Corrective**: Restore systems after an incident. Examples: antivirus quarantine, patch management, backups, DR plans.
- **Deterrent**: Discourage attackers without physically stopping them. Examples: warning signs, security cameras (visible), guards, legal notices.
- **Compensating**: Alternative controls when primary controls cannot be implemented. Examples: using extra logging when a system can't be patched.
- **Directive**: Direct people to act in a secure way. Examples: security policies, procedures, training, "No Unauthorized Access" signs.

**Key exam tip**: A control can have BOTH a type and a function. A firewall is technical + preventive. A security camera is physical + detective (also deterrent). Know the overlap!`,
        keyPoints: [
          'Control TYPES: Technical, Managerial, Operational, Physical',
          'Control FUNCTIONS: Preventive, Detective, Corrective, Deterrent, Compensating, Directive',
          'Firewall = Technical + Preventive. Camera = Physical + Detective + Deterrent.',
          'Compensating controls are alternatives when standard controls cannot be implemented.',
          'Directive controls DIRECT behavior — policies, training, signs.',
        ],
        mnemonics: 'Types: "Tell Me Our People" (Technical, Managerial, Operational, Physical). Functions: "Please Don\'t Correct Dumb Cats Directly" (Preventive, Detective, Corrective, Deterrent, Compensating, Directive)',
        acronyms: [],
      },
      {
        id: 'D1-T3',
        title: 'AAA Framework & Authentication',
        objectives: ['1.2'],
        notes: `**AAA = Authentication, Authorization, Accounting**

**Authentication**: Proving you are who you claim to be. Three classic factors:
- **Something you know**: Password, PIN, security question
- **Something you have**: Smart card, hardware token (YubiKey), OTP app, PKI certificate
- **Something you are**: Biometrics — fingerprint, retina, iris, voiceprint, facial recognition
- **Somewhere you are**: Geolocation, IP address, GPS
- **Something you do**: Behavioral biometrics (keystroke dynamics, gait analysis)

**MFA (Multi-Factor Authentication)**: Using 2+ factors from different categories. MFA > 2FA because MFA requires DIFFERENT factor types. Two passwords = NOT MFA.

**Authentication Protocols:**
- **RADIUS**: Remote Authentication Dial-In User Service. UDP-based, encrypts only passwords. Common for Wi-Fi/VPN auth.
- **TACACS+**: Terminal Access Controller Access Control System Plus. TCP-based, encrypts entire session. Preferred for device administration.
- **Kerberos**: Ticket-based SSO system. Uses a Key Distribution Center (KDC) with Authentication Server (AS) and Ticket Granting Server (TGS). Time-sensitive — must be within 5 minutes.
- **LDAP**: Directory service protocol. Queries Active Directory for user/group info.
- **SAML**: XML-based SSO for web apps. Exchanges assertions between IdP and SP.
- **OAuth 2.0**: Authorization framework (not authentication!). Allows third-party access to resources without sharing credentials.
- **OIDC**: OpenID Connect — authentication layer built on top of OAuth 2.0.

**Authorization**: Determining what an authenticated user can do. Access control models:
- **DAC (Discretionary Access Control)**: Owner decides who can access. Flexible but risky.
- **MAC (Mandatory Access Control)**: Labels and clearances. Government/military use.
- **RBAC (Role-Based Access Control)**: Access based on job role. Most common in enterprise.
- **ABAC (Attribute-Based Access Control)**: Access based on attributes (user, resource, environment). Most granular.
- **RuBAC (Rule-Based Access Control)**: Access based on rules (e.g., time of day, IP address).

**Accounting**: Tracking what authenticated users do. Audit logs, SIEM, event logs, session recording.

**PAM (Privileged Access Management)**: Tools that manage admin/root accounts. Features: session recording, just-in-time (JIT) access, vault for passwords, approvals for access.`,
        keyPoints: [
          'AAA = Authentication (who are you?), Authorization (what can you do?), Accounting (what did you do?)',
          'Three classic auth factors: Know / Have / Are. MFA uses 2+ DIFFERENT factor types.',
          'RADIUS: UDP, encrypts password only. TACACS+: TCP, encrypts full session. Use TACACS+ for device admin.',
          'Kerberos: ticket-based, KDC with AS + TGS, 5-minute clock skew limit.',
          'RBAC = role-based (most common). ABAC = most granular. MAC = mandatory (government use).',
          'OAuth = authorization only. OIDC = adds authentication on top of OAuth.',
        ],
        mnemonics: 'AAA = "Are you Authorized? Account for it!" RADIUS vs TACACS+: "Radius is for Remote users, TACACS+ is for Trusted Admin Console"',
        acronyms: ['AAA', 'MFA', 'RADIUS', 'TACACS+', 'LDAP', 'SAML', 'OAuth', 'OIDC', 'DAC', 'MAC', 'RBAC', 'ABAC', 'PAM'],
      },
      {
        id: 'D1-T4',
        title: 'Cryptography Fundamentals',
        objectives: ['1.4'],
        notes: `**Cryptography** is the practice of securing information using mathematical algorithms.

**Symmetric Encryption** (same key to encrypt and decrypt):
- **Fast** — suitable for bulk data encryption.
- Key distribution problem: must securely share the key.
- Examples: **AES** (128, 192, 256-bit — gold standard), **3DES** (legacy, three rounds of DES), **DES** (broken, 56-bit), **RC4** (stream cipher, deprecated in TLS).
- Block ciphers (AES) encrypt fixed-size blocks. Stream ciphers (RC4) encrypt one bit/byte at a time.
- **AES-256** is the exam go-to for strongest symmetric encryption.

**Asymmetric Encryption** (key pair: public key to encrypt, private key to decrypt):
- **Slow** — used for small data (key exchange, digital signatures).
- Solves the key distribution problem.
- Examples: **RSA** (most common, key sizes 2048+ bits), **ECC** (Elliptic Curve — same security with smaller keys, faster), **Diffie-Hellman** (key exchange, not encryption), **DSA** (digital signatures only).
- **ECC** is preferred for mobile/IoT due to efficiency.

**Hashing** (one-way function — input → fixed-length digest):
- Not encryption — cannot reverse a hash.
- Used for: integrity verification, password storage, digital signatures.
- Examples: **MD5** (128-bit, broken/collision-prone — avoid), **SHA-1** (160-bit, deprecated), **SHA-256** (part of SHA-2 family, current standard), **SHA-3** (newer standard), **bcrypt/Argon2** (password hashing with built-in salt+iterations).
- **Salting**: Adding a random value to a password before hashing — defeats rainbow table attacks.
- **Key Stretching**: Running hash many times (iterations) to slow brute force — used by bcrypt, PBKDF2.

**Hybrid Encryption**: Use asymmetric to exchange a symmetric key, then use symmetric for bulk data. (How TLS works.)

**Perfect Forward Secrecy (PFS)**: Each session uses a unique ephemeral key. Compromise of long-term key doesn't compromise past sessions. Achieved via **ECDHE** or **DHE** key exchange.

**Modes of Operation** (how block ciphers handle multiple blocks):
- **ECB** (Electronic Codebook): Each block encrypted independently — INSECURE (patterns visible).
- **CBC** (Cipher Block Chaining): Each block XORed with previous ciphertext. Needs IV.
- **CTR** (Counter): Converts block cipher to stream cipher. Fast, parallelizable.
- **GCM** (Galois/Counter Mode): CTR + authentication tag. Used in AES-GCM for AEAD (authenticated encryption).

**Quantum Concerns**: Shor's algorithm breaks RSA/ECC. Grover's algorithm halves symmetric key strength. NIST post-quantum standards: CRYSTALS-Kyber (key exchange) and CRYSTALS-Dilithium (signatures).`,
        keyPoints: [
          'Symmetric: same key, fast, bulk data. AES-256 is the gold standard.',
          'Asymmetric: key pair (public=encrypt, private=decrypt), slow, key exchange/signatures. RSA, ECC.',
          'Hashing: one-way, integrity. SHA-256 is current standard. MD5/SHA-1 are broken.',
          'Salting defeats rainbow tables. Key stretching (bcrypt/PBKDF2) slows brute force.',
          'Hybrid encryption: asymmetric to exchange key, symmetric for bulk data — how TLS works.',
          'PFS: ephemeral keys per session via ECDHE/DHE — past sessions stay safe if key is compromised.',
          'AES-GCM provides AEAD: encryption + authentication in one operation.',
        ],
        mnemonics: 'Symmetric: "Same key, Super fast." Asymmetric: "A for Anyone (public key), P for Private." Hashing: "One-way street — no U-turns."',
        acronyms: ['AES', 'RSA', 'ECC', 'DES', 'SHA', 'MD5', 'HMAC', 'PFS', 'ECDHE'],
      },
      {
        id: 'D1-T5',
        title: 'PKI & Digital Certificates',
        objectives: ['1.4'],
        notes: `**PKI (Public Key Infrastructure)** is a system that manages digital certificates and public-key encryption.

**Key Components:**
- **CA (Certificate Authority)**: Issues and signs digital certificates. The root of trust.
  - **Root CA**: Offline, top of the hierarchy, issues intermediate CA certs.
  - **Intermediate CA**: Online, issues end-entity certificates on behalf of Root CA.
- **RA (Registration Authority)**: Verifies identity of certificate requestors on behalf of CA.
- **CRL (Certificate Revocation List)**: A list of revoked certificates published by CA. Downloaded periodically.
- **OCSP (Online Certificate Status Protocol)**: Real-time certificate status check. More efficient than CRL.
- **OCSP Stapling**: Web server caches OCSP response and sends it with the certificate — faster.

**Digital Certificates (X.509 format):**
Contains: Subject name, Public key, Issuer (CA) name, Validity period, Serial number, Digital signature of CA.
- **DV (Domain Validated)**: Cheapest, only validates domain ownership.
- **OV (Organization Validated)**: Validates organization identity.
- **EV (Extended Validation)**: Highest assurance, green address bar. Validates full org + legal identity.
- **Wildcard cert**: Covers *.domain.com (all subdomains).
- **SAN cert (Subject Alternative Name)**: Multiple domain names in one cert.
- **Self-signed cert**: Signed by itself, no CA involved — not trusted by browsers by default.

**Certificate Pinning**: Application hardcodes expected certificate/public key. Fails if cert changes.

**CSR (Certificate Signing Request)**: Generated by the entity requesting a cert. Contains public key + identity info. Sent to CA for signing.

**Trust Models:**
- **Single CA**: Simple, single point of failure.
- **Hierarchical (Chain of Trust)**: Root CA → Intermediate CA → End Entity. Most common.
- **Cross-certification**: Two CAs trust each other. Used for federation.
- **Web of Trust**: PGP model — individuals vouch for each other (no central CA).

**Key management lifecycle**: Generate → Distribute → Store → Use → Revoke → Recover → Destroy

**PGP/GPG**: Web of trust model. Used for email encryption and file signing. Not PKI.`,
        keyPoints: [
          'PKI = CA + RA + CRL/OCSP + certificates. Root CA is offline, Intermediate CA is online.',
          'X.509 certificate contains: public key, subject, issuer, validity, CA signature.',
          'CRL = list of revoked certs (downloaded). OCSP = real-time revocation check. OCSP stapling = server caches response.',
          'DV < OV < EV in assurance level. Wildcard = *.domain.com. SAN = multiple domains.',
          'CSR: generated by entity, contains public key, sent to CA for signing.',
          'Chain of Trust: Root → Intermediate → End Entity.',
        ],
        mnemonics: 'PKI: "CA Gives Real Certificates" (CA, Gets, Revocation via CRL). Trust chain: "Root Grows Into Entities" (Root → Intermediate → End Entity).',
        acronyms: ['PKI', 'CA', 'RA', 'CRL', 'OCSP', 'CSR', 'PGP'],
      },
      {
        id: 'D1-T6',
        title: 'Zero Trust & Security Frameworks',
        objectives: ['1.2', '1.5'],
        notes: `**Zero Trust Architecture (ZTA)**
"Never trust, always verify." No implicit trust based on network location.

Core principles:
1. **Verify explicitly**: Always authenticate and authorize based on all available data points (identity, location, device health, service/workload, data classification, anomalies).
2. **Use least privilege access**: Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA).
3. **Assume breach**: Minimize blast radius, segment access, verify end-to-end encryption, use analytics to detect anomalies.

Key components: Identity (strong MFA), Devices (endpoint compliance), Network (microsegmentation), Applications (per-app access), Data (classification/DLP), Infrastructure (workload identity), Visibility & Analytics (SIEM/SOAR).

**ZTNA (Zero Trust Network Access)**: Replaces traditional VPN. Users only get access to specific applications, not the whole network.

---

**NIST Cybersecurity Framework (CSF) 2.0:**
Five core functions: **Identify → Protect → Detect → Respond → Recover**
- Identify: Asset management, risk assessment, governance.
- Protect: Access control, training, data security, maintenance, protective technology.
- Detect: Anomalies, continuous monitoring, detection processes.
- Respond: Response planning, communications, analysis, mitigation.
- Recover: Recovery planning, improvements, communications.

**NIST SP 800-53**: Security and privacy controls for federal information systems.
**NIST SP 800-171**: Protecting Controlled Unclassified Information (CUI) in non-federal systems.
**NIST RMF (Risk Management Framework)**: Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor.

**ISO/IEC 27001**: International standard for Information Security Management Systems (ISMS). Certification-based.
**ISO/IEC 27002**: Code of practice — provides implementation guidance for 27001 controls.

**CIS Controls (Critical Security Controls)**: 18 prioritized controls for cyber defense. Organized in IG1/IG2/IG3 implementation groups.

**SOC (System and Organization Controls) Reports:**
- **SOC 1**: Internal controls over financial reporting.
- **SOC 2**: Trust service criteria (Security, Availability, Confidentiality, Processing Integrity, Privacy). Most relevant for cloud providers.
- **SOC 2 Type I**: Controls design at a point in time. Type II: Controls operating effectiveness over a period.

**Change Management**: Formal process for requesting, reviewing, approving, implementing, and documenting changes to systems. Prevents unauthorized changes. Key roles: Change Advisory Board (CAB), change owner, approver.`,
        keyPoints: [
          'Zero Trust: "Never trust, always verify." Verify explicitly, least privilege, assume breach.',
          'ZTNA replaces VPN: app-level access, not network-wide.',
          'NIST CSF: Identify → Protect → Detect → Respond → Recover.',
          'ISO 27001 = ISMS standard. ISO 27002 = implementation guidance.',
          'SOC 2 Type II = most relevant for evaluating cloud service providers.',
          'Change Management: all changes go through CAB, with formal approval before implementation.',
        ],
        mnemonics: 'NIST CSF: "I People Definitely Respond Reliably" (Identify, Protect, Detect, Respond, Recover).',
        acronyms: ['ZTA', 'ZTNA', 'NIST', 'ISO', 'CIS', 'SOC'],
      },
    ],
  },
  {
    id: 2,
    name: 'Threats, Vulnerabilities & Mitigations',
    weight: 22,
    color: '#7B6B9B',
    description: 'Threat actors, attack techniques, malware, social engineering, vulnerability scanning, and threat intelligence.',
    topics: [
      {
        id: 'D2-T1',
        title: 'Threat Actors & Motivations',
        objectives: ['2.1'],
        notes: `Understanding **who** attacks systems and **why** is critical for threat modeling.

**Threat Actor Categories:**

**Nation-State (Advanced Persistent Threat / APT)**
- Most sophisticated. Funded by governments. Long-term, stealthy campaigns.
- Motivations: Espionage, sabotage, intellectual property theft, political influence.
- High capability, high resources. Examples: APT28 (Russia), APT41 (China), Lazarus Group (North Korea).
- Characteristics: Custom malware, zero-days, supply chain attacks, persistence over months/years.

**Cybercriminals (Organized Crime)**
- Financially motivated. Operate like businesses. May sell access or ransomware-as-a-service.
- Motivations: Financial gain through ransomware, fraud, data theft for sale.

**Insider Threats**
- Employees, contractors, business partners with legitimate access.
- **Malicious insiders**: Intentionally steal/destroy data (disgruntled, financially motivated).
- **Unintentional insiders**: Careless employees who accidentally cause incidents.
- Most dangerous due to authorized access. Controls: least privilege, UBA/UEBA, PAM, exit interviews.

**Hacktivists**
- Ideologically or politically motivated. Disrupt or embarrass targets.
- Common attacks: DDoS, defacement, data leaks. Examples: Anonymous.

**Script Kiddies**
- Low skill. Use pre-built tools/exploits without understanding them.
- Opportunistic. Unskilled but can cause real damage with available tools.

**Competitors**
- Corporate espionage. Steal trade secrets, customer data, R&D.

**Shadow IT**
- Not a threat actor per se, but employees using unauthorized cloud services/devices — creates risk.

**Attributes of Threat Actors:**
- **Capability**: Technical sophistication (low → script kiddie, high → nation-state).
- **Resources**: Financial and personnel resources.
- **Motivation**: Why they attack (money, ideology, espionage, fun).
- **Intent**: What they aim to do (steal, disrupt, destroy).

**Attack Vectors** (how threats reach systems):
Direct access, email, social media, supply chain, removable media, cloud services, wireless, web, telephony.`,
        keyPoints: [
          'Nation-state = most sophisticated, APT, long-term. Script kiddies = low skill, opportunistic.',
          'Insider threats are most dangerous due to authorized access — use UEBA and least privilege.',
          'Motivations: Financial (criminals), Espionage (nation-states), Ideology (hacktivists).',
          'APT = Advanced Persistent Threat = long-term, stealthy, targeted campaign.',
          'Attack vectors include: email, supply chain, web, removable media, wireless, direct access.',
        ],
        mnemonics: 'Threat actors from most to least dangerous: "Nations Inside Criminal Scripts Hack" (Nation-state, Insider, Criminal, Script kiddie, Hacktivist)',
        acronyms: ['APT', 'UEBA'],
      },
      {
        id: 'D2-T2',
        title: 'Social Engineering & Phishing',
        objectives: ['2.2'],
        notes: `**Social engineering** exploits human psychology rather than technical vulnerabilities. It is often the easiest attack vector because humans are the weakest link.

**Phishing Variants:**
- **Phishing**: Mass email campaign impersonating legitimate organizations (banks, IT dept).
- **Spear Phishing**: Targeted phishing at a specific individual using personalized information.
- **Whaling**: Spear phishing targeting executives (CEO, CFO) — high value targets.
- **Vishing**: Voice phishing — phone calls impersonating IT support, IRS, banks.
- **Smishing**: SMS-based phishing. Fake text messages with malicious links.
- **Pharming**: DNS manipulation to redirect users to fake sites even with correct URL.
- **Business Email Compromise (BEC)**: Attacker impersonates exec via email to authorize fraudulent wire transfers.
- **Angler Phishing**: Fake social media accounts impersonating customer support.

**Social Engineering Principles (why it works):**
- **Authority**: "I'm from IT / IRS / your bank — you must comply."
- **Urgency**: "Your account will be locked in 1 hour if you don't act."
- **Scarcity**: "This offer expires now."
- **Social proof**: "Your coworkers already updated their credentials."
- **Intimidation**: Threats of legal action, termination.
- **Familiarity/Liking**: Building rapport before making the malicious request.
- **Consensus**: "Everyone else is doing it."

**Other Social Engineering Attacks:**
- **Pretexting**: Creating a fabricated scenario (pretext) to gain trust. E.g., impersonating an auditor.
- **Baiting**: Leaving infected USB drives in parking lots hoping employees plug them in.
- **Quid Pro Quo**: Offering help (fake tech support) in exchange for credentials.
- **Tailgating/Piggybacking**: Physically following authorized person through a secure door.
- **Watering Hole**: Compromise a website frequented by targets. Victims infect themselves.
- **Typosquatting**: Registering misspelled domain names (gooogle.com) to catch typos.
- **Shoulder Surfing**: Watching someone enter credentials in person or via camera.
- **Dumpster Diving**: Going through trash for sensitive information (printouts, sticky notes).
- **Invoice Scam**: Sending fake invoices for services never rendered.

**Defense:**
- Security awareness training, phishing simulations, email filtering (SPF/DKIM/DMARC), MFA, clear escalation procedures, verify out-of-band (call back on known number).`,
        keyPoints: [
          'Phishing = mass. Spear phishing = targeted. Whaling = targets executives. Vishing = voice. Smishing = SMS.',
          'Social engineering principles: Authority, Urgency, Scarcity, Social proof, Intimidation, Familiarity.',
          'Pretexting = fabricated scenario. Baiting = infected USB. Tailgating = physical access bypass.',
          'Watering hole: compromise site the target visits. They infect themselves.',
          'BEC: exec impersonation via email to authorize wire transfers.',
          'Defenses: training, phishing simulations, email filtering (SPF/DKIM/DMARC), MFA, out-of-band verification.',
        ],
        mnemonics: 'Phishing types: "Spear Whales Via SMS" (Spear, Whaling, Vishing, Smishing). Social engineering: "All Ugly Snakes Scare Idiot Followers" (Authority, Urgency, Scarcity, Social proof, Intimidation, Familiarity)',
        acronyms: ['BEC'],
      },
      {
        id: 'D2-T3',
        title: 'Malware Types & Characteristics',
        objectives: ['2.4'],
        notes: `**Malware** (malicious software) is any software designed to harm systems, steal data, or gain unauthorized access.

**Malware Types:**

**Virus**: Attaches to legitimate files and spreads when the file is executed. Requires human action to spread. Types: file infector, macro virus, boot sector virus, polymorphic (changes signature), metamorphic (rewrites itself).

**Worm**: Self-replicating malware that spreads across networks WITHOUT human interaction. Exploits vulnerabilities. Can cause network disruption even without payload. Example: WannaCry.

**Trojan (Trojan Horse)**: Disguised as legitimate software. Does not self-replicate. Tricks user into executing it. May install backdoors, keyloggers, or RATs.

**Ransomware**: Encrypts victim files and demands payment (usually cryptocurrency) for the decryption key. May also threaten data exposure (double extortion). Modern ransomware often uses asymmetric encryption for the key and symmetric for file encryption.

**Rootkit**: Hides its presence and the presence of other malware by modifying the OS. Operates at kernel level (ring 0) — hardest to detect and remove. Often requires booting from external media to detect.

**Backdoor/RAT (Remote Access Trojan)**: Creates a persistent remote access channel. Attacker can control the system remotely.

**Keylogger**: Records keystrokes to capture credentials and sensitive data. Can be software or hardware.

**Spyware**: Collects information without user consent (browsing habits, credentials). Often bundled with free software.

**Adware**: Displays unwanted ads. Often a nuisance but can be a vector for malicious ads (malvertising).

**Botnet/Bot**: Infected systems (bots/zombies) controlled by a Command and Control (C2/C&C) server. Used for DDoS, spam, credential stuffing, crypto mining.

**Logic Bomb**: Malicious code that executes when a specific condition is met (date/time, event). Often planted by insiders.

**Fileless Malware**: Resides in memory only. Uses legitimate OS tools (PowerShell, WMI, LOLBins). Leaves no disk footprint — evades signature-based AV.

**Cryptominer**: Uses victim's computing resources to mine cryptocurrency without consent.

**Command & Control (C2)**: Infrastructure attackers use to communicate with compromised systems. May use legitimate services (social media, cloud) to blend in.

**Indicators of Compromise (IoC)**: Signs that a system has been compromised. Examples: unknown processes, unusual network traffic, new admin accounts, disabled security tools, encrypted files, unusual login times.`,
        keyPoints: [
          'Virus: needs human action to spread. Worm: self-replicating, no user needed.',
          'Trojan: disguised as legit software. RAT: remote access. Rootkit: hides at kernel level.',
          'Ransomware: encrypts files + demands payment. Double extortion = also threatens to publish data.',
          'Fileless malware: memory-only, uses LOLBins — evades signature AV. Detect with behavior analytics.',
          'Logic bomb: executes on condition (date/trigger). Often insider threat.',
          'Botnet: C2 controls zombie army. Used for DDoS, spam, credential stuffing.',
        ],
        mnemonics: 'Malware types: "Very Wild Tigers Ransack Racks, Backing Keystrokes, Spying on Addresses, Bots Log Files Crypto" — just remember: Virus, Worm, Trojan, Ransomware, Rootkit, Backdoor, Keylogger, Spyware, Adware, Botnet, Logic bomb, Fileless, Cryptominer',
        acronyms: ['RAT', 'IoC', 'C2'],
      },
      {
        id: 'D2-T4',
        title: 'Application & Network Attacks',
        objectives: ['2.3', '2.4'],
        notes: `**Application Attacks:**

**SQL Injection (SQLi)**: Injecting malicious SQL code into input fields to manipulate database queries. Can bypass auth, extract data, modify data, or execute commands. Prevention: parameterized queries, prepared statements, input validation, WAF.

**Cross-Site Scripting (XSS)**:
- **Stored/Persistent XSS**: Malicious script stored in database, executes for every victim who views it.
- **Reflected XSS**: Script embedded in URL, reflected back in response. Requires victim to click link.
- **DOM-based XSS**: Manipulation of client-side DOM without going to server.
Prevention: input sanitization, Content Security Policy (CSP), output encoding.

**Cross-Site Request Forgery (CSRF)**: Tricks authenticated user's browser into making unauthorized requests to a web app. Prevention: CSRF tokens (anti-CSRF tokens), SameSite cookie attribute.

**Directory Traversal (Path Traversal)**: Using ../ sequences to access files outside the web root. Example: ../../../../etc/passwd.

**IDOR (Insecure Direct Object Reference)**: Accessing unauthorized resources by manipulating IDs (change user_id=123 to user_id=124).

**SSRF (Server-Side Request Forgery)**: Tricks server into making requests to internal services on behalf of attacker. Can bypass firewalls.

**Buffer Overflow**: Writing more data than a buffer can hold, overwriting adjacent memory. Can lead to arbitrary code execution. Prevention: ASLR, DEP/NX, stack canaries.

**Injection Attacks**: Beyond SQL — LDAP injection, command injection, XML injection, XPATH injection.

**Race Condition / TOCTOU**: Time-of-Check to Time-of-Use attack — exploiting gap between checking a condition and using the result.

---

**Network Attacks:**

**DDoS (Distributed Denial of Service)**: Overwhelming target with traffic from many sources (botnet). Types:
- Volumetric: Flood bandwidth (UDP flood, ICMP flood).
- Protocol: Exploit protocol weaknesses (SYN flood — half-open connections exhaust server resources).
- Application Layer: HTTP GET/POST flood targeting web servers (Layer 7).

**Man-in-the-Middle (MitM)**: Attacker secretly intercepts and possibly alters communication between two parties.
- **ARP Poisoning/Spoofing**: Sends fake ARP replies to associate attacker's MAC with victim's IP.
- **DNS Spoofing/Cache Poisoning**: Corrupts DNS cache to redirect domain to malicious IP.
- **SSL Stripping**: Downgrades HTTPS to HTTP.

**Replay Attack**: Captures valid authentication token and retransmits it later. Prevention: timestamps, nonces, session tokens.

**Pass-the-Hash (PtH)**: Attacker captures NTLM hash and uses it directly without cracking. Prevention: Kerberos, Credential Guard.

**Credential Stuffing**: Using leaked credential lists to try across multiple sites (exploits password reuse).
**Brute Force**: Trying all possible combinations. **Dictionary Attack**: Trying common passwords/words. **Spraying**: Trying one password against many accounts to avoid lockout.

**Smurf Attack**: Attacker sends ICMP requests to broadcast address with spoofed source (victim). All hosts reply to victim.

**Ping of Death**: Sending oversized ICMP packets to crash systems.`,
        keyPoints: [
          'SQLi: inject SQL into inputs. Prevention: parameterized queries.',
          'XSS: inject client-side scripts. Stored = persists in DB. Reflected = in URL. Prevention: CSP, sanitization.',
          'CSRF: tricks browser to make auth\'d requests. Prevention: CSRF tokens.',
          'SSRF: server makes requests to internal services. Bypasses firewall.',
          'DDoS types: Volumetric (bandwidth), Protocol (SYN flood), Application (Layer 7).',
          'ARP poisoning: fake ARP replies. DNS cache poisoning: corrupts DNS. Both enable MitM.',
          'Pass-the-Hash: uses NTLM hash directly without cracking. Credential stuffing: tries leaked creds.',
        ],
        mnemonics: 'OWASP top attacks: "SQL XSS CSRF SSRF IDOR" — remember these 5 core web attacks.',
        acronyms: ['SQLi', 'XSS', 'CSRF', 'SSRF', 'IDOR', 'DDoS', 'MitM'],
      },
      {
        id: 'D2-T5',
        title: 'Vulnerability Management & Threat Intelligence',
        objectives: ['2.5', '2.1'],
        notes: `**Vulnerability Assessment vs. Penetration Testing:**

| Aspect | Vulnerability Assessment | Penetration Test |
|--------|------------------------|-----------------|
| Goal | Find and list vulnerabilities | Exploit vulnerabilities to prove impact |
| Scope | Broad | Targeted/specific |
| Output | Vulnerability report with risk ratings | Proof-of-concept exploits, impact report |
| Authorization | Required | Required (rules of engagement) |
| Invasiveness | Low | High |
| Tools | Nessus, Qualys, OpenVAS | Metasploit, Burp Suite, manual |

**Penetration Test Types:**
- **Black box**: No prior knowledge of target. Simulates external attacker.
- **White box**: Full knowledge (network diagrams, code, credentials). Most thorough.
- **Gray box**: Partial knowledge. Common in practice.
- **Physical pen test**: Testing physical security (badge cloning, tailgating, lockpicking).
- **Social engineering pen test**: Simulated phishing, vishing.

**Pen Test Phases:**
1. **Planning**: Scope, rules of engagement, authorization (required!), goals.
2. **Reconnaissance**: Passive (OSINT) and active (scanning).
3. **Scanning**: Network scanning (Nmap), vulnerability scanning.
4. **Exploitation**: Attempting to exploit found vulnerabilities.
5. **Post-Exploitation**: Lateral movement, privilege escalation, persistence.
6. **Reporting**: Documenting findings, risk ratings, remediation recommendations.

**CVE (Common Vulnerabilities and Exposures)**: Standardized list of publicly known security vulnerabilities. Each gets a CVE-YEAR-NNNN identifier.
**CVSS (Common Vulnerability Scoring System)**: Scores vulnerabilities 0.0–10.0. Considers: Attack vector, complexity, privileges required, user interaction, scope, confidentiality/integrity/availability impact.
- CVSS ≥ 9.0 = Critical. ≥ 7.0 = High. ≥ 4.0 = Medium. < 4.0 = Low.
**NVD (National Vulnerability Database)**: NIST's repository of CVEs with CVSS scores.

**Threat Intelligence:**
- **OSINT (Open Source Intelligence)**: Publicly available information. Shodan, Google dorking, social media, WHOIS, job postings.
- **STIX/TAXII**: Formats for sharing threat intelligence. STIX = language/format. TAXII = transport protocol.
- **Threat Feeds**: Automated streams of threat data (IOCs, malware hashes, malicious IPs).
- **ISAC (Information Sharing and Analysis Center)**: Industry-specific threat sharing organizations.
- **Dark Web**: Source of threat intelligence (stolen credentials, exploit kits, attacker forums).

**IoC vs IoA:**
- **IoC (Indicator of Compromise)**: Evidence AFTER a breach (file hashes, malicious IPs, registry changes, unusual outbound traffic). Reactive.
- **IoA (Indicator of Attack)**: Signs of active attack in progress (scanning, privilege escalation attempts, C2 communications). Proactive.

**Attack Surface**: Total sum of all entry points where an attacker could try to enter or extract data. Reduce by: disabling unused services, removing unnecessary accounts, patching, segmentation.`,
        keyPoints: [
          'Vulnerability assessment = find and list. Pen test = find, exploit, prove impact.',
          'Pen test types: Black box (no info), White box (full info), Gray box (partial). All need authorization.',
          'CVE = identifier. CVSS = severity score 0-10. Critical ≥ 9.0, High ≥ 7.0.',
          'IoC = evidence after breach (reactive). IoA = signs of active attack (proactive).',
          'OSINT: publicly available info — Shodan, WHOIS, social media, job postings.',
          'STIX = format for threat intel. TAXII = transport protocol for sharing it.',
        ],
        mnemonics: 'Pen test phases: "Please Reconnaissance Scans Exploit Post-ex Reports" (Plan, Recon, Scan, Exploit, Post-exploit, Report)',
        acronyms: ['CVE', 'CVSS', 'NVD', 'OSINT', 'IoC', 'IoA'],
      },
    ],
  },
  {
    id: 3,
    name: 'Security Architecture',
    weight: 18,
    color: '#4C7B9B',
    description: 'Network design, cloud security, virtualization, zero trust, identity management, secure protocols, and hardening.',
    topics: [
      {
        id: 'D3-T1',
        title: 'Network Segmentation & Design',
        objectives: ['3.1'],
        notes: `**Network segmentation** divides a network into smaller segments to limit the blast radius of an attack and improve security and performance.

**Key Concepts:**

**VLAN (Virtual LAN)**: Logical network segments within a physical switch. Layer 2 segmentation. Traffic between VLANs requires a Layer 3 router or firewall. Prevents broadcast domain sprawl.

**DMZ (Demilitarized Zone)**: A screened network segment between the internet and internal network. Houses public-facing servers (web, email, DNS). Firewall protects both edges. Also called a **screened subnet**.
- Typical DMZ setup: External firewall → DMZ → Internal firewall → LAN.
- Resources in DMZ should never be able to initiate connections into the internal LAN.

**Air Gap**: Physical separation — no network connection at all. Used for the most sensitive systems (nuclear, ICS/SCADA, classified).

**Microsegmentation**: Fine-grained network segmentation, often in cloud/SDN environments. Individual workloads or even applications are segmented. Typically enforced by software-defined networking policies.

**Jump Server (Bastion Host)**: A hardened, single-purpose server in the DMZ used to access systems in the internal network. All admin access flows through it. Provides audit trail.

**Proxy Servers:**
- **Forward Proxy**: Sits between client and internet. Client sends requests to proxy, proxy forwards to internet. Used for web filtering, anonymity, caching. Hides client identity from server.
- **Reverse Proxy**: Sits in front of servers. Internet → Reverse Proxy → Web servers. Hides server identity, provides load balancing, TLS termination, WAF functionality.

**Load Balancer**: Distributes traffic across multiple servers. Improves availability and performance. Types: Layer 4 (TCP), Layer 7 (HTTP/application-aware).

**Screened Subnet**: Modern term for DMZ. Using two firewalls to create a "screened" segment between them.

**Network Topologies relevant to security:**
- Hub-and-spoke: Central hub, higher risk of hub compromise affecting all spokes.
- Mesh: Redundant connections, more resilient.
- Zero-trust network architecture eliminates implicit trust regardless of topology.

**VPN Types:**
- **Site-to-Site VPN**: Connects two networks (office to office). Uses IPSec tunnels.
- **Remote Access VPN**: Individual users connect to corporate network. Uses SSL/TLS (OpenVPN, Cisco AnyConnect) or IPSec.
- **Split Tunneling**: Only corporate traffic goes through VPN; internet traffic goes direct. Reduces VPN load but may bypass security controls.
- **Full Tunnel**: All traffic routed through VPN. More secure.`,
        keyPoints: [
          'VLAN = Layer 2 logical segmentation. Requires L3 device for inter-VLAN routing.',
          'DMZ = screened subnet. Public servers live here. Two-firewall design is best.',
          'Microsegmentation = per-workload segmentation in SDN/cloud environments.',
          'Jump server (bastion host): single gateway for admin access. Creates audit trail.',
          'Forward proxy: hides client from internet. Reverse proxy: hides server from internet.',
          'Split tunneling: only corp traffic through VPN. Full tunnel: all traffic through VPN.',
        ],
        mnemonics: 'DMZ = "Don\'t let Malicious things reach Zone interior." Forward proxy hides you FROM the internet. Reverse proxy hides servers FROM you.',
        acronyms: ['VLAN', 'DMZ', 'VPN'],
      },
      {
        id: 'D3-T2',
        title: 'Cloud Security',
        objectives: ['3.2'],
        notes: `**Cloud Service Models:**

| Model | Provider manages | Customer manages | Example |
|-------|-----------------|-----------------|---------|
| **IaaS** | Hardware, hypervisor, networking | OS, middleware, apps, data | AWS EC2, Azure VMs |
| **PaaS** | Hardware, OS, runtime, middleware | Apps, data | Heroku, Google App Engine |
| **SaaS** | Everything (hardware to application) | Data, user access, configuration | Microsoft 365, Salesforce |

**FaaS (Function as a Service)**: Serverless computing. Provider manages execution environment. Customer writes functions. Example: AWS Lambda.

**Shared Responsibility Model**: Critical exam concept!
- **IaaS**: Cloud provider = physical + virtualization. Customer = OS patches, app security, data, network config.
- **PaaS**: Provider adds OS + runtime. Customer = app security, data.
- **SaaS**: Provider manages almost everything. Customer = user access management, data input, configuration.
- **Always customer's responsibility**: Data classification, access management, end-user training.
- **Always provider's responsibility**: Physical security of data centers.

**Cloud Deployment Models:**
- **Public**: Multi-tenant, shared infrastructure. Most cost-effective.
- **Private**: Single-tenant, dedicated infrastructure. More control, more cost.
- **Hybrid**: Mix of public + private. Sensitive data on-prem, scalable workloads in cloud.
- **Community**: Shared by organizations with common needs (e.g., government agencies).
- **Multi-cloud**: Using services from multiple cloud providers.

**CASB (Cloud Access Security Broker)**: Security gateway between users and cloud services. Provides visibility, compliance, data security, threat protection for cloud usage. Can be inline (proxy) or API-based.

**CSP (Cloud Service Provider)**: AWS, Azure, Google Cloud, etc.

**Cloud Security Controls:**
- **IAM in cloud**: Role-based access with principle of least privilege. Service accounts, federation.
- **Data at rest**: Encryption (AES-256). Customer-managed keys vs. provider-managed keys.
- **Data in transit**: TLS 1.2+. Enforce HTTPS.
- **Data in use**: Confidential computing (Intel SGX, AMD SEV).
- **Cloud security posture management (CSPM)**: Detects misconfigurations.
- **CWPP (Cloud Workload Protection Platform)**: Protects workloads running in cloud.

**Virtualization Security:**
- **Hypervisor** (VMM): Software that creates and manages VMs.
  - **Type 1 (Bare-metal)**: Runs directly on hardware. More secure. ESXi, Hyper-V, Xen.
  - **Type 2 (Hosted)**: Runs on top of OS. Less secure. VirtualBox, VMware Workstation.
- **VM Escape**: Attacker breaks out of VM to affect hypervisor or other VMs. Critical vulnerability.
- **VM Sprawl**: Unmanaged proliferation of VMs — creates unpatched, forgotten systems.
- **Snapshot security**: Snapshots may contain sensitive data. Manage access carefully.

**Containers vs. VMs:**
| | VMs | Containers |
|--|--|--|
| Isolation | Full OS isolation | Share host OS kernel |
| Size | GBs | MBs |
| Boot time | Minutes | Seconds |
| Security | Stronger isolation | Shared kernel = greater attack surface |

**Container security**: Image scanning, signed images, read-only containers, network policies, secrets management (not in env vars!).

**Serverless security**: Secure functions, manage permissions, monitor executions, secure dependencies.`,
        keyPoints: [
          'IaaS: customer manages OS+. PaaS: customer manages apps+. SaaS: customer manages data/access.',
          'Shared responsibility: customer ALWAYS owns data classification and user access management.',
          'CASB: security broker between users and cloud services. Provides visibility and DLP for cloud.',
          'Type 1 hypervisor (bare-metal) is more secure than Type 2 (hosted).',
          'VM escape: breaking out of VM to affect hypervisor — critical vulnerability.',
          'Containers share host OS kernel — weaker isolation than VMs.',
        ],
        mnemonics: 'IaaS/PaaS/SaaS: "I Provide Service, So customers take less responsibility as we go up." Shared responsibility: "Cloud owns hardware, You own data."',
        acronyms: ['IaaS', 'PaaS', 'SaaS', 'CASB', 'CSP', 'CSPM'],
      },
      {
        id: 'D3-T3',
        title: 'Secure Protocols & Cryptographic Implementations',
        objectives: ['3.3'],
        notes: `**Secure Network Protocols — what they secure and what they replace:**

| Protocol | Purpose | Port | Replaces |
|----------|---------|------|---------|
| **HTTPS** | Secure web browsing | 443 | HTTP (80) |
| **TLS 1.3** | Transport layer security for various protocols | varies | SSL (broken) |
| **SSH** | Secure remote shell + file transfer | 22 | Telnet (23), rsh |
| **SFTP** | Secure file transfer (over SSH) | 22 | FTP (21) |
| **FTPS** | FTP + TLS (not the same as SFTP) | 990/989 | FTP (21) |
| **DNSSEC** | Signed DNS responses | 53 | Unsigned DNS |
| **LDAPS** | LDAP over TLS | 636 | LDAP (389) |
| **SMTPS/IMAPS** | Secure email | 465/993 | SMTP(25)/IMAP(143) |
| **SNMPv3** | Secure network management | 161 | SNMPv1/v2 (no auth/encryption) |
| **IPSec** | Encrypts IP packets | - | - |

**TLS (Transport Layer Security):**
- TLS 1.3 is current (2018). TLS 1.2 is still acceptable. TLS 1.0/1.1 and SSL are deprecated.
- Handshake establishes: cipher suite, session key exchange, server authentication (certificate).
- **TLS components**: Certificate (authentication), key exchange (ECDHE for PFS), symmetric encryption (AES-GCM), integrity (HMAC/AEAD).

**IPSec Modes:**
- **Transport mode**: Only payload is encrypted. Used for host-to-host.
- **Tunnel mode**: Entire IP packet (header + payload) is encrypted. Used for VPNs.
- **AH (Authentication Header)**: Provides integrity and authentication. No encryption.
- **ESP (Encapsulating Security Payload)**: Provides confidentiality (encryption) + integrity + optional authentication.
- **IKE (Internet Key Exchange)**: Negotiates IPSec security associations. IKEv2 is current.

**SSH (Secure Shell):**
- Key-based authentication preferred over passwords.
- Uses public/private key pair. Public key stored on server (authorized_keys). Private key stays on client.
- Port 22. Provides encrypted terminal, tunneling, and SFTP.

**VPN Protocols:**
- **IPSec**: Common for site-to-site VPNs.
- **SSL/TLS VPN**: OpenVPN, Cisco AnyConnect. Works over HTTPS (port 443) — passes through most firewalls.
- **WireGuard**: Modern, fast VPN protocol.

**Wireless Security:**
- **WEP**: Broken, do not use. Weak RC4, static keys.
- **WPA**: TKIP, stronger than WEP but deprecated.
- **WPA2**: AES-CCMP. Personal (PSK) or Enterprise (802.1X).
- **WPA3**: Latest standard. SAE (Simultaneous Authentication of Equals) replaces PSK handshake (resists offline attacks). Forward secrecy built in.
- **802.1X**: Port-based NAC. Uses RADIUS server + EAP. Enterprise Wi-Fi authentication.
- **EAP variants**: EAP-TLS (certificate both sides — most secure), PEAP (password, server cert only), EAP-TTLS.

**Email Security:**
- **SPF (Sender Policy Framework)**: DNS TXT record listing authorized mail servers. Prevents spoofing.
- **DKIM (DomainKeys Identified Mail)**: Digital signature in email header. Verifies message integrity and sender domain.
- **DMARC**: Policy that uses SPF + DKIM results to instruct receiving servers what to do with failed messages (none/quarantine/reject). Provides reporting.
- **S/MIME**: End-to-end email encryption and signing using certificates. Requires PKI.
- **PGP/GPG**: End-to-end email encryption using web of trust.`,
        keyPoints: [
          'HTTPS=443, SSH=22, FTPS=990, LDAPS=636, IMAPS=993. Know what each replaces.',
          'TLS 1.3 is current. SSL, TLS 1.0/1.1 are broken/deprecated.',
          'IPSec: Transport mode (host-to-host), Tunnel mode (VPN). ESP = encryption. AH = integrity only.',
          'WPA3 with SAE replaces PSK — resists offline dictionary attacks. WEP is broken.',
          '802.1X = port-based NAC with RADIUS. EAP-TLS = most secure (certs both sides).',
          'SPF = authorized senders. DKIM = message signature. DMARC = policy + reporting using SPF+DKIM.',
        ],
        mnemonics: 'Email security: "SPF sunscreen protects FROM the sun (spoofing). DKIM signs the letter. DMARC is the policy manager."',
        acronyms: ['TLS', 'SSH', 'SFTP', 'IPSec', 'SPF', 'DKIM', 'DMARC'],
      },
      {
        id: 'D3-T4',
        title: 'Identity Architecture & Hardening',
        objectives: ['3.2', '3.3'],
        notes: `**Identity Federation:**
Allows users to use credentials from one organization to access resources in another. Based on trust relationships.
- **SAML**: XML-based. Used for enterprise SSO with web apps. Identity Provider (IdP) sends assertions to Service Provider (SP).
- **OAuth 2.0**: Delegated authorization. Used for third-party app access (e.g., "Login with Google").
- **OIDC**: OAuth 2.0 + identity layer. Adds authentication (ID token as JWT) on top of OAuth.

**Directory Services:**
- **Active Directory (AD)**: Microsoft's LDAP-based directory. Organizes users, computers, groups via OUs. Domain controllers replicate it.
- **LDAP**: Protocol to query directory services (AD). LDAPS = LDAP + TLS.
- **Kerberos**: Authentication protocol used within AD. KDC issues tickets.

**PAM (Privileged Access Management):**
Key tool for securing admin accounts. Features:
- Credential vaulting (passwords stored encrypted, auto-rotated).
- Session recording and auditing.
- Just-In-Time (JIT) access: admin privileges granted only when needed, auto-expire.
- Approval workflows before granting access.
- MFA enforcement for privileged accounts.
- Break-glass accounts: emergency access with immediate alerting.

**Hardening Techniques:**
- **Remove unnecessary software/services**: Reduce attack surface. Disable unused ports/protocols.
- **CIS Benchmarks**: Prescriptive hardening guides for operating systems, cloud, etc.
- **Secure baseline**: Standard configuration applied to all systems.
- **Group Policy (GPO)**: Enforce security settings across Windows domain.
- **Patching**: Keep OS, applications, and firmware up to date. Critical for vulnerability mitigation.
- **Endpoint Protection**: AV/EDR on all endpoints.
- **Host firewall**: Local firewall on each system (in addition to network firewall).
- **Full Disk Encryption (FDE)**: BitLocker (Windows), FileVault (macOS). Protects data if physical access gained.
- **TPM (Trusted Platform Module)**: Hardware chip for cryptographic functions, key storage, Secure Boot validation.
- **Secure Boot**: UEFI feature that verifies OS bootloader signature before loading.

**Application Hardening:**
- **SDLC security**: Security integrated into each phase of development.
- **SAST (Static Application Security Testing)**: Analyze source code without running it.
- **DAST (Dynamic Application Security Testing)**: Test running application (black box).
- **IAST**: Hybrid of SAST + DAST. Agents inside running app.
- **Software composition analysis (SCA)**: Identifies vulnerable open-source components.
- **Code signing**: Developer signs code with private key. OS verifies before execution.
- **Sandboxing**: Run untrusted code in isolated environment. Limits impact.`,
        keyPoints: [
          'SAML: enterprise web SSO. OAuth: delegated authorization. OIDC: adds identity to OAuth.',
          'PAM: credential vault, JIT access, session recording for privileged accounts.',
          'Hardening: remove unused services, CIS benchmarks, patching, FDE, TPM, Secure Boot.',
          'TPM: hardware chip for key storage and Secure Boot. BitLocker uses TPM.',
          'SAST: static code analysis. DAST: test running app. Use both in SDLC.',
          'Code signing: verifies software integrity and authenticity before execution.',
        ],
        mnemonics: 'PAM features: "Vault, JIT, Records, Approvals" (Vaulting, Just-in-time, Recording, Approval workflows).',
        acronyms: ['PAM', 'TPM', 'FDE', 'SAST', 'DAST', 'SDLC'],
      },
    ],
  },
  {
    id: 4,
    name: 'Security Operations',
    weight: 28,
    color: '#4C9B7B',
    description: 'Incident response, forensics, SIEM, endpoint security, access management, monitoring, and email/data security.',
    topics: [
      {
        id: 'D4-T1',
        title: 'Incident Response Lifecycle',
        objectives: ['4.4'],
        notes: `The **Incident Response (IR) Lifecycle** provides a structured approach to handling security incidents. Know all 6 phases and what happens in each.

**NIST SP 800-61 defines 4 phases. CompTIA SY0-701 uses 6 phases:**

**Phase 1: Preparation**
- Develop IR plan, policies, and procedures.
- Build and train the CIRT (Computer Incident Response Team).
- Procure tools (forensic software, SIEM, communication tools).
- Conduct tabletop exercises and simulations.
- Establish communication channels and escalation procedures.
- Maintain updated asset inventories and network diagrams.

**Phase 2: Detection & Analysis (Identification)**
- Monitor systems (SIEM, IDS/IPS, log analysis) for signs of incidents.
- Analyze alerts to determine if an incident has occurred (true positive vs. false positive).
- Determine scope, impact, and severity.
- Assign incident severity levels.

**Phase 3: Containment**
- **Short-term containment**: Immediately stop the spread. Isolate affected systems. Block malicious IPs/domains.
- **Long-term containment**: Apply temporary fixes to allow business to continue while eradicating the threat.
- Preserve evidence while containing (don't destroy forensic artifacts by wiping systems too quickly).
- Determine containment strategy based on: damage potential, evidence preservation needs, service availability, time/resources.

**Phase 4: Eradication**
- Remove the root cause of the incident. Delete malware. Remove compromised accounts. Close attack vectors.
- Identify all affected systems. Patch exploited vulnerabilities.

**Phase 5: Recovery**
- Restore systems to normal operation from clean backups.
- Verify systems are clean and functioning correctly.
- Monitor systems closely for recurrence.
- Decide when to return to production.

**Phase 6: Lessons Learned (Post-Incident Activity)**
- Conduct post-incident review (post-mortem) meeting.
- Document what happened, timeline, how it was detected, what worked, what didn't.
- Update IR plan, policies, and procedures based on findings.
- **Root Cause Analysis (RCA)**: Identify and fix the fundamental cause.

**Key Concepts:**
- **Playbook**: Step-by-step IR procedure for a specific type of incident (e.g., ransomware playbook).
- **Runbook**: Automated version of a playbook.
- **SOAR (Security Orchestration, Automation, and Response)**: Automates IR steps using playbooks.
- **TTX (Tabletop Exercise)**: Discussion-based simulation of an incident. No live systems. Tests IR plan and communication.
- **Functional Exercise**: Live test of IR capabilities with real tools.

**Containment strategies:**
- Segmentation (isolate VLAN), disabling accounts, taking systems offline, blocking IPs/domains, sinkholing (redirect malicious DNS to benign server), blackholing (discard malicious traffic).`,
        keyPoints: [
          '6 IR phases: Preparation → Detection → Containment → Eradication → Recovery → Lessons Learned.',
          'Containment = stop spread (short-term) + temp fix (long-term). Preserve evidence!',
          'Eradication = remove root cause. Recovery = restore from clean backups.',
          'Lessons Learned = post-mortem, RCA, update IR plan.',
          'SOAR automates IR playbooks. TTX = tabletop exercise (discussion, no live systems).',
          'Playbook = per-incident-type procedure. Runbook = automated playbook.',
        ],
        mnemonics: 'IR phases: "Please Detect Criminals, Eradicate Rogues, Learn" (Preparation, Detection, Containment, Eradication, Recovery, Lessons Learned)',
        acronyms: ['IR', 'CIRT', 'SOAR', 'TTX', 'RCA'],
      },
      {
        id: 'D4-T2',
        title: 'Digital Forensics',
        objectives: ['4.4'],
        notes: `**Digital forensics** is the process of collecting, preserving, analyzing, and presenting digital evidence in a legally admissible manner.

**Chain of Custody**: Documented, unbroken record of who handled evidence, when, and how. Critical for legal admissibility. Any break in chain of custody can invalidate evidence in court.

**Order of Volatility** (most volatile → least volatile, collect in this order):
1. CPU registers and cache
2. RAM (running processes, network connections, open files, encryption keys)
3. Swap/virtual memory (pagefile)
4. Disk (hard drive, SSD)
5. Remote logging and monitoring data
6. Physical configuration and network topology
7. Archival media (backups, tapes)

**Why it matters**: RAM holds critical evidence (running malware, encryption keys, network connections) but is lost on power off. Collect RAM FIRST before disk!

**Forensic Imaging:**
- Create bit-for-bit copy (forensic image) of storage media using write blockers.
- **Write blocker**: Hardware/software device that prevents any writes to original media (preserves evidence).
- Hash the original drive (MD5/SHA-256), hash the image — they must match. This proves integrity.
- Work on the image, NEVER on the original.
- Tools: FTK Imager, dd, dcfldd, Autopsy.

**Acquisition Types:**
- **Disk image**: Full bit-for-bit copy of drive including deleted files, slack space.
- **Memory capture**: Capture RAM contents (Volatility, WinPmem).
- **Network capture**: Packet capture (pcap) using Wireshark, tcpdump.
- **Log collection**: System, application, security event logs.

**Legal Hold**: A directive to preserve all relevant electronically stored information (ESI) when litigation is anticipated. Prevents routine deletion.

**eDiscovery**: Process of identifying, collecting, and producing digital evidence for legal proceedings.

**Forensic Analysis Concepts:**
- **Artifacts**: Evidence left by user/system activity (browser history, registry, prefetch files, log entries, event IDs).
- **File slack space**: Space between end of file and end of disk cluster. Can contain residual data.
- **Timestamps (MACE)**: Modified, Accessed, Created, Entry modified. Critical for timeline analysis. Beware timestomping (manipulation of timestamps by attackers).
- **Steganography**: Hiding data inside images, audio, video. Detection: steganalysis.
- **Anti-forensics**: Techniques to obstruct forensics (timestomping, data wiping, encryption, log deletion).

**DFIR (Digital Forensics and Incident Response)**: Combined discipline — forensic investigation during/after incident response.`,
        keyPoints: [
          'Chain of custody: documented handling of evidence. Any break = inadmissible in court.',
          'Order of volatility: Registers → RAM → Swap → Disk → Remote logs → Archives. Collect RAM FIRST.',
          'Write blocker: prevents writes to original media. Hash original + image to prove integrity.',
          'Work on forensic image, NEVER on original evidence.',
          'Legal hold: preserve all ESI when litigation expected.',
          'MACE timestamps: Modified, Accessed, Created, Entry modified. Attackers may tamper (timestomping).',
        ],
        mnemonics: 'Order of volatility: "Really Superfast Drives Remotely Log Archives" (Registers, RAM, Swap, Disk, Remote logs, Archives).',
        acronyms: ['DFIR'],
      },
      {
        id: 'D4-T3',
        title: 'SIEM, EDR, and Security Monitoring',
        objectives: ['4.3'],
        notes: `**Security Monitoring Tools Overview:**

**SIEM (Security Information and Event Management):**
Aggregates and correlates log data from multiple sources. Provides:
- **Log aggregation**: Collects logs from firewalls, endpoints, servers, applications.
- **Correlation rules**: Identifies patterns that indicate security events.
- **Alerting**: Notifies security team of potential incidents.
- **Dashboards and reporting**: Visualizes security posture.
- **Threat hunting**: Proactively searching for hidden threats.
- Examples: Splunk, IBM QRadar, Microsoft Sentinel, Elastic SIEM.

**SOAR (Security Orchestration, Automation, and Response):**
Automates and orchestrates IR processes. Integrates with SIEM and security tools. Executes playbooks automatically. Reduces MTTR (Mean Time to Respond).

**EDR (Endpoint Detection and Response):**
Agent-based endpoint monitoring and response. Capabilities:
- Continuous monitoring of endpoint activity.
- Behavioral analysis to detect anomalies (not just signatures).
- **Response actions**: Isolate endpoint, kill processes, quarantine files.
- Records telemetry for forensic investigation.
- Examples: CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint.

**XDR (Extended Detection and Response):**
Extends EDR across multiple security layers: endpoints + network + email + cloud + identity. Correlates signals from all layers for comprehensive threat detection. Provides unified incident view.

**MDR (Managed Detection and Response):**
Outsourced SOC service. Third-party monitors your environment 24/7.

**NDR (Network Detection and Response):**
Monitors network traffic for threats. Uses ML and behavioral analytics on network flows.

**IDS vs. IPS:**
| | IDS (Intrusion Detection System) | IPS (Intrusion Prevention System) |
|--|--|--|
| Action | Detects only, sends alerts | Detects AND blocks |
| Position | Passive (out-of-band), monitors copy of traffic | Inline, all traffic passes through |
| False positive risk | High = missed alerts | High = blocked legitimate traffic |

- **NIDS/NIPS**: Network-based. Monitors network traffic.
- **HIDS/HIPS**: Host-based. Monitors single endpoint.
- Detection methods: **Signature-based** (known patterns, low false positives but misses novel attacks), **Anomaly-based/behavioral** (baseline + deviations, catches novel attacks but higher false positives), **Heuristic** (rule-based analysis).

**Firewall Types:**
- **Packet filtering**: Examines IP/port headers only. Stateless. Fastest but limited.
- **Stateful firewall**: Tracks connection state. Allows return traffic automatically.
- **Application (Layer 7) firewall**: Inspects application data. Can identify apps regardless of port.
- **NGFW (Next-Generation Firewall)**: Stateful + application awareness + IPS + URL filtering + SSL inspection.
- **WAF (Web Application Firewall)**: Protects web apps from SQLi, XSS, etc. Can be inline (proxy) or cloud-based.

**Honeypots & Deception:**
- **Honeypot**: Decoy system designed to attract and trap attackers. Provides intelligence on attacker behavior.
- **Honeynet**: Network of honeypots. Simulates a full network environment.
- **Honeytoken**: Fake data (fake credentials, files) that triggers alert when accessed.
- **Canary token**: URL/file that alerts when accessed — used to detect data theft or unauthorized access.

**UEBA (User and Entity Behavior Analytics)**: Establishes baseline of normal user behavior. Alerts on anomalies (unusual login times, data exfiltration patterns).`,
        keyPoints: [
          'SIEM: aggregates logs + correlates. SOAR: automates IR. EDR: endpoint monitoring + response.',
          'XDR: EDR + network + email + cloud + identity. MDR: outsourced SOC.',
          'IDS: passive, detects only. IPS: inline, detects + blocks. False positives matter differently.',
          'Signature-based: known threats. Anomaly-based: baselines deviation. Heuristic: rules.',
          'NGFW: stateful + app layer + IPS + URL filtering + SSL inspection.',
          'Honeypot: decoy system. Honeynet: network of honeypots. Honeytoken: fake data alert.',
        ],
        mnemonics: 'IDS vs IPS: "IDS = I Detect Silently. IPS = I Prevent Stuff." SIEM: "Sieving log data for threats."',
        acronyms: ['SIEM', 'SOAR', 'EDR', 'XDR', 'MDR', 'IDS', 'IPS', 'NGFW', 'WAF', 'UEBA'],
      },
      {
        id: 'D4-T4',
        title: 'Identity & Access Management Operations',
        objectives: ['4.6'],
        notes: `**Identity Lifecycle Management:**

**Provisioning**: Creating user accounts with appropriate access when onboarding.
**Deprovisioning**: Disabling/removing accounts when employees leave. CRITICAL — disabled, not just password changed.
**Account review**: Regular access recertification — verify users still need their access.
**Privilege creep**: Accumulated permissions over time as roles change. Fixed by periodic access reviews.

**Authentication Technologies:**
- **SSO (Single Sign-On)**: One login grants access to multiple systems. Uses SAML, OAuth/OIDC, or Kerberos. Improves UX but concentrates risk — SSO = single point of failure if compromised.
- **MFA (Multi-Factor Authentication)**: Two or more different factor types.
  - SMS OTP (weakest — SIM swap attack), TOTP apps (authenticator app), hardware tokens (strongest), biometrics, push notification.
  - FIDO2/WebAuthn: Passwordless authentication using hardware security keys (YubiKey) or biometrics. Phishing-resistant.
- **Password managers**: Store strong unique passwords for all services.
- **Password vaulting**: Enterprise credential management (part of PAM).

**Passwordless Authentication**: FIDO2, magic links, biometrics. Eliminates password-based attacks.

**Access Control Operations:**
- **RBAC (Role-Based Access Control)**: Assign permissions to roles, assign users to roles. Easier to manage at scale.
- **ABAC (Attribute-Based Access Control)**: Policies based on attributes. Most flexible.
- **Conditional Access**: Access granted based on conditions (device compliance, location, risk score). Example: Require MFA if logging in from outside office.

**Privileged Accounts:**
- **Separation of duties**: Admin account for admin tasks, regular account for daily work. Never use admin account routinely.
- **Admin account controls**: Strong passwords, MFA, PAM, session recording.
- **Service accounts**: Non-human accounts for applications. Should have minimal privileges. Audit regularly.
- **Root/local admin**: Disable where possible. Use centralized admin.

**Data Loss Prevention (DLP):**
Monitors and controls data movement to prevent unauthorized exfiltration. Types:
- **Network DLP**: Monitors data in transit (email, web uploads, FTP).
- **Endpoint DLP**: Monitors data at endpoints (USB, printing, clipboard).
- **Cloud DLP**: Monitors data in cloud services (SaaS).
- Actions: block, quarantine, alert, encrypt, apply rights.
- DLP rules typically use: content inspection (keywords, regex patterns, document fingerprinting), context (who, what, where, when).

**Email Security Operations:**
- **Secure Email Gateway (SEG)**: Filters inbound/outbound email. Blocks spam, phishing, malware.
- **Anti-spam**: Block unwanted bulk email.
- **Anti-phishing**: URL filtering, sender verification (SPF/DKIM/DMARC).
- **Email encryption**: S/MIME or TLS for transport. Encrypt sensitive content.
- **User training**: Phishing simulations.

**Patch Management:**
- Vulnerability → Assessment → Prioritization → Testing → Deployment → Verification.
- Emergency patching for critical CVEs. Patch Tuesday (Microsoft monthly).
- Use CVSS scores to prioritize. Critical patches ASAP.
- Compensating controls if patching is not immediately possible.`,
        keyPoints: [
          'Deprovision = disable accounts IMMEDIATELY on employee departure.',
          'Privilege creep: accumulated access over time. Fix with periodic access reviews.',
          'SSO: convenience but concentrates risk. Compromise = access to all systems.',
          'FIDO2/WebAuthn: phishing-resistant passwordless auth using hardware keys.',
          'DLP: monitors data movement — network (transit), endpoint (USB/print), cloud (SaaS).',
          'Patch priority: CVSS score. Critical = patch immediately. Use CVSS+asset criticality.',
        ],
        mnemonics: 'Access lifecycle: "Provision, Access, Review, Deprovision" (PARD). DLP covers "NET, END, CLOUD" (Network, Endpoint, Cloud).',
        acronyms: ['SSO', 'MFA', 'DLP', 'FIDO2'],
      },
    ],
  },
  {
    id: 5,
    name: 'Security Program Management & Oversight',
    weight: 20,
    color: '#9B4C4C',
    description: 'Risk management, compliance, data governance, vendor management, security awareness, and auditing.',
    topics: [
      {
        id: 'D5-T1',
        title: 'Risk Management',
        objectives: ['5.2'],
        notes: `**Risk** = Threat × Vulnerability × Impact. Understanding and managing risk is the foundation of security programs.

**Risk Terminology:**
- **Threat**: A potential negative event or actor that could cause harm.
- **Vulnerability**: A weakness that could be exploited by a threat.
- **Risk**: The likelihood that a threat will exploit a vulnerability and the resulting impact.
- **Asset**: Something of value (data, systems, people, reputation).
- **Risk appetite**: How much risk an organization is willing to accept.
- **Risk tolerance**: Acceptable deviation from risk appetite.
- **Risk register**: Document cataloging identified risks, their likelihood, impact, and mitigation status.

**Risk Assessment Methods:**

**Qualitative Risk Assessment:**
- Uses subjective ratings: High/Medium/Low or 1-5 scales.
- Does NOT produce dollar amounts.
- Fast and easy. Good for initial screening.
- Risk matrix: Likelihood × Impact = Risk level.

**Quantitative Risk Assessment:**
- Uses financial values and probabilities.
- **AV (Asset Value)**: Value of the asset.
- **EF (Exposure Factor)**: Percentage of asset lost if threat occurs (0–100%).
- **SLE (Single Loss Expectancy)**: AV × EF = expected loss from one incident.
- **ARO (Annualized Rate of Occurrence)**: How often threat is expected per year.
- **ALE (Annualized Loss Expectancy)**: SLE × ARO = expected annual loss.
- Used to justify security spending: security control cost < ALE = justified.

**Risk Treatment Options:**
- **Avoid**: Eliminate the activity that creates the risk (don't collect certain data).
- **Transfer (Share)**: Shift financial impact to third party — cyber insurance, outsourcing.
- **Mitigate (Reduce)**: Implement controls to reduce likelihood or impact.
- **Accept**: Acknowledge the risk and do nothing (when cost of control exceeds risk).
- **Ignore**: NOT a valid risk treatment option (this is different from Accept).

**Risk Types:**
- **Strategic**: Risk from business decisions.
- **Operational**: Risk from day-to-day operations.
- **Financial**: Risk of financial loss.
- **Reputational**: Risk of damage to public perception.
- **Compliance/Legal**: Risk of regulatory violations.
- **Third-party/Supply chain**: Risk from vendor relationships.

**Inherent risk**: Risk before controls. **Residual risk**: Risk remaining after controls. **Control risk**: Risk that controls fail.

**Risk Management Framework (NIST RMF) steps:**
Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor`,
        keyPoints: [
          'Risk = Threat × Vulnerability × Impact.',
          'SLE = AV × EF. ALE = SLE × ARO. Justify security spending: control cost < ALE.',
          'Risk treatments: Avoid, Transfer, Mitigate, Accept. (Ignore is NOT valid.)',
          'Qualitative: subjective (H/M/L). Quantitative: financial values (ALE, SLE).',
          'Risk register: document of all identified risks, ratings, and treatment status.',
          'Residual risk = risk remaining AFTER controls are applied.',
        ],
        mnemonics: 'Risk treatment: "ATMA" (Avoid, Transfer, Mitigate, Accept). Quantitative: "AV × EF = SLE, SLE × ARO = ALE." Remember it like: "Assets Expose Single Loss, Annual Rate = Annual Loss."',
        acronyms: ['AV', 'EF', 'SLE', 'ARO', 'ALE'],
      },
      {
        id: 'D5-T2',
        title: 'Business Continuity & Disaster Recovery',
        objectives: ['5.4'],
        notes: `**BCP (Business Continuity Planning)**: Plans and procedures to keep critical business functions running during and after a disaster. BCP is the umbrella — DR is a subset.

**DRP (Disaster Recovery Plan)**: Focuses specifically on restoring IT systems and data after a disaster. Subset of BCP.

**Key Metrics:**
- **RTO (Recovery Time Objective)**: Maximum acceptable downtime. How quickly must systems be restored? (Time-based goal.)
- **RPO (Recovery Point Objective)**: Maximum acceptable data loss. How much data can we afford to lose? (Data-based goal — determines backup frequency.)
- **MTTR (Mean Time to Repair)**: Average time to restore a failed component.
- **MTBF (Mean Time Between Failures)**: Average time between failures. Higher = more reliable.
- **MTD (Maximum Tolerable Downtime)**: Absolute maximum time a business process can be down before the business fails.
- **RTO must be less than MTD.**

**BIA (Business Impact Analysis)**: Identifies critical business processes, determines what would happen if they failed (impact), and establishes RTO/RPO for each. The foundation of BCP.

**Disaster Recovery Site Types:**
| Type | Ready | Cost | Data | Notes |
|------|-------|------|------|-------|
| **Hot site** | Immediately | Highest | Real-time mirrored | Fully operational, can switchover in minutes |
| **Warm site** | Hours–days | Medium | Recent backup | Equipment present, needs configuration |
| **Cold site** | Days–weeks | Lowest | Must restore from backup | Empty space, need to bring everything |
| **Cloud DR** | Hours (variable) | Pay-as-you-go | Cloud-based replication | Flexible, scalable |

**Backups:**
- **Full backup**: Complete copy of all data. Longest to create, fastest to restore.
- **Incremental backup**: Only changes since LAST backup (any type). Fastest to create, slowest to restore (need full + all incrementals).
- **Differential backup**: All changes since LAST FULL backup. Medium speed both ways (need full + latest differential).
- **Snapshot**: Point-in-time copy of disk/system state. Quick, great for VMs.
- **Backup rule: 3-2-1**: 3 copies, 2 different media types, 1 offsite.
- **Immutable backups**: Cannot be modified or deleted for a set retention period. Critical defense against ransomware.
- **Air-gapped backups**: Backup not connected to network — ultimate protection against ransomware.

**High Availability Concepts:**
- **Clustering**: Multiple servers act as one. If one fails, others take over.
- **Load balancing**: Distributes traffic. Provides redundancy.
- **Failover**: Automatic switch to backup system when primary fails.
- **Geographic redundancy**: Data centers in different locations/regions.
- **SLA (Service Level Agreement)**: Contract defining expected service levels (uptime, response time).
- **Uptime percentages**: 99.9% = ~8.7 hours downtime/year. 99.99% = ~52 minutes/year. 99.999% = ~5 minutes/year.`,
        keyPoints: [
          'RTO = max downtime (time). RPO = max data loss (data/backups). MTD = absolute max before business fails.',
          'Hot site: ready now. Warm: hours-days. Cold: days-weeks. Hot is most expensive.',
          'Full backup: slowest to create, fastest to restore. Incremental: fastest to create, slowest to restore.',
          '3-2-1 backup rule: 3 copies, 2 media types, 1 offsite.',
          'Immutable backups: cannot be modified — key defense against ransomware.',
          'BIA: identifies critical processes and sets RTO/RPO. Foundation of BCP.',
        ],
        mnemonics: 'RTO vs RPO: "RTO = how long you\'re down. RPO = how much data you lose." Backup: "Full is fat and slow to make; Incremental is speedy but tedious to restore."',
        acronyms: ['BCP', 'DRP', 'RTO', 'RPO', 'MTTR', 'MTBF', 'MTD', 'BIA'],
      },
      {
        id: 'D5-T3',
        title: 'Compliance Frameworks & Data Governance',
        objectives: ['5.1', '5.5'],
        notes: `**Key Compliance Frameworks:**

**HIPAA (Health Insurance Portability and Accountability Act)**
- US federal law protecting Protected Health Information (PHI).
- Applies to: Covered entities (healthcare providers, insurers) and Business Associates.
- Key rules: Privacy Rule (PHI use), Security Rule (technical/physical/admin safeguards for ePHI), Breach Notification Rule (notify within 60 days).
- Requires Business Associate Agreement (BAA) with vendors handling PHI.

**PCI-DSS (Payment Card Industry Data Security Standard)**
- Protects cardholder data (credit/debit card information).
- Applies to any organization that stores, processes, or transmits cardholder data.
- 12 requirements: network security, cardholder data protection, vulnerability management, access control, monitoring, security policy.
- Four compliance levels based on transaction volume.

**GDPR (General Data Protection Regulation)**
- EU regulation protecting personal data of EU residents. Extraterritorial reach.
- Key rights: right to access, erasure ("right to be forgotten"), portability, correction.
- Breach notification: 72 hours to notify supervisory authority.
- Data Protection Officer (DPO) required for some organizations.
- Fines: up to 4% of global annual revenue or €20M, whichever is greater.
- Lawful basis for processing: consent, contract, legal obligation, legitimate interests.

**FISMA (Federal Information Security Modernization Act)**
- US federal law requiring federal agencies to implement security programs.
- Uses NIST RMF for compliance. Requires ATO (Authority to Operate).

**CMMC (Cybersecurity Maturity Model Certification)**
- DoD framework for defense contractors. 3 levels (Foundational, Advanced, Expert).
- Based on NIST SP 800-171. Requires third-party assessment at higher levels.

**SOX (Sarbanes-Oxley Act)**
- Protects financial data of publicly traded companies. Section 404 = internal controls.

**FERPA**: Education records privacy (US).
**COPPA**: Children's online privacy (US, under 13).
**GLBA**: Financial services data protection (US).

---

**Data Classification:**
Standard classification levels (government): **Top Secret > Secret > Confidential > Unclassified**
Standard classification levels (commercial): **Confidential/Restricted > Internal/Private > Public**

**Data States:**
- **At rest**: Stored data. Encrypt with AES-256 and FDE.
- **In transit**: Data moving over network. Encrypt with TLS.
- **In use/processing**: Data in RAM, CPU. Harder to protect. Confidential computing helps.

**Data Handling:**
- **Data retention**: How long to keep data. Comply with legal requirements.
- **Data destruction**: Securely delete or destroy media. Methods:
  - **Sanitization**: Clear (overwrite), Purge (degauss/crypto-erase), Destroy (shred/incinerate).
  - **Crypto-erase**: Destroy encryption key = data is unrecoverable.
- **Data sovereignty**: Data subject to laws of the country where it's stored.
- **Data minimization**: Collect only what is necessary (GDPR principle).
- **Privacy by design**: Embed privacy into systems from the start.

**Data Roles:**
- **Data owner**: Business leader responsible for data. Sets classification and use policies.
- **Data custodian**: IT staff responsible for technical protection (backups, encryption).
- **Data steward**: Manages data quality and governance.
- **Data processor** (GDPR): Processes data on behalf of controller.
- **Data controller** (GDPR): Determines purpose and means of processing.`,
        keyPoints: [
          'HIPAA: PHI. 60-day breach notification. BAA required for vendors.',
          'PCI-DSS: cardholder data. 12 requirements.',
          'GDPR: EU residents\' data. 72-hour breach notification. Right to erasure. 4% revenue fine.',
          'CMMC: DoD contractors. FISMA: federal agencies + NIST RMF.',
          'Data at rest: AES-256/FDE. In transit: TLS. In use: confidential computing.',
          'Data owner: business accountability. Data custodian: IT technical protection.',
        ],
        mnemonics: 'GDPR breach: "72 hours — 3 days to report!" HIPAA breach: "60 days — 2 months to report!"',
        acronyms: ['HIPAA', 'PCI-DSS', 'GDPR', 'FISMA', 'CMMC', 'DPO'],
      },
      {
        id: 'D5-T4',
        title: 'Vendor Management & Security Awareness',
        objectives: ['5.3', '5.6'],
        notes: `**Vendor / Third-Party Risk Management:**

Third parties (vendors, suppliers, partners) extend an organization's attack surface. Supply chain attacks (SolarWinds, XZ Utils) demonstrate the risk.

**Key Vendor Risk Concepts:**
- **Due diligence**: Evaluate vendor security before signing contracts. Review security certifications (SOC 2, ISO 27001), questionnaires, pen test results.
- **SLA (Service Level Agreement)**: Contract defining service expectations — uptime, response time, support levels, penalties for breach.
- **MSA (Master Service Agreement)**: Overarching contract covering the relationship.
- **SOW (Statement of Work)**: Specific deliverables for a project.
- **NDA (Non-Disclosure Agreement)**: Protects confidential information shared with vendors.
- **Right to audit clause**: Contract clause allowing you to audit vendor security controls.

**MSSP (Managed Security Service Provider)**: Outsourced security monitoring and management (SOC-as-a-service, firewall management, threat intelligence).
**MSP (Managed Service Provider)**: Broader IT outsourcing. May include security services.

**Supply Chain Risk:**
- **Software supply chain**: Compromise of developer tools, build systems, open-source libraries, or update mechanisms. Example: SolarWinds (trojanized update). Mitigate: software bill of materials (SBOM), code signing, integrity verification.
- **Hardware supply chain**: Counterfeit or tampered hardware components. Mitigate: trusted vendors, hardware security modules.

**Vendor Offboarding**: Revoke access, retrieve equipment, ensure data deletion.

---

**Security Awareness Training:**

**Why it matters**: Humans are the weakest link. Social engineering succeeds primarily because of lack of awareness.

**Training Components:**
- Initial onboarding training. Annual refresher. Just-in-time training (after failing phishing sim).
- Role-specific training (privileged users, finance team, executives).
- Topics: Phishing recognition, password hygiene, physical security, data handling, incident reporting, social engineering.

**Phishing Simulations:**
- Send simulated phishing emails to employees. Track: open rate, click rate, credential submission rate, report rate.
- Employees who click receive immediate education (teachable moment).
- Track improvement over time. Target repeat clickers with additional training.
- Tools: KnowBe4, Proofpoint Security Awareness Training.

**Security Culture:**
- Tone from the top: leadership must champion security.
- Blameless reporting: employees should feel safe reporting mistakes.
- Clear policies: written, accessible, enforced.
- Metrics: KPIs for training completion, phishing click rates, incident report rates.

---

**Security Assessments & Auditing:**

**Types:**
- **Vulnerability assessment**: Automated scanning, find and rate vulnerabilities.
- **Penetration test**: Active exploitation to prove impact.
- **Red team**: Full adversary simulation. Stealth. Multi-vector. Tests people, process, technology.
- **Blue team**: Defense team. Monitors, detects, responds.
- **Purple team**: Red + Blue working together. Red shares techniques, Blue improves detection.
- **Bug bounty**: External researchers report vulnerabilities for reward.

**Audit Types:**
- **Internal audit**: Conducted by the organization's own audit team.
- **External audit**: Third-party independent assessment. More credible.
- **Regulatory/compliance audit**: Required by regulation (PCI-DSS QSA, HIPAA audit).

**Security Policies:**
- **AUP (Acceptable Use Policy)**: What users may and may not do with organizational resources.
- **Password policy**: Complexity, length, rotation, history.
- **BYOD policy**: Rules for personal devices accessing corporate resources.
- **Clean desk policy**: Employees clear sensitive materials from desk when away.
- **Remote access policy**: VPN requirements, security controls for remote work.`,
        keyPoints: [
          'SLA: service expectations. Right to audit: verify vendor controls. SOC 2 / ISO 27001 cert = vendor assurance.',
          'MSSP: outsourced SOC. MSP: broader IT outsourcing.',
          'Supply chain risk: SolarWinds-style attacks. Mitigate with SBOM, code signing.',
          'Phishing simulations: track click rate, report rate. Failed clickers get immediate training.',
          'Red = attack. Blue = defense. Purple = both together to improve detection.',
          'AUP: what users can/can\'t do. Clean desk: remove sensitive materials when away.',
        ],
        mnemonics: 'Red/Blue/Purple teams: "Red attacks, Blue defends, Purple improves together." Vendor risk: "Due Diligence, SLA, Right to Audit, Offboard."',
        acronyms: ['SLA', 'MSSP', 'MSP', 'NDA', 'AUP', 'SBOM'],
      },
    ],
  },
];
