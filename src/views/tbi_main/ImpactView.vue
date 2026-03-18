<script setup>
import ImpactHero     from '../../components/pages/impact/ImpactHero.vue'
import StartupMetrics from '../../components/pages/impact/StartupMetrics.vue'
import IpMetrics      from '../../components/pages/impact/IpMetrics.vue'
import EconomicImpact from '../../components/pages/impact/EconomicImpact.vue'
import AnnualReports  from '../../components/pages/impact/AnnualReports.vue'
import CtaBand        from '../../components/pages/common/CtaBand.vue'

const cta = {
  eyebrow: 'Proven Track Record · Join the Next Cohort',
  headline: 'Proven Track Record.<br /><em style="font-style:italic;color:#F2B50B;">Be Part of What\'s Next.</em>',
  body: 'From Platinum IP recognition to regional MSME support —<br />TBI\'s impact is growing. Apply to join the next cohort.',
  buttons: [
    { label: 'Apply for Incubation', to: '/apply', primary: true  },
    { label: 'About TBI',            to: '/about', primary: false },
  ],
}
</script>

<template>
  <v-main style="background:#F7F0F0;">
    <ImpactHero />
    <StartupMetrics />
    <IpMetrics />
    <EconomicImpact />
    <AnnualReports />
    <CtaBand v-bind="cta" />
  </v-main>
</template>

