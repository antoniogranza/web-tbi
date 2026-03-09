<template>
  <v-sheet color="white" border>
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          B · Flagship Programs
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Institutional Innovation Programs
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            Recurring programs designed to strengthen entrepreneurship capacity and support the regional startup ecosystem.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="prog in flagshipPrograms" :key="prog.name" cols="12" md="6">
          <v-card color="#FAFAF8" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-card-text class="pa-7">
              <v-avatar :color="prog.color" variant="tonal" rounded="lg" size="44" class="mb-4">
                <v-icon :icon="prog.icon" size="20" :color="prog.color" />
              </v-avatar>
              <div style="font-weight:700;font-size:16px;color:#111810;margin-bottom:6px;">{{ prog.name }}</div>
              <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin:0;">{{ prog.desc }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
const flagshipPrograms = [
  {
    name: 'Startup Bootcamp Series', icon: 'mdi-school-outline', color: '#48A111',
    desc: 'An intensive training program for early-stage startup teams focused on entrepreneurial capability development, business model design, and market validation.',
  },
  {
    name: 'Technology Demo Day', icon: 'mdi-lightbulb-outline', color: '#25671E',
    desc: 'A showcase platform for incubated startups and university innovators to present technologies to industry partners, investors, and government agencies.',
  },
  {
    name: 'AgriTech Expo (TARA)', icon: 'mdi-sprout-outline', color: '#48A111',
    desc: 'An agricultural technology showcase organized under the TARA Agri-Aqua Technology Business Incubator connecting innovators with farmers and agribusiness stakeholders.',
  },
  {
    name: 'ICT Hackathon (NAVIGATU)', icon: 'mdi-laptop', color: '#25671E',
    desc: 'A technology innovation competition focused on ICT and engineering solutions addressing regional challenges and industry needs.',
  },
]
</script>