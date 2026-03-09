<template>
  <v-sheet id="capacity" color="white" border>
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          D · Capacity Building &amp; Events
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Learning Beyond the Program
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            Bootcamps, pitch competitions, hackathons, and industry matching events
            that build skills, networks, and visibility for all innovators.
          </p>
        </v-col>
      </v-row>

      <!-- 4 Event Types -->
      <v-row class="mb-10">
        <v-col v-for="event in capEvents" :key="event.title" cols="12" sm="6" md="3">
          <v-card color="#F7F0F0" rounded="xl" elevation="0" style="height:100%;cursor:pointer;" hover>
            <v-sheet :color="event.color" height="3" rounded="0" style="border-radius:12px 12px 0 0;" />
            <v-card-text class="pa-7">
              <v-avatar :color="event.color" variant="tonal" rounded="xl" size="52" class="mb-5">
                <v-icon :icon="event.icon" size="24" :color="event.color" />
              </v-avatar>
              <div style="font-family:'Instrument Serif',serif;font-size:1.2rem;color:#111810;margin-bottom:8px;">{{ event.title }}</div>
              <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:16px;">{{ event.desc }}</p>
              <v-chip :color="event.color" variant="tonal" size="x-small"
                style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                {{ event.freq }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Upcoming Events -->
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#6B7B6A;margin-bottom:20px;">
        Upcoming Events
      </div>
      <v-row>
        <v-col v-for="evt in upcomingEvents" :key="evt.title" cols="12" md="4">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;" hover>
            <v-card-text class="pa-0">
              <div class="d-flex">
                <v-sheet
                  :color="evt.color" rounded="0"
                  style="border-radius:12px 0 0 0;min-width:72px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px 12px;"
                >
                  <div style="font-family:'Instrument Serif',serif;font-size:2rem;color:#fff;line-height:1;">{{ evt.day }}</div>
                  <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-top:4px;">{{ evt.month }}</div>
                </v-sheet>
                <div class="pa-5" style="flex:1;">
                  <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:6px;" :style="`color:${evt.color}`">{{ evt.type }}</div>
                  <div style="font-weight:700;font-size:14px;color:#111810;margin-bottom:4px;">{{ evt.title }}</div>
                  <div class="d-flex align-center ga-1">
                    <v-icon size="11" color="#6B7B6A">mdi-map-marker-outline</v-icon>
                    <span style="font-size:12px;color:#6B7B6A;">{{ evt.venue }}</span>
                  </div>
                </div>
              </div>
              <v-divider />
              <div class="pa-5 d-flex align-center justify-space-between">
                <v-chip :color="evt.color" variant="tonal" size="x-small" style="font-size:10px;">{{ evt.audience }}</v-chip>
                <v-btn variant="text" :color="evt.color" size="small" append-icon="mdi-arrow-right" style="text-transform:none;font-weight:600;">Register</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
const capEvents = [
  {
    icon: 'mdi-lightning-bolt-outline', color: '#25671E',
    title: 'Startup Bootcamps',
    desc: 'Intensive 3-day programs covering product, fundraising, legal basics, and go-to-market strategy.',
    freq: 'Quarterly',
  },
  {
    icon: 'mdi-trophy-outline', color: '#48A111',
    title: 'Pitch Competitions',
    desc: 'Regional startup pitch events with cash prizes, investor exposure, and media coverage.',
    freq: 'Bi-Annual',
  },
  {
    icon: 'mdi-code-braces', color: '#e09000',
    title: 'Hackathons',
    desc: '48-hour build challenges producing working prototypes that address real regional problems.',
    freq: 'Annual',
  },
  {
    icon: 'mdi-handshake-outline', color: '#25671E',
    title: 'Industry Matching',
    desc: 'Curated matchmaking sessions connecting startups with corporates, LGUs, and procurement officers.',
    freq: 'Quarterly',
  },
]

const upcomingEvents = [
  {
    day: '14', month: 'Jul', color: '#25671E',
    type: 'Bootcamp',
    title: 'Startup Commercialization Bootcamp',
    venue: 'TBI Main Hub, CSU',
    audience: 'All Incubatees',
  },
  {
    day: '22', month: 'Jul', color: '#48A111',
    type: 'Pitch Competition',
    title: 'Regional Startup Pitchfest 2025',
    venue: 'Butuan City Convention Center',
    audience: 'Open to All',
  },
  {
    day: '09', month: 'Aug', color: '#e09000',
    type: 'Hackathon',
    title: 'NAVIGATU ICT Hackathon 2025',
    venue: 'CSU ICT Building',
    audience: 'Tech Founders & Students',
  },
]
</script>