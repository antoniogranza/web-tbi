export const incubatees = {
  // ── Identity ────────────────────────────────────────────────────────────────
  'ascribo-ai': {
    name: 'Ascribo AI',
    tagline: 'Context-aware AI language translation for every critical field.',
    category: 'Artificial Intelligence',
    logo: '/images/incubatees/AscriboAi.png',
    heroBg: '/images/incubatees/AscriboHero.jpg', // wide hero background — replace with real photo
    yearFounded: '2022',
    location: 'Bukidnon, Philippines',
    teamSize: '8',
    contactEmail: 'hello@ascriboai.com',
    website: 'https://ascriboai.com',
    status: 'active', // 'active' | 'graduated' | 'scaling'
    statusLabel: 'Active Incubatee',
    statusIcon: 'mdi-check-circle-outline',

    // ── Quick stats strip ────────────────────────────────────────────────────────
    quickStats: [
      {
        label: 'Funds Generated',
        value: '₱4.2M',
        icon: 'mdi-cash-multiple',
        color: '#1565C0',
        iconBg: '#E3F2FD',
      },
      {
        label: 'Partnerships',
        value: '6',
        icon: 'mdi-handshake-outline',
        color: '#2E7D32',
        iconBg: '#E8F5E9',
      },
      {
        label: 'Year Started',
        value: '2022',
        icon: 'mdi-calendar-star',
        color: '#E65100',
        iconBg: '#FFF3E0',
      },
      {
        label: 'Awards Won',
        value: '3',
        icon: 'mdi-trophy-outline',
        color: '#6A1B9A',
        iconBg: '#EDE7F6',
      },
    ],

    // ── About ────────────────────────────────────────────────────────────────────
    descriptionLong:
      'Ascribo AI is a context-aware AI language translation platform that delivers accurate, nuanced translations across the most demanding professional domains. Unlike general-purpose tools, Ascribo understands the intent, tone, and technicality behind every sentence.',
    descriptionExtra:
      'Built from the ground up by a team of linguists and engineers, Ascribo serves clients in law, medicine, and marketing — fields where a single mistranslation can create chaos. The platform continuously learns from domain-specific corpora to improve accuracy over time.',

    problem:
      'Inaccurate language translations in critical fields like law, medicine, and marketing often lead to costly errors. Existing services either sacrifice quality or charge prohibitively high rates.',
    solution:
      'Ascribo AI uses domain-specific language models fine-tuned on professional corpora to deliver translation accuracy that matches — and often exceeds — human translators, at a fraction of the cost.',

    // ── Sidebar details ──────────────────────────────────────────────────────────
    details: [
      { label: 'Industry', value: 'Artificial Intelligence', icon: 'mdi-brain', color: '#1565C0' },
      { label: 'Stage', value: 'Seed / Growth', icon: 'mdi-sprout-outline', color: '#2E7D32' },
      { label: 'Year Founded', value: '2022', icon: 'mdi-calendar-outline', color: '#E65100' },
      {
        label: 'Headquarters',
        value: 'Bukidnon, Philippines',
        icon: 'mdi-map-marker-outline',
        color: '#6A1B9A',
      },
      {
        label: 'Team Size',
        value: '8 members',
        icon: 'mdi-account-group-outline',
        color: '#00695C',
      },
      { label: 'Total Funding', value: '₱4.2M', icon: 'mdi-cash-multiple', color: '#C62828' },
    ],

    tags: ['NLP', 'Machine Translation', 'Legal Tech', 'MedTech', 'SaaS', 'B2B'],

    // ── Achievements ─────────────────────────────────────────────────────────────
    achievements: [
      {
        title: 'DICT Startup Grant Recipient',
        desc: 'Awarded a seed grant by the Department of Information and Communications Technology to fund product development and market entry.',
        photo: '/images/incubatees/achievements/AscriboAch1.jpg', // replace with real photo
        year: '2022',
        category: 'Funding',
        icon: 'mdi-bank-outline',
        color: '#1565C0',
      },
      {
        title: '1st Place — Regional Startup Pitching',
        desc: 'Won first place at the DOST Regional Innovation and Technology Expo, outcompeting 32 other startup teams.',
        photo: '/images/incubatees/achievements/AscriboAch2.jpg', // replace with real photo
        year: '2023',
        category: 'Award',
        icon: 'mdi-trophy-outline',
        color: '#F9A825',
      },
      {
        title: 'Pilot Deployment — LGU Partnership',
        desc: 'Successfully deployed Ascribo AI within two Local Government Units for multilingual public document processing.',
        photo: '/images/incubatees/achievements/AscriboAch3.jpg', // replace with real photo
        year: '2024',
        category: 'Milestone',
        icon: 'mdi-flag-checkered',
        color: '#2E7D32',
      },
    ],

    // ── Funding ──────────────────────────────────────────────────────────────────
    totalFunds: '₱4.2M',
    fundingRounds: [
      {
        label: 'Pre-Seed (DICT Grant)',
        amount: '₱1.2M',
        year: '2022',
        desc: 'Initial grant from DICT PCIEERD used for prototype development and team formation.',
        color: '#1565C0',
      },
      {
        label: 'Seed Round (YCEF-EE)',
        amount: '₱1.8M',
        year: '2023',
        desc: 'Secured through the YCEF-EE program, enabling pilot deployments and product refinement.',
        color: '#2E7D32',
      },
      {
        label: 'Bridge Funding',
        amount: '₱1.2M',
        year: '2024',
        desc: 'Bridge financing from Navigatú TBI to support market expansion and partnerships.',
        color: '#E65100',
      },
    ],

    // ── Partners ─────────────────────────────────────────────────────────────────
    partners: [
      {
        name: 'DICT Philippines',
        type: 'Government Agency',
        icon: 'mdi-government',
        color: '#1565C0',
        logoBg: '#E3F2FD',
        chipLabel: 'Funder',
        chipColor: 'primary',
      },
      {
        name: 'DOST Region X',
        type: 'Research & Technology',
        icon: 'mdi-flask-outline',
        color: '#2E7D32',
        logoBg: '#E8F5E9',
        chipLabel: 'R&D Partner',
        chipColor: 'success',
      },
      {
        name: 'LGU Malaybalay City',
        type: 'Local Government Unit',
        icon: 'mdi-city-variant-outline',
        color: '#E65100',
        logoBg: '#FFF3E0',
        chipLabel: 'Pilot Client',
        chipColor: 'warning',
      },
      {
        name: 'Philippine Bar Association',
        type: 'Industry Partner',
        icon: 'mdi-scale-balance',
        color: '#6A1B9A',
        logoBg: '#EDE7F6',
        chipLabel: 'Client',
        chipColor: 'secondary',
      },
      {
        name: 'Central Mindanao University',
        type: 'Academic Institution',
        icon: 'mdi-school-outline',
        color: '#00695C',
        logoBg: '#E0F2F1',
        chipLabel: 'Collaborator',
        chipColor: 'teal',
      },
      {
        name: 'TechSpark Mindanao',
        type: 'Startup Ecosystem',
        icon: 'mdi-lightning-bolt',
        color: '#C62828',
        logoBg: '#FFEBEE',
        chipLabel: 'Network',
        chipColor: 'error',
      },
    ],

    // ── Gallery ──────────────────────────────────────────────────────────────────
    // Replace these with real image paths — must be 5 images
    gallery: [
      '/images/incubatees/gallery/ascribo-gallery-1.jpg',
      '/images/incubatees/gallery/ascribo-gallery-2.jpg',
      '/images/incubatees/gallery/ascribo-gallery-3.jpg',
      '/images/incubatees/gallery/ascribo-gallery-4.jpg',
      '/images/incubatees/gallery/ascribo-gallery-5.jpg',
    ],
    galleryCaptions: [
      'Team presenting at the DOST Regional Expo 2023',
      'Product demo day at Navigatú TBI',
      'Partnership signing with LGU Malaybalay',
      'Team training session',
      'UI/UX design sprint',
    ],

    // ── Team ─────────────────────────────────────────────────────────────────────
    team: [
      {
        name: 'Juan dela Cruz',
        role: 'CEO & Co-Founder',
        photo: '/images/incubatees/team/ascribo-ceo.jpg',
        linkedin: '#',
        email: 'juan@ascriboai.com',
      },
      {
        name: 'Maria Santos',
        role: 'CTO & Co-Founder',
        photo: '/images/incubatees/team/ascribo-cto.jpg',
        linkedin: '#',
        email: 'maria@ascriboai.com',
      },
      { name: 'Carlos Reyes', role: 'Lead NLP Engineer', photo: null, linkedin: '#', email: null },
      {
        name: 'Ana Villanueva',
        role: 'Product Designer',
        photo: null,
        linkedin: '#',
        email: 'ana@ascriboai.com',
      },
    ],

    // ── Testimonials ─────────────────────────────────────────────────────────────
    testimonials: [
      {
        name: 'Juan dela Cruz',
        role: 'CEO & Co-Founder, Ascribo AI',
        photo: '/images/incubatees/team/ascribo-ceo.jpg',
        quote:
          'Navigatú TBI gave us more than funding — they gave us structure, mentorship, and a community that believed in our vision when we were still figuring it out ourselves.',
      },
      {
        name: 'Maria Santos',
        role: 'CTO & Co-Founder, Ascribo AI',
        photo: '/images/incubatees/team/ascribo-cto.jpg',
        quote:
          'The technical mentorship we received at Navigatú was invaluable. It pushed us to solve hard problems the right way, and that rigor shows in the quality of our platform today.',
      },
      {
        name: 'Atty. Ramon Flores',
        role: 'Partner Client, Philippine Bar Association',
        photo: null,
        quote:
          'Ascribo AI has genuinely transformed how our firm handles multilingual documents. The accuracy and turnaround are unmatched by anything we used before.',
      },
    ],
  },
  // new incubatee added dynamically
  biznest: {
    name: 'BizNest',
    tagline: 'Business incubation and network platform for local entrepreneurs.',
    category: 'Business Services',
    logo: '/images/incubatees/BizNest.jpg',
    heroBg: '/images/incubatees/BizNestHero.jpg',
    yearFounded: '2023',
    location: 'Cagayan de Oro, Philippines',
    teamSize: '5',
    contactEmail: 'hello@biznest.com',
    website: 'https://biznest.ph',
    status: 'active',
    statusLabel: 'Active Incubatee',
    statusIcon: 'mdi-check-circle-outline',
    quickStats: [
      {
        label: 'Startups Supported',
        value: '20',
        icon: 'mdi-account-group-outline',
        color: '#1565C0',
        iconBg: '#E3F2FD',
      },
      {
        label: 'Workshops Held',
        value: '12',
        icon: 'mdi-school-outline',
        color: '#2E7D32',
        iconBg: '#E8F5E9',
      },
    ],
    descriptionLong:
      'BizNest provides a collaborative workspace and mentorship network for emerging entrepreneurs.',
    descriptionExtra:
      'Focused on grassroots startups, BizNest connects founders with mentors, funding, and peer resources to accelerate growth.',
    problem:
      'Community enterprises lack access to structured support and networking opportunities.',
    solution:
      'By offering co-working space, training, and a digital platform, BizNest builds an ecosystem where local ventures thrive together.',
    details: [
      {
        label: 'Industry',
        value: 'Business Services',
        icon: 'mdi-briefcase-outline',
        color: '#1565C0',
      },
      { label: 'Stage', value: 'Early Stage', icon: 'mdi-seed-outline', color: '#2E7D32' },
    ],
    tags: ['Co-working', 'Mentorship', 'SMEs'],
    achievements: [],
    totalFunds: '₱500K',
    fundingRounds: [],
    partners: [],
    gallery: [],
    galleryCaptions: [],
    team: [],
    testimonials: [],
  },
}

// legacy alias
export const startup = incubatees
