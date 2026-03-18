<template>
  <v-sheet color="#F7F0F0" style="min-height:100vh;">

    <!-- ── HERO IMAGE ─────────────────────────────────────────── -->
    <div class="article-hero">
      <div v-if="article.cover_url"
        :style="`background:url('${article.cover_url}') center/cover;height:100%;`" />
      <div v-else class="article-hero-placeholder">
        <v-icon icon="mdi-newspaper-variant-outline" size="72" color="rgba(255,255,255,0.15)" />
      </div>
      <div class="article-hero-overlay" />

      <!-- Back button -->
      <div class="article-hero-back">
        <v-btn variant="outlined" rounded="lg" prepend-icon="mdi-arrow-left"
          style="border-color:rgba(255,255,255,0.3);color:#fff;text-transform:none;font-family:'Inter',sans-serif;font-weight:500;font-size:13px;backdrop-filter:blur(8px);background:rgba(0,0,0,0.2);"
          @click="$router.back()">
          Back to News
        </v-btn>
      </div>

      <!-- Category + title over image -->
      <div class="article-hero-content">
        <v-container style="max-width:860px;">
          <v-chip :color="categoryColor(article.category)" variant="flat" size="small" class="mb-4"
            style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;">
            {{ article.category }}
          </v-chip>
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,3.5vw,3rem);color:#fff;line-height:1.1;letter-spacing:-0.03em;margin-bottom:20px;">
            {{ article.title }}
          </div>
          <div class="d-flex align-center flex-wrap ga-4">
            <div class="d-flex align-center ga-2">
              <v-icon size="14" color="rgba(255,255,255,0.6)">mdi-account-outline</v-icon>
              <span style="font-size:13px;color:rgba(255,255,255,0.7);font-family:'Inter',sans-serif;">
                {{ article.author }}
              </span>
            </div>
            <div class="d-flex align-center ga-2">
              <v-icon size="14" color="rgba(255,255,255,0.6)">mdi-calendar-outline</v-icon>
              <span style="font-size:13px;color:rgba(255,255,255,0.7);font-family:'Inter',sans-serif;">
                {{ formatDate(article.published_at) }}
              </span>
            </div>
            <div class="d-flex align-center ga-2">
              <v-icon size="14" color="rgba(255,255,255,0.6)">mdi-clock-outline</v-icon>
              <span style="font-size:13px;color:rgba(255,255,255,0.7);font-family:'Inter',sans-serif;">
                {{ readTime }} min read
              </span>
            </div>
          </div>
        </v-container>
      </div>
    </div>

    <!-- ── ARTICLE BODY ───────────────────────────────────────── -->
    <v-container style="max-width:860px;padding:60px 24px 80px;">

      <!-- Lead / excerpt -->
      <p class="article-lead">{{ article.excerpt }}</p>

      <v-divider class="my-8" />

      <!-- Body content -->
      <div class="article-body" v-html="article.body" />

      <v-divider class="my-10" />

      <!-- ── TAGS ── -->
      <div v-if="article.tags?.length" class="d-flex flex-wrap align-center ga-2 mb-10">
        <span style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#9eaa9c;">
          Tags
        </span>
        <v-chip v-for="tag in article.tags" :key="tag"
          variant="outlined" size="small"
          style="border-color:#E0DDD5;color:#6B7B6A;font-size:11px;font-family:'Inter',sans-serif;">
          {{ tag }}
        </v-chip>
      </div>

      <!-- ── SHARE ── -->
      <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;" class="mb-12">
        <v-card-text class="pa-6 d-flex align-center justify-space-between flex-wrap ga-4">
          <div>
            <div style="font-family:'Instrument Serif',serif;font-size:1.1rem;color:#111810;margin-bottom:4px;">
              Found this useful?
            </div>
            <p style="font-size:13px;color:#6B7B6A;margin:0;">Share this article with your network.</p>
          </div>
          <div class="d-flex ga-2">
            <v-btn icon variant="outlined" size="small" style="border-color:#E8E0D8;"
              @click="share('facebook')">
              <v-icon size="16" color="#6B7B6A">mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon variant="outlined" size="small" style="border-color:#E8E0D8;"
              @click="share('twitter')">
              <v-icon size="16" color="#6B7B6A">mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon variant="outlined" size="small" style="border-color:#E8E0D8;"
              @click="copyLink">
              <v-icon size="16" color="#6B7B6A">mdi-link-variant</v-icon>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>

      <!-- ── RELATED ARTICLES ── -->
      <div v-if="related.length">
        <div class="d-flex align-center ga-3 mb-6">
          <v-divider length="22" color="#48A111" thickness="2" />
          <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
            Related Articles
          </span>
        </div>
        <v-row>
          <v-col v-for="rel in related" :key="rel.id" cols="12" sm="4">
            <v-card color="white" rounded="xl" elevation="0" border
              style="border-color:#E8E0D8;cursor:pointer;" hover
              @click="$router.push(`/news/${rel.id}`)">
              <div :style="`height:4px;border-radius:12px 12px 0 0;background:${categoryColor(rel.category)};`" />
              <v-card-text class="pa-5">
                <v-chip :color="categoryColor(rel.category)" variant="tonal" size="x-small" class="mb-3"
                  style="font-family:'JetBrains Mono',monospace;font-size:9px;text-transform:uppercase;">
                  {{ rel.category }}
                </v-chip>
                <div style="font-family:'Instrument Serif',serif;font-size:1rem;color:#111810;line-height:1.3;margin-bottom:6px;">
                  {{ rel.title }}
                </div>
                <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#9eaa9c;">
                  {{ formatDate(rel.published_at) }}
                </span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>

    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// ── Mock data — same source as NewsGrid, replace with Supabase fetch ──
const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'CSU TBI Receives DOST-PCIEERD Grant for Agri-Tech Cohort 2025',
    excerpt: 'The Technology Business Incubator of Caraga State University has been awarded a new funding grant to support the next cohort of agriculture-focused technology startups in the region.',
    body: `<p>The Technology Business Incubator (TBI) of Caraga State University has officially received a funding grant from DOST-PCIEERD to support its upcoming Agri-Tech Cohort for 2025. This marks the third consecutive year that the TBI has secured national funding for its incubation programs.</p>
<p>The grant will cover mentorship programs, seed funding for selected startups, laboratory access fees, and participation in regional and national pitch competitions. A total of 10 startups will be accepted into the cohort, with priority given to innovations addressing food security, sustainable farming, and post-harvest technology.</p>
<h3>What This Means for Applicants</h3>
<p>Accepted startups will receive up to ₱500,000 in seed funding, plus access to CSU's research laboratories, legal and IP support, and a dedicated network of industry mentors from agriculture and technology sectors.</p>
<p>Applications open on March 1, 2026, and close on March 31, 2026. The program officially begins in May 2026.</p>`,
    category: 'Announcement',
    author: 'CSU TBI Team',
    cover_url: '',
    published_at: '2026-02-15T08:00:00Z',
    tags: ['DOST', 'AgriTech', 'Funding', 'Cohort 2025'],
  },
  {
    id: '2',
    title: 'TBI Startup AquaSense Wins National Innovation Challenge',
    excerpt: 'AquaSense, an IoT-based water quality monitoring startup incubated at CSU TBI, took home the top prize at the DOST National Innovation Challenge held in Pasay City.',
    body: `<p>AquaSense, a startup that developed an IoT-based water quality monitoring system for small-scale aquaculture, has won the top prize at the DOST National Innovation Challenge 2026 held in Pasay City last February 10.</p>
<p>The team, composed of four CSU engineering graduates, beat out 47 other teams from across the country. Their device — a low-cost, solar-powered sensor array that monitors pH, dissolved oxygen, and temperature in real time — was cited by judges for its practical design and clear commercial viability.</p>
<h3>From Lab to Market</h3>
<p>AquaSense joined the CSU TBI incubation program in 2024. Over 18 months, they refined their prototype, filed a utility model with IPOPHL, and piloted their technology with 12 fish pond operators in Agusan del Norte.</p>
<p>The ₱1,000,000 prize money will be used to scale production and expand to 50 additional farm sites by end of 2026.</p>`,
    category: 'Award',
    author: 'Maria Santos',
    cover_url: '',
    published_at: '2026-01-28T08:00:00Z',
    tags: ['AquaSense', 'IoT', 'Award', 'Aquaculture'],
  },
  {
    id: '3',
    title: 'New IP Filing: Biodegradable Packaging from Banana Fiber',
    excerpt: 'Researchers at CSU in collaboration with TBI-incubated startup GreenWrap have successfully filed a patent for a novel biodegradable packaging material derived from banana fiber.',
    body: `<p>A joint research team from Caraga State University and TBI-incubated startup GreenWrap has filed a patent application with the Intellectual Property Office of the Philippines (IPOPHL) for a biodegradable packaging material made from processed banana fiber.</p>
<p>The material, developed over two years of research, offers comparable tensile strength to conventional plastic packaging while being fully compostable within 90 days under standard soil conditions. Initial tests show it is also moisture-resistant, making it suitable for food packaging applications.</p>
<h3>Addressing Plastic Waste in Caraga</h3>
<p>Caraga produces significant volumes of banana agricultural waste annually. This innovation aims to convert that waste stream into a high-value packaging product, creating both environmental and economic benefits for the region.</p>`,
    category: 'Research',
    author: 'Dr. Ramon Cruz',
    cover_url: '',
    published_at: '2026-01-10T08:00:00Z',
    tags: ['IP', 'Research', 'GreenWrap', 'Sustainability'],
  },
]

const article = ref({})
const loading = ref(true)

async function loadArticle(id) {
  loading.value = true
  // TODO: Replace with Supabase fetch
  // const res = await fetch(`${SUPABASE_URL}/rest/v1/news?id=eq.${id}&select=*`, { headers: {...} })
  // const data = await res.json()
  // article.value = data[0]

  await new Promise(r => setTimeout(r, 300))
  article.value = MOCK_ARTICLES.find(a => a.id === id) ?? MOCK_ARTICLES[0]
  loading.value = false
}

onMounted(() => loadArticle(route.params.id))
watch(() => route.params.id, (id) => loadArticle(id))

// Related = same category, exclude current
const related = computed(() =>
  MOCK_ARTICLES.filter(a => a.id !== route.params.id && a.category === article.value.category).slice(0, 3)
)

// Estimated read time based on body word count
const readTime = computed(() => {
  const text = article.value.body?.replace(/<[^>]+>/g, '') ?? ''
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200))
})

const categoryColor = (cat) => ({
  'Announcement':  '#48A111',
  'Award':         '#F2B50B',
  'Research':      '#25671E',
  'Press Release': '#48A111',
}[cat] ?? '#25671E')

const formatDate = (iso) => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
}

function share(platform) {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(article.value.title)
  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter:  `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
  }
  window.open(links[platform], '_blank')
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href)
}
</script>

<style scoped>
.article-hero {
  position: relative;
  height: 480px;
  background: #111810;
  overflow: hidden;
}

.article-hero-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a221a;
}

.article-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(17,24,16,0.92) 0%, rgba(17,24,16,0.4) 60%, transparent 100%);
}

.article-hero-back {
  position: absolute;
  top: 28px;
  left: 32px;
  z-index: 2;
}

.article-hero-content {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 0 32px;
}

/* Lead paragraph */
.article-lead {
  font-family: 'Instrument Serif', serif;
  font-size: 1.2rem;
  color: #3a3a3a;
  line-height: 1.7;
  letter-spacing: -0.015em;
  margin: 0;
}

/* Body content typography */
.article-body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #3a3a3a;
  line-height: 1.85;
  letter-spacing: -0.005em;
}

.article-body :deep(p) {
  margin-bottom: 24px;
}

.article-body :deep(h3) {
  font-family: 'Instrument Serif', serif;
  font-size: 1.4rem;
  color: #111810;
  letter-spacing: -0.02em;
  margin: 40px 0 16px;
  font-weight: 400;
}

.article-body :deep(h2) {
  font-family: 'Instrument Serif', serif;
  font-size: 1.7rem;
  color: #111810;
  letter-spacing: -0.025em;
  margin: 48px 0 20px;
  font-weight: 400;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  padding-left: 24px;
  margin-bottom: 24px;
}

.article-body :deep(li) {
  margin-bottom: 8px;
}

.article-body :deep(blockquote) {
  border-left: 3px solid #48A111;
  padding: 12px 0 12px 24px;
  margin: 32px 0;
  font-family: 'Instrument Serif', serif;
  font-size: 1.1rem;
  color: #25671E;
  font-style: italic;
}

.article-body :deep(strong) {
  color: #111810;
  font-weight: 600;
}
</style>
