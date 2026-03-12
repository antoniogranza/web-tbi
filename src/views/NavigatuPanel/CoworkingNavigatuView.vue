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
            <!-- FIX: All heights are explicit pixel values, never "100%" -->
            <v-col cols="12" md="7">
              <div class="hero-collage">
                <!-- Main large image -->
                <div class="hero-collage-main">
                  <v-img
                    src="/images/collage/CollageImg1.jpg"
                    height="260"
                    cover
                    rounded="lg"
                    class="collage-main-img"
                  />
                </div>

                <!-- Two stacked small images -->
                <div class="hero-collage-grid">
                  <v-img
                    src="/images/collage/CollageImg2.JPG"
                    height="125"
                    cover
                    rounded="lg"
                    class="collage-sm-img"
                  />
                  <v-img
                    src="/images/collage/CollageImg3.JPG"
                    height="125"
                    cover
                    rounded="lg"
                    class="collage-sm-img"
                  />
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
            <v-col
              v-for="facility in facilities"
              :key="facility.name"
              cols="12"
              sm="6"
              class="mb-2"
            >
              <!-- FIX: facility-card wraps v-img directly; overlay sits on top via position:absolute -->
              <div
                class="facility-card"
                @mouseenter="facility.hovered = true"
                @mouseleave="facility.hovered = false"
              >
                <!-- Image — explicit 280px height -->
                <v-img :src="facility.photo" height="280" cover class="facility-base-img" />

                <!-- Hover overlay -->
                <div
                  class="facility-overlay"
                  :class="{ 'facility-overlay--visible': facility.hovered }"
                >
                  <v-icon :icon="facility.icon" size="36" color="white" class="mb-2" />
                  <h3 class="facility-overlay-name">{{ facility.name }}</h3>
                  <p class="facility-overlay-desc">{{ facility.desc }}</p>
                </div>

                <!-- Bottom pill label — always visible, hides on hover -->
                <div class="facility-label" :class="{ 'facility-label--hidden': facility.hovered }">
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

          <v-row justify="center" class="mt-10 pb-12">
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
                      <!-- Left: Photo — explicit 280px height -->
                      <v-col cols="12" sm="4">
                        <v-img
                          :src="testimonial.photo"
                          height="280"
                          cover
                          class="testimonial-photo-img"
                        />
                      </v-col>

                      <!-- Right: Quote content -->
                      <v-col cols="12" sm="8">
                        <div class="testimonial-content pa-8 pa-md-10">
                          <div class="quote-mark">"</div>
                          <p class="testimonial-text mt-2">{{ testimonial.quote }}</p>
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

// ── Active testimonial index ─────────────────────────────────────────────────
const activeTestimonial = ref(0)

// ── Facility cards ───────────────────────────────────────────────────────────
// FIX: hovered is a plain boolean inside a ref([]) array.
// @mouseenter/@mouseleave toggle it directly on each object.
const facilities = ref([
  {
    name: 'Co-Working Space',
    desc: 'A vibrant open-floor workspace designed to foster collaboration and creativity among startup teams and entrepreneurs.',
    icon: 'mdi-laptop',
    photo: '/images/facilities/FacilityA.JPG',
    hovered: false,
  },
  {
    name: 'Lounge & Breakout Area',
    desc: 'Comfortable seating and relaxed zones where teams can brainstorm, hold informal discussions, and recharge.',
    icon: 'mdi-sofa-outline',
    photo: '/images/facilities/FacilityB.jpg',
    hovered: false,
  },
  {
    name: 'Open Innovation Lab',
    desc: 'A fully-equipped lab for prototyping and development, complete with workstations, tools, and ping-pong for breaks.',
    icon: 'mdi-test-tube',
    photo: '/images/facilities/FacilityC.jpg',
    hovered: false,
  },
  {
    name: 'Inspiration Wall — iTecH',
    desc: 'The iconic "Embark on a Voyage of Innovation" mural — the heart and soul of the Navigatú spirit.',
    icon: 'mdi-wall',
    photo: '/images/facilities/FacilityD.png',
    hovered: false,
  },
])

// ── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = ref([
  {
    quote:
      'Working at Navigatu TBI provides a warm and inspiring atmosphere, enhanced by the open-space concept design, which truly elevates our productivity and creativity.',
    name: 'Riah',
    role: 'Director, TBI',
    photo: '/images/testimonials/TestimonialA.jpg',
  },
  {
    quote:
      'Being part of Navigatú has transformed how I see entrepreneurship. The mentorship, the community, and the facilities here are second to none in the region.',
    name: 'Marco',
    role: 'Program Manager, TBI',
    photo: '/images/testimonials/TestimonialB.png',
  },
  {
    quote:
      'The energy inside iTecH is contagious. Every day I walk in, I am reminded of the mission we share — to cultivate the next generation of Filipino innovators.',
    name: 'Carla',
    role: 'Innovation Lead, TBI',
    photo: '/images/testimonials/TestimonialC.jpg',
  },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

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

/* ── HERO COLLAGE ─────────────────────────────────────────────────────────────
   FIX SUMMARY:
   - .hero-collage has explicit height: 260px
   - .hero-collage-main has explicit height: 260px (not "100%")
   - .hero-collage-grid has explicit height: 260px (not "100%")
   - v-img uses height="260" and height="125" (pixel numbers, never "100%")
   - Each v-img sits directly inside the flex child with overflow:hidden
──────────────────────────────────────────────────────────────────────────────── */
.hero-collage {
  display: flex;
  gap: 10px;
  height: 260px; /* explicit total height */
  border-radius: 16px;
  overflow: hidden;
}

.hero-collage-main {
  flex: 2;
  height: 260px; /* explicit — required for v-img to fill correctly */
  overflow: hidden;
  border-radius: 12px;
}

.collage-main-img {
  width: 100%;
  border-radius: 12px;
}

.hero-collage-grid {
  flex: 1;
  height: 260px; /* explicit — required */
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.collage-sm-img {
  width: 100%;
  border-radius: 12px;
  /* height is set via the height prop on v-img: height="125" */
}

/* ── FACILITY OFFERED ────────────────────────────────────────────────────────── */
.facility-section {
  background: #f5f7fb;
}

/*
  FIX: .facility-card wraps v-img directly.
  position:relative on the card + position:absolute on overlay = correct stacking.
  No nested .facility-img div needed — v-img IS the background.
*/
.facility-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  /* height is driven by v-img height="280" */
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
}
.facility-card:hover {
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
  transform: translateY(-4px);
}

.facility-base-img {
  display: block;
  width: 100%;
  /* scale on hover via CSS transform */
  transition: transform 0.4s ease;
}
.facility-card:hover .facility-base-img {
  transform: scale(1.06);
}

/* Hover overlay — sits on top of the image */
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
  z-index: 2;
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
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin: 0;
}

/* Bottom pill label */
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
  z-index: 3;
  transition: opacity 0.3s ease;
  letter-spacing: 0.3px;
}
.facility-label--hidden {
  opacity: 0; /* FIX: explicit class toggle instead of sibling selector */
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

/* Carousel wrapper — pb-12 on the row gives space for the dot delimiters */
.testimonial-carousel {
  border-radius: 16px !important;
  overflow: visible !important;
}
:deep(.v-carousel__controls) {
  bottom: -44px !important;
}
:deep(.v-btn--icon.v-carousel__controls__item .v-icon) {
  font-size: 10px !important;
  color: #1565c0 !important;
  opacity: 0.35;
}
:deep(.v-btn--icon.v-carousel__controls__item.v-btn--active .v-icon) {
  opacity: 1 !important;
  color: #1565c0 !important;
}

/* Testimonial card */
.testimonial-card {
  border: 1px solid #e0e8f5;
  overflow: hidden;
}

/*
  FIX: testimonial photo is now a plain v-img with height="280".
  No wrapper div needed — v-img handles its own sizing with an explicit height prop.
*/
.testimonial-photo-img {
  display: block;
  width: 100%;
  /* height driven by height="280" prop */
}

/* Quote panel */
.testimonial-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  min-height: 280px;
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
