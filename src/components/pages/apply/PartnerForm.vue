<template>
  <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;">
    <v-sheet color="#48A111" height="4" rounded="0" style="border-radius:12px 12px 0 0;" />
    <v-card-text class="pa-8 pa-md-10">
      <div class="d-flex align-center ga-3 mb-2">
        <v-avatar color="#48A111" variant="tonal" rounded="lg" size="40">
          <v-icon icon="mdi-handshake-outline" size="20" color="#48A111" />
        </v-avatar>
        <v-chip color="#48A111" variant="tonal" size="x-small"
          style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
          Partnership
        </v-chip>
      </div>
      <div :style="sectionTitleStyle" class="mt-4">Partnership Application Form</div>
      <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="6"><FormField label="Organization Name" v-model="form.organizationName" required /></v-col>
          <v-col cols="12" md="6"><FormField label="Contact Person"    v-model="form.contactPerson"    required /></v-col>
          <v-col cols="12" md="6"><FormField label="Position"          v-model="form.position"         required /></v-col>
          <v-col cols="12" md="6"><FormField label="Email" v-model="form.email" type="email" required /></v-col>
          <v-col cols="12" md="6"><FormField label="Phone" v-model="form.phone" type="tel" /></v-col>
          <v-col cols="12" md="6">
            <div :style="labelStyle">Organization Type *</div>
            <v-select v-model="form.organizationType" :items="['Government Agency','Corporate / Private Sector','NGO / Non-profit','Academic Institution','Investor / VC Firm']" variant="outlined" density="comfortable" rounded="lg" base-color="#D0C8C0" color="#25671E" :rules="[v => !!v || 'Required']" style="font-family:'Inter',sans-serif;font-size:13px;" />
          </v-col>
          <v-col cols="12" md="6">
            <div :style="labelStyle">Partnership Type *</div>
            <v-select v-model="form.partnershipType" :items="['Funding Partner','Technology Collaboration','Mentorship Program','Facility Sharing','Market Access','Other']" variant="outlined" density="comfortable" rounded="lg" base-color="#D0C8C0" color="#25671E" :rules="[v => !!v || 'Required']" style="font-family:'Inter',sans-serif;font-size:13px;" />
          </v-col>
          <v-col cols="12"><FormField label="Partnership Proposal" v-model="form.description" :textarea="true" :rows="8" placeholder="Describe your partnership proposal, objectives, and expected outcomes..." required /></v-col>
        </v-row>
        <SubmitBtn :submitted="submitted" label="Submit Partnership Inquiry" />
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref } from 'vue'
import FormField from './FormField.vue'
import SubmitBtn from './SubmitBtn.vue'
import { labelStyle, sectionTitleStyle } from './formStyles.js'
const formRef = ref(null); const valid = ref(false); const submitted = ref(false)
const form = ref({ organizationName:'', contactPerson:'', position:'', email:'', phone:'', organizationType:'', partnershipType:'', description:'' })
const handleSubmit = async () => { const { valid: ok } = await formRef.value.validate(); if (ok) submitted.value = true }
</script>