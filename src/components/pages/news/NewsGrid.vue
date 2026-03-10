<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <template v-if="loading">
        <v-row class="mb-12">
          <v-col cols="12"><v-skeleton-loader type="image, article" rounded="xl" /></v-col>
        </v-row>
        <v-row>
          <v-col v-for="n in 5" :key="n" cols="12" sm="6" md="4">
            <v-skeleton-loader type="card" rounded="xl" />
          </v-col>
        </v-row>
      </template>

      <template v-else>

        <!-- ══ FEATURED ══════════════════════════════════════════ -->
        <template v-if="featured">
          <div class="d-flex align-center ga-3 mb-6">
            <v-divider length="22" color="#48A111" thickness="2" />
            <span class="mono-label">Featured</span>
          </div>

          <v-card color="white" rounded="xl" elevation="0" border
            style="border-color:#E8E0D8;margin-bottom:64px;cursor:pointer;" hover>
            <v-row no-gutters style="min-height:400px;">

              <!-- Cover -->
              <v-col cols="12" md="6" order="2" order-md="1">
                <div v-if="featured.cover_url"
                  :style="`background:url('${featured.cover_url}') center/cover;height:100%;min-height:300px;border-radius:12px 0 0 12px;`" />
                <div v-else class="d-flex align-center justify-center"
                  style="height:100%;min-height:300px;background:#F0EAE0;border-radius:12px 0 0 12px;">
                  <v-icon icon="mdi-newspaper-variant-outline" size="64" color="#C8C0B8" />
                </div>
              </v-col>

              <!-- Content -->
              <v-col cols="12" md="6" order="1" order-md="2">
                <div class="pa-8 pa-md-10 d-flex flex-column" style="height:100%;">
                  <div class="d-flex align-center ga-3 mb-5">
                    <v-chip :color="categoryColor(featured.category)" variant="flat" size="small"
                      style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;">
                      {{ featured.category }}
                    </v-chip>
                    <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#9eaa9c;">
                      {{ formatDate(featured.published_at) }}
                    </span>
                  </div>

                  <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.5rem,2.2vw,2rem);color:#111810;line-height:1.18;letter-spacing:-0.025em;margin-bottom:16px;">
                    {{ featured.title }}
                  </div>
                  <p style="font-size:14px;color:#6B7B6A;line-height:1.78;margin-bottom:auto;">
                    {{ featured.excerpt }}
                  </p>

                  <v-divider class="my-6" />

                  <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center ga-2">
                      <v-icon size="13" color="#48A111">mdi-account-outline</v-icon>
                      <span style="font-size:12px;color:#6B7B6A;">{{ featured.author }}</span>
                    </div>
                    <v-btn :color="categoryColor(featured.category)" variant="flat" rounded="lg"
                      append-icon="mdi-arrow-right" size="small"
                      style="text-transform:none;font-weight:700;color:#fff;"
                      @click="$router.push(`/news/${featured.id}`)">
                      Read Article
                    </v-btn>
                  </div>
                </div>
              </v-col>

            </v-row>
          </v-card>
        </template>

        <!-- ══ FILTER TABS ════════════════════════════════════════ -->
        <div class="d-flex align-center justify-space-between flex-wrap ga-4 mb-8">
          <div class="d-flex align-center ga-3">
            <v-divider length="22" color="#48A111" thickness="2" />
            <span class="mono-label">All Articles</span>
          </div>
          <div class="d-flex flex-wrap ga-2">
            <v-chip
              v-for="tab in filterTabs" :key="tab"
              :color="activeTab === tab ? '#25671E' : 'default'"
              :variant="activeTab === tab ? 'flat' : 'outlined'"
              size="small"
              style="cursor:pointer;font-size:11px;font-family:'Inter',sans-serif;font-weight:500;"
              @click="activeTab = tab"
            >
              {{ tab }}
              <span v-if="tab !== 'All'" style="margin-left:5px;opacity:0.6;">
                ({{ countByCategory(tab) }})
              </span>
            </v-chip>
          </div>
        </div>

        <!-- ══ NEWS GRID ══════════════════════════════════════════ -->
        <v-row v-if="filteredArticles.length">

          <!-- First 2: half-width with cover image -->
          <v-col v-for="article in filteredArticles.slice(0,2)" :key="article.id" cols="12" md="6">
            <v-card color="white" rounded="xl" elevation="0" border
              style="border-color:#E8E0D8;height:100%;cursor:pointer;" hover
              @click="$router.push(`/news/${article.id}`)">
              <div v-if="article.cover_url"
                :style="`background:url('${article.cover_url}') center/cover;height:200px;border-radius:12px 12px 0 0;`" />
              <div v-else
                :style="`height:6px;border-radius:12px 12px 0 0;background:${categoryColor(article.category)};opacity:0.7;`" />
              <v-card-text class="pa-6">
                <div class="d-flex align-center justify-space-between mb-3">
                  <v-chip :color="categoryColor(article.category)" variant="tonal" size="x-small"
                    style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                    {{ article.category }}
                  </v-chip>
                  <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#9eaa9c;">
                    {{ formatDate(article.published_at) }}
                  </span>
                </div>
                <div style="font-family:'Instrument Serif',serif;font-size:1.15rem;color:#111810;line-height:1.3;letter-spacing:-0.02em;margin-bottom:8px;">
                  {{ article.title }}
                </div>
                <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:16px;">
                  {{ article.excerpt }}
                </p>
                <v-divider class="mb-4" />
                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center ga-2">
                    <v-icon size="13" color="#48A111">mdi-account-outline</v-icon>
                    <span style="font-size:12px;color:#6B7B6A;">{{ article.author }}</span>
                  </div>
                  <v-btn variant="text" size="x-small" append-icon="mdi-arrow-right"
                    :color="categoryColor(article.category)"
                    style="text-transform:none;font-weight:600;font-size:12px;">
                    Read
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Remaining: third-width, no image -->
          <v-col v-for="article in filteredArticles.slice(2)" :key="article.id" cols="12" sm="6" md="4">
            <v-card color="white" rounded="xl" elevation="0" border
              style="border-color:#E8E0D8;height:100%;cursor:pointer;" hover
              @click="$router.push(`/news/${article.id}`)">
              <div :style="`height:4px;border-radius:12px 12px 0 0;background:${categoryColor(article.category)};opacity:0.6;`" />
              <v-card-text class="pa-6">
                <div class="d-flex align-center justify-space-between mb-3">
                  <v-chip :color="categoryColor(article.category)" variant="tonal" size="x-small"
                    style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                    {{ article.category }}
                  </v-chip>
                  <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#9eaa9c;">
                    {{ formatDate(article.published_at) }}
                  </span>
                </div>
                <div style="font-family:'Instrument Serif',serif;font-size:1rem;color:#111810;line-height:1.3;letter-spacing:-0.02em;margin-bottom:8px;">
                  {{ article.title }}
                </div>
                <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:16px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
                  {{ article.excerpt }}
                </p>
                <v-divider class="mb-4" />
                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center ga-2">
                    <v-icon size="13" color="#48A111">mdi-account-outline</v-icon>
                    <span style="font-size:12px;color:#6B7B6A;">{{ article.author }}</span>
                  </div>
                  <v-btn variant="text" size="x-small" append-icon="mdi-arrow-right"
                    :color="categoryColor(article.category)"
                    style="text-transform:none;font-weight:600;font-size:12px;">
                    Read
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

        </v-row>

        <!-- Empty state -->
        <div v-else class="text-center py-16">
          <v-icon icon="mdi-newspaper-variant-outline" size="56" color="#C8C0B8" class="mb-4" />
          <div style="font-family:'Instrument Serif',serif;font-size:1.4rem;color:#6B7B6A;">
            No articles in this category
          </div>
          <p style="font-size:14px;color:#9eaa9c;margin-top:6px;">Check back soon for updates from CSU TBI.</p>
          <v-btn variant="text" color="#25671E" class="mt-4"
            style="text-transform:none;" @click="activeTab = 'All'">
            View all articles
          </v-btn>
        </div>

      </template>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const filterTabs = ['All', 'Announcement', 'Award', 'Research', 'Press Release']
const activeTab  = ref('All')
const loading    = ref(true)
const articles   = ref([])

// ── Mock data — swap fetchArticles() for real Supabase call later ──
const MOCK_ARTICLES = [
  {
    id: 1,
    title: 'CSU TBI Receives DOST-PCIEERD Grant for Agri-Tech Cohort 2025',
    excerpt: 'The Technology Business Incubator of Caraga State University has been awarded a new funding grant to support the next cohort of agriculture-focused technology startups in the region.',
    category: 'Announcement',
    author: 'CSU TBI Team',
    cover_url: '',
    published_at: '2026-02-15T08:00:00Z',
  },
  {
    id: 2,
    title: 'TBI Startup AquaSense Wins National Innovation Challenge',
    excerpt: 'AquaSense, an IoT-based water quality monitoring startup incubated at CSU TBI, took home the top prize at the DOST National Innovation Challenge held in Pasay City.',
    category: 'Award',
    author: 'Maria Santos',
    cover_url: '',
    published_at: '2026-01-28T08:00:00Z',
  },
  {
    id: 3,
    title: 'New IP Filing: Biodegradable Packaging from Banana Fiber',
    excerpt: 'Researchers at CSU in collaboration with TBI-incubated startup GreenWrap have successfully filed a patent for a novel biodegradable packaging material derived from banana fiber.',
    category: 'Research',
    author: 'Dr. Ramon Cruz',
    cover_url: '',
    published_at: '2026-01-10T08:00:00Z',
  },
  {
    id: 4,
    title: 'CSU TBI Opens Applications for Spring 2026 Incubation Cohort',
    excerpt: 'Applications are now open for the Spring 2026 cohort. Priority sectors include AgriTech, HealthTech, and CleanEnergy. Deadline for submissions is March 31, 2026.',
    category: 'Announcement',
    author: 'CSU TBI Team',
    cover_url: '',
    published_at: '2025-12-20T08:00:00Z',
  },
  {
    id: 5,
    title: 'Partnership Signed with DTI Region XIII for Startup Commercialization',
    excerpt: 'CSU TBI and the Department of Trade and Industry Region XIII have formalized a memorandum of agreement to fast-track the commercialization of startups coming out of the incubator.',
    category: 'Press Release',
    author: 'Office of the Director',
    cover_url: '',
    published_at: '2025-12-05T08:00:00Z',
  },
  {
    id: 6,
    title: 'TBI Graduates 3rd Cohort: 8 Startups Advance to Pre-Seed Stage',
    excerpt: 'The third cohort of CSU TBI officially graduated last November, with 8 out of 10 startups advancing to pre-seed funding discussions with regional angel investors.',
    category: 'Announcement',
    author: 'CSU TBI Team',
    cover_url: '',
    published_at: '2025-11-18T08:00:00Z',
  },
  {
    id: 7,
    title: 'HealthTrack PH Named Top 10 Health Startup in Southeast Asia',
    excerpt: 'HealthTrack PH, a CSU TBI alumni startup, was recognized among the Top 10 Health Startups in Southeast Asia by the SEA Health Innovation Index 2025.',
    category: 'Award',
    author: 'Maria Santos',
    cover_url: '',
    published_at: '2025-11-02T08:00:00Z',
  },
  {
    id: 8,
    title: 'Research Brief: IoT Applications in Mindanao Small-Scale Fisheries',
    excerpt: 'A new research brief published by CSU TBI documents the impact of IoT-based monitoring tools on productivity and sustainability outcomes for small-scale fishers in Caraga.',
    category: 'Research',
    author: 'Dr. Lina Reyes',
    cover_url: '',
    published_at: '2025-10-14T08:00:00Z',
  },
  {
    id: 9,
    title: 'CSU TBI Joins ASEAN Incubator Network',
    excerpt: 'CSU TBI has been formally admitted to the ASEAN Incubator Network, opening new pathways for regional collaboration, cross-border mentorship, and international funding access.',
    category: 'Press Release',
    author: 'Office of the Director',
    cover_url: '',
    published_at: '2025-09-30T08:00:00Z',
  },
]

async function fetchArticles() {
  // TODO: Replace with Supabase fetch when ready
  // const res = await fetch(`${SUPABASE_URL}/rest/v1/news?select=*&order=published_at.desc`, {
  //   headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` }
  // })
  // articles.value = await res.json()

  await new Promise(r => setTimeout(r, 600)) // simulate network delay
  articles.value = MOCK_ARTICLES
}

onMounted(async () => {
  await fetchArticles()
  loading.value = false
})

const featured          = computed(() => articles.value[0] ?? null)
const filteredArticles  = computed(() => {
  const rest = articles.value.slice(1)
  return activeTab.value === 'All'
    ? rest
    : rest.filter(a => a.category === activeTab.value)
})
const countByCategory   = (cat) => articles.value.slice(1).filter(a => a.category === cat).length

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
</script>

<style scoped>
.mono-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: #48A111;
  text-transform: uppercase;
}
</style>
