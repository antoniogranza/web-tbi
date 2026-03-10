<script setup>
import AboutHero from '../../components/pages/about/AboutHero.vue'
import MandateLegal from '../../components/pages/about/MandateLegal.vue'
import VisionMission from '../../components/pages/about/VisionMission.vue'
import OrgStructure from '../../components/pages/about/OrgStructure.vue'
import GovernancePolicies from '../../components/pages/about/GovernancePolicies.vue'
import FacilitiesResources from '../../components/pages/about/FacilitiesResources.vue'
import CtaBand from '../../components/pages/common/CtaBand.vue'

const cta = {
  eyebrow: 'Work With TBI · Get In Touch',
  headline: 'Ready to Work<br /><em style="font-style:italic;color:#F2B50B;">With TBI?</em>',
  body: 'Apply for incubation, submit a technology, or reach out<br />to explore partnership opportunities.',
  buttons: [
    { label: 'Apply Now', to: '/apply', primary: true },
    { label: 'Partner With Us', to: '/ecosystem', primary: false },
    { label: 'Contact Us', to: '/contact', primary: false, ghost: true },
  ],
}
</script>

<template>
  <v-main style="background: #f7f0f0">
    <AboutHero />
    <MandateLegal />
    <VisionMission />
    <OrgStructure />
    <GovernancePolicies />
    <FacilitiesResources />
    <CtaBand v-bind="cta" />
  </v-main>
</template>
