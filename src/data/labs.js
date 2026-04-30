export const labs = [

  // ─── DOMAIN 1: General Security Concepts (12%) — 4 labs ───────────────────

  {
    id: 'lab-d1-01',
    type: 'ordering',
    domain: 1,
    title: 'PKI Certificate Chain Validation',
    description: 'Place the steps of PKI certificate chain validation in the correct order, from root CA to secure communication.',
    difficulty: 'medium',
    examRelevance: 'high',
    items: [
      { id: 'a', text: 'Root CA issues self-signed certificate and is added to trusted store' },
      { id: 'b', text: 'Intermediate CA certificate signed by Root CA' },
      { id: 'c', text: 'End-entity (server) certificate signed by Intermediate CA' },
      { id: 'd', text: 'Client requests the server certificate during TLS handshake' },
      { id: 'e', text: 'Client validates the certificate chain up to the trusted Root CA' },
      { id: 'f', text: 'Encrypted session established using negotiated cipher suite' },
    ],
    correct: ['a', 'b', 'c', 'd', 'e', 'f'],
    explanation: 'PKI uses a chain of trust: the Root CA is the trust anchor (self-signed, pre-installed in OS/browser stores). Intermediate CAs are signed by the Root, and end-entity certs are signed by Intermediates. During TLS, the client receives the cert chain, validates each signature up to a trusted Root, then establishes the encrypted session. This hierarchy allows Root CAs to stay offline while Intermediates handle day-to-day issuance.',
  },

  {
    id: 'lab-d1-02',
    type: 'matching',
    domain: 1,
    title: 'Cryptographic Algorithms to Use Cases',
    description: 'Match each cryptographic algorithm to its primary security use case.',
    difficulty: 'easy',
    examRelevance: 'high',
    pairs: [
      { id: 'aes', term: 'AES-256', definition: 'Symmetric block cipher — encrypts data at rest (full-disk, database columns)' },
      { id: 'rsa', term: 'RSA-2048', definition: 'Asymmetric algorithm — key exchange and digital signatures in TLS/certificates' },
      { id: 'ecc', term: 'ECC P-256', definition: 'Asymmetric algorithm using elliptic curves — efficient for mobile and IoT devices' },
      { id: 'sha', term: 'SHA-256', definition: 'Cryptographic hash function — verifies data integrity, used in digital signatures' },
      { id: 'pbkdf2', term: 'PBKDF2', definition: 'Key derivation function — stretches passwords into cryptographic keys with salting' },
    ],
    explanation: 'Symmetric algorithms (AES) are fast and suited for bulk data. Asymmetric algorithms (RSA, ECC) use key pairs and are used for key exchange and authentication. ECC achieves equivalent security to RSA with smaller keys — critical for constrained devices. Hash functions (SHA-256) are one-way and verify integrity. KDFs (PBKDF2) add iterations and salt to resist brute-force attacks on passwords.',
  },

  {
    id: 'lab-d1-03',
    type: 'scenario',
    domain: 1,
    title: 'TLS Certificate Error Analysis',
    description: 'A user reports a browser security warning when accessing the company intranet. Analyze the certificate error and determine the correct administrative response.',
    difficulty: 'medium',
    examRelevance: 'high',
    prompt: 'A user submits a helpdesk ticket: "I get a security warning every time I visit https://intranet.corp. It says the connection is not private." The browser shows the following certificate details:',
    artifactLabel: 'Browser Certificate Details',
    artifact: `Certificate Error: NET::ERR_CERT_AUTHORITY_INVALID

Subject:    intranet.corp
Issuer:     Internal-Corp-CA
Valid from: 2024-01-15
Valid to:   2026-01-15
Algorithm:  SHA-256 with RSA Encryption

Error: The certificate was issued by an authority
that is not trusted by this device.

Certificate chain:
  [0] intranet.corp       (UNTRUSTED)
  [1] Internal-Corp-CA    (NOT IN TRUST STORE)`,
    questions: [
      {
        id: 'q1',
        question: 'What is the root cause of this certificate error?',
        options: [
          'A. The certificate has expired',
          'B. The Internal-Corp-CA root certificate is not in the device\'s trusted store',
          'C. The certificate was issued for the wrong hostname',
          'D. The certificate uses a weak hashing algorithm',
        ],
        answer: 1,
        explanation: 'The error NET::ERR_CERT_AUTHORITY_INVALID means the issuing CA (Internal-Corp-CA) is not trusted by the device. The cert is valid (dates are fine) and uses SHA-256 (strong). This is a private/internal CA whose root cert must be distributed via Group Policy or MDM.',
      },
      {
        id: 'q2',
        question: 'What is the BEST administrative solution to resolve this for all corporate devices?',
        options: [
          'A. Replace the internal certificate with one from a public CA (e.g., DigiCert)',
          'B. Deploy the Internal-Corp-CA root certificate to all corporate devices via Group Policy or MDM',
          'C. Instruct users to click "Advanced" and proceed anyway',
          'D. Disable certificate validation on the intranet server',
        ],
        answer: 1,
        explanation: 'Deploying the internal root CA certificate to all corporate devices via Group Policy (Windows) or MDM (mobile) is the correct enterprise solution. It establishes trust without exposing internal services to public CAs, and avoids training users to bypass security warnings (which creates phishing risk).',
      },
    ],
  },

  {
    id: 'lab-d1-04',
    type: 'configure',
    domain: 1,
    title: 'Multi-Factor Authentication Policy',
    description: 'Configure the organization\'s MFA policy to meet security requirements: strong authentication, reasonable session duration, and account lockout protection.',
    difficulty: 'easy',
    examRelevance: 'high',
    prompt: 'Configure each MFA policy setting to meet the following requirements: All users must use phishing-resistant MFA. Sessions must not exceed 8 hours. Accounts must lock after repeated failures.',
    rules: [
      {
        id: 'r1',
        description: 'MFA Method for privileged accounts',
        detail: 'Requirement: phishing-resistant',
        options: ['SMS OTP', 'TOTP App', 'FIDO2/Hardware Key', 'Email OTP'],
        correct: 'FIDO2/Hardware Key',
      },
      {
        id: 'r2',
        description: 'MFA Method for standard users',
        detail: 'Requirement: phishing-resistant preferred',
        options: ['SMS OTP', 'TOTP App', 'FIDO2/Hardware Key', 'Email OTP'],
        correct: 'TOTP App',
      },
      {
        id: 'r3',
        description: 'Session timeout (idle)',
        detail: 'Requirement: ≤ 8 hours',
        options: ['Never', '24 hours', '8 hours', '15 minutes'],
        correct: '8 hours',
      },
      {
        id: 'r4',
        description: 'Account lockout after failed attempts',
        detail: 'Requirement: lock after failures',
        options: ['Disabled', '3 attempts', '10 attempts', '20 attempts'],
        correct: '3 attempts',
      },
      {
        id: 'r5',
        description: 'Remember MFA on trusted device',
        detail: 'Requirement: balance security vs usability',
        options: ['Never', '1 day', '30 days', 'Always'],
        correct: '30 days',
      },
    ],
    explanation: 'FIDO2/hardware keys are the gold standard for privileged accounts — immune to phishing because they bind to the origin domain. TOTP apps (e.g., Google Authenticator) are acceptable for standard users and resist phishing better than SMS (which is vulnerable to SIM-swapping). Session timeouts of 8 hours balance productivity with security. 3-attempt lockout prevents brute force. 30-day device trust is a reasonable enterprise compromise.',
  },

  // ─── DOMAIN 2: Threats, Vulnerabilities & Mitigations (22%) — 6 labs ──────

  {
    id: 'lab-d2-01',
    type: 'scenario',
    domain: 2,
    title: 'Phishing Email Header Analysis',
    description: 'A user forwards a suspicious email to the security team. Analyze the email headers and content to identify phishing indicators and determine the attack type.',
    difficulty: 'medium',
    examRelevance: 'high',
    prompt: 'A user forwards the following email to security@corp.com with the subject "Is this real?" Analyze the raw headers and body to identify the threat.',
    artifactLabel: 'Raw Email',
    artifact: `From: "IT Security Team" <security-alert@micr0soft-accounts.net>
To: j.smith@corp.com
Reply-To: harvester@free-mail-temp.ru
Return-Path: bounce@bulk-sender-99.xyz
Subject: URGENT: Your account will be suspended in 24 hours
Date: Mon, 15 Apr 2024 02:17:43 -0500
X-Mailer: PHPMailer 5.2.0
Received-SPF: FAIL (micr0soft-accounts.net does not designate
              bulk-sender-99.xyz as permitted sender)
DMARC-Result: FAIL

Dear J. Smith,

We have detected unusual sign-in activity on your Microsoft 365
account from Russia (IP: 185.220.101.47).

To prevent suspension, verify your account immediately:
https://secure-account-verify.micr0soft-accounts.net/login

If you do not verify within 24 hours, your account will be
permanently disabled and all data will be deleted.

IT Security Team
Microsoft Corporation`,
    questions: [
      {
        id: 'q1',
        question: 'Based on the email headers, what is the STRONGEST technical indicator of phishing?',
        options: [
          'A. The urgent tone and threat of account deletion',
          'B. The SPF FAIL and DMARC FAIL authentication results',
          'C. The email was sent at 2:17 AM',
          'D. The use of PHPMailer as the mail client',
        ],
        answer: 1,
        explanation: 'SPF FAIL means the sending IP (bulk-sender-99.xyz) is not authorized to send mail for micr0soft-accounts.net. DMARC FAIL means the email failed domain alignment checks. These are objective, technical indicators. Urgency is a social engineering tactic but not a technical authentication failure.',
      },
      {
        id: 'q2',
        question: 'What specific type of phishing technique does targeting "J. Smith" by name represent?',
        options: [
          'A. Vishing (voice phishing)',
          'B. Whaling (targeting C-suite executives)',
          'C. Spear phishing (targeted attack using personal information)',
          'D. Smishing (SMS phishing)',
        ],
        answer: 2,
        explanation: 'Spear phishing uses personally identifiable information (like the target\'s name, company, or role) to make the attack more convincing. Unlike bulk phishing, spear phishing is personalized. Whaling is a subset targeting C-level executives specifically. This is standard spear phishing targeting an individual employee.',
      },
      {
        id: 'q3',
        question: 'What should the security analyst do FIRST upon receiving this reported email?',
        options: [
          'A. Click the link to investigate the phishing site',
          'B. Reply to the attacker to gather intelligence',
          'C. Block the sending domain and search email logs for other recipients',
          'D. Delete the email and advise the user to ignore it',
        ],
        answer: 2,
        explanation: 'The immediate priority is containment: block the malicious domain at the email gateway and check logs for other employees who received the same email. Never click phishing links from corporate systems. Ignoring without investigation leaves other users at risk.',
      },
    ],
  },

  {
    id: 'lab-d2-02',
    type: 'scenario',
    domain: 2,
    title: 'Malware Behavior Log Analysis',
    description: 'An EDR alert fires on an employee\'s workstation. Analyze the Windows Event Log and process activity to identify the malware behavior and attack stage.',
    difficulty: 'hard',
    examRelevance: 'high',
    prompt: 'The EDR platform triggers an alert on workstation WS-042 (user: m.johnson). The following events were recorded in the 10 minutes following the user opening an email attachment:',
    artifactLabel: 'Windows Event Log + Process Activity',
    artifact: `[14:32:11] Event ID 4688 - New Process Created
  Process: powershell.exe
  Parent:  WINWORD.EXE
  Command: powershell.exe -enc SQBFAFgAIAAoAE4AZQB3AC0...
  User:    CORP\\m.johnson

[14:32:12] Event ID 4688 - New Process Created
  Process: cmd.exe
  Parent:  powershell.exe
  Command: cmd.exe /c whoami && net user && net localgroup administrators

[14:32:15] Network Connection
  Process: powershell.exe
  Dest IP: 185.220.101.47:4444
  Protocol: TCP (OUTBOUND)

[14:32:18] Event ID 4698 - Scheduled Task Created
  Task Name: \\Microsoft\\Windows\\UpdateCheck
  Command:   powershell.exe -WindowStyle Hidden -enc SQBFAFgA...

[14:32:22] Registry Write
  Key: HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run
  Value: WindowsUpdate = powershell.exe -enc SQBFAFgA...`,
    questions: [
      {
        id: 'q1',
        question: 'The chain WINWORD.EXE → powershell.exe with a Base64-encoded command is a signature of which technique?',
        options: [
          'A. SQL injection via macro',
          'B. Malicious Office macro executing encoded PowerShell (T1059.001)',
          'C. Browser exploit kit',
          'D. Pass-the-hash lateral movement',
        ],
        answer: 1,
        explanation: 'Word spawning PowerShell with Base64-encoded commands (-enc flag) is the classic malicious macro pattern — MITRE ATT&CK T1059.001 (PowerShell) and T1566.001 (Spearphishing Attachment). The -enc flag is used to obfuscate the command from casual inspection.',
      },
      {
        id: 'q2',
        question: 'The outbound TCP connection to 185.220.101.47:4444 indicates which attack stage?',
        options: [
          'A. Initial Access',
          'B. Privilege Escalation',
          'C. Command and Control (C2) beacon',
          'D. Exfiltration',
        ],
        answer: 2,
        explanation: 'Port 4444 is the default Metasploit listener port. An outbound connection from an infected host to an attacker-controlled IP immediately after execution is a C2 beacon — the malware "calling home" to receive instructions. This is MITRE ATT&CK TA0011 (Command and Control).',
      },
      {
        id: 'q3',
        question: 'The Scheduled Task creation (Event 4698) and Registry Run key write both serve what purpose?',
        options: [
          'A. Data exfiltration',
          'B. Persistence — ensuring the malware survives reboots',
          'C. Privilege escalation to SYSTEM',
          'D. Lateral movement to other hosts',
        ],
        answer: 1,
        explanation: 'Creating scheduled tasks and adding Registry Run keys are classic persistence mechanisms (MITRE ATT&CK T1053.005 and T1547.001). Both ensure the payload re-executes after system restart. Defenders must check both locations during incident response.',
      },
    ],
  },

  {
    id: 'lab-d2-03',
    type: 'matching',
    domain: 2,
    title: 'MITRE ATT&CK Tactics to Techniques',
    description: 'Match each MITRE ATT&CK technique to its correct tactic category.',
    difficulty: 'medium',
    examRelevance: 'high',
    pairs: [
      { id: 't1', term: 'Phishing (T1566)', definition: 'Initial Access — gaining first foothold in the environment' },
      { id: 't2', term: 'PowerShell (T1059.001)', definition: 'Execution — running malicious code on the target system' },
      { id: 't3', term: 'Registry Run Keys (T1547.001)', definition: 'Persistence — maintaining access across reboots' },
      { id: 't4', term: 'Process Injection (T1055)', definition: 'Defense Evasion — hiding malicious activity within legitimate processes' },
      { id: 't5', term: 'DNS Tunneling (T1071.004)', definition: 'Command and Control — covert communication using DNS queries' },
    ],
    explanation: 'MITRE ATT&CK organizes adversary behavior into Tactics (the "why" — goals) and Techniques (the "how" — methods). Initial Access gets in, Execution runs code, Persistence survives reboots, Defense Evasion avoids detection, and C2 maintains attacker communication. Mapping observed behaviors to ATT&CK helps defenders prioritize detection rules.',
  },

  {
    id: 'lab-d2-04',
    type: 'ordering',
    domain: 2,
    title: 'Vulnerability Management Lifecycle',
    description: 'Place the stages of a formal vulnerability management program in the correct order.',
    difficulty: 'easy',
    examRelevance: 'high',
    items: [
      { id: 'a', text: 'Asset discovery and inventory' },
      { id: 'b', text: 'Vulnerability scanning (authenticated + unauthenticated)' },
      { id: 'c', text: 'Risk assessment and CVSS scoring' },
      { id: 'd', text: 'Prioritization (CVSS + asset criticality + exploitability)' },
      { id: 'e', text: 'Remediation: patch, mitigate, or accept risk' },
      { id: 'f', text: 'Verification scan to confirm remediation' },
      { id: 'g', text: 'Reporting and metrics to stakeholders' },
    ],
    correct: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    explanation: 'You must know what assets exist before you can scan them. Scanning produces findings. Risk assessment (CVSS score × asset value × exploit availability) enables prioritization. Remediation follows priority order. Verification confirms fixes were effective. Reporting closes the loop with stakeholders. CompTIA expects you to know this cycle for Security Operations questions.',
  },

  {
    id: 'lab-d2-05',
    type: 'identify',
    domain: 2,
    title: 'Attack Surface Classification',
    description: 'Classify each organizational asset by its attack surface exposure.',
    difficulty: 'medium',
    examRelevance: 'high',
    prompt: 'For each asset, identify its attack surface category. This classification determines which threat vectors apply and which controls are required.',
    zones: ['External (Internet-Facing)', 'Internal (LAN)', 'Edge (Remote/Mobile)', 'Management Plane'],
    assets: [
      { id: 'a1', name: 'Public-facing web application (company website)', correct: 'External (Internet-Facing)' },
      { id: 'a2', name: 'Employee laptop connecting via VPN from home', correct: 'Edge (Remote/Mobile)' },
      { id: 'a3', name: 'Internal HR database server', correct: 'Internal (LAN)' },
      { id: 'a4', name: 'Firewall management console (SSH/HTTPS admin interface)', correct: 'Management Plane' },
      { id: 'a5', name: 'Customer-facing API gateway (REST/HTTPS)', correct: 'External (Internet-Facing)' },
      { id: 'a6', name: 'Active Directory domain controller', correct: 'Internal (LAN)' },
    ],
    explanation: 'Attack surface classification determines threat model scope. External assets face internet threat actors directly. Edge assets bridge trusted and untrusted networks. Internal assets are protected by perimeter controls but vulnerable to insider threats. The management plane requires the strictest controls — compromise equals total control.',
  },

  {
    id: 'lab-d2-06',
    type: 'scenario',
    domain: 2,
    title: 'OSINT Reconnaissance Analysis',
    description: 'A red team has gathered open-source intelligence on a target organization. Review findings and identify security implications.',
    difficulty: 'medium',
    examRelevance: 'medium',
    prompt: 'During an authorized penetration test, the following information was gathered using only public sources (OSINT) in 30 minutes:',
    artifactLabel: 'OSINT Findings Report',
    artifact: `Target: Acme Financial Corp

LinkedIn (employees):
  - IT Admin: Sarah Torres, posted "just finished deploying Cisco ASA 9.16"
  - Dev: Mark Patel, GitHub repos include "acme-internal-api" (public)

GitHub (r-chen-acme/acme-configs — public repo):
  - File: .env.backup
    DB_HOST=10.0.1.45
    DB_USER=admin
    DB_PASS=Acme2019!
    AWS_ACCESS_KEY=AKIA3X9...
    AWS_SECRET=wJalrXUt...

DNS/WHOIS:
  - mail.acme-financial.com → 203.0.113.10 (Exchange 2016)
  - vpn.acme-financial.com → 203.0.113.15 (Pulse Secure)
  - dev.acme-financial.com → 203.0.113.22 (staging)

Shodan:
  - 203.0.113.22: Apache/2.2.34 (EOL since 2017), CVE-2017-7679`,
    questions: [
      {
        id: 'q1',
        question: 'Which finding represents the MOST critical immediate risk?',
        options: [
          'A. The IT Admin\'s LinkedIn post revealing the Cisco ASA version',
          'B. AWS credentials and database password in a public GitHub repository',
          'C. Exchange 2016 mail server discovered via DNS',
          'D. The developer\'s public GitHub repository name',
        ],
        answer: 1,
        explanation: 'AWS credentials in a public repo are immediately exploitable — automated tools scan GitHub constantly and can find these within minutes of commit. They provide direct access to cloud infrastructure. This is a critical P0 finding requiring immediate key rotation and environment audit.',
      },
      {
        id: 'q2',
        question: 'The staging server running Apache 2.2.34 (EOL since 2017) represents which vulnerability category?',
        options: [
          'A. Misconfiguration',
          'B. Weak credentials',
          'C. End-of-life/unsupported software with known CVEs',
          'D. Insecure network architecture',
        ],
        answer: 2,
        explanation: 'End-of-life software no longer receives security patches. Apache 2.2.34 has multiple critical CVEs including remote code execution. This is a CompTIA Domain 2 concept: vulnerability types include EOL/legacy systems. The fix is to update to a supported version or decommission the system.',
      },
    ],
  },

  // ─── DOMAIN 3: Security Architecture (18%) — 5 labs ──────────────────────

  {
    id: 'lab-d3-01',
    type: 'configure',
    domain: 3,
    title: 'Firewall ACL Configuration',
    description: 'Configure a perimeter firewall ACL to enforce least privilege: block insecure protocols, allow only required services, and protect management access.',
    difficulty: 'hard',
    examRelevance: 'high',
    prompt: 'Configure each firewall rule to meet these requirements: Block all cleartext/legacy protocols. Allow HTTPS and SSH from internal only. Permit outbound DNS. Block management protocols from untrusted networks.',
    rules: [
      {
        id: 'r1',
        description: 'Inbound Telnet (TCP 23) from ANY',
        detail: 'Legacy unencrypted protocol',
        options: ['Allow', 'Deny', 'Drop'],
        correct: 'Drop',
      },
      {
        id: 'r2',
        description: 'Inbound SSH (TCP 22) from 10.0.0.0/8 (internal)',
        detail: 'Encrypted management protocol',
        options: ['Allow', 'Deny', 'Drop'],
        correct: 'Allow',
      },
      {
        id: 'r3',
        description: 'Inbound HTTPS (TCP 443) from ANY',
        detail: 'Required for web services',
        options: ['Allow', 'Deny', 'Drop'],
        correct: 'Allow',
      },
      {
        id: 'r4',
        description: 'Inbound HTTP (TCP 80) from ANY',
        detail: 'Unencrypted web traffic',
        options: ['Allow', 'Deny', 'Drop'],
        correct: 'Deny',
      },
      {
        id: 'r5',
        description: 'Outbound DNS (UDP 53) to 8.8.8.8',
        detail: 'Required for name resolution',
        options: ['Allow', 'Deny', 'Drop'],
        correct: 'Allow',
      },
      {
        id: 'r6',
        description: 'Inbound SNMP (UDP 161) from ANY',
        detail: 'Network management protocol',
        options: ['Allow', 'Deny', 'Drop'],
        correct: 'Drop',
      },
    ],
    explanation: 'Deny vs Drop: Deny sends a TCP RST/ICMP unreachable (tells attacker port is closed), Drop silently discards (better for untrusted external). Telnet and SNMP from external should be Dropped. HTTP should be Denied (sends redirect to HTTPS in practice). SSH from internal is explicitly allowed. HTTPS is allowed for web services. Port 53 outbound DNS is required for resolution.',
  },

  {
    id: 'lab-d3-02',
    type: 'identify',
    domain: 3,
    title: 'Network Segmentation Zone Placement',
    description: 'For each network asset, identify the correct network security zone. Proper segmentation is a foundational security architecture control.',
    difficulty: 'medium',
    examRelevance: 'high',
    prompt: 'Place each asset in its correct network security zone. DMZ assets are internet-facing but isolated. The Secure Zone holds critical internal systems. The Internal LAN hosts normal operations.',
    zones: ['Internet', 'DMZ', 'Internal LAN', 'Secure / Admin Zone'],
    assets: [
      { id: 'a1', name: 'Public-facing web server (nginx)', correct: 'DMZ' },
      { id: 'a2', name: 'Customer PII database', correct: 'Secure / Admin Zone' },
      { id: 'a3', name: 'Employee workstations', correct: 'Internal LAN' },
      { id: 'a4', name: 'Externally-accessible DNS server', correct: 'DMZ' },
      { id: 'a5', name: 'Active Directory Domain Controller', correct: 'Secure / Admin Zone' },
      { id: 'a6', name: 'Internal file shares (SharePoint)', correct: 'Internal LAN' },
    ],
    explanation: 'The DMZ sits between two firewalls — it can receive internet traffic but is isolated from internal networks. Internet-accessible servers (web, public DNS) live here. The Secure/Admin Zone holds the crown jewels: databases with PII, domain controllers (compromise = total domain control). Employee workstations and internal productivity tools live on the Internal LAN.',
  },

  {
    id: 'lab-d3-03',
    type: 'configure',
    domain: 3,
    title: 'Cloud Storage Security Hardening',
    description: 'A security audit found that a cloud storage bucket storing customer PII is misconfigured. Apply the correct security settings.',
    difficulty: 'medium',
    examRelevance: 'high',
    prompt: 'The cloud security team must remediate a storage bucket holding customer PII. Configure each setting to comply with data protection requirements.',
    rules: [
      {
        id: 'r1',
        description: 'Public access to bucket',
        detail: 'Contains customer PII',
        options: ['Allow all', 'Allow read-only', 'Block all public access'],
        correct: 'Block all public access',
      },
      {
        id: 'r2',
        description: 'Encryption at rest',
        detail: 'Data protection requirement',
        options: ['Disabled', 'AES-128', 'AES-256 (SSE)'],
        correct: 'AES-256 (SSE)',
      },
      {
        id: 'r3',
        description: 'MFA Delete requirement',
        detail: 'Prevent accidental/malicious deletion',
        options: ['Disabled', 'Enabled'],
        correct: 'Enabled',
      },
      {
        id: 'r4',
        description: 'Object versioning',
        detail: 'Recovery from accidental changes',
        options: ['Disabled', 'Enabled'],
        correct: 'Enabled',
      },
      {
        id: 'r5',
        description: 'Access logging',
        detail: 'Audit trail requirement',
        options: ['Disabled', 'Enabled'],
        correct: 'Enabled',
      },
    ],
    explanation: 'Cloud misconfiguration is a top breach cause. Block all public access prevents accidental exposure. AES-256 SSE encrypts data at rest. MFA Delete prevents ransomware from deleting all objects. Versioning enables recovery. Access logging provides the audit trail required by PCI DSS, HIPAA, and GDPR. All should be enabled for any bucket holding PII.',
  },

  {
    id: 'lab-d3-04',
    type: 'ordering',
    domain: 3,
    title: 'Zero Trust Access Request Verification',
    description: 'Place the steps of a Zero Trust access request verification flow in the correct order. Zero Trust: never trust, always verify.',
    difficulty: 'medium',
    examRelevance: 'high',
    items: [
      { id: 'a', text: 'User requests access to a resource' },
      { id: 'b', text: 'Identity verified via MFA (FIDO2 or TOTP)' },
      { id: 'c', text: 'Device posture checked (patch level, EDR status, disk encryption)' },
      { id: 'd', text: 'Context evaluated (location, time of day, behavior baseline)' },
      { id: 'e', text: 'Least-privilege access token issued for specific resource only' },
      { id: 'f', text: 'Session continuously monitored for anomalous behavior' },
      { id: 'g', text: 'Access revoked automatically on anomaly detection' },
    ],
    correct: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    explanation: 'Zero Trust replaces the legacy "trusted network" model. Every request must be authenticated (identity), authorized (device + context), and continuously verified. Key principles: verify explicitly — always authenticate using all available data points; use least privilege access; assume breach — minimize blast radius with micro-segmentation.',
  },

  {
    id: 'lab-d3-05',
    type: 'matching',
    domain: 3,
    title: 'Cloud Service Models & Shared Responsibility',
    description: 'Match each cloud service model to the correct description of customer vs provider security responsibilities.',
    difficulty: 'easy',
    examRelevance: 'high',
    pairs: [
      { id: 'm1', term: 'IaaS (e.g., EC2, Azure VMs)', definition: 'Provider manages physical/network/hypervisor. Customer manages OS, middleware, runtime, data, applications.' },
      { id: 'm2', term: 'PaaS (e.g., Heroku, App Engine)', definition: 'Provider manages infrastructure + OS + runtime. Customer manages applications and data only.' },
      { id: 'm3', term: 'SaaS (e.g., Microsoft 365, Salesforce)', definition: 'Provider manages everything except data governance and user access management.' },
      { id: 'm4', term: 'On-Premises (self-hosted)', definition: 'Customer is responsible for the entire stack: physical security, network, OS, application, and data.' },
      { id: 'm5', term: 'FaaS / Serverless (e.g., AWS Lambda)', definition: 'Provider manages infrastructure and runtime. Customer is responsible only for function code and data.' },
    ],
    explanation: 'The Shared Responsibility Model is a top CompTIA exam topic. As you move from IaaS → PaaS → SaaS, the provider takes on more responsibility. The customer ALWAYS retains responsibility for data classification, access management, and end-user behavior — regardless of service model.',
  },

  // ─── DOMAIN 4: Security Operations (28%) — 10 labs ────────────────────────

  {
    id: 'lab-d4-01',
    type: 'ordering',
    domain: 4,
    title: 'Incident Response Lifecycle (NIST SP 800-61)',
    description: 'Place the six phases of the NIST incident response lifecycle in the correct order. This is one of the most-tested sequences on Security+.',
    difficulty: 'easy',
    examRelevance: 'high',
    items: [
      { id: 'a', text: 'Preparation — IR plans, playbooks, tools, training' },
      { id: 'b', text: 'Detection & Analysis — identify and scope the incident' },
      { id: 'c', text: 'Containment — short-term and long-term containment' },
      { id: 'd', text: 'Eradication — remove malware, close attack vectors' },
      { id: 'e', text: 'Recovery — restore systems to normal operation' },
      { id: 'f', text: 'Post-Incident Activity — lessons learned, documentation' },
    ],
    correct: ['a', 'b', 'c', 'd', 'e', 'f'],
    explanation: 'NIST SP 800-61 is the definitive IR framework. Preparation happens before any incident. Detection & Analysis scopes the incident. Containment stops the bleeding before eradication removes the threat (preserving evidence). Recovery restores operations. Post-incident activity captures lessons learned. The exam frequently asks about the order and what each phase includes.',
  },

  {
    id: 'lab-d4-02',
    type: 'scenario',
    domain: 4,
    title: 'SIEM Alert Triage',
    description: 'A SIEM alert fires at 3:17 AM. Analyze the correlated events and determine the incident classification, severity, and correct first response action.',
    difficulty: 'hard',
    examRelevance: 'high',
    prompt: 'The following correlated alert was generated by the SIEM. You are the on-call analyst. Analyze the event chain and answer the triage questions.',
    artifactLabel: 'SIEM Correlated Alert',
    artifact: `SIEM ALERT — HIGH SEVERITY [2024-04-15 03:17:44]
Rule: "Successful login after multiple failures + anomalous exfiltration"
Confidence: 94%

Correlated Events (timeline):
03:01:12  [AUTH]  Failed login: admin@corp.com from 185.220.101.47 (TOR)
03:01:15  [AUTH]  Failed login: admin@corp.com from 185.220.101.47
03:01:18  [AUTH]  Failed login: admin@corp.com from 185.220.101.47
03:01:44  [AUTH]  Failed login: admin@corp.com from 185.220.101.47
03:02:01  [AUTH]  Failed login: admin@corp.com from 185.220.101.47
03:14:28  [AUTH]  SUCCESSFUL login: admin@corp.com from 188.166.23.91 (DE)
            Note: Normal login location is New York, NY
03:14:31  [AUDIT] admin accessed /finance/Q1-2024-earnings.xlsx
03:14:33  [AUDIT] admin accessed /hr/employee-salaries-2024.csv
03:14:35  [AUDIT] admin accessed /legal/merger-target-list.pdf
03:17:41  [NET]   188.166.23.91 → 45.14.49.119 TCP:443 transferred 847MB`,
    questions: [
      {
        id: 'q1',
        question: 'What attack technique does the failed logins sequence followed by success most likely represent?',
        options: [
          'A. Password spraying (one password across many accounts)',
          'B. Credential stuffing using breached credentials from another site',
          'C. Man-in-the-middle credential interception',
          'D. Kerberoasting service account attack',
        ],
        answer: 1,
        explanation: 'Five failed attempts from a TOR node then success from a German IP suggests credential stuffing — the attacker obtained valid credentials from a data breach and tried them. The IP change suggests separate sessions. The TOR node was likely used for enumeration attempts, while the actual stolen creds worked from a different IP.',
      },
      {
        id: 'q2',
        question: 'The 847MB outbound transfer to an external IP at 3:17 AM represents which incident stage?',
        options: [
          'A. Reconnaissance',
          'B. Lateral movement',
          'C. Data exfiltration (TA0010)',
          'D. Command and control',
        ],
        answer: 2,
        explanation: '847MB transferred to an external IP after accessing multiple sensitive files (earnings, salaries, M&A targets) is textbook data exfiltration — MITRE ATT&CK TA0010. The files accessed are high-value: financial data, PII, and insider trading material. The 3 AM timing is deliberate (low analyst activity).',
      },
      {
        id: 'q3',
        question: 'What is the CORRECT first response action for the on-call analyst?',
        options: [
          'A. Wait until business hours to escalate to the IR team',
          'B. Immediately disable the admin@corp.com account and block the source IP',
          'C. Send an email to admin@corp.com asking if they are traveling',
          'D. Review the DLP logs before taking any action',
        ],
        answer: 1,
        explanation: 'This is a high-confidence (94%) active exfiltration in progress. The correct action is immediate containment: disable the compromised account to stop further access, block the source IP, and escalate to the IR team. Waiting or emailing the user delays containment and allows continued exfiltration.',
      },
    ],
  },

  {
    id: 'lab-d4-03',
    type: 'scenario',
    domain: 4,
    title: 'Digital Forensics: Chain of Custody',
    description: 'Review a digital evidence log from an incident investigation and identify chain of custody violations that could render evidence inadmissible.',
    difficulty: 'medium',
    examRelevance: 'high',
    prompt: 'An HR investigation uncovered suspected insider theft. The IT team collected evidence. Review the evidence handling log and identify procedural failures.',
    artifactLabel: 'Evidence Handling Log',
    artifact: `EVIDENCE LOG — Case #2024-HR-0047

Item 1: Laptop (SN: L-4892)
  Collected by:  IT Admin Bob Chen
  Collection time: 2024-04-10 14:22
  Hash (SHA-256): a3f2c1... (not recorded at collection)
  Stored in:     Bob's desk drawer (unlocked)
  Transfer:      Bob to Legal on 2024-04-12 (no signature obtained)
  Hash at Legal: b7d94e... (DIFFERS from original)

Item 2: USB Drive (SN: U-0234)
  Collected by:  IT Admin Bob Chen
  Hash (SHA-256): e8a21b...
  Analysis:      Bob plugged USB into his personal laptop to "quickly
                 check files" before forensic imaging was performed
  Stored in:     Evidence locker (locked, signed)

Item 3: Email Server Logs (exported CSV)
  Collected by:  IT Admin Bob Chen
  Original log files: NOT preserved; CSV export only
  Hash (SHA-256): 2c9f4a...`,
    questions: [
      {
        id: 'q1',
        question: 'Which chain of custody violation on the laptop (Item 1) is MOST likely to make the evidence inadmissible?',
        options: [
          'A. The laptop was collected by an IT Admin rather than law enforcement',
          'B. The hash changed between collection and transfer to Legal (integrity failure)',
          'C. The collection time was during business hours',
          'D. Bob Chen personally collected the item',
        ],
        answer: 1,
        explanation: 'The hash mismatch (a3f2c1 → b7d94e) is critical — it means the evidence was modified after collection. Combined with storage in an unlocked desk drawer, this chain of custody failure means defense counsel can argue tampering and have evidence excluded. Hash verification at each transfer is a core forensic requirement.',
      },
      {
        id: 'q2',
        question: 'What forensic principle was violated when Bob plugged the USB drive into his personal laptop?',
        options: [
          'A. Legal hold — the evidence should have been destroyed',
          'B. Write blocking — evidence media must never be connected without a hardware write blocker',
          'C. Non-repudiation — Bob failed to log his action',
          'D. Chain of custody — he did not obtain a witness signature',
        ],
        answer: 1,
        explanation: 'Plugging the USB into any computer without a hardware write blocker modifies the evidence (filesystem timestamps, access times). This violates the fundamental forensic principle that evidence must not be altered. The correct procedure is to forensically image the device using a write blocker BEFORE any analysis.',
      },
    ],
  },

  {
    id: 'lab-d4-04',
    type: 'configure',
    domain: 4,
    title: 'IDS/IPS Rule Configuration',
    description: 'Configure an intrusion detection system rule set. Enable high-signal rules, disable high-false-positive rules, and set appropriate blocking actions.',
    difficulty: 'hard',
    examRelevance: 'high',
    prompt: 'Review each IDS/IPS rule and set the correct action based on the threat intelligence provided.',
    rules: [
      {
        id: 'r1',
        description: 'SQL injection attempt in HTTP params (ET:2006445)',
        detail: 'High confidence, low false positive rate',
        options: ['Disable', 'Enable / Alert', 'Enable / Block'],
        correct: 'Enable / Block',
      },
      {
        id: 'r2',
        description: 'Outbound IRC traffic (TCP 6667)',
        detail: 'Classic C2 indicator — no legitimate business use',
        options: ['Disable', 'Enable / Alert', 'Enable / Block'],
        correct: 'Enable / Block',
      },
      {
        id: 'r3',
        description: 'Port scan detected (nmap-style SYN scan)',
        detail: 'High false positive rate from monitoring tools',
        options: ['Disable', 'Enable / Alert', 'Enable / Block'],
        correct: 'Enable / Alert',
      },
      {
        id: 'r4',
        description: 'DNS request for known malware C2 domain (threat intel feed)',
        detail: 'Confirmed malicious IOC',
        options: ['Disable', 'Enable / Alert', 'Enable / Block'],
        correct: 'Enable / Block',
      },
      {
        id: 'r5',
        description: 'HTTP user-agent string "Python-urllib" (generic)',
        detail: 'Very high false positive — many legitimate automation tools',
        options: ['Disable', 'Enable / Alert', 'Enable / Block'],
        correct: 'Disable',
      },
      {
        id: 'r6',
        description: 'FTP login brute force (10+ failed auths in 60s)',
        detail: 'FTP is deprecated but still present on legacy servers',
        options: ['Disable', 'Enable / Alert', 'Enable / Block'],
        correct: 'Enable / Alert',
      },
    ],
    explanation: 'IDS/IPS tuning is about signal-to-noise ratio. High-confidence, low-FP rules (SQL injection, confirmed C2 domains) should block. Rules with legitimate uses or high FP rates (port scans from monitoring, Python user-agents) should alert or disable. IRC on 6667 has no legitimate corporate use — block. FTP brute force alerts (not blocks) since FTP monitoring tools may cause alerts. Over-blocking causes operational disruption.',
  },

  {
    id: 'lab-d4-05',
    type: 'ordering',
    domain: 4,
    title: 'Digital Forensics Investigation Process',
    description: 'Place the steps of a proper digital forensics investigation in the correct order to ensure evidence is admissible and the investigation is defensible.',
    difficulty: 'medium',
    examRelevance: 'high',
    items: [
      { id: 'a', text: 'Identify and secure the scene — prevent access, photograph physical state' },
      { id: 'b', text: 'Document everything — photograph devices, cable connections, running processes' },
      { id: 'c', text: 'Acquire evidence following order of volatility (RAM → running processes → disk)' },
      { id: 'd', text: 'Hash all acquired evidence (SHA-256) and record in chain of custody log' },
      { id: 'e', text: 'Forensically image storage media using write blockers' },
      { id: 'f', text: 'Analyze copies only — never work on original evidence' },
      { id: 'g', text: 'Document findings and produce forensic report' },
    ],
    correct: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    explanation: 'Order of volatility: volatile data (RAM, running processes, network connections) must be captured FIRST because it disappears when power is cut. Then non-volatile (disk). Documentation before collection preserves the scene. Hash immediately after collection establishes integrity. Always analyze forensic copies — never originals. The report documents methodology so findings can be challenged and defended in court.',
  },

  {
    id: 'lab-d4-06',
    type: 'scenario',
    domain: 4,
    title: 'Windows Event Log Analysis',
    description: 'A security analyst reviews Windows Security event logs after an alert. Analyze the event sequence to identify the attack technique.',
    difficulty: 'hard',
    examRelevance: 'high',
    prompt: 'The following Windows Security events were captured on domain controller DC-01 between 22:00-22:05. Analyze the sequence to identify the attack.',
    artifactLabel: 'Windows Security Event Log',
    artifact: `DC-01 Windows Security Event Log
Timeframe: 2024-04-15 22:00–22:05

22:00:14  [4624] Logon Success
  Account: svc_backup
  Logon Type: 3 (Network)
  Source IP: 10.0.5.44 (WS-089)
  Auth Package: NTLM

22:00:17  [4672] Special Privileges Assigned
  Account: svc_backup
  Privileges: SeTakeOwnership, SeDebug, SeBackup

22:00:22  [4720] A user account was created
  New Account: helpdesk_temp99
  Created By: svc_backup

22:00:23  [4732] Member added to Administrators group
  Member Added: helpdesk_temp99
  Added By: svc_backup

22:00:31  [4624] Logon Success
  Account: helpdesk_temp99
  Logon Type: 3 (Network)
  Source IP: 10.0.5.44 (WS-089)

22:04:58  [4726] A user account was deleted
  Deleted Account: helpdesk_temp99
  Deleted By: svc_backup`,
    questions: [
      {
        id: 'q1',
        question: 'Event ID 4720 followed by 4732 (added to Administrators) represents which attack technique?',
        options: [
          'A. Pass-the-hash lateral movement',
          'B. Privilege escalation via unauthorized admin account creation (T1136.001)',
          'C. Kerberoasting service account attack',
          'D. LDAP injection to modify group membership',
        ],
        answer: 1,
        explanation: 'Creating a new account (4720) and immediately adding it to Administrators (4732) is a classic privilege escalation/persistence technique — MITRE T1136.001 (Create Local Account). The service account svc_backup was used as the vehicle, suggesting it was previously compromised. The account was deleted at 22:04 to cover tracks.',
      },
      {
        id: 'q2',
        question: 'The deletion of helpdesk_temp99 at 22:04 (Event 4726) represents which tactic?',
        options: [
          'A. Defense Evasion — Indicator Removal (T1070)',
          'B. Credential Access — Account Manipulation',
          'C. Persistence — Account Creation',
          'D. Discovery — Account Discovery',
        ],
        answer: 0,
        explanation: 'Deleting the created account after use is Defense Evasion — specifically T1070 (Indicator Removal on Host). The attacker used the account to achieve their objective then deleted it to remove evidence. Windows event logs captured the entire lifecycle — this is why log forwarding to SIEM is critical before adversaries can clear local logs.',
      },
    ],
  },

  {
    id: 'lab-d4-07',
    type: 'matching',
    domain: 4,
    title: 'Security Monitoring & Response Tools',
    description: 'Match each security tool category to its correct primary function and data source.',
    difficulty: 'easy',
    examRelevance: 'high',
    pairs: [
      { id: 't1', term: 'SIEM', definition: 'Aggregates and correlates logs from across the environment; generates alerts based on rules and behavioral patterns' },
      { id: 't2', term: 'EDR', definition: 'Monitors endpoints for behavioral anomalies; provides process telemetry, memory analysis, and automated response' },
      { id: 't3', term: 'XDR', definition: 'Extends EDR across endpoint + network + cloud + identity; correlates telemetry across all layers for unified detection' },
      { id: 't4', term: 'SOAR', definition: 'Orchestrates incident response workflows; automates repetitive tasks like IOC blocking and ticket creation' },
      { id: 't5', term: 'NDR / NTA', definition: 'Analyzes network traffic patterns for anomalies; detects lateral movement, C2 beacons, and exfiltration by behavior' },
    ],
    explanation: 'SIEM = logs + correlation. EDR = endpoint behavior + response. XDR = EDR extended across all telemetry sources. SOAR = automation + orchestration of response. NDR = network traffic analysis without relying on signatures. The exam tests whether you can choose the right tool for a given scenario.',
  },

  {
    id: 'lab-d4-08',
    type: 'ordering',
    domain: 4,
    title: 'Vulnerability Management Process',
    description: 'Place the eight steps of a formal vulnerability management program in the correct order.',
    difficulty: 'medium',
    examRelevance: 'high',
    items: [
      { id: 'a', text: 'Asset inventory and discovery — know what you have' },
      { id: 'b', text: 'Authenticated vulnerability scan (credentialed)' },
      { id: 'c', text: 'CVSS scoring and risk assessment per finding' },
      { id: 'd', text: 'Prioritization: CVSS × asset criticality × exploitability in wild' },
      { id: 'e', text: 'Remediation planning: patch, mitigate, compensating control, or accept' },
      { id: 'f', text: 'Implement remediation per SLA (Critical ≤24h, High ≤7d, Medium ≤30d)' },
      { id: 'g', text: 'Verification scan to confirm vulnerability is remediated' },
      { id: 'h', text: 'Report metrics: mean time to remediate, SLA compliance, risk trend' },
    ],
    correct: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    explanation: 'Asset inventory is the prerequisite — you cannot scan what you do not know exists. Authenticated scans find more vulnerabilities than unauthenticated. CVSS provides severity. Prioritization combines severity with business context. Remediation options: patch (preferred), mitigate, compensating control, or formally accept risk. Verification confirms the fix works. Reporting drives accountability.',
  },

  {
    id: 'lab-d4-09',
    type: 'configure',
    domain: 4,
    title: 'Endpoint Hardening Checklist',
    description: 'Apply the CIS Benchmark endpoint hardening checklist to a newly provisioned Windows workstation before deploying to an end user.',
    difficulty: 'medium',
    examRelevance: 'high',
    prompt: 'Configure each setting to meet CIS Benchmark Level 1 requirements for a corporate Windows workstation.',
    rules: [
      {
        id: 'r1',
        description: 'AutoRun / AutoPlay for removable media',
        detail: 'USB-based malware delivery risk',
        options: ['Enabled', 'Disabled'],
        correct: 'Disabled',
      },
      {
        id: 'r2',
        description: 'Host-based firewall (Windows Defender Firewall)',
        detail: 'Defense in depth requirement',
        options: ['Disabled', 'Enabled'],
        correct: 'Enabled',
      },
      {
        id: 'r3',
        description: 'Full disk encryption (BitLocker)',
        detail: 'Data protection for lost/stolen devices',
        options: ['Disabled', 'Enabled'],
        correct: 'Enabled',
      },
      {
        id: 'r4',
        description: 'Screen lock after idle timeout',
        detail: 'Physical access control',
        options: ['Disabled', '15 minutes', '5 minutes'],
        correct: '5 minutes',
      },
      {
        id: 'r5',
        description: 'USB port device control',
        detail: 'Prevent unauthorized data transfer and malware',
        options: ['Allow all', 'Allow approved only', 'Block all'],
        correct: 'Allow approved only',
      },
      {
        id: 'r6',
        description: 'Windows Remote Registry service',
        detail: 'Attack surface reduction',
        options: ['Enabled (running)', 'Disabled (stopped)'],
        correct: 'Disabled (stopped)',
      },
    ],
    explanation: 'Endpoint hardening follows attack surface reduction. Disable everything not needed for business (AutoRun, Remote Registry, unused services). Enable all defensive controls (firewall, FDE, EDR). 5-minute screen lock is the CIS L1 recommendation. USB "allow approved only" balances security with productivity. BitLocker with TPM ensures data is unreadable if the device is stolen.',
  },

  {
    id: 'lab-d4-10',
    type: 'scenario',
    domain: 4,
    title: 'DLP Policy Alert Review',
    description: 'A DLP system alerts on an employee action. Analyze the alert details to determine the violation type, applicable regulation, and correct incident response.',
    difficulty: 'medium',
    examRelevance: 'high',
    prompt: 'The DLP system generates the following alert during routine monitoring. You are the DLP analyst on duty.',
    artifactLabel: 'DLP Alert Details',
    artifact: `DLP ALERT — CRITICAL [2024-04-15 16:43:11]
Rule Triggered: "PII + Financial Data — External Email"
Action Taken: QUARANTINE (email held, not delivered)

User:       m.rodriguez@corp.com
Recipient:  m.rodriguez.personal@gmail.com
Subject:    "customer data for Q1 analysis"
Attachment: customer_database_q1.xlsx (847KB)

Detected Content:
  - 2,847 Social Security Numbers (SSN pattern: XXX-XX-XXXX)
  - 1,203 Credit Card Numbers (Luhn-valid, 16-digit)
  - 847 full name + address combinations
  - 214 Date of birth records

Context:
  Employee role: Data Analyst, Finance department
  This is the 3rd similar alert for this user in 30 days.
  No business justification on file for external transfer.`,
    questions: [
      {
        id: 'q1',
        question: 'The presence of credit card numbers (PAN data) makes this a potential violation of which regulation PRIMARILY?',
        options: [
          'A. HIPAA (Health Insurance Portability and Accountability Act)',
          'B. PCI DSS (Payment Card Industry Data Security Standard)',
          'C. GDPR (General Data Protection Regulation)',
          'D. SOX (Sarbanes-Oxley Act)',
        ],
        answer: 1,
        explanation: 'PCI DSS governs the protection of cardholder data — specifically Primary Account Numbers (PANs, credit/debit card numbers). Storing, processing, or transmitting PANs outside PCI scope is a violation. HIPAA covers medical records. GDPR covers EU resident personal data. SOX covers financial reporting accuracy. The SSNs would also trigger state data breach notification laws.',
      },
      {
        id: 'q2',
        question: 'Given this is the third alert in 30 days with no business justification, what is the MOST appropriate next action?',
        options: [
          'A. Release the quarantined email as a one-time exception',
          'B. Escalate to HR and legal for insider threat investigation while keeping the email quarantined',
          'C. Send the employee a warning email',
          'D. Disable the employee\'s account immediately without investigation',
        ],
        answer: 1,
        explanation: 'Repeat violations with no business justification constitute a pattern consistent with insider data theft. The correct response is to escalate to HR, legal, and the insider threat team for a formal investigation. The email stays quarantined (preserve potential evidence). Immediate account disable without investigation could be wrongful termination without proper process.',
      },
    ],
  },

  // ─── DOMAIN 5: Security Program Management (20%) — 5 labs ─────────────────

  {
    id: 'lab-d5-01',
    type: 'ordering',
    domain: 5,
    title: 'Quantitative Risk Assessment (ALE Calculation)',
    description: 'Place the steps of a quantitative risk assessment in the correct order. This framework produces the Annual Loss Expectancy (ALE) used to justify security investment.',
    difficulty: 'hard',
    examRelevance: 'high',
    items: [
      { id: 'a', text: 'Identify and inventory assets requiring protection' },
      { id: 'b', text: 'Assign Asset Value (AV) in monetary terms' },
      { id: 'c', text: 'Identify threats for each asset' },
      { id: 'd', text: 'Determine Exposure Factor (EF) — percentage of asset value lost per incident' },
      { id: 'e', text: 'Calculate Single Loss Expectancy: SLE = AV × EF' },
      { id: 'f', text: 'Determine Annual Rate of Occurrence (ARO) — expected incidents per year' },
      { id: 'g', text: 'Calculate Annual Loss Expectancy: ALE = SLE × ARO' },
      { id: 'h', text: 'Compare ALE to countermeasure cost — implement if ALE > control cost' },
    ],
    correct: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    explanation: 'Quantitative risk: AV (what is the asset worth?) × EF (what % is lost if exploited?) = SLE (cost of one incident). SLE × ARO (how often does this happen?) = ALE (annual expected loss). If a control costs $50K/year and reduces ALE by $200K, it\'s worth implementing. The CompTIA exam frequently gives you numbers and asks you to compute SLE or ALE. Formula: SLE = AV × EF. ALE = SLE × ARO.',
  },

  {
    id: 'lab-d5-02',
    type: 'matching',
    domain: 5,
    title: 'Compliance Frameworks to Requirements',
    description: 'Match each compliance framework to the type of data or business activity it primarily governs.',
    difficulty: 'easy',
    examRelevance: 'high',
    pairs: [
      { id: 'f1', term: 'PCI DSS', definition: 'Credit/debit cardholder data (PANs) — applies to any entity that stores, processes, or transmits payment card data' },
      { id: 'f2', term: 'HIPAA', definition: 'Protected Health Information (PHI) — medical records, diagnoses, treatment data for US patients' },
      { id: 'f3', term: 'GDPR', definition: 'Personal data of EU/EEA residents — broad definition; breach notification within 72 hours required' },
      { id: 'f4', term: 'SOX', definition: 'Financial reporting accuracy and internal controls — applies to US publicly traded companies' },
      { id: 'f5', term: 'NIST CSF', definition: 'Voluntary cybersecurity framework for critical infrastructure — Identify, Protect, Detect, Respond, Recover functions' },
    ],
    explanation: 'Each framework has a specific scope trigger: PCI DSS = card data, HIPAA = healthcare organizations and their business associates, GDPR = any organization handling EU resident data (regardless of org location), SOX = public companies, NIST CSF = voluntary best-practice framework. Exam tip: GDPR\'s 72-hour breach notification is frequently tested.',
  },

  {
    id: 'lab-d5-03',
    type: 'scenario',
    domain: 5,
    title: 'Third-Party Vendor Risk Assessment',
    description: 'Review a vendor security questionnaire response and assess the risk level before contract approval.',
    difficulty: 'medium',
    examRelevance: 'high',
    prompt: 'The procurement team is evaluating CloudStorage Inc., a SaaS vendor that will process customer PII. Review their security questionnaire response:',
    artifactLabel: 'Vendor Security Assessment Summary',
    artifact: `Vendor: CloudStorage Inc.
Assessment Date: 2024-04-10
Data Handled: Customer PII (names, emails, addresses)

Security Questionnaire Responses:
  SOC 2 Type II audit:         NO — "planned for next year"
  Penetration test (12mo):     NO — last test was 2021 (3 years ago)
  Incident response plan:      YES (not reviewed by assessor)
  Data encryption at rest:     YES (AES-256)
  Data encryption in transit:  YES (TLS 1.2)
  Data residency:              US and EU mixed (unspecified)
  Sub-processors:              3 identified, security not assessed
  Data deletion on termination: "Best effort" (no SLA)
  Breach notification SLA:     72 hours (claimed, no contractual commitment)
  Cyber insurance:             $1M policy

Risk Rating by Assessor: MEDIUM-HIGH`,
    questions: [
      {
        id: 'q1',
        question: 'The absence of a SOC 2 Type II audit report is most significant because:',
        options: [
          'A. SOC 2 is legally required for all cloud vendors',
          'B. Without it, there is no independent verification of the vendor\'s security controls',
          'C. SOC 2 guarantees the vendor will never have a data breach',
          'D. It means the vendor\'s encryption is unverified',
        ],
        answer: 1,
        explanation: 'SOC 2 Type II is an independent audit by a CPA firm that verifies security controls were operating effectively over a period (usually 6-12 months). Without it, the vendor\'s security claims are self-reported and unverified. A vendor "planning" it next year provides no current assurance.',
      },
      {
        id: 'q2',
        question: 'What contractual clause MUST be included given GDPR requirements and the vendor\'s EU data processing?',
        options: [
          'A. Service Level Agreement (SLA) for 99.9% uptime',
          'B. Data Processing Agreement (DPA) with Standard Contractual Clauses (SCCs) for EU data transfer',
          'C. Non-Disclosure Agreement (NDA) covering all shared data',
          'D. Indemnification clause for any data breaches',
        ],
        answer: 1,
        explanation: 'GDPR Article 28 requires a Data Processing Agreement (DPA) with any processor handling EU personal data. If data is transferred outside the EU/EEA, Standard Contractual Clauses (SCCs) are required. Without these, processing EU resident data is a GDPR violation regardless of security controls.',
      },
    ],
  },

  {
    id: 'lab-d5-04',
    type: 'ordering',
    domain: 5,
    title: 'Business Continuity / Disaster Recovery Activation',
    description: 'Place the BCP/DR activation steps in the correct order following a major ransomware incident that has taken core systems offline.',
    difficulty: 'medium',
    examRelevance: 'high',
    items: [
      { id: 'a', text: 'Executive declares a disaster/business continuity event' },
      { id: 'b', text: 'BCP/DR team notified and assembled' },
      { id: 'c', text: 'Damage assessment: identify affected systems and data loss extent' },
      { id: 'd', text: 'Invoke the BCP/DR plan and assign recovery roles' },
      { id: 'e', text: 'Activate alternate processing site or cloud failover environment' },
      { id: 'f', text: 'Restore operations from clean backup (verify backup integrity first)' },
      { id: 'g', text: 'Parallel-run: verify alternate environment is functioning correctly' },
      { id: 'h', text: 'Return to primary site after eradication and verification' },
      { id: 'i', text: 'Conduct post-incident review and update BCP/DR plan' },
    ],
    correct: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
    explanation: 'BCP/DR requires executive declaration to authorize resource expenditure. Damage assessment before activating DR prevents spending resources on partial activation. Backup integrity verification prevents restoring ransomware-encrypted backups. Parallel-run verifies the DR environment before cutting over. Post-incident review closes the loop. Key metrics: RTO (Recovery Time Objective) and RPO (Recovery Point Objective) define acceptable downtime and data loss.',
  },

  {
    id: 'lab-d5-05',
    type: 'matching',
    domain: 5,
    title: 'Data Classification to Security Controls',
    description: 'Match each data classification level to the appropriate set of security controls. Proper classification is the foundation of a data-centric security program.',
    difficulty: 'medium',
    examRelevance: 'high',
    pairs: [
      { id: 'd1', term: 'Top Secret / Restricted', definition: 'Encryption at rest + in transit, strict need-to-know access, full audit logging, DLP monitoring, no cloud storage without approval' },
      { id: 'd2', term: 'Confidential / Internal Only', definition: 'Access control via RBAC, standard logging, DLP alerts, NDA required for external sharing' },
      { id: 'd3', term: 'Public', definition: 'Integrity controls only (hash/signature to prevent tampering); no access restrictions; no confidentiality controls required' },
      { id: 'd4', term: 'PII (Personally Identifiable Information)', definition: 'Encryption at rest + in transit, consent management, data minimization, breach notification procedures, retention limits' },
      { id: 'd5', term: 'PHI (Protected Health Information)', definition: 'HIPAA technical safeguards: encryption, access audit logs, automatic logoff, unique user IDs, emergency access procedure' },
    ],
    explanation: 'Data classification drives control selection: the higher the classification, the stronger the controls. Public data needs integrity (to prevent defacement) but not confidentiality. PII adds privacy regulations (breach notification, consent). PHI adds HIPAA-specific technical safeguards. Top Secret adds need-to-know access, DLP, and prohibits unauthorized cloud storage.',
  },
];

export default labs;
