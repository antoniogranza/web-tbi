<template>
  <v-sheet color="white" border>
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          B · IP Metrics
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Intellectual Property Portfolio
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            From 2020 to 2024, CSU's Technology Transfer and Licensing Office (TTLO)
            secured 20 IP registrations — earning consecutive IPOPHIL Platinum Awards
            from 2020 to 2023. Annual target: 5 new IP applications filed per year.
          </p>
        </v-col>
      </v-row>

      <!-- IP breakdown -->
      <v-row class="mb-8">
        <v-col v-for="ip in ipBreakdown" :key="ip.type" cols="12" sm="6" md="3">
          <v-card color="#FAFAF8" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-card-text class="pa-7 text-center">
              <v-avatar :color="ip.color" variant="tonal" rounded="xl" size="56" class="mb-4">
                <v-icon :icon="ip.icon" size="26" :color="ip.color" />
              </v-avatar>
              <div style="font-family:'Instrument Serif',serif;font-size:3rem;color:#111810;letter-spacing:-0.05em;line-height:1;margin-bottom:6px;">{{ ip.count }}</div>
              <div style="font-weight:700;font-size:14px;color:#111810;margin-bottom:4px;">{{ ip.type }}</div>
              <div style="font-size:12px;color:#6B7B6A;line-height:1.55;margin-bottom:14px;">{{ ip.note }}</div>
              <v-progress-linear :model-value="ip.pct" :color="ip.color" bg-color="#F0EAE0" height="4" rounded />
              <div style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#9eaa9c;margin-top:6px;letter-spacing:0.08em;">
                {{ ip.pct }}% of total portfolio
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Commercialized R&D outputs -->
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#6B7B6A;margin-bottom:16px;">
        Commercialized R&amp;D Outputs (2020–2024)
      </div>
      <v-row class="mb-8">
        <v-col v-for="rd in commercialized" :key="`${rd.name}-${rd.adopter}`" cols="12" sm="6" md="3">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;" hover>
            <v-card-text class="pa-6">
              <v-chip :color="rd.color" variant="tonal" size="x-small" class="mb-4"
                style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                {{ rd.ip }}
              </v-chip>
              <div style="font-weight:700;font-size:14px;color:#111810;margin-bottom:4px;">{{ rd.name }}</div>
              <p style="font-size:12px;color:#6B7B6A;line-height:1.6;margin-bottom:10px;">{{ rd.desc }}</p>
              <div class="d-flex align-center ga-2">
                <v-icon size="12" color="#48A111">mdi-check-circle-outline</v-icon>
                <span style="font-size:11px;color:#6B7B6A;">{{ rd.adopter }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- IPOPHIL + Research pubs -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card color="#25671E" rounded="xl" elevation="0" style="height:100%;">
            <v-card-text class="pa-8">
              <v-avatar color="rgba(255,255,255,0.15)" rounded="lg" size="48" class="mb-5">
                <v-icon icon="mdi-trophy-outline" size="24" color="white" />
              </v-avatar>
              <div style="font-family:'Instrument Serif',serif;font-size:1.5rem;color:#fff;margin-bottom:8px;">IPOPHIL Platinum Award</div>
              <p style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.72;margin-bottom:16px;">
                CSU received the IPOPHIL Platinum Award consecutively from
                <strong style="color:#fff;">2020 to 2023</strong> — awarded to universities with
                at least 7 patents filed and at least 1 IP commercialized.
                CSU is now targeting the <strong style="color:#F2B50B;">Palladium Award</strong>
                for the 5th consecutive recognition.
              </p>
              <div class="d-flex ga-3">
                <v-chip color="rgba(255,255,255,0.15)" variant="flat" size="small"
                  style="color:rgba(255,255,255,0.8);font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                  4× Platinum Award
                </v-chip>
                <v-chip color="#F2B50B" variant="tonal" size="small"
                  style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                  Palladium Next Target
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card color="#FAFAF8" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-card-text class="pa-8">
              <v-avatar color="#48A111" variant="tonal" rounded="lg" size="48" class="mb-5">
                <v-icon icon="mdi-book-open-outline" size="24" color="#48A111" />
              </v-avatar>
              <div style="font-family:'Instrument Serif',serif;font-size:1.5rem;color:#111810;margin-bottom:8px;">Research Output</div>
              <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin-bottom:20px;">
                CSU has published <strong style="color:#111810;">631 research and technical articles</strong>
                indexed on Scopus (2010–2025), across 16 Research Centers from
                the Main and Cabadbaran City campuses. Publications grew from
                51 in 2020 to a peak of 153 in 2024.
              </p>
              <v-row dense>
                <v-col v-for="pub in pubStats" :key="pub.label" cols="6">
                  <v-sheet color="#F0EAE0" rounded="lg" class="pa-4">
                    <div style="font-family:'Instrument Serif',serif;font-size:1.6rem;color:#111810;letter-spacing:-0.04em;line-height:1;">{{ pub.val }}</div>
                    <div style="font-size:11px;color:#6B7B6A;margin-top:3px;">{{ pub.label }}</div>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
const ipBreakdown = [
  { type: 'Patents',        count: 7, icon: 'mdi-lightbulb-outline',   color: '#25671E', pct: 35, note: 'Registered/granted patents from CSU R&D outputs via TTLO, 2020–2024'    },
  { type: 'Utility Models', count: 5, icon: 'mdi-wrench-outline',       color: '#48A111', pct: 25, note: 'Utility model certifications including two agricultural machines'        },
  { type: 'Copyrights',     count: 7, icon: 'mdi-copyright',            color: '#e09000', pct: 35, note: 'Software and creative works including MapX documentation and CSU tools' },
  { type: 'Trademark',      count: 1, icon: 'mdi-registered-trademark', color: '#25671E', pct: 5,  note: 'One registered trademark secured as part of the IP portfolio'            },
]

const commercialized = [
  { name: 'FARMS',       ip: 'No IP',       color: '#6B7B6A', desc: 'Financial and Resource Management System developed by CSU ICT Center.',                                    adopter: 'CSU Internal Use'               },
  { name: 'MapX',        ip: 'Copyright',   color: '#25671E', desc: 'Geo-mapping platform adopted by City Government of Butuan. Only R&D output with notable market traction.', adopter: 'City Gov. of Butuan'            },
  { name: 'MapX',        ip: 'Copyright',   color: '#25671E', desc: 'Subsequent adoption of the MapX platform for LGU governance and mapping needs.',                            adopter: 'LGU Mainit & Mambajao, Camiguin'},
  { name: 'Agri Machines', ip: 'Utility Model', color: '#48A111', desc: 'Two agricultural machines with Utility Model certifications from IPOPHIL.',                            adopter: 'Agri-sector adoption'           },
]

const pubStats = [
  { val: '631', label: 'Total Scopus Articles (2010–2025)' },
  { val: '153', label: 'Articles published in 2024'        },
  { val: '16',  label: 'Active Research Centers'           },
  { val: '2',   label: 'Campuses (Main + Cabadbaran)'      },
]
</script>