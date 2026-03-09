<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          A · Startup Metrics
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Incubation Performance
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            CSU-TBI targets 15 startups annually across ICT, engineering, agriculture,
            and aquaculture sectors through NAVIGATU and TARA. Graduation requires
            ₱5M revenue or 5+ employees.
          </p>
        </v-col>
      </v-row>

      <!-- Stat cards -->
      <v-row class="mb-8">
        <v-col v-for="s in startupStats" :key="s.label" cols="12" sm="6" md="3">
          <v-card :color="s.featured ? '#25671E' : 'white'" rounded="xl" elevation="0" border
            :style="`border-color:${s.featured ? '#25671E' : '#E8E0D8'};height:100%;`">
            <v-card-text class="pa-7">
              <v-avatar
                :color="s.featured ? 'rgba(255,255,255,0.15)' : '#25671E'"
                variant="tonal" rounded="lg" size="44" class="mb-5"
              >
                <v-icon :icon="s.icon" size="20" :color="s.featured ? '#fff' : '#25671E'" />
              </v-avatar>
              <div style="font-family:'Instrument Serif',serif;font-size:2.75rem;letter-spacing:-0.05em;line-height:1;margin-bottom:6px;"
                :style="`color:${s.featured ? '#fff' : '#111810'}`">
                {{ s.val }}
              </div>
              <div style="font-weight:700;font-size:14px;margin-bottom:6px;"
                :style="`color:${s.featured ? '#fff' : '#111810'}`">
                {{ s.label }}
              </div>
              <p style="font-size:12px;line-height:1.6;margin-bottom:14px;"
                :style="`color:${s.featured ? 'rgba(255,255,255,0.6)' : '#6B7B6A'}`">
                {{ s.note }}
              </p>
              <v-chip
                :color="s.featured ? 'rgba(255,255,255,0.2)' : '#48A111'"
                variant="tonal" size="x-small"
                :prepend-icon="s.trend === 'up' ? 'mdi-trending-up' : 'mdi-target'"
                :style="s.featured ? 'color:rgba(255,255,255,0.7);font-size:9px;' : 'font-size:9px;'"
                style="font-family:'JetBrains Mono',monospace;letter-spacing:0.06em;text-transform:uppercase;"
              >
                {{ s.tag }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Two TBIs -->
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#6B7B6A;margin-bottom:16px;">
        Two Active TBIs Under CSU-TBI Office
      </div>
      <v-row>
        <v-col v-for="tbi in tbiUnits" :key="tbi.name" cols="12" md="6">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-sheet :color="tbi.color" height="3" rounded="0" style="border-radius:12px 12px 0 0;" />
            <v-card-text class="pa-7">
              <v-row no-gutters align="center" class="mb-4">
                <v-col cols="auto">
                  <v-avatar :color="tbi.color" variant="tonal" rounded="xl" size="52" class="mr-4">
                    <v-icon :icon="tbi.icon" size="24" :color="tbi.color" />
                  </v-avatar>
                </v-col>
                <v-col>
                  <div style="font-family:'Instrument Serif',serif;font-size:1.3rem;color:#111810;margin-bottom:2px;">{{ tbi.name }}</div>
                  <div style="font-size:12px;color:#6B7B6A;">{{ tbi.full }}</div>
                </v-col>
                <v-col cols="auto">
                  <v-chip :color="tbi.color" variant="tonal" size="x-small"
                    style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                    {{ tbi.funder }}
                  </v-chip>
                </v-col>
              </v-row>
              <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:16px;">{{ tbi.desc }}</p>
              <div class="d-flex flex-wrap ga-2">
                <v-chip v-for="tag in tbi.sectors" :key="tag" :color="tbi.color" variant="tonal" size="x-small">{{ tag }}</v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Graduation criteria -->
      <v-card color="#111810" rounded="xl" elevation="0" class="mt-8">
        <v-card-text class="pa-8">
          <v-row align="center">
            <v-col cols="12" md="4">
              <div style="font-family:'Instrument Serif',serif;font-size:1.2rem;color:#fff;margin-bottom:6px;">Graduation Criteria</div>
              <p style="font-size:13px;color:rgba(255,255,255,0.45);margin:0;">
                A startup graduates from TBI incubation when any of these thresholds are met.
              </p>
            </v-col>
            <v-col cols="12" md="8">
              <v-row dense>
                <v-col v-for="g in graduationCriteria" :key="g.label" cols="12" sm="6" md="4">
                  <div class="d-flex align-center ga-3 py-2">
                    <v-avatar color="#48A111" variant="tonal" rounded="lg" size="32">
                      <v-icon :icon="g.icon" size="16" color="#48A111" />
                    </v-avatar>
                    <div>
                      <div style="font-size:13px;font-weight:600;color:#fff;">{{ g.val }}</div>
                      <div style="font-size:11px;color:rgba(255,255,255,0.4);">{{ g.label }}</div>
                    </div>
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
const startupStats = [
  { icon: 'mdi-rocket-launch-outline', val: '15+', label: 'Startups Target (Annual)',   note: 'Annual incubation target across ICT, engineering, agri-aqua sectors per program objectives.',            tag: 'Annual Target', trend: 'up', featured: true  },
  { icon: 'mdi-source-branch',         val: '4',   label: 'Commercialized R&D Outputs', note: 'FARMS, MapX (×3 LGU adoptions), and two agricultural machines with Utility Model certification.',        tag: 'TTLO Data',     trend: 'up', featured: false },
  { icon: 'mdi-account-group-outline', val: '2',   label: 'Active TBIs',                note: 'NAVIGATU (DOST-PCIEERD) for ICT & Engineering, TARA (DOST-PCAARRD) for Agri-Aqua.',                     tag: 'Operational',   trend: 'up', featured: false },
  { icon: 'mdi-flask-outline',         val: '16',  label: 'Research Centers',            note: 'Across Main and Cabadbaran City campuses, feeding R&D outputs into the TBI commercialization pipeline.', tag: 'CSU OVPRDIE',   trend: 'up', featured: false },
]

const tbiUnits = [
  {
    name: 'NAVIGATÚ', full: 'Innovation and Technopreneurship Hub (iTecH)',
    icon: 'mdi-laptop', color: '#25671E', funder: 'DOST-PCIEERD',
    desc: 'Branded after Butuan\'s historic Balangay trading boats, NAVIGATÚ focuses on ICT and Engineering startups. Jointly founded with DOST-PCIEERD. Located at 2nd Floor, Mechatronics Bldg., CSU Main Campus.',
    sectors: ['ICT', 'Engineering', 'AI/ML', 'IoT', 'Blockchain', 'Data Science'],
  },
  {
    name: 'TARA', full: 'Technological Advances Revolutionizing Agri-Aqua (ATBI)',
    icon: 'mdi-sprout-outline', color: '#48A111', funder: 'DOST-PCAARRD',
    desc: 'Named after the Golden Tara artifact found in the Agusan River in 1917, TARA-ATBI fosters agri-aqua innovation. Jointly funded with DOST-PCAARRD. Targets DOST\'s 1,000 startups goal by 2025.',
    sectors: ['AgriTech', 'AquaTech', 'Precision Farming', 'Food Tech', 'Biotech'],
  },
]

const graduationCriteria = [
  { icon: 'mdi-cash-multiple',          val: '₱5M+',    label: 'Annual Revenue'          },
  { icon: 'mdi-account-group-outline',  val: '5+',      label: 'Employees (non-founder)' },
  { icon: 'mdi-handshake-outline',      val: 'Raised',  label: 'Substantial Investment'  },
  { icon: 'mdi-calendar-check-outline', val: '2 Years', label: 'Tenure Completed'        },
  { icon: 'mdi-domain',                 val: 'Acquired',label: 'M&A / Reorganization'    },
  { icon: 'mdi-chart-line-variant',     val: 'IPO',     label: 'Public Issue Planned'    },
]
</script>