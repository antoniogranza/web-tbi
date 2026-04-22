<template>
  <v-sheet color="white" border>
    <v-container fluid class="pa-10 pa-md-16" ref="impactRef">

      <div class="d-flex align-center flex-wrap ga-4 mb-12">
        <div class="d-flex align-center ga-3">
          <v-divider length="22" color="#48A111" thickness="2" />
          <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;letter-spacing:0.18em;color:#48A111;text-transform:uppercase;">Live Impact</span>
        </div>
        <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.6rem,2.4vw,2.25rem);color:#111810;letter-spacing:-0.025em;flex:1;font-weight:400;">Numbers That Tell Our Story</div>
        <v-chip variant="tonal" color="#6B7B6A" size="small" style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;">FY 2024–2025</v-chip>
      </div>

      <v-row>
        <v-col v-for="(m, i) in impactMetrics" :key="m.label" cols="6" md="" style="flex:1;">
          <v-sheet color="transparent" :style="i < impactMetrics.length - 1 ? 'border-right:1px solid #E8E0D8;' : ''" class="pr-8">
            <div style="display:flex;align-items:baseline;gap:2px;line-height:1;margin-bottom:8px;">
              <span style="font-family:'Instrument Serif',serif;font-size:1.4rem;color:#25671E;letter-spacing:-0.02em;">{{ m.pre }}</span>
              <span style="font-family:'Instrument Serif',serif;font-size:2.75rem;color:#111810;letter-spacing:-0.05em;font-weight:400;">{{ displayed[i] }}</span>
              <span style="font-family:'Instrument Serif',serif;font-size:1.5rem;color:#25671E;font-weight:700;">{{ m.suf }}</span>
            </div>
            <div style="font-family:'Inter',sans-serif;font-size:13px;font-weight:500;color:#6B7B6A;line-height:1.5;margin-bottom:8px;letter-spacing:-0.005em;">{{ m.label }}</div>
            <v-chip color="#25671E" variant="tonal" size="x-small" prepend-icon="mdi-trending-up" style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;">{{ m.delta }}</v-chip>
          </v-sheet>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const impactMetrics = [
  { pre: '',  target: 0,   suf: '',  isFloat: false, label: 'Startups Incubated',  delta: 'Update later' },
  { pre: '',  target: 0,   suf: '',  isFloat: false, label: 'Spin-offs Created',   delta: 'Update later' },
  { pre: '',  target: 0,   suf: '',  isFloat: false, label: 'IP Filed / Licensed', delta: 'Update later' },
  { pre: '',  target: 0,   suf: '+', isFloat: false, label: 'Jobs Generated',      delta: 'Update later' },
  { pre: '₱', target: 0.0, suf: 'M', isFloat: true,  label: 'Revenue Generated',   delta: 'Update later' },
]

const displayed = reactive(impactMetrics.map(m => m.isFloat ? '0.0' : '0'))
const impactRef = ref(null)
const impactDone = ref(false)

function runCounters() {
  if (impactDone.value) return
  impactDone.value = true
  const DURATION = 1800, FPS = 60, FRAMES = DURATION / (1000 / FPS)
  impactMetrics.forEach((m, i) => {
    if (m.target === 0) return
    let f = 0
    const id = setInterval(() => {
      f++
      const eased = 1 - Math.pow(1 - Math.min(f / FRAMES, 1), 3)
      const cur = m.target * eased
      displayed[i] = m.isFloat ? cur.toFixed(1) : Math.floor(cur).toLocaleString()
      if (f >= FRAMES) clearInterval(id)
    }, 1000 / FPS)
  })
}

let obs
onMounted(() => {
  obs = new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) { runCounters(); obs.disconnect() } },
    { threshold: 0.2 }
  )
  if (impactRef.value?.$el) obs.observe(impactRef.value.$el)
})
onUnmounted(() => obs?.disconnect())
</script>
