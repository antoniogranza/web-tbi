<template>
  <v-sheet color="#111810">
    <v-container fluid class="pa-10 pa-md-16">

      <v-row class="mb-10" align="end">
        <v-col cols="12" md="5">
          <div class="d-flex align-center ga-3 mb-3">
            <v-divider length="22" color="#48A111" thickness="2" />
            <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.18em;color:rgba(72,161,17,0.8);text-transform:uppercase;">What We Do</span>
          </div>
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(2rem,3.2vw,2.9rem);color:#fff;line-height:1.1;letter-spacing:-0.028em;font-weight:400;">
            Three Pillars of<br />Innovation Impact
          </div>
        </v-col>
        <v-col cols="12" md="6" offset-md="1">
          <p style="font-family:'Inter',sans-serif;font-size:15px;font-weight:400;color:rgba(255,255,255,0.38);line-height:1.72;margin:0;letter-spacing:-0.01em;">
            Every program, partnership, and initiative at TBI flows through these three interconnected pillars.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="(p, i) in pillars" :key="p.title" cols="12" md="4">
          <v-card color="transparent" rounded="xl" border style="border-color:rgba(255,255,255,0.07);height:100%;" class="pa-2">
            <v-card-text class="pa-8">
              <div style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:400;color:rgba(255,255,255,0.2);letter-spacing:0.12em;margin-bottom:24px;">0{{ i + 1 }}</div>
              <v-avatar color="rgba(72,161,17,0.1)" rounded="lg" size="44" class="mb-5" style="border:1px solid rgba(72,161,17,0.2);">
                <v-icon :icon="p.icon" color="#48A111" size="20" />
              </v-avatar>
              <div style="font-family:'Instrument Serif',serif;font-size:1.375rem;color:#fff;letter-spacing:-0.018em;line-height:1.22;margin-bottom:12px;font-weight:400;">{{ p.title }}</div>
              <p style="font-family:'Inter',sans-serif;font-size:14px;font-weight:400;color:rgba(255,255,255,0.46);line-height:1.74;margin-bottom:24px;letter-spacing:-0.008em;">{{ p.desc }}</p>
              <v-btn :to="p.link" variant="text" color="#48A111" append-icon="mdi-arrow-right" style="text-transform:none;font-family:'Inter',sans-serif;font-weight:600;font-size:13px;padding:0;">{{ p.cta }}</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
const pillars = [
  {
    icon: 'mdi-flask-outline',
    title: 'Research Commercialization',
    desc: 'We assess university R&D for commercial potential, manage IP filing, negotiate licensing agreements, and connect researchers with industry partners ready to bring innovations to market.',
    cta: 'Explore technologies', link: '/technologies',
  },
  {
    icon: 'mdi-rocket-launch-outline',
    title: 'Startup Incubation',
    desc: 'From first idea to funded venture — structured cohort programs, mentorship, co-working access, seed funding linkage, and a curated network of investors and corporates.',
    cta: 'View programs', link: '/program',
  },
  {
    icon: 'mdi-earth',
    title: 'Innovation Ecosystem Building',
    desc: 'We forge the partnerships, policies, and community infrastructure that make regional innovation self-sustaining — connecting government, industry, academia, and investors.',
    cta: 'See ecosystem', link: '/ecosystem',
  },
]
</script>
