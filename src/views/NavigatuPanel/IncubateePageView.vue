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

    <v-navigation-drawer v-model="drawer" temporary location="right">
      <v-list nav>
        <v-list-item title="About" prepend-icon="mdi-information-outline" />
        <v-list-item title="Services" prepend-icon="mdi-briefcase-outline" />
        <v-list-item title="Coworking" prepend-icon="mdi-office-building-outline" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <!-- ===== HERO BANNER ===== -->
      <div class="profile-hero">
        <!-- Background image with overlay -->
        <div class="hero-bg-img">
          <v-img :src="startup.heroBg" height="100%" cover class="hero-bg-layer" />
        </div>
        <div class="hero-overlay" />

        <v-container class="hero-content-wrap">
          <!-- Breadcrumb -->
          <div class="breadcrumb-row mb-6">
            <v-btn
              variant="text"
              prepend-icon="mdi-arrow-left"
              color="white"
              size="small"
              class="breadcrumb-btn"
              to="/about-navigatu"
            >
              Back to Incubatees
            </v-btn>
          </div>

          <v-row align="center" class="hero-inner">
            <!-- Logo card -->
            <v-col cols="12" md="3" class="d-flex justify-center justify-md-start">
              <div class="startup-logo-card">
                <v-img :src="startup.logo" height="130" contain class="startup-logo-img" />
              </div>
            </v-col>

            <!-- Title & meta -->
            <v-col cols="12" md="9" class="hero-text-col">
              <div class="startup-category-chip mb-3">
                <v-icon icon="mdi-tag-outline" size="13" class="mr-1" />
                {{ startup.category }}
              </div>
              <h1 class="startup-name">{{ startup.name }}</h1>
              <p class="startup-tagline">{{ startup.tagline }}</p>

              <div class="hero-meta-row mt-4">
                <div class="hero-meta-item">
                  <v-icon icon="mdi-calendar-start" size="16" class="mr-1" />
                  Founded {{ startup.yearFounded }}
                </div>
                <div class="hero-meta-divider" />
                <div class="hero-meta-item">
                  <v-icon icon="mdi-map-marker-outline" size="16" class="mr-1" />
                  {{ startup.location }}
                </div>
                <div class="hero-meta-divider" />
                <div class="hero-meta-item">
                  <v-icon icon="mdi-account-multiple-outline" size="16" class="mr-1" />
                  {{ startup.teamSize }} Team Members
                </div>
              </div>

              <!-- Status chip + Website button row -->
              <div class="mt-4 d-flex align-center flex-wrap gap-3">
                <span class="status-chip" :class="`status-chip--${startup.status}`">
                  <v-icon :icon="startup.statusIcon" size="13" class="mr-1" />
                  {{ startup.statusLabel }}
                </span>

                <!-- Visit Website button -->
                <v-btn
                  :href="startup.website"
                  target="_blank"
                  variant="outlined"
                  color="white"
                  rounded="lg"
                  size="small"
                  prepend-icon="mdi-web"
                  class="website-btn"
                >
                  Visit Website
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- ===== ANCHOR NAV STRIP ===== -->
      <!--
        4 clickable tabs — each scrolls smoothly to the matching section below.
        Active tab is highlighted when the section is in view (tracked via activeSection).
      -->
      <div class="anchor-strip" ref="anchorStripRef">
        <v-container>
          <div class="anchor-tabs-row">
            <button
              v-for="tab in anchorTabs"
              :key="tab.id"
              class="anchor-tab"
              :class="{ 'anchor-tab--active': activeSection === tab.id }"
              @click="scrollToSection(tab.id)"
            >
              <v-icon :icon="tab.icon" size="18" class="anchor-tab-icon" />
              <span class="anchor-tab-label">{{ tab.label }}</span>
              <span class="anchor-tab-value">{{ tab.value }}</span>
            </button>
          </div>
        </v-container>
      </div>

      <!-- ===== ABOUT THE STARTUP ===== -->
      <v-container fluid class="about-startup-section py-14" id="section-year-started">
        <v-container>
          <v-row align="start">
            <v-col cols="12" md="7">
              <p class="section-eyebrow">Overview</p>
              <h2 class="section-heading mb-5">
                About <span class="accent-text">{{ startup.name }}</span>
              </h2>
              <p class="body-text mb-4">{{ startup.descriptionLong }}</p>
              <p class="body-text">{{ startup.descriptionExtra }}</p>

              <!-- Problem / Solution cards -->
              <v-row class="mt-8">
                <v-col cols="12" sm="6">
                  <div class="ps-card ps-card--problem">
                    <div class="ps-card-icon">
                      <v-icon icon="mdi-alert-circle-outline" size="22" color="#C62828" />
                    </div>
                    <h4 class="ps-card-title">The Problem</h4>
                    <p class="ps-card-body">{{ startup.problem }}</p>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="ps-card ps-card--solution">
                    <div class="ps-card-icon">
                      <v-icon icon="mdi-lightbulb-on-outline" size="22" color="#1565C0" />
                    </div>
                    <h4 class="ps-card-title">Our Solution</h4>
                    <p class="ps-card-body">{{ startup.solution }}</p>
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <!-- Sidebar info -->
            <v-col cols="12" md="5" class="pl-md-8">
              <div class="info-sidebar">
                <h4 class="sidebar-heading mb-4">Startup Details</h4>
                <div v-for="detail in startup.details" :key="detail.label" class="detail-row">
                  <v-icon :icon="detail.icon" size="18" :color="detail.color" class="detail-icon" />
                  <div class="detail-content">
                    <span class="detail-label">{{ detail.label }}</span>
                    <span class="detail-value">{{ detail.value }}</span>
                  </div>
                </div>

                <!-- Tags -->
                <div class="mt-6">
                  <p class="sidebar-heading mb-3">Focus Areas</p>
                  <div class="d-flex flex-wrap gap-2">
                    <v-chip
                      v-for="tag in startup.tags"
                      :key="tag"
                      size="small"
                      variant="tonal"
                      color="primary"
                      class="tag-chip"
                      >{{ tag }}</v-chip
                    >
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== LATEST ACHIEVEMENTS ===== -->
      <v-container fluid class="achievements-section py-14" id="section-milestones">
        <v-container>
          <p class="section-eyebrow text-center">Milestones</p>
          <h2 class="section-heading text-center mb-2">
            Latest <span class="accent-text">Achievements</span>
          </h2>
          <p class="section-sub text-center mb-10">
            Key milestones and recognitions earned along the journey
          </p>

          <v-row>
            <v-col v-for="ach in startup.achievements" :key="ach.title" cols="12" sm="6" md="4">
              <v-card class="ach-card h-100" rounded="xl" elevation="0">
                <!-- Achievement photo -->
                <div class="ach-photo-wrap">
                  <v-img :src="ach.photo" height="190" cover class="ach-photo" />
                  <!-- Year badge -->
                  <div class="ach-year-badge">{{ ach.year }}</div>
                </div>

                <div class="ach-body pa-5">
                  <div class="ach-icon-row mb-2">
                    <v-icon :icon="ach.icon" size="18" :color="ach.color" />
                    <span class="ach-category" :style="{ color: ach.color }">{{
                      ach.category
                    }}</span>
                  </div>
                  <h4 class="ach-title mb-2">{{ ach.title }}</h4>
                  <p class="ach-desc">{{ ach.desc }}</p>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== GALLERY ===== -->
      <v-container fluid class="gallery-section py-14">
        <v-container>
          <p class="section-eyebrow text-center">Gallery</p>
          <h2 class="section-heading text-center mb-2">
            Moments & <span class="accent-text">Highlights</span>
          </h2>
          <p class="section-sub text-center mb-10">Behind the scenes of our journey</p>

          <v-row>
            <!-- Featured large photo -->
            <v-col cols="12" md="6">
              <div class="gallery-main">
                <v-img
                  :src="startup.gallery[0]"
                  height="340"
                  cover
                  rounded="xl"
                  class="gallery-main-img"
                />
                <div class="gallery-caption">{{ startup.galleryCaptions[0] }}</div>
              </div>
            </v-col>
            <!-- 2x2 grid -->
            <v-col cols="12" md="6">
              <v-row>
                <v-col v-for="(img, i) in startup.gallery.slice(1, 5)" :key="i" cols="6">
                  <div class="gallery-thumb">
                    <v-img :src="img" height="158" cover rounded="lg" class="gallery-thumb-img" />
                    <div class="gallery-caption gallery-caption--sm">
                      {{ startup.galleryCaptions[i + 1] }}
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== PARTNERSHIPS ===== -->
      <v-container fluid class="financials-section py-14" id="section-partnerships">
        <v-container>
          <p class="section-eyebrow text-center">Network</p>
          <h2 class="section-heading text-center mb-2">
            Partners & <span class="accent-text">Collaborations</span>
          </h2>
          <p class="section-sub text-center mb-10">Organizations that power our growth</p>

          <v-row justify="center">
            <v-col v-for="partner in startup.partners" :key="partner.name" cols="12" sm="6" md="4">
              <div class="partner-card">
                <div class="partner-logo-wrap" :style="{ background: partner.logoBg }">
                  <v-icon :icon="partner.icon" size="28" :color="partner.color" />
                </div>
                <div class="partner-info">
                  <div class="partner-name">{{ partner.name }}</div>
                  <div class="partner-type">{{ partner.type }}</div>
                </div>
                <v-chip
                  size="x-small"
                  :color="partner.chipColor"
                  variant="tonal"
                  class="partner-chip"
                  >{{ partner.chipLabel }}</v-chip
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== TEAM ===== -->
      <v-container fluid class="team-section py-14" id="section-team">
        <v-container>
          <p class="section-eyebrow text-center">People</p>
          <h2 class="section-heading text-center mb-2">
            Meet the <span class="accent-text">Team</span>
          </h2>
          <p class="section-sub text-center mb-10">The minds behind the innovation</p>

          <v-row justify="center">
            <v-col v-for="member in startup.team" :key="member.name" cols="6" sm="4" md="3">
              <div class="team-card">
                <!-- Photo -->
                <div class="team-photo-wrap">
                  <v-img
                    v-if="member.photo"
                    :src="member.photo"
                    height="180"
                    cover
                    class="team-photo"
                  />
                  <div v-else class="team-photo-fallback">
                    <v-avatar size="72" color="blue-lighten-4">
                      <v-icon icon="mdi-account" size="44" color="#1565C0" />
                    </v-avatar>
                  </div>
                </div>
                <div class="team-info pa-3 text-center">
                  <div class="team-name">{{ member.name }}</div>
                  <div class="team-role">{{ member.role }}</div>
                  <!-- Social links -->
                  <div class="team-socials mt-2" v-if="member.linkedin || member.email">
                    <v-btn
                      v-if="member.linkedin"
                      :href="member.linkedin"
                      target="_blank"
                      icon="mdi-linkedin"
                      size="x-small"
                      variant="text"
                      color="#1565C0"
                    />
                    <v-btn
                      v-if="member.email"
                      :href="`mailto:${member.email}`"
                      icon="mdi-email-outline"
                      size="x-small"
                      variant="text"
                      color="#555"
                    />
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== TESTIMONIALS ===== -->
      <v-container fluid class="testimonials-section py-14" id="section-testimonials">
        <v-container>
          <p class="section-eyebrow text-center">Voices</p>
          <h2 class="section-heading text-center mb-2">
            What They <span class="accent-text">Say</span>
          </h2>
          <p class="section-sub text-center mb-12">Success stories in their own words</p>

          <v-row>
            <v-col v-for="(t, i) in startup.testimonials" :key="t.name" cols="12" md="4">
              <div class="testi-card" :class="i === 1 ? 'testi-card--featured' : ''">
                <!-- Quote mark -->
                <div class="quote-mark">"</div>
                <p class="testi-text">{{ t.quote }}</p>
                <div class="testi-author-row mt-5">
                  <div class="testi-avatar-wrap">
                    <v-img
                      v-if="t.photo"
                      :src="t.photo"
                      height="48"
                      width="48"
                      cover
                      rounded="circle"
                      class="testi-avatar"
                    />
                    <v-avatar v-else size="48" color="blue-lighten-4">
                      <v-icon icon="mdi-account" size="28" color="#1565C0" />
                    </v-avatar>
                  </div>
                  <div class="testi-author-info ml-3">
                    <div class="testi-name">{{ t.name }}</div>
                    <div class="testi-role">{{ t.role }}</div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== CALL TO ACTION ===== -->
      <div class="cta-section">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="8" class="text-center">
              <h2 class="cta-title mb-4">
                Interested in Working with <span class="cta-accent">{{ startup.name }}</span
                >?
              </h2>
              <p class="cta-sub mb-8">
                Connect with the team or learn more about their products and services.
              </p>
              <div class="d-flex justify-center flex-wrap gap-4">
                <v-btn
                  color="white"
                  rounded="lg"
                  size="large"
                  class="cta-btn-primary"
                  prepend-icon="mdi-email-outline"
                  :href="`mailto:${startup.contactEmail}`"
                >
                  Contact Team
                </v-btn>
                <v-btn
                  variant="outlined"
                  color="white"
                  rounded="lg"
                  size="large"
                  class="cta-btn-outline"
                  prepend-icon="mdi-web"
                  :href="startup.website"
                  target="_blank"
                >
                  Visit Website
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>

    <!-- ===================== FOOTER ===================== -->
    <v-footer color="grey-darken-4" class="pa-0">
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { incubatees } from '@/data/incubatees' // ← your existing data file

const drawer = ref(false)
const route = useRoute()
const router = useRouter()

// ── Resolve startup from route slug ───────────────────────────────────────────
// Route must be declared as:  { path: '/incubatees/:slug', component: NavigatuIncubateeProfile }
// Each key in incubatees.js must match the slug used in NavigatuApp.vue route fields.
// e.g.  incubatees['ascribo-ai'] = { name: 'Ascribo AI', logo: '...', ... }
const startup = computed(() => {
  const entry = incubatees[route.params.slug]
  if (!entry) {
    router.replace('/about-navigatu') // unknown slug → send back to listing
    return {}
  }
  return entry
})

// ── Anchor nav tabs — values driven by startup data ───────────────────────────
// Each tab's `value` reads directly from the resolved startup object so it
// automatically reflects the correct data for whichever incubatee is loaded.
const anchorTabs = computed(() => [
  {
    id: 'section-milestones',
    label: 'Milestones',
    icon: 'mdi-flag-checkered',
    value: startup.value.achievements?.length ?? 0,
  },
  {
    id: 'section-partnerships',
    label: 'Partnerships',
    icon: 'mdi-handshake-outline',
    value: startup.value.partners?.length ?? 0,
  },
  {
    id: 'section-team',
    label: 'Team',
    icon: 'mdi-account-group-outline',
    value: startup.value.team?.length ?? 0,
  },
  {
    id: 'section-testimonials',
    label: 'Testimonials',
    icon: 'mdi-message-star-outline',
    value: startup.value.testimonials?.length ?? 0,
  },
])

// ── Anchor nav: active section tracking ──────────────────────────────────────
const activeSection = ref('section-year-started')

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = 140 // navbar (64px) + anchor strip (~68px) + breathing room
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
  activeSection.value = id
}

// IntersectionObserver — auto-highlights the tab whose section is in view
let observers = []
onMounted(() => {
  // anchorTabs is a computed ref — access .value
  anchorTabs.value.forEach((tab) => {
    const el = document.getElementById(tab.id)
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) activeSection.value = tab.id
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    obs.observe(el)
    observers.push(obs)
  })
})
onUnmounted(() => {
  observers.forEach((o) => o.disconnect())
})
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
}

/* ── HERO ────────────────────────────────────────────────────────────────────── */
.profile-hero {
  position: relative;
  min-height: 380px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 0;
  overflow: hidden;
}
.hero-bg-img {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-bg-layer {
  width: 100%;
  height: 100%;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(13, 71, 161, 0.92) 0%,
    rgba(21, 101, 192, 0.8) 60%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 1;
}
.hero-content-wrap {
  position: relative;
  z-index: 2;
  padding-top: 48px;
  padding-bottom: 48px;
  width: 100%;
}
.breadcrumb-btn {
  font-size: 0.8rem !important;
  font-weight: 500 !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  opacity: 0.85;
}

/* Logo card — white rounded panel */
.startup-logo-card {
  width: 160px;
  height: 160px;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
  flex-shrink: 0;
}
.startup-logo-img {
  display: block;
  width: 100%;
}

/* Hero text */
.hero-text-col {
  padding-left: 32px;
}
@media (max-width: 959px) {
  .hero-text-col {
    padding-left: 0;
    margin-top: 24px;
  }
}

.startup-category-chip {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.startup-name {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.05;
  margin: 8px 0 10px;
}
.startup-tagline {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.6;
  max-width: 520px;
  margin: 0;
}
.hero-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.hero-meta-item {
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.75);
}
.hero-meta-divider {
  width: 1px;
  height: 14px;
  background: rgba(255, 255, 255, 0.3);
}

/* Status chip */
.status-chip {
  display: inline-flex;
  align-items: center;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 20px;
  letter-spacing: 0.3px;
}
.status-chip--active {
  background: rgba(46, 125, 50, 0.85);
  color: #ffffff;
}
.status-chip--graduated {
  background: rgba(249, 168, 37, 0.85);
  color: #ffffff;
}
.status-chip--scaling {
  background: rgba(21, 101, 192, 0.85);
  color: #ffffff;
}

/* ── Website button in hero ──────────────────────────────────────────────────── */
.website-btn {
  font-size: 0.78rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
}

/* ── ANCHOR NAV STRIP ────────────────────────────────────────────────────────── */
/*
  Sticky strip just below the navbar. 4 clickable tab buttons that scroll
  the page to their respective sections. Active tab shows a blue bottom border
  and highlighted text. position:sticky + top:64px pins it under the app-bar.
*/
.anchor-strip {
  background: #ffffff;
  border-bottom: 2px solid #eef0f5;
  position: sticky;
  top: 64px;
  z-index: 10;
  padding: 0;
}
.anchor-tabs-row {
  display: flex;
  align-items: stretch;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
}
.anchor-tabs-row::-webkit-scrollbar {
  display: none;
}

.anchor-tab {
  flex: 1;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 14px 12px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease;
  outline: none;
  position: relative;
  bottom: -2px; /* overlaps the strip border so active tab's border shows */
}
.anchor-tab:hover {
  background: #f5f7fb;
}
.anchor-tab--active {
  border-bottom-color: #1565c0;
  background: #f0f4ff;
}
.anchor-tab-icon {
  color: #aaa;
  transition: color 0.18s ease;
}
.anchor-tab--active .anchor-tab-icon,
.anchor-tab:hover .anchor-tab-icon {
  color: #1565c0;
}
.anchor-tab-value {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
  transition: color 0.18s ease;
}
.anchor-tab--active .anchor-tab-value {
  color: #1565c0;
}
.anchor-tab-label {
  font-size: 0.68rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  transition: color 0.18s ease;
}
.anchor-tab--active .anchor-tab-label,
.anchor-tab:hover .anchor-tab-label {
  color: #1565c0;
}

@media (max-width: 599px) {
  .anchor-tab {
    min-width: 90px;
    padding: 12px 8px;
  }
  .anchor-tab-value {
    font-size: 1rem;
  }
}

/* ── SHARED SECTION TYPOGRAPHY ────────────────────────────────────────────────── */
.section-eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  color: #1565c0;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.section-heading {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  margin-bottom: 0;
}
.section-sub {
  font-size: 0.85rem;
  color: #9e9e9e;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.accent-text {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #1565c0;
}
.body-text {
  font-size: 0.92rem;
  color: #555;
  line-height: 1.85;
  margin: 0;
}

/* ── ABOUT SECTION ───────────────────────────────────────────────────────────── */
.about-startup-section {
  background: #ffffff;
}

/* Problem / Solution cards */
.ps-card {
  border-radius: 14px;
  padding: 20px;
  height: 100%;
}
.ps-card--problem {
  background: #fff5f5;
  border-left: 4px solid #c62828;
}
.ps-card--solution {
  background: #eef4ff;
  border-left: 4px solid #1565c0;
}
.ps-card-icon {
  margin-bottom: 10px;
}
.ps-card-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
}
.ps-card-body {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.7;
  margin: 0;
}

/* Sidebar */
.info-sidebar {
  background: #f8f9fc;
  border-radius: 18px;
  padding: 28px;
  border: 1px solid #edf0f7;
}
.sidebar-heading {
  font-size: 0.78rem;
  font-weight: 700;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}
.detail-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #edf0f7;
}
.detail-row:last-of-type {
  border-bottom: none;
}
.detail-icon {
  margin-top: 2px;
  flex-shrink: 0;
}
.detail-content {
  display: flex;
  flex-direction: column;
}
.detail-label {
  font-size: 0.7rem;
  color: #aaa;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}
.detail-value {
  font-size: 0.88rem;
  color: #1a1a1a;
  font-weight: 600;
  margin-top: 1px;
}
.tag-chip {
  font-size: 0.72rem !important;
  font-weight: 600 !important;
}

/* ── ACHIEVEMENTS ────────────────────────────────────────────────────────────── */
.achievements-section {
  background: #f5f7fb;
}

.ach-card {
  background: #ffffff;
  overflow: hidden;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
  border: 1px solid #edf0f7;
}
.ach-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(21, 101, 192, 0.12) !important;
}
.ach-photo-wrap {
  position: relative;
  overflow: hidden;
}
.ach-photo {
  display: block;
  width: 100%;
}
.ach-year-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(21, 101, 192, 0.85);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.5px;
}
.ach-icon-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.ach-category {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.ach-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
}
.ach-desc {
  font-size: 0.78rem;
  color: #777;
  line-height: 1.7;
  margin: 0;
}

/* ── AWARDS SECTION ──────────────────────────────────────────────────────────── */
.awards-section {
  background: #ffffff;
}

.award-card {
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #edf0f7;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
  height: 100%;
}
.award-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(21, 101, 192, 0.12) !important;
}
.award-top {
  height: 6px;
  width: 100%;
}
.award-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.award-year-tag {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 700;
  color: #888;
  background: #f0f2f7;
  padding: 2px 10px;
  border-radius: 20px;
  letter-spacing: 0.5px;
}
.award-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
}
.award-org {
  font-size: 0.75rem;
  color: #888;
  display: flex;
  align-items: center;
}
.award-desc {
  font-size: 0.78rem;
  color: #777;
  line-height: 1.7;
  margin: 0;
}

/* ── PARTNERSHIPS ────────────────────────────────────────────────────────────── */
.financials-section {
  background: #f5f7fb;
}

/*
  Partner cards — grid layout (3 cols on md) rather than list rows.
  Each card has the icon logo, name, type, and a chip badge.
*/
.partner-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #ffffff;
  border-radius: 14px;
  padding: 16px;
  border: 1px solid #edf0f7;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.partner-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(21, 101, 192, 0.1);
}
.partner-logo-wrap {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.partner-info {
  flex: 1;
  min-width: 0;
}
.partner-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.partner-type {
  font-size: 0.7rem;
  color: #aaa;
  margin-top: 1px;
}
.partner-chip {
  font-size: 0.65rem !important;
  font-weight: 700 !important;
  flex-shrink: 0;
}

/* ── GALLERY ─────────────────────────────────────────────────────────────────── */
.gallery-section {
  background: #f5f7fb;
}

.gallery-main {
  position: relative;
}
.gallery-main-img {
  display: block;
  width: 100%;
}
.gallery-thumb {
  position: relative;
}
.gallery-thumb-img {
  display: block;
  width: 100%;
}
.gallery-caption {
  font-size: 0.72rem;
  color: #888;
  margin-top: 6px;
  line-height: 1.4;
}
.gallery-caption--sm {
  font-size: 0.68rem;
}

/* ── TEAM ────────────────────────────────────────────────────────────────────── */
.team-section {
  background: #ffffff;
}

.team-card {
  border-radius: 16px;
  overflow: hidden;
  background: #f8f9fc;
  border: 1px solid #edf0f7;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
}
.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 28px rgba(21, 101, 192, 0.1);
}
.team-photo-wrap {
  overflow: hidden;
}
.team-photo {
  display: block;
  width: 100%;
}
.team-photo-fallback {
  height: 180px;
  background: #eef4ff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.team-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #1a1a1a;
}
.team-role {
  font-size: 0.72rem;
  color: #888;
  margin-top: 2px;
}
.team-socials {
  display: flex;
  justify-content: center;
  gap: 4px;
}

/* ── TESTIMONIALS ────────────────────────────────────────────────────────────── */
.testimonials-section {
  background: #f5f7fb;
}

.testi-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 32px 28px 28px;
  border: 1px solid #edf0f7;
  position: relative;
  height: 100%;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
}
.testi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(21, 101, 192, 0.1);
}
/* Featured center card — highlighted */
.testi-card--featured {
  background: linear-gradient(145deg, #1565c0, #0d47a1);
  border-color: #1565c0;
}
.testi-card--featured .testi-text {
  color: rgba(255, 255, 255, 0.9);
}
.testi-card--featured .testi-name {
  color: #ffffff;
}
.testi-card--featured .testi-role {
  color: rgba(255, 255, 255, 0.65);
}
.testi-card--featured .quote-mark {
  color: rgba(255, 255, 255, 0.2);
}

.quote-mark {
  font-family: 'Playfair Display', serif;
  font-size: 5rem;
  line-height: 0.6;
  color: #e8edf7;
  margin-bottom: 16px;
  display: block;
}
.testi-text {
  font-size: 0.88rem;
  color: #444;
  line-height: 1.8;
  font-style: italic;
  margin: 0;
}
.testi-author-row {
  display: flex;
  align-items: center;
}
.testi-avatar-wrap {
  flex-shrink: 0;
}
.testi-avatar {
  border: 2px solid #e0e6f5;
}
.testi-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #1a1a1a;
}
.testi-role {
  font-size: 0.72rem;
  color: #aaa;
  margin-top: 1px;
}

/* ── CTA ─────────────────────────────────────────────────────────────────────── */
.cta-section {
  background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
  padding: 72px 0;
}
.cta-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
}
.cta-accent {
  font-style: italic;
  color: #90caf9;
}
.cta-sub {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.72);
  margin: 0;
}
.cta-btn-primary {
  background: #ffffff !important;
  color: #1565c0 !important;
  font-weight: 700 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
}
.cta-btn-outline {
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  color: #ffffff !important;
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
