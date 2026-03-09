<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex justify-space-between align-end flex-wrap ga-4 mb-12">
        <div>
          <div class="d-flex align-center ga-3 mb-3">
            <v-divider length="22" color="#48A111" thickness="2" />
            <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.18em;color:#48A111;text-transform:uppercase;">Programs</span>
          </div>
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.9rem,2.8vw,2.75rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;font-weight:400;">Find Your Right Track</div>
        </div>
        <v-btn to="/program" variant="text" color="#25671E" append-icon="mdi-arrow-right" style="text-transform:none;font-family:'Inter',sans-serif;font-weight:600;font-size:13px;">All programs</v-btn>
      </div>

      <v-row>
        <v-col v-for="prog in programs" :key="prog.title" cols="12" md="4">
          <v-card :to="'/program'" rounded="xl" elevation="0" border color="white" hover style="height:100%;border-color:#E8E0D8;">
            <v-sheet :color="prog.color" height="3" rounded="0" style="border-radius:12px 12px 0 0;" />
            <v-card-text class="pa-7">
              <div class="d-flex justify-space-between align-center mb-4">
                <v-chip variant="tonal" :color="prog.color" size="small" style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;">{{ prog.badge }}</v-chip>
                <v-icon size="15" color="#C8C0B8">mdi-arrow-top-right</v-icon>
              </div>
              <div style="font-family:'Instrument Serif',serif;font-size:1.3rem;color:#111810;letter-spacing:-0.018em;margin-bottom:8px;font-weight:400;line-height:1.2;">{{ prog.title }}</div>
              <p style="font-family:'Inter',sans-serif;font-size:14px;font-weight:400;color:#6B7B6A;line-height:1.67;margin-bottom:20px;letter-spacing:-0.008em;">{{ prog.desc }}</p>
              <v-divider class="mb-3" />
              <div v-for="f in prog.feats" :key="f" class="d-flex align-center ga-2 py-2" style="border-bottom:1px solid #F0EAE0;">
                <v-icon size="8" :color="prog.color">mdi-circle</v-icon>
                <span style="font-family:'Inter',sans-serif;font-size:13px;font-weight:400;color:#111810;letter-spacing:-0.008em;">{{ f }}</span>
              </div>
              <div class="d-flex align-center flex-wrap ga-2 mt-4">
                <span style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:#9eaa9c;">For</span>
                <v-chip v-for="t in prog.for" :key="t" :color="prog.color" variant="tonal" size="x-small" style="font-family:'Inter',sans-serif;font-size:10px;font-weight:500;">{{ t }}</v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
const programs = [
  {
    badge: 'Institutional', color: '#25671E',
    title: 'Institutional Incubation',
    desc: 'For university-based researchers and faculty ready to commercialize their work within an institutional framework.',
    feats: ['IP ownership & disclosure support', 'Faculty entrepreneur fast-track', 'Lab-to-market pathway', 'Research grant linkages'],
    for: ['Students', 'Faculty', 'Researchers'],
  },
  {
    badge: 'Regional', color: '#48A111',
    title: 'Regional Incubation',
    desc: 'Open to innovators across the region regardless of institutional affiliation. Local problems, scalable solutions.',
    feats: ['Open cohort applications', 'Regional mentor network', 'Co-working space access', 'Demo Day & investor connect'],
    for: ['MSMEs', 'External Startups'],
  },
  {
    badge: 'Spin-Off', color: '#e09000',
    title: 'Spin-Off Support',
    desc: 'Dedicated support for ventures separating from parent institutions — legal structuring and launch acceleration.',
    feats: ['Corporate separation support', 'Equity & cap table advisory', 'Seed funding facilitation', 'Post-spin growth programs'],
    for: ['Research Startups', 'Faculty Ventures'],
  },
]
</script>
