<script setup>
import EventsHero      from '../../components/pages/events/EventsHero.vue'
import UpcomingEvents  from '../../components/pages/events/UpcomingEvents.vue'
import FlagshipPrograms from '../../components/pages/events/FlagshipPrograms.vue'
import EventArchive    from '../../components/pages/events/EventArchive.vue'
import CtaBand         from '../../components/pages/common/CtaBand.vue'

const cta = {
  eyebrow: 'Join the Next Program · Register Now',
  headline: 'Ready to Join<br /><em style="font-style:italic;color:#F2B50B;">the Pipeline?</em>',
  body: 'Attend an orientation, join a bootcamp, or apply for incubation.<br />The next cohort is open.',
  buttons: [
    { label: 'Apply for Incubation', to: '/apply',  primary: true  },
    { label: 'View Programs',        to: '/programs', primary: false },
  ],
}
</script>

<template>
  <v-main style="background:#F7F0F0;">
    <EventsHero />
    <UpcomingEvents />
    <FlagshipPrograms />
    <EventArchive />
    <CtaBand v-bind="cta" />
  </v-main>
</template>

