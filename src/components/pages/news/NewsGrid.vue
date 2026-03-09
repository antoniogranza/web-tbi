<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <!-- ── FEATURED ARTICLE ─────────────────────────────── -->
      <template v-if="featured">
        <div class="d-flex align-center ga-3 mb-6">
          <v-divider length="22" color="#48A111" thickness="2" />
          <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
            Latest
          </span>
        </div>

        <v-card color="#111810" rounded="xl" elevation="0" class="mb-12" hover>
          <v-card-text class="pa-8 pa-md-12">
            <v-row align="center">
              <v-col cols="12" md="7">
                <div class="d-flex align-center ga-3 mb-5">
                  <v-chip :color="categoryColor(featured.category)" variant="flat" size="small"
                    style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;">
                    {{ featured.category }}
                  </v-chip>
                  <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(255,255,255,0.35);">
                    {{ formatDate(featured.published_at) }}
                  </span>
                </div>
                <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.6rem,2.5vw,2.2rem);color:#fff;line-height:1.15;letter-spacing:-0.025em;margin-bottom:16px;">
                  {{ featured.title }}
                </div>
                <p style="font-size:14px;color:rgba(255,255,255,0.55);line-height:1.74;margin-bottom:28px;">
                  {{ featured.excerpt }}
                </p>
                <v-btn :color="categoryColor(featured.category)" variant="flat" rounded="lg"
                  append-icon="mdi-arrow-right"
                  style="text-transform:none;font-weight:700;color:#111810;">
                  Read Article
                </v-btn>
              </v-col>

              <v-col cols="12" md="4" offset-md="1">
                <v-sheet
                  v-if="featured.cover_url"
                  :style="`background:url('${featured.cover_url}') center/cover;border-radius:16px;height:260px;`"
                />
                <v-sheet v-else color="rgba(255,255,255,0.05)" rounded="xl" height="260"
                  class="d-flex align-center justify-center"
                  style="border:1px solid rgba(255,255,255,0.08);">
                  <v-icon icon="mdi-newspaper-variant-outline" size="48" color="rgba(255,255,255,0.15)" />
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>

      <!-- ── CATEGORY FILTER ──────────────────────────────── -->
      <div class="d-flex align-center ga-3 mb-6">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          All Articles
        </span>
      </div>

      <div class="d-flex flex-wrap ga-2 mb-8">
        <v-chip
          v-for="tab in filterTabs" :key="tab"
          :color="activeTab === tab ? '#25671E' : 'default'"
          :variant="activeTab === tab ? 'flat' : 'outlined'"
          size="small" style="cursor:pointer;font-size:12px;"
          @click="activeTab = tab"
        >
          {{ tab }}
        </v-chip>
      </div>

      <!-- ── LOADING ────────────────────────────────────────── -->
      <v-row v-if="loading">
        <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
          <v-skeleton-loader type="card" rounded="xl" />
        </v-col>
      </v-row>

      <!-- ── ERROR ─────────────────────────────────────────── -->
      <v-alert v-else-if="error" color="#48A111" variant="tonal" rounded="xl" icon="mdi-alert-circle-outline" class="mb-6">
        {{ error }}
      </v-alert>

      <!-- ── NEWS GRID ─────────────────────────────────────── -->
      <v-row v-else>
        <v-col v-for="article in filteredArticles" :key="article.id" cols="12" sm="6" md="4">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;" hover>
            <!-- Cover image -->
            <v-sheet v-if="article.cover_url"
              :style="`background:url('${article.cover_url}') center/cover;height:180px;border-radius:12px 12px 0 0;`" />
            <v-sheet v-else :color="categoryColor(article.category)" height="6"
              style="border-radius:12px 12px 0 0;opacity:0.7;" />

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

              <div style="font-weight:700;font-size:15px;color:#111810;line-height:1.35;margin-bottom:8px;">
                {{ article.title }}
              </div>
              <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:16px;">
                {{ article.excerpt }}
              </p>

              <v-divider class="mb-4" />

              <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center ga-2">
                  <v-icon size="13" color="#48A111">mdi-account-outline</v-icon>
                  <span style="font-size:12px;color:#6B7B6A;">{{ article.author || 'CSU TBI' }}</span>
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

        <!-- Empty state -->
        <v-col v-if="!filteredArticles.length" cols="12" class="text-center py-16">
          <v-icon icon="mdi-newspaper-variant-outline" size="56" color="#C8C0B8" class="mb-4" />
          <div style="font-family:'Instrument Serif',serif;font-size:1.4rem;color:#6B7B6A;">No articles yet</div>
          <p style="font-size:14px;color:#9eaa9c;margin-top:6px;">Check back soon for updates from CSU TBI.</p>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ── CONFIG ────────────────────────────────────────────────────
// Set your Supabase project URL and anon key here (or via env vars)
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY

// ── STATE ─────────────────────────────────────────────────────
const articles = ref([])
const loading  = ref(true)
const error    = ref(null)
const activeTab = ref('All')

const filterTabs = ['All', 'Announcement', 'Award', 'Research', 'Press Release']

// ── FETCH ─────────────────────────────────────────────────────
onMounted(async () => {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/news?select=*&order=published_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
        },
      }
    )
    if (!res.ok) throw new Error('Failed to load articles.')
    articles.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

// ── COMPUTED ──────────────────────────────────────────────────
// Latest article goes in the featured slot
const featured = computed(() => articles.value[0] ?? null)

// All articles except the featured one, filtered by tab
const filteredArticles = computed(() => {
  const rest = articles.value.slice(1)
  return activeTab.value === 'All'
    ? rest
    : rest.filter(a => a.category === activeTab.value)
})

// ── HELPERS ───────────────────────────────────────────────────
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