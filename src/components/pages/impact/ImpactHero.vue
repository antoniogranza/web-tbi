<template>
  <v-sheet color="#111810" style="padding-top:68px;">
    <v-container fluid class="pa-10 pa-md-16">
      <v-row align="end">
        <v-col cols="12" md="7">
          <div class="d-flex align-center ga-3 mb-4">
            <v-divider length="22" color="#48A111" thickness="2" />
            <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:rgba(72,161,17,0.8);text-transform:uppercase;">
              Impact &amp; Credibility
            </span>
          </div>
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.2rem,4vw,3.5rem);color:#fff;line-height:1.07;letter-spacing:-0.03em;margin-bottom:20px;">
            Credibility +<br />
            <em style="font-style:italic;color:#48A111;">Sustainability Proof</em>
          </div>
          <p style="font-size:16px;color:rgba(255,255,255,0.5);line-height:1.74;max-width:560px;margin:0;">
            From IPOPHIL Platinum recognition to Scopus-indexed research outputs —
            CSU-TBI's numbers reflect a university actively closing the gap between
            innovation and commercialization.
          </p>
        </v-col>

        <v-col cols="12" md="4" offset-md="1">
          <v-card color="rgba(255,255,255,0.05)" rounded="xl" elevation="0"
            style="border:1px solid rgba(255,255,255,0.08);">
            <v-card-text class="pa-7">
              <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:20px;">
                Recognition &amp; Mandates
              </div>
              <div
                v-for="rec in recognitions" :key="rec.label"
                class="d-flex align-center ga-4 py-3"
                style="border-bottom:1px solid rgba(255,255,255,0.07);"
              >
                <v-avatar :color="rec.color" variant="tonal" rounded="lg" size="36">
                  <v-icon :icon="rec.icon" size="17" :color="rec.color" />
                </v-avatar>
                <div>
                  <div style="font-size:13px;font-weight:600;color:#fff;">{{ rec.label }}</div>
                  <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:1px;">{{ rec.sub }}</div>
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
const recognitions = [
  { icon: 'mdi-trophy-outline',      color: '#F2B50B', label: 'IPOPHIL Platinum Award',    sub: '4× consecutive (2020–2023)'                  },
  { icon: 'mdi-domain',              color: '#25671E', label: 'DOST-PCIEERD Accredited',    sub: 'NAVIGATU ICT/Engineering TBI'                },
  { icon: 'mdi-sprout-outline',      color: '#48A111', label: 'DOST-PCAARRD Accredited',    sub: 'TARA Agri-Aqua ATBI'                         },
  { icon: 'mdi-gavel',               color: '#25671E', label: 'BOR Res. No. 85-16, S.2024', sub: 'Official CSU cost center under OVPRDIE'      },
  { icon: 'mdi-shield-lock-outline', color: '#48A111', label: 'ITSO Network Member',        sub: 'Since 2012 — IP culture & commercialization' },
]
</script>