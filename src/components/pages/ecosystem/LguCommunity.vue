<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          C · LGUs &amp; Community Networks
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Local Governance &amp; Community
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            Local government units and community networks that ground TBI's work
            in real regional needs and provide access to communities, land, and
            local procurement channels.
          </p>
        </v-col>
      </v-row>

      <v-row class="mb-8">
        <v-col v-for="lgu in lguPartners" :key="lgu.name" cols="12" sm="6" md="3">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-card-text class="pa-6">
              <v-avatar color="#48A111" variant="tonal" rounded="lg" size="44" class="mb-4">
                <v-icon :icon="lgu.icon" size="20" color="#48A111" />
              </v-avatar>
              <div style="font-weight:700;font-size:14px;color:#111810;margin-bottom:4px;">{{ lgu.name }}</div>
              <div style="font-size:12px;color:#6B7B6A;margin-bottom:12px;">{{ lgu.type }}</div>
              <div v-for="r in lgu.roles" :key="r" class="d-flex align-center ga-2 py-1">
                <v-icon size="7" color="#48A111">mdi-circle</v-icon>
                <span style="font-size:12px;color:#6B7B6A;">{{ r }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Community stats -->
      <v-card color="#25671E" rounded="xl" elevation="0">
        <v-card-text class="pa-8">
          <v-row align="center">
            <v-col cols="12" md="4">
              <div style="font-family:'Instrument Serif',serif;font-size:1.25rem;color:#fff;margin-bottom:6px;">Community Reach</div>
              <p style="font-size:13px;color:rgba(255,255,255,0.5);margin:0;">TBI's footprint across Caraga region</p>
            </v-col>
            <v-col cols="12" md="8">
              <v-row dense>
                <v-col v-for="stat in communityStats" :key="stat.label" cols="6" sm="3">
                  <div style="font-family:'Instrument Serif',serif;font-size:2rem;color:#fff;letter-spacing:-0.04em;line-height:1;margin-bottom:4px;">{{ stat.val }}</div>
                  <div style="font-size:11px;color:rgba(255,255,255,0.5);">{{ stat.label }}</div>
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
const lguPartners = [
  {
    name: 'City of Butuan', type: 'Highly Urbanized City', icon: 'mdi-city-variant-outline',
    roles: ['Host city for TBI HQ', 'Startup-friendly ordinances', 'Business permit facilitation', 'Local procurement access'],
  },
  {
    name: 'Province of Agusan del Norte', type: 'Provincial Government', icon: 'mdi-map-outline',
    roles: ['AgriTech pilot sites', 'Barangay innovation programs', 'LGU co-funding for TARA', 'Farmer cooperative linkages'],
  },
  {
    name: 'Province of Surigao del Norte', type: 'Provincial Government', icon: 'mdi-map-outline',
    roles: ['Aquaculture pilot areas', 'Coastal innovation sites', 'Tourism-tech collaboration', 'MSME co-incubation'],
  },
  {
    name: 'Caraga Regional Dev. Council', type: 'Regional Body', icon: 'mdi-account-group-outline',
    roles: ['Regional priority alignment', 'Investment promotion', 'Policy advocacy support', 'Multi-province coordination'],
  },
]

const communityStats = [
  { val: '5',    label: 'Provinces reached' },
  { val: '12',   label: 'LGU partnerships'  },
  { val: '38',   label: 'Barangays engaged' },
  { val: '320+', label: 'MSMEs supported'   },
]
</script>