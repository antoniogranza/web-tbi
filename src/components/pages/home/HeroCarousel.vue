<template>
  <section class="hero-section" style="padding-top: 20px;">

    <div class="hero-slides">

      <!-- ── SLIDE 1: Tagline ── -->
      <transition name="hero-fade">
        <div v-if="heroIdx === 0" key="s0" class="hero-slide" style="background:#F7F0F0;">
          <v-container fluid class="hero-container">
            <v-row align="center" class="hero-row">

              <v-col cols="12" md="7">
                <div class="d-flex align-center ga-2 mb-5">
                  <v-icon color="#48A111" size="10">mdi-circle</v-icon>
                  <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.18em;color:#48A111;text-transform:uppercase;">
                    Technology Business Incubator · DOST Accredited
                  </span>
                </div>

                <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.4rem,4.5vw,4.2rem);line-height:1.04;letter-spacing:-0.035em;color:#111810;margin-bottom:20px;font-weight:400;">
                  Commercializing Research.<br />
                  Building <em style="font-style:italic;color:#25671E;">Startups.</em><br />
                  Powering Regional<br />Innovation.
                </div>

                <p style="font-family:'Inter',sans-serif;font-size:15px;font-weight:400;color:#6B7B6A;line-height:1.78;max-width:500px;margin-bottom:32px;letter-spacing:-0.01em;">
                  We bridge university R&amp;D and market reality — growing
                  technology-based enterprises that create jobs, solve regional
                  problems, and drive inclusive growth.
                </p>

                <div class="d-flex flex-wrap ga-3 mb-6">
                  <v-btn to="/apply" color="#25671E" variant="flat" rounded="lg" size="large"
                    append-icon="mdi-arrow-right"
                    style="text-transform:none;font-family:'Inter',sans-serif;font-weight:600;font-size:14px;">
                    Apply for Incubation
                  </v-btn>
                  <v-btn to="/technologies" variant="outlined" rounded="lg" size="large"
                    style="text-transform:none;font-family:'Inter',sans-serif;font-weight:500;font-size:14px;border-color:#DDD8D0;color:#111810;">
                    Submit a Technology
                  </v-btn>
                  <v-btn to="/ecosystem" variant="outlined" rounded="lg" size="large"
                    style="text-transform:none;font-family:'Inter',sans-serif;font-weight:500;font-size:14px;border-color:#E8E0D8;color:#6B7B6A;">
                    Partner With Us
                  </v-btn>
                </div>

                <div class="d-flex flex-wrap align-center ga-2">
                  <v-chip v-for="p in ['DOST-PCIEERD','DOST-PCAARRD','CSU','DTI']" :key="p"
                    variant="outlined" size="x-small"
                    style="border-color:#E0DDD5;color:#9eaa9c;font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.1em;">
                    {{ p }}
                  </v-chip>
                </div>
              </v-col>

              <v-col cols="12" md="5" class="d-none d-md-flex flex-column align-end">
                <v-card rounded="xl" elevation="2" color="white" border
                  style="border-color:#E8E0D8;width:100%;max-width:380px;">
                  <v-card-text class="pa-7">
                    <v-chip color="#25671E" variant="tonal" size="small" prepend-icon="mdi-circle-medium"
                      class="mb-5"
                      style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;">
                      Spring 2025 Cohort Open
                    </v-chip>
                    <div style="font-family:'Instrument Serif',serif;font-size:1.6rem;color:#111810;letter-spacing:-0.025em;margin-bottom:8px;font-weight:400;line-height:1.2;">
                      Your next breakthrough<br />starts here.
                    </div>
                    <p style="font-family:'Inter',sans-serif;font-size:13px;color:#6B7B6A;line-height:1.7;margin-bottom:20px;letter-spacing:-0.008em;">
                      Join a growing community of founders, researchers, and innovators building the future of Caraga.
                    </p>
                    <v-divider class="mb-4" />
                    <div class="d-flex flex-wrap ga-2">
                      <v-chip v-for="s in ['AgriTech','HealthTech','ICT','DeepTech','FinTech','CleanEnergy']" :key="s"
                        variant="outlined" size="x-small"
                        style="border-color:#E0DDD5;color:#6B7B6A;font-family:'Inter',sans-serif;font-size:10px;font-weight:500;">
                        {{ s }}
                      </v-chip>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

            </v-row>
          </v-container>
        </div>
      </transition>

      <!-- ── SLIDE 2: Metrics ── -->
      <transition name="hero-fade">
        <div v-if="heroIdx === 1" key="s1" class="hero-slide" style="background:#F7F0F0;">
          <v-container fluid class="hero-container">
            <v-row align="center" class="hero-row">

              <v-col cols="12" md="5">
                <div class="d-flex align-center ga-2 mb-5">
                  <v-icon color="#48A111" size="10">mdi-circle</v-icon>
                  <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.18em;color:#48A111;text-transform:uppercase;">
                    Live Metrics · FY 2024–2025
                  </span>
                </div>

                <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.4rem,4.5vw,4rem);line-height:1.04;letter-spacing:-0.035em;color:#111810;margin-bottom:20px;font-weight:400;">
                  Numbers That<br />Tell
                  <em style="font-style:italic;color:#25671E;"> Our Story.</em>
                </div>

                <p style="font-family:'Inter',sans-serif;font-size:15px;font-weight:400;color:#6B7B6A;line-height:1.78;max-width:420px;margin-bottom:32px;letter-spacing:-0.01em;">
                  Real impact across the region — from startups launched to jobs created and revenue generated.
                </p>

                <div class="d-flex align-center ga-3 mb-3">
                  <span style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#9eaa9c;">Industries</span>
                  <v-divider style="max-width:120px;" />
                </div>
                <div class="d-flex flex-wrap ga-2">
                  <v-chip v-for="s in ['AgriTech','HealthTech','CleanEnergy','ICT','DeepTech','FinTech','AquaTech','FoodTech']" :key="s"
                    variant="outlined" size="x-small"
                    style="border-color:#E0DDD5;color:#6B7B6A;font-family:'Inter',sans-serif;font-size:10px;font-weight:500;">
                    {{ s }}
                  </v-chip>
                </div>
              </v-col>

              <v-col cols="12" md="7">
                <v-row density="comfortable">
                  <v-col v-for="(s, i) in heroStats" :key="s.label" cols="6">
                    <v-card rounded="xl" elevation="0" border color="white" style="border-color:#E8E0D8;">
                      <v-card-text class="pa-6">
                        <div style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;color:#9eaa9c;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:14px;">
                          0{{ i + 1 }}
                        </div>
                        <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.2rem,3.5vw,3.25rem);color:#111810;letter-spacing:-0.05em;line-height:1;margin-bottom:8px;font-weight:400;">
                          <span style="font-size:1.2rem;color:#25671E;">{{ s.pre }}</span>{{ s.num }}<span style="font-size:1.25rem;color:#25671E;font-weight:700;">{{ s.suf }}</span>
                        </div>
                        <div style="font-family:'Inter',sans-serif;font-size:12px;font-weight:500;color:#6B7B6A;letter-spacing:-0.005em;line-height:1.4;">
                          {{ s.label }}
                        </div>
                        <v-divider class="mt-3 mb-2" />
                        <v-chip color="#25671E" variant="tonal" size="x-small" prepend-icon="mdi-trending-up"
                          style="font-family:'JetBrains Mono',monospace;font-size:9px;">
                          {{ s.delta }}
                        </v-chip>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>

            </v-row>
          </v-container>
        </div>
      </transition>

      <!-- ── SLIDE 3: Photo ── -->
      <transition name="hero-fade">
        <div v-if="heroIdx === 2" key="s2" class="hero-slide hero-slide-photo">
          <div class="photo-bg" />
          <div class="photo-overlay" />
          <v-container fluid class="hero-container" style="position:relative;z-index:2;">
            <v-row align="center" class="hero-row">
              <v-col cols="12" md="7">
                <div class="d-flex align-center ga-2 mb-5">
                  <v-icon color="#a8e47a" size="10">mdi-circle</v-icon>
                  <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.18em;color:#a8e47a;text-transform:uppercase;">
                    Caraga State University · Butuan City
                  </span>
                </div>

                <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.6rem,4.5vw,4.2rem);line-height:1.04;letter-spacing:-0.035em;color:#fff;margin-bottom:20px;font-weight:400;">
                  Where Ideas Become<br />
                  <em style="font-style:italic;color:#a8e47a;">Enterprises.</em>
                </div>

                <p style="font-family:'Inter',sans-serif;font-size:15px;font-weight:400;color:rgba(255,255,255,0.65);line-height:1.78;max-width:500px;margin-bottom:32px;letter-spacing:-0.01em;">
                  Rooted in Caraga. Built for the Philippines.
                  We turn regional challenges into scalable, investable solutions.
                </p>

                <div class="d-flex flex-wrap ga-3">
                  <v-btn to="/apply" color="#a8e47a" variant="flat" rounded="lg" size="large"
                    append-icon="mdi-arrow-right"
                    style="text-transform:none;font-family:'Inter',sans-serif;font-weight:700;font-size:14px;color:#111810;">
                    Apply for Incubation
                  </v-btn>
                  <v-btn to="/about" variant="outlined" rounded="lg" size="large"
                    style="text-transform:none;font-family:'Inter',sans-serif;font-weight:500;font-size:14px;border-color:rgba(255,255,255,0.35);color:#fff;">
                    Learn More
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </transition>

    </div>

    <!-- ── Dot + Arrow navigation ── -->
    <div class="hero-nav">
      <v-btn icon variant="outlined" size="small" @click="heroPrev"
        :style="heroIdx === 2 ? 'border-color:rgba(255,255,255,0.3);color:#fff;background:rgba(0,0,0,0.2);' : 'border-color:#E8E0D8;color:#111810;'">
        <v-icon size="14">mdi-arrow-left</v-icon>
      </v-btn>

      <div class="d-flex align-center ga-2">
        <button
          v-for="(_, i) in 3" :key="i"
          @click="heroGo(i)"
          class="dot-btn"
          :class="{ active: i === heroIdx, light: heroIdx === 2 }"
        />
      </div>

      <v-btn icon variant="outlined" size="small" @click="heroNext"
        :style="heroIdx === 2 ? 'border-color:rgba(255,255,255,0.3);color:#fff;background:rgba(0,0,0,0.2);' : 'border-color:#E8E0D8;color:#111810;'">
        <v-icon size="14">mdi-arrow-right</v-icon>
      </v-btn>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const heroStats = [
  { pre: '', num: '000', suf: '',  label: 'Startups Incubated', delta: 'Update later' },
  { pre: '', num: '00',  suf: '',  label: 'Spin-offs Created',  delta: 'Update later' },
  { pre: '', num: '00',  suf: '',  label: 'IP Filed / Licensed',delta: 'Update later' },
  { pre:'₱', num: '0.0', suf: 'B', label: 'Revenue Generated',  delta: 'Update later' },
]

const HERO_INTERVAL = 6000
const heroIdx = ref(0)
let heroTimer = null

function startHeroTimer() {
  clearInterval(heroTimer)
  heroTimer = setInterval(() => {
    heroIdx.value = (heroIdx.value + 1) % 3
  }, HERO_INTERVAL)
}

function heroGo(i)  { heroIdx.value = i; startHeroTimer() }
function heroNext() { heroIdx.value = (heroIdx.value + 1) % 3; startHeroTimer() }
function heroPrev() { heroIdx.value = (heroIdx.value - 1 + 3) % 3; startHeroTimer() }

onMounted(() => startHeroTimer())
onUnmounted(() => clearInterval(heroTimer))
</script>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-slides {
  position: relative;
  height: calc(100vh - 68px);
}

.hero-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
}

/* Container: horizontal padding only, no vertical padding */
.hero-container {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-left: clamp(24px, 4vw, 64px) !important;
  padding-right: clamp(24px, 4vw, 64px) !important;
  height: 100%;
}

/* Row fills the slide height, leaving room for nav dots at bottom */
.hero-row {
  height: 100%;
  padding-bottom: 72px; /* clears the nav dot bar */
  padding-top: 24px;
}

.hero-slide-photo {
  height: calc(100vh - 68px);
}

.photo-bg {
  position: absolute;
  inset: 0;
  background-image: url('/src/assets/hero-photo.jpg');
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(17,24,16,0.78) 0%, rgba(17,24,16,0.45) 100%);
  z-index: 1;
}

.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 0.7s ease;
  position: absolute;
  inset: 0;
}
.hero-fade-enter-from, .hero-fade-leave-to  { opacity: 0; }
.hero-fade-enter-to,   .hero-fade-leave-from { opacity: 1; }

/* Nav sits inside the slide, always visible */
.hero-nav {
  position: absolute;
  bottom: 28px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 10;
}

.dot-btn {
  width: 8px;
  height: 8px;
  border-radius: 99px;
  border: none;
  background: #C8C0B8;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}
.dot-btn.active        { width: 24px; background: #25671E; }
.dot-btn.light         { background: rgba(255,255,255,0.4); }
.dot-btn.light.active  { background: #a8e47a; width: 24px; }
</style>
