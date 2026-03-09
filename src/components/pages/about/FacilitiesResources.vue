<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          E · Facilities &amp; Resources
        </span>
      </div>
      <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;margin-bottom:12px;">
        Infrastructure for Innovation
      </div>
      <p style="font-size:15px;color:#6B7B6A;max-width:560px;line-height:1.7;margin-bottom:48px;">
        Purpose-built spaces and shared equipment designed to take a startup
        from concept to commercial prototype.
      </p>

      <v-row>
        <v-col v-for="facility in facilities" :key="facility.title" cols="12" sm="6" md="3">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-card-text class="pa-7">
              <v-avatar color="#25671E" variant="tonal" rounded="lg" size="52" class="mb-5">
                <v-icon :icon="facility.icon" color="#25671E" size="24" />
              </v-avatar>
              <div style="font-family:'Instrument Serif',serif;font-size:1.125rem;color:#111810;margin-bottom:8px;">
                {{ facility.title }}
              </div>
              <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:16px;">{{ facility.desc }}</p>
              <v-divider class="mb-3" />
              <div v-for="detail in facility.details" :key="detail" class="d-flex align-center ga-2 py-1">
                <v-icon size="7" color="#48A111">mdi-circle</v-icon>
                <span style="font-size:12px;color:#6B7B6A;">{{ detail }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Capacity bar -->
      <v-card color="#111810" rounded="xl" elevation="0" class="mt-8">
        <v-card-text class="pa-8">
          <v-row align="center">
            <v-col cols="12" md="4">
              <div style="font-family:'Instrument Serif',serif;font-size:1.25rem;color:#fff;margin-bottom:6px;">
                Current Capacity
              </div>
              <p style="font-size:13px;color:rgba(255,255,255,0.45);margin:0;">
                Available slots for the Spring 2025 cohort
              </p>
            </v-col>
            <v-col cols="12" md="8">
              <v-row dense>
                <v-col v-for="cap in capacityStats" :key="cap.label" cols="6" sm="3">
                  <div style="margin-bottom:8px;">
                    <div style="font-family:'Instrument Serif',serif;font-size:1.75rem;color:#fff;letter-spacing:-0.04em;line-height:1;">
                      {{ cap.val }}
                    </div>
                    <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:4px;">{{ cap.label }}</div>
                  </div>
                  <v-progress-linear :model-value="cap.pct" color="#48A111" bg-color="rgba(255,255,255,0.08)" height="3" rounded />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

    </v-container>
  </v-sheet>
</template>

<script setup>
const facilities = [
  {
    icon: 'mdi-desk', title: 'Co-working Spaces',
    desc: 'Open and dedicated workstations designed for focused productivity and team collaboration.',
    details: ['Open hot-desking area', 'Private team bays', 'High-speed internet', 'Printing & peripherals'],
  },
  {
    icon: 'mdi-wrench-outline', title: 'Prototyping Labs',
    desc: 'Equipped fabrication spaces for building and testing hardware, electronics, and physical product prototypes.',
    details: ['3D printing & fabrication', 'Electronics workbench', 'PCB assembly tools', 'Mechanical testing equipment'],
  },
  {
    icon: 'mdi-presentation', title: 'Meeting Rooms',
    desc: 'Professional presentation and collaboration suites for client meetings, investor pitches, and workshops.',
    details: ['Boardroom (12-seat)', 'Focus rooms (4-seat)', 'Video conferencing setup', 'Projector & display screens'],
  },
  {
    icon: 'mdi-microscope', title: 'Equipment Access',
    desc: 'Shared access to specialized research and development equipment through university and partner facilities.',
    details: ['Analytical instruments', 'Lab equipment (via CSU)', 'IoT development kits', 'Software licenses & cloud credits'],
  },
]

const capacityStats = [
  { val: '40', label: 'Co-working desks',   pct: 72 },
  { val: '12', label: 'Startup slots open', pct: 55 },
  { val: '3',  label: 'Meeting rooms',      pct: 40 },
  { val: '8',  label: 'Lab stations',       pct: 60 },
]
</script>
