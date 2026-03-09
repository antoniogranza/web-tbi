<template>
  <v-sheet id="institutional" color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          A · Institutional Incubation
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Institutional Incubation Program
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            Designed for university insiders — students, faculty, and researchers
            with technology-based ventures ready for structured commercial development.
          </p>
        </v-col>
      </v-row>

      <!-- Who / Eligibility / Duration -->
      <v-row class="mb-10">
        <v-col cols="12" md="4">
          <v-card color="#25671E" rounded="xl" elevation="0" style="height:100%;">
            <v-card-text class="pa-7">
              <v-chip color="rgba(255,255,255,0.15)" variant="flat" size="small" class="mb-5"
                style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.7);">
                Who Can Apply
              </v-chip>
              <div
                v-for="who in institutionalFor" :key="who.label"
                class="d-flex align-center ga-3 py-3"
                style="border-bottom:1px solid rgba(255,255,255,0.1);"
              >
                <v-avatar color="rgba(255,255,255,0.12)" rounded="lg" size="36">
                  <v-icon :icon="who.icon" size="17" color="white" />
                </v-avatar>
                <div>
                  <div style="font-size:14px;color:#fff;font-weight:600;">{{ who.label }}</div>
                  <div style="font-size:11px;color:rgba(255,255,255,0.55);">{{ who.sub }}</div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-card-text class="pa-7">
              <v-chip color="#48A111" variant="tonal" size="small" class="mb-5"
                style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;">
                Eligibility Requirements
              </v-chip>
              <div v-for="req in eligibility" :key="req" class="d-flex align-center ga-3 py-2" style="border-bottom:1px solid #F0EAE0;">
                <v-icon size="8" color="#48A111">mdi-circle</v-icon>
                <span style="font-size:13px;color:#111810;">{{ req }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-card-text class="pa-7">
              <v-chip color="#e09000" variant="tonal" size="small" class="mb-5"
                style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;">
                Duration &amp; Benefits
              </v-chip>
              <div class="d-flex align-center ga-4 mb-5 pb-5" style="border-bottom:1px solid #F0EAE0;">
                <div>
                  <div style="font-family:'Instrument Serif',serif;font-size:2.5rem;color:#111810;letter-spacing:-0.04em;line-height:1;">12–18</div>
                  <div style="font-size:12px;color:#6B7B6A;margin-top:2px;">Months per cohort</div>
                </div>
                <v-divider vertical />
                <div>
                  <div style="font-family:'Instrument Serif',serif;font-size:2.5rem;color:#111810;letter-spacing:-0.04em;line-height:1;">2×</div>
                  <div style="font-size:12px;color:#6B7B6A;margin-top:2px;">Intakes per year</div>
                </div>
              </div>
              <div v-for="b in institutionalBenefits" :key="b" class="d-flex align-center ga-3 py-2" style="border-bottom:1px solid #F0EAE0;">
                <v-icon size="8" color="#25671E">mdi-check-circle-outline</v-icon>
                <span style="font-size:13px;color:#111810;">{{ b }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Stage Pipeline -->
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#6B7B6A;margin-bottom:20px;">
        Incubation Stages
      </div>
      <v-row>
        <v-col v-for="(stage, i) in stages" :key="stage.label" cols="12" sm="6" md="3">
          <v-card
            :color="stage.active ? '#25671E' : 'white'"
            rounded="xl" elevation="0" border
            :style="`border-color:${stage.active ? '#25671E' : '#E8E0D8'};height:100%;`"
          >
            <v-card-text class="pa-6">
              <div class="d-flex align-center justify-space-between mb-4">
                <v-avatar :color="stage.active ? 'rgba(255,255,255,0.2)' : '#25671E'" variant="tonal" size="36" rounded="lg">
                  <span style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;"
                    :style="`color:${stage.active ? '#fff' : '#25671E'}`">{{ i + 1 }}</span>
                </v-avatar>
                <v-icon v-if="i < stages.length - 1" size="16" :color="stage.active ? 'rgba(255,255,255,0.4)' : '#C8C0B8'">mdi-arrow-right</v-icon>
                <v-icon v-else size="16" color="#F2B50B">mdi-trophy-outline</v-icon>
              </div>
              <div style="font-weight:700;font-size:14px;margin-bottom:4px;" :style="`color:${stage.active ? '#fff' : '#111810'}`">{{ stage.label }}</div>
              <div style="font-size:11px;margin-bottom:12px;" :style="`color:${stage.active ? 'rgba(255,255,255,0.6)' : '#6B7B6A'}`">{{ stage.duration }}</div>
              <v-divider :color="stage.active ? 'rgba(255,255,255,0.15)' : '#F0EAE0'" class="mb-3" />
              <div v-for="act in stage.activities" :key="act" class="d-flex align-center ga-2 py-1">
                <v-icon size="7" :color="stage.active ? 'rgba(255,255,255,0.5)' : '#48A111'">mdi-circle</v-icon>
                <span style="font-size:12px;" :style="`color:${stage.active ? 'rgba(255,255,255,0.65)' : '#6B7B6A'}`">{{ act }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
const institutionalFor = [
  { icon: 'mdi-account-school-outline', label: 'Students',    sub: 'Undergraduate & graduate with tech ventures' },
  { icon: 'mdi-account-tie-outline',    label: 'Faculty',     sub: 'Researchers with commercial-ready outputs'   },
  { icon: 'mdi-flask-outline',          label: 'Researchers', sub: 'University-based R&D personnel'              },
]

const eligibility = [
  'Technology-based venture or research output',
  'At least one team member enrolled/employed at CSU',
  'Prototype or proof-of-concept available',
  'No active commercial revenue over ₱5M',
  'Commitment to full program participation',
  'Endorsed by college dean or department head',
]

const institutionalBenefits = [
  'Mentorship & 1:1 coaching',
  'Co-working space access',
  'Seed funding linkages',
  'IP & legal advisory support',
  'Investor network access',
  'Demo Day participation',
]

const stages = [
  {
    label: 'Ideation', duration: 'Month 1–3', active: false,
    activities: ['Concept refinement', 'Market research', 'Team formation', 'Problem validation'],
  },
  {
    label: 'Validation', duration: 'Month 4–6', active: false,
    activities: ['MVP development', 'Customer discovery', 'Business model canvas', 'Mentor matching'],
  },
  {
    label: 'Acceleration', duration: 'Month 7–12', active: true,
    activities: ['Product iteration', 'Sales & traction', 'Investor prep', 'Partnership building'],
  },
  {
    label: 'Graduation', duration: 'Month 13+', active: false,
    activities: ['Demo Day pitch', 'Investor introductions', 'Alumni network access', 'Scale planning'],
  },
]
</script>