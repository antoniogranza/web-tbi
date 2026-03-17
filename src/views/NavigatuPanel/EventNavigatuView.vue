<template>
  <v-app>
    <!-- ===================== NAVIGATION BAR ===================== -->
    <v-app-bar flat color="white" border="b" height="64">
      <v-container class="d-flex align-center pa-0" fluid>
        <div class="d-flex align-center ml-4 ml-md-8">
          <v-img src="/images/NaviLogo.jpg" width="55" height="55" class="mr-3" cover />
          <div>
            <div class="nav-brand">NAVIGATÚ</div>
            <div class="nav-sub">Technology Business Incubator</div>
          </div>
        </div>

        <v-spacer />

        <div class="d-none d-md-flex align-center mr-6">
          <v-btn variant="text" class="nav-link" to="/about-navigatu">About</v-btn>
          <v-btn variant="text" class="nav-link" to="/services-navigatu">Services</v-btn>
          <v-btn variant="text" class="nav-link" to="/coworking-navigatu">Coworking</v-btn>
          <v-btn variant="text" class="nav-link nav-link--active" to="/news-navigatu">News</v-btn>
          <v-btn variant="text" class="nav-link" to="/events-navigatu">Events</v-btn>
          <v-btn variant="text" icon="mdi-magnify" size="small" />
        </div>

        <v-app-bar-nav-icon class="d-flex d-md-none" @click="drawer = !drawer" />
      </v-container>
    </v-app-bar>

    <!-- Mobile Drawer -->
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
        <v-list-item title="News" prepend-icon="mdi-newspaper-variant-outline" to="/news" />
        <v-list-item title="Events" prepend-icon="mdi-calendar-star-outline" to="/events" />
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

            <!-- Mini calendar widget -->
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
                  <div class="mini-stat-value">{{ eventTypes.length - 1 }}</div>
                  <div class="mini-stat-label">Categories</div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

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

          <div class="spotlight-card">
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
              <div class="spotlight-meta mb-3">
                <v-icon icon="mdi-map-marker-outline" size="15" class="mr-1" color="#1565C0" />
                <span>{{ nextEvent.location }}</span>
                <span class="meta-sep mx-2">·</span>
                <v-icon icon="mdi-clock-outline" size="15" class="mr-1" color="#1565C0" />
                <span>{{ nextEvent.time }}</span>
                <span class="meta-sep mx-2">·</span>
                <v-icon
                  icon="mdi-account-multiple-outline"
                  size="15"
                  class="mr-1"
                  color="#1565C0"
                />
                <span>{{ nextEvent.slots }} Slots Available</span>
              </div>

              <h2 class="spotlight-title mb-3">{{ nextEvent.title }}</h2>
              <p class="spotlight-desc mb-6">{{ nextEvent.description }}</p>

              <div class="d-flex align-center flex-wrap" style="gap: 12px">
                <v-btn
                  color="primary"
                  rounded="lg"
                  size="large"
                  prepend-icon="mdi-calendar-check"
                  class="register-btn"
                  @click="openDetail(nextEvent)"
                  >Register Now</v-btn
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

                <!-- Seats progress -->
                <div class="seats-indicator ml-2">
                  <div class="seats-label">
                    {{ nextEvent.registered }}/{{ nextEvent.capacity }} registered
                  </div>
                  <v-progress-linear
                    :model-value="(nextEvent.registered / nextEvent.capacity) * 100"
                    color="primary"
                    rounded
                    height="6"
                    class="mt-1"
                    style="width: 140px"
                  />
                </div>
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
            >
              Clear Filters
            </v-btn>
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
                <!-- Top color band with date pill -->
                <div
                  class="event-top-band"
                  :style="{ background: typeColorMap[event.type] || '#1565C0' }"
                >
                  <v-img :src="event.image" height="160" cover class="event-banner-img" />
                  <div class="event-overlay" />

                  <!-- Date pill — floats over the image -->
                  <div class="event-date-pill">
                    <span class="date-pill-day">{{ event.day }}</span>
                    <span class="date-pill-month">{{ event.month }}</span>
                  </div>

                  <!-- Type badge -->
                  <div class="event-type-badge" :style="{ background: typeColorMap[event.type] }">
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

                  <!-- Footer: seats + register -->
                  <div class="event-footer">
                    <div v-if="event.status === 'upcoming'" class="seats-row">
                      <v-icon
                        icon="mdi-account-multiple-outline"
                        size="14"
                        class="mr-1"
                        color="#888"
                      />
                      <span class="seats-text">{{ event.slots }} slots left</span>
                    </div>
                    <div v-else class="seats-row">
                      <v-icon
                        icon="mdi-check-circle-outline"
                        size="14"
                        class="mr-1"
                        color="#2E7D32"
                      />
                      <span class="seats-text past-text">{{ event.registered }} attended</span>
                    </div>
                    <v-btn
                      v-if="event.status === 'upcoming'"
                      size="x-small"
                      color="primary"
                      variant="flat"
                      rounded="lg"
                      class="register-mini-btn"
                      @click.stop="openDetail(event)"
                      >Register</v-btn
                    >
                    <v-btn
                      v-else
                      size="x-small"
                      variant="tonal"
                      color="secondary"
                      rounded="lg"
                      class="register-mini-btn"
                      >View Recap</v-btn
                    >
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== EVENT DETAIL DIALOG ===== -->
      <v-dialog v-model="dialog" max-width="700" scrollable>
        <v-card v-if="selectedEvent" rounded="xl" class="detail-dialog" elevation="4">
          <!-- Banner -->
          <div class="detail-banner-wrap">
            <v-img :src="selectedEvent.image" height="260" cover />
            <div class="detail-banner-overlay" />
            <v-btn
              icon="mdi-close"
              size="small"
              variant="flat"
              color="white"
              class="detail-close-btn"
              @click="dialog = false"
            />
            <!-- Date block over image -->
            <div
              class="detail-date-block"
              :style="{ background: typeColorMap[selectedEvent.type] }"
            >
              <div class="ddb-day">{{ selectedEvent.day }}</div>
              <div class="ddb-month">{{ selectedEvent.month }}</div>
              <div class="ddb-year">{{ selectedEvent.year }}</div>
            </div>
          </div>

          <v-card-text class="pa-8">
            <!-- Type chip -->
            <v-chip
              :color="selectedEvent.type === 'Workshop' ? 'primary' : 'secondary'"
              variant="tonal"
              size="small"
              class="mb-4"
              :prepend-icon="typeIcon(selectedEvent.type)"
              >{{ selectedEvent.type }}</v-chip
            >

            <h2 class="dialog-title mb-4">{{ selectedEvent.title }}</h2>

            <!-- Info rows -->
            <div class="dialog-info-grid mb-6">
              <div class="dialog-info-item">
                <v-icon icon="mdi-map-marker-outline" size="18" color="#1565C0" />
                <div>
                  <div class="info-label">Location</div>
                  <div class="info-value">{{ selectedEvent.location }}</div>
                </div>
              </div>
              <div class="dialog-info-item">
                <v-icon icon="mdi-clock-outline" size="18" color="#1565C0" />
                <div>
                  <div class="info-label">Time</div>
                  <div class="info-value">{{ selectedEvent.time }}</div>
                </div>
              </div>
              <div class="dialog-info-item">
                <v-icon icon="mdi-calendar-outline" size="18" color="#1565C0" />
                <div>
                  <div class="info-label">Date</div>
                  <div class="info-value">
                    {{ selectedEvent.day }} {{ selectedEvent.month }} {{ selectedEvent.year }}
                  </div>
                </div>
              </div>
              <div class="dialog-info-item">
                <v-icon icon="mdi-account-multiple-outline" size="18" color="#1565C0" />
                <div>
                  <div class="info-label">Capacity</div>
                  <div class="info-value">
                    {{ selectedEvent.registered }}/{{ selectedEvent.capacity }} registered
                  </div>
                </div>
              </div>
            </div>

            <p class="dialog-desc mb-6">
              {{ selectedEvent.fullDescription || selectedEvent.description }}
            </p>

            <!-- Speakers / facilitators -->
            <div v-if="selectedEvent.speakers?.length" class="mb-6">
              <p class="dialog-section-label mb-3">Speakers / Facilitators</p>
              <div class="speakers-row">
                <div v-for="sp in selectedEvent.speakers" :key="sp.name" class="speaker-item">
                  <v-avatar size="44" color="blue-lighten-4" class="mb-1">
                    <v-icon icon="mdi-account" size="26" color="#1565C0" />
                  </v-avatar>
                  <div class="speaker-name">{{ sp.name }}</div>
                  <div class="speaker-role">{{ sp.role }}</div>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div class="d-flex flex-wrap gap-2 mb-6">
              <v-chip
                v-for="tag in selectedEvent.tags"
                :key="tag"
                size="small"
                variant="tonal"
                color="primary"
              >
                {{ tag }}
              </v-chip>
            </div>

            <!-- Seats bar -->
            <div class="seats-bar-wrap mb-6" v-if="selectedEvent.status === 'upcoming'">
              <div class="d-flex justify-space-between mb-1">
                <span class="seats-bar-label">Registration Progress</span>
                <span class="seats-bar-pct"
                  >{{ Math.round((selectedEvent.registered / selectedEvent.capacity) * 100) }}%
                  full</span
                >
              </div>
              <v-progress-linear
                :model-value="(selectedEvent.registered / selectedEvent.capacity) * 100"
                color="primary"
                rounded
                height="8"
              />
            </div>

            <!-- CTA -->
            <v-btn
              v-if="selectedEvent.status === 'upcoming'"
              block
              color="primary"
              rounded="lg"
              size="large"
              prepend-icon="mdi-calendar-check"
              class="register-dialog-btn"
              >Confirm Registration</v-btn
            >
            <v-btn
              v-else
              block
              variant="outlined"
              color="primary"
              rounded="lg"
              size="large"
              prepend-icon="mdi-image-multiple-outline"
              >View Event Recap</v-btn
            >
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-main>

    <!-- ===================== FOOTER ===================== -->
    <v-footer color="primary-darken-2" class="pa-0">
      <v-container class="py-8 text-center">
        <div class="footer-logo mb-2">NAVIGATÚ</div>
        <p class="footer-tagline">Technology Business Incubator</p>
        <v-divider color="white" opacity="0.2" class="my-4" />
        <p class="footer-copy">
          © 2024 Navigatú TBI. All Rights Reserved. · Empowering startups. Building futures.
        </p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'

const drawer = ref(false)
const dialog = ref(false)
const selectedEvent = ref(null)
const searchQuery = ref('')
const activeType = ref('All')
const viewMode = ref('upcoming') // 'upcoming' | 'past'
const sortBy = ref('Date (Soonest)')

const eventTypes = [
  'All',
  'Workshop',
  'Pitch Night',
  'Demo Day',
  'Networking',
  'Training',
  'Summit',
]

const typeColorMap = {
  Workshop: '#1565C0',
  'Pitch Night': '#6A1B9A',
  'Demo Day': '#E65100',
  Networking: '#2E7D32',
  Training: '#00695C',
  Summit: '#B71C1C',
}

function typeIcon(type) {
  const map = {
    Workshop: 'mdi-school-outline',
    'Pitch Night': 'mdi-microphone-outline',
    'Demo Day': 'mdi-presentation',
    Networking: 'mdi-account-group-outline',
    Training: 'mdi-book-open-outline',
    Summit: 'mdi-flag-outline',
    All: 'mdi-apps',
  }
  return map[type] || 'mdi-calendar-outline'
}

// ── Sample events data ────────────────────────────────────────────────────────
const events = ref([
  {
    id: 1,
    title: 'Startup Pitch Night: Spring 2025 Cohort',
    description:
      'Watch our latest incubatees pitch their ventures to a panel of investors and industry mentors in a live pitch night.',
    fullDescription:
      'Join us for an exciting evening as the Spring 2025 cohort of Navigatú TBI startups present their ventures to a distinguished panel of investors and industry mentors. This pitch night is open to the public and provides a unique opportunity to witness the next generation of Mindanao tech startups in action. Networking reception to follow.',
    location: 'Navigatú TBI Main Hall, Bukidnon',
    date: 'April 18, 2025',
    day: '18',
    month: 'APR',
    year: '2025',
    time: '2:00 PM – 6:00 PM',
    type: 'Pitch Night',
    status: 'upcoming',
    image: '/images/events/event1.jpg',
    slots: 40,
    registered: 60,
    capacity: 100,
    tags: ['Pitching', 'Investors', 'Startups', 'Networking'],
    speakers: [
      { name: 'Dr. Riah Encarnacion', role: 'TBI Director' },
      { name: 'Engr. John Mark Correa', role: 'Project Head' },
    ],
  },
  {
    id: 2,
    title: 'Business Model Canvas Workshop for Early-Stage Founders',
    description:
      'A hands-on full-day workshop guiding founders through the Business Model Canvas framework with real startup case studies.',
    fullDescription:
      'This intensive workshop is designed for pre-seed and seed-stage founders who want to sharpen their business model before seeking investment. Participants will work through the Business Model Canvas using their own startup as the case study, guided by experienced mentors from the Navigatú TBI network. Lunch and materials included.',
    location: 'Navigatú TBI Training Room, Bukidnon',
    date: 'April 25, 2025',
    day: '25',
    month: 'APR',
    year: '2025',
    time: '8:00 AM – 5:00 PM',
    type: 'Workshop',
    status: 'upcoming',
    image: '/images/events/event2.jpg',
    slots: 20,
    registered: 10,
    capacity: 30,
    tags: ['BMC', 'Business Model', 'Founders', 'Workshop'],
    speakers: [{ name: 'Mary Pilar Barber', role: 'Community Dev Head' }],
  },
  {
    id: 3,
    title: 'Navigatú Demo Day 2025',
    description:
      'The flagship annual event showcasing live product demos from all active Navigatú incubatees to investors and the public.',
    fullDescription:
      'Navigatú Demo Day is our flagship annual showcase where all active incubatees present live product demonstrations to a room full of investors, government officials, media, and the general public. The event also features an exhibition area, panel discussions, and a networking dinner. Early registration is strongly advised as seats fill up quickly.',
    location: 'CMU Convention Hall, Musuan, Bukidnon',
    date: 'May 10, 2025',
    day: '10',
    month: 'MAY',
    year: '2025',
    time: '9:00 AM – 8:00 PM',
    type: 'Demo Day',
    status: 'upcoming',
    image: '/images/events/event3.jpg',
    slots: 100,
    registered: 180,
    capacity: 280,
    tags: ['Demo Day', 'Showcase', 'Annual', 'Investors'],
    speakers: [
      { name: 'Dr. Riah Encarnacion', role: 'TBI Director' },
      { name: 'Guest Investor Panel', role: 'DICT & Private Sector' },
    ],
  },
  {
    id: 4,
    title: 'Tech Founders Networking Night',
    description:
      'An informal evening networking event connecting founders, developers, designers, and mentors in the Bukidnon tech ecosystem.',
    fullDescription:
      'Join fellow founders, developers, designers, and mentors for a casual evening of networking, idea exchange, and community building. This is a great opportunity to meet your next co-founder, collaborator, or advisor. Light refreshments will be provided.',
    location: 'Navigatú TBI Coworking Space',
    date: 'May 22, 2025',
    day: '22',
    month: 'MAY',
    year: '2025',
    time: '6:00 PM – 9:00 PM',
    type: 'Networking',
    status: 'upcoming',
    image: '/images/events/event4.jpg',
    slots: 30,
    registered: 20,
    capacity: 50,
    tags: ['Networking', 'Founders', 'Community', 'Tech'],
    speakers: [],
  },
  {
    id: 5,
    title: 'Digital Marketing for Startups — Training Series',
    description:
      'A 3-session training series covering SEO, social media growth, and paid advertising specifically tailored for tech startups.',
    fullDescription:
      'This 3-session training series will equip startup founders and their marketing teams with practical digital marketing skills. Topics covered include SEO fundamentals for tech products, building a social media presence from zero, running effective paid campaigns on limited budgets, and measuring ROI. Sessions will be held on three consecutive Saturdays.',
    location: 'Navigatú TBI Training Room, Bukidnon',
    date: 'June 7–21, 2025',
    day: '07',
    month: 'JUN',
    year: '2025',
    time: '9:00 AM – 12:00 PM (Saturdays)',
    type: 'Training',
    status: 'upcoming',
    image: '/images/events/event5.jpg',
    slots: 15,
    registered: 12,
    capacity: 25,
    tags: ['Marketing', 'SEO', 'Social Media', 'Training'],
    speakers: [{ name: 'Guest Marketing Expert', role: 'Digital Marketing Consultant' }],
  },
  {
    id: 6,
    title: 'Mindanao Startup Summit 2024',
    description:
      'The largest startup gathering in Mindanao, hosted by Navigatú TBI with over 300 participants from across the region.',
    fullDescription:
      "The Mindanao Startup Summit 2024 brought together over 300 founders, investors, government officials, and ecosystem builders for a full-day conference on the state of startups in Mindanao. Keynote speakers, breakout sessions, pitch competitions, and an innovation exhibition made this the most successful startup event in the region's history.",
    location: 'CMU Convention Hall, Musuan, Bukidnon',
    date: 'November 15, 2024',
    day: '15',
    month: 'NOV',
    year: '2024',
    time: '8:00 AM – 9:00 PM',
    type: 'Summit',
    status: 'past',
    image: '/images/events/event6.jpg',
    slots: 0,
    registered: 312,
    capacity: 350,
    tags: ['Summit', 'Mindanao', 'Conference', '2024'],
    speakers: [
      { name: 'DICT Secretary', role: 'Keynote Speaker' },
      { name: 'Dr. Riah Encarnacion', role: 'Host' },
    ],
  },
  {
    id: 7,
    title: 'Pitch Training Boot Camp — Batch 5',
    description:
      'An intensive 2-day boot camp preparing startup founders for investor pitches, covering storytelling, financials, and Q&A handling.',
    fullDescription:
      'The Pitch Training Boot Camp is a rigorous 2-day immersive program where startup founders receive hands-on coaching in crafting compelling investor pitches. Participants go through multiple rounds of mock pitching, receive structured feedback from experienced mentors, and refine their decks and financial projections.',
    location: 'Navigatú TBI Main Hall, Bukidnon',
    date: 'October 3–4, 2024',
    day: '03',
    month: 'OCT',
    year: '2024',
    time: '8:00 AM – 6:00 PM',
    type: 'Workshop',
    status: 'past',
    image: '/images/events/event7.jpg',
    slots: 0,
    registered: 24,
    capacity: 25,
    tags: ['Pitching', 'Boot Camp', 'Investors', 'Training'],
    speakers: [{ name: 'Engr. John Mark Correa', role: 'Lead Facilitator' }],
  },
  {
    id: 8,
    title: 'Alumni Networking Night — Navigatú Graduates',
    description:
      'An exclusive evening for Navigatú TBI alumni to reconnect, share milestones, and mentor the current cohort of incubatees.',
    fullDescription:
      'This exclusive event brought together Navigatú TBI alumni from all previous cohorts for an evening of reconnection, storytelling, and mentorship. Alumni shared their post-incubation journeys with the current incubatees, creating a powerful mentorship loop within the Navigatú ecosystem.',
    location: 'Navigatú TBI Coworking Space',
    date: 'September 20, 2024',
    day: '20',
    month: 'SEP',
    year: '2024',
    time: '5:00 PM – 9:00 PM',
    type: 'Networking',
    status: 'past',
    image: '/images/events/event8.jpg',
    slots: 0,
    registered: 45,
    capacity: 50,
    tags: ['Alumni', 'Networking', 'Mentorship'],
    speakers: [],
  },
])

// ── Computed ──────────────────────────────────────────────────────────────────
const upcomingCount = computed(() => events.value.filter((e) => e.status === 'upcoming').length)
const pastCount = computed(() => events.value.filter((e) => e.status === 'past').length)

const nextEvent = computed(() => events.value.find((e) => e.status === 'upcoming'))

const filteredEvents = computed(() => {
  let list = events.value.filter((e) => e.status === viewMode.value)

  // exclude the next event spotlight from the list
  if (viewMode.value === 'upcoming' && nextEvent.value) {
    list = list.filter((e) => e.id !== nextEvent.value.id)
  }

  if (activeType.value !== 'All') {
    list = list.filter((e) => e.type === activeType.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q),
    )
  }
  if (sortBy.value === 'Date (Latest)') list = [...list].reverse()
  if (sortBy.value === 'A–Z') list = [...list].sort((a, b) => a.title.localeCompare(b.title))
  return list
})

// ── Methods ───────────────────────────────────────────────────────────────────
function openDetail(event) {
  selectedEvent.value = event
  dialog.value = true
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
.nav-link--active {
  color: #1565c0 !important;
  font-weight: 700 !important;
}

/* ── HERO ────────────────────────────────────────────────────────────────────── */
.events-hero {
  background: linear-gradient(135deg, #1a237e 0%, #1565c0 60%, #0288d1 100%);
  position: relative;
  overflow: hidden;
}
/* Decorative floating circles */
.hero-circles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hero-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.hero-circle--1 {
  width: 400px;
  height: 400px;
  top: -120px;
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

/* View toggle */
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

/* Mini stats */
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
  position: sticky;
  top: 64px;
  z-index: 9;
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
.seats-indicator {
  display: flex;
  flex-direction: column;
}
.seats-label {
  font-size: 0.72rem;
  color: #888;
  font-weight: 600;
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
}
.event-banner-img {
  display: block;
  width: 100%;
  transition: transform 0.4s ease;
}
.event-card:hover .event-banner-img {
  transform: scale(1.04);
}
.event-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.45) 100%);
}

/* Date pill — white badge over image bottom-left */
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

/* Type badge top-right */
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

/* Past overlay */
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
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.seats-row {
  display: inline-flex;
  align-items: center;
}
.seats-text {
  font-size: 0.72rem;
  color: #888;
}
.past-text {
  color: #2e7d32;
  font-weight: 600;
}
.register-mini-btn {
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
.dialog-section-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}
.speakers-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.speaker-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  text-align: center;
}
.speaker-name {
  font-size: 0.72rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  margin-top: 4px;
}
.speaker-role {
  font-size: 0.65rem;
  color: #888;
  margin-top: 1px;
}
.seats-bar-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: #888;
}
.seats-bar-pct {
  font-size: 0.72rem;
  font-weight: 700;
  color: #1565c0;
}
.register-dialog-btn {
  text-transform: none !important;
  font-weight: 700 !important;
  letter-spacing: 0 !important;
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
