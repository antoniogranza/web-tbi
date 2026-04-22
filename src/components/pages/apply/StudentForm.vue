<template>
  <v-card color="white" rounded="xl" elevation="0" border style="border-color: #e8e0d8">
    <v-sheet color="#48A111" height="4" rounded="0" style="border-radius: 12px 12px 0 0" />
    <v-card-text class="pa-8 pa-md-10">
      <div class="d-flex align-center ga-3 mb-2">
        <v-avatar color="#48A111" variant="tonal" rounded="lg" size="40">
          <v-icon icon="mdi-school-outline" size="20" color="#48A111" />
        </v-avatar>
        <v-chip
          color="#48A111"
          variant="tonal"
          size="x-small"
          style="
            font-family: 'JetBrains Mono', monospace;
            font-size: 9px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          "
        >
          Student Track
        </v-chip>
      </div>
      <div :style="sectionTitleStyle" class="mt-4">Student Application Form</div>

      <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="6"
            ><FormField label="Full Name" v-model="form.fullName" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Student ID" v-model="form.studentId" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Course" v-model="form.course" required
          /></v-col>
          <v-col cols="12" md="6">
            <div :style="labelStyle">Year Level *</div>
            <v-select
              v-model="form.yearLevel"
              :items="yearLevels"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              base-color="#D0C8C0"
              color="#25671E"
              :rules="[(v) => !!v || 'Required']"
              style="font-family: 'Inter', sans-serif; font-size: 13px"
            />
          </v-col>
          <v-col cols="12" md="6"
            ><FormField label="Email" v-model="form.email" type="email" required
          /></v-col>
          <v-col cols="12" md="6"
            ><FormField label="Phone" v-model="form.phone" type="tel" required
          /></v-col>
          <v-col cols="12"
            ><FormField
              label="Team Members (if applicable)"
              v-model="form.teamMembers"
              :textarea="true"
              :rows="3"
              placeholder="List team members, their roles, and contact info..."
          /></v-col>
          <v-col cols="12"
            ><FormField label="Project Title" v-model="form.projectTitle" required
          /></v-col>
          <v-col cols="12"
            ><FormField
              label="Project Description"
              v-model="form.projectDescription"
              :textarea="true"
              :rows="6"
              placeholder="Describe your innovation, the problem it solves, and your solution..."
              required
          /></v-col>
          <v-col cols="12" md="6">
            <div :style="labelStyle">Sector *</div>
            <v-select
              v-model="form.sector"
              :items="sectors"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              base-color="#D0C8C0"
              color="#25671E"
              :rules="[(v) => !!v || 'Required']"
              style="font-family: 'Inter', sans-serif; font-size: 13px"
            />
          </v-col>
          <v-col cols="12" md="6">
            <div :style="labelStyle">Project Stage *</div>
            <v-select
              v-model="form.stage"
              :items="stages"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              base-color="#D0C8C0"
              color="#25671E"
              :rules="[(v) => !!v || 'Required']"
              style="font-family: 'Inter', sans-serif; font-size: 13px"
            />
          </v-col>
        </v-row>
        <SubmitBtn :submitted="submitted" label="Submit Application" />
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
  studentId: '',
  course: '',
  yearLevel: '',
  email: '',
  phone: '',
  teamMembers: '',
  projectTitle: '',
  projectDescription: '',
  sector: '',
  stage: '',
})
const yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate Student']
const sectors = ['ICT', 'Agriculture', 'Healthcare', 'Energy', 'Environment', 'Other']
const stages = ['Idea Stage', 'Prototype Developed', 'Tested with Users', 'Generating Revenue']
const handleSubmit = async () => {
  const { valid: ok } = await formRef.value.validate()
  if (ok) submitted.value = true
}
</script>
