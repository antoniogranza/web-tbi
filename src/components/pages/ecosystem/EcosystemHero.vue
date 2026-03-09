<template>
  <v-sheet color="#111810" style="padding-top:68px;">
    <v-container fluid class="pa-10 pa-md-16">
      <v-row align="end">
        <v-col cols="12" md="7">
          <div class="d-flex align-center ga-3 mb-4">
            <v-divider length="22" color="#48A111" thickness="2" />
            <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:rgba(72,161,17,0.8);text-transform:uppercase;">
              Ecosystem
            </span>
          </div>
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.2rem,4vw,3.5rem);color:#fff;line-height:1.07;letter-spacing:-0.03em;margin-bottom:20px;">
            Triple Helix<br /><em style="font-style:italic;color:#48A111;">Execution</em>
          </div>
          <p style="font-size:16px;color:rgba(255,255,255,0.5);line-height:1.74;max-width:560px;margin:0;">
            Government, industry, and academia converging to power regional
            innovation. Our ecosystem is the connective tissue that makes
            collaboration real and sustainable.
          </p>
        </v-col>

        <v-col cols="12" md="4" offset-md="1">
          <v-card color="rgba(255,255,255,0.05)" rounded="xl" elevation="0" style="border:1px solid rgba(255,255,255,0.08);">
            <v-card-text class="pa-7">
              <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:20px;">
                Triple Helix Partners
              </div>
              <div
                v-for="helix in helixSummary" :key="helix.label"
                class="d-flex align-center ga-4 py-4"
                style="border-bottom:1px solid rgba(255,255,255,0.07);"
              >
                <v-avatar :color="helix.color" variant="tonal" rounded="lg" size="40">
                  <v-icon :icon="helix.icon" size="18" :color="helix.color" />
                </v-avatar>
                <div style="flex:1;">
                  <div style="font-size:13px;font-weight:600;color:#fff;">{{ helix.label }}</div>
                  <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:1px;">{{ helix.sub }}</div>
                </div>
                <div style="font-family:'Instrument Serif',serif;font-size:1.5rem;color:#fff;letter-spacing:-0.04em;">
                  {{ helix.count }}
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
const helixSummary = [
  { icon: 'mdi-domain',            label: 'Government', sub: 'Policy, funding & regulation', color: '#25671E', count: '8+'  },
  { icon: 'mdi-briefcase-outline', label: 'Industry',   sub: 'Corporate & private sector',   color: '#48A111', count: '12+' },
  { icon: 'mdi-school-outline',    label: 'Academia',   sub: 'University & research bodies', color: '#e09000', count: '5+'  },
]
</script>