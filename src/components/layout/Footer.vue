<script setup>
import { computed } from "vue";

const year = computed(() => new Date().getFullYear());
</script>

<template>
  <v-footer app class="footer pa-6">
    <v-container>

      <v-row align="center" justify="space-between">

        <!-- Left Section -->
        <v-col cols="12" md="6">
          <h3 class="footer-title">TBI Platform</h3>

          <p class="footer-text">
            Commercializing Research. Building Startups.
            Powering Regional Innovation.
          </p>
        </v-col>

        <!-- Right Navigation -->
        <v-col cols="12" md="6" class="text-md-right">

          <v-btn variant="text" to="/">Home</v-btn>
          <v-btn variant="text" to="/about">About</v-btn>
          <v-btn variant="text" to="/program">Program</v-btn>
          <v-btn variant="text" to="/events">Events</v-btn>
          <v-btn variant="text" to="/apply">Apply</v-btn>

        </v-col>

      </v-row>

      <v-divider class="my-4" />

      <div class="text-center footer-bottom">
        © {{ year }} TBI Platform. All Rights Reserved.
      </div>

    </v-container>
  </v-footer>
</template>

<style scoped>
.footer {
  background-color: #1e293b;
  color: white;
}

.footer-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.footer-text {
  font-size: 14px;
  opacity: 0.85;
}

.footer-bottom {
  font-size: 13px;
  opacity: 0.7;
}
</style>
