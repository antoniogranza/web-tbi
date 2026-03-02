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

          <div class="footer-text">Institutional Incubation</div>
          <div class="footer-text">Regional Incubation</div>
          <div class="footer-text">Spin-Off Support</div>
          <div class="footer-text">Capacity Building</div>
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
          <div class="footer-text">navigatu@carsu.edu.ph</div>
          <div class="footer-text">+63 XXX XXX XXXX</div>
        </v-col>

      </v-row>

      <v-divider class="my-6" />

      <div class="text-center footer-bottom">
        © {{ year }} Caraga State University TBI Platform. All Rights Reserved.
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
  background-color: #EEEEEE;
  color: black;
}

.footer-heading {
  font-weight: 550;
  margin-bottom: 12px;
  font-size: 16px;
}

.footer-link {
  margin-bottom: 2px;
  cursor: pointer;
  opacity: 0.85;
  color: #1B5E20; /* ⭐ Link color */
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.2s ease, color 0.2s ease;
}

.footer-link:hover {
  opacity: 1;
  color: #145214; /* Optional darker hover shade */
}

.footer-text {
  margin-bottom: 2px;
  opacity: 0.85;
}

.footer-bottom {
  font-size: 13px;
  opacity: 0.6;
}
</style>
