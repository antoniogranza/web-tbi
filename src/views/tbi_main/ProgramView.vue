<script setup>
import ProgramsHero           from '../../components/pages/programs/ProgramsHero.vue'
import InstitutionalIncubation from '../../components/pages/programs/InstitutionalIncubation.vue'
import RegionalIncubation     from '../../components/pages/programs/RegionalIncubation.vue'
import SpinOffTrack           from '../../components/pages/programs/SpinOffTrack.vue'
import CapacityBuilding       from '../../components/pages/programs/CapacityBuilding.vue'
import CtaBand                from '../../components/pages/common/CtaBand.vue'
const cta = {
  eyebrow: 'Cohort Slots Are Limited · Apply Early',
  headline: 'Found Your Track?<br /><em style="font-style:italic;color:#F2B50B;">Apply Now.</em>',
  body: 'Each program has its own intake schedule. Submit your application<br />early — cohort slots are limited.',
  buttons: [
    { label: 'Apply for Incubation', to: '/apply', primary: true  },
    { label: 'Learn About TBI',      to: '/about', primary: false },
  ],
}
</script>

<template>
  <v-main style="background:#F7F0F0;">
    <ProgramsHero />
    <InstitutionalIncubation />
    <RegionalIncubation />
    <SpinOffTrack />
    <CapacityBuilding />
    <CtaBand v-bind="cta" />
  </v-main>
</template>

