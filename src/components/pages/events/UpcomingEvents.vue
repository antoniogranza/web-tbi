<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          A · Upcoming Events
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Next Programs in the Innovation Calendar
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            The TBI calendar includes recruitment activities, startup training programs, technology
            showcases, and collaboration forums that support the incubation pipeline.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="event in upcomingEvents" :key="event.title" cols="12" md="4">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;" hover>
            <v-card-text class="pa-7">
              <v-chip :color="event.color" variant="tonal" size="x-small" class="mb-4"
                style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                {{ event.category }}
              </v-chip>
              <div style="font-weight:700;font-size:16px;color:#111810;margin-bottom:6px;">{{ event.title }}</div>
              <div style="font-size:12px;color:#6B7B6A;margin-bottom:10px;">{{ event.date }} · {{ event.venue }}</div>
              <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:16px;">{{ event.desc }}</p>
              <v-btn :color="event.color" variant="tonal" rounded="lg" size="small"
                append-icon="mdi-arrow-right" style="text-transform:none;font-weight:600;">
                Register
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
const upcomingEvents = [
  {
    title: 'Incubation Intake Orientation',
    date: 'July 2026', venue: 'CSU Innovation Hub',
    category: 'Orientation', color: '#48A111',
    desc: 'Orientation for innovators interested in joining the CSU Technology Business Incubator. Participants will learn about incubation stages, eligibility requirements, and available support programs.',
  },
  {
    title: 'Startup Bootcamp Series',
    date: 'August 2026', venue: 'CSU Mechatronics Building',
    category: 'Training', color: '#25671E',
    desc: 'Multi-day startup training program covering market validation, business modeling, and startup readiness for incubation.',
  },
  {
    title: 'Technology Demo Day',
    date: 'September 2026', venue: 'CSU Innovation Center',
    category: 'Showcase', color: '#48A111',
    desc: 'Incubated startups and CSU research teams present prototypes and technologies to potential partners, investors, and government stakeholders.',
  },
]
</script>