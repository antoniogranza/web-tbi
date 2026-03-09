<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          C · Organizational Structure
        </span>
      </div>
      <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;margin-bottom:48px;">
        Our Team
      </div>

      <!-- Program Manager — top tier -->
      <v-row justify="center" class="mb-6">
        <v-col cols="12" md="4">
          <v-card color="#25671E" rounded="xl" elevation="0" class="text-center">
            <v-card-text class="pa-8">
              <v-avatar color="rgba(255,255,255,0.15)" size="64" class="mb-4">
                <v-icon size="32" color="white">mdi-account-tie</v-icon>
              </v-avatar>
              <div style="font-family:'Instrument Serif',serif;font-size:1.25rem;color:#fff;margin-bottom:6px;">
                Program Manager
              </div>
              <div style="font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;">
                Oversees all incubation programs, strategic partnerships, and institutional alignment
              </div>
              <v-chip color="rgba(255,255,255,0.15)" variant="flat" size="x-small" class="mt-4"
                style="color:rgba(255,255,255,0.7);font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;">
                Leadership
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Connector -->
      <v-row justify="center" class="mb-4">
        <v-col cols="auto">
          <v-divider vertical length="32" color="#E8E0D8" thickness="2" />
        </v-col>
      </v-row>

      <!-- Second tier -->
      <v-row class="mb-6">
        <v-col v-for="role in orgTier2" :key="role.title" cols="12" md="4">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-card-text class="pa-7">
              <v-row align="center" no-gutters class="mb-4">
                <v-col cols="auto">
                  <v-avatar color="#25671E" variant="tonal" rounded="lg" size="48" class="mr-4">
                    <v-icon :icon="role.icon" color="#25671E" size="22" />
                  </v-avatar>
                </v-col>
                <v-col>
                  <div style="font-weight:700;font-size:15px;color:#111810;">{{ role.title }}</div>
                  <v-chip :color="role.chipColor" variant="tonal" size="x-small" class="mt-1"
                    style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                    {{ role.chip }}
                  </v-chip>
                </v-col>
              </v-row>
              <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:16px;">{{ role.desc }}</p>
              <v-divider class="mb-3" />
              <div v-for="r in role.responsibilities" :key="r" class="d-flex align-center ga-2 py-1">
                <v-icon size="7" color="#48A111">mdi-circle</v-icon>
                <span style="font-size:12px;color:#6B7B6A;">{{ r }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Admin Team -->
      <v-card color="#FAFAF8" rounded="xl" elevation="0" border style="border-color:#E8E0D8;">
        <v-card-text class="pa-7">
          <v-row align="center">
            <v-col cols="12" md="4">
              <v-row align="center" no-gutters>
                <v-col cols="auto">
                  <v-avatar color="#48A111" variant="tonal" rounded="lg" size="48" class="mr-4">
                    <v-icon icon="mdi-clipboard-account-outline" color="#48A111" size="22" />
                  </v-avatar>
                </v-col>
                <v-col>
                  <div style="font-weight:700;font-size:15px;color:#111810;">Admin Team</div>
                  <v-chip color="#48A111" variant="tonal" size="x-small" class="mt-1"
                    style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                    Operations
                  </v-chip>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="8">
              <v-row dense>
                <v-col v-for="t in adminTasks" :key="t" cols="6" sm="3">
                  <div class="d-flex align-center ga-2">
                    <v-icon size="7" color="#48A111">mdi-circle</v-icon>
                    <span style="font-size:12px;color:#6B7B6A;">{{ t }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

    </v-container>
  </v-sheet>
</template>

<script setup>
const orgTier2 = [
  {
    icon: 'mdi-account-multiple-outline',
    title: 'Incubation Managers',
    chip: 'Program Delivery', chipColor: '#25671E',
    desc: 'Lead day-to-day incubation operations for institutional and regional cohorts.',
    responsibilities: [
      'Cohort onboarding & scheduling',
      'Progress monitoring & reporting',
      'Mentor coordination',
      'Startup performance reviews',
    ],
  },
  {
    icon: 'mdi-lightbulb-outline',
    title: 'Technical Mentors',
    chip: 'Expert Advisory', chipColor: '#48A111',
    desc: 'Domain experts providing hands-on technical, business, and IP guidance to incubatees.',
    responsibilities: [
      'Product & technology advisory',
      'Business model validation',
      'IP strategy guidance',
      'Investor pitch coaching',
    ],
  },
  {
    icon: 'mdi-tools',
    title: 'Admin Team',
    chip: 'Operations', chipColor: '#e09000',
    desc: 'Manages compliance, finance, facilities, and administrative operations of TBI.',
    responsibilities: [
      'Financial management & reporting',
      'Facilities & resource management',
      'Procurement & compliance',
      'Events & communications',
    ],
  },
]

const adminTasks = [
  'Financial management', 'Compliance reporting',
  'Facilities management', 'Procurement',
  'Events coordination', 'Communications',
  'Document management', 'HR support',
]
</script>
