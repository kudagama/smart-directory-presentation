const fs = require('fs');

const path = 'd:/PROJECTS/smart-directory-presentation/src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

const sampleQueriesOld = `const sampleQueries = [
    {
      query: "Need contact for fiber maintenance in Kandy",
      feature: "Natural Language Search",
      match: {
        name: "Kasun S. Perera",
        role: "Lead Engineer • Optical Fiber Network Maintenance",
        dept: "Network Operations Division",
        location: "Kandy Regional HQ, 2nd Floor",
        phone: "081 228 4911",
        ext: "3911",
        status: "Available Now"
      }
    },
    {
      query: "Customer Billing Escalations Colombo Manager",
      feature: "Smart Result Identification",
      match: {
        name: "Dilini Senanayake",
        role: "Senior Manager • Billing Dispute Resolution",
        dept: "Finance & Revenue Assurance",
        location: "Colombo Head Office, Tower B",
        phone: "011 202 3344",
        ext: "1240",
        status: "Available Now"
      }
    },
    {
      query: "IT Helpdesk & Active Directory Support",
      feature: "Single Search: People, Dept & Org",
      match: {
        name: "Enterprise IT Support Desk",
        role: "Internal Service Desk Hotline",
        dept: "Enterprise Information Systems",
        location: "Central Operations Centre",
        phone: "011 244 8000",
        ext: "5555",
        status: "24/7 Active"
      }
    }
  ];`;

const sampleQueriesNew = `const sampleQueries = [
    {
      query: "I want the number for the Bank of Ceylon, Kandy branch",
      feature: "Natural Language Search",
      match: {
        name: "Bank of Ceylon",
        role: "Primary Contact",
        dept: "Kandy Branch",
        location: "Kandy",
        phone: "081 222 2222",
        ext: "boc.kandy@boc.lk",
        status: "Directory Result"
      }
    },
    {
      query: "What are the prices for the unlimited data packages?",
      feature: "Smart Result Identification",
      match: {
        name: "Fibre Unlimited Packages",
        role: "Unlimited 10: Rs. 4,490 | Unlimited 25: Rs. 6,490",
        dept: "Product Match",
        location: "Islandwide Coverage",
        phone: "-",
        ext: "-",
        status: "Available"
      }
    },
    {
      query: "Can you tell me more about the unlimited Home packages?",
      feature: "Single Search: Products, Dept & Org",
      match: {
        name: "Unlimited Home Packages",
        role: "Home: Rs. 5,900 (100Mbps) | Home Plus: Rs. 9,900",
        dept: "SLT Fibre",
        location: "Nugegoda Area",
        phone: "-",
        ext: "-",
        status: "Coverage Available"
      }
    }
  ];`;

const embeddedOld = `const EMBEDDED_SOFTPHONE_STAGES = [
  {
    id: 0,
    title: "1. Voice Inbound",
    tag: "Headset Audio Stream",
    callerVoice: "Customer: 'Mata Kandy hospital eke number eka one...'",
    softphoneStatus: "Active Call • Inbound 1912",
    pulseRate: "pulse-fast",
    aiState: "Listening to Sinhala / Singlish stream...",
    highlight: "audio",
    contactReady: false
  },
  {
    id: 1,
    title: "2. Embedded Softphone",
    tag: "Core Telephony Processing",
    callerVoice: "Voice decoded inside agent's system...",
    softphoneStatus: "Audio Channel 01 • Live VoIP Stream",
    pulseRate: "pulse-normal",
    aiState: "Softphone audio routed directly to Neural AI Core",
    highlight: "softphone",
    contactReady: false
  },
  {
    id: 2,
    title: "3. Intent Extracted",
    tag: "Bio-Digital Intelligence",
    callerVoice: "Intent: [Healthcare] [Kandy General Hospital] [Emergency/Direct]",
    softphoneStatus: "Internal AI Copilot • 99% Confidence",
    pulseRate: "pulse-cyan",
    aiState: "Zero manual typing required • Query synthesized",
    highlight: "ai",
    contactReady: true
  },
  {
    id: 3,
    title: "4. Zero-Click HUD",
    tag: "Instant Resolution",
    callerVoice: "Agent: 'General Hospital Kandy number eka 081 222 2222'",
    softphoneStatus: "Resolved in 00:09s • AHT Reduced",
    pulseRate: "pulse-success",
    aiState: "Contact delivered right to agent's visual field!",
    highlight: "hud",
    contactReady: true
  }
];`;

const embeddedNew = `const EMBEDDED_SOFTPHONE_STAGES = [
  {
    id: 0,
    title: "1. Voice Inbound",
    tag: "Headset Audio Stream",
    callerVoice: "Customer: 'I want the number for the Bank of Ceylon, Kandy branch.'",
    softphoneStatus: "Active Call • Inbound 1912",
    pulseRate: "pulse-fast",
    aiState: "Listening to Audio stream...",
    highlight: "audio",
    contactReady: false
  },
  {
    id: 1,
    title: "2. Embedded Softphone",
    tag: "Core Telephony Processing",
    callerVoice: "Voice decoded inside agent's system...",
    softphoneStatus: "Audio Channel 01 • Live VoIP Stream",
    pulseRate: "pulse-normal",
    aiState: "Softphone audio routed directly to Neural AI Core",
    highlight: "softphone",
    contactReady: false
  },
  {
    id: 2,
    title: "3. Intent Extracted",
    tag: "Bio-Digital Intelligence",
    callerVoice: "Intent: [Bank of Ceylon] [Kandy branch] [Directory]",
    softphoneStatus: "Internal AI Copilot • 99% Confidence",
    pulseRate: "pulse-cyan",
    aiState: "Zero manual typing required • Query synthesized",
    highlight: "ai",
    contactReady: true
  },
  {
    id: 3,
    title: "4. Zero-Click HUD",
    tag: "Instant Resolution",
    callerVoice: "Agent: 'The number is 081 222 2222'",
    softphoneStatus: "Resolved in 00:09s • AHT Reduced",
    pulseRate: "pulse-success",
    aiState: "Contact delivered right to agent's visual field!",
    highlight: "hud",
    contactReady: true
  }
];`;

content = content.replace(sampleQueriesOld, sampleQueriesNew);
content = content.replace(embeddedOld, embeddedNew);
content = content.split('Kandy General Hospital').join('Bank of Ceylon Kandy');
content = content.split('[Emergency] [Direct Inquiries]').join('[Banking] [Direct Inquiries]');

fs.writeFileSync(path, content);
console.log('Update script completed.');
