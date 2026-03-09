<script setup>
import { computed } from "vue";

const year = computed(() => new Date().getFullYear());
</script>

<template>
  <v-footer class="footer py-6">
    <v-container fluid class="px-10">

      <v-row>

        <!-- Column 1 -->
        <v-col cols="12" md="3">
          <h4 class="footer-heading">QUICK LINKS</h4>
          <div><router-link to="/" class="footer-link">Home</router-link></div>
          <div><router-link to="/about" class="footer-link">About</router-link></div>
          <div><router-link to="/program" class="footer-link">Programs</router-link></div>
        </v-col>

        <!-- Column 2 -->
        <v-col cols="12" md="3">
          <h4 class="footer-heading">PROGRAMS</h4>
          <div class="footer-text">Institutional Incubation</div>
          <div class="footer-text">Regional Incubation</div>
          <div class="footer-text">Spin-Off Support</div>
          <div class="footer-text">Capacity Building</div>
        </v-col>

        <!-- Column 3 -->
        <v-col cols="12" md="3">
          <h4 class="footer-heading">TBI'S</h4>
          <div><router-link to="/navigatu" class="footer-link">Navigatu</router-link></div>
          <div><router-link to="/tara" class="footer-link">TARA</router-link></div>
        </v-col>

        <!-- Column 4 -->
        <v-col cols="12" md="3">
          <h4 class="footer-heading">CONTACT INFO</h4>
          <div class="footer-text">Caraga State University</div>
          <div class="footer-text">Ampayon, Butuan City</div>
          <div class="footer-text">Philippines 8600</div>
          <div class="footer-text">navigatu@carsu.edu.ph</div>
          <div class="footer-text">+63 XXX XXX XXXX</div>
        </v-col>

      </v-row>

      <v-divider class="my-8" style="border-color: rgba(0,0,0,0.08);" />

      <div class="text-center footer-bottom">
        © {{ year }} Caraga State University TBI Platform. All Rights Reserved.
      </div>

    </v-container>
  </v-footer>
</template>

<style scoped>
.footer {
  background-color: #EEEEEE;
  color: #111810;
}

.footer-heading {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.16em;
  color: #9eaa9c;
  margin-bottom: 16px;
}

.footer-link {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.008em;
  margin-bottom: 2px;
  cursor: pointer;
  color: #111810;
  text-decoration: none;
  display: inline-block;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #25671E;
}

.footer-text {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.008em;
  color: #6B7B6A;
  margin-bottom: 8px;
  line-height: 1.6;
}

.footer-bottom {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.005em;
  color: #9eaa9c;
}
</style>
