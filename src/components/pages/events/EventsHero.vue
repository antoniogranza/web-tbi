<template>
  <v-sheet color="#111810" style="padding-top:68px;">
    <v-container fluid class="pa-10 pa-md-16">
      <v-row align="end">
        <v-col cols="12" md="7">
          <div class="d-flex align-center ga-3 mb-4">
            <v-divider length="22" color="#48A111" thickness="2" />
            <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:rgba(72,161,17,0.8);text-transform:uppercase;">
              Innovation &amp; Ecosystem Activity
            </span>
          </div>
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.2rem,4vw,3.5rem);color:#fff;line-height:1.07;letter-spacing:-0.03em;margin-bottom:20px;">
            Events + Programs<br />
            <em style="font-style:italic;color:#48A111;">Driving the Startup Pipeline</em>
          </div>
          <p style="font-size:16px;color:rgba(255,255,255,0.5);line-height:1.74;max-width:560px;margin:0;">
            The CSU Technology Business Incubator organizes programs that strengthen the regional innovation
            ecosystem — from startup bootcamps and incubation orientations to technology showcases and
            industry forums. These initiatives support the incubation pipeline of NAVIGATU and TARA while
            connecting innovators, researchers, MSMEs, and industry partners.
          </p>
        </v-col>

        <v-col cols="12" md="4" offset-md="1">
          <v-card color="rgba(255,255,255,0.05)" rounded="xl" elevation="0"
            style="border:1px solid rgba(255,255,255,0.08);">
            <v-card-text class="pa-7">
              <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:20px;">
                Program Categories
              </div>
              <div
                v-for="p in programCategories" :key="p.label"
                class="d-flex align-center ga-4 py-3"
                style="border-bottom:1px solid rgba(255,255,255,0.07);"
              >
                <v-avatar :color="p.color" variant="tonal" rounded="lg" size="36">
                  <v-icon :icon="p.icon" size="17" :color="p.color" />
                </v-avatar>
                <div>
                  <div style="font-size:13px;font-weight:600;color:#fff;">{{ p.label }}</div>
                  <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:1px;">{{ p.sub }}</div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
const programCategories = [
  { icon: 'mdi-school-outline',          color: '#48A111', label: 'Startup Bootcamps',    sub: 'Entrepreneurship training programs'        },
  { icon: 'mdi-lightbulb-outline',       color: '#25671E', label: 'Technology Showcases', sub: 'Research commercialization events'          },
  { icon: 'mdi-handshake-outline',       color: '#48A111', label: 'Industry Forums',      sub: 'Collaboration with government & industry'   },
  { icon: 'mdi-rocket-launch-outline',   color: '#25671E', label: 'Startup Recruitment',  sub: 'Incubation intake activities'               },
]
</script>