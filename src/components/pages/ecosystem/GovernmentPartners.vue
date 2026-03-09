<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          A · Government Partners
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Policy &amp; Funding Enablers
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            Government agencies that provide regulatory alignment, funding
            instruments, and policy support for TBI's programs.
          </p>
        </v-col>
      </v-row>

      <!-- Featured -->
      <v-row class="mb-6">
        <v-col v-for="gov in featuredGovPartners" :key="gov.abbr" cols="12" md="6">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-sheet :color="gov.color" height="3" rounded="0" style="border-radius:12px 12px 0 0;" />
            <v-card-text class="pa-7">
              <v-row no-gutters align="start">
                <v-col cols="auto">
                  <v-avatar :color="gov.color" variant="tonal" rounded="xl" size="56" class="mr-5">
                    <v-icon :icon="gov.icon" size="26" :color="gov.color" />
                  </v-avatar>
                </v-col>
                <v-col>
                  <div class="d-flex align-center ga-2 mb-1">
                    <div style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:#111810;">{{ gov.abbr }}</div>
                    <v-chip :color="gov.color" variant="tonal" size="x-small"
                      style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                      {{ gov.tag }}
                    </v-chip>
                  </div>
                  <div style="font-size:13px;color:#111810;font-weight:600;margin-bottom:6px;">{{ gov.name }}</div>
                  <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:16px;">{{ gov.desc }}</p>
                  <div class="d-flex flex-wrap ga-2">
                    <v-chip v-for="area in gov.areas" :key="area" :color="gov.color" variant="tonal" size="x-small" style="font-size:11px;">{{ area }}</v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Supporting -->
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#6B7B6A;margin-bottom:16px;">
        Supporting Agencies
      </div>
      <v-row dense>
        <v-col v-for="gov in supportingGov" :key="gov.abbr" cols="6" sm="4" md="2">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;" hover>
            <v-card-text class="pa-5 text-center">
              <v-avatar color="#25671E" variant="tonal" rounded="lg" size="40" class="mb-3">
                <v-icon :icon="gov.icon" size="18" color="#25671E" />
              </v-avatar>
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#111810;">{{ gov.abbr }}</div>
              <div style="font-size:11px;color:#6B7B6A;margin-top:2px;line-height:1.4;">{{ gov.name }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
const featuredGovPartners = [
  {
    abbr: 'DTI', icon: 'mdi-briefcase-outline', color: '#25671E', tag: 'Primary Partner',
    name: 'Department of Trade and Industry',
    desc: 'Provides MSME development support, market access programs, Go Negosyo centers, and co-implementation of the Startup Ecosystem Development Act (SEDA).',
    areas: ['MSME Support', 'Startup Act', 'Market Access', 'Go Negosyo'],
  },
  {
    abbr: 'DICT', icon: 'mdi-laptop', color: '#48A111', tag: 'ICT Partner',
    name: 'Department of Information and Communications Technology',
    desc: 'Partners with NAVIGATU for digital infrastructure, ICT capacity building, startup acceleration programs, and connectivity support for rural innovation sites.',
    areas: ['Digital Infrastructure', 'ICT Bootcamps', 'Startup Grants', 'Connectivity'],
  },
  {
    abbr: 'DOST', icon: 'mdi-flask-outline', color: '#25671E', tag: 'Accreditor',
    name: 'Department of Science and Technology',
    desc: 'Primary TBI accrediting body. Provides program funding through PCIEERD and PCAARRD, technology transfer frameworks, and R&D grant programs.',
    areas: ['TBI Accreditation', 'R&D Grants', 'IP Support', 'PCIEERD', 'PCAARRD'],
  },
  {
    abbr: 'DA', icon: 'mdi-sprout-outline', color: '#48A111', tag: 'AgriTech Partner',
    name: 'Department of Agriculture',
    desc: 'Collaborates with TARA for field validation, agri-technology deployment, farmer linkage programs, and the Rice Competitiveness Enhancement Fund (RCEF).',
    areas: ['Field Validation', 'Farmer Linkage', 'RCEF', 'AgriTech Pilots'],
  },
]

const supportingGov = [
  { abbr: 'CHED', name: 'Commission on Higher Education',   icon: 'mdi-school-outline'            },
  { abbr: 'DILG', name: 'Dept. of Interior & Local Gov.',   icon: 'mdi-map-marker-radius-outline' },
  { abbr: 'DOH',  name: 'Department of Health',             icon: 'mdi-hospital-box-outline'      },
  { abbr: 'DOE',  name: 'Department of Energy',             icon: 'mdi-lightning-bolt-outline'    },
  { abbr: 'NEDA', name: 'National Economic Dev. Authority', icon: 'mdi-chart-line'                },
  { abbr: 'IPO',  name: 'Intellectual Property Office',     icon: 'mdi-shield-lock-outline'       },
]
</script>