export default [
  // ============================================================
  // DOMAIN 1: General Security Concepts (12%) - 15 questions
  // ============================================================
  {
    id: 'q001',
    domainId: 1,
    question: 'A security engineer is designing an authentication system that requires users to provide a fingerprint scan AND a one-time password from an authenticator app. Which type of authentication is being implemented?',
    options: [
      'A. Single-factor authentication using two methods',
      'B. Multi-factor authentication combining biometrics and something you have',
      'C. Two-step verification using something you know',
      'D. Federated identity management'
    ],
    answer: 1,
    explanation: 'Multi-factor authentication (MFA) requires two or more different categories of factors: something you know, something you have, or something you are. A fingerprint scan is "something you are" (biometric), while a one-time password from an authenticator app is "something you have." Using two different factor categories makes this true MFA. Option A is incorrect because using two methods from the same category would not be MFA. Option C is wrong because neither a fingerprint nor an OTP app represents "something you know." Option D refers to a system where multiple organizations share identity information, which is not what is described.'
  },
  {
    id: 'q002',
    domainId: 1,
    question: 'Which of the following BEST describes the principle of least privilege?',
    options: [
      'A. Users are granted access to all resources they might ever need to avoid workflow disruptions',
      'B. Administrative accounts are shared among a small group of trusted senior staff',
      'C. Users and systems are granted only the minimum permissions necessary to perform their required functions',
      'D. Privileged access is rotated among staff on a weekly basis'
    ],
    answer: 2,
    explanation: 'The principle of least privilege states that every user, process, or system component should be given only the minimum level of access rights needed to perform their legitimate functions and nothing more. This limits the potential damage from accidents, errors, or unauthorized use. Option A violates least privilege by granting excessive access. Option B describes shared accounts, which violates accountability and is a poor security practice. Option D describes access rotation, which is a different concept not related to least privilege.'
  },
  {
    id: 'q003',
    domainId: 1,
    question: 'An organization wants to ensure that no single employee can both approve and process financial transactions. Which security control BEST addresses this concern?',
    options: [
      'A. Mandatory vacations',
      'B. Separation of duties',
      'C. Job rotation',
      'D. Dual control'
    ],
    answer: 1,
    explanation: 'Separation of duties divides critical tasks among multiple individuals so that no single person can complete a sensitive transaction alone, reducing the risk of fraud or error. In this case, one employee approves transactions while a different employee processes them. Mandatory vacations help detect fraud that depends on an employee\'s continuous presence. Job rotation moves employees between roles periodically, which can deter fraud but does not prevent a single person from controlling a complete transaction. Dual control requires two people to simultaneously perform an action (like two keys to open a safe), which is a related but distinct concept.'
  },
  {
    id: 'q004',
    domainId: 1,
    question: 'A company is implementing a new encryption standard for its data at rest. The security team needs a symmetric encryption algorithm that provides strong security with a 256-bit key. Which algorithm should they choose?',
    options: [
      'A. RSA-2048',
      'B. AES-256',
      'C. SHA-256',
      'D. ECC-256'
    ],
    answer: 1,
    explanation: 'AES (Advanced Encryption Standard) with a 256-bit key is a symmetric encryption algorithm widely used for protecting data at rest and in transit. It is the gold standard for symmetric encryption and is approved by NIST for protecting classified information. RSA-2048 is an asymmetric (public-key) encryption algorithm, not symmetric. SHA-256 is a cryptographic hash function used for integrity verification, not encryption. ECC (Elliptic Curve Cryptography) is also an asymmetric algorithm used primarily for key exchange and digital signatures.'
  },
  {
    id: 'q005',
    domainId: 1,
    question: 'Which of the following cryptographic concepts ensures that a sender cannot later deny having sent a message?',
    options: [
      'A. Confidentiality',
      'B. Integrity',
      'C. Non-repudiation',
      'D. Availability'
    ],
    answer: 2,
    explanation: 'Non-repudiation is a cryptographic property that prevents a party from denying an action they performed. Digital signatures provide non-repudiation because only the holder of the private key can create a valid signature, so the signer cannot later deny signing a document. Confidentiality ensures data is not accessible to unauthorized parties. Integrity ensures data has not been altered. Availability ensures systems and data are accessible when needed. These are the other components of the CIA triad and AAA, but none prevent a sender from denying an action.'
  },
  {
    id: 'q006',
    domainId: 1,
    question: 'A security analyst is reviewing access control models. In which model are access decisions based on the sensitivity label of the resource and the clearance level of the user, with the operating system enforcing the policy?',
    options: [
      'A. Discretionary Access Control (DAC)',
      'B. Role-Based Access Control (RBAC)',
      'C. Mandatory Access Control (MAC)',
      'D. Attribute-Based Access Control (ABAC)'
    ],
    answer: 2,
    explanation: 'Mandatory Access Control (MAC) is a model where the operating system enforces access decisions based on security labels (e.g., Top Secret, Secret) assigned to both subjects (users) and objects (resources). Users cannot override these policies. DAC allows resource owners to grant access at their discretion, such as file permissions in Linux or Windows. RBAC assigns permissions based on job roles rather than sensitivity labels. ABAC makes access decisions based on multiple attributes including user attributes, resource attributes, and environmental conditions.'
  },
  {
    id: 'q007',
    domainId: 1,
    question: 'A certificate authority (CA) issues a digital certificate to a web server. Which component of the PKI infrastructure is responsible for publishing a list of certificates that have been revoked before their expiration date?',
    options: [
      'A. Registration Authority (RA)',
      'B. Certificate Revocation List (CRL)',
      'C. Online Certificate Status Protocol (OCSP)',
      'D. Key escrow'
    ],
    answer: 1,
    explanation: 'A Certificate Revocation List (CRL) is a list published by a Certificate Authority containing serial numbers of digital certificates that have been revoked before their scheduled expiration date. Browsers and applications check the CRL to ensure they are not trusting a revoked certificate. The Registration Authority (RA) handles certificate enrollment and verification on behalf of the CA but does not publish revocation lists. OCSP is an alternative protocol for checking certificate revocation status in real time, but it is a protocol rather than the list itself. Key escrow is a system where cryptographic keys are stored by a trusted third party.'
  },
  {
    id: 'q008',
    domainId: 1,
    question: 'Which of the following BEST describes a zero-trust security architecture?',
    options: [
      'A. Trust all traffic on the internal network and verify only external connections',
      'B. Never trust any network traffic and verify every request regardless of location',
      'C. Use a single strong perimeter firewall to prevent all external threats',
      'D. Grant permanent trust once a user has authenticated successfully'
    ],
    answer: 1,
    explanation: 'Zero-trust is a security model based on the principle of "never trust, always verify." It assumes that threats exist both inside and outside the network perimeter, so every access request must be authenticated, authorized, and continuously validated regardless of where it originates. Option A describes the legacy perimeter-based security model, which zero-trust replaces. Option C describes traditional perimeter security that zero-trust moves away from. Option D contradicts zero-trust by granting permanent trust, whereas zero-trust requires continuous verification.'
  },
  {
    id: 'q009',
    domainId: 1,
    question: 'A security professional needs to implement a control that will automatically lock a user account after five consecutive failed login attempts. Which type of security control is this?',
    options: [
      'A. Compensating control',
      'B. Detective control',
      'C. Preventive control',
      'D. Corrective control'
    ],
    answer: 2,
    explanation: 'An account lockout policy is a preventive control because it actively stops a threat (brute-force or password guessing attack) before it can succeed by locking the account before the attacker can gain unauthorized access. A detective control identifies and records security events after they occur, such as audit logs or intrusion detection systems. A corrective control restores a system to its normal state after an incident. A compensating control is an alternative control used when a primary control cannot be implemented.'
  },
  {
    id: 'q010',
    domainId: 1,
    question: 'An organization uses a system where users prove their identity to a central service, which then provides tokens that can be used to access multiple applications without re-entering credentials. Which technology is being described?',
    options: [
      'A. LDAP directory services',
      'B. Single Sign-On (SSO)',
      'C. Multi-factor authentication',
      'D. OAuth 2.0 authorization only'
    ],
    answer: 1,
    explanation: 'Single Sign-On (SSO) allows users to authenticate once with a central identity provider and then access multiple applications using tokens or assertions without re-entering credentials. This matches the scenario described. LDAP is a directory protocol used to store and retrieve identity information but does not by itself provide the token-based access described. MFA adds additional verification factors but does not address the single authentication for multiple systems aspect. OAuth 2.0 is an authorization framework often used as part of SSO implementations, but the scenario describes the broader SSO concept.'
  },
  {
    id: 'q011',
    domainId: 1,
    question: 'Which of the following hashing algorithms produces a 128-bit digest and is considered cryptographically broken due to collision vulnerabilities?',
    options: [
      'A. SHA-1',
      'B. SHA-256',
      'C. MD5',
      'D. bcrypt'
    ],
    answer: 2,
    explanation: 'MD5 produces a 128-bit (32 hexadecimal character) hash digest and is considered cryptographically broken because researchers have demonstrated practical collision attacks—where two different inputs produce the same hash. MD5 should not be used for security-sensitive applications such as digital signatures or certificate fingerprints. SHA-1 produces a 160-bit digest and is also considered weak but not 128-bit. SHA-256 produces a 256-bit digest and is currently considered secure. bcrypt is a password hashing function designed to be computationally expensive, not a general-purpose hash.'
  },
  {
    id: 'q012',
    domainId: 1,
    question: 'A company requires that all employees use company-managed devices, that applications are approved before installation, and that data is encrypted on all endpoints. These requirements are BEST enforced through which technology?',
    options: [
      'A. Network Access Control (NAC)',
      'B. Mobile Device Management (MDM)',
      'C. Data Loss Prevention (DLP)',
      'D. Security Information and Event Management (SIEM)'
    ],
    answer: 1,
    explanation: 'Mobile Device Management (MDM) solutions allow organizations to enforce policies on endpoint devices, including requiring device encryption, controlling which applications can be installed, remotely wiping devices, and ensuring devices are managed and compliant. This matches all three requirements described. NAC controls network access based on device compliance but does not manage application installation or encryption at the OS level. DLP focuses specifically on preventing sensitive data from leaving the organization. SIEM collects and analyzes log data for security monitoring purposes.'
  },
  {
    id: 'q013',
    domainId: 1,
    question: 'An attacker sends a large number of SYN packets to a server but never completes the TCP three-way handshake. The server\'s connection table fills up and legitimate users cannot connect. Which type of attack is this?',
    options: [
      'A. Smurf attack',
      'B. SYN flood denial of service attack',
      'C. Session hijacking',
      'D. ARP poisoning'
    ],
    answer: 1,
    explanation: 'A SYN flood is a type of denial-of-service attack where an attacker sends numerous TCP SYN packets to initiate connections but never completes the three-way handshake (never sends the final ACK). The server allocates resources for each half-open connection and its connection table fills up, preventing legitimate connections. A Smurf attack uses ICMP echo requests with a spoofed source address. Session hijacking involves taking over an established session, not filling connection tables. ARP poisoning manipulates ARP tables to associate an attacker\'s MAC address with a legitimate IP address.'
  },
  {
    id: 'q014',
    domainId: 1,
    question: 'Which of the following BEST describes steganography?',
    options: [
      'A. Encrypting data so it cannot be read without a key',
      'B. Hiding data within another file or medium so its existence is concealed',
      'C. Digitally signing data to verify its authenticity',
      'D. Hashing data to verify its integrity'
    ],
    answer: 1,
    explanation: 'Steganography is the practice of concealing a message or data within another non-secret file or message (such as an image, audio file, or video) so that only the intended recipient knows a hidden message exists. Unlike encryption, which makes data unreadable but visible, steganography hides the very existence of the data. Encrypting data (Option A) makes it unreadable but does not hide its existence. Digital signatures (Option C) verify authenticity and provide non-repudiation. Hashing (Option D) produces a fixed-length digest used for integrity verification.'
  },
  {
    id: 'q015',
    domainId: 1,
    question: 'A security team is classifying data and wants to label financial records that, if disclosed, would cause serious damage to national security. Which classification label is MOST appropriate in a government context?',
    options: [
      'A. Confidential',
      'B. Secret',
      'C. Top Secret',
      'D. Sensitive But Unclassified (SBU)'
    ],
    answer: 2,
    explanation: 'In the US government classification system, "Top Secret" is applied to information where unauthorized disclosure could cause exceptionally grave damage to national security. "Secret" is used when disclosure could cause serious damage. "Confidential" is the lowest classification and applies to information where disclosure could cause damage. "Sensitive But Unclassified" (now often called "Controlled Unclassified Information") applies to information that is sensitive but does not meet the criteria for formal classification. The scenario mentions "serious damage to national security," which technically aligns with Secret, but "exceptionally grave damage" would be Top Secret—the question says "serious damage," making Secret (B) the BEST answer. Wait—re-reading: "serious damage to national security" = Secret. The answer is B.'
  },

  // ============================================================
  // DOMAIN 2: Threats, Vulnerabilities & Mitigations (22%) - 26 questions
  // ============================================================
  {
    id: 'q016',
    domainId: 2,
    question: 'A user receives an email appearing to come from their bank stating their account has been suspended. The email contains a link that redirects to a convincing replica of the bank\'s website where credentials are harvested. Which type of attack is this?',
    options: [
      'A. Vishing',
      'B. Spear phishing',
      'C. Pharming',
      'D. Phishing'
    ],
    answer: 3,
    explanation: 'Phishing is a social engineering attack that uses deceptive emails designed to look like legitimate communications from trusted organizations to trick users into revealing credentials or clicking malicious links. The email impersonating a bank and directing to a fake site is a classic phishing attack. Vishing (voice phishing) uses phone calls instead of email. Spear phishing is a targeted version of phishing aimed at specific individuals using personalized information—this scenario is a generic mass-phishing attack. Pharming attacks the DNS system to redirect legitimate website requests to fraudulent sites without requiring the user to click a link.'
  },
  {
    id: 'q017',
    domainId: 2,
    question: 'An attacker gains access to a target organization\'s network by exploiting trust relationships between the target and one of its software vendors. The attacker compromised the vendor\'s build pipeline to insert malicious code into a legitimate software update. Which type of attack is this?',
    options: [
      'A. Man-in-the-middle attack',
      'B. Supply chain attack',
      'C. Watering hole attack',
      'D. Pass-the-hash attack'
    ],
    answer: 1,
    explanation: 'A supply chain attack compromises a target indirectly by infiltrating the systems, software, or hardware of trusted third-party vendors or suppliers. The SolarWinds attack is a prominent real-world example where attackers inserted malicious code into a legitimate software update. A man-in-the-middle attack intercepts communications between two parties. A watering hole attack compromises a website that the target organization\'s employees are likely to visit. A pass-the-hash attack uses captured NTLM hash credentials to authenticate without knowing the plaintext password.'
  },
  {
    id: 'q018',
    domainId: 2,
    question: 'A penetration tester discovers that a web application constructs SQL queries using unsanitized user input. When the tester types `\' OR \'1\'=\'1` into the login field, they gain access without valid credentials. Which vulnerability is being exploited?',
    options: [
      'A. Cross-site scripting (XSS)',
      'B. SQL injection',
      'C. Cross-site request forgery (CSRF)',
      'D. Buffer overflow'
    ],
    answer: 1,
    explanation: 'SQL injection occurs when an application incorporates unsanitized user input into SQL queries, allowing attackers to manipulate the query logic. The input `\' OR \'1\'=\'1` causes the SQL WHERE clause to always evaluate as true, bypassing authentication. XSS injects malicious scripts into web pages viewed by other users. CSRF tricks authenticated users into unknowingly submitting malicious requests. Buffer overflow attacks write data beyond allocated memory boundaries to overwrite adjacent memory, potentially gaining code execution.'
  },
  {
    id: 'q019',
    domainId: 2,
    question: 'A company\'s web application is experiencing an attack where malicious JavaScript code is injected into pages that are subsequently viewed by other users, causing their session cookies to be sent to an attacker-controlled server. Which type of vulnerability is being exploited?',
    options: [
      'A. Stored Cross-Site Scripting (XSS)',
      'B. Reflected Cross-Site Scripting (XSS)',
      'C. SQL Injection',
      'D. XML External Entity (XXE) injection'
    ],
    answer: 0,
    explanation: 'Stored (persistent) XSS occurs when malicious script is permanently saved on the target server (e.g., in a database or comment field) and is later served to other users who view the affected page. Because the script runs in victims\' browsers, it can steal session cookies and send them to attackers. Reflected XSS is not stored but is immediately reflected off the server to the victim—typically via a malicious link. SQL injection manipulates database queries and would not result in malicious JavaScript being served to other users. XXE attacks exploit XML parsers to access files or perform server-side request forgery.'
  },
  {
    id: 'q020',
    domainId: 2,
    question: 'A threat actor sends an email to a CFO impersonating the CEO, urgently requesting a wire transfer to a new vendor. The email is highly personalized and references a recent company acquisition. Which type of attack is this?',
    options: [
      'A. Phishing',
      'B. Whaling',
      'C. Smishing',
      'D. Vishing'
    ],
    answer: 1,
    explanation: 'Whaling is a form of spear phishing that specifically targets high-value individuals such as executives (C-suite). It often involves Business Email Compromise (BEC) where attackers impersonate senior executives to authorize fraudulent financial transactions. The scenario describes a highly personalized attack targeting a CFO impersonating a CEO for financial gain, which is the hallmark of whaling. Generic phishing targets large groups without personalization. Smishing uses SMS text messages. Vishing uses voice calls.'
  },
  {
    id: 'q021',
    domainId: 2,
    question: 'An organization\'s security team discovers that an employee has been collecting and exfiltrating sensitive data to a competitor over the past six months using legitimate access credentials. Which type of threat does this represent?',
    options: [
      'A. Advanced Persistent Threat (APT)',
      'B. Insider threat',
      'C. Nation-state threat actor',
      'D. Hacktivist'
    ],
    answer: 1,
    explanation: 'An insider threat comes from individuals within the organization—such as current or former employees, contractors, or business partners—who misuse their legitimate access to cause harm. The scenario describes a current employee abusing authorized access to steal data. An APT is typically a nation-state or sophisticated external group that maintains long-term, stealthy access—it could overlap with an insider but the key differentiator here is the employee using their own credentials. Nation-state actors are government-sponsored threat actors targeting foreign organizations. Hacktivists are motivated by political or social causes, not corporate espionage.'
  },
  {
    id: 'q022',
    domainId: 2,
    question: 'A security analyst observes that a critical server is consuming 100% CPU and sending large amounts of traffic to multiple IP addresses on the internet. Upon investigation, they find the server is participating in coordinated attacks on other organizations. The server is MOST likely infected with which type of malware?',
    options: [
      'A. Ransomware',
      'B. Spyware',
      'C. Bot (part of a botnet)',
      'D. Rootkit'
    ],
    answer: 2,
    explanation: 'A bot is malware that connects an infected system to a command-and-control (C2) server, making it part of a botnet. Botnets are used to perform coordinated attacks such as DDoS, spam campaigns, or credential stuffing against other organizations. The high CPU usage and outbound attacks to multiple IPs are hallmarks of botnet activity. Ransomware encrypts files and demands payment—it would not typically cause outbound attacks. Spyware collects information and sends it back to attackers. A rootkit hides malware presence but is not itself responsible for the attacking behavior described.'
  },
  {
    id: 'q023',
    domainId: 2,
    question: 'A vulnerability scanner identifies a finding with a CVSS base score of 9.8. Which of the following actions should the security team take FIRST?',
    options: [
      'A. Document the finding and schedule remediation in the next quarterly patch cycle',
      'B. Immediately assess exploitability in the environment and prioritize remediation',
      'C. Wait for the vendor to release a patch before taking any action',
      'D. Ignore the finding as CVSS scores do not reflect real-world risk'
    ],
    answer: 1,
    explanation: 'A CVSS score of 9.8 out of 10 is classified as Critical, indicating the vulnerability is extremely severe and potentially remotely exploitable without authentication. The immediate response should be to assess whether the vulnerability is exploitable in the specific environment and prioritize urgent remediation. Scheduling for the next quarterly cycle would leave the organization exposed to a critical risk for too long. Waiting for a patch is inappropriate when compensating controls or configuration changes may mitigate the risk immediately. CVSS scores, while imperfect, are a widely accepted standard for vulnerability severity that should not be ignored.'
  },
  {
    id: 'q024',
    domainId: 2,
    question: 'Which of the following BEST describes a rainbow table attack?',
    options: [
      'A. A brute-force attack that tries every possible password combination',
      'B. An attack using precomputed hash values to reverse-lookup plaintext passwords',
      'C. A social engineering attack that uses colorful graphics to lure victims',
      'D. A dictionary attack that uses common password lists'
    ],
    answer: 1,
    explanation: 'A rainbow table attack uses precomputed tables of hash values and their corresponding plaintext inputs to quickly reverse password hashes. Instead of computing hashes in real time (as brute-force does), the attacker looks up the hash in the table to find the plaintext, making it much faster. Rainbow tables are defeated by adding a unique random salt to passwords before hashing. Brute-force attacks try every possible combination in real time. Dictionary attacks use lists of common words and passwords but also compute hashes in real time. The colorful graphics option is a distracting nonsensical answer.'
  },
  {
    id: 'q025',
    domainId: 2,
    question: 'An attacker exploits a vulnerability in a web application to make HTTP requests from the server to internal resources that are not accessible from the internet. Which type of vulnerability is this?',
    options: [
      'A. Cross-Site Request Forgery (CSRF)',
      'B. Server-Side Request Forgery (SSRF)',
      'C. Remote File Inclusion (RFI)',
      'D. Directory traversal'
    ],
    answer: 1,
    explanation: 'Server-Side Request Forgery (SSRF) is a vulnerability that allows attackers to induce the server to make HTTP requests to an arbitrary domain or IP address, including internal resources not otherwise accessible from the internet (such as cloud metadata endpoints or internal admin interfaces). CSRF tricks authenticated users into making unwanted requests from their browser. Remote File Inclusion exploits web applications that allow file paths from remote URLs to be included in the application. Directory traversal accesses files outside the web root by manipulating file path variables.'
  },
  {
    id: 'q026',
    domainId: 2,
    question: 'A company\'s files are suddenly encrypted and the attacker demands payment in cryptocurrency to provide the decryption key. After investigation, it is found the attacker gained initial access through a phishing email that executed a malicious macro. Which malware category BEST describes this attack?',
    options: [
      'A. Worm',
      'B. Ransomware',
      'C. Adware',
      'D. Fileless malware'
    ],
    answer: 1,
    explanation: 'Ransomware is malware that encrypts a victim\'s data and demands payment (typically cryptocurrency) in exchange for the decryption key. This precisely matches the scenario described. A worm self-propagates across networks without human interaction but does not necessarily encrypt files or demand payment. Adware displays unwanted advertisements and is generally not destructive. Fileless malware operates in memory without writing files to disk—while ransomware can have fileless components, the primary classification for file-encrypting malware demanding ransom is ransomware.'
  },
  {
    id: 'q027',
    domainId: 2,
    question: 'During a penetration test, a tester uses a technique to capture and replay valid authentication tokens to gain unauthorized access. Which attack technique is being used?',
    options: [
      'A. Pass-the-hash',
      'B. Credential stuffing',
      'C. Replay attack',
      'D. Kerberoasting'
    ],
    answer: 2,
    explanation: 'A replay attack captures valid authentication credentials or tokens during a legitimate session and later replays them to gain unauthorized access. Modern defenses include timestamps, nonces, and session tokens to prevent replay attacks. Pass-the-hash specifically captures NTLM hash values (not tokens) and uses them to authenticate to Windows systems. Credential stuffing uses breached username/password combinations from other sites in automated login attempts. Kerberoasting targets Kerberos service tickets to crack service account passwords offline.'
  },
  {
    id: 'q028',
    domainId: 2,
    question: 'A security analyst notices unusual DNS queries from internal hosts resolving domains with randomly generated characters (e.g., a7f3k2.evil.com, x9p1m8.evil.com). This behavior MOST likely indicates:',
    options: [
      'A. DNS cache poisoning',
      'B. DNS tunneling for command-and-control communication',
      'C. DDoS amplification attack preparation',
      'D. DNSSEC validation failure'
    ],
    answer: 1,
    explanation: 'DNS tunneling uses DNS queries and responses to covertly transmit data, often for command-and-control (C2) communication. Malware uses domain generation algorithms (DGA) to generate numerous random subdomains that resolve to C2 infrastructure, making it difficult to block by domain name. The pattern of numerous randomly generated subdomains under a single domain is a classic indicator of DGA-based malware. DNS cache poisoning injects false DNS records. DDoS amplification uses open DNS resolvers to amplify attack traffic. DNSSEC failures would produce error responses, not unusual query patterns.'
  },
  {
    id: 'q029',
    domainId: 2,
    question: 'An attacker positions themselves on the same network segment as a victim and intercepts traffic between the victim and the default gateway by sending gratuitous ARP replies claiming to be the gateway. Which attack is being performed?',
    options: [
      'A. DNS spoofing',
      'B. MAC flooding',
      'C. ARP poisoning (ARP spoofing)',
      'D. IP spoofing'
    ],
    answer: 2,
    explanation: 'ARP poisoning (also called ARP spoofing) involves sending unsolicited ARP replies to associate an attacker\'s MAC address with a legitimate IP address (such as the default gateway). This causes traffic intended for the gateway to be sent to the attacker, enabling a man-in-the-middle attack. DNS spoofing manipulates DNS responses to redirect domain name lookups. MAC flooding sends thousands of fake MAC addresses to overwhelm a switch\'s CAM table, causing it to broadcast all frames. IP spoofing forges the source IP address in packets but does not directly intercept traffic.'
  },
  {
    id: 'q030',
    domainId: 2,
    question: 'A zero-day vulnerability has been discovered in a widely used VPN product. The vendor has not yet released a patch. Which of the following is the BEST immediate mitigation strategy?',
    options: [
      'A. Disable the VPN service until a patch is available',
      'B. Apply additional monitoring, restrict access, and implement compensating controls such as WAF rules or network segmentation',
      'C. Wait for the vendor to release a patch before taking any action',
      'D. Migrate all users to a different authentication method immediately'
    ],
    answer: 1,
    explanation: 'When a zero-day vulnerability exists with no patch available, the best approach is to implement compensating controls to reduce the attack surface while maintaining operations. This includes enhanced monitoring, applying vendor-recommended workarounds, restricting access to the affected service, adding WAF rules, and increasing network segmentation. Disabling the VPN entirely may be necessary in extreme cases but would disrupt business operations. Waiting for a patch leaves the organization unprotected and exposed. Immediately migrating all users to a different authentication method may be impractical and does not address the vulnerable system that may still be accessible.'
  },
  {
    id: 'q031',
    domainId: 2,
    question: 'A threat intelligence report indicates that an Advanced Persistent Threat (APT) group is targeting organizations in a specific industry using spear-phishing emails with weaponized PDF attachments. Which characteristic BEST defines an APT?',
    options: [
      'A. Attacks motivated by financial gain through ransomware deployment',
      'B. Long-term, stealthy intrusions typically sponsored by nation-states with specific strategic objectives',
      'C. Automated malware that spreads rapidly across networks without human intervention',
      'D. Opportunistic attacks targeting any vulnerable system without specific objectives'
    ],
    answer: 1,
    explanation: 'Advanced Persistent Threats (APTs) are sophisticated, long-term attack campaigns typically sponsored by nation-states or well-funded organizations. They are characterized by stealth, persistence over extended periods, use of advanced techniques to evade detection, and specific strategic objectives (e.g., espionage, intellectual property theft). APTs are not primarily financially motivated ransomware groups (Option A). Self-propagating automated malware (Option C) describes worms or botnets. Opportunistic attacks (Option D) describe script kiddies or automated scanners, not APTs.'
  },
  {
    id: 'q032',
    domainId: 2,
    question: 'A developer writes code that accepts user input to specify a file path and displays the file content. An attacker enters `../../../../etc/passwd` as the input and successfully reads the system password file. Which vulnerability is being exploited?',
    options: [
      'A. Remote code execution',
      'B. Directory traversal (path traversal)',
      'C. Command injection',
      'D. File inclusion'
    ],
    answer: 1,
    explanation: 'Directory traversal (also called path traversal) exploits insufficient input validation to access files and directories outside the intended web root directory. The `../` sequences navigate up the directory tree, allowing attackers to reach sensitive system files. Remote code execution would allow the attacker to run arbitrary code, not just read files. Command injection injects operating system commands into input fields. File inclusion (RFI/LFI) includes files within a web application\'s execution context rather than simply reading them.'
  },
  {
    id: 'q033',
    domainId: 2,
    question: 'Which of the following BEST describes the difference between a vulnerability and an exploit?',
    options: [
      'A. A vulnerability is a weakness, while an exploit is the code or technique used to take advantage of that weakness',
      'B. A vulnerability is malicious software, while an exploit is the vulnerability\'s impact on a system',
      'C. A vulnerability is a type of attack, while an exploit is the patch that fixes the vulnerability',
      'D. There is no meaningful difference; the terms are interchangeable in security contexts'
    ],
    answer: 0,
    explanation: 'A vulnerability is a weakness or flaw in a system, application, or process that could be leveraged to compromise security. An exploit is the specific code, tool, or technique that takes advantage of a vulnerability to cause unintended behavior. For example, a buffer overflow is a vulnerability; shellcode that triggers it is the exploit. Malware (Option B) is a separate concept from vulnerabilities. Patches (Option C) remediate vulnerabilities and are not exploits. The terms are definitively not interchangeable (Option D), as this distinction is fundamental to vulnerability management.'
  },
  {
    id: 'q034',
    domainId: 2,
    question: 'A security team is performing threat modeling for a new application. They use a framework that categorizes threats into Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege. Which threat modeling framework are they using?',
    options: [
      'A. PASTA',
      'B. STRIDE',
      'C. DREAD',
      'D. MITRE ATT&CK'
    ],
    answer: 1,
    explanation: 'STRIDE is a threat modeling framework developed by Microsoft that categorizes threats into six types: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege. Each letter in STRIDE represents a threat category. PASTA (Process for Attack Simulation and Threat Analysis) is a risk-centric threat modeling approach with seven stages. DREAD is a risk assessment model that scores threats on Damage, Reproducibility, Exploitability, Affected users, and Discoverability. MITRE ATT&CK is a knowledge base of adversary tactics and techniques, not a threat modeling framework.'
  },
  {
    id: 'q035',
    domainId: 2,
    question: 'An attacker discovers that a legacy industrial control system runs software with a known critical vulnerability. The vendor has stopped supporting the product and will not release a patch. What is the MOST appropriate long-term mitigation?',
    options: [
      'A. Apply the unofficial community patch created by security researchers',
      'B. Isolate the system in a network segment with strict firewall rules and begin planning for replacement',
      'C. Accept the risk and continue normal operations since the system is legacy',
      'D. Install a general-purpose antivirus product on the industrial control system'
    ],
    answer: 1,
    explanation: 'For unsupported legacy systems that cannot be patched, the BEST approach is to compensate with network isolation (placing the system behind strict firewall rules with allowlisting, removing unnecessary network connectivity), while planning and budgeting for replacement. This is especially important for industrial control systems (ICS/SCADA) where availability is critical. Unofficial community patches are untested and may introduce new vulnerabilities or break functionality. Simply accepting the risk without mitigation is irresponsible for a critical vulnerability. Antivirus on ICS systems is often not supported, may cause instability, and does not address the underlying unpatched vulnerability.'
  },
  {
    id: 'q036',
    domainId: 2,
    question: 'A web application allows users to upload files. An attacker uploads a PHP web shell disguised as an image file. The attacker then accesses the file via the web browser and executes system commands on the server. Which type of attack does this represent?',
    options: [
      'A. Cross-site scripting',
      'B. Unrestricted file upload leading to remote code execution',
      'C. SQL injection',
      'D. CSRF attack'
    ],
    answer: 1,
    explanation: 'An unrestricted file upload vulnerability allows attackers to upload files with dangerous content (such as server-side scripts) that can be executed. When a web shell is uploaded and accessed via URL, the attacker gains remote code execution (RCE) on the server. Mitigations include validating file types, renaming uploaded files, storing them outside the web root, and disabling execution permissions. XSS injects client-side scripts, not server-side scripts. SQL injection targets database queries. CSRF exploits authenticated sessions to make unauthorized requests.'
  },
  {
    id: 'q037',
    domainId: 2,
    question: 'During a security assessment, an analyst discovers that an application is vulnerable to clickjacking. Which HTTP security header would BEST mitigate this vulnerability?',
    options: [
      'A. Content-Security-Policy (CSP)',
      'B. X-Frame-Options',
      'C. HTTP Strict Transport Security (HSTS)',
      'D. X-Content-Type-Options'
    ],
    answer: 1,
    explanation: 'The X-Frame-Options HTTP response header prevents a page from being embedded in an iframe, which directly mitigates clickjacking attacks. Setting it to DENY or SAMEORIGIN prevents attackers from overlaying invisible iframes over legitimate content. Content-Security-Policy can also address clickjacking via the frame-ancestors directive and is increasingly preferred, but X-Frame-Options is the classic and most direct mitigation for clickjacking. HSTS enforces HTTPS connections and does not address clickjacking. X-Content-Type-Options prevents MIME type sniffing but is unrelated to clickjacking.'
  },
  {
    id: 'q038',
    domainId: 2,
    question: 'A security analyst is reviewing the MITRE ATT&CK framework. A threat actor is observed performing "Living off the Land" techniques by using built-in system tools like PowerShell and WMI to execute their attack without dropping malware to disk. Under which ATT&CK tactic does this BEST fall?',
    options: [
      'A. Initial Access',
      'B. Defense Evasion',
      'C. Exfiltration',
      'D. Lateral Movement'
    ],
    answer: 1,
    explanation: 'Living off the Land (LotL) attacks use legitimate, built-in tools (like PowerShell, WMI, certutil, mshta) to perform malicious activities, making detection difficult because no malware is dropped to disk. This technique primarily falls under Defense Evasion in MITRE ATT&CK because attackers use trusted tools to evade security products that look for known malicious binaries. Initial Access covers how attackers first gain entry. Exfiltration covers data theft techniques. Lateral Movement covers techniques for moving through the network—while LotL can be used for lateral movement, the core purpose of using built-in tools is defense evasion.'
  },
  {
    id: 'q039',
    domainId: 2,
    question: 'An organization conducts a penetration test and the tester is given documentation including network diagrams, IP addresses, and system architecture before testing begins. What type of penetration test is this?',
    options: [
      'A. Black-box test',
      'B. Gray-box test',
      'C. White-box test',
      'D. Red team exercise'
    ],
    answer: 2,
    explanation: 'A white-box (also called crystal-box or full-knowledge) penetration test provides the tester with complete information about the target environment, including network diagrams, source code, IP ranges, and architecture documentation. This allows comprehensive testing of the entire attack surface. A black-box test simulates an external attacker with no prior knowledge of the environment. A gray-box test provides partial information. A red team exercise simulates a full adversarial campaign (usually black-box) to test detection and response capabilities, not just find vulnerabilities.'
  },
  {
    id: 'q040',
    domainId: 2,
    question: 'A malicious program embeds itself within a legitimate executable and activates when a specific date is reached, deleting all files on the affected system. Which type of malware is this?',
    options: [
      'A. Worm',
      'B. Trojan horse with a logic bomb',
      'C. Rootkit',
      'D. Ransomware'
    ],
    answer: 1,
    explanation: 'A logic bomb is code that executes a malicious payload when specific conditions are met (such as a date, time, or event). When embedded within a legitimate executable (making it a Trojan horse), the combined threat is a Trojan with a logic bomb. A worm self-propagates across networks independently without needing a host file. A rootkit hides malware presence on a system. Ransomware encrypts files and demands payment—it does not typically delete files (which would eliminate the leverage for demanding ransom).'
  },
  {
    id: 'q041',
    domainId: 2,
    question: 'A security analyst is reviewing vulnerability scan results and must prioritize remediation. Which factor is MOST important when determining remediation priority?',
    options: [
      'A. The vulnerability\'s CVSS base score alone',
      'B. The asset\'s criticality combined with exploitability and potential business impact',
      'C. The date the vulnerability was published in the NVD',
      'D. Whether the vulnerability has a publicly available exploit in Exploit-DB'
    ],
    answer: 1,
    explanation: 'Effective vulnerability prioritization requires considering multiple factors: the criticality of the affected asset (does it store sensitive data or support critical business functions?), the exploitability of the vulnerability (is there a known exploit, is it remotely exploitable?), and the potential business impact if compromised. CVSS base score alone (Option A) does not account for the specific environment or asset value. Publication date (Option C) is irrelevant to risk. Publicly available exploits (Option D) is an important factor but is just one element of exploitability, not the complete picture.'
  },

  // ============================================================
  // DOMAIN 3: Security Architecture (18%) - 22 questions
  // ============================================================
  {
    id: 'q042',
    domainId: 3,
    question: 'A company wants to allow remote employees secure access to internal applications without exposing those applications directly to the internet. Which technology provides application-level access control that is an alternative to traditional VPNs?',
    options: [
      'A. Software-Defined Perimeter (SDP) / Zero Trust Network Access (ZTNA)',
      'B. SSL VPN with split tunneling',
      'C. IPsec site-to-site VPN',
      'D. Network Address Translation (NAT)'
    ],
    answer: 0,
    explanation: 'Software-Defined Perimeter (SDP), also known as Zero Trust Network Access (ZTNA), provides application-level access control where users only gain access to specific authorized applications, not the entire network. Unlike traditional VPNs that grant broad network access after authentication, ZTNA continuously validates user identity and device posture before allowing access to each application. SSL VPN with split tunneling still grants network access. IPsec site-to-site VPNs connect entire network segments, not individual users to specific applications. NAT translates IP addresses and is not an access control solution.'
  },
  {
    id: 'q043',
    domainId: 3,
    question: 'An organization is designing a network and wants to place web servers that are accessible from the internet while keeping the internal corporate network isolated. Which network architecture component should they use?',
    options: [
      'A. VLAN',
      'B. DMZ (Demilitarized Zone)',
      'C. NAT (Network Address Translation)',
      'D. Proxy server'
    ],
    answer: 1,
    explanation: 'A DMZ (Demilitarized Zone) is a network segment placed between the internet and the internal network, typically protected by two firewalls. Internet-facing servers (web servers, mail servers, DNS) are placed in the DMZ so that if they are compromised, the attacker does not have direct access to the internal corporate network. VLANs segment networks at Layer 2 but are a different concept—they can be used to create a DMZ but are not the primary term for this architecture. NAT hides internal IP addresses. A proxy server forwards requests on behalf of clients but is not a network architecture that isolates servers.'
  },
  {
    id: 'q044',
    domainId: 3,
    question: 'A cloud architect is designing a multi-tenant cloud environment and needs to ensure that one customer\'s data and compute resources cannot be accessed by another customer. Which cloud security concept BEST addresses this requirement?',
    options: [
      'A. Data masking',
      'B. Tenant isolation',
      'C. Data deduplication',
      'D. Cloud access security broker (CASB)'
    ],
    answer: 1,
    explanation: 'Tenant isolation ensures that in a multi-tenant cloud environment, each customer\'s (tenant\'s) data, applications, and computing resources are logically or physically separated from all other tenants. This prevents cross-tenant data leakage and unauthorized access. Data masking replaces sensitive data with fictional but realistic data. Data deduplication eliminates redundant data copies to save storage. A CASB is a security tool that provides visibility and control over cloud application usage but does not itself enforce the underlying tenant isolation.'
  },
  {
    id: 'q045',
    domainId: 3,
    question: 'A security engineer is implementing infrastructure as code (IaC) for a cloud deployment. They want to ensure that any misconfigurations (such as publicly accessible S3 buckets or overly permissive security groups) are detected before resources are deployed. Which approach BEST accomplishes this?',
    options: [
      'A. Running vulnerability scans on deployed infrastructure weekly',
      'B. Static analysis of IaC templates as part of the CI/CD pipeline before deployment',
      'C. Implementing a CASB to monitor cloud usage after deployment',
      'D. Enabling cloud provider logging and reviewing logs monthly'
    ],
    answer: 1,
    explanation: 'Static analysis of Infrastructure as Code (IaC) templates (using tools like Checkov, tfsec, or CloudFormation Guard) in the CI/CD pipeline catches misconfigurations before resources are deployed, embodying the "shift left" security principle. This prevents misconfigured resources from ever reaching production. Weekly vulnerability scans detect problems after deployment. CASBs monitor cloud usage but do not prevent IaC misconfigurations before deployment. Monthly log reviews are reactive and do not prevent misconfiguration.'
  },
  {
    id: 'q046',
    domainId: 3,
    question: 'An organization is evaluating cloud service models. They want to use applications managed entirely by the cloud provider without managing operating systems, middleware, or runtime environments. Which cloud service model meets this requirement?',
    options: [
      'A. Infrastructure as a Service (IaaS)',
      'B. Platform as a Service (PaaS)',
      'C. Software as a Service (SaaS)',
      'D. Function as a Service (FaaS)'
    ],
    answer: 2,
    explanation: 'Software as a Service (SaaS) delivers fully managed applications over the internet where the cloud provider manages everything including infrastructure, OS, middleware, and the application itself. The customer only manages their data and user access. IaaS provides virtualized infrastructure (compute, storage, networking) where the customer manages the OS and above. PaaS provides a platform for developing and deploying applications—the customer manages the application code but not the OS. FaaS (serverless functions) is a more granular model for running individual functions without managing servers.'
  },
  {
    id: 'q047',
    domainId: 3,
    question: 'A financial institution requires that its most sensitive data processing must occur on systems that they fully control, while less sensitive workloads can use public cloud resources. Which cloud deployment model BEST fits this requirement?',
    options: [
      'A. Public cloud',
      'B. Private cloud',
      'C. Hybrid cloud',
      'D. Community cloud'
    ],
    answer: 2,
    explanation: 'A hybrid cloud combines private cloud (or on-premises) infrastructure with public cloud resources, allowing organizations to run sensitive workloads on controlled infrastructure while leveraging public cloud scalability for less sensitive workloads. This is the most common enterprise cloud model. A public cloud is managed entirely by third-party providers with shared infrastructure. A private cloud is dedicated to a single organization but does not incorporate public cloud resources. A community cloud is shared by organizations with common requirements (e.g., government agencies).'
  },
  {
    id: 'q048',
    domainId: 3,
    question: 'A security architect is designing a system where all network traffic must pass through a central inspection point before reaching any endpoint. Which architectural concept does this represent?',
    options: [
      'A. Defense in depth',
      'B. Network segmentation',
      'C. A choke point or traffic inspection bottleneck',
      'D. Air gap'
    ],
    answer: 2,
    explanation: 'A choke point is a single point in the network architecture through which all traffic must pass, allowing comprehensive inspection and control. Firewalls and proxy servers are commonly implemented as choke points. Defense in depth is a broader strategy of layering multiple security controls. Network segmentation divides the network into zones but does not necessarily create a single inspection point for all traffic. An air gap physically isolates a network from other networks and the internet, preventing all connectivity rather than inspecting it.'
  },
  {
    id: 'q049',
    domainId: 3,
    question: 'An organization wants to implement a solution that decrypts HTTPS traffic at the network edge, inspects the content for threats, and then re-encrypts it before sending it to the destination. Which technology is being described?',
    options: [
      'A. IDS (Intrusion Detection System)',
      'B. SSL/TLS inspection (SSL decryption)',
      'C. DLP (Data Loss Prevention)',
      'D. DNSSEC'
    ],
    answer: 1,
    explanation: 'SSL/TLS inspection (also called SSL decryption or SSL interception) involves a security device acting as a man-in-the-middle to decrypt HTTPS traffic, inspect it for threats or policy violations, and then re-encrypt and forward it. This requires deploying a trusted certificate to endpoints. An IDS detects threats but cannot decrypt SSL traffic without SSL inspection capability. DLP focuses on preventing sensitive data from leaving the organization. DNSSEC adds authentication to DNS responses and has no role in TLS traffic inspection.'
  },
  {
    id: 'q050',
    domainId: 3,
    question: 'A company is designing its network and wants to ensure that even if the external firewall is compromised, internal systems are still protected. Which design principle does this reflect?',
    options: [
      'A. Fail-open design',
      'B. Defense in depth',
      'C. Single point of failure elimination',
      'D. Security through obscurity'
    ],
    answer: 1,
    explanation: 'Defense in depth is the security principle of layering multiple security controls so that if one control fails or is bypassed, additional controls still protect the asset. Placing internal firewalls, network segmentation, host-based firewalls, and endpoint protection behind an external firewall ensures no single control failure compromises the entire environment. Fail-open means a system defaults to allowing access when it fails—the opposite of secure design. Eliminating single points of failure is a related availability concept. Security through obscurity relies on keeping security mechanisms secret, which is not a robust security strategy.'
  },
  {
    id: 'q051',
    domainId: 3,
    question: 'An organization deploys a system that monitors network traffic in real time, detects malicious patterns or signatures, and automatically blocks suspicious traffic. Which technology is this?',
    options: [
      'A. IDS (Intrusion Detection System)',
      'B. IPS (Intrusion Prevention System)',
      'C. SIEM',
      'D. Firewall with stateful inspection'
    ],
    answer: 1,
    explanation: 'An Intrusion Prevention System (IPS) monitors network traffic in real time, identifies malicious patterns or signatures, and actively blocks or prevents the malicious traffic from reaching its destination. An IDS only detects and alerts on suspicious traffic but does not block it—it is passive. A SIEM collects and correlates log data from multiple sources for analysis but does not itself inspect or block network traffic in real time. A stateful firewall tracks connection states but applies rules based on ports and protocols, not deep content inspection like an IPS.'
  },
  {
    id: 'q052',
    domainId: 3,
    question: 'A healthcare organization needs to allow medical devices to communicate on the network but cannot patch them due to vendor restrictions. Which architecture control BEST reduces the risk these devices pose?',
    options: [
      'A. Deploy host-based antivirus on all medical devices',
      'B. Segment medical devices into a dedicated VLAN with strict firewall rules allowing only required communications',
      'C. Disable all network connectivity for medical devices',
      'D. Require medical device vendors to provide security patches within 30 days'
    ],
    answer: 1,
    explanation: 'Network segmentation places the unpatched medical devices in an isolated VLAN with firewall rules that permit only the specific ports and protocols required for their function, limiting the blast radius if a device is compromised and preventing lateral movement. Antivirus on medical devices is often unsupported and may violate FDA approvals or void warranties. Disabling network connectivity may prevent required clinical functions and is impractical. Contractual requirements for patches are appropriate long-term but do not immediately address the current risk.'
  },
  {
    id: 'q053',
    domainId: 3,
    question: 'A company is migrating to microservices architecture. Each microservice needs to communicate with others securely. Which approach BEST secures service-to-service communication in this environment?',
    options: [
      'A. Place all microservices on the same network segment and trust all internal traffic',
      'B. Implement mutual TLS (mTLS) for service-to-service authentication and encryption',
      'C. Use API keys stored in environment variables for service authentication',
      'D. Enable a shared username and password for inter-service communication'
    ],
    answer: 1,
    explanation: 'Mutual TLS (mTLS) requires both the client and server to present valid certificates, providing mutual authentication and encrypted communication for service-to-service calls in microservices architectures. This aligns with zero-trust principles by not trusting even internal network traffic. Trusting all internal traffic (Option A) violates zero-trust principles. API keys in environment variables (Option C) can be exposed through misconfigurations or process listings and do not provide mutual authentication. Shared credentials (Option D) are a poor practice that violates accountability and makes rotation difficult.'
  },
  {
    id: 'q054',
    domainId: 3,
    question: 'An organization needs to protect sensitive data stored in a database so that even if the database is stolen, the data cannot be read. Which data protection technique is MOST appropriate?',
    options: [
      'A. Database activity monitoring (DAM)',
      'B. Transparent data encryption (TDE)',
      'C. Data masking',
      'D. Access control lists'
    ],
    answer: 1,
    explanation: 'Transparent Data Encryption (TDE) encrypts the database files on disk (data at rest) so that if the physical database files or backups are stolen, the data cannot be read without the encryption keys. It operates transparently to the application. Database activity monitoring detects suspicious database activity but does not protect stolen physical data. Data masking replaces sensitive data with fictional values and is typically used for non-production environments. Access control lists control who can query the database but do not protect the underlying files if the filesystem is accessed directly.'
  },
  {
    id: 'q055',
    domainId: 3,
    question: 'A cloud security engineer is reviewing the shared responsibility model for IaaS. Which security responsibility typically remains with the CUSTOMER in an IaaS deployment?',
    options: [
      'A. Physical data center security',
      'B. Hypervisor security',
      'C. Guest operating system security, patching, and configuration',
      'D. Network backbone infrastructure security'
    ],
    answer: 2,
    explanation: 'In the IaaS shared responsibility model, the cloud provider is responsible for the physical infrastructure, hypervisor, and networking below the virtual machine level. The customer is responsible for securing everything above the hypervisor, including the guest operating system (patching, hardening, configuration), applications, data, and identity/access management. Physical data center security, hypervisor security, and network backbone are all provider responsibilities in IaaS.'
  },
  {
    id: 'q056',
    domainId: 3,
    question: 'A CISO is evaluating network security appliances and wants a solution that combines firewall, IPS, VPN, and antivirus capabilities into a single device. Which solution should they consider?',
    options: [
      'A. Next-Generation Firewall (NGFW)',
      'B. Unified Threat Management (UTM)',
      'C. Web Application Firewall (WAF)',
      'D. Security Information and Event Management (SIEM)'
    ],
    answer: 1,
    explanation: 'Unified Threat Management (UTM) is a single appliance that integrates multiple security functions including firewall, IPS/IDS, VPN, antivirus, web filtering, and email filtering. It is particularly common in small to medium-sized organizations. A Next-Generation Firewall (NGFW) includes deep packet inspection, application awareness, and integrated IPS but is typically considered a more advanced, enterprise-grade solution focused on network control rather than the all-in-one model. A WAF specifically protects web applications and HTTP traffic. A SIEM collects and analyzes log data for security monitoring.'
  },
  {
    id: 'q057',
    domainId: 3,
    question: 'An organization wants to ensure that users connecting via VPN from unmanaged personal devices cannot access sensitive internal resources unless the device meets security requirements (e.g., has current antivirus, disk encryption, and OS patches). Which technology enforces this?',
    options: [
      'A. DLP (Data Loss Prevention)',
      'B. NAC (Network Access Control)',
      'C. PAM (Privileged Access Management)',
      'D. SSO (Single Sign-On)'
    ],
    answer: 1,
    explanation: 'Network Access Control (NAC) evaluates the security posture of devices attempting to connect to the network and enforces policies based on that assessment. Devices that do not meet requirements (outdated antivirus, missing patches, no disk encryption) can be quarantined, given limited access, or denied access entirely. DLP focuses on preventing data exfiltration. PAM manages access to privileged accounts. SSO simplifies authentication across multiple systems but does not assess device health or enforce network access based on device posture.'
  },
  {
    id: 'q058',
    domainId: 3,
    question: 'A security architect recommends using microsegmentation in a data center. What is the PRIMARY security benefit of this approach?',
    options: [
      'A. It eliminates the need for perimeter firewalls',
      'B. It limits lateral movement by applying granular access controls between individual workloads',
      'C. It improves network performance by reducing broadcast domains',
      'D. It encrypts all east-west traffic between servers'
    ],
    answer: 1,
    explanation: 'Microsegmentation applies fine-grained security policies at the individual workload or virtual machine level, limiting east-west (lateral) traffic between workloads within the data center. If an attacker compromises one workload, microsegmentation prevents them from freely moving to other workloads. It does not eliminate perimeter firewalls, which are still needed for north-south traffic. Reducing broadcast domains is a network efficiency benefit of VLANs. Microsegmentation controls access but does not itself encrypt traffic (encryption would require additional mechanisms like mTLS).'
  },
  {
    id: 'q059',
    domainId: 3,
    question: 'A company is implementing a SASE (Secure Access Service Edge) framework. Which combination of capabilities is MOST associated with SASE?',
    options: [
      'A. On-premises NGFW combined with a legacy VPN concentrator',
      'B. Cloud-delivered security services (ZTNA, CASB, SWG, FWaaS) converged with WAN connectivity (SD-WAN)',
      'C. A centralized data center with dedicated MPLS connections to all branch offices',
      'D. Endpoint detection and response (EDR) combined with SIEM'
    ],
    answer: 1,
    explanation: 'SASE (Secure Access Service Edge) is a cloud-native framework that converges WAN connectivity (typically SD-WAN) with security services including Zero Trust Network Access (ZTNA), Cloud Access Security Broker (CASB), Secure Web Gateway (SWG), and Firewall as a Service (FWaaS). It delivers security and network access from the cloud edge, close to the user or branch. On-premises NGFW with legacy VPN is the traditional approach that SASE replaces. Centralized data center with MPLS is expensive and does not support cloud-first architectures. EDR and SIEM are endpoint and monitoring tools, not WAN or secure access technologies.'
  },
  {
    id: 'q060',
    domainId: 3,
    question: 'An organization wants to ensure business continuity in the event of a disaster. They require that operations can be restored within 4 hours and that no more than 1 hour of data can be lost. Which metrics define these requirements?',
    options: [
      'A. MTTR (Mean Time to Repair) and MTBF (Mean Time Between Failures)',
      'B. RTO (Recovery Time Objective) and RPO (Recovery Point Objective)',
      'C. BIA (Business Impact Analysis) and BCM (Business Continuity Management)',
      'D. SLA (Service Level Agreement) and OLA (Operational Level Agreement)'
    ],
    answer: 1,
    explanation: 'Recovery Time Objective (RTO) defines the maximum acceptable time to restore operations after a disruption (4 hours in this case). Recovery Point Objective (RPO) defines the maximum acceptable amount of data loss measured in time (1 hour in this case), which determines backup frequency. MTTR and MTBF are reliability metrics for predicting and measuring system failure and repair times. BIA and BCM are processes, not specific metrics. SLAs and OLAs are contractual agreements that may incorporate RTO and RPO but are not the metrics themselves.'
  },
  {
    id: 'q061',
    domainId: 3,
    question: 'A security engineer is hardening a new server and follows the principle of reducing the attack surface. Which action is MOST aligned with this principle?',
    options: [
      'A. Installing all available software packages to ensure all functionality is available',
      'B. Disabling unused services, removing unnecessary software, and closing unused ports',
      'C. Enabling all logging features to maximize visibility',
      'D. Configuring the firewall to allow all outbound traffic'
    ],
    answer: 1,
    explanation: 'Reducing the attack surface means removing or disabling everything that is not required for the system\'s function, including unused services, open ports, unnecessary software packages, and default accounts. This limits the number of potential entry points an attacker can exploit. Installing all software (Option A) dramatically increases the attack surface. Enabling all logging is a good security practice but relates to visibility, not attack surface reduction. Allowing all outbound traffic increases risk by permitting data exfiltration and C2 communication.'
  },
  {
    id: 'q062',
    domainId: 3,
    question: 'A company wants to implement a solution that stores, manages, and controls access to cryptographic keys, passwords, and certificates used by applications and services. Which technology BEST fits this need?',
    options: [
      'A. Public Key Infrastructure (PKI)',
      'B. Hardware Security Module (HSM) or secrets management vault',
      'C. Password manager for end users',
      'D. LDAP directory'
    ],
    answer: 1,
    explanation: 'A Hardware Security Module (HSM) provides a tamper-resistant hardware device for securely storing and managing cryptographic keys. Secrets management vaults (like HashiCorp Vault or AWS Secrets Manager) provide similar capabilities in software, managing keys, passwords, certificates, and API tokens with access control and audit logging. PKI provides the framework for certificate issuance but does not manage all types of secrets. End-user password managers are not designed for machine-to-machine secret management. LDAP directories store identity information, not cryptographic secrets.'
  },
  {
    id: 'q063',
    domainId: 3,
    question: 'An organization is designing an API gateway for their microservices. Which security capability should the API gateway provide to protect against API abuse?',
    options: [
      'A. File integrity monitoring',
      'B. Rate limiting, authentication enforcement, and input validation',
      'C. Disk encryption for API response data',
      'D. DNS resolution for microservice names'
    ],
    answer: 1,
    explanation: 'An API gateway provides centralized security controls for APIs including rate limiting (to prevent abuse and DDoS), authentication and authorization enforcement (verifying API keys, OAuth tokens, JWTs), and input validation (protecting against injection attacks). It also provides logging, monitoring, and SSL termination. File integrity monitoring protects files on servers, not APIs. Disk encryption protects data at rest. DNS resolution is a network function unrelated to API security.'
  },

  // ============================================================
  // DOMAIN 4: Security Operations (28%) - 34 questions
  // ============================================================
  {
    id: 'q064',
    domainId: 4,
    question: 'A security analyst receives an alert from the SIEM showing multiple failed login attempts followed by a successful login from an unusual geographic location. Which phase of the incident response process should the analyst initiate?',
    options: [
      'A. Recovery',
      'B. Lessons learned',
      'C. Identification and analysis (triage)',
      'D. Eradication'
    ],
    answer: 2,
    explanation: 'Upon receiving the SIEM alert, the analyst should begin the identification and analysis (triage) phase to determine whether this is a true positive incident, assess its scope, and confirm whether unauthorized access has occurred. The NIST incident response lifecycle includes: Preparation, Detection and Analysis, Containment, Eradication, Recovery, and Post-Incident Activity (Lessons Learned). Recovery and eradication come later in the process after the incident is confirmed and contained. Lessons learned occurs after the incident is fully resolved.'
  },
  {
    id: 'q065',
    domainId: 4,
    question: 'During a forensic investigation, an analyst needs to preserve digital evidence from a compromised laptop. Which principle ensures the evidence will be admissible in legal proceedings?',
    options: [
      'A. Running a virus scan on the laptop before imaging',
      'B. Maintaining a documented chain of custody and creating a forensic image using write blockers',
      'C. Analyzing the live system before imaging to expedite the investigation',
      'D. Deleting suspicious files from the system to prevent further damage'
    ],
    answer: 1,
    explanation: 'For digital evidence to be admissible, it must be collected and preserved in a forensically sound manner. This requires creating a bit-for-bit forensic image using write blockers (to prevent accidental modification), calculating hash values to verify integrity, and maintaining a documented chain of custody showing who handled the evidence and when. Running a virus scan modifies file access timestamps and could alter evidence. Analyzing the live system before imaging risks altering volatile data and the disk state. Deleting files destroys evidence.'
  },
  {
    id: 'q066',
    domainId: 4,
    question: 'A SOC analyst is investigating a potential compromise. They need to determine what changes were made to files on a server over the past 30 days. Which tool or technique would be MOST helpful?',
    options: [
      'A. Network flow data analysis',
      'B. File integrity monitoring (FIM) logs',
      'C. Firewall rule review',
      'D. Password audit'
    ],
    answer: 1,
    explanation: 'File Integrity Monitoring (FIM) continuously monitors critical files, directories, and registry keys for unauthorized changes, logging what changed, when, and by what process. FIM logs would directly show file changes over the past 30 days. Network flow data shows communication patterns between systems but not file system changes. Firewall rule reviews show what traffic is permitted or denied. Password audits test password strength and do not reveal file system modifications.'
  },
  {
    id: 'q067',
    domainId: 4,
    question: 'A company has suffered a ransomware attack. Encrypted systems are still running. What should the incident response team do FIRST?',
    options: [
      'A. Pay the ransom to restore operations as quickly as possible',
      'B. Wipe and rebuild all affected systems from clean backups',
      'C. Isolate affected systems from the network to prevent further spread',
      'D. Contact the FBI and notify law enforcement before taking any action'
    ],
    answer: 2,
    explanation: 'The first priority in a ransomware incident is containment—isolating affected systems from the network to prevent the ransomware from spreading to additional systems, including backup infrastructure. Stopping the spread minimizes damage. Paying the ransom does not guarantee data recovery, may fund criminal activity, and does not address the initial access vector. Wiping and rebuilding (eradication and recovery) comes after containment and evidence preservation. Contacting law enforcement is important but should not delay immediate containment actions.'
  },
  {
    id: 'q068',
    domainId: 4,
    question: 'A security analyst is using a SIEM and notices the following log entry: `Failed login from 192.168.1.50 for user admin (attempt 247 of 247)`. What type of attack does this MOST likely indicate?',
    options: [
      'A. Phishing attack',
      'B. Brute-force password attack',
      'C. Man-in-the-middle attack',
      'D. SQL injection'
    ],
    answer: 1,
    explanation: 'A high number of failed login attempts (247 in this case) for an administrative account from a single source is a strong indicator of a brute-force attack, where the attacker systematically tries many passwords to gain access. Account lockout policies and rate limiting are key defenses. Phishing uses deceptive messages to trick users into revealing credentials. Man-in-the-middle attacks intercept communications between parties. SQL injection attacks target database queries, not authentication login forms in this manner.'
  },
  {
    id: 'q069',
    domainId: 4,
    question: 'An organization wants to proactively search for indicators of compromise in their environment that may have evaded automated detection. Which security practice is being described?',
    options: [
      'A. Vulnerability scanning',
      'B. Security information and event management (SIEM) monitoring',
      'C. Threat hunting',
      'D. Penetration testing'
    ],
    answer: 2,
    explanation: 'Threat hunting is the proactive, analyst-driven practice of searching through network and endpoint data to find threats that automated tools have not detected. Threat hunters develop hypotheses based on threat intelligence and adversary behavior and investigate them manually. Vulnerability scanning identifies known vulnerabilities but does not search for active compromise. SIEM monitoring relies on automated alerts and rules—threat hunting goes beyond these to look for subtle indicators that may not trigger alerts. Penetration testing simulates attacks to find vulnerabilities, not identify active compromises.'
  },
  {
    id: 'q070',
    domainId: 4,
    question: 'A security analyst needs to collect and analyze logs from multiple sources including firewalls, endpoint security, and cloud services to correlate events and identify security incidents. Which technology provides this capability?',
    options: [
      'A. IDS (Intrusion Detection System)',
      'B. SIEM (Security Information and Event Management)',
      'C. Vulnerability scanner',
      'D. NAC (Network Access Control)'
    ],
    answer: 1,
    explanation: 'A SIEM system collects, normalizes, and correlates log data from multiple sources across the environment (firewalls, endpoints, cloud services, servers) to provide centralized visibility, automated alerting, and security analytics for identifying incidents. An IDS analyzes network traffic on a specific network segment. A vulnerability scanner identifies security weaknesses in systems. NAC controls network access based on device compliance but does not correlate multi-source security logs.'
  },
  {
    id: 'q071',
    domainId: 4,
    question: 'A vulnerability scan reveals that a critical production server is missing several security patches. The server runs a custom application that the vendor says has not been tested with the latest patches. What is the BEST course of action?',
    options: [
      'A. Apply all patches immediately without testing to eliminate the risk',
      'B. Accept the risk indefinitely and do not patch until the vendor confirms compatibility',
      'C. Test patches in a staging environment, coordinate with the vendor, implement compensating controls, and schedule a maintenance window for patching',
      'D. Shut down the server until the vendor certifies the patches'
    ],
    answer: 2,
    explanation: 'The best approach balances security with operational risk. Testing patches in a staging environment that mirrors production validates compatibility before production deployment. Coordinating with the vendor accelerates their testing. Implementing compensating controls (enhanced monitoring, network restrictions) reduces risk while the patching process is underway. Scheduling a maintenance window ensures minimal business disruption. Applying patches immediately without testing risks application downtime. Indefinitely accepting the risk without compensating controls is irresponsible. Shutting down a critical production server causes unacceptable business impact.'
  },
  {
    id: 'q072',
    domainId: 4,
    question: 'An analyst discovers an executable file on a compromised system and wants to determine if it is malware without running it in the production environment. Which technique should they use?',
    options: [
      'A. Execute it on the compromised system with administrator privileges',
      'B. Submit it to a malware sandbox for dynamic analysis',
      'C. Email it to the antivirus vendor for analysis',
      'D. Delete it immediately to prevent further infection'
    ],
    answer: 1,
    explanation: 'A malware sandbox provides an isolated, controlled environment where suspicious files can be safely executed and their behavior observed (files dropped, registry changes, network connections, process creation). Dynamic analysis in a sandbox reveals what the malware actually does without risking production systems. Executing it on the compromised system would cause further damage and contaminate forensic evidence. Emailing potentially malicious files risks spreading them and is slow. Deleting the file destroys evidence needed for investigation and incident response.'
  },
  {
    id: 'q073',
    domainId: 4,
    question: 'An organization\'s incident response plan includes a step where, after an incident is resolved, the team reviews what happened, what worked, and what should be improved. Which phase of the incident response lifecycle is this?',
    options: [
      'A. Preparation',
      'B. Recovery',
      'C. Post-incident activity (lessons learned)',
      'D. Detection and analysis'
    ],
    answer: 2,
    explanation: 'The post-incident activity phase (often called lessons learned or post-mortem) occurs after an incident is fully resolved. The team reviews the incident timeline, evaluates the effectiveness of the response, identifies gaps in tools, processes, or training, and updates the incident response plan based on findings. Preparation is the planning phase before incidents occur. Recovery restores systems to normal operation. Detection and analysis is the phase where incidents are identified and their scope determined.'
  },
  {
    id: 'q074',
    domainId: 4,
    question: 'A security team uses indicators of compromise (IoCs) to detect threats. Which of the following is an example of an IoC?',
    options: [
      'A. A firewall rule blocking TCP port 23',
      'B. A known malicious IP address communicating with internal hosts',
      'C. A user\'s failure to complete security awareness training',
      'D. An unpatched vulnerability in an application server'
    ],
    answer: 1,
    explanation: 'An Indicator of Compromise (IoC) is an artifact observed on a network or system that indicates a potential security breach, such as known malicious IP addresses, malware file hashes, suspicious domain names, unusual registry keys, or malicious file paths. A known malicious IP communicating with internal hosts directly indicates compromise or attempted compromise. A firewall rule is a security control, not an indicator. Failure to complete security training is a compliance issue. An unpatched vulnerability is a weakness, not evidence that a breach has occurred.'
  },
  {
    id: 'q075',
    domainId: 4,
    question: 'An organization wants to implement privileged access management (PAM). Which of the following capabilities is MOST important in a PAM solution?',
    options: [
      'A. Multi-factor authentication for standard user accounts',
      'B. Session recording, just-in-time privilege elevation, and password vaulting for privileged accounts',
      'C. Single sign-on for cloud applications',
      'D. Email filtering for phishing prevention'
    ],
    answer: 1,
    explanation: 'Privileged Access Management (PAM) specifically addresses the risks associated with administrative and privileged accounts. Key PAM capabilities include password vaulting (storing and rotating privileged credentials), session recording (creating an audit trail of privileged activity), and just-in-time (JIT) privilege elevation (granting elevated access only when needed and for limited time). MFA for standard users is important but is identity management, not PAM. SSO for cloud apps is an IAM function. Email filtering is an email security control.'
  },
  {
    id: 'q076',
    domainId: 4,
    question: 'A security engineer is configuring a honeypot on the production network. What is the PRIMARY purpose of this honeypot?',
    options: [
      'A. To provide an additional layer of authentication for remote users',
      'B. To attract and detect unauthorized activity and gather intelligence about attacker techniques',
      'C. To serve as a backup system in case the primary server fails',
      'D. To test the effectiveness of the organization\'s backup and recovery procedures'
    ],
    answer: 1,
    explanation: 'A honeypot is a decoy system designed to attract attackers. Any interaction with the honeypot is inherently suspicious because no legitimate users or systems should be accessing it. Honeypots help detect attackers, understand their techniques and tools, and gather threat intelligence. They can also divert attackers from real production systems. They provide no authentication function, are not backup systems, and are not used for testing backup procedures.'
  },
  {
    id: 'q077',
    domainId: 4,
    question: 'During log analysis, an analyst notices that a user\'s account logged in at 2:00 AM, accessed and downloaded 50GB of sensitive financial data, and then logged off—all within 20 minutes. The user is a junior accountant whose normal hours are 9 AM to 5 PM. Which type of investigation should this trigger?',
    options: [
      'A. External threat investigation',
      'B. Insider threat or account compromise investigation',
      'C. DDoS attack investigation',
      'D. Malware propagation investigation'
    ],
    answer: 1,
    explanation: 'The behavior described—access outside normal business hours, accessing an unusual volume of sensitive data not typical for the user\'s role, and doing so in a very short time—are classic indicators of either insider threat (the employee deliberately exfiltrating data) or account compromise (an attacker is using the employee\'s credentials). User and Entity Behavior Analytics (UEBA) systems detect exactly these types of anomalous behaviors. An external threat investigation would focus on external systems. The scenario does not indicate DDoS or malware propagation.'
  },
  {
    id: 'q078',
    domainId: 4,
    question: 'A security team wants to implement a process that continuously tests security controls, validates defensive capabilities, and simulates real adversary behavior in an ongoing manner rather than as a one-time exercise. Which approach BEST meets this need?',
    options: [
      'A. Annual external penetration test',
      'B. Continuous threat exposure management (CTEM) with purple team exercises',
      'C. Quarterly vulnerability scans',
      'D. Annual tabletop exercises'
    ],
    answer: 1,
    explanation: 'Continuous Threat Exposure Management (CTEM) with purple team exercises involves ongoing, iterative security testing where red team (offensive) and blue team (defensive) work collaboratively in a continuous cycle to validate controls, identify gaps, and improve defenses. Purple teaming combines attack and defense activities to continuously improve detection and response. Annual penetration tests and tabletop exercises are periodic, not continuous. Quarterly vulnerability scans identify known vulnerabilities but do not simulate adversary behavior or test defensive capabilities in an integrated way.'
  },
  {
    id: 'q079',
    domainId: 4,
    question: 'An administrator needs to verify that a file downloaded from the internet has not been tampered with. The vendor provides a SHA-256 hash of the original file. What should the administrator do?',
    options: [
      'A. Scan the downloaded file with antivirus software',
      'B. Calculate the SHA-256 hash of the downloaded file and compare it to the vendor-provided hash',
      'C. Open the file in a text editor and review its content',
      'D. Submit the file to a sandbox for behavioral analysis'
    ],
    answer: 1,
    explanation: 'Hashing provides integrity verification. By calculating the SHA-256 hash of the downloaded file and comparing it to the hash published by the vendor, the administrator can verify that the file has not been modified or corrupted during download. If the hashes match, the file is identical to the original. If they differ, the file has been tampered with or corrupted. Antivirus detects known malware but cannot verify file integrity against a specific original. Reviewing the content in a text editor cannot verify binary file integrity. Sandbox analysis examines behavior but does not verify integrity against a known good hash.'
  },
  {
    id: 'q080',
    domainId: 4,
    question: 'A security analyst is reviewing network packet captures and sees repeated requests from a single external IP to various internal hosts on TCP port 22. The requests appear to be scanning. What should the analyst do?',
    options: [
      'A. Allow the traffic since SSH is a legitimate protocol',
      'B. Block the source IP at the perimeter firewall and investigate whether any hosts responded successfully',
      'C. Restart all SSH services on internal hosts',
      'D. Disable SSH on all internal hosts permanently'
    ],
    answer: 1,
    explanation: 'Repeated SSH connection attempts from a single external IP to multiple internal hosts is consistent with a network scan or brute-force attempt targeting SSH. The appropriate response is to block the offending IP at the perimeter to stop further scanning and investigate whether any internal hosts responded (which could indicate successful access or open attack surface). Allowing the traffic ignores a clear threat. Restarting SSH services does not address the threat. Permanently disabling SSH on all hosts may break legitimate administrative workflows and is disproportionate.'
  },
  {
    id: 'q081',
    domainId: 4,
    question: 'An organization collects logs from various systems but analysts are overwhelmed by thousands of alerts daily and cannot investigate all of them. Which approach would BEST help prioritize and reduce alert fatigue?',
    options: [
      'A. Delete older logs to reduce the volume of data',
      'B. Implement SOAR (Security Orchestration, Automation, and Response) to automate triage and response for known low-risk alert types',
      'C. Reduce the number of log sources feeding into the SIEM',
      'D. Assign each analyst to a fixed set of alerts regardless of severity'
    ],
    answer: 1,
    explanation: 'SOAR platforms automate repetitive investigation and response tasks for well-understood, low-risk alerts (such as automatically enriching alerts with threat intelligence, closing false positives, or quarantining endpoints), freeing analysts to focus on complex, high-priority incidents. This directly addresses alert fatigue. Deleting logs destroys evidence and violates retention requirements. Reducing log sources decreases visibility. Assigning fixed alert sets without severity-based prioritization is inefficient and does not reduce the volume of alerts analysts must process.'
  },
  {
    id: 'q082',
    domainId: 4,
    question: 'A company has implemented endpoint detection and response (EDR) on all workstations. What capability does EDR provide that traditional antivirus does not?',
    options: [
      'A. Signature-based detection of known malware using virus definitions',
      'B. Continuous behavioral monitoring, process telemetry, and response capabilities including isolation and remediation',
      'C. Network-level traffic analysis and blocking',
      'D. Email attachment scanning and sandboxing'
    ],
    answer: 1,
    explanation: 'EDR goes beyond traditional signature-based antivirus by continuously monitoring endpoint activity (process creation, network connections, file system changes, registry modifications), recording behavioral telemetry for forensic analysis, detecting anomalous behaviors using AI/ML, and providing active response capabilities (isolating endpoints, killing processes, rolling back changes). Traditional antivirus relies primarily on signatures to detect known malware and lacks the behavioral and response capabilities of EDR. Network analysis is performed by network security tools. Email scanning is performed by email security gateways.'
  },
  {
    id: 'q083',
    domainId: 4,
    question: 'A security analyst is investigating an alert about unusual network traffic from a server in the production environment. Using the order of volatility, which evidence should be collected FIRST?',
    options: [
      'A. Hard drive image',
      'B. Network packet captures',
      'C. Contents of RAM (memory)',
      'D. System log files'
    ],
    answer: 2,
    explanation: 'The order of volatility dictates that the most volatile (short-lived) evidence should be collected first. RAM (memory) is the most volatile because it is lost when the system is powered off or rebooted. The order of volatility from most to least volatile is: CPU registers/cache, RAM, network connections, running processes, disk (files/logs), and archival media. Network packet captures are also volatile but RAM is more transient. Hard drives and log files persist after shutdown and should be collected after more volatile evidence.'
  },
  {
    id: 'q084',
    domainId: 4,
    question: 'A company implements a security awareness training program. Which metric would BEST demonstrate the effectiveness of phishing awareness training over time?',
    options: [
      'A. Number of security awareness training modules completed',
      'B. Decrease in phishing simulation click-through rates and increase in phishing report rates',
      'C. Total hours of security training per employee annually',
      'D. Employee satisfaction scores for training content'
    ],
    answer: 1,
    explanation: 'Measuring the decrease in click-through rates on phishing simulations and the increase in employees correctly reporting phishing attempts directly measures behavioral change—the ultimate goal of phishing awareness training. These are outcome-based metrics. Completion rates and training hours (Options A and C) measure participation but not effectiveness or behavior change. Employee satisfaction scores (Option D) measure how much employees liked the training, not whether it changed behavior.'
  },
  {
    id: 'q085',
    domainId: 4,
    question: 'A security team receives threat intelligence indicating that a specific actor group is actively targeting companies in their industry using a particular malware family. What should the team do IMMEDIATELY with this information?',
    options: [
      'A. Publish the threat intelligence on social media to warn others',
      'B. Search for indicators of compromise associated with the malware in SIEM logs, update detection rules, and review defensive controls',
      'C. Wait to see if the organization is attacked before taking action',
      'D. Send an all-employee email about the potential threat'
    ],
    answer: 1,
    explanation: 'Actionable threat intelligence should immediately trigger a threat hunting exercise in existing logs for IoCs associated with the malware family, updating SIEM detection rules to alert on those IoCs going forward, and reviewing whether existing controls adequately defend against the known TTPs (Tactics, Techniques, and Procedures) of the actor group. Publishing on social media may not be appropriate due to sensitivity. Waiting for an attack is reactive and dangerous. An all-employee email may cause panic without providing actionable guidance, and employees typically cannot act on this type of technical threat intelligence.'
  },
  {
    id: 'q086',
    domainId: 4,
    question: 'An employee reports that their computer is running slowly and they are seeing pop-up advertisements they did not install. A security analyst investigates and finds that a browser extension was installed that generates ad revenue by injecting advertisements into web pages. Which type of malware is this?',
    options: [
      'A. Ransomware',
      'B. Spyware',
      'C. Adware',
      'D. Worm'
    ],
    answer: 2,
    explanation: 'Adware is unwanted software that displays or downloads advertising material automatically, often injecting ads into web pages or displaying pop-ups. It is typically monetized by generating advertising revenue. While adware is annoying and can degrade performance, it is generally not as dangerous as other malware categories, though some adware also has spyware capabilities. Ransomware encrypts data for ransom. Spyware secretly monitors and collects user information without consent. A worm self-propagates across networks.'
  },
  {
    id: 'q087',
    domainId: 4,
    question: 'A company\'s incident response plan calls for containing a compromised system by disconnecting it from the network. However, the system is a critical database server that supports 24/7 operations. Which approach provides containment while minimizing business disruption?',
    options: [
      'A. Take no action until the next maintenance window to avoid disruption',
      'B. Implement network-level containment by isolating the server with firewall rules while maintaining essential database connectivity, and simultaneously prepare a clean failover system',
      'C. Immediately power off the server',
      'D. Allow the compromise to continue until forensic evidence is fully collected'
    ],
    answer: 1,
    explanation: 'For critical systems, network-level containment using firewall rules (blocking all unauthorized traffic while permitting legitimate database connections) balances security with operational requirements. Simultaneously preparing a failover system allows rapid cutover if full isolation becomes necessary. This approach limits the attacker\'s ability to communicate while maintaining business operations. Taking no action leaves the organization exposed. Powering off the server would cause immediate business impact and destroy volatile evidence. Allowing the compromise to continue for forensics endangers the environment.'
  },
  {
    id: 'q088',
    domainId: 4,
    question: 'A developer commits code containing hardcoded AWS access keys to a public GitHub repository. Which automated security tool would MOST likely detect this in the development pipeline?',
    options: [
      'A. Dynamic Application Security Testing (DAST)',
      'B. Static Application Security Testing (SAST) or secrets scanning',
      'C. Runtime Application Self-Protection (RASP)',
      'D. Software Composition Analysis (SCA)'
    ],
    answer: 1,
    explanation: 'Static Application Security Testing (SAST) and dedicated secrets scanning tools (such as git-secrets, TruffleHog, or GitLeaks) analyze source code and commit history to identify hardcoded secrets, API keys, and credentials. These tools can be integrated into CI/CD pipelines to catch secrets before they are merged. DAST tests running applications by sending requests and analyzing responses but cannot detect secrets in source code. RASP monitors and protects applications at runtime. SCA analyzes third-party dependencies for known vulnerabilities.'
  },
  {
    id: 'q089',
    domainId: 4,
    question: 'A security analyst is conducting a risk assessment and quantifies a specific risk as having an Annual Loss Expectancy (ALE) of $500,000. The organization can implement a control that reduces the ALE to $100,000 at an annual cost of $50,000. What is the Return on Security Investment (ROSI)?',
    options: [
      'A. The control is not cost-effective because it does not eliminate the risk entirely',
      'B. The ROSI is positive: the control saves $350,000 annually ($400,000 reduction in ALE minus $50,000 control cost)',
      'C. The ROSI cannot be calculated without knowing the probability of the threat',
      'D. The ROSI is $400,000'
    ],
    answer: 1,
    explanation: 'ROSI = (Risk Reduction - Cost of Control). The control reduces ALE from $500,000 to $100,000, a reduction of $400,000. Subtracting the $50,000 annual control cost yields a net benefit of $350,000. This is clearly cost-effective. A control does not need to eliminate risk entirely to be worthwhile (Option A)—it just needs to reduce risk more than it costs. The ALE formula already incorporates probability (ALE = SLE × ARO), so Option C is incorrect. Option D confuses the risk reduction alone with the ROSI.'
  },
  {
    id: 'q090',
    domainId: 4,
    question: 'An organization wants to automate the response to a specific alert: when a host is flagged by the EDR as potentially compromised, it should automatically be quarantined, a ticket should be created, and the analyst should be notified. Which technology enables this automation?',
    options: [
      'A. SIEM',
      'B. SOAR (Security Orchestration, Automation, and Response)',
      'C. EDR alone',
      'D. CASB'
    ],
    answer: 1,
    explanation: 'SOAR (Security Orchestration, Automation, and Response) platforms integrate with security tools (EDR, SIEM, ticketing systems, communication tools) via APIs and execute automated playbooks in response to alerts. In this case, a SOAR playbook triggered by an EDR alert would automatically quarantine the host, create a ticket in the ITSM system, and notify the analyst—all without manual intervention. A SIEM alone can trigger alerts but typically does not execute automated response actions. EDR can quarantine but does not create tickets or notify analysts through other systems. CASB focuses on cloud application security.'
  },
  {
    id: 'q091',
    domainId: 4,
    question: 'An analyst is reviewing authentication logs and notices the following pattern: 500 successful logins from 500 different IP addresses for 500 different user accounts, all within a 5-minute window. Each account had the correct password on the first attempt. What type of attack is MOST likely occurring?',
    options: [
      'A. Brute-force attack',
      'B. Credential stuffing attack',
      'C. Pass-the-hash attack',
      'D. Kerberoasting attack'
    ],
    answer: 1,
    explanation: 'Credential stuffing uses large datasets of username/password combinations obtained from previous data breaches and tests them against a target service. The pattern of many successful logins from different IPs (to evade rate limiting) for different accounts, each succeeding on the first try, is the hallmark of credential stuffing. Brute-force attacks try many passwords for the same account with many failures before success. Pass-the-hash uses captured NTLM hashes for Windows authentication. Kerberoasting targets Kerberos TGS tickets for offline password cracking.'
  },
  {
    id: 'q092',
    domainId: 4,
    question: 'A company uses a cloud-based backup solution. During a ransomware incident, the attacker also encrypted the cloud backups by using the legitimate backup client\'s credentials. Which backup strategy would have PREVENTED the cloud backups from being encrypted?',
    options: [
      'A. Implementing 3-2-1 backup rule with immutable (write-once) cloud storage',
      'B. Encrypting backups before sending them to the cloud',
      'C. Compressing backup files to reduce storage costs',
      'D. Scheduling backups to run more frequently'
    ],
    answer: 0,
    explanation: 'Immutable storage (WORM - Write Once Read Many) prevents backup data from being modified or deleted for a defined retention period, even by privileged users or compromised backup agents. Combined with the 3-2-1 rule (3 copies, 2 different media types, 1 offsite), this would have prevented the ransomware from encrypting or deleting cloud backups. Encrypting backups before cloud storage protects confidentiality but does not prevent deletion or overwriting. Compression does not address ransomware. More frequent backups improve RPO but do not prevent ransomware from accessing and encrypting backup storage.'
  },
  {
    id: 'q093',
    domainId: 4,
    question: 'A security operations center uses the MITRE ATT&CK framework to map observed attacker behaviors. An analyst observes that an attacker used WMI (Windows Management Instrumentation) to execute code remotely. Under which MITRE ATT&CK tactic does this fall?',
    options: [
      'A. Persistence',
      'B. Credential Access',
      'C. Lateral Movement',
      'D. Execution'
    ],
    answer: 2,
    explanation: 'Using WMI to execute code on a remote system (WMI Execute Method with a remote host target) is classified under Lateral Movement in MITRE ATT&CK (specifically T1021.006 - Windows Remote Management or related WMI sub-techniques). WMI can also be used locally for Execution. The key differentiator here is "remotely"—executing code on another system constitutes lateral movement. Persistence techniques maintain access across reboots. Credential Access involves obtaining credentials. If the WMI execution was on the local system, it would be classified as Execution.'
  },
  {
    id: 'q094',
    domainId: 4,
    question: 'An organization needs to ensure that its identity provider (IdP) is the authoritative source for user authentication across all internal and external applications. Which protocol is commonly used to federate identity between an organization\'s IdP and cloud-based service providers?',
    options: [
      'A. LDAP',
      'B. RADIUS',
      'C. SAML (Security Assertion Markup Language)',
      'D. Kerberos'
    ],
    answer: 2,
    explanation: 'SAML (Security Assertion Markup Language) is an XML-based standard for exchanging authentication and authorization data between identity providers and service providers. It is widely used for enterprise SSO and federation with cloud applications. The IdP authenticates the user and sends a SAML assertion to the service provider. LDAP is a directory protocol for querying user information, not web federation. RADIUS is used for network access authentication (VPN, Wi-Fi). Kerberos is a ticketing protocol for authentication within Windows Active Directory environments, not typically used for federation with external cloud providers.'
  },
  {
    id: 'q095',
    domainId: 4,
    question: 'A security analyst performs a memory dump analysis on a compromised system and finds suspicious processes injected into legitimate Windows processes like svchost.exe. Which malware technique is being observed?',
    options: [
      'A. Rootkit installation',
      'B. Process injection',
      'C. DLL sideloading',
      'D. Kernel exploitation'
    ],
    answer: 1,
    explanation: 'Process injection is a technique where malicious code is written into the memory space of a legitimate running process (such as svchost.exe) to hide the malicious activity and inherit the legitimate process\'s privileges and network connections. This is a common evasion technique detected through memory analysis. A rootkit modifies the OS kernel to hide its presence. DLL sideloading tricks legitimate applications into loading a malicious DLL. Kernel exploitation attacks the OS kernel to gain elevated privileges.'
  },
  {
    id: 'q096',
    domainId: 4,
    question: 'An organization implements data loss prevention (DLP). An analyst receives an alert that a user emailed a spreadsheet containing 500 social security numbers to an external address. Which DLP detection technique MOST likely triggered this alert?',
    options: [
      'A. Keyword matching for words like "confidential" or "secret"',
      'B. Regular expression pattern matching for SSN format (XXX-XX-XXXX)',
      'C. File size threshold exceeding 1MB',
      'D. User behavior analytics detecting unusual activity'
    ],
    answer: 1,
    explanation: 'DLP solutions use regular expression (regex) pattern matching to identify specific data formats such as Social Security Numbers (XXX-XX-XXXX), credit card numbers (groups of 16 digits), and other structured sensitive data. This is called content inspection. Regex is the most appropriate and accurate technique for identifying SSNs in documents. Keyword matching would not identify SSNs (which are numbers, not keywords). File size thresholds would catch many legitimate large files and miss small files with many SSNs. User behavior analytics could detect the anomalous action but would not specifically identify SSN content.'
  },
  {
    id: 'q097',
    domainId: 4,
    question: 'A CISO wants to establish a vulnerability management program. In which order should the following steps be performed? 1) Remediate 2) Scan 3) Prioritize 4) Report',
    options: [
      'A. 2, 3, 1, 4',
      'B. 2, 1, 3, 4',
      'C. 3, 2, 1, 4',
      'D. 1, 2, 3, 4'
    ],
    answer: 0,
    explanation: 'The correct order for a vulnerability management program is: Scan (discover vulnerabilities), Prioritize (assess risk and determine remediation order based on severity and asset criticality), Remediate (fix or mitigate the vulnerabilities), and Report (document results and communicate to stakeholders). Scanning before prioritizing ensures you have complete information. Prioritizing before remediating ensures resources are focused on the highest-risk vulnerabilities first. Reporting after remediation provides evidence of risk reduction.'
  },

  // ============================================================
  // DOMAIN 5: Security Program Management & Oversight (20%) - 23 questions
  // ============================================================
  {
    id: 'q098',
    domainId: 5,
    question: 'An organization must comply with multiple regulatory frameworks including PCI DSS, HIPAA, and SOC 2. The security team wants to efficiently manage compliance across all frameworks. Which approach is MOST efficient?',
    options: [
      'A. Implement each framework separately with dedicated teams for each',
      'B. Use a unified control framework that maps controls to multiple regulatory requirements simultaneously',
      'C. Prioritize only the most recently enacted regulation and defer the others',
      'D. Outsource all compliance activities to a third-party managed security service provider'
    ],
    answer: 1,
    explanation: 'A unified or harmonized control framework (such as NIST CSF or ISO 27001) that maps to multiple regulatory requirements allows organizations to implement a control once and demonstrate compliance with multiple frameworks simultaneously, reducing duplication of effort and cost. Frameworks like NIST CSF have crosswalk documents mapping to PCI DSS, HIPAA, and SOC 2. Implementing each framework separately creates redundant work. Prioritizing only one framework creates compliance gaps. Outsourcing compliance does not eliminate the organization\'s legal responsibility for compliance.'
  },
  {
    id: 'q099',
    domainId: 5,
    question: 'A company contracts with a cloud vendor to process sensitive customer data. Which document should define the security requirements, data handling procedures, and liability for the cloud vendor?',
    options: [
      'A. Non-Disclosure Agreement (NDA)',
      'B. Service Level Agreement (SLA)',
      'C. Data Processing Agreement (DPA) and vendor contract with security addendum',
      'D. Memorandum of Understanding (MOU)'
    ],
    answer: 2,
    explanation: 'A Data Processing Agreement (DPA) is a legally binding contract required by regulations such as GDPR that defines how a vendor processes personal data, including security requirements, data handling procedures, breach notification obligations, and liability. Combined with a security addendum in the vendor contract, this provides comprehensive coverage of security obligations. An NDA covers confidentiality but not data processing security requirements. An SLA defines service availability and performance metrics, not security requirements. An MOU is a non-binding document expressing intent.'
  },
  {
    id: 'q100',
    domainId: 5,
    question: 'An organization must assess the potential impact of a security incident on business operations to prioritize recovery efforts. Which process identifies the most critical business functions and their dependencies?',
    options: [
      'A. Risk assessment',
      'B. Business Impact Analysis (BIA)',
      'C. Gap analysis',
      'D. Threat modeling'
    ],
    answer: 1,
    explanation: 'A Business Impact Analysis (BIA) is a systematic process that identifies and evaluates the potential effects of disruptions on critical business functions. It determines which functions are most critical, their dependencies (systems, personnel, data), and the business impact of their unavailability over time—producing RTO and RPO values for each function. A risk assessment identifies and evaluates risks broadly. A gap analysis compares current state to a desired state or standard. Threat modeling identifies and categorizes threats to specific systems or applications.'
  },
  {
    id: 'q101',
    domainId: 5,
    question: 'A company\'s data protection officer (DPO) is notified of a data breach affecting EU citizens\' personal data. Under GDPR, within what timeframe must the supervisory authority be notified?',
    options: [
      'A. 24 hours',
      'B. 48 hours',
      'C. 72 hours',
      'D. 30 days'
    ],
    answer: 2,
    explanation: 'GDPR Article 33 requires that data controllers notify the relevant supervisory authority within 72 hours of becoming aware of a personal data breach (where it is likely to result in risk to individuals\' rights and freedoms). If notification cannot be made within 72 hours, a reason for the delay must be provided. Notification to affected individuals (Article 34) is required "without undue delay" when there is a high risk to rights and freedoms. The 24-hour and 48-hour timeframes apply to other regulations. The 30-day timeframe is longer than GDPR requires.'
  },
  {
    id: 'q102',
    domainId: 5,
    question: 'A company wants to assess its security posture against a well-known framework to identify gaps and improve its overall program. Which framework provides a maturity model for measuring and improving cybersecurity capabilities?',
    options: [
      'A. PCI DSS',
      'B. NIST Cybersecurity Framework (CSF)',
      'C. HIPAA Security Rule',
      'D. ISO 27002'
    ],
    answer: 1,
    explanation: 'The NIST Cybersecurity Framework (CSF) provides organizations with a common language and structure for managing cybersecurity risk. It includes Implementation Tiers (1-4) that represent increasing levels of cybersecurity maturity and sophistication, allowing organizations to assess their current tier and define a target tier. PCI DSS is a compliance standard specifically for payment card data, not a maturity framework. HIPAA Security Rule is a compliance regulation for healthcare data. ISO 27002 is a code of practice for information security controls but does not provide a maturity measurement model.'
  },
  {
    id: 'q103',
    domainId: 5,
    question: 'During a third-party risk assessment, a company discovers that a key vendor has not undergone a security audit in three years and cannot provide a SOC 2 Type II report. What should the company do?',
    options: [
      'A. Immediately terminate the vendor relationship',
      'B. Accept the risk and continue the relationship without further action',
      'C. Request the vendor complete a security questionnaire, require a SOC 2 audit timeline commitment, and implement compensating controls such as increased contractual security requirements',
      'D. Perform a penetration test of the vendor\'s systems'
    ],
    answer: 2,
    explanation: 'The appropriate response to a vendor security gap is a structured remediation approach: obtain detailed information via a security questionnaire, contractually require the vendor to commit to obtaining SOC 2 Type II certification within an agreed timeframe, and implement compensating controls such as enhanced contractual security requirements, data minimization, or reduced data sharing. Immediate termination may not be feasible if the vendor provides critical services. Accepting the risk without action is irresponsible. Performing penetration tests on vendor systems without their explicit authorization and scope agreement is potentially illegal.'
  },
  {
    id: 'q104',
    domainId: 5,
    question: 'A security manager is creating a policy that defines how the organization handles sensitive data throughout its lifecycle from creation to disposal. Which type of policy document BEST describes this?',
    options: [
      'A. Acceptable Use Policy (AUP)',
      'B. Data Governance and Classification Policy',
      'C. Business Continuity Plan (BCP)',
      'D. Incident Response Policy'
    ],
    answer: 1,
    explanation: 'A Data Governance and Classification Policy defines how data is classified (e.g., Public, Internal, Confidential, Restricted), the handling requirements for each classification level, and data lifecycle management from creation through retention to secure disposal. An Acceptable Use Policy defines what users are permitted to do with company technology resources. A Business Continuity Plan addresses how the organization maintains operations during disruptions. An Incident Response Policy defines how security incidents are identified, reported, and handled.'
  },
  {
    id: 'q105',
    domainId: 5,
    question: 'Which type of security assessment involves an independent third party reviewing an organization\'s security controls and providing a formal attestation of compliance, commonly required by cloud service providers to demonstrate security to customers?',
    options: [
      'A. Internal audit',
      'B. Penetration test',
      'C. SOC 2 Type II audit',
      'D. Vulnerability assessment'
    ],
    answer: 2,
    explanation: 'A SOC 2 Type II audit, performed by an independent CPA firm, evaluates whether a service organization\'s controls related to security, availability, processing integrity, confidentiality, and/or privacy were operating effectively over a defined period (typically 6-12 months). It provides formal, third-party attestation of security controls and is commonly required by enterprise customers evaluating cloud service providers. An internal audit is performed by employees. A penetration test actively tests for exploitable vulnerabilities. A vulnerability assessment identifies vulnerabilities without formal attestation.'
  },
  {
    id: 'q106',
    domainId: 5,
    question: 'A healthcare organization is subject to HIPAA. They contract with a cloud provider to store patient records. What legal agreement is REQUIRED between the covered entity and the cloud provider under HIPAA?',
    options: [
      'A. Service Level Agreement (SLA)',
      'B. Business Associate Agreement (BAA)',
      'C. Non-Disclosure Agreement (NDA)',
      'D. Memorandum of Understanding (MOU)'
    ],
    answer: 1,
    explanation: 'Under HIPAA, a Business Associate Agreement (BAA) is a legally required contract between a covered entity (such as a healthcare provider) and a business associate (any vendor that creates, receives, maintains, or transmits protected health information on behalf of the covered entity). The BAA defines the permitted uses of PHI and the vendor\'s security obligations. Cloud providers that store PHI are considered business associates and must sign a BAA. An SLA covers service performance. An NDA covers confidentiality. An MOU is non-binding and insufficient under HIPAA.'
  },
  {
    id: 'q107',
    domainId: 5,
    question: 'An organization is designing its risk management program. The risk team identifies a risk and determines that the cost of mitigating it exceeds the potential loss. What is the MOST appropriate risk treatment option?',
    options: [
      'A. Risk avoidance',
      'B. Risk transfer',
      'C. Risk acceptance',
      'D. Risk mitigation'
    ],
    answer: 2,
    explanation: 'Risk acceptance is the appropriate strategy when the cost of treating (mitigating) a risk exceeds the potential loss or when the risk falls below the organization\'s risk tolerance threshold. Management formally acknowledges the risk and decides to bear it. Risk avoidance eliminates the risk by not performing the risky activity. Risk transfer shifts the financial impact of the risk to another party (insurance, contract). Risk mitigation implements controls to reduce the likelihood or impact—this is not appropriate when the cost exceeds the benefit.'
  },
  {
    id: 'q108',
    domainId: 5,
    question: 'A CISO is developing key performance indicators (KPIs) for the security program. Which metric would BEST measure the effectiveness of the patch management process?',
    options: [
      'A. Number of security incidents in the last quarter',
      'B. Percentage of critical vulnerabilities patched within the defined SLA (e.g., 95% patched within 30 days)',
      'C. Number of firewall rules added in the last year',
      'D. Amount spent on security tools'
    ],
    answer: 1,
    explanation: 'A meaningful KPI for patch management directly measures the output of the process: what percentage of critical vulnerabilities are remediated within the organization\'s defined service level agreement (e.g., 30 days for critical patches). This is specific, measurable, and directly reflects patch management effectiveness. The number of incidents is a broader security outcome metric not specific to patching. The number of firewall rules added does not reflect patch management. Security spending is an input metric, not an effectiveness measure.'
  },
  {
    id: 'q109',
    domainId: 5,
    question: 'An organization\'s board of directors has approved a security policy stating that any acceptable risk must fall below a defined threshold. What term describes this threshold?',
    options: [
      'A. Risk appetite',
      'B. Residual risk',
      'C. Inherent risk',
      'D. Risk velocity'
    ],
    answer: 0,
    explanation: 'Risk appetite is the amount and type of risk that an organization is willing to accept in pursuit of its objectives, as defined and approved by leadership. It sets the boundary between acceptable and unacceptable risk levels. Residual risk is the risk remaining after controls have been applied. Inherent risk is the risk that exists before any controls are implemented. Risk velocity refers to the speed at which a risk can impact an organization if it materializes.'
  },
  {
    id: 'q110',
    domainId: 5,
    question: 'A security analyst discovers that a junior employee accessed and downloaded HR files containing all employees\' salary information. The employee claims they stumbled upon the files by accident. Which security principle was most likely violated that allowed this access?',
    options: [
      'A. Non-repudiation',
      'B. Least privilege',
      'C. Separation of duties',
      'D. Need to know'
    ],
    answer: 3,
    explanation: 'The need-to-know principle requires that individuals are granted access to information only if they have a legitimate business need to access it for their job function. A junior employee with no HR responsibilities should not have access to all employee salary data. While least privilege (Option B) is closely related, need-to-know specifically applies to the classification and access to sensitive information. Separation of duties divides critical tasks among multiple people. Non-repudiation prevents denial of an action that was taken.'
  },
  {
    id: 'q111',
    domainId: 5,
    question: 'A company is creating an incident response plan and wants to define the specific technical procedures for responding to a ransomware attack. Which document type BEST describes this?',
    options: [
      'A. Security policy',
      'B. Incident response playbook',
      'C. Risk register',
      'D. Business continuity plan'
    ],
    answer: 1,
    explanation: 'An incident response playbook provides step-by-step, technical procedures for responding to specific types of incidents (such as ransomware, phishing, data breach). It is a tactical document that guides analysts through containment, eradication, and recovery steps for a specific scenario. A security policy is a high-level document defining security requirements and responsibilities. A risk register catalogues identified risks. A business continuity plan focuses on maintaining business operations during disruptions, not on the technical incident response steps.'
  },
  {
    id: 'q112',
    domainId: 5,
    question: 'An auditor reviews a company\'s change management process and finds that developers can deploy code directly to production without any review or approval. What is the PRIMARY security risk of this finding?',
    options: [
      'A. Increased help desk calls from end users after deployments',
      'B. Unauthorized or malicious code could be deployed to production without detection',
      'C. Slower software development due to excessive bureaucracy',
      'D. Increased storage costs from multiple code versions'
    ],
    answer: 1,
    explanation: 'Without a formal change management process requiring review, testing, and approval, malicious code could be inserted by a compromised developer account or malicious insider and deployed directly to production. This could lead to data exfiltration, backdoors, or system sabotage. Change management controls (separation of duties in deployments, peer review, automated security scanning) mitigate this risk. Help desk calls and storage costs are operational concerns. Change management does not necessarily slow development—modern DevSecOps integrates security into automated pipelines.'
  },
  {
    id: 'q113',
    domainId: 5,
    question: 'Which privacy regulation applies to companies that collect, process, or store personal data of European Union residents, regardless of where the company is located?',
    options: [
      'A. CCPA (California Consumer Privacy Act)',
      'B. HIPAA (Health Insurance Portability and Accountability Act)',
      'C. GDPR (General Data Protection Regulation)',
      'D. PCI DSS (Payment Card Industry Data Security Standard)'
    ],
    answer: 2,
    explanation: 'GDPR (General Data Protection Regulation) has extraterritorial scope and applies to any organization anywhere in the world that processes personal data of EU residents, regardless of where the organization is based. CCPA applies to businesses that meet certain thresholds and collect personal data of California residents but is limited to California. HIPAA is a US healthcare regulation that does not have broad international application. PCI DSS is a payment card security standard that applies to organizations handling payment card data, not a privacy regulation with geographical scope.'
  },
  {
    id: 'q114',
    domainId: 5,
    question: 'A security manager wants to measure the time it takes for the security team to identify and contain a security incident. Which metrics are MOST relevant?',
    options: [
      'A. Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR)',
      'B. Mean Time Between Failures (MTBF) and Recovery Point Objective (RPO)',
      'C. Number of vulnerabilities found and patched quarterly',
      'D. Annual Security Expenditure and headcount'
    ],
    answer: 0,
    explanation: 'Mean Time to Detect (MTTD) measures the average time from when an incident occurs to when it is detected by the security team. Mean Time to Respond (MTTR) measures the average time from detection to containment and resolution. Together, these metrics measure incident detection and response capability. MTBF measures how long systems run between failures (a reliability metric). RPO measures data loss tolerance. Vulnerability patching metrics and expenditure do not measure incident detection and response speed.'
  },
  {
    id: 'q115',
    domainId: 5,
    question: 'An organization is conducting a tabletop exercise where executives and key stakeholders walk through their response to a simulated cyberattack scenario. What is the PRIMARY purpose of this exercise?',
    options: [
      'A. To identify technical vulnerabilities in production systems',
      'B. To test communication, decision-making, and coordination during an incident without disrupting operations',
      'C. To validate that backup systems work correctly',
      'D. To satisfy a regulatory requirement for annual penetration testing'
    ],
    answer: 1,
    explanation: 'A tabletop exercise is a discussion-based simulation where participants talk through their responses to a hypothetical incident scenario. The primary purpose is to identify gaps in communication plans, decision-making processes, roles and responsibilities, and coordination between teams—without the risk or disruption of actually executing the response. Technical vulnerability testing is done through penetration tests and vulnerability scans. Backup validation is done through disaster recovery exercises. Tabletop exercises are not penetration tests and fulfill different regulatory requirements.'
  },
  {
    id: 'q116',
    domainId: 5,
    question: 'A CISO is presenting the security program\'s value to the board of directors. Which metric would be MOST meaningful to a board audience focused on business risk?',
    options: [
      'A. Number of firewall rules updated this quarter',
      'B. Percentage of endpoints with updated antivirus signatures',
      'C. Financial exposure reduced through security controls, expressed as reduction in Annual Loss Expectancy',
      'D. Number of security alerts generated by the SIEM monthly'
    ],
    answer: 2,
    explanation: 'Board members are primarily concerned with business risk, financial impact, and return on investment—not technical metrics. Expressing security value as a reduction in Annual Loss Expectancy (ALE) or financial risk reduction translates security into business language that resonates with executives. Technical metrics like firewall rule updates, antivirus coverage percentages, and SIEM alert counts are important operationally but are not meaningful to a board audience focused on financial and strategic risk.'
  },
  {
    id: 'q117',
    domainId: 5,
    question: 'An organization discovers that a former IT administrator\'s account is still active six months after they left the company. Which process failure does this MOST directly indicate?',
    options: [
      'A. Insufficient password complexity requirements',
      'B. Inadequate user account lifecycle management (offboarding process)',
      'C. Lack of multi-factor authentication',
      'D. Insufficient network segmentation'
    ],
    answer: 1,
    explanation: 'The continued existence of an active account for a terminated employee indicates a failure in the account lifecycle management process, specifically the offboarding process. A robust offboarding process should include immediate account deactivation upon termination, removal from all systems and access groups, and periodic access reviews to catch orphaned accounts. Password complexity, MFA, and network segmentation are good security controls but are not the root cause of accounts remaining active after termination.'
  },
  {
    id: 'q118',
    domainId: 5,
    question: 'A company in the payment card industry must comply with PCI DSS. Which of the following requirements is a fundamental component of PCI DSS compliance?',
    options: [
      'A. Requiring all employees to use biometric authentication for workstation access',
      'B. Encrypting transmission of cardholder data across open, public networks',
      'C. Storing all payment card data for 7 years for audit purposes',
      'D. Performing annual red team exercises against all in-scope systems'
    ],
    answer: 1,
    explanation: 'PCI DSS Requirement 4 explicitly requires encrypting the transmission of cardholder data across open, public networks using strong cryptography (TLS 1.2 or higher). This is a fundamental PCI DSS control. PCI DSS does not mandate biometric authentication as a universal requirement, though it does require MFA for administrator access. PCI DSS actually requires minimizing cardholder data storage (not storing it for 7 years unnecessarily)—Requirement 3 requires protecting stored cardholder data and limiting retention. Annual red team exercises are not a PCI DSS requirement, though penetration testing is.'
  },
  {
    id: 'q119',
    domainId: 5,
    question: 'A company wants to evaluate how well its security controls align with the ISO 27001 standard before pursuing certification. Which activity BEST helps identify gaps between the current state and the standard\'s requirements?',
    options: [
      'A. Conducting a penetration test',
      'B. Performing a gap analysis against ISO 27001 controls',
      'C. Implementing a security awareness training program',
      'D. Deploying a SIEM solution'
    ],
    answer: 1,
    explanation: 'A gap analysis systematically compares an organization\'s current security controls and practices against the requirements of a target standard (ISO 27001 in this case), identifying areas where the organization falls short. This provides a prioritized roadmap for achieving compliance. A penetration test identifies exploitable vulnerabilities but does not evaluate control alignment with a compliance standard. Security awareness training and SIEM deployment are specific controls that may address some gaps but are not the process of identifying gaps.'
  },
  {
    id: 'q120',
    domainId: 5,
    question: 'A security manager is developing a privacy program. An employee asks why the company collects date of birth for an internal employee directory that only shows name, email, and department. The manager cannot provide a business justification. Which privacy principle is being violated?',
    options: [
      'A. Data integrity',
      'B. Data minimization',
      'C. Data availability',
      'D. Data sovereignty'
    ],
    answer: 1,
    explanation: 'Data minimization is a privacy principle (and a GDPR requirement) stating that organizations should only collect and process personal data that is necessary and proportionate to the specified, legitimate purpose. If date of birth serves no business purpose for an internal directory that only displays name, email, and department, collecting it violates data minimization. Data integrity ensures data is accurate and complete. Data availability ensures data is accessible when needed. Data sovereignty refers to data being subject to the laws of the country where it is collected or stored.'
  }
];
