<template>
  <v-main style="background:#F7F0F0;">
    <NewsHero />
    <NewsGrid />
    <CtaBand v-bind="cta" />
  </v-main>
</template>

<script setup>
import NewsHero from '../../components/pages/news/NewsHero.vue'
import NewsGrid from '../../components/pages/news/NewsGrid.vue'
import CtaBand  from '../../components/pages/common/CtaBand.vue'

const cta = {
  eyebrow: 'Stay Connected · Follow TBI Updates',
  headline: 'Want to Stay<br /><em style="font-style:italic;color:#F2B50B;">in the Loop?</em>',
  body: 'Follow CSU TBI\'s programs, startup milestones, and innovation news.<br />Or apply to be part of the story.',
  buttons: [
    { label: 'Apply for Incubation', to: '/apply',  primary: true              },
    { label: 'View Events',          to: '/events', primary: false             },
    { label: 'About TBI',            to: '/about',  primary: false, ghost: true },
  ],
}
</script>