<script setup>
import HeroCarousel from '../../components/pages/home/HeroCarousel.vue'
import WhatWeDo from '../../components/pages/home/WhatWeDo.vue'
import Programs from '../../components/pages/home/Programs.vue'
import ImpactSnapshot from '../../components/pages/home/ImpactSnapshot.vue'
import Spotlight from '../../components/pages/home/Spotlight.vue'
import CtaBand from '../../components/pages/common/CtaBand.vue'
const cta = {
  eyebrow: 'Applications Now Open · Spring 2025',
  headline: 'Ready to Build<br /><em style="font-style:italic;color:#F2B50B;">What\'s Next?</em>',
  body: 'Submit your idea, technology, or startup today.<br />Our team will guide you to the right track.',
  buttons: [
    { label: 'Apply for Incubation', to: '/apply',        primary: true              },
    { label: 'Submit a Technology',  to: '/technologies', primary: false             },
    { label: 'Partner With Us',      to: '/ecosystem',    primary: false, ghost: true },
  ],
}
</script>

<template>
  <v-main style="background:#F7F0F0;">
    <HeroCarousel />
    <WhatWeDo />
    <Programs />
    <ImpactSnapshot />
    <Spotlight />
    <CtaBand v-bind="cta" />
  </v-main>
</template>

