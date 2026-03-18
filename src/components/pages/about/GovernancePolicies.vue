<template>
  <v-sheet color="white" border>
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          D · Governance &amp; Policies
        </span>
      </div>
      <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;margin-bottom:12px;">
        Operating with Integrity
      </div>
      <p style="font-size:15px;color:#6B7B6A;max-width:560px;line-height:1.7;margin-bottom:48px;">
        Transparent governance frameworks that ensure fair, accountable, and
        principled operations across all TBI programs.
      </p>

      <v-row>
        <v-col v-for="policy in policies" :key="policy.title" cols="12" md="6">
          <v-card color="white" rounded="xl" elevation="0" border class="mb-4" style="border-color:#E8E0D8;">
            <v-card-text class="pa-6">
              <v-row align="start" no-gutters>
                <v-col cols="auto">
                  <v-avatar :color="policy.color" variant="tonal" rounded="lg" size="48" class="mr-5" style="flex-shrink:0;">
                    <v-icon :icon="policy.icon" :color="policy.color" size="22" />
                  </v-avatar>
                </v-col>
                <v-col>
                  <div style="font-weight:700;font-size:15px;color:#111810;margin-bottom:4px;">{{ policy.title }}</div>
                  <div style="font-size:13px;color:#6B7B6A;line-height:1.6;margin-bottom:14px;">{{ policy.desc }}</div>
                  <div class="d-flex flex-wrap ga-2">
                    <v-chip v-for="tag in policy.tags" :key="tag" :color="policy.color" variant="tonal" size="x-small"
                      style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.06em;">
                      {{ tag }}
                    </v-chip>
                  </div>
                </v-col>
                <v-col cols="auto" class="ml-4">
                  <v-btn icon variant="text" size="small" color="#6B7B6A">
                    <v-icon size="18">mdi-download-outline</v-icon>
                    <v-tooltip activator="parent" location="top">Download PDF</v-tooltip>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-alert color="#25671E" variant="tonal" rounded="xl" border="start" class="mt-4" icon="mdi-shield-check-outline">
        <div style="font-size:14px;color:#25671E;line-height:1.65;">
          All TBI policies are reviewed annually by the Governing Board and aligned
          with DOST, CHED, and university regulations. For policy inquiries, contact
          <strong>tbi@csu.edu.ph</strong>
        </div>
      </v-alert>

    </v-container>
  </v-sheet>
</template>

<script setup>
const policies = [
  {
    icon: 'mdi-shield-lock-outline', color: '#25671E',
    title: 'Intellectual Property Policy',
    desc: 'Governs ownership, disclosure, protection, and commercialization of IP generated through TBI-supported programs.',
    tags: ['IP Ownership', 'Disclosure', 'Licensing', 'Revenue Sharing'],
  },
  {
    icon: 'mdi-scale-balance', color: '#48A111',
    title: 'Conflict of Interest Policy',
    desc: 'Ensures that all evaluation, selection, and governance decisions are made impartially and free from personal interest.',
    tags: ['Impartiality', 'Disclosure', 'Ethics', 'Recusal'],
  },
  {
    icon: 'mdi-clipboard-check-outline', color: '#e09000',
    title: 'Selection Criteria',
    desc: 'Transparent, merit-based framework for evaluating and accepting applicants into TBI incubation programs.',
    tags: ['Technology Readiness', 'Team Capability', 'Market Potential', 'Impact'],
  },
  {
    icon: 'mdi-school-outline', color: '#25671E',
    title: 'Graduation Criteria',
    desc: 'Defines the milestones, metrics, and standards that incubatees must meet to successfully complete the program.',
    tags: ['Revenue Threshold', 'IP Status', 'Market Traction', 'Sustainability'],
  },
]
</script>
