<template>
  <div class="mt-8">
    <v-btn
      v-if="!submitted"
      type="submit"
      color="#25671E"
      variant="flat"
      rounded="lg"
      size="large"
      block
      append-icon="mdi-arrow-right"
      style="text-transform:none;font-family:'Inter',sans-serif;font-weight:700;font-size:15px;height:52px;"
    >
      {{ label }}
    </v-btn>

    <v-card v-else color="#25671E" rounded="xl" elevation="0">
      <v-card-text class="pa-8 text-center">
        <v-avatar color="rgba(255,255,255,0.15)" rounded="xl" size="56" class="mb-4">
          <v-icon icon="mdi-check-circle-outline" color="white" size="28" />
        </v-avatar>
        <div style="font-family:'Instrument Serif',serif;font-size:1.4rem;color:#fff;margin-bottom:8px;">
          Application Submitted!
        </div>
        <p style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.7;margin:0;">
          We'll review your application and get back to you within 2 weeks.
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
defineProps({
  label:     { type: String,  default: 'Submit' },
  submitted: { type: Boolean, default: false    },
})
</script>