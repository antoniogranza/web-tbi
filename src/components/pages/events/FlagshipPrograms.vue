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

      <!-- 3-column grid with bullet lists — matching wireframe -->
      <v-row>
        <v-col v-for="prog in flagshipPrograms" :key="prog.name" cols="12" sm="6" md="4">
          <v-card color="#FAFAF8" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-sheet :color="prog.color" height="4" rounded="0" style="border-radius:12px 12px 0 0;" />
            <v-card-text class="pa-7">

              <!-- Icon -->
              <v-avatar :color="prog.color" variant="tonal" rounded="lg" size="48" class="mb-5">
                <v-icon :icon="prog.icon" size="22" :color="prog.color" />
              </v-avatar>

              <!-- Title -->
              <div style="font-family:'Instrument Serif',serif;font-size:1.15rem;color:#111810;margin-bottom:10px;">
                {{ prog.name }}
              </div>

              <!-- Description -->
              <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:18px;">
                {{ prog.desc }}
              </p>

              <!-- Bullet feature list -->
              <div v-for="feat in prog.features" :key="feat" class="d-flex align-center ga-3 mb-2">
                <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#48A111;flex-shrink:0;">→</span>
                <span style="font-size:13px;color:#6B7B6A;">{{ feat }}</span>
              </div>

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
    name: 'Startup Bootcamp Series',
    icon: 'mdi-school-outline', color: '#48A111',
    desc: 'Quarterly intensive training programs covering all aspects of startup development.',
    features: ['3-day intensive format', 'Expert mentors', 'Hands-on workshops', 'Pitch practice'],
  },
  {
    name: 'Technology Demo Day',
    icon: 'mdi-lightbulb-on-outline', color: '#25671E',
    desc: 'Biannual showcase of innovative technologies and startup pitches to investors.',
    features: ['Live demonstrations', 'Investor matching', 'Industry connections', 'Media coverage'],
  },
  {
    name: 'Innovation Week',
    icon: 'mdi-star-shooting-outline', color: '#48A111',
    desc: 'Annual week-long festival celebrating innovation and entrepreneurship.',
    features: ['Multiple events', 'Competitions', 'Exhibitions', 'Networking sessions'],
  },
  {
    name: 'AgriTech Expo',
    icon: 'mdi-sprout-outline', color: '#25671E',
    desc: 'Annual exhibition focused on agricultural technology innovations under TARA-ATBI.',
    features: ['Technology showcase', 'Farmer engagement', 'Product demonstrations', 'Business matching'],
  },
  {
    name: 'ICT Hackathon',
    icon: 'mdi-laptop', color: '#48A111',
    desc: 'Annual coding competition solving real-world challenges under NAVIGATU.',
    features: ['48-hour format', 'Industry challenges', 'Cash prizes', 'Incubation opportunity'],
  },
  {
    name: 'Investor Pitch Competition',
    icon: 'mdi-podium', color: '#25671E',
    desc: 'Quarterly pitch event connecting pre-qualified startups with investors.',
    features: ['Pre-qualified startups', 'Angel investors', 'Funding opportunities', 'Mentorship prizes'],
  },
]
</script>
