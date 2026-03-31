<template>
  <v-app>
    <v-app-bar flat color="white" border="b" height="64">
      <v-container class="d-flex align-center pa-0" fluid>
        <div class="d-flex align-center ml-4 ml-md-8">
          <v-img src="/images/NaviLogo.jpg" width="55" height="55" class="mr-3" cover />
          <div>
            <div class="nav-brand">NAVIGATU</div>
            <div class="nav-sub">Technology Business Incubator</div>
          </div>
        </div>

        <v-spacer />

        <div class="d-none d-md-flex align-center mr-6">
          <v-btn variant="text" class="nav-link" to="/about-navigatu">About</v-btn>
          <v-btn variant="text" class="nav-link" to="/services-navigatu">Services</v-btn>
          <v-btn variant="text" class="nav-link" to="/coworking-navigatu">Coworking</v-btn>
          <v-btn variant="text" class="nav-link" to="/news-navigatu">News</v-btn>
          <v-btn variant="text" class="nav-link nav-link--active" to="/events-navigatu"
            >Events</v-btn
          >
        </div>

        <v-app-bar-nav-icon class="d-flex d-md-none" @click="drawer = !drawer" />
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary location="right">
      <v-list nav>
        <v-list-item title="About" prepend-icon="mdi-information-outline" to="/about-navigatu" />
        <v-list-item
          title="Services"
          prepend-icon="mdi-briefcase-outline"
          to="/services-navigatu"
        />
        <v-list-item
          title="Coworking"
          prepend-icon="mdi-office-building-outline"
          to="/coworking-navigatu"
        />
        <v-list-item
          title="News"
          prepend-icon="mdi-newspaper-variant-outline"
          to="/news-navigatu"
        />
        <v-list-item
          title="Events"
          prepend-icon="mdi-calendar-star-outline"
          to="/events-navigatu"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <section class="event-hero">
        <v-container class="py-10 py-md-14">
          <v-btn
            variant="text"
            color="white"
            prepend-icon="mdi-arrow-left"
            class="back-btn mb-6"
            @click="router.push('/events-navigatu')"
          >
            Back to Events
          </v-btn>

          <template v-if="loading">
            <v-skeleton-loader type="heading, paragraph, paragraph" class="hero-skeleton" />
          </template>

          <template v-else-if="eventData">
            <div class="event-chip-row">
              <v-chip
                size="small"
                color="white"
                text-color="#1565C0"
                variant="flat"
                :prepend-icon="typeIcon(eventData.type)"
              >
                {{ eventData.type }}
              </v-chip>
              <v-chip
                size="small"
                :color="eventData.status === 'upcoming' ? '#C8E6C9' : '#E0E0E0'"
                text-color="#263238"
                variant="flat"
              >
                {{ eventData.status === 'upcoming' ? 'Upcoming Event' : 'Completed Event' }}
              </v-chip>
            </div>

            <h1 class="detail-title mt-4">{{ eventData.title }}</h1>

            <div class="meta-row mt-4">
              <span class="meta-item">
                <v-icon icon="mdi-calendar-outline" size="16" class="mr-1" />
                {{ eventDateLabel }}
              </span>
              <span class="meta-dot">•</span>
              <span class="meta-item">
                <v-icon icon="mdi-clock-outline" size="16" class="mr-1" />
                {{ eventData.time || 'TBA' }}
              </span>
              <span class="meta-dot">•</span>
              <span class="meta-item">
                <v-icon icon="mdi-map-marker-outline" size="16" class="mr-1" />
                {{ eventData.location || 'Navigatu TBI' }}
              </span>
            </div>
          </template>
        </v-container>
      </section>

      <v-container class="py-8 py-md-12">
        <template v-if="loading">
          <v-skeleton-loader type="image" class="mb-8" />
          <v-skeleton-loader type="paragraph, paragraph, paragraph, paragraph" />
        </template>

        <v-alert v-else-if="error" type="error" variant="tonal" rounded="lg" class="mb-6">
          {{ error }}
        </v-alert>

        <v-alert v-else-if="!eventData" type="warning" variant="tonal" rounded="lg" class="mb-6">
          This event could not be found.
        </v-alert>

        <template v-else>
          <v-card rounded="xl" elevation="0" class="cover-card mb-8">
            <v-img :src="eventData.image" cover height="460" class="detail-image" />
          </v-card>

          <v-row>
            <v-col cols="12" md="8">
              <article class="article-body">
                <p class="lead-text">{{ eventData.description }}</p>
                <div class="body-text" style="white-space: pre-line">
                  {{ eventData.full_description || eventData.description }}
                </div>
              </article>
            </v-col>

            <v-col cols="12" md="4">
              <v-card rounded="xl" class="meta-card pa-5" elevation="0">
                <h3 class="meta-card-title mb-4">Event Overview</h3>
                <div class="meta-list-item">
                  <v-icon icon="mdi-tag-outline" size="16" color="#1565C0" class="mr-2" />
                  <span>{{ eventData.type }}</span>
                </div>
                <div class="meta-list-item">
                  <v-icon icon="mdi-calendar-outline" size="16" color="#1565C0" class="mr-2" />
                  <span>{{ eventDateLabel }}</span>
                </div>
                <div class="meta-list-item">
                  <v-icon icon="mdi-clock-outline" size="16" color="#1565C0" class="mr-2" />
                  <span>{{ eventData.time || 'TBA' }}</span>
                </div>
                <div class="meta-list-item">
                  <v-icon icon="mdi-map-marker-outline" size="16" color="#1565C0" class="mr-2" />
                  <span>{{ eventData.location || 'Navigatu TBI' }}</span>
                </div>

                <v-divider class="my-4" />

                <div class="meta-capacity-grid">
                  <div class="cap-box">
                    <div class="cap-label">Capacity</div>
                    <div class="cap-value">{{ eventData.capacity ?? 'N/A' }}</div>
                  </div>
                  <div class="cap-box">
                    <div class="cap-label">Slots</div>
                    <div class="cap-value">{{ eventData.slots ?? 'N/A' }}</div>
                  </div>
                  <div class="cap-box">
                    <div class="cap-label">Registered</div>
                    <div class="cap-value">{{ eventData.registered ?? 'N/A' }}</div>
                  </div>
                </div>

                <v-divider class="my-4" />

                <div class="d-flex flex-wrap" style="gap: 8px">
                  <v-chip
                    v-for="tag in eventData.tags"
                    :key="tag"
                    size="small"
                    variant="tonal"
                    color="primary"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const route = useRoute()
const router = useRouter()
const drawer = ref(false)
const loading = ref(false)
const error = ref('')
const eventData = ref(null)

function typeIcon(type) {
  const map = {
    Workshop: 'mdi-school-outline',
    'Pitch Night': 'mdi-microphone-outline',
    'Demo Day': 'mdi-presentation',
    Networking: 'mdi-account-group-outline',
    Training: 'mdi-book-open-outline',
    Summit: 'mdi-flag-outline',
    Conference: 'mdi-domain',
    Other: 'mdi-calendar-outline',
  }
  return map[type] || 'mdi-calendar-outline'
}

function normalizeEventItem(item) {
  return {
    ...item,
    image: item.image || '/images/events/default-event.jpg',
    tags:
      item.tags ||
      (item.tags_raw
        ? item.tags_raw
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : []) ||
      [],
    full_description: item.full_description || item.description || '',
  }
}

const eventDateLabel = computed(() => {
  if (!eventData.value) return ''
  const d = eventData.value
  return [d.day, d.month, d.year].filter(Boolean).join(' ')
})

async function fetchEvent() {
  loading.value = true
  error.value = ''

  try {
    const { data, error: fetchError } = await supabase
      .from('events')
      .select('*')
      .eq('id', route.params.id)
      .eq('tbi_id', 'navigatu')
      .neq('status', 'draft')
      .single()

    if (fetchError) throw fetchError

    eventData.value = data ? normalizeEventItem(data) : null
  } catch (err) {
    eventData.value = null
    error.value = err?.message || 'Failed to load event.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchEvent)
watch(() => route.params.id, fetchEvent)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');

.v-application {
  font-family: 'DM Sans', sans-serif !important;
}

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

.event-hero {
  color: #fff;
  background:
    radial-gradient(circle at 12% 8%, rgba(255, 255, 255, 0.14), transparent 42%),
    radial-gradient(circle at 92% 2%, rgba(255, 255, 255, 0.16), transparent 33%),
    linear-gradient(135deg, #1a237e 0%, #1565c0 56%, #e65100 100%);
}

.back-btn {
  text-transform: none !important;
  font-weight: 600 !important;
}

.event-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.detail-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.7rem, 4.4vw, 2.8rem);
  line-height: 1.2;
  margin: 0;
  max-width: 920px;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.92);
}

.meta-dot {
  color: rgba(255, 255, 255, 0.65);
}

.cover-card {
  overflow: hidden;
  border: 1px solid #e7eef8;
}

.article-body {
  color: #2f3b4b;
}

.lead-text {
  font-size: 1.05rem;
  font-weight: 600;
  color: #1e3f66;
  line-height: 1.8;
}

.body-text {
  font-size: 0.95rem;
  line-height: 1.95;
  color: #4e5f74;
}

.meta-card {
  position: sticky;
  top: 90px;
  border: 1px solid #e8edf6;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
}

.meta-card-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  color: #123f73;
}

.meta-list-item {
  display: flex;
  align-items: center;
  font-size: 0.88rem;
  color: #4e5f74;
  margin-bottom: 10px;
}

.meta-capacity-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.cap-box {
  background: #f3f8ff;
  border: 1px solid #dce9fb;
  border-radius: 10px;
  padding: 10px 12px;
}

.cap-label {
  font-size: 0.72rem;
  color: #78909c;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cap-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e3f66;
}

@media (max-width: 960px) {
  .meta-card {
    position: static;
  }

  .detail-image {
    height: 280px !important;
  }
}
</style>
