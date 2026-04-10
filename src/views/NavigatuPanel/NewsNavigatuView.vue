<template>
  <v-app>
    <!-- ===================== NAVIGATION BAR ===================== -->
    <v-app-bar flat color="white" border="b" height="64" style="transition: box-shadow 0.3s">
      <v-container class="d-flex align-center pa-0" fluid>
        <div class="d-flex align-center ml-4 ml-md-8">
          <v-img src="/images/NaviLogo.jpg" width="55" height="55" class="mr-3" cover />
          <div>
            <div class="nav-brand">NAVIGATÚ</div>
            <div class="nav-sub">Technology Business Incubator</div>
          </div>
        </div>

        <v-spacer />

        <div class="d-none d-md-flex align-center mr-6" style="gap: 4px">
          <v-btn variant="text" class="nav-link" to="/about-navigatu">About</v-btn>
          <v-btn variant="text" class="nav-link" to="/services-navigatu">Services</v-btn>
          <v-btn variant="text" class="nav-link" to="/coworking-navigatu">Coworking</v-btn>
          <v-btn variant="text" class="nav-link nav-link--active" to="/news-navigatu">News</v-btn>
          <v-btn variant="text" class="nav-link" to="/events-navigatu">Events</v-btn>
          <v-btn variant="text" icon size="small">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <button class="nav-apply-btn ml-2">Apply Now</button>
        </div>

        <v-app-bar-nav-icon class="d-flex d-md-none mr-2" @click="drawer = !drawer" />
      </v-container>
    </v-app-bar>

    <!-- Mobile Drawer -->
    <v-navigation-drawer v-model="drawer" temporary location="right" width="260">
      <v-list nav class="pt-4">
        <v-list-item title="About" prepend-icon="mdi-information-outline" to="/about-navigatu" />
        <v-list-item
          title="Services"
          prepend-icon="mdi-briefcase-outline"
          rounded="lg"
          class="mb-1"
          to="/services-navigatu"
        />
        <v-list-item
          title="Coworking"
          prepend-icon="mdi-office-building-outline"
          rounded="lg"
          class="mb-1"
          to="/coworking-navigatu"
        />
        <v-list-item
          title="News"
          prepend-icon="mdi-newspaper-variant-outline"
          rounded="lg"
          class="mb-1"
          to="/news-navigatu"
          active
        />
        <v-list-item
          title="Events"
          prepend-icon="mdi-calendar-outline"
          rounded="lg"
          class="mb-1"
          to="/events-navigatu"
        />
      </v-list>
      <template #append>
        <div class="pa-4">
          <button class="nav-apply-btn" style="width: 100%">Apply Now</button>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <!-- ===== PAGE HERO ===== -->
      <div class="news-hero">
        <div class="hero-pattern" />
        <v-container class="hero-inner py-16">
          <v-row align="center">
            <v-col cols="12" md="7">
              <div class="hero-eyebrow mb-3">
                <v-icon icon="mdi-newspaper-variant-outline" size="14" class="mr-1" />
                Latest Updates
              </div>
              <h1 class="hero-title">NAVIGATÚ <span class="hero-title-italic">News</span></h1>
              <p class="hero-sub mt-3">
                Stay up to date with the latest announcements, breakthroughs, and stories from
                Navigatú TBI and our growing startup ecosystem.
              </p>
            </v-col>
            <v-col cols="12" md="5" class="d-flex justify-end d-none d-md-flex">
              <div class="hero-deco-number">{{ news.length }}</div>
              <div class="hero-deco-label">Stories<br />Published</div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- ===== FILTER & SEARCH BAR ===== -->
      <div class="filter-bar">
        <v-container>
          <v-row align="center" justify="space-between">
            <!-- Category chips -->
            <v-col cols="12" md="7" class="d-flex flex-wrap align-center" style="gap: 8px">
              <button
                v-for="cat in displayCategories"
                :key="cat"
                class="cat-chip"
                :class="{ 'cat-chip--active': activeCategory === cat }"
                @click="activeCategory = cat"
              >
                {{ cat }}
              </button>
            </v-col>

            <!-- Search -->
            <v-col cols="12" md="4">
              <v-text-field
                v-model="searchQuery"
                placeholder="Search news..."
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                rounded="lg"
                hide-details
                bg-color="white"
                class="search-field"
              />
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- ===== FEATURED NEWS (first item) ===== -->
      <v-container fluid class="featured-section pt-12 pb-6" v-if="featuredItem">
        <v-container>
          <p class="section-eyebrow mb-4">
            <v-icon icon="mdi-star-four-points" size="13" class="mr-1" />
            Featured Story
          </p>
          <v-card
            class="featured-card"
            rounded="xl"
            elevation="0"
            @click="openDetail(featuredItem)"
          >
            <v-row no-gutters align="stretch">
              <!-- Image side -->
              <v-col cols="12" md="6">
                <div class="featured-img-wrap">
                  <v-img :src="featuredItem.image" height="100%" cover class="featured-img" />
                  <div class="featured-cat-badge">{{ featuredItem.category }}</div>
                </div>
              </v-col>

              <!-- Text side -->
              <v-col cols="12" md="6">
                <div class="featured-content pa-8 pa-md-10">
                  <div class="featured-meta mb-4">
                    <v-icon icon="mdi-map-marker-outline" size="15" class="mr-1" />
                    {{ featuredItem.location }}
                    <span class="meta-sep">·</span>
                    <v-icon icon="mdi-calendar-outline" size="15" class="mr-1" />
                    {{ featuredItem.date }}
                  </div>
                  <h2 class="featured-title mb-4">{{ featuredItem.title }}</h2>
                  <p class="featured-desc mb-6">{{ featuredItem.description }}</p>
                  <div class="d-flex align-center justify-space-between">
                    <div class="author-row">
                      <v-icon
                        icon="mdi-account-circle-outline"
                        size="15"
                        color="#607D8B"
                        class="mr-1"
                      />
                      <span class="author-name">{{ featuredItem.author }}</span>
                    </div>
                    <v-btn
                      variant="outlined"
                      color="primary"
                      rounded="lg"
                      size="small"
                      append-icon="mdi-arrow-right"
                      class="read-btn"
                      >Read More</v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-container>

      <!-- ===== NEWS GRID ===== -->
      <v-container fluid class="news-grid-section py-8 pb-16">
        <v-container>
          <!-- Results count -->
          <div class="d-flex align-center justify-space-between mb-6">
            <p class="results-count">
              Showing <strong>{{ filteredNews.length }}</strong>
              {{ activeCategory !== 'All' ? `"${activeCategory}"` : '' }} stories
            </p>
            <!-- Sort -->
            <v-select
              v-model="sortBy"
              :items="['Newest First', 'Oldest First', 'A–Z']"
              variant="outlined"
              density="compact"
              rounded="lg"
              hide-details
              style="max-width: 160px"
              class="sort-select"
            />
          </div>

          <!-- Empty state -->
          <div v-if="filteredNews.length === 0" class="empty-state">
            <v-icon icon="mdi-newspaper-remove-outline" size="64" color="#ccc" />
            <p class="empty-title mt-4">No stories found</p>
            <p class="empty-sub">Try a different category or search term.</p>
            <v-btn
              variant="outlined"
              color="primary"
              rounded="lg"
              class="mt-4"
              @click="resetFilters"
            >
              Clear Filters
            </v-btn>
          </div>

          <!-- Cards grid -->
          <v-row v-else>
            <v-col
              v-for="(item, index) in filteredNews"
              :key="item.id"
              cols="12"
              sm="6"
              md="4"
              :class="`card-col-${index}`"
            >
              <v-card
                class="news-card h-100"
                rounded="xl"
                elevation="0"
                hover
                @click="openDetail(item)"
              >
                <!-- Thumbnail -->
                <div class="news-thumb-wrap">
                  <v-img :src="item.image" height="200" cover class="news-thumb" />
                  <!-- Category badge -->
                  <div class="news-cat-badge" :style="{ background: categoryColor(item.category) }">
                    {{ item.category }}
                  </div>
                </div>

                <div class="news-body pa-5">
                  <!-- Meta row -->
                  <div class="news-meta-row mb-3">
                    <span class="news-meta-item">
                      <v-icon icon="mdi-map-marker-outline" size="13" class="mr-1" />
                      {{ item.location }}
                    </span>
                    <span class="news-meta-sep">·</span>
                    <span class="news-meta-item">
                      <v-icon icon="mdi-calendar-outline" size="13" class="mr-1" />
                      {{ item.date }}
                    </span>
                  </div>

                  <!-- Title -->
                  <h3 class="news-title mb-2">{{ item.title }}</h3>

                  <!-- Description -->
                  <p class="news-desc mb-4">{{ item.description }}</p>

                  <!-- Footer row -->
                  <div class="news-footer-row">
                    <div class="author-row">
                      <v-icon
                        icon="mdi-account-circle-outline"
                        size="14"
                        color="#90A4AE"
                        class="mr-1"
                      />
                      <span class="news-author">{{ item.author }}</span>
                    </div>
                    <v-btn
                      variant="text"
                      color="primary"
                      size="x-small"
                      append-icon="mdi-arrow-right"
                      class="news-read-btn"
                      >Read</v-btn
                    >
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <!-- Load More -->
          <div class="text-center mt-10" v-if="filteredNews.length > 0 && !allLoaded">
            <v-btn
              variant="outlined"
              color="primary"
              rounded="lg"
              size="large"
              :loading="loadingMore"
              @click="loadMore"
              prepend-icon="mdi-refresh"
              >Load More Stories</v-btn
            >
          </div>
        </v-container>
      </v-container>
    </v-main>

    <!-- FOOTER -->
    <footer class="footer-section">
      <v-container class="py-12">
        <v-row>
          <v-col cols="12" md="4" class="mb-8">
            <div class="footer-brand mb-1">NAVIGATÚ</div>
            <p class="footer-tag mb-4">Technology Business Incubator</p>
            <p class="footer-desc">
              Empowering the next generation of Filipino tech founders through mentorship,
              innovation, and community.
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
              <input class="nl-input" placeholder="your@email.com" />
              <button class="nl-btn">
                <v-icon size="17">mdi-send</v-icon>
              </button>
            </div>
          </v-col>
        </v-row>
        <div class="footer-hr" />
        <div class="d-flex flex-wrap justify-space-between align-center pt-6" style="gap: 8px">
          <p class="footer-copy">© 2024 Navigatú TBI. All Rights Reserved.</p>
          <p class="footer-copy">Empowering startups. Building futures.</p>
        </div>
      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const drawer = ref(false)
const searchQuery = ref('')
const activeCategory = ref('All')
const sortBy = ref('Newest First')
const loadingMore = ref(false)
const allLoaded = ref(false)
const loadingNews = ref(false)
const newsError = ref('')
const news = ref([])
const router = useRouter()

const categories = ['All', 'Announcement', 'Achievement', 'Partnership', 'Program', 'Research']

const displayCategories = computed(() => {
  const dynamic = news.value
    .map((n) => n.category || 'Other')
    .filter(Boolean)
    .map((n) => n.trim())
  return ['All', ...new Set([...categories.slice(1), ...dynamic])]
})

function categoryColor(cat) {
  const map = {
    Announcement: '#1565C0',
    Achievement: '#F9A825',
    Partnership: '#2E7D32',
    Program: '#6A1B9A',
    Research: '#C62828',
  }
  return map[cat] || '#546E7A'
}

function normalizeNewsItem(item) {
  return {
    ...item,
    fullDescription: item.fullDescription || item.full_description || item.description || '',
    tags:
      item.tags ||
      (item.tags_raw
        ? item.tags_raw
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : []) ||
      [],
    image: item.image || item.image_event || '/images/news/news1.jpg',
    category: item.category || 'Other',
    date: item.date || '',
    location: item.location || '',
    author: item.author || 'Navigatú',
  }
}

async function fetchNews() {
  loadingNews.value = true
  newsError.value = ''
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('tbi_id', 'navigatu')
      .eq('status', 'active')
      .order('date', { ascending: false })

    if (error) throw error

    news.value = Array.isArray(data) ? data.map(normalizeNewsItem) : []
  } catch (err) {
    newsError.value = err?.message || String(err)
  } finally {
    loadingNews.value = false
  }
}

onMounted(fetchNews)

const featuredItem = computed(() => news.value.find((n) => n.featured))

const filteredNews = computed(() => {
  let list = news.value.filter((n) => !n.featured)

  if (activeCategory.value !== 'All') {
    list = list.filter((n) => n.category === activeCategory.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.location.toLowerCase().includes(q),
    )
  }

  if (sortBy.value === 'Oldest First') list = [...list].reverse()
  if (sortBy.value === 'A–Z') list = [...list].sort((a, b) => a.title.localeCompare(b.title))
  return list
})

function openDetail(item) {
  if (!item?.id) return
  router.push({ name: 'NavigatuNewsDetail', params: { id: String(item.id) } })
}

function resetFilters() {
  activeCategory.value = 'All'
  searchQuery.value = ''
}

function loadMore() {
  loadingMore.value = true
  setTimeout(() => {
    loadingMore.value = false
    allLoaded.value = true
  }, 1200)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');

.v-application {
  font-family: 'DM Sans', sans-serif !important;
}

/* ── Navbar ──────────────────────────────────────────────────────────────────── */
.nav-brand {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.05rem;
  color: #1565c0;
  line-height: 1.1;
}
.nav-sub {
  font-size: 0.6rem;
  color: #9e9e9e;
  letter-spacing: 0.5px;
}
.nav-link {
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: #333 !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
}
.nav-link--active {
  color: #1565c0 !important;
  font-weight: 700 !important;
}

.nav-apply-btn {
  background: linear-gradient(135deg, #1565c0, #2563eb);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  padding: 9px 22px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(21, 101, 192, 0.35);
  transition: all 0.2s;
}

.nav-apply-btn:hover {
  box-shadow: 0 6px 22px rgba(21, 101, 192, 0.5);
  transform: translateY(-1px);
}

/* ── HERO ────────────────────────────────────────────────────────────────────── */
.news-hero {
  background: #0d47a1;
  position: relative;
  overflow: hidden;
}
.hero-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 10% 80%, rgba(255, 255, 255, 0.04) 0%, transparent 40%);
  pointer-events: none;
}
.hero-inner {
  position: relative;
  z-index: 1;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.hero-title {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.05;
  letter-spacing: -1px;
  margin: 0;
}
.hero-title-italic {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 600;
  color: #90caf9;
}
.hero-sub {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.8;
  max-width: 520px;
  margin: 0;
}
.hero-deco-number {
  font-family: 'Playfair Display', serif;
  font-size: 7rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.08);
  line-height: 1;
  align-self: center;
  margin-right: 12px;
  user-select: none;
}
.hero-deco-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 2px;
  align-self: center;
  line-height: 1.6;
}

/* ── FILTER BAR ──────────────────────────────────────────────────────────────── */
.filter-bar {
  background: #f5f7fb;
  border-bottom: 1px solid #e8eaf0;
  padding: 16px 0;
}
.cat-chip {
  display: inline-block;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #555;
  background: #ffffff;
  border: 1.5px solid #e0e4ef;
  border-radius: 20px;
  padding: 5px 16px;
  cursor: pointer;
  transition: all 0.18s ease;
  outline: none;
}
.cat-chip:hover {
  border-color: #1565c0;
  color: #1565c0;
}
.cat-chip--active {
  background: #1565c0;
  color: #ffffff;
  border-color: #1565c0;
}
.search-field {
  font-size: 0.85rem;
}

/* ── SECTION SHARED ──────────────────────────────────────────────────────────── */
.section-eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  color: #1565c0;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
}

/* ── FEATURED CARD ───────────────────────────────────────────────────────────── */
.featured-section {
  background: #ffffff;
}
.featured-card {
  border: 1px solid #e8eaf0;
  cursor: pointer;
  transition:
    box-shadow 0.22s ease,
    transform 0.22s ease;
  overflow: hidden;
}
.featured-card:hover {
  box-shadow: 0 16px 48px rgba(21, 101, 192, 0.14) !important;
  transform: translateY(-3px);
}
.featured-img-wrap {
  position: relative;
  height: 100%;
  min-height: 320px;
  overflow: hidden;
}
.featured-img {
  height: 100%;
}
.featured-cat-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #1565c0;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}
.featured-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.featured-meta {
  display: flex;
  align-items: center;
  font-size: 0.78rem;
  color: #888;
  gap: 4px;
}
.meta-sep {
  color: #ccc;
  margin: 0 4px;
}
.featured-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.3rem, 2.5vw, 1.7rem);
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
}
.featured-desc {
  font-size: 0.88rem;
  color: #666;
  line-height: 1.8;
  margin: 0;
}
.author-row {
  display: flex;
  align-items: center;
}
.author-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: #444;
}
.read-btn {
  text-transform: none !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
}

/* ── NEWS GRID ───────────────────────────────────────────────────────────────── */
.news-grid-section {
  background: #f5f7fb;
}

.results-count {
  font-size: 0.82rem;
  color: #888;
  margin: 0;
}
.sort-select {
  font-size: 0.82rem;
}

.news-card {
  background: #ffffff;
  border: 1px solid #edf0f7;
  cursor: pointer;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
  overflow: hidden;
}
.news-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 36px rgba(21, 101, 192, 0.12) !important;
}
.news-thumb-wrap {
  position: relative;
  overflow: hidden;
}
.news-thumb {
  display: block;
  width: 100%;
  transition: transform 0.4s ease;
}
.news-card:hover .news-thumb {
  transform: scale(1.04);
}

.news-cat-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}
.news-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}
.news-meta-item {
  display: inline-flex;
  align-items: center;
  font-size: 0.72rem;
  color: #999;
}
.news-meta-sep {
  color: #ddd;
  font-size: 0.72rem;
}
.news-title {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.35;
}
.news-desc {
  font-size: 0.78rem;
  color: #777;
  line-height: 1.7;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  overflow: hidden;
}
.news-footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.news-author {
  font-size: 0.7rem;
  font-weight: 600;
  color: #888;
}
.news-read-btn {
  text-transform: none !important;
  font-weight: 700 !important;
  letter-spacing: 0 !important;
}

/* ── EMPTY STATE ─────────────────────────────────────────────────────────────── */
.empty-state {
  text-align: center;
  padding: 60px 0;
}
.empty-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #bbb;
}
.empty-sub {
  font-size: 0.85rem;
  color: #ccc;
}

/* ── DETAIL DIALOG ───────────────────────────────────────────────────────────── */
.detail-dialog {
  overflow: hidden;
}
.detail-img-wrap {
  position: relative;
}
.detail-close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.detail-cat-badge {
  position: absolute;
  bottom: 16px;
  left: 20px;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 20px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}
.detail-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.detail-meta-text {
  font-size: 0.78rem;
  color: #888;
}
.detail-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.3rem, 2.5vw, 1.7rem);
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
}
.detail-full-desc {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.9;
}

/* ── FOOTER ── */
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
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.11);
  color: rgba(255, 255, 255, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.18s;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.13);
  color: #fff;
}

.footer-hr {
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
  margin-top: 32px;
}

.footer-copy {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.22);
  margin: 0;
}

.newsletter {
  display: flex;
  gap: 8px;
}

.nl-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 0.8rem;
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  outline: none;
}

.nl-input::placeholder {
  color: rgba(255, 255, 255, 0.28);
}

.nl-input:focus {
  border-color: rgba(255, 255, 255, 0.28);
}

.nl-btn {
  background: linear-gradient(135deg, #1565c0, #2563eb);
  color: #fff;
  border: none;
  border-radius: 12px;
  width: 42px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
