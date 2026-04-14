<template>
  <v-app>
    <!-- ===================== NAVIGATION BAR ===================== -->
    <v-app-bar
      app
      fixed
      location="top"
      flat
      color="white"
      border="b"
      height="64"
      style="position: fixed; top: 0; left: 0; right: 0; z-index: 1200; transition: box-shadow 0.3s"
    >
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
          <v-btn variant="text" class="nav-link" to="/news-navigatu">News</v-btn>
          <v-btn variant="text" class="nav-link" to="/events-navigatu">Events</v-btn>
          <div class="nav-search-hover">
            <input
              v-model="searchQuery"
              class="nav-search-field"
              type="text"
              placeholder="Search events..."
              @keyup.enter="runNavbarSearch"
            />
            <v-btn
              variant="text"
              icon
              size="small"
              class="nav-search-icon-btn"
              @click="runNavbarSearch"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </div>
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
        />
        <v-list-item
          title="Events"
          prepend-icon="mdi-calendar-outline"
          rounded="lg"
          class="mb-1"
          to="/events-navigatu"
          active
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <!-- ===== PAGE HERO ===== -->
      <div class="events-hero">
        <div class="hero-circles">
          <div class="hero-circle hero-circle--1" />
          <div class="hero-circle hero-circle--2" />
          <div class="hero-circle hero-circle--3" />
        </div>
        <v-container class="hero-inner py-16">
          <v-row align="center">
            <v-col cols="12" md="8">
              <div class="hero-eyebrow mb-3">
                <v-icon icon="mdi-calendar-star-outline" size="14" class="mr-1" />
                What's Happening
              </div>
              <h1 class="hero-title">Upcoming <span class="hero-title-accent">Events</span></h1>
              <p class="hero-sub mt-3">
                Workshops, pitch nights, demo days, and networking sessions — all designed to fuel
                your startup journey at Navigatú TBI.
              </p>

              <!-- Quick toggle: Upcoming / Past -->
              <div class="view-toggle mt-6">
                <button
                  class="toggle-btn"
                  :class="{ 'toggle-btn--active': viewMode === 'upcoming' }"
                  @click="viewMode = 'upcoming'"
                >
                  <v-icon icon="mdi-clock-outline" size="15" class="mr-1" />
                  Upcoming
                </button>
                <button
                  class="toggle-btn"
                  :class="{ 'toggle-btn--active': viewMode === 'past' }"
                  @click="viewMode = 'past'"
                >
                  <v-icon icon="mdi-history" size="15" class="mr-1" />
                  Past Events
                </button>
              </div>
            </v-col>

            <!-- Mini stats widget -->
            <v-col cols="12" md="4" class="d-none d-md-flex justify-end">
              <div class="mini-stat-stack">
                <div class="mini-stat">
                  <div class="mini-stat-value">{{ upcomingCount }}</div>
                  <div class="mini-stat-label">Upcoming</div>
                </div>
                <div class="mini-stat-divider" />
                <div class="mini-stat">
                  <div class="mini-stat-value">{{ pastCount }}</div>
                  <div class="mini-stat-label">Past Events</div>
                </div>
                <div class="mini-stat-divider" />
                <div class="mini-stat">
                  <div class="mini-stat-value">{{ uniqueTypeCount }}</div>
                  <div class="mini-stat-label">Categories</div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- ===== LOADING STATE ===== -->
      <div v-if="loading" class="loading-state">
        <v-container class="py-16 text-center">
          <v-progress-circular indeterminate color="primary" size="48" />
          <p class="loading-text mt-4">Loading events...</p>
        </v-container>
      </div>

      <!-- ===== ERROR STATE ===== -->
      <div v-else-if="fetchError" class="py-10">
        <v-container>
          <v-alert type="error" variant="tonal" rounded="lg">
            {{ fetchError }}
          </v-alert>
        </v-container>
      </div>

      <template v-else>
        <!-- ===== FILTER BAR ===== -->
        <div class="filter-bar">
          <v-container>
            <v-row align="center" justify="space-between">
              <v-col cols="12" md="7" class="d-flex flex-wrap align-center" style="gap: 8px">
                <button
                  v-for="type in eventTypes"
                  :key="type"
                  class="type-chip"
                  :class="{ 'type-chip--active': activeType === type }"
                  @click="activeType = type"
                >
                  <v-icon :icon="typeIcon(type)" size="13" class="mr-1" />
                  {{ type }}
                </button>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="searchQuery"
                  placeholder="Search events..."
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

        <!-- ===== NEXT EVENT SPOTLIGHT ===== -->
        <v-container
          fluid
          class="spotlight-section pt-12 pb-4"
          v-if="nextEvent && viewMode === 'upcoming'"
        >
          <v-container>
            <p class="section-eyebrow mb-5">
              <v-icon icon="mdi-lightning-bolt" size="13" class="mr-1" />
              Next Event
            </p>

            <div class="spotlight-card" @click="openDetail(nextEvent)" style="cursor: pointer">
              <!-- Left: date column -->
              <div
                class="spotlight-date-col"
                :style="{ background: typeColorMap[nextEvent.type] || '#1565C0' }"
              >
                <div class="spotlight-month">{{ nextEvent.month }}</div>
                <div class="spotlight-day">{{ nextEvent.day }}</div>
                <div class="spotlight-year">{{ nextEvent.year }}</div>
                <div class="spotlight-type-badge">{{ nextEvent.type }}</div>
              </div>

              <!-- Right: content -->
              <div class="spotlight-content pa-8">
                <!-- Banner image if available -->
                <div v-if="nextEvent.image" class="spotlight-banner-wrap mb-5">
                  <v-img
                    :src="nextEvent.image"
                    height="180"
                    cover
                    rounded="lg"
                    class="spotlight-banner-img"
                  />
                </div>

                <div class="spotlight-meta mb-3">
                  <v-icon icon="mdi-map-marker-outline" size="15" class="mr-1" color="#1565C0" />
                  <span>{{ nextEvent.location }}</span>
                  <span class="meta-sep mx-2">·</span>
                  <v-icon icon="mdi-clock-outline" size="15" class="mr-1" color="#1565C0" />
                  <span>{{ nextEvent.time }}</span>
                </div>

                <h2 class="spotlight-title mb-3">{{ nextEvent.title }}</h2>
                <p class="spotlight-desc mb-6">{{ nextEvent.description }}</p>

                <div class="d-flex align-center flex-wrap" style="gap: 12px">
                  <v-btn
                    color="primary"
                    rounded="lg"
                    size="large"
                    prepend-icon="mdi-information-outline"
                    class="register-btn"
                    @click.stop="openDetail(nextEvent)"
                    >View Details</v-btn
                  >
                  <v-btn
                    variant="outlined"
                    color="primary"
                    rounded="lg"
                    size="large"
                    prepend-icon="mdi-share-variant-outline"
                    class="share-btn"
                    >Share Event</v-btn
                  >
                </div>
              </div>
            </div>
          </v-container>
        </v-container>

        <!-- ===== EVENTS LIST ===== -->
        <v-container fluid class="events-list-section py-8 pb-16">
          <v-container>
            <div class="d-flex align-center justify-space-between mb-6">
              <p class="results-count">
                <strong>{{ filteredEvents.length }}</strong>
                {{ viewMode === 'upcoming' ? 'upcoming' : 'past' }}
                {{ activeType !== 'All' ? `"${activeType}"` : '' }} events
              </p>
              <v-select
                v-model="sortBy"
                :items="['Date (Soonest)', 'Date (Latest)', 'A–Z']"
                variant="outlined"
                density="compact"
                rounded="lg"
                hide-details
                style="max-width: 170px"
              />
            </div>

            <!-- Empty state -->
            <div v-if="filteredEvents.length === 0" class="empty-state">
              <v-icon icon="mdi-calendar-remove-outline" size="64" color="#ccc" />
              <p class="empty-title mt-4">No events found</p>
              <p class="empty-sub">Try a different category or search term.</p>
              <v-btn
                variant="outlined"
                color="primary"
                rounded="lg"
                class="mt-4"
                @click="resetFilters"
                >Clear Filters</v-btn
              >
            </div>

            <!-- Event cards -->
            <v-row v-else>
              <v-col v-for="event in filteredEvents" :key="event.id" cols="12" sm="6" md="4">
                <v-card
                  class="event-card h-100"
                  rounded="xl"
                  elevation="0"
                  hover
                  @click="openDetail(event)"
                >
                  <!-- Top: image or color band -->
                  <div
                    class="event-top-band"
                    :style="{ background: typeColorMap[event.type] || '#1565C0' }"
                  >
                    <!-- Show uploaded image if available, else show colored placeholder -->
                    <v-img
                      v-if="event.image"
                      :src="event.image"
                      height="160"
                      cover
                      class="event-banner-img"
                    />
                    <div v-else class="event-no-image">
                      <v-icon
                        :icon="typeIcon(event.type)"
                        size="40"
                        color="rgba(255,255,255,0.5)"
                      />
                    </div>

                    <div class="event-overlay" />

                    <!-- Date pill -->
                    <div class="event-date-pill">
                      <span class="date-pill-day">{{ event.day }}</span>
                      <span class="date-pill-month">{{ event.month }}</span>
                    </div>

                    <!-- Type badge -->
                    <div
                      class="event-type-badge"
                      :style="{ background: typeColorMap[event.type] || '#1565C0' }"
                    >
                      <v-icon :icon="typeIcon(event.type)" size="11" class="mr-1" />
                      {{ event.type }}
                    </div>

                    <!-- Past overlay -->
                    <div v-if="event.status === 'past'" class="past-overlay">
                      <span class="past-label">Completed</span>
                    </div>
                  </div>

                  <div class="event-body pa-5">
                    <!-- Meta row -->
                    <div class="event-meta-row mb-3">
                      <span class="event-meta-item">
                        <v-icon icon="mdi-map-marker-outline" size="13" class="mr-1" />
                        {{ event.location }}
                      </span>
                      <span class="event-meta-sep">·</span>
                      <span class="event-meta-item">
                        <v-icon icon="mdi-clock-outline" size="13" class="mr-1" />
                        {{ event.time }}
                      </span>
                    </div>

                    <h3 class="event-title mb-2">{{ event.title }}</h3>
                    <p class="event-desc mb-4">{{ event.description }}</p>

                    <!-- Footer: type tag + details button only (no registration) -->
                    <div class="event-footer">
                      <v-chip
                        size="x-small"
                        variant="tonal"
                        :color="event.status === 'past' ? 'secondary' : 'primary'"
                      >
                        {{ event.status === 'past' ? 'Completed' : 'Upcoming' }}
                      </v-chip>
                      <v-btn
                        size="x-small"
                        variant="tonal"
                        color="primary"
                        rounded="lg"
                        class="details-mini-btn"
                        @click.stop="openDetail(event)"
                        >Details</v-btn
                      >
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </template>
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
const activeType = ref('All')
const viewMode = ref('upcoming')
const sortBy = ref('Date (Soonest)')
const router = useRouter()

function runNavbarSearch() {
  searchQuery.value = searchQuery.value.trim()
}

// ── Supabase data state ───────────────────────────────────────────────────────
const events = ref([])
const loading = ref(true)
const fetchError = ref('')

// ── Static config ─────────────────────────────────────────────────────────────
const predefinedEventTypes = [
  'Workshop',
  'Pitch Night',
  'Demo Day',
  'Networking',
  'Training',
  'Summit',
  'Conference',
  'Other',
]

const eventTypes = computed(() => {
  const dynamic = events.value
    .map((e) => e.type || 'Other')
    .filter(Boolean)
    .map((t) => t.trim())
  return ['All', ...new Set([...predefinedEventTypes, ...dynamic])]
})

const typeColorMap = {
  Workshop: '#1565C0',
  'Pitch Night': '#6A1B9A',
  'Demo Day': '#E65100',
  Networking: '#2E7D32',
  Training: '#00695C',
  Summit: '#B71C1C',
  Conference: '#AD1457',
  Other: '#546E7A',
}

function typeIcon(type) {
  const map = {
    Workshop: 'mdi-school-outline',
    'Pitch Night': 'mdi-microphone-outline',
    'Demo Day': 'mdi-presentation',
    Networking: 'mdi-account-group-outline',
    Training: 'mdi-book-open-outline',
    Summit: 'mdi-flag-outline',
    Conference: 'mdi-domain',
    All: 'mdi-apps',
    Other: 'mdi-calendar-outline',
  }
  return map[type] || 'mdi-calendar-outline'
}

// ── Fetch from Supabase ───────────────────────────────────────────────────────
// Columns fetched match exactly what buildPayload() writes from AdminDashboard.vue:
//   tbi_id, title, type, status, day, month, year, time, location,
//   capacity, slots, registered, description, full_description, image, tags
async function fetchEvents() {
  loading.value = true
  fetchError.value = ''

  const { data, error } = await supabase
    .from('events')
    .select(
      'id, tbi_id, title, type, status, day, month, year, time, location, description, full_description, image, tags, capacity, slots, registered, created_at',
    )
    .eq('tbi_id', 'navigatu')
    .neq('status', 'draft') // hide drafts from the public page
    .order('created_at', { ascending: false })

  loading.value = false

  if (error) {
    fetchError.value = error.message
    return
  }

  events.value = data ?? []
}

onMounted(fetchEvents)

// ── Computed ──────────────────────────────────────────────────────────────────
const upcomingCount = computed(() => events.value.filter((e) => e.status === 'upcoming').length)
const pastCount = computed(() => events.value.filter((e) => e.status === 'past').length)
const uniqueTypeCount = computed(
  () => new Set(events.value.map((e) => e.type).filter(Boolean)).size,
)

// The first upcoming event becomes the spotlight
const nextEvent = computed(() => events.value.find((e) => e.status === 'upcoming'))

const filteredEvents = computed(() => {
  // filter by tab (upcoming / past)
  let list = events.value.filter((e) => e.status === viewMode.value)

  // exclude the spotlight from the list cards
  if (viewMode.value === 'upcoming' && nextEvent.value) {
    list = list.filter((e) => e.id !== nextEvent.value.id)
  }

  // filter by type chip
  if (activeType.value !== 'All') {
    list = list.filter((e) => e.type === activeType.value)
  }

  // search filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      (e) =>
        e.title?.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q) ||
        e.location?.toLowerCase().includes(q),
    )
  }

  // sort
  if (sortBy.value === 'Date (Latest)') list = [...list].reverse()
  if (sortBy.value === 'A–Z') list = [...list].sort((a, b) => a.title?.localeCompare(b.title))

  return list
})

// ── Methods ───────────────────────────────────────────────────────────────────
function openDetail(event) {
  if (!event?.id) return
  router.push({ name: 'NavigatuEventDetail', params: { id: String(event.id) } })
}

function resetFilters() {
  activeType.value = 'All'
  searchQuery.value = ''
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

.nav-search-hover {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.nav-search-field {
  width: 0;
  opacity: 0;
  border: 1px solid #d9e2f1;
  border-radius: 20px;
  padding: 0;
  font-size: 0.8rem;
  outline: none;
  transition: all 0.22s ease;
  pointer-events: none;
}

.nav-search-hover:hover .nav-search-field,
.nav-search-field:focus {
  width: 170px;
  opacity: 1;
  padding: 6px 12px;
  pointer-events: auto;
}

.nav-search-icon-btn {
  color: #3f4e63 !important;
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

/* ── Loading ─────────────────────────────────────────────────────────────────── */
.loading-state {
  background: #f5f7fb;
}
.loading-text {
  font-size: 0.88rem;
  color: #888;
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

.events-hero {
  position: relative;
  overflow: hidden;
  color: #fff;
  background:
    radial-gradient(circle at 10% 14%, rgba(255, 255, 255, 0.14), transparent 38%),
    radial-gradient(circle at 90% 8%, rgba(255, 255, 255, 0.12), transparent 32%),
    linear-gradient(135deg, #0d47a1 0%, #1565c0 58%, #2e7d32 100%);
}

.hero-circles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
}

.hero-circle--1 {
  width: 340px;
  height: 340px;
  top: -150px;
  right: -80px;
}

.hero-circle--2 {
  width: 220px;
  height: 220px;
  bottom: -60px;
  left: 10%;
}
.hero-circle--3 {
  width: 100px;
  height: 100px;
  top: 30%;
  right: 25%;
}
.hero-inner {
  position: relative;
  z-index: 1;
}
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.88);
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
.hero-title-accent {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 600;
  color: #ffd54f;
}
.hero-sub {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.8;
  max-width: 520px;
  margin: 0;
}
.view-toggle {
  display: inline-flex;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 4px;
  gap: 4px;
}
.toggle-btn {
  display: inline-flex;
  align-items: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  background: transparent;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  cursor: pointer;
  transition: all 0.18s ease;
  outline: none;
}
.toggle-btn--active {
  background: #ffffff;
  color: #1565c0;
}
.toggle-btn:hover:not(.toggle-btn--active) {
  color: #ffffff;
}
.mini-stat-stack {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px 28px;
  gap: 24px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.mini-stat {
  text-align: center;
}
.mini-stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
}
.mini-stat-label {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.55);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 4px;
}
.mini-stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
}

/* ── FILTER BAR ──────────────────────────────────────────────────────────────── */
.filter-bar {
  background: #ffffff;
  border-bottom: 1px solid #e8eaf0;
  padding: 14px 0;
}
.type-chip {
  display: inline-flex;
  align-items: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #555;
  background: #f5f7fb;
  border: 1.5px solid #e0e4ef;
  border-radius: 20px;
  padding: 5px 14px;
  cursor: pointer;
  transition: all 0.18s ease;
  outline: none;
}
.type-chip:hover {
  border-color: #1565c0;
  color: #1565c0;
}
.type-chip--active {
  background: #1565c0;
  color: #ffffff;
  border-color: #1565c0;
}

/* ── SHARED ──────────────────────────────────────────────────────────────────── */
.section-eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  color: #1565c0;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
}
.meta-sep {
  color: #ccc;
}
.results-count {
  font-size: 0.82rem;
  color: #888;
  margin: 0;
}

/* ── SPOTLIGHT CARD ──────────────────────────────────────────────────────────── */
.spotlight-section {
  background: #ffffff;
}
.spotlight-card {
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e8eaf0;
  box-shadow: 0 4px 24px rgba(21, 101, 192, 0.08);
  transition:
    box-shadow 0.22s ease,
    transform 0.22s ease;
}
.spotlight-card:hover {
  box-shadow: 0 12px 40px rgba(21, 101, 192, 0.14);
  transform: translateY(-2px);
}
@media (max-width: 599px) {
  .spotlight-card {
    flex-direction: column;
  }
}
.spotlight-date-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 28px;
  min-width: 130px;
  flex-shrink: 0;
  position: relative;
}
.spotlight-month {
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 2px;
  text-transform: uppercase;
}
.spotlight-day {
  font-family: 'Playfair Display', serif;
  font-size: 3.6rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
}
.spotlight-year {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 1px;
}
.spotlight-type-badge {
  position: absolute;
  bottom: 16px;
  font-size: 0.62rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.15);
  padding: 3px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.spotlight-content {
  flex: 1;
}
.spotlight-banner-wrap {
  border-radius: 12px;
  overflow: hidden;
}
.spotlight-banner-img {
  border-radius: 12px;
}
.spotlight-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.8rem;
  color: #555;
  gap: 4px;
}
.spotlight-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.3rem, 2.5vw, 1.8rem);
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.25;
}
.spotlight-desc {
  font-size: 0.88rem;
  color: #666;
  line-height: 1.8;
  margin: 0;
}
.register-btn {
  text-transform: none !important;
  font-weight: 700 !important;
  letter-spacing: 0 !important;
}
.share-btn {
  text-transform: none !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
}

/* ── EVENTS LIST ─────────────────────────────────────────────────────────────── */
.events-list-section {
  background: #f5f7fb;
}
.event-card {
  background: #ffffff;
  border: 1px solid #edf0f7;
  cursor: pointer;
  overflow: hidden;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
}
.event-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 36px rgba(21, 101, 192, 0.12) !important;
}
.event-top-band {
  position: relative;
  overflow: hidden;
  min-height: 160px;
}
.event-banner-img {
  display: block;
  width: 100%;
  transition: transform 0.4s ease;
}
.event-card:hover .event-banner-img {
  transform: scale(1.04);
}
.event-no-image {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.event-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.45) 100%);
}
.event-date-pill {
  position: absolute;
  bottom: 14px;
  left: 14px;
  background: #ffffff;
  border-radius: 10px;
  padding: 6px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
}
.date-pill-day {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a1a;
}
.date-pill-month {
  font-size: 0.6rem;
  font-weight: 700;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 1px;
}
.event-type-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  color: #fff;
  font-size: 0.62rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.past-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.past-label {
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 5px 16px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.event-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}
.event-meta-item {
  display: inline-flex;
  align-items: center;
  font-size: 0.72rem;
  color: #999;
}
.event-meta-sep {
  color: #ddd;
  font-size: 0.72rem;
}
.event-title {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
}
.event-desc {
  font-size: 0.78rem;
  color: #777;
  line-height: 1.7;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.event-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.details-mini-btn {
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
.detail-banner-wrap {
  position: relative;
}
.detail-banner-placeholder {
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.detail-banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 100%);
}
.detail-close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.detail-date-block {
  position: absolute;
  bottom: 20px;
  left: 24px;
  border-radius: 12px;
  padding: 10px 18px;
  text-align: center;
  z-index: 2;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
}
.ddb-day {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}
.ddb-month {
  font-size: 0.65rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}
.ddb-year {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 1px;
}
.dialog-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.3rem, 2.5vw, 1.65rem);
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
}
.dialog-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.dialog-info-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #f8f9fc;
  border-radius: 10px;
  padding: 12px;
}
.info-label {
  font-size: 0.65rem;
  font-weight: 700;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}
.info-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-top: 2px;
}
.dialog-desc {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.85;
}
.dialog-status-row {
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

/* ── FOOTER ──────────────────────────────────────────────────────────────────── */
.footer-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 2px;
}
.footer-tagline {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 1px;
  margin: 0;
}
.footer-copy {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}
</style>
