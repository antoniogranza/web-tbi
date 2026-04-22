<template>
  <v-sheet color="#FFFFFF">
    <v-container fluid class="pa-10 pa-md-16">

      <v-row class="mb-10" align="end">
        <v-col cols="12" md="5">
          <div class="d-flex align-center ga-3 mb-3">
            <v-divider length="22" color="#48A111" thickness="2" />
            <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.18em;color:#48A111;text-transform:uppercase;">What We Do</span>
          </div>
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(2rem,3.2vw,2.9rem);color:#111810;line-height:1.1;letter-spacing:-0.028em;font-weight:400;">
            Three Pillars of<br />Innovation Impact
          </div>
        </v-col>
        <v-col cols="12" md="6" offset-md="1">
          <p style="font-family:'Inter',sans-serif;font-size:15px;font-weight:400;color:#6B7B6A;line-height:1.72;margin:0;letter-spacing:-0.01em;">
            Every program, partnership, and initiative at TBI flows through these three interconnected pillars.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="(p, i) in pillars" :key="p.title" cols="12" md="4">
          <v-card color="white" rounded="xl" border style="border-color:#E8E0D8;height:100%;" elevation="0" class="pa-2">
            <v-card-text class="pa-8">
              <div style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:400;color:#C8C0B8;letter-spacing:0.12em;margin-bottom:24px;">0{{ i + 1 }}</div>
              <v-avatar :color="p.iconBg" rounded="lg" size="44" class="mb-5">
                <v-icon :icon="p.icon" :color="p.iconColor" size="20" />
              </v-avatar>
              <div style="font-family:'Instrument Serif',serif;font-size:1.375rem;color:#111810;letter-spacing:-0.018em;line-height:1.22;margin-bottom:12px;font-weight:400;">{{ p.title }}</div>
              <p style="font-family:'Inter',sans-serif;font-size:14px;font-weight:400;color:#6B7B6A;line-height:1.74;margin-bottom:24px;letter-spacing:-0.008em;">{{ p.desc }}</p>
              <v-btn :to="p.link" variant="text" color="#25671E" append-icon="mdi-arrow-right" style="text-transform:none;font-family:'Inter',sans-serif;font-weight:600;font-size:13px;padding:0;">{{ p.cta }}</v-btn>
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
    iconColor: '#25671E',
    iconBg: '#EDF5E8',
    title: 'Research Commercialization',
    desc: 'We assess university R&D for commercial potential, manage IP filing, negotiate licensing agreements, and connect researchers with industry partners ready to bring innovations to market.',
    cta: 'Explore technologies', link: '/technologies',
  },
  {
    icon: 'mdi-rocket-launch-outline',
    iconColor: '#48A111',
    iconBg: '#EDF5E8',
    title: 'Startup Incubation',
    desc: 'From first idea to funded venture — structured cohort programs, mentorship, co-working access, seed funding linkage, and a curated network of investors and corporates.',
    cta: 'View programs', link: '/program',
  },
  {
    icon: 'mdi-earth',
    iconColor: '#C07A00',
    iconBg: '#FDF3DC',
    title: 'Innovation Ecosystem Building',
    desc: 'We forge the partnerships, policies, and community infrastructure that make regional innovation self-sustaining — connecting government, industry, academia, and investors.',
    cta: 'See ecosystem', link: '/ecosystem',
  },
]
</script>
