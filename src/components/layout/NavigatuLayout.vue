<template>
  <v-app>
    <NavigatuHeader />
    <v-main>
      <slot />
    </v-main>
    <NavigatuFooter />
  </v-app>
</template>

<script setup>
import NavigatuHeader from '@/components/layout/NavigatuHeader.vue'
import NavigatuFooter from '@/components/layout/NavigatuFooter.vue'
</script>
