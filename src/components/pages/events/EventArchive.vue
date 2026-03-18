<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          C · Past Events Archive
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Programs &amp; Activities
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            Past events demonstrate CSU-TBI's ongoing engagement with innovators, researchers, MSMEs,
            and industry partners across Caraga Region.
          </p>
        </v-col>
      </v-row>

      <!-- 3-col grid, 6 cards with photo placeholder + highlight button -->
      <v-row>
        <v-col v-for="event in pastEvents" :key="event.title" cols="12" sm="6" md="4">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;" hover>
            <v-card-text class="pa-0">

              <!-- Photo placeholder — 16:9 aspect -->
              <v-sheet
                color="#F0EAE0"
                rounded="0"
                style="border-radius:12px 12px 0 0;aspect-ratio:16/9;width:100%;"
                class="d-flex align-center justify-center"
              >
                <div class="text-center">
                  <v-icon icon="mdi-image-outline" size="28" color="#C8C0B8" class="mb-1" />
                  <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:#C8C0B8;">
                    Event Photo
                  </div>
                </div>
              </v-sheet>

              <div class="pa-6">
                <!-- Title -->
                <div style="font-family:'Instrument Serif',serif;font-size:1.1rem;color:#111810;margin-bottom:6px;">
                  {{ event.title }}
                </div>

                <!-- Meta line -->
                <p style="font-size:12px;color:#9eaa9c;font-family:'JetBrains Mono',monospace;letter-spacing:0.04em;margin-bottom:16px;">
                  {{ event.meta }}
                </p>

                <!-- Outcome chips -->
                <div class="d-flex flex-wrap ga-2 mb-5">
                  <v-chip v-for="chip in event.chips" :key="chip"
                    color="#48A111" variant="tonal" size="x-small"
                    style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.06em;text-transform:uppercase;">
                    {{ chip }}
                  </v-chip>
                </div>

                <!-- View Highlights button -->
                <v-btn
                  color="#111810"
                  variant="tonal"
                  rounded="lg"
                  size="small"
                  block
                  append-icon="mdi-arrow-right"
                  style="text-transform:none;font-family:'Inter',sans-serif;font-weight:600;font-size:13px;"
                >
                  View Highlights
                </v-btn>
              </div>

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
    title: 'Innovation Week 2025',
    meta: 'May 2025  ·  450 participants  ·  12 startups showcased',
    chips: ['Flagship Event', '12 Startups'],
  },
  {
    title: 'AgriTech Summit 2025',
    meta: 'March 2025  ·  320 participants  ·  8 technology demos',
    chips: ['TARA-ATBI', '8 Tech Demos'],
  },
  {
    title: 'Tech Pitch Night Q4 2024',
    meta: 'November 2024  ·  120 participants  ·  ₱2M funding awarded',
    chips: ['Pitch Competition', '₱2M Awarded'],
  },
  {
    title: 'ICT Hackathon 2024',
    meta: 'September 2024  ·  85 participants  ·  18 teams competed',
    chips: ['NAVIGATU', '18 Teams'],
  },
  {
    title: 'Startup Bootcamp Summer 2024',
    meta: 'July 2024  ·  45 participants  ·  3-day intensive program',
    chips: ['Bootcamp', '45 Participants'],
  },
  {
    title: 'Technology Transfer Forum 2024',
    meta: 'June 2024  ·  150 participants  ·  6 technologies showcased',
    chips: ['Tech Transfer', '6 Technologies'],
  },
]
</script>
