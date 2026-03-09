<template>
  <v-sheet id="spinoff" color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#e09000" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#e09000;text-transform:uppercase;">
          C · Spin-Off Development Track
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Spin-Off Development Track
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            For research-based startups separating from their parent institution —
            with structured IP, equity, and revenue frameworks to launch on solid ground.
          </p>
        </v-col>
      </v-row>

      <!-- Four pillars -->
      <v-row class="mb-8">
        <v-col v-for="(pillar, i) in spinoffPillars" :key="pillar.title" cols="12" md="3">
          <v-card
            :color="i === 0 ? '#111810' : 'white'"
            rounded="xl" elevation="0" border
            :style="`border-color:${i === 0 ? '#111810' : '#E8E0D8'};height:100%;`"
          >
            <v-sheet :color="pillar.barColor" height="3" rounded="0" style="border-radius:12px 12px 0 0;" />
            <v-card-text class="pa-7">
              <v-avatar :color="i === 0 ? 'rgba(255,255,255,0.08)' : '#e09000'" variant="tonal" rounded="lg" size="44" class="mb-5">
                <v-icon :icon="pillar.icon" size="20" :color="i === 0 ? '#F2B50B' : '#e09000'" />
              </v-avatar>
              <div style="font-weight:700;font-size:14px;margin-bottom:8px;" :style="`color:${i === 0 ? '#fff' : '#111810'}`">{{ pillar.title }}</div>
              <p style="font-size:13px;line-height:1.65;margin-bottom:16px;" :style="`color:${i === 0 ? 'rgba(255,255,255,0.5)' : '#6B7B6A'}`">{{ pillar.desc }}</p>
              <div v-for="pt in pillar.points" :key="pt" class="d-flex align-center ga-2 py-1">
                <v-icon size="7" :color="i === 0 ? 'rgba(255,255,255,0.35)' : '#e09000'">mdi-circle</v-icon>
                <span style="font-size:12px;" :style="`color:${i === 0 ? 'rgba(255,255,255,0.5)' : '#6B7B6A'}`">{{ pt }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Process Flow -->
      <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;">
        <v-card-text class="pa-8">
          <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#6B7B6A;margin-bottom:24px;">
            Spin-Off Process Flow
          </div>
          <v-row align="center">
            <template v-for="(step, i) in spinoffFlow" :key="step.label">
              <v-col cols="12" sm="auto" style="flex:1;">
                <div class="text-center">
                  <v-avatar color="#25671E" variant="tonal" size="48" class="mb-3">
                    <v-icon :icon="step.icon" size="22" color="#25671E" />
                  </v-avatar>
                  <div style="font-weight:700;font-size:13px;color:#111810;margin-bottom:4px;">{{ step.label }}</div>
                  <div style="font-size:11px;color:#6B7B6A;line-height:1.55;">{{ step.detail }}</div>
                </div>
              </v-col>
              <v-col v-if="i < spinoffFlow.length - 1" cols="12" sm="auto" class="d-none d-sm-flex justify-center">
                <v-icon size="18" color="#C8C0B8">mdi-arrow-right</v-icon>
              </v-col>
            </template>
          </v-row>
        </v-card-text>
      </v-card>

    </v-container>
  </v-sheet>
</template>

<script setup>
const spinoffPillars = [
  {
    icon: 'mdi-shield-key-outline', barColor: '#F2B50B',
    title: 'IP Protection',
    desc: 'Securing your intellectual property before separation to ensure founders and institutions both benefit.',
    points: ['Technology Disclosure Form (TDF)', 'Patent / utility model filing', 'Trade secret documentation', 'IP audit & valuation'],
  },
  {
    icon: 'mdi-file-sign', barColor: '#48A111',
    title: 'Licensing',
    desc: 'Structuring licensing agreements that commercialize university IP while protecting the institution.',
    points: ['Exclusive vs. non-exclusive terms', 'Field-of-use restrictions', 'Royalty rate negotiation', 'Sublicensing rights'],
  },
  {
    icon: 'mdi-chart-pie-outline', barColor: '#25671E',
    title: 'Equity Model',
    desc: 'Fair equity split frameworks between the university, founding team, and early investors.',
    points: ['University equity stake (5–20%)', 'Founder vesting schedule', 'Option pool allocation', 'Cap table structuring'],
  },
  {
    icon: 'mdi-cash-multiple', barColor: '#e09000',
    title: 'Revenue Sharing',
    desc: 'Tiered revenue-sharing models tied to commercial milestones, protecting both parties.',
    points: ['Pre-revenue milestone gates', 'Gross revenue royalty tiers', 'Profit-sharing thresholds', 'Buy-out provisions'],
  },
]

const spinoffFlow = [
  { icon: 'mdi-lightbulb-outline',     label: 'Technology Disclosure', detail: 'Submit TDF to TBI'        },
  { icon: 'mdi-shield-outline',        label: 'IP Assessment',         detail: 'Valuation & filing'       },
  { icon: 'mdi-domain',                label: 'Entity Formation',      detail: 'Legal structure setup'    },
  { icon: 'mdi-handshake-outline',     label: 'License Agreement',     detail: 'Terms negotiated & signed'},
  { icon: 'mdi-rocket-launch-outline', label: 'Commercial Launch',     detail: 'Go-to-market execution'   },
]
</script>