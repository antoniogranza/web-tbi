<template>
  <v-sheet color="white" border>
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          D · Investors &amp; Funding Sources
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Capital &amp; Funding Access
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            A curated network of grant bodies, angel investors, venture funds,
            and development finance institutions accessible to TBI-incubated ventures.
          </p>
        </v-col>
      </v-row>

      <!-- Filter tabs -->
      <div class="d-flex flex-wrap ga-2 mb-8">
        <v-chip
          v-for="tab in fundingTabs" :key="tab"
          :color="activeFundingTab === tab ? '#25671E' : 'default'"
          :variant="activeFundingTab === tab ? 'flat' : 'outlined'"
          size="small" style="cursor:pointer;font-size:12px;"
          @click="activeFundingTab = tab"
        >
          {{ tab }}
        </v-chip>
      </div>

      <v-row>
        <v-col v-for="fund in filteredFunding" :key="fund.name" cols="12" sm="6" md="4">
          <v-card color="#FAFAF8" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;" hover>
            <v-card-text class="pa-6">
              <v-row no-gutters align="center" class="mb-4">
                <v-col cols="auto">
                  <v-avatar :color="fund.color" variant="tonal" rounded="lg" size="44" class="mr-4">
                    <v-icon :icon="fund.icon" size="20" :color="fund.color" />
                  </v-avatar>
                </v-col>
                <v-col>
                  <div style="font-weight:700;font-size:14px;color:#111810;">{{ fund.name }}</div>
                  <div style="font-size:11px;color:#6B7B6A;margin-top:2px;">{{ fund.org }}</div>
                </v-col>
              </v-row>
              <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:14px;">{{ fund.desc }}</p>
              <div class="d-flex align-center justify-space-between">
                <v-chip :color="fund.color" variant="tonal" size="x-small"
                  style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                  {{ fund.type }}
                </v-chip>
                <span style="font-family:'Instrument Serif',serif;font-size:1rem;color:#111810;font-weight:700;">{{ fund.range }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref, computed } from 'vue'

const fundingTabs = ['All', 'Government Grant', 'Angel / VC', 'Development Finance', 'University Fund']
const activeFundingTab = ref('All')

const allFunding = [
  { name: 'PCIEERD Grants',      org: 'DOST-PCIEERD',           icon: 'mdi-bank-outline',           color: '#25671E', type: 'Government Grant',    range: '₱1M–₱5M',     desc: 'R&D and commercialization grants for technology-based startups emerging from university research programs.' },
  { name: 'PCAARRD Grants',      org: 'DOST-PCAARRD',           icon: 'mdi-sprout-outline',         color: '#48A111', type: 'Government Grant',    range: '₱500K–₱3M',   desc: 'Agriculture, aquaculture, and natural resources R&D grants specifically for TARA-incubated enterprises.' },
  { name: 'SETUP Program',       org: 'DOST Regional',          icon: 'mdi-cog-outline',            color: '#25671E', type: 'Government Grant',    range: '₱500K–₱1.5M', desc: 'Small Enterprise Technology Upgrading Program — equipment grants and technical assistance for MSMEs.' },
  { name: 'QBO Innovation Hub',  org: 'QBO / IdeaSpace',        icon: 'mdi-lightning-bolt-outline', color: '#e09000', type: 'Angel / VC',          range: '₱500K–₱2M',   desc: 'Pre-seed and seed stage investment for Philippine startups with strong technology differentiation.' },
  { name: 'ASEAN Catalysts',     org: 'ASEAN Foundation',       icon: 'mdi-earth',                  color: '#48A111', type: 'Angel / VC',          range: '$50K–$200K',   desc: 'Regional venture fund supporting Southeast Asian startups solving significant regional development problems.' },
  { name: 'IFC SME Ventures',    org: 'International Finance Corp', icon: 'mdi-domain',            color: '#25671E', type: 'Development Finance', range: '$100K–$500K',  desc: 'Development finance for scalable SMEs with demonstrated social and economic impact in emerging markets.' },
  { name: 'RCEF Startup Fund',   org: 'DA-RCEF',                icon: 'mdi-cash-multiple',          color: '#48A111', type: 'Government Grant',    range: '₱300K–₱2M',   desc: 'Rice Competitiveness Enhancement Fund — for agri-food startups with direct linkage to rice farming value chains.' },
  { name: 'CSU Research Grant',  org: 'Caraga State University', icon: 'mdi-school-outline',        color: '#25671E', type: 'University Fund',     range: '₱100K–₱500K', desc: 'Internal university research funding for faculty and students commercializing CSU-originated technologies.' },
  { name: '1776 Southeast Asia', org: '1776 Fund',              icon: 'mdi-briefcase-outline',      color: '#e09000', type: 'Angel / VC',          range: '$25K–$100K',   desc: 'Early-stage fund focused on frontier markets with special interest in climate, health, and education tech.' },
]

const filteredFunding = computed(() =>
  activeFundingTab.value === 'All'
    ? allFunding
    : allFunding.filter(f => f.type === activeFundingTab.value)
)
</script>