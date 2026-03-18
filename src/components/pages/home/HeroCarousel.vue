<template>
  <section class="hero-section" style="padding-top: 20px;">

    <div class="hero-slides">

      <!-- ── SLIDE 1: Photo ── -->
      <transition name="hero-fade">
        <div v-if="heroIdx === 0" key="s0" class="hero-slide hero-slide-photo">
          <div class="photo-bg" />
          <div class="photo-overlay" />

          <v-container fluid class="hero-container" style="position:relative;z-index:2;">
            <v-row align="center" justify="center" class="hero-row">
              <v-col cols="12" md="7" class="text-center">
                <div style="font-family:'Instrument Serif',serif;font-size:clamp(3.2rem, 6vw, 6rem);line-height:1.04;letter-spacing:-0.035em;color:#fff;margin-bottom:50px;font-weight:400;">
                  Where Ideas Become<br />
                  <em style="font-style:italic;color:#a8e47a;">Enterprises</em>
                </div>

                <div class="d-flex flex-wrap justify-center ga-3">
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

      <!-- ── SLIDE 2: Metrics ── -->
      <transition name="hero-fade">
        <div v-if="heroIdx === 1" key="s1" class="hero-slide hero-slide-metrics">
          <div class="metrics-bg" />
          <div class="metrics-overlay" />
          <div class="slide-top-label">
            <div class="slide-label">
              <v-icon color="#a8e47a" size="10">mdi-circle</v-icon>
              <span class="slide-label__text">Live Metrics · FY 2024–2025</span>
            </div>
          </div>
          <v-container fluid class="hero-container" style="position:relative;z-index:2;">
            <v-row align="center" class="hero-row">
              <v-col cols="12" md="5">
                <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.4rem,4.5vw,4rem);line-height:1.04;letter-spacing:-0.035em;color:#fff;margin-bottom:20px;font-weight:400;">
                  Numbers That<br />Tell
                  <em style="font-style:italic;color:#a8e47a;"> Our Story</em>
                </div>
                <p style="font-family:'Inter',sans-serif;font-size:15px;font-weight:400;color:rgba(255,255,255,0.65);line-height:1.78;max-width:420px;margin-bottom:32px;letter-spacing:-0.01em;">
                  Real impact across the region — from startups launched to jobs created and revenue generated.
                </p>
                <div class="d-flex align-center ga-3 mb-3">
                  <span style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.45);">Industries</span>
                  <v-divider style="max-width:120px;border-color:rgba(255,255,255,0.2);" />
                </div>
                <div class="d-flex flex-wrap ga-2">
                  <v-chip v-for="s in ['AgriTech','HealthTech','CleanEnergy','ICT','DeepTech','FinTech','AquaTech','FoodTech']" :key="s"
                    variant="outlined" size="x-small"
                    style="border-color:rgba(255,255,255,0.25);color:rgba(255,255,255,0.7);font-family:'Inter',sans-serif;font-size:10px;font-weight:500;">
                    {{ s }}
                  </v-chip>
                </div>
              </v-col>
              <v-col cols="12" md="7">
                <v-row density="comfortable">
                  <v-col v-for="(s, i) in heroStats" :key="s.label" cols="6">
                    <div class="glass-card">
                      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;color:rgba(255,255,255,0.45);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:14px;">
                        0{{ i + 1 }}
                      </div>
                      <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.2rem,3.5vw,3.25rem);color:#fff;letter-spacing:-0.05em;line-height:1;margin-bottom:8px;font-weight:400;">
                        <span style="font-size:1.2rem;color:#a8e47a;">{{ s.pre }}</span>{{ s.num }}<span style="font-size:1.25rem;color:#a8e47a;font-weight:700;">{{ s.suf }}</span>
                      </div>
                      <div style="font-family:'Inter',sans-serif;font-size:12px;font-weight:500;color:rgba(255,255,255,0.6);letter-spacing:-0.005em;line-height:1.4;">
                        {{ s.label }}
                      </div>
                      <div style="border-top:1px solid rgba(255,255,255,0.15);margin-top:12px;padding-top:10px;">
                        <v-chip color="#a8e47a" variant="tonal" size="x-small" prepend-icon="mdi-trending-up"
                          style="font-family:'JetBrains Mono',monospace;font-size:9px;">
                          {{ s.delta }}
                        </v-chip>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </transition>

      <!-- ── SLIDE 3: Tagline ── -->
      <transition name="hero-fade">
        <div v-if="heroIdx === 2" key="s2" class="hero-slide hero-slide-tagline">
          <div class="tagline-bg" />
          <div class="tagline-overlay" />
          <div class="slide-top-label">
            <div class="slide-label">
              <v-icon color="#a8e47a" size="10">mdi-circle</v-icon>
              <span class="slide-label__text">Technology Business Incubator · DOST Accredited</span>
            </div>
          </div>
          <v-container fluid class="hero-container" style="position:relative;z-index:2;">
            <v-row align="end" class="hero-row">
              <v-col cols="12" md="7">
                <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.4rem,4.5vw,4.2rem);line-height:1.04;letter-spacing:-0.035em;color:#111810;margin-bottom:20px;font-weight:400;">
                  Commercializing Research<br />
                  Building <em style="font-style:italic;color:#25671E;">Startups</em><br />
                  Powering Regional<br />Innovation
                </div>
                <p style="font-family:'Inter',sans-serif;font-size:15px;font-weight:400;color:#6B7B6A;line-height:1.78;max-width:500px;margin-bottom:32px;letter-spacing:-0.01em;">
                  We bridge university R&amp;D and market reality — growing
                  technology-based enterprises that create jobs, solve regional
                  problems, and drive inclusive growth.
                </p>
              </v-col>
              <v-col cols="12" md="5" class="d-none d-md-flex flex-column align-end justify-end ga-2">
                <v-chip v-for="p in ['DOST-PCIEERD','DOST-PCAARRD','CSU','DTI']" :key="p"
                  variant="outlined" size="x-small"
                  style="border-color:rgba(168,228,122,0.4);color:#a8e47a;font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.1em;">
                  {{ p }}
                </v-chip>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </transition>

      <!-- ── SLIDE 4: Upcoming Events ── -->
      <transition name="hero-fade">
        <div v-if="heroIdx === 3" key="s3" class="hero-slide" style="background:#F7F0F0;">
          <div class="slide-top-label">
            <div class="slide-label">
              <v-icon color="#a8e47a" size="10">mdi-circle</v-icon>
              <span class="slide-label__text slide-label__text--dark">Upcoming Events</span>
            </div>
          </div>
          <!-- All Events — same absolute top-right as All News -->
          <div class="news-top-right">
            <v-btn to="/events" variant="outlined" rounded="lg" size="small"
              append-icon="mdi-arrow-right"
              style="text-transform:none;font-family:'Inter',sans-serif;font-weight:500;font-size:13px;border-color:#DDD8D0;color:#111810;">
              All Events
            </v-btn>
          </div>
          <v-container fluid class="hero-container">
            <v-row align="start" class="hero-row">
              <v-col cols="12" class="d-flex flex-column" style="height:100%;">

                <!-- Headline — sits near top after label -->
                <div style="padding-top:clamp(48px,6vw,72px);margin-bottom:24px;">
                  <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,3vw,2.6rem);line-height:1.04;letter-spacing:-0.035em;color:#111810;font-weight:400;">
                    What's <em style="font-style:italic;color:#25671E;">Coming Up</em>
                  </div>
                </div>

                <!-- 3 Event Cards — taller -->
                <v-row style="flex:1;">
                  <v-col v-for="(ev, i) in upcomingEvents" :key="ev.title" cols="12" md="4" class="d-flex">
                    <div class="ev-card ev-card--tall">
                      <!-- Top section: date block + meta -->
                      <div class="ev-card__top">
                        <div class="ev-date-block" :style="{ background: ev.color }">
                          <div class="ev-date-block__day">{{ ev.day }}</div>
                          <div class="ev-date-block__month">{{ ev.month }}</div>
                        </div>
                        <div class="ev-card__meta">
                          <div class="ev-card__type">{{ ev.type }}</div>
                          <div class="ev-card__title">{{ ev.title }}</div>
                          <div class="d-flex align-center ga-1 mt-1">
                            <v-icon size="12" color="#9eaa9c">mdi-map-marker-outline</v-icon>
                            <span class="ev-card__location">{{ ev.location }}</span>
                          </div>
                        </div>
                      </div>

                      <!-- Bottom section: audience + register -->
                      <div class="ev-card__bottom">
                        <v-chip variant="outlined" size="x-small"
                          :style="`border-color:${ev.color}33;color:${ev.color};font-family:'Inter',sans-serif;font-size:10px;font-weight:500;`">
                          {{ ev.audience }}
                        </v-chip>
                        <v-btn :to="`/events/${ev.slug}`" variant="text" size="small"
                          :style="`text-transform:none;font-family:'Inter',sans-serif;font-weight:700;font-size:13px;color:${ev.color};padding:0;`"
                          append-icon="mdi-arrow-right">
                          Register
                        </v-btn>
                      </div>
                    </div>
                  </v-col>
                </v-row>

              </v-col>
            </v-row>
          </v-container>
        </div>
      </transition>

      <!-- ── SLIDE 5: Latest News — Full Bleed Editorial ── -->
      <transition name="hero-fade">
        <div v-if="heroIdx === 4" key="s4" class="hero-slide hero-slide-news">
          <div class="news-bg" />
          <div class="news-scrim" />

          <!-- Top-left label -->
          <div class="slide-top-label">
            <div class="slide-label">
              <v-icon color="#a8e47a" size="10">mdi-circle</v-icon>
              <span class="slide-label__text">Latest News</span>
            </div>
          </div>

          <!-- Top-right: All News -->
          <div class="news-top-right">
            <v-btn to="/news" variant="outlined" rounded="lg" size="small"
              append-icon="mdi-arrow-right"
              style="text-transform:none;font-family:'Inter',sans-serif;font-weight:500;font-size:13px;border-color:rgba(255,255,255,0.3);color:#fff;">
              All News
            </v-btn>
          </div>

          <!-- Bottom-left: headline + chip + read time + button -->
          <div class="news-content">

            <!-- Headline first -->
            <div class="news-headline">
              {{ latestNews[0].headline }}
            </div>

            <!-- Chip + read time below headline -->
            <div class="d-flex align-center ga-3 mb-4">
              <v-chip color="#a8e47a" variant="flat" size="small"
                style="font-family:'Inter',sans-serif;font-size:11px;font-weight:700;color:#111810;border-radius:99px;">
                {{ latestNews[0].tag }}
              </v-chip>
              <div class="d-flex align-center ga-1">
                <v-icon size="13" color="rgba(255,255,255,0.5)">mdi-clock-outline</v-icon>
                <span style="font-family:'Inter',sans-serif;font-size:12px;color:rgba(255,255,255,0.5);">{{ latestNews[0].readTime }}</span>
              </div>
            </div>

            <v-btn to="/news" color="#a8e47a" variant="flat" rounded="lg" size="large"
              append-icon="mdi-arrow-right"
              style="text-transform:none;font-family:'Inter',sans-serif;font-weight:700;font-size:14px;color:#111810;">
              Read Full Story
            </v-btn>
          </div>

        </div>
      </transition>

    </div>

    <!-- ── Dot + Arrow navigation ── -->
    <div class="hero-nav">
      <v-btn icon variant="outlined" size="small" @click="heroPrev" :style="navStyle">
        <v-icon size="14">mdi-arrow-left</v-icon>
      </v-btn>
      <div class="d-flex align-center ga-2">
        <button
          v-for="(_, i) in 5" :key="i"
          @click="heroGo(i)"
          class="dot-btn"
          :class="{ active: i === heroIdx, light: isDarkSlide }"
        />
      </div>
      <v-btn icon variant="outlined" size="small" @click="heroNext" :style="navStyle">
        <v-icon size="14">mdi-arrow-right</v-icon>
      </v-btn>
    </div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const heroStats = [
  { pre: '', num: '000', suf: '',  label: 'Startups Incubated', delta: 'Update later' },
  { pre: '', num: '00',  suf: '',  label: 'Spin-offs Created',  delta: 'Update later' },
  { pre: '', num: '00',  suf: '',  label: 'IP Filed / Licensed',delta: 'Update later' },
  { pre:'₱', num: '0.0', suf: 'B', label: 'Revenue Generated',  delta: 'Update later' },
]

const upcomingEvents = [
  {
    day: '14', month: 'JUL',
    type: 'BOOTCAMP',
    title: 'Startup Commercialization Bootcamp',
    location: 'TBI Main Hub, CSU',
    audience: 'All Incubatees',
    color: '#25671E',
    slug: 'startup-commercialization-bootcamp',
  },
  {
    day: '22', month: 'JUL',
    type: 'PITCH COMPETITION',
    title: 'Regional Startup Pitchfest 2025',
    location: 'Butuan City Convention Center',
    audience: 'Open to All',
    color: '#3a9e30',
    slug: 'regional-startup-pitchfest-2025',
  },
  {
    day: '09', month: 'AUG',
    type: 'HACKATHON',
    title: 'NAVIGATU ICT Hackathon 2025',
    location: 'CSU ICT Building',
    audience: 'Tech Founders & Students',
    color: '#C07A00',
    slug: 'navigatu-ict-hackathon-2025',
  },
]

const latestNews = [
  {
    tag: 'Partnership',
    readTime: '4 min read',
    headline: 'CSU-TBI Signs MOU with DOST-PCIEERD for Expanded Startup Funding',
    date: 'Mar 08, 2025',
  },
]

const darkSlides = [0, 1, 2, 4]

const HERO_INTERVAL = 6000
const heroIdx = ref(0)
let heroTimer = null

const isDarkSlide = computed(() => darkSlides.includes(heroIdx.value))
const navStyle = computed(() =>
  isDarkSlide.value
    ? 'border-color:rgba(255,255,255,0.3);color:#fff;background:rgba(0,0,0,0.2);'
    : 'border-color:#E8E0D8;color:#111810;'
)

function startHeroTimer() {
  clearInterval(heroTimer)
  heroTimer = setInterval(() => {
    heroIdx.value = (heroIdx.value + 1) % 5
  }, HERO_INTERVAL)
}

function heroGo(i)  { heroIdx.value = i; startHeroTimer() }
function heroNext() { heroIdx.value = (heroIdx.value + 1) % 5; startHeroTimer() }
function heroPrev() { heroIdx.value = (heroIdx.value - 1 + 5) % 5; startHeroTimer() }

onMounted(() => startHeroTimer())
onUnmounted(() => clearInterval(heroTimer))
</script>

<style scoped>
.hero-section { position: relative; overflow: hidden; }

.hero-slides { position: relative; height: calc(100vh - 68px); }

.hero-slide {
  position: absolute; inset: 0;
  display: flex; align-items: center;
}

.hero-container {
  padding-top: 0 !important; padding-bottom: 0 !important;
  padding-left: clamp(24px, 4vw, 64px) !important;
  padding-right: clamp(24px, 4vw, 64px) !important;
  height: 100%;
}

.hero-row {
  height: 100%;
  padding-bottom: 96px;
  padding-top: 24px;
}

/* ── Slide 1 ── */
.hero-slide-photo { height: calc(100vh - 68px); }
.photo-bg {
  position: absolute; inset: 0;
  background-image: url('/src/assets/home/HeroImg1.JPG');
  background-size: cover; background-position: center; z-index: 0;
}
.photo-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(17,24,16,0.78) 0%, rgba(17,24,16,0.45) 100%);
  z-index: 1;
}

/* ── Slide 2 ── */
.hero-slide-metrics { height: calc(100vh - 68px); }
.metrics-bg {
  position: absolute; inset: 0;
  background-image: url('/src/assets/home/HeroImg3.jpg');
  background-size: cover; background-position: center; z-index: 0;
}
.metrics-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(17,24,16,0.78) 0%, rgba(17,24,16,0.45) 100%);
  z-index: 1;
}
.glass-card {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  padding: 24px;
}

/* ── Slide 3 ── */
.hero-slide-tagline { height: calc(100vh - 68px); }
.tagline-bg {
  position: absolute; inset: 0;
  background-image: url('/src/assets/home/HeroImg2.JPG');
  background-size: cover; background-position: center; z-index: 0;
}
.tagline-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to right, rgba(247,240,240,0.92) 40%, rgba(17,50,15,0.85) 100%);
  z-index: 1;
}

/* ── Slide 4: Event cards ── */
.ev-card {
  background: #fff;
  border: 1px solid #E8E0D8;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ev-card__top {
  display: flex;
  align-items: stretch;
  gap: 0;
}

.ev-date-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
  min-width: 72px;
  flex-shrink: 0;
  border-radius: 0;
}

.ev-date-block__day {
  font-family: 'Instrument Serif', serif;
  font-size: 2.2rem;
  font-weight: 400;
  color: #fff;
  line-height: 1;
}

.ev-date-block__month {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  color: rgba(255,255,255,0.75);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 2px;
}

.ev-card__meta {
  padding: 16px 18px;
  flex: 1;
}

.ev-card__type {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8.5px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9eaa9c;
  margin-bottom: 6px;
}

.ev-card__title {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #111810;
  line-height: 1.35;
}

.ev-card__location {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #9eaa9c;
}

.ev-card__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  border-top: 1px solid #F0EDE8;
}

/* Taller cards for events slide */
.ev-card--tall {
  width: 100%;
  flex: 1;
}
.ev-card--tall .ev-date-block {
  padding: 32px 18px;
}
.ev-card--tall .ev-card__meta {
  padding: 24px 20px;
}

/* ── Slide 5: News full bleed ── */
.hero-slide-news { height: calc(100vh - 68px); position: absolute; inset: 0; }

.news-bg {
  position: absolute; inset: 0;
  background-image: url('/src/assets/home/HeroImg4.JPG');
  background-size: cover; background-position: center top; z-index: 0;
}

.news-scrim {
  position: absolute; inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.10) 0%,
    rgba(0,0,0,0.20) 45%,
    rgba(10,20,10,0.90) 100%
  );
  z-index: 1;
}

.slide-top-label {
  position: absolute;
  top: clamp(24px, 3vw, 40px);
  left: clamp(24px, 4vw, 64px);
  z-index: 3;
}

.news-top-right {
  position: absolute;
  top: clamp(20px, 3vw, 36px);
  right: clamp(24px, 4vw, 64px);
  z-index: 3;
}

.news-content {
  position: absolute;
  bottom: clamp(80px, 8vh, 120px);
  left: clamp(24px, 4vw, 64px);
  right: clamp(24px, 4vw, 64px);
  z-index: 3;
  max-width: 660px;
}

.news-headline {
  font-family: 'Instrument Serif', serif;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #fff;
  font-weight: 400;
  margin-bottom: 24px;
}

/* ── Slide label — uniform across all slides ── */
.slide-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.slide-label__text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  color: #a8e47a;
  text-transform: uppercase;
}

/* For light background slides (events) */
.slide-label__text--dark {
  color: #48A111;
}

/* ── Transitions ── */
.hero-fade-enter-active,
.hero-fade-leave-active { transition: opacity 0.7s ease; position: absolute; inset: 0; }
.hero-fade-enter-from, .hero-fade-leave-to  { opacity: 0; }
.hero-fade-enter-to,   .hero-fade-leave-from { opacity: 1; }

/* ── Nav ── */
.hero-nav {
  position: absolute; bottom: 28px; left: 0; right: 0;
  display: flex; align-items: center; justify-content: center;
  gap: 16px; z-index: 10;
}
.dot-btn {
  width: 8px; height: 8px; border-radius: 99px; border: none;
  background: #C8C0B8; cursor: pointer; transition: all 0.3s ease; padding: 0;
}
.dot-btn.active        { width: 24px; background: #25671E; }
.dot-btn.light         { background: rgba(255,255,255,0.4); }
.dot-btn.light.active  { background: #a8e47a; width: 24px; }
</style>
