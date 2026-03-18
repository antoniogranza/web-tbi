<template>
  <v-sheet color="white" border>
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          B · Industry &amp; Corporate Partners
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Private Sector Partners
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            Corporations and industry players who co-design programs, provide
            mentorship, absorb technologies, and connect startups to markets.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="corp in corporatePartners" :key="corp.name" cols="12" sm="6" md="4">
          <v-card color="#FAFAF8" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;" hover>
            <v-card-text class="pa-6">
              <v-row no-gutters align="center" class="mb-4">
                <v-col cols="auto">
                  <v-avatar :color="corp.color" variant="tonal" rounded="lg" size="48" class="mr-4">
                    <v-icon :icon="corp.icon" size="22" :color="corp.color" />
                  </v-avatar>
                </v-col>
                <v-col>
                  <div style="font-weight:700;font-size:14px;color:#111810;">{{ corp.name }}</div>
                  <div style="font-size:12px;color:#6B7B6A;margin-top:2px;">{{ corp.sector }}</div>
                </v-col>
              </v-row>
              <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:14px;">{{ corp.role }}</p>
              <v-chip :color="corp.color" variant="tonal" size="x-small"
                style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                {{ corp.type }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Become a partner -->
      <v-card color="#111810" rounded="xl" elevation="0" class="mt-8">
        <v-card-text class="pa-8">
          <v-row align="center">
            <v-col cols="12" md="7">
              <div style="font-family:'Instrument Serif',serif;font-size:1.4rem;color:#fff;margin-bottom:8px;">
                Become an Industry Partner
              </div>
              <p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;margin:0;">
                Co-design challenge-driven programs, access pre-vetted startups,
                commission R&amp;D projects, or host your innovation challenges
                through TBI's ecosystem.
              </p>
            </v-col>
            <v-col cols="12" md="5" class="d-flex justify-md-end ga-3 flex-wrap">
              <v-btn to="/apply" color="#F2B50B" variant="flat" rounded="lg" append-icon="mdi-arrow-right"
                style="text-transform:none;font-weight:700;color:#111810;">
                Partner With Us
              </v-btn>
              <v-btn variant="outlined" rounded="lg"
                style="text-transform:none;border-color:rgba(255,255,255,0.25);color:#fff;">
                Download Partnership Deck
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

    </v-container>
  </v-sheet>
</template>

<script setup>
const corporatePartners = [
  { name: 'PLDT Enterprise',     sector: 'Telecommunications', icon: 'mdi-wifi',                  color: '#25671E', type: 'Infrastructure', role: 'Provides connectivity infrastructure, cloud credits, and co-implementation of the PLDT Gabay Guro digital literacy program for incubatees.' },
  { name: 'BPI Foundation',      sector: 'Financial Services', icon: 'mdi-bank-outline',           color: '#48A111', type: 'Finance',        role: 'Supports financial literacy programs, SME lending facilitation, and access to the BPI-KNB scholarship for student founders.' },
  { name: 'Globe Telecom',       sector: 'Telecommunications', icon: 'mdi-cellphone',              color: '#25671E', type: 'Accelerator',    role: 'Co-hosts the G-Xcellerator startup program, provides API credits, 917Ventures network access, and startup challenge prizes.' },
  { name: 'UnionBank',           sector: 'Banking & Fintech',  icon: 'mdi-credit-card-outline',    color: '#48A111', type: 'Fintech',        role: 'Offers embedded banking solutions for startups, fintech sandbox access, and digital onboarding tools via The Ark innovation lab.' },
  { name: 'Jollibee Foods Corp', sector: 'Food & Agriculture', icon: 'mdi-food-outline',           color: '#e09000', type: 'Supply Chain',   role: 'Connects agri-food startups to JFCs supply chain, co-funds food innovation challenges, and provides procurement pilot opportunities.' },
  { name: 'Meralco PowerLabs',   sector: 'Energy',             icon: 'mdi-lightning-bolt-outline', color: '#25671E', type: 'Energy',         role: 'Partners for clean energy validation, smart grid pilots, and provides test environments for energy-focused incubatees.' },
]
</script>