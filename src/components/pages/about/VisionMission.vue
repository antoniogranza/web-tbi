<template>
  <v-sheet color="white" border>
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          B · Vision, Mission &amp; Objectives
        </span>
      </div>
      <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;margin-bottom:48px;">
        Our Purpose &amp; Direction
      </div>

      <v-row class="mb-8">
        <v-col cols="12" md="6">
          <v-card color="#25671E" rounded="xl" elevation="0" style="height:100%;">
            <v-card-text class="pa-8">
              <v-chip color="rgba(255,255,255,0.15)" variant="flat" size="small" class="mb-5"
                style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.7);">
                Vision
              </v-chip>
              <div style="font-family:'Instrument Serif',serif;font-style:italic;font-size:1.5rem;color:#fff;line-height:1.5;margin-bottom:0;">
                A globally competitive regional innovation hub that transforms knowledge into prosperity.
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card color="#FAFAF8" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-card-text class="pa-8">
              <v-chip color="#48A111" variant="tonal" size="small" class="mb-5"
                style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;">
                Mission
              </v-chip>
              <p style="font-size:15px;color:#6B7B6A;line-height:1.74;margin:0;">
                To incubate technology-based enterprises, commercialize university research,
                and build a thriving innovation ecosystem that drives inclusive regional
                development through partnerships, capacity-building, and sustainable venture creation.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6B7B6A;margin-bottom:20px;">
        Core Objectives
      </div>
      <v-row dense>
        <v-col v-for="(obj, i) in objectives" :key="obj.title" cols="12" sm="6" md="3">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-card-text class="pa-6">
              <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#C8C0B8;letter-spacing:0.1em;margin-bottom:16px;">
                0{{ i + 1 }}
              </div>
              <v-avatar color="#25671E" variant="tonal" rounded="lg" size="40" class="mb-4">
                <v-icon :icon="obj.icon" color="#25671E" size="18" />
              </v-avatar>
              <div style="font-weight:700;font-size:14px;color:#111810;margin-bottom:6px;">{{ obj.title }}</div>
              <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin:0;">{{ obj.desc }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
const objectives = [
  {
    icon: 'mdi-flask-outline',
    title: 'Commercialize Research',
    desc: 'Convert university R&D outputs into licensable technologies and viable enterprises.',
  },
  {
    icon: 'mdi-rocket-launch-outline',
    title: 'Incubate Startups',
    desc: 'Provide structured support to technology-based ventures from ideation through scale.',
  },
  {
    icon: 'mdi-shield-outline',
    title: 'Protect IP',
    desc: 'Assist researchers in filing, managing, and licensing intellectual property.',
  },
  {
    icon: 'mdi-earth',
    title: 'Build Ecosystem',
    desc: 'Connect innovators with government, industry, investors, and community networks.',
  },
]
</script>
