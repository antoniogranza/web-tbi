
<script setup>
import EcosystemHero      from '../../components/pages/ecosystem/EcosystemHero.vue'
import GovernmentPartners from '../../components/pages/ecosystem/GovernmentPartners.vue'
import CorporatePartners  from '../../components/pages/ecosystem/CorporatePartners.vue'
import LguCommunity       from '../../components/pages/ecosystem/LguCommunity.vue'
import InvestorsFunding   from '../../components/pages/ecosystem/InvestorsFunding.vue'
import MentorNetwork      from '../../components/pages/ecosystem/MentorNetwork.vue'
import CtaBand            from '../../components/pages/common/CtaBand.vue'

const cta = {
  eyebrow: 'Join the Ecosystem · Build Together',
  headline: 'Join the Ecosystem.<br /><em style="font-style:italic;color:#F2B50B;">Build Together.</em>',
  body: 'Whether you\'re a government agency, corporation, investor, or community<br />leader — there\'s a role for you in TBI\'s ecosystem.',
  buttons: [
    { label: 'Partner With TBI', to: '/apply', primary: true  },
    { label: 'Learn About TBI',  to: '/about', primary: false },
  ],
}
</script>

<template>
  <v-main style="background:#F7F0F0;">
    <EcosystemHero />
    <GovernmentPartners />
    <CorporatePartners />
    <LguCommunity />
    <InvestorsFunding />
    <MentorNetwork />
    <CtaBand v-bind="cta" />
  </v-main>
</template>

