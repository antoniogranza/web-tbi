<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          C · Event Archive
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Programs and Activities
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            Past events demonstrate CSU-TBI's ongoing engagement with innovators, researchers, MSMEs,
            and industry partners.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="event in pastEvents" :key="event.title" cols="12" md="4">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-card-text class="pa-7">
              <div style="font-weight:700;font-size:15px;color:#111810;margin-bottom:6px;">{{ event.title }}</div>
              <div style="font-size:12px;color:#6B7B6A;margin-bottom:12px;">{{ event.date }}</div>
              <p style="font-size:13px;color:#6B7B6A;line-height:1.6;margin-bottom:10px;">{{ event.desc }}</p>
              <v-chip color="#48A111" variant="tonal" size="x-small"
                style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                {{ event.outcome }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
const pastEvents = [
  {
    title: 'NAVIGATU Startup Bootcamp 2024',
    date: 'August 2024',
    desc: 'Bootcamp training program for startup founders preparing for incubation under the NAVIGATU Technology Business Incubator.',
    outcome: '12 startups shortlisted',
  },
  {
    title: 'TARA AgriTech Innovation Forum',
    date: 'October 2024',
    desc: 'Technology showcase and discussion platform connecting CSU researchers with farmers and agribusiness stakeholders.',
    outcome: 'Technology adoption dialogues',
  },
  {
    title: 'CSU Innovation Week',
    date: 'November 2024',
    desc: 'Multi-day event featuring startup competitions, technology exhibits, and innovation forums.',
    outcome: 'Regional innovation showcase',
  },
]
</script>