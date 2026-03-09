<template>
  <v-sheet color="#25671E">
    <v-container fluid class="pa-10 pa-md-16 text-center">

      <div class="d-flex align-center justify-center ga-2 mb-6">
        <v-icon color="#F2B50B" size="10">mdi-circle</v-icon>
        <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.5);">
          {{ eyebrow }}
        </span>
      </div>

      <div
        style="font-family:'Instrument Serif',serif;font-size:clamp(2.4rem,5vw,4rem);color:#fff;letter-spacing:-0.032em;line-height:1.07;margin-bottom:18px;font-weight:400;"
        v-html="headline"
      />

      <p
        style="font-family:'Inter',sans-serif;font-size:16px;font-weight:400;color:rgba(255,255,255,0.52);line-height:1.72;margin-bottom:44px;letter-spacing:-0.01em;"
        v-html="body"
      />

      <div class="d-flex justify-center flex-wrap ga-3 mb-10">
        <v-btn
          v-for="btn in buttons"
          :key="btn.label"
          :to="btn.to"
          :color="btn.primary ? '#F2B50B' : undefined"
          :variant="btn.primary ? 'flat' : btn.ghost ? 'text' : 'outlined'"
          rounded="lg"
          size="large"
          :append-icon="btn.primary ? 'mdi-arrow-right' : undefined"
          :style="`text-transform:none;font-family:'Inter',sans-serif;font-weight:${btn.primary ? 700 : 500};font-size:14px;${btn.primary ? 'color:#111810;' : btn.ghost ? 'color:rgba(255,255,255,0.45);' : 'border-color:rgba(255,255,255,0.3);color:#fff;'}`"
        >
          {{ btn.label }}
        </v-btn>
      </div>

      <div class="d-flex justify-center flex-wrap align-center ga-2">
        <template v-for="(l, i) in partners" :key="l">
          <span style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.28);">{{ l }}</span>
          <v-icon v-if="i < partners.length - 1" size="4" color="rgba(255,255,255,0.18)">mdi-circle</v-icon>
        </template>
      </div>

    </v-container>
  </v-sheet>
</template>

<script setup>
const props = defineProps({
  eyebrow: {
    type: String,
    default: 'Applications Now Open · Spring 2025',
  },
  headline: {
    type: String,
    default: 'Ready to Build<br /><em style="font-style:italic;color:#F2B50B;">What\'s Next?</em>',
  },
  body: {
    type: String,
    default: 'Submit your idea, technology, or startup today.<br />Our team will guide you to the right track.',
  },
  buttons: {
    type: Array,
    default: () => [
      { label: 'Apply for Incubation', to: '/apply',        primary: true              },
      { label: 'Submit a Technology',  to: '/technologies', primary: false             },
      { label: 'Partner With Us',      to: '/ecosystem',    primary: false, ghost: true },
    ],
  },
  partners: {
    type: Array,
    default: () => ['DOST', 'PCIEERD', 'PCAARRD', 'CSU', 'DTI', 'DICT'],
  },
})
</script>