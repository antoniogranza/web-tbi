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
            Next Programs in the<br /><em style="font-style:italic;">Innovation Calendar</em>
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            The TBI calendar includes recruitment activities, startup training programs, technology
            showcases, and collaboration forums that support the incubation pipeline.
          </p>
        </v-col>
      </v-row>

      <!-- Horizontal list cards — image left, content right -->
      <div class="d-flex flex-column ga-5">
        <v-card
          v-for="event in upcomingEvents"
          :key="event.title"
          color="white"
          rounded="xl"
          elevation="0"
          border
          style="border-color:#E8E0D8;"
          hover
        >
          <v-card-text class="pa-0">
            <v-row no-gutters>

              <!-- Image / thumbnail -->
              <v-col cols="12" md="3">
                <v-sheet
                  :color="event.thumbBg"
                  rounded="0"
                  style="border-radius:12px 0 0 12px;height:100%;min-height:200px;"
                  class="d-flex align-center justify-center"
                >
                  <div class="text-center pa-6">
                    <v-avatar :color="event.color" variant="tonal" rounded="xl" size="56" class="mb-3">
                      <v-icon :icon="event.icon" size="26" :color="event.color" />
                    </v-avatar>
                    <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:#9eaa9c;">
                      Event Image
                    </div>
                  </div>
                </v-sheet>
              </v-col>

              <!-- Content -->
              <v-col cols="12" md="9">
                <div class="pa-8">
                  <!-- Tags row -->
                  <div class="d-flex flex-wrap align-center ga-2 mb-5">
                    <v-chip :color="event.color" variant="tonal" size="x-small"
                      style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                      {{ event.date }}
                    </v-chip>
                    <v-chip color="#F0EAE0" variant="flat" size="x-small"
                      style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;color:#6B7B6A;">
                      {{ event.venue }}
                    </v-chip>
                    <v-chip :color="event.color" variant="outlined" size="x-small"
                      style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                      {{ event.category }}
                    </v-chip>
                  </div>

                  <!-- Title -->
                  <div style="font-family:'Instrument Serif',serif;font-size:1.4rem;color:#111810;letter-spacing:-0.02em;margin-bottom:10px;">
                    {{ event.title }}
                  </div>

                  <!-- Description -->
                  <p style="font-size:13px;color:#6B7B6A;line-height:1.72;margin-bottom:18px;max-width:640px;">
                    {{ event.desc }}
                  </p>

                  <!-- Meta row -->
                  <div class="d-flex flex-wrap align-center ga-6 mb-6">
                    <div class="d-flex align-center ga-2">
                      <v-icon size="14" color="#9eaa9c">mdi-account-multiple-outline</v-icon>
                      <span style="font-size:13px;color:#6B7B6A;">
                        <span style="color:#111810;font-weight:600;">Target:</span>
                        {{ event.audience }}
                      </span>
                    </div>
                    <div class="d-flex align-center ga-2">
                      <v-icon size="14" color="#9eaa9c">mdi-ticket-outline</v-icon>
                      <span style="font-size:13px;color:#6B7B6A;">
                        <span style="color:#111810;font-weight:600;">Capacity:</span>
                        {{ event.capacity }}
                      </span>
                    </div>
                  </div>

                  <!-- CTA -->
                  <v-btn :color="event.color" variant="flat" rounded="lg" size="small"
                    append-icon="mdi-arrow-right"
                    style="text-transform:none;font-family:'Inter',sans-serif;font-weight:700;font-size:13px;">
                    Register Now
                  </v-btn>
                </div>
              </v-col>

            </v-row>
          </v-card-text>
        </v-card>
      </div>

    </v-container>
  </v-sheet>
</template>

<script setup>
const upcomingEvents = [
  {
    title: 'Startup Bootcamp: From Idea to Launch',
    date: 'Mar 15, 2026', venue: 'CSU Main Campus',
    category: 'Training', color: '#48A111', icon: 'mdi-school-outline', thumbBg: '#F0EAE0',
    audience: 'Students, Faculty, Entrepreneurs', capacity: '50 participants',
    desc: 'Three-day intensive program covering business model design, market validation, and pitch preparation. Open to all aspiring entrepreneurs.',
  },
  {
    title: 'Technology Demo Day Q1 2026',
    date: 'Apr 8, 2026', venue: 'TBI Innovation Center',
    category: 'Showcase', color: '#25671E', icon: 'mdi-lightbulb-on-outline', thumbBg: '#F0EAE0',
    audience: 'Industry Partners, Investors', capacity: '100 participants',
    desc: 'Showcase of innovative technologies developed by CSU researchers and incubated startups. Network with industry partners and potential investors.',
  },
  {
    title: 'Innovation Week 2026: Future of Technology',
    date: 'May 20–22, 2026', venue: 'Hybrid Format',
    category: 'Festival', color: '#48A111', icon: 'mdi-star-shooting-outline', thumbBg: '#F0EAE0',
    audience: 'All Stakeholders', capacity: '500+ participants',
    desc: 'Week-long celebration of innovation featuring workshops, pitch competitions, expert talks, and networking sessions across sectors.',
  },
]
</script>
