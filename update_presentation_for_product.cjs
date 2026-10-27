const fs = require('fs');

const path = 'd:/PROJECTS/smart-directory-presentation/src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

const embeddedOld = `const EMBEDDED_SOFTPHONE_STAGES = [
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

const embeddedNew = `const EMBEDDED_SOFTPHONE_STAGES = [
  {
    id: 0,
    title: "1. Voice Inbound",
    tag: "Headset Audio Stream",
    callerVoice: "Customer: 'What are the prices for the SLT Fibre unlimited packages?'",
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
    callerVoice: "Intent: [SLT Fibre] [Unlimited Packages] [Product]",
    softphoneStatus: "Internal AI Copilot • 99% Confidence",
    pulseRate: "pulse-cyan",
    aiState: "Zero manual typing required • Product data fetched",
    highlight: "ai",
    contactReady: true
  },
  {
    id: 3,
    title: "4. Zero-Click HUD",
    tag: "Instant Resolution",
    callerVoice: "Agent: 'The Unlimited 10 package is Rs. 4,490...'",
    softphoneStatus: "Resolved in 00:09s • AHT Reduced",
    pulseRate: "pulse-success",
    aiState: "Product pricing delivered right to agent's visual field!",
    highlight: "hud",
    contactReady: true
  }
];`;

content = content.replace(embeddedOld, embeddedNew);
content = content.split('Enterprise Copilot').join('Directory & Product Copilot');
content = content.split('Bank of Ceylon Kandy').join('Fibre Unlimited Packages');
content = content.split('[Banking] [Direct Inquiries]').join('[SLT Fibre] [Product]');
content = content.split('081 222 2222').join('Rs. 4,490');

fs.writeFileSync(path, content);
console.log('Update script completed.');
