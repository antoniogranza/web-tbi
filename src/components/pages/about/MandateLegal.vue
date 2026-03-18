<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          A · Mandate &amp; Legal Basis
        </span>
      </div>
      <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;margin-bottom:48px;">
        Why TBI Exists
      </div>

      <v-row>
        <v-col cols="12" md="5">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-card-text class="pa-8">
              <v-icon color="#25671E" size="28" class="mb-4">mdi-bank-outline</v-icon>
              <div style="font-family:'Instrument Serif',serif;font-size:1.25rem;color:#111810;margin-bottom:14px;">
                Institutional Mandate
              </div>
              <p style="font-size:14px;color:#6B7B6A;line-height:1.76;margin-bottom:20px;">
                Established in alignment with <strong style="color:#111810;">RA 10055</strong>
                (Philippine Technology Transfer Act), TBI is the university's primary
                mechanism for commercializing publicly-funded R&amp;D. We bridge the
                gap between academic discovery and market reality.
              </p>
              <p style="font-size:14px;color:#6B7B6A;line-height:1.76;margin:0;">
                TBI supports the <strong style="color:#111810;">National Innovation Agenda
                and Strategy Document (NIASD)</strong>, contributing to inclusive growth
                through technology-based enterprise development, IP management, and
                regional innovation capacity-building.
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" offset-md="1">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6B7B6A;margin-bottom:20px;">
            Aligned With
          </div>
          <v-card
            v-for="partner in mandatePartners"
            :key="partner.name"
            color="white" rounded="xl" elevation="0" border class="mb-3"
            style="border-color:#E8E0D8;"
          >
            <v-card-text class="pa-5">
              <v-row align="center" no-gutters>
                <v-col cols="auto">
                  <v-avatar :color="partner.color" variant="tonal" rounded="lg" size="44" class="mr-4">
                    <v-icon :icon="partner.icon" size="20" :color="partner.color" />
                  </v-avatar>
                </v-col>
                <v-col>
                  <div style="font-weight:600;font-size:14px;color:#111810;">{{ partner.name }}</div>
                  <div style="font-size:12px;color:#6B7B6A;margin-top:2px;">{{ partner.role }}</div>
                </v-col>
                <v-col cols="auto">
                  <v-chip :color="partner.color" variant="tonal" size="x-small"
                    style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;">
                    {{ partner.tag }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
const mandatePartners = [
  {
    name: 'Department of Science and Technology',
    role: 'Primary accrediting and funding body for TBI programs',
    tag: 'Accreditor', icon: 'mdi-domain', color: '#25671E',
  },
  {
    name: 'DOST-PCIEERD',
    role: 'Philippine Council for Industry, Energy & Emerging Technology Research — primary program funder',
    tag: 'Funder', icon: 'mdi-lightning-bolt-outline', color: '#48A111',
  },
  {
    name: 'DOST-PCAARRD',
    role: 'Philippine Council for Agriculture, Aquatic & Natural Resources Research — TARA program partner',
    tag: 'Partner', icon: 'mdi-sprout-outline', color: '#e09000',
  },
  {
    name: 'Caraga State University',
    role: 'Host institution providing mandate, facilities, and institutional support',
    tag: 'Host', icon: 'mdi-school-outline', color: '#25671E',
  },
]
</script>
