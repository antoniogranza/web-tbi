<template>
  <div>
    <div :style="labelStyle">{{ label }}{{ required ? ' *' : '' }}</div>
    <v-textarea
      v-if="textarea"
      v-model="model"
      variant="outlined"
      density="comfortable"
      rounded="lg"
      :rows="rows"
      :placeholder="placeholder"
      :rules="required ? [v => !!v || 'Required'] : []"
      base-color="#D0C8C0"
      color="#25671E"
      style="font-family:'Inter',sans-serif;font-size:13px;"
    />
    <v-text-field
      v-else
      v-model="model"
      :type="type"
      variant="outlined"
      density="comfortable"
      rounded="lg"
      :placeholder="placeholder"
      :rules="required ? [v => !!v || 'Required'] : []"
      base-color="#D0C8C0"
      color="#25671E"
      style="font-family:'Inter',sans-serif;font-size:13px;"
    />
  </div>
</template>

<script setup>
import { labelStyle } from './formStyles.js'

const model = defineModel()
defineProps({
  label:       { type: String,  required: true  },
  type:        { type: String,  default: 'text' },
  placeholder: { type: String,  default: ''     },
  required:    { type: Boolean, default: false  },
  textarea:    { type: Boolean, default: false  },
  rows:        { type: Number,  default: 4      },
})
</script>