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
        <router-link
          to="/navigatu"
          class="d-flex align-center ml-4 ml-md-8"
          style="text-decoration: none; color: inherit"
        >
          <v-img src="/images/NaviLogo.jpg" width="55" height="55" class="mr-3" cover />
          <div>
            <div class="nav-brand">NAVIGATÚ</div>
            <div class="nav-sub">Technology Business Incubator</div>
          </div>
        </router-link>

        <v-spacer />

        <div class="d-none d-md-flex align-center mr-6" style="gap: 4px">
          <v-btn variant="text" class="nav-link nav-link--active" to="/about-navigatu">About</v-btn>
          <v-btn variant="text" class="nav-link" to="/services-navigatu">Services</v-btn>
          <v-btn variant="text" class="nav-link" to="/coworking-navigatu">Coworking</v-btn>
          <v-btn variant="text" class="nav-link" to="/news-navigatu">News</v-btn>
          <v-btn variant="text" class="nav-link" to="/events-navigatu">Events</v-btn>
          <div class="nav-search-hover">
            <input
              v-model="navSearchQuery"
              class="nav-search-field"
              type="text"
              placeholder="Search..."
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

    <v-navigation-drawer v-model="drawer" temporary location="right" width="260">
      <v-list nav class="pt-4">
        <v-list-item
          title="About"
          prepend-icon="mdi-information-outline"
          rounded="lg"
          class="mb-1"
          to="/about-navigatu"
          active
        />
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
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <!-- ── LOADING STATE ── -->
      <div v-if="loading" class="d-flex align-center justify-center" style="min-height: 60vh">
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>

      <!-- ── ERROR STATE ── -->
      <div v-else-if="error" class="d-flex align-center justify-center" style="min-height: 60vh">
        <div class="text-center">
          <v-icon icon="mdi-alert-circle-outline" size="52" color="#C62828" />
          <p class="mt-4" style="color: #888; font-size: 0.9rem">{{ error }}</p>
          <v-btn variant="tonal" color="primary" class="mt-4" to="/about-navigatu">
            Back to Incubatees
          </v-btn>
        </div>
      </div>

      <!-- ── CONTENT (only renders once startup data is loaded) ── -->
      <template v-else-if="startup">
        <!-- ===== HERO BANNER ===== -->
        <div class="profile-hero">
          <div class="hero-bg-img">
            <!-- hero_bg from DB; falls back to a solid colour overlay if empty -->
            <v-img
              v-if="startup.hero_bg"
              :src="startup.hero_bg"
              height="100%"
              cover
              class="hero-bg-layer"
            />
          </div>
          <div class="hero-overlay" />

          <v-container class="hero-content-wrap">
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
              <!-- Logo card — logo comes from Supabase Storage public URL -->
              <v-col cols="12" md="3" class="d-flex justify-center justify-md-start">
                <div class="startup-logo-card">
                  <v-img
                    v-if="startup.logo"
                    :src="startup.logo"
                    height="130"
                    contain
                    class="startup-logo-img"
                  />
                  <v-icon v-else icon="mdi-rocket-launch-outline" size="64" color="#1565C0" />
                </div>
              </v-col>

              <!-- Title & meta -->
              <v-col cols="12" md="9" class="hero-text-col">
                <div class="startup-category-chip mb-3">
                  <v-icon icon="mdi-tag-outline" size="13" class="mr-1" />
                  <!-- category column -->
                  {{ startup.category }}
                </div>
                <!-- name column -->
                <h1 class="startup-name">{{ startup.name }}</h1>
                <!-- tagline column -->
                <p class="startup-tagline">{{ startup.tagline }}</p>

                <div class="hero-meta-row mt-4">
                  <div class="hero-meta-item">
                    <v-icon icon="mdi-calendar-start" size="16" class="mr-1" />
                    <!-- year_founded column -->
                    Founded {{ startup.year_founded }}
                  </div>
                  <div v-if="startup.location" class="hero-meta-divider" />
                  <div v-if="startup.location" class="hero-meta-item">
                    <v-icon icon="mdi-map-marker-outline" size="16" class="mr-1" />
                    <!-- location column -->
                    {{ startup.location }}
                  </div>
                </div>

                <div class="mt-4 d-flex align-center flex-wrap gap-3">
                  <!-- status column + status_icon column -->
                  <span class="status-chip" :class="`status-chip--${startup.status}`">
                    <v-icon
                      :icon="startup.status_icon || defaultStatusIcon(startup.status)"
                      size="13"
                      class="mr-1"
                    />
                    {{ startup.status_label || startup.status }}
                  </span>

                  <!-- website column -->
                  <v-btn
                    v-if="startup.website"
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
          Values driven from quick_stats (jsonb column).
          quick_stats is an array of { label, value, icon, color, iconBg }
          saved by the admin form. We use the same 4-stat order.
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
                <!-- description_long column -->
                <p class="body-text mb-4">{{ startup.description_long }}</p>
                <!-- description_extra column -->
                <p v-if="startup.description_extra" class="body-text">
                  {{ startup.description_extra }}
                </p>

                <!-- Problem / Solution — problem + solution columns -->
                <v-row class="mt-8">
                  <v-col v-if="startup.problem" cols="12" sm="6">
                    <div class="ps-card ps-card--problem">
                      <div class="ps-card-icon">
                        <v-icon icon="mdi-alert-circle-outline" size="22" color="#C62828" />
                      </div>
                      <h4 class="ps-card-title">The Problem</h4>
                      <p class="ps-card-body">{{ startup.problem }}</p>
                    </div>
                  </v-col>
                  <v-col v-if="startup.solution" cols="12" sm="6">
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

              <!-- Sidebar details — details jsonb column -->
              <v-col cols="12" md="5" class="pl-md-8">
                <div class="info-sidebar">
                  <h4 class="sidebar-heading mb-4">Startup Details</h4>
                  <div v-for="detail in startup.details" :key="detail.label" class="detail-row">
                    <v-icon
                      :icon="detail.icon || 'mdi-information-outline'"
                      size="18"
                      :color="detail.color || '#1565C0'"
                      class="detail-icon"
                    />
                    <div class="detail-content">
                      <span class="detail-label">{{ detail.label }}</span>
                      <span class="detail-value">{{ detail.value }}</span>
                    </div>
                  </div>

                  <!-- tags column (text[]) — filter out empty values -->
                  <div v-if="getActiveTags.length" class="mt-6">
                    <p class="sidebar-heading mb-3">Focus Areas</p>
                    <div class="d-flex flex-wrap gap-2">
                      <v-chip
                        v-for="tag in getActiveTags"
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
        <!--
          achievements jsonb column
          Each item: { title, desc, photo, year, category, icon, color }
          photo is a Supabase Storage public URL
        -->
        <v-container
          v-if="startup.achievements && startup.achievements.length"
          fluid
          class="achievements-section py-14"
          id="section-milestones"
        >
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
                  <div class="ach-photo-wrap">
                    <v-img v-if="ach.photo" :src="ach.photo" height="190" cover class="ach-photo" />
                    <!-- Fallback placeholder when no photo uploaded -->
                    <div v-else class="ach-photo-placeholder">
                      <v-icon
                        :icon="ach.icon || 'mdi-flag-checkered'"
                        size="48"
                        :color="ach.color || '#1565C0'"
                      />
                    </div>
                    <div class="ach-year-badge">{{ ach.year }}</div>
                  </div>

                  <div class="ach-body pa-5">
                    <div class="ach-icon-row mb-2">
                      <v-icon
                        :icon="ach.icon || 'mdi-flag-checkered'"
                        size="18"
                        :color="ach.color || '#1565C0'"
                      />
                      <span class="ach-category" :style="{ color: ach.color || '#1565C0' }">
                        {{ ach.category }}
                      </span>
                    </div>
                    <h4 class="ach-title mb-2">{{ ach.title }}</h4>
                    <p class="ach-desc">{{ ach.desc }}</p>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
        <!-- Empty anchor target so the strip still works even with no achievements -->
        <div v-else id="section-milestones" style="height: 0" />

        <!-- ===== GALLERY ===== -->
        <!--
          gallery   → text[] of Supabase Storage public URLs
          gallery_captions → text[]
        -->
        <v-container
          v-if="startup.gallery && startup.gallery.length"
          fluid
          class="gallery-section py-14"
        >
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
                  <div class="gallery-caption">
                    {{ startup.gallery_captions?.[0] }}
                  </div>
                </div>
              </v-col>
              <!-- 2×2 grid — remaining up to 4 images -->
              <v-col cols="12" md="6">
                <v-row>
                  <v-col v-for="(img, i) in startup.gallery.slice(1, 5)" :key="i" cols="6">
                    <div class="gallery-thumb">
                      <v-img :src="img" height="158" cover rounded="lg" class="gallery-thumb-img" />
                      <div class="gallery-caption gallery-caption--sm">
                        {{ startup.gallery_captions?.[i + 1] }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-container>

        <!-- ===== PARTNERSHIPS ===== -->
        <!--
          partners jsonb column
          Each item: { name, type, icon, color, logoBg, chipLabel, chipColor }
        -->
        <v-container
          v-if="startup.partners && startup.partners.length"
          fluid
          class="financials-section py-14"
          id="section-partnerships"
        >
          <v-container>
            <p class="section-eyebrow text-center">Network</p>
            <h2 class="section-heading text-center mb-2">
              {{ startup.name }} <span class="accent-text">Partners</span>
            </h2>
            <p class="section-sub text-center mb-10">Organizations that power our growth</p>

            <v-row justify="center">
              <v-col
                v-for="partner in startup.partners"
                :key="partner.name"
                cols="12"
                sm="6"
                md="4"
              >
                <div class="partner-card">
                  <div
                    class="partner-logo-wrap"
                    :style="{ background: partner.logoBg || '#E3F2FD' }"
                  >
                    <v-icon
                      :icon="partner.icon || 'mdi-handshake-outline'"
                      size="28"
                      :color="partner.color || '#1565C0'"
                    />
                  </div>
                  <div class="partner-info">
                    <div class="partner-name">{{ partner.name }}</div>
                    <div class="partner-type">{{ partner.type }}</div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
        <div v-else id="section-partnerships" style="height: 0" />

        <!-- ===== TEAM ===== -->
        <!--
          team jsonb column
          Each item: { name, role, photo, linkedin, email }
          photo is a Supabase Storage public URL
        -->
        <v-container
          v-if="startup.team && startup.team.length"
          fluid
          class="team-section py-14"
          id="section-team"
        >
          <v-container>
            <p class="section-eyebrow text-center">People</p>
            <h2 class="section-heading text-center mb-2">
              Meet the <span class="accent-text">Team</span>
            </h2>
            <p class="section-sub text-center mb-10">The minds behind the innovation</p>

            <v-row justify="center">
              <v-col v-for="member in startup.team" :key="member.name" cols="6" sm="4" md="3">
                <div class="team-card">
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
                    <div class="team-socials mt-2" v-if="member.linkedin || member.email">
                      <v-btn
                        v-if="member.linkedin && member.linkedin !== '#'"
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
        <div v-else id="section-team" style="height: 0" />

        <!-- ===== TESTIMONIALS ===== -->
        <!--
          testimonials jsonb column
          Each item: { name, role, photo, quote }
          photo is a Supabase Storage public URL
        -->
        <v-container
          v-if="startup.testimonials && startup.testimonials.length"
          fluid
          class="testimonials-section py-14"
          id="section-testimonials"
        >
          <v-container>
            <p class="section-eyebrow text-center">Voices</p>
            <h2 class="section-heading text-center mb-2">
              What They <span class="accent-text">Say</span>
            </h2>
            <p class="section-sub text-center mb-12">Success stories in their own words</p>

            <div v-if="shouldUseTestimonialsCarousel" class="testimonials-carousel-shell">
              <div class="testimonials-viewport">
                <div
                  class="testimonials-track"
                  :style="testimonialTrackStyle"
                  @transitionend="handleTestimonialTrackTransitionEnd"
                >
                  <div
                    v-for="(t, i) in carouselTestimonials"
                    :key="`${t.name}-${i}`"
                    class="testimonials-track-item"
                    :style="{ '--visible-cards': visibleTestimonialCards }"
                  >
                    <div class="testi-card">
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
                  </div>
                </div>
              </div>
            </div>

            <v-row v-else>
              <v-col v-for="(t, i) in startup.testimonials" :key="t.name" cols="12" md="4">
                <div class="testi-card" :class="i === 1 ? 'testi-card--featured' : ''">
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
        <div v-else id="section-testimonials" style="height: 0" />

        <!-- ===== CALL TO ACTION ===== -->
        <div class="cta-section">
          <v-container>
            <v-row justify="center">
              <v-col cols="12" md="8" class="text-center">
                <h2 class="cta-title mb-4">
                  Interested in Working with
                  <span class="cta-accent">{{ startup.name }}</span
                  >?
                </h2>
                <p class="cta-sub mb-8">
                  Connect with the team or learn more about their products and services.
                </p>
                <div class="d-flex justify-center flex-wrap gap-4">
                  <!-- contact_email column -->
                  <v-btn
                    v-if="startup.contact_email"
                    color="white"
                    rounded="lg"
                    size="large"
                    class="cta-btn-primary"
                    prepend-icon="mdi-email-outline"
                    :href="`mailto:${startup.contact_email}`"
                  >
                    Contact Team
                  </v-btn>
                  <!-- website column -->
                  <v-btn
                    v-if="startup.website"
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
        </div> </template
      ><!-- end v-else-if startup -->
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const drawer = ref(false)
const navSearchQuery = ref('')
const route = useRoute()
const router = useRouter()

function runNavbarSearch() {
  const query = navSearchQuery.value.trim()
  if (!query) return
  router.push({ path: '/news-navigatu', query: { q: query } })
}

// ── Data state ─────────────────────────────────────────────────────────────
const startup = ref(null)
const loading = ref(true)
const error = ref(null)

// ── Fetch by slug ──────────────────────────────────────────────────────────
// Column names match buildPayload() exactly — all snake_case
onMounted(async () => {
  const slug = route.params.slug

  const { data, error: fetchError } = await supabase
    .from('incubatees')
    .select(
      `
      id,
      tbi_id,
      name,
      tagline,
      category,
      slug,
      year_founded,
      location,
      team_size,
      contact_email,
      website,
      status,
      status_label,
      status_icon,
      tags,
      quick_stats,
      description_long,
      description_extra,
      problem,
      solution,
      details,
      logo,
      hero_bg,
      gallery,
      gallery_captions,
      achievements,
      partners,
      team,
      testimonials,
      created_at
    `,
    )
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  loading.value = false

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      router.replace('/about-navigatu')
      return
    }
    error.value = fetchError.message
    return
  }

  if (!data) {
    router.replace('/about-navigatu')
    return
  }

  startup.value = data
  setupObservers()
})

onMounted(() => {
  window.addEventListener('resize', handleViewportResize)
})

// ── Anchor nav — automatically computed from actual data ───────────────────
// Values dynamically calculate from achievements, partners, team, and testimonials arrays
const anchorTabs = computed(() => [
  {
    id: 'section-milestones',
    label: 'Milestones',
    icon: 'mdi-flag-checkered',
    value: startup.value?.achievements?.length ?? 0,
  },
  {
    id: 'section-partnerships',
    label: 'Partnerships',
    icon: 'mdi-handshake-outline',
    value: startup.value?.partners?.length ?? 0,
  },
  {
    id: 'section-team',
    label: 'Team',
    icon: 'mdi-account-group-outline',
    value: startup.value?.team?.length ?? 0,
  },
  {
    id: 'section-testimonials',
    label: 'Testimonials',
    icon: 'mdi-message-star-outline',
    value: startup.value?.testimonials?.length ?? 0,
  },
])

// ── Tags — filter out empty values from array ──────────────────────────────
const getActiveTags = computed(() => {
  const tags = startup.value?.tags
  if (!Array.isArray(tags)) return []
  return tags.filter((tag) => tag && String(tag).trim().length > 0)
})

// ── Testimonials carousel state ───────────────────────────────────────────
const viewportWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)
const testimonialIndex = ref(0)
const enableTrackTransition = ref(true)
const TESTIMONIAL_AUTOPLAY_MS = 3000
let testimonialsAutoplayTimer = null

const shouldUseTestimonialsCarousel = computed(() => {
  const total = startup.value?.testimonials?.length ?? 0
  return total >= 3
})

const visibleTestimonialCards = computed(() => {
  if (viewportWidth.value >= 960) return 3
  if (viewportWidth.value >= 600) return 2
  return 1
})

const carouselTestimonials = computed(() => {
  const list = startup.value?.testimonials || []
  if (!shouldUseTestimonialsCarousel.value) return list
  return [...list, ...list.slice(0, visibleTestimonialCards.value)]
})

const testimonialTrackStyle = computed(() => {
  const step = 100 / visibleTestimonialCards.value
  return {
    transform: `translateX(-${testimonialIndex.value * step}%)`,
    transition: enableTrackTransition.value ? 'transform 560ms ease' : 'none',
  }
})

function moveToNextTestimonial() {
  if (!shouldUseTestimonialsCarousel.value) return
  testimonialIndex.value += 1
}

function handleTestimonialTrackTransitionEnd() {
  const total = startup.value?.testimonials?.length ?? 0
  if (!total) return

  if (testimonialIndex.value >= total) {
    enableTrackTransition.value = false
    testimonialIndex.value = 0
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        enableTrackTransition.value = true
      })
    })
  }
}

function stopTestimonialsAutoplay() {
  if (testimonialsAutoplayTimer) {
    window.clearInterval(testimonialsAutoplayTimer)
    testimonialsAutoplayTimer = null
  }
}

function startTestimonialsAutoplay() {
  stopTestimonialsAutoplay()
  if (!shouldUseTestimonialsCarousel.value) return
  testimonialsAutoplayTimer = window.setInterval(moveToNextTestimonial, TESTIMONIAL_AUTOPLAY_MS)
}

function handleViewportResize() {
  viewportWidth.value = window.innerWidth
}

watch(
  [
    shouldUseTestimonialsCarousel,
    visibleTestimonialCards,
    () => startup.value?.testimonials?.length,
  ],
  () => {
    testimonialIndex.value = 0
    enableTrackTransition.value = true
    startTestimonialsAutoplay()
  },
)

// ── Status icon fallback ───────────────────────────────────────────────────
function defaultStatusIcon(status) {
  return (
    {
      active: 'mdi-check-circle-outline',
      graduated: 'mdi-school-outline',
      scaling: 'mdi-trending-up',
      draft: 'mdi-pencil-outline',
    }[status] || 'mdi-circle-outline'
  )
}

// ── Anchor nav scroll + intersection observer ──────────────────────────────
const activeSection = ref('section-year-started')

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = 140
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
  activeSection.value = id
}

let observers = []

function setupObservers() {
  requestAnimationFrame(() => {
    ;['section-milestones', 'section-partnerships', 'section-team', 'section-testimonials'].forEach(
      (id) => {
        const el = document.getElementById(id)
        if (!el) return
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) activeSection.value = id
          },
          { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
        )
        obs.observe(el)
        observers.push(obs)
      },
    )
  })
}

onUnmounted(() => {
  observers.forEach((o) => o.disconnect())
  stopTestimonialsAutoplay()
  window.removeEventListener('resize', handleViewportResize)
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

.nav-link--active {
  color: #1565c0 !important;
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
.status-chip--draft {
  background: rgba(100, 100, 100, 0.75);
  color: #ffffff;
}

.website-btn {
  font-size: 0.78rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
}

/* ── ANCHOR NAV STRIP ────────────────────────────────────────────────────────── */
.anchor-strip {
  background: #ffffff;
  border-bottom: 2px solid #eef0f5;
  position: sticky;
  top: 45px;
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
  bottom: -2px;
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

/* ── ABOUT ───────────────────────────────────────────────────────────────────── */
.about-startup-section {
  background: #ffffff;
}

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
/* Placeholder shown when achievement has no photo */
.ach-photo-placeholder {
  height: 190px;
  background: #f0f4ff;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* ── PARTNERSHIPS ────────────────────────────────────────────────────────────── */
.financials-section {
  background: #f5f7fb;
}

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
  transform: translateY(0px);
  box-shadow: 0 5px 20px rgba(21, 101, 192, 0.1);
}
.team-photo-wrap {
  overflow: hidden;
}
.team-photo {
  display: block;
  width: 100%;
  height: 300px !important;
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

.testimonials-carousel-shell {
  position: relative;
}

.testimonials-viewport {
  overflow: hidden;
  margin: 0 -10px;
}

.testimonials-track {
  display: flex;
  align-items: stretch;
  will-change: transform;
}

.testimonials-track-item {
  flex: 0 0 calc(100% / var(--visible-cards));
  max-width: calc(100% / var(--visible-cards));
  padding: 0 10px;
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
