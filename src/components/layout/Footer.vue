<template>
  <v-footer app class="footer py-10">
    <v-container>

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

          <div class="footer-link">Institutional Incubation</div>
          <div class="footer-link">Regional Incubation</div>
          <div class="footer-link">Spin-Off Support</div>
          <div class="footer-link">Capacity Building</div>
        </v-col>


        <!-- Column 3 -->
        <v-col cols="12" md="3">
          <h4 class="footer-heading">TBI's</h4>

          <div><router-link to="/navigatu" class="footer-link">Navigatu</router-link></div>
          <div><router-link to="/tara" class="footer-link">TARA</router-link></div>
        </v-col>


        <!-- Column 4 -->
        <v-col cols="12" md="3">
          <h4 class="footer-heading">CONTACT INFO</h4>

          <div class="footer-text">Caraga State University</div>
          <div class="footer-text">Ampayon, Butuan City</div>
          <div class="footer-text">Philippines 8600</div>
          <div class="footer-text">email@csu.edu.ph</div>
          <div class="footer-text">+63 XXX XXX XXXX</div>
        </v-col>

      </v-row>

      <v-divider class="my-6" />

      <div class="text-center footer-bottom">
        © {{ year }} TBI Platform. All Rights Reserved.
      </div>

    </v-container>
  </v-footer>
</template>

<script setup>
import { computed } from "vue";

const year = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  background-color: #0f172a;
  color: white;
}

.footer-heading {
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 16px;
}

.footer-link {
  margin-bottom: 8px;
  cursor: pointer;
  opacity: 0.85;
}

.footer-link:hover {
  opacity: 1;
}

.footer-text {
  margin-bottom: 6px;
  opacity: 0.85;
}

.footer-bottom {
  font-size: 13px;
  opacity: 0.6;
}
</style>
