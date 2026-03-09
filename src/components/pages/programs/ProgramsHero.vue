<template>
  <v-sheet color="#111810" style="padding-top:68px;">
    <v-container fluid class="pa-10 pa-md-16">
      <v-row align="end">
        <v-col cols="12" md="7">
          <div class="d-flex align-center ga-3 mb-4">
            <v-divider length="22" color="#48A111" thickness="2" />
            <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:rgba(72,161,17,0.8);text-transform:uppercase;">
              Programs
            </span>
          </div>
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.2rem,4vw,3.5rem);color:#fff;line-height:1.07;letter-spacing:-0.03em;margin-bottom:20px;">
            Structured Incubation<br />Pipeline
          </div>
          <p style="font-size:16px;color:rgba(255,255,255,0.5);line-height:1.74;max-width:560px;margin:0;">
            From first idea to funded venture — our programs meet every innovator
            at the right stage and guide them through a structured path to market.
          </p>
        </v-col>

        <v-col cols="12" md="4" offset-md="1">
          <v-card color="rgba(255,255,255,0.05)" rounded="xl" elevation="0" style="border:1px solid rgba(255,255,255,0.08);">
            <v-card-text class="pa-6">
              <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:16px;">
                Jump to
              </div>
              <div
                v-for="nav in pageNav"
                :key="nav.label"
                class="d-flex align-center ga-3 py-3"
                style="border-bottom:1px solid rgba(255,255,255,0.07);cursor:pointer;"
                @click="scrollTo(nav.id)"
              >
                <v-avatar :color="nav.color" variant="tonal" size="32" rounded="lg">
                  <v-icon :icon="nav.icon" size="16" :color="nav.color" />
                </v-avatar>
                <span style="font-size:13px;color:rgba(255,255,255,0.7);font-weight:500;">{{ nav.label }}</span>
                <v-spacer />
                <v-icon size="14" color="rgba(255,255,255,0.3)">mdi-arrow-down</v-icon>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
const pageNav = [
  { label: 'Institutional Incubation', id: 'institutional', icon: 'mdi-school-outline',           color: '#25671E' },
  { label: 'Regional Incubation',      id: 'regional',      icon: 'mdi-map-marker-radius-outline', color: '#48A111' },
  { label: 'Spin-Off Track',           id: 'spinoff',       icon: 'mdi-source-branch',             color: '#e09000' },
  { label: 'Capacity Building',        id: 'capacity',      icon: 'mdi-lightning-bolt-outline',    color: '#48A111' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>