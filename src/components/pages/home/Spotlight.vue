<template>
  <v-sheet color="#FAFAF8" border>
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex justify-space-between align-end flex-wrap ga-4 mb-12">
        <div>
          <div class="d-flex align-center ga-3 mb-3">
            <v-divider length="22" color="#48A111" thickness="2" />
            <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.18em;color:#48A111;text-transform:uppercase;">Portfolio Spotlight</span>
          </div>
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.9rem,2.8vw,2.75rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;font-weight:400;">
            Featured Startup &amp; Technology
          </div>
        </div>
        <div class="d-flex align-center ga-3">
          <v-btn icon variant="outlined" size="small" @click="spotlightPrev" style="border-color:#E8E0D8;">
            <v-icon size="16">mdi-arrow-left</v-icon>
          </v-btn>
          <div class="d-flex ga-2">
            <v-btn v-for="(_, i) in slides" :key="i" icon variant="text" size="x-small" @click="spotlightGo(i)">
              <v-icon :color="i === spotlightIdx ? '#25671E' : '#B8B0A8'" size="10">
                {{ i === spotlightIdx ? 'mdi-circle' : 'mdi-circle-outline' }}
              </v-icon>
            </v-btn>
          </div>
          <v-btn icon variant="outlined" size="small" @click="spotlightNext" style="border-color:#E8E0D8;">
            <v-icon size="16">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>

      <v-row align="start">

        <!-- ── Left col: Photo card ── -->
        <v-col cols="12" md="4">
          <v-card color="#111810" rounded="xl" class="mb-6" style="overflow:hidden;">

            <!-- Real photo — shown when photoUrl is provided -->
            <div v-if="currentSlide.photoUrl" style="position:relative;aspect-ratio:4/5;overflow:hidden;">
              <img
                :src="currentSlide.photoUrl"
                :alt="currentSlide.name"
                style="width:100%;height:100%;object-fit:cover;display:block;"
              />
              <!-- Dark gradient overlay so chips stay readable -->
              <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(17,24,16,0.85) 0%, rgba(17,24,16,0.15) 50%, transparent 100%);" />
              <!-- Sector chip pinned bottom-left -->
              <div style="position:absolute;bottom:20px;left:20px;right:20px;" class="d-flex align-center justify-space-between">
                <div style="font-family:'Instrument Serif',serif;font-size:1.3rem;color:#fff;font-weight:400;letter-spacing:-0.02em;">
                  {{ currentSlide.logo }}
                </div>
                <v-chip color="#F2B50B" variant="tonal" size="x-small"
                  style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;">
                  {{ currentSlide.sector }}
                </v-chip>
              </div>
            </div>

            <!-- Placeholder — shown until photo is dropped in -->
            <div v-else style="position:relative;aspect-ratio:4/5;overflow:hidden;"
              class="d-flex flex-column align-center justify-center">
              <div
                style="position:absolute;inset:0;background:linear-gradient(135deg,#1a2818 0%,#111810 100%);"
              />
              <div style="position:relative;z-index:1;" class="d-flex flex-column align-center justify-center pa-8 text-center">
                <!-- Placeholder icon ring -->
                <v-avatar color="rgba(72,161,17,0.12)" rounded="xl" size="72" class="mb-5"
                  style="border:1px solid rgba(72,161,17,0.2);">
                  <v-icon icon="mdi-image-outline" size="32" color="rgba(72,161,17,0.5)" />
                </v-avatar>
                <div style="font-family:'Instrument Serif',serif;font-size:1.5rem;color:#fff;letter-spacing:-0.02em;margin-bottom:6px;font-weight:400;">
                  {{ currentSlide.logo }}
                </div>
                <v-chip color="#F2B50B" variant="tonal" size="x-small" class="mb-4"
                  style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;">
                  {{ currentSlide.sector }}
                </v-chip>
                <span style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.2);">
                  Startup Photo
                </span>
              </div>
            </div>

          </v-card>

          <!-- Meta stats below photo card -->
          <div class="d-flex flex-wrap ga-5">
            <div v-for="m in currentSlide.meta" :key="m.k">
              <div style="font-family:'Instrument Serif',serif;font-size:1.25rem;color:#111810;letter-spacing:-0.02em;font-weight:400;">{{ m.v }}</div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:#6B7B6A;margin-top:3px;">{{ m.k }}</div>
            </div>
          </div>
        </v-col>

        <!-- ── Right col: Content ── -->
        <v-col cols="12" md="8">
          <div class="d-flex flex-wrap ga-2 mb-5">
            <v-chip v-for="t in currentSlide.tags" :key="t" variant="outlined" size="small"
              style="border-color:#E8E0D8;color:#6B7B6A;font-family:'Inter',sans-serif;font-size:10px;font-weight:500;">
              {{ t }}
            </v-chip>
          </div>

          <div style="font-family:'Instrument Serif',serif;font-size:1.75rem;color:#111810;letter-spacing:-0.025em;margin-bottom:8px;font-weight:400;line-height:1.15;">
            {{ currentSlide.name }}
          </div>
          <p style="font-family:'Inter',sans-serif;font-size:15px;font-weight:400;color:#6B7B6A;line-height:1.65;margin-bottom:20px;letter-spacing:-0.01em;">
            {{ currentSlide.tagline }}
          </p>

          <v-sheet color="#FAFAF8" rounded="lg" border class="pa-5 mb-5"
            style="border-left:3px solid #F2B50B !important;">
            <p style="font-family:'Instrument Serif',serif;font-style:italic;font-size:1.2rem;color:#111810;line-height:1.55;margin:0;font-weight:400;">
              "{{ currentSlide.quote }}"
            </p>
          </v-sheet>

          <p style="font-family:'Inter',sans-serif;font-size:15px;font-weight:400;color:#6B7B6A;line-height:1.76;margin-bottom:28px;letter-spacing:-0.01em;">
            {{ currentSlide.body }}
          </p>

          <div class="d-flex flex-wrap ga-3 mb-6">
            <v-btn to="/impact" color="#25671E" variant="flat" rounded="lg" append-icon="mdi-arrow-right"
              style="text-transform:none;font-family:'Inter',sans-serif;font-weight:600;font-size:14px;">
              View Case Study
            </v-btn>
            <v-btn to="/program" variant="outlined" rounded="lg"
              style="text-transform:none;font-family:'Inter',sans-serif;font-weight:500;font-size:14px;border-color:#E8E0D8;color:#111810;">
              Same Program
            </v-btn>
          </div>

          <v-progress-linear :model-value="spotlightProgress" color="#25671E" bg-color="#E8E0D8" height="2" rounded />
        </v-col>

      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const SPOTLIGHT_INTERVAL = 7000
const spotlightIdx = ref(0)
const spotlightProgress = ref(0)
let spotlightTimer = null

const slides = [
  {
    logo: 'STARTUP A', sector: 'Sector', name: 'Startup Name A',
    photoUrl: '', // → drop in e.g. '/src/assets/spotlight/startup-a.jpg'
    tagline: 'Short tagline describing what this startup does and who it serves.',
    quote: 'Replace this with a real founder quote about their TBI incubation experience.',
    body: "Replace this with a 2–3 sentence story of the startup's journey, milestones, and achievements through TBI.",
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    meta: [{ v: '—', k: 'Key Metric 1' }, { v: '—', k: 'Key Metric 2' }, { v: '—', k: 'Cohort Year' }],
  },
  {
    logo: 'STARTUP B', sector: 'Sector', name: 'Startup Name B',
    photoUrl: '', // → drop in e.g. '/src/assets/spotlight/startup-b.jpg'
    tagline: 'Short tagline describing what this startup does and who it serves.',
    quote: 'Replace this with a real founder quote about their TBI incubation experience.',
    body: "Replace this with a 2–3 sentence story of the startup's journey, milestones, and achievements through TBI.",
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    meta: [{ v: '—', k: 'Key Metric 1' }, { v: '—', k: 'Key Metric 2' }, { v: '—', k: 'Cohort Year' }],
  },
  {
    logo: 'STARTUP C', sector: 'Sector', name: 'Startup Name C',
    photoUrl: '', // → drop in e.g. '/src/assets/spotlight/startup-c.jpg'
    tagline: 'Short tagline describing what this startup does and who it serves.',
    quote: 'Replace this with a real founder quote about their TBI incubation experience.',
    body: "Replace this with a 2–3 sentence story of the startup's journey, milestones, and achievements through TBI.",
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    meta: [{ v: '—', k: 'Key Metric 1' }, { v: '—', k: 'Key Metric 2' }, { v: '—', k: 'Cohort Year' }],
  },
]

const currentSlide = computed(() => slides[spotlightIdx.value])

function startSpotlightTimer() {
  clearInterval(spotlightTimer)
  spotlightProgress.value = 0
  setTimeout(() => { spotlightProgress.value = 100 }, 50)
  spotlightTimer = setInterval(() => {
    spotlightIdx.value = (spotlightIdx.value + 1) % slides.length
    spotlightProgress.value = 0
    setTimeout(() => { spotlightProgress.value = 100 }, 50)
  }, SPOTLIGHT_INTERVAL)
}

function spotlightGo(i)  { spotlightIdx.value = i; startSpotlightTimer() }
function spotlightNext() { spotlightIdx.value = (spotlightIdx.value + 1) % slides.length; startSpotlightTimer() }
function spotlightPrev() { spotlightIdx.value = (spotlightIdx.value - 1 + slides.length) % slides.length; startSpotlightTimer() }

onMounted(() => startSpotlightTimer())
onUnmounted(() => clearInterval(spotlightTimer))
</script>
