<template>
  <footer class="footer-section">
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" md="4" class="mb-8">
          <div class="footer-brand mb-1">NAVIGATU</div>
          <p class="footer-tag mb-4">Technology Business Incubator</p>
          <p class="footer-desc">
            Empowering the next generation of Filipino tech founders through mentorship, innovation,
            and community.
          </p>
          <div class="d-flex" style="gap: 12px">
            <button class="social-btn"><v-icon size="15">mdi-facebook</v-icon></button>
            <button class="social-btn"><v-icon size="15">mdi-linkedin</v-icon></button>
            <button class="social-btn"><v-icon size="15">mdi-twitter</v-icon></button>
          </div>
        </v-col>

        <v-col cols="6" md="2" class="mb-8">
          <div class="footer-col-title mb-4">Programs</div>
          <div class="footer-link mb-3">Incubation</div>
          <div class="footer-link mb-3">Mentorship</div>
          <div class="footer-link mb-3">Funding Access</div>
        </v-col>

        <v-col cols="6" md="2" class="mb-8">
          <div class="footer-col-title mb-4">Company</div>
          <div class="footer-link mb-3">About</div>
          <div class="footer-link mb-3">Services</div>
          <div class="footer-link mb-3">Events</div>
        </v-col>

        <v-col cols="12" md="4" class="mb-8">
          <div class="footer-col-title mb-4">Newsletter</div>
          <p class="footer-desc mb-4">Stay updated on events, funding, and startup news.</p>
          <div class="newsletter">
            <input v-model="newsletterEmail" class="nl-input" placeholder="your@email.com" />
            <button class="nl-btn" @click="subscribeNewsletter">
              <v-icon size="17">mdi-send</v-icon>
            </button>
          </div>
        </v-col>
      </v-row>

      <div class="footer-hr" />

      <div class="d-flex flex-wrap justify-space-between align-center pt-6" style="gap: 8px">
        <p class="footer-copy">© {{ year }} Navigatu TBI. All Rights Reserved.</p>
        <p class="footer-copy">Empowering startups. Building futures.</p>
      </div>
    </v-container>
  </footer>
</template>

<script setup>
import { computed, ref } from 'vue'

const newsletterEmail = ref('')
const year = computed(() => new Date().getFullYear())

function subscribeNewsletter() {
  newsletterEmail.value = ''
}
</script>

<style scoped>
.footer-section {
  background: #06080f;
}
.footer-brand {
  font-family: 'Playfair Display', serif;
  font-size: 1.55rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
  font-style: italic;
}
.footer-tag {
  font-size: 0.62rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0;
}
.footer-desc {
  font-size: 0.77rem;
  color: rgba(255, 255, 255, 0.38);
  line-height: 1.8;
}
.footer-col-title {
  font-size: 0.62rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.32);
  letter-spacing: 2.5px;
  text-transform: uppercase;
}
.footer-link {
  font-size: 0.79rem;
  color: rgba(255, 255, 255, 0.48);
  cursor: pointer;
  transition: color 0.15s;
}
.footer-link:hover {
  color: #fff;
}
.social-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.78);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.social-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.25);
  color: #fff;
}
.newsletter {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 11px;
  overflow: hidden;
}
.nl-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  font-size: 0.78rem;
  padding: 10px 12px;
}
.nl-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}
.nl-btn {
  width: 42px;
  height: 40px;
  border: none;
  background: #1565c0;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}
.nl-btn:hover {
  background: #0d4f9a;
}
.footer-hr {
  margin-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.footer-copy {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.37);
  margin: 0;
}
</style>
