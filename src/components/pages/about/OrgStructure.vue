<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          C · Organizational Structure
        </span>
      </div>
      <v-row align="end" class="mb-12">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Our Team
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            A dedicated team of managers, mentors, and support staff driving
            the incubation programs across NAVIGATÚ and TARA.
          </p>
        </v-col>
      </v-row>

      <!-- ── Tier 1: Program Manager ── -->
      <v-row justify="center" class="mb-6">
        <v-col cols="12" sm="8" md="4">
          <v-card color="#25671E" rounded="xl" elevation="0" style="overflow:hidden;">

            <!-- Headshot -->
            <div style="position:relative;aspect-ratio:1/1;overflow:hidden;">
              <img
                v-if="programManager.photoUrl"
                :src="programManager.photoUrl"
                :alt="programManager.name"
                style="width:100%;height:100%;object-fit:cover;object-position:top;display:block;"
              />
              <div
                v-else
                class="d-flex flex-column align-center justify-center"
                style="width:100%;height:100%;background:rgba(0,0,0,0.2);"
              >
                <v-avatar color="rgba(255,255,255,0.15)" size="72" class="mb-3">
                  <v-icon size="36" color="rgba(255,255,255,0.6)">mdi-account-tie</v-icon>
                </v-avatar>
                <span style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);">
                  Headshot Photo
                </span>
              </div>
              <!-- Gradient over photo bottom -->
              <div style="position:absolute;bottom:0;left:0;right:0;height:50%;background:linear-gradient(to top,rgba(37,103,30,0.95),transparent);" />
            </div>

            <v-card-text class="pa-7">
              <v-chip color="rgba(255,255,255,0.15)" variant="flat" size="x-small" class="mb-3"
                style="color:rgba(255,255,255,0.7);font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;">
                Leadership
              </v-chip>
              <div style="font-family:'Instrument Serif',serif;font-size:1.25rem;color:#fff;margin-bottom:4px;">
                {{ programManager.name || 'Program Manager' }}
              </div>
              <div style="font-size:12px;color:rgba(255,255,255,0.55);margin-bottom:12px;">
                {{ programManager.role }}
              </div>
              <p style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.65;margin:0;">
                Oversees all incubation programs, strategic partnerships, and institutional alignment
              </p>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>

      <!-- Connector line -->
      <v-row justify="center" class="mb-6">
        <v-col cols="auto">
          <v-divider vertical length="32" color="#E8E0D8" thickness="2" />
        </v-col>
      </v-row>

      <!-- ── Tier 2: Incubation Managers + Technical Mentors ── -->
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#6B7B6A;margin-bottom:16px;">
        Core Team
      </div>
      <v-row class="mb-6">
        <v-col v-for="role in orgTier2" :key="role.title" cols="12" md="4">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;overflow:hidden;">

            <!-- Team photo / role photo -->
            <div style="position:relative;aspect-ratio:16/9;overflow:hidden;">
              <img
                v-if="role.photoUrl"
                :src="role.photoUrl"
                :alt="role.title"
                style="width:100%;height:100%;object-fit:cover;object-position:top;display:block;"
              />
              <div
                v-else
                class="d-flex flex-column align-center justify-center"
                :style="`width:100%;height:100%;background:${role.placeholderBg};`"
              >
                <v-avatar :color="role.chipColor" variant="tonal" rounded="xl" size="48" class="mb-2">
                  <v-icon :icon="role.icon" :color="role.chipColor" size="22" />
                </v-avatar>
                <span style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:#B8B0A8;">
                  Team Photo
                </span>
              </div>
              <div style="position:absolute;bottom:0;left:0;right:0;height:3px;" :style="`background:${role.chipColor};`" />
            </div>

            <v-card-text class="pa-7">
              <div class="d-flex align-center justify-space-between mb-4">
                <div style="font-weight:700;font-size:15px;color:#111810;">{{ role.title }}</div>
                <v-chip :color="role.chipColor" variant="tonal" size="x-small"
                  style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                  {{ role.chip }}
                </v-chip>
              </div>
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

      <!-- ── Admin Team ── -->
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
// ── Program Manager ──────────────────────────────────────────
// Set photoUrl to activate headshot, leave '' for placeholder
const programManager = {
  name: '',        // → e.g. 'Juan dela Cruz'
  role: 'TBI Program Manager',
  photoUrl: '',    // → e.g. '/src/assets/team/program-manager.jpg'
}

// ── Core Team (Tier 2) ───────────────────────────────────────
// photoUrl: team group photo or individual shots per role
const orgTier2 = [
  {
    icon: 'mdi-account-multiple-outline',
    title: 'Incubation Managers',
    chip: 'Program Delivery', chipColor: '#25671E',
    placeholderBg: '#EDF5E8',
    photoUrl: '', // → e.g. '/src/assets/team/incubation-managers.jpg'
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
    placeholderBg: '#EDF5E8',
    photoUrl: '', // → e.g. '/src/assets/team/mentors.jpg'
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
    placeholderBg: '#FDF5E0',
    photoUrl: '', // → e.g. '/src/assets/team/admin.jpg'
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
