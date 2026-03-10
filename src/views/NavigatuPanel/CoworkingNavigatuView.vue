<template>
  <v-app>
    <!-- ===================== NAVIGATION BAR ===================== -->
    <v-app-bar flat color="white" border="b" height="64">
      <v-container class="d-flex align-center pa-0" fluid>
        <div class="d-flex align-center ml-4 ml-md-8">
          <v-avatar color="primary" size="40" class="mr-3">
            <v-icon icon="mdi-compass" color="white" size="22" />
          </v-avatar>
          <div>
            <div class="nav-brand">NAVIGATÚ</div>
            <div class="nav-sub">Technology Business Incubator</div>
          </div>
        </div>

        <v-spacer />

        <div class="d-none d-md-flex align-center mr-6">
          <v-btn variant="text" class="nav-link" to="/about-navigatu">About</v-btn>
          <v-btn
            variant="text"
            class="nav-link"
            to="/services-navigatu"
            append-icon="mdi-chevron-down"
            >Services</v-btn
          >
          <v-btn variant="text" class="nav-link" to="/coworking-navigatu">Coworking</v-btn>
          <v-btn variant="text" icon="mdi-magnify" size="small" />
        </div>

        <v-app-bar-nav-icon class="d-flex d-md-none" @click="drawer = !drawer" />
      </v-container>
    </v-app-bar>

    <!-- Mobile Drawer -->
    <v-navigation-drawer v-model="drawer" temporary location="right">
      <v-list nav>
        <v-list-item title="About" prepend-icon="mdi-information-outline" />
        <v-list-item title="Services" prepend-icon="mdi-briefcase-outline" />
        <v-list-item title="Coworking" prepend-icon="mdi-office-building-outline" />
      </v-list>
    </v-navigation-drawer>

    <!-- ===================== MAIN CONTENT ===================== -->
    <v-main>
      <!-- ===== HERO SECTION ===== -->
      <v-container fluid class="hero-section py-10 py-md-16">
        <v-container>
          <v-row align="center" justify="center">
            <!-- Left: Text -->
            <v-col cols="12" md="5">
              <p class="hero-eyebrow mb-1">
                NAVIGATÚ <span class="hero-eyebrow-italic">Facility</span>
              </p>
              <p class="hero-body mt-4 mb-6">
                The Innovation and Technopreneurship Hub (iTecH) of Caraga State University
              </p>
              <v-btn
                variant="outlined"
                color="primary"
                rounded="lg"
                append-icon="mdi-arrow-right"
                class="hero-btn"
              >
                Get Started
              </v-btn>
            </v-col>

            <!-- Right: Image collage -->
            <v-col cols="12" md="7">
              <div class="hero-collage">
                <div class="hero-collage-main">
                  <div class="collage-img collage-img--main">
                    <v-icon
                      icon="mdi-office-building"
                      size="64"
                      color="white"
                      style="opacity: 0.35"
                    />
                  </div>
                </div>
                <div class="hero-collage-grid">
                  <div class="collage-img collage-img--sm collage-img--blue">
                    <v-icon icon="mdi-sofa" size="36" color="white" style="opacity: 0.4" />
                  </div>
                  <div class="collage-img collage-img--sm collage-img--teal">
                    <v-icon icon="mdi-desk" size="36" color="white" style="opacity: 0.4" />
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== FACILITY OFFERED SECTION ===== -->
      <v-container fluid class="facility-section py-14">
        <v-container>
          <h2 class="section-title text-center">Facility Offered</h2>
          <p class="section-subtitle text-center mb-12">
            Our facility to offer to activities such as
            <strong>Pitching Competition</strong>, <strong>Startup Incubation</strong>, and
            <strong>Workshop</strong>
          </p>

          <v-row>
            <v-col v-for="facility in facilities" :key="facility.name" cols="12" sm="6">
              <!-- Hover card with overlay name reveal -->
              <div
                class="facility-card"
                @mouseenter="facility.hovered = true"
                @mouseleave="facility.hovered = false"
              >
                <!-- Background gradient as placeholder for image -->
                <div class="facility-img" :style="{ background: facility.gradient }">
                  <v-img :src="facility.photo" height="280" cover />
                </div>

                <!-- Hover overlay -->
                <div
                  class="facility-overlay"
                  :class="{ 'facility-overlay--visible': facility.hovered }"
                >
                  <v-icon :icon="facility.icon" size="36" color="white" class="mb-2" />
                  <h3 class="facility-overlay-name">{{ facility.name }}</h3>
                  <p class="facility-overlay-desc">{{ facility.desc }}</p>
                </div>

                <!-- Bottom label (always visible) -->
                <div class="facility-label">
                  <v-icon :icon="facility.icon" size="16" color="white" class="mr-1" />
                  {{ facility.name }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== STAFF TESTIMONIALS CAROUSEL ===== -->
      <v-container fluid class="testimonials-section py-14">
        <v-container>
          <h2 class="section-title text-center">
            <span class="testimonial-title-bold">NAVIGATÚ</span>
            <span class="testimonial-title-italic"> Staff Testimonials</span>
          </h2>

          <v-row justify="center" class="mt-10">
            <v-col cols="12" md="10">
              <v-carousel
                v-model="activeTestimonial"
                hide-delimiter-background
                :show-arrows="false"
                delimiter-icon="mdi-circle"
                height="auto"
                class="testimonial-carousel"
              >
                <v-carousel-item v-for="(testimonial, i) in testimonials" :key="i">
                  <v-card class="testimonial-card" flat rounded="xl">
                    <v-row no-gutters align="stretch">
                      <!-- Left: Photo -->
                      <v-col cols="12" sm="4">
                        <div class="testimonial-photo" :style="{ background: testimonial.photoBg }">
                          <v-img :src="testimonial.photo" height="280" cover />
                        </div>
                      </v-col>

                      <!-- Right: Quote content -->
                      <v-col cols="12" sm="8">
                        <div class="testimonial-content pa-8 pa-md-10">
                          <!-- Big quote mark -->
                          <div class="quote-mark">"</div>

                          <p class="testimonial-text mt-2">
                            {{ testimonial.quote }}
                          </p>

                          <div class="testimonial-author mt-6">
                            <span class="author-name">{{ testimonial.name }}</span>
                            <span class="author-role">{{ testimonial.role }}</span>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-main>

    <!-- ===================== FOOTER ===================== -->
    <v-footer color="grey-darken-4" class="pa-0">
      <v-container class="py-8 text-center">
        <div class="footer-logo mb-1">NAVIGATÚ</div>
        <p class="footer-tagline">Technology Business Incubator</p>
        <v-divider color="white" opacity="0.15" class="my-4" />
        <p class="footer-copy">© 2024 Navigatú TBI. All Rights Reserved.</p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

// ── Mobile drawer ────────────────────────────────────────────────────────────
const drawer = ref(false)

// ── Active testimonial index for carousel ────────────────────────────────────
const activeTestimonial = ref(0)

// ── Facility cards with hover state ─────────────────────────────────────────
const facilities = ref([
  {
    name: 'Co-Working Space',
    desc: 'A vibrant open-floor workspace designed to foster collaboration and creativity among startup teams and entrepreneurs.',
    icon: 'mdi-laptop',
    photo: '/images/imga.JPG',
    gradient: 'linear-gradient(145deg, #1565C0 0%, #42A5F5 100%)',
    hovered: false,
  },
  {
    name: 'Lounge & Breakout Area',
    desc: 'Comfortable seating and relaxed zones where teams can brainstorm, hold informal discussions, and recharge.',
    icon: 'mdi-sofa-outline',
    photo: '/images/FacilityB.jpg',
    gradient: 'linear-gradient(145deg, #37474F 0%, #78909C 100%)',
    hovered: false,
  },
  {
    name: 'Open Innovation Lab',
    desc: 'A fully-equipped lab for prototyping and development, complete with workstations, tools, and ping-pong for breaks.',
    icon: 'mdi-test-tube',
    photo: '/images/FacilityC.jpg',
    gradient: 'linear-gradient(145deg, #1B5E20 0%, #66BB6A 100%)',
    hovered: false,
  },
  {
    name: 'Inspiration Wall — iTecH',
    desc: 'The iconic "Embark on a Voyage of Innovation" mural wall — the heart and soul of the Navigatú spirit.',
    icon: 'mdi-wall',
    photo: '/images/FacilityD.png',
    gradient: 'linear-gradient(145deg, #4A148C 0%, #AB47BC 100%)',
    hovered: false,
  },
])

// ── Testimonials data ────────────────────────────────────────────────────────
const testimonials = ref([
  {
    quote:
      'Working at Navigatu TBI provides a warm and inspiring atmosphere, enhanced by the open-space concept design, which truly elevates our productivity and creativity.',
    name: 'Riah',
    role: 'Director, TBI',
    photo: '/images/TestimonialA.jpg',
  },
  {
    quote:
      'Being part of Navigatú has transformed how I see entrepreneurship. The mentorship, the community, and the facilities here are second to none in the region.',
    name: 'Marco',
    role: 'Program Manager, TBI',
    photo: '/images/TestimonialB.png',
    photoBg: 'linear-gradient(145deg, #1565C0 0%, #42A5F5 100%)',
  },
  {
    quote:
      'The energy inside iTecH is contagious. Every day I walk in, I am reminded of the mission we share — to cultivate the next generation of Filipino innovators.',
    name: 'Carla',
    role: 'Innovation Lead, TBI',
    photo: '/images/TestimonialC.jpg',
    photoBg: 'linear-gradient(145deg, #1B5E20 0%, #66BB6A 100%)',
  },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600&family=Caveat:wght@600&display=swap');

/* ── Global ──────────────────────────────────────────────────────────────────── */
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

/* ── Shared ──────────────────────────────────────────────────────────────────── */
.section-title {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 6px;
}
.section-subtitle {
  font-size: 0.88rem;
  color: #888;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}

/* ── HERO ────────────────────────────────────────────────────────────────────── */
.hero-section {
  background: #ffffff;
}

.hero-eyebrow {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.2;
  margin: 0;
}
.hero-eyebrow-italic {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 600;
  font-size: 1.1em;
  color: #1565c0;
}
.hero-body {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.75;
  max-width: 340px;
}
.hero-btn {
  text-transform: none !important;
  font-weight: 600 !important;
  letter-spacing: 0.2px !important;
}

/* Hero collage */
.hero-collage {
  display: flex;
  gap: 10px;
  height: 260px;
  border-radius: 16px;
  overflow: hidden;
}
.hero-collage-main {
  flex: 2;
}
.hero-collage-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.collage-img {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.collage-img--main {
  background: linear-gradient(145deg, #1a237e 0%, #1565c0 60%, #42a5f5 100%);
  flex-direction: column;
  gap: 8px;
}
.collage-img--blue {
  background: linear-gradient(145deg, #37474f, #78909c);
}
.collage-img--teal {
  background: linear-gradient(145deg, #004d40, #26a69a);
}
.collage-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
}

/* ── FACILITY OFFERED ────────────────────────────────────────────────────────── */
.facility-section {
  background: #f5f7fb;
}

.facility-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  height: 280px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
}
.facility-card:hover {
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
  transform: translateY(-4px);
}

.facility-img {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
}
.facility-card:hover .facility-img {
  transform: scale(1.06);
}

/* Hover overlay */
.facility-overlay {
  position: absolute;
  inset: 0;
  background: rgba(13, 71, 161, 0.88);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px;
  text-align: center;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
  border-radius: 16px;
}
.facility-overlay--visible {
  opacity: 1;
  transform: translateY(0);
}
.facility-overlay-name {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 10px;
}
.facility-overlay-desc {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.7;
  margin: 0;
}

/* Bottom label pill (always visible) */
.facility-label {
  position: absolute;
  bottom: 14px;
  left: 14px;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  backdrop-filter: blur(4px);
  transition: opacity 0.3s ease;
  letter-spacing: 0.3px;
}
.facility-overlay--visible ~ .facility-label {
  opacity: 0;
}

/* ── TESTIMONIALS ─────────────────────────────────────────────────────────────── */
.testimonials-section {
  background: #ffffff;
}

.testimonial-title-bold {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: 1px;
}
.testimonial-title-italic {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 600;
  color: #1565c0;
}

/* Vuetify carousel overrides */
.testimonial-carousel {
  border-radius: 16px !important;
  overflow: visible !important;
}
:deep(.v-carousel__controls) {
  padding-top: 20px !important;
  bottom: -40px !important;
}
:deep(.v-btn--icon.v-carousel__controls__item .v-icon) {
  font-size: 10px !important;
  color: #1565c0 !important;
  opacity: 0.4;
}
:deep(.v-btn--icon.v-carousel__controls__item.v-btn--active .v-icon) {
  opacity: 5;
  color: #1565c0 !important;
}

/* Testimonial card */
.testimonial-card {
  border: 1px solid #44acff;
  overflow: hidden;
  min-height: 240px;
}

/* Left photo side */
.testimonial-photo {
  height: 100%;
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Right quote side */
.testimonial-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
}

.quote-mark {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  color: #1565c0;
  line-height: 0.8;
  font-weight: 700;
  opacity: 0.75;
}

.testimonial-text {
  font-size: 0.9rem;
  color: #444;
  line-height: 1.8;
  margin: 0;
  max-width: 420px;
}

.testimonial-author {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.author-name {
  font-family: 'DM Sans', sans-serif;
  font-weight: 800;
  font-size: 1rem;
  color: #1a1a1a;
}
.author-role {
  font-size: 0.82rem;
  color: #888;
}

/* ── FOOTER ──────────────────────────────────────────────────────────────────── */
.footer-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 2px;
}
.footer-tagline {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 1px;
  margin: 0;
}
.footer-copy {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.35);
  margin: 0;
}
</style>
