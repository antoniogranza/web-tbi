<template>
  <v-card color="white" rounded="xl" elevation="0" border style="border-color: #e8e0d8">
    <v-sheet color="#25671E" height="4" rounded="0" style="border-radius: 12px 12px 0 0" />
    <v-card-text class="pa-8 pa-md-10">
      <div class="d-flex align-center ga-3 mb-2">
        <v-avatar color="#25671E" variant="tonal" rounded="lg" size="40">
          <v-icon icon="mdi-account-tie-outline" size="20" color="#25671E" />
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
          Mentor Network
        </v-chip>
      </div>
      <div :style="sectionTitleStyle" class="mt-4">Mentor Application Form</div>
      <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="6"
            ><FormField label="Full Name" v-model="form.fullName" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Email" v-model="form.email" type="email" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Phone" v-model="form.phone" type="tel" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Current Position" v-model="form.currentPosition" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Company" v-model="form.company" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField
              label="Years of Experience"
              v-model="form.yearsExperience"
              type="number"
              required
          /></v-col>
          <v-col cols="12"
            ><FormField
              label="Areas of Expertise"
              v-model="form.expertise"
              :textarea="true"
              :rows="4"
              placeholder="E.g., Technology development, Business strategy, Marketing, Finance..."
              required
          /></v-col>
          <v-col cols="12">
            <div :style="labelStyle">Availability *</div>
            <v-select
              v-model="form.availability"
              :items="[
                '2–4 hours per month',
                '5–8 hours per month',
                '9–12 hours per month',
                'Flexible',
              ]"
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
              label="Why do you want to be a mentor?"
              v-model="form.motivation"
              :textarea="true"
              :rows="6"
              required
          /></v-col>
        </v-row>
        <SubmitBtn :submitted="submitted" label="Submit Mentor Application" />
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
  fullName: '',
  email: '',
  phone: '',
  currentPosition: '',
  company: '',
  yearsExperience: '',
  expertise: '',
  availability: '',
  motivation: '',
})
const handleSubmit = async () => {
  const { valid: ok } = await formRef.value.validate()
  if (ok) submitted.value = true
}
</script>
