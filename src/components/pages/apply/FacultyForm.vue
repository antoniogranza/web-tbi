<template>
  <v-card color="white" rounded="0" elevation="0" border style="border: 2px solid #111810">
    <v-card-text class="pa-8 pa-md-10">
      <div :style="sectionTitleStyle">Faculty Application Form</div>
      <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="6"
            ><FormField label="Full Name" v-model="form.fullName" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Department" v-model="form.department" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Position" v-model="form.position" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Email" v-model="form.email" type="email" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Phone" v-model="form.phone" type="tel" required
          /></v-col>
          <v-col cols="12"
            ><FormField label="Research / Technology Title" v-model="form.researchTitle" required
          /></v-col>
          <v-col cols="12"
            ><FormField
              label="Research Description"
              v-model="form.researchDescription"
              :textarea="true"
              :rows="6"
              required
          /></v-col>
          <v-col cols="12" md="6">
            <div :style="labelStyle">IP Status *</div>
            <v-select
              v-model="form.ipStatus"
              :items="ipStatuses"
              variant="outlined"
              density="comfortable"
              rounded="0"
              :rules="[(v) => !!v || 'Required']"
              style="font-family: 'Inter', sans-serif; font-size: 13px"
            />
          </v-col>
          <v-col cols="12" md="6">
            <div :style="labelStyle">TRL Level *</div>
            <v-select
              v-model="form.trlLevel"
              :items="trlLevels"
              variant="outlined"
              density="comfortable"
              rounded="0"
              :rules="[(v) => !!v || 'Required']"
              style="font-family: 'Inter', sans-serif; font-size: 13px"
            />
          </v-col>
          <v-col cols="12"
            ><FormField
              label="Commercialization Goal"
              v-model="form.commercializationGoal"
              :textarea="true"
              :rows="4"
              required
          /></v-col>
        </v-row>
        <SubmitBtn :submitted="submitted" label="Submit Application" />
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import FormField from './FormField.vue'
import SubmitBtn from './SubmitBtn.vue'
import { labelStyle, sectionTitleStyle } from '../../../components/pages/apply/Formstyles'

const formRef = ref(null)
const valid = ref(false)
const submitted = ref(false)

const form = ref({
  fullName: '',
  department: '',
  position: '',
  email: '',
  phone: '',
  researchTitle: '',
  researchDescription: '',
  ipStatus: '',
  trlLevel: '',
  commercializationGoal: '',
})

const ipStatuses = ['No IP filed', 'Patent pending', 'Patent granted', 'Trademark registered']
const trlLevels = [
  'TRL 1–3 (Basic Research)',
  'TRL 4–6 (Technology Development)',
  'TRL 7–9 (System Demonstration)',
]

const handleSubmit = async () => {
  const { valid: isValid } = await formRef.value.validate()
  if (!isValid) return
  submitted.value = true
}
</script>
