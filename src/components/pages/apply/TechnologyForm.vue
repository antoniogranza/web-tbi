<template>
  <v-card color="white" rounded="xl" elevation="0" border style="border-color: #e8e0d8">
    <v-sheet color="#25671E" height="4" rounded="0" style="border-radius: 12px 12px 0 0" />
    <v-card-text class="pa-8 pa-md-10">
      <div class="d-flex align-center ga-3 mb-2">
        <v-avatar color="#25671E" variant="tonal" rounded="lg" size="40">
          <v-icon icon="mdi-lightbulb-outline" size="20" color="#25671E" />
        </v-avatar>
        <v-chip
          color="#25671E"
          variant="tonal"
          size="x-small"
          style="
            font-family: 'JetBrains Mono', monospace;
            font-size: 9px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          "
        >
          Tech Transfer
        </v-chip>
      </div>
      <div :style="sectionTitleStyle" class="mt-4">Technology Submission Form</div>
      <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="6"
            ><FormField label="Submitter Name" v-model="form.submitterName" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Affiliation" v-model="form.affiliation" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Email" v-model="form.email" type="email" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Phone" v-model="form.phone" type="tel" required
          /></v-col>
          <v-col cols="12"
            ><FormField label="Technology Title" v-model="form.technologyTitle" required
          /></v-col>
          <v-col cols="12"
            ><FormField
              label="Technology Description"
              v-model="form.description"
              :textarea="true"
              :rows="6"
              required
          /></v-col>
          <v-col cols="12" md="4">
            <div :style="labelStyle">Sector *</div>
            <v-select
              v-model="form.sector"
              :items="['ICT', 'Agriculture', 'Healthcare', 'Energy', 'Other']"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              base-color="#D0C8C0"
              color="#25671E"
              :rules="[(v) => !!v || 'Required']"
              style="font-family: 'Inter', sans-serif; font-size: 13px"
            />
          </v-col>
          <v-col cols="12" md="4">
            <div :style="labelStyle">TRL Level *</div>
            <v-select
              v-model="form.trlLevel"
              :items="['TRL 5', 'TRL 6', 'TRL 7', 'TRL 8', 'TRL 9']"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              base-color="#D0C8C0"
              color="#25671E"
              :rules="[(v) => !!v || 'Required']"
              style="font-family: 'Inter', sans-serif; font-size: 13px"
            />
          </v-col>
          <v-col cols="12" md="4">
            <div :style="labelStyle">IP Status *</div>
            <v-select
              v-model="form.ipStatus"
              :items="['None', 'Patent Pending', 'Patent Granted']"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              base-color="#D0C8C0"
              color="#25671E"
              :rules="[(v) => !!v || 'Required']"
              style="font-family: 'Inter', sans-serif; font-size: 13px"
            />
          </v-col>
          <v-col cols="12"
            ><FormField
              label="Target Market"
              v-model="form.targetMarket"
              :textarea="true"
              :rows="3"
              required
          /></v-col>
        </v-row>
        <SubmitBtn :submitted="submitted" label="Submit Technology" />
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref } from 'vue'
import FormField from './Formfield.vue'
import SubmitBtn from './Submitbtn.vue'
import { labelStyle, sectionTitleStyle } from './formStyles.js'
const formRef = ref(null)
const valid = ref(false)
const submitted = ref(false)
const form = ref({
  submitterName: '',
  affiliation: '',
  email: '',
  phone: '',
  technologyTitle: '',
  description: '',
  sector: '',
  trlLevel: '',
  ipStatus: '',
  targetMarket: '',
})
const handleSubmit = async () => {
  const { valid: ok } = await formRef.value.validate()
  if (ok) submitted.value = true
}
</script>
