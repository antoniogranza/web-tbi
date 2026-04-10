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
              v-model="navSearchQuery"
              class="nav-search-field"
              type="text"
              placeholder="Search..."
            />
            <v-btn variant="text" icon size="small" class="nav-search-icon-btn">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </div>
          <button class="nav-apply-btn ml-2">Apply Now</button>
        </div>

        <v-app-bar-nav-icon class="d-flex d-md-none mr-2" @click="drawer = !drawer" />
      </v-container>
    </v-app-bar>

    <!-- Mobile Drawer -->
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
      <template #append>
        <div class="pa-4">
          <button class="nav-apply-btn" style="width: 100%">Apply Now</button>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- ===================== MAIN CONTENT ===================== -->
    <v-main>
      <!-- ===== ABOUT SECTION ===== -->
      <v-container fluid class="about-section py-12 py-md-16">
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" md="5">
              <v-card rounded="xl" elevation="0" class="about-image-card overflow-hidden">
                <div class="about-image-bg d-flex align-center justify-center">
                  <v-img src="/images/AboutImg.JPG" height="280" cover rounded="xl" />
                  <div class="about-image-overlay">
                    <v-chip color="white" variant="elevated" size="small" class="font-weight-bold">
                      <v-icon start icon="mdi-lightning-bolt" size="14" />
                      Innovation Hub
                    </v-chip>
                  </div>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" md="7" class="pl-md-10">
              <p class="about-eyebrow">About</p>
              <h1 class="about-title">NAVIGATÚ</h1>
              <p class="about-body">
                At Navigatú, we provide services that fit your startup project and suits your needs
                to upscale your own business venture.
              </p>
              <v-btn
                color="primary"
                rounded="lg"
                size="large"
                append-icon="mdi-arrow-right"
                class="mt-2"
                elevation="2"
              >
                Read More
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== SERVICES SECTION ===== -->
      <v-container fluid class="services-section py-12">
        <v-container>
          <h2 class="section-title text-center mb-8">Services Offered</h2>
          <v-row>
            <v-col v-for="service in services" :key="service.title" cols="12" sm="6" md="4">
              <v-card rounded="xl" elevation="3" class="service-card h-100" hover>
                <div
                  class="service-card-img d-flex align-center justify-center"
                  :style="{ background: service.gradient }"
                >
                  <v-icon :icon="service.icon" size="52" color="white" />
                </div>
                <v-card-item>
                  <v-card-title class="service-card-title">{{ service.title }}</v-card-title>
                  <v-card-text class="service-card-text pt-1">{{
                    service.description
                  }}</v-card-text>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== VISION BANNER ===== -->
      <v-container fluid class="vision-banner pa-0">
        <v-row no-gutters class="banner-row">
          <!-- Left: Text -->
          <v-col cols="12" md="6" class="vision-content d-flex align-center pl-lg-16">
            <div class="banner-text-inner px-8 px-sm-10 px-md-12 py-10 py-md-0">
              <p class="banner-eyebrow">Our</p>
              <h2 class="banner-title">Vision</h2>
              <p class="banner-body">
                A prime technology business incubator of sustainable startups in Southern
                Philippines
              </p>
            </div>
          </v-col>

          <!-- Right: Image -->
          <v-col cols="12" md="6" class="vision-image-col d-flex align-center justify-center">
            <div class="banner-img-wrap">
              <v-img
                src="/images/VisionImg.jpg"
                height="320"
                cover
                rounded="xl"
                class="banner-img"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!-- ===== ACHIEVEMENTS SECTION ===== -->
      <v-container fluid class="achievements-section py-14">
        <v-container>
          <h2 class="section-title text-center">
            NAVIGATÚ <span class="italic-accent">Achievements</span>
          </h2>
          <p class="section-subtitle text-center mb-10">Our milestones for 7 Years of Operations</p>

          <v-row>
            <v-col v-for="item in achievements" :key="item.label" cols="12" sm="6" md="3">
              <v-card rounded="lg" elevation="3" class="achievement-card h-100" hover>
                <!-- Colored top banner with white icon -->
                <div class="achievement-top" :style="{ background: item.color }">
                  <v-icon :icon="item.icon" size="52" color="white" />
                </div>

                <!-- White body: label, big value, description -->
                <div class="achievement-body">
                  <p class="achievement-label">{{ item.label }}</p>
                  <p class="achievement-value">{{ item.value }}</p>
                  <p class="achievement-desc">{{ item.desc }}</p>
                </div>

                <!-- Colored bottom accent bar -->
                <div class="achievement-bottom-bar" :style="{ background: item.color }" />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== MISSION BANNER ===== -->
      <v-container fluid class="mission-banner pa-0">
        <v-row no-gutters class="banner-row">
          <!-- Left: Text -->
          <v-col cols="12" md="6" class="mission-content d-flex align-center pl-lg-16">
            <div class="banner-text-inner px-8 px-sm-10 px-md-12 py-10 py-md-0">
              <p class="banner-eyebrow">Our</p>
              <h2 class="banner-title">Mission</h2>
              <p class="banner-body">
                Our mission is to contribute to the prominent success of emerging technopreneurs in
                southern Philippines through strategic partnerships, relevant education and training
                programs, networking, business-enabling assistance, and facilitate the creation of
                spinoffs or startups from research and development, towards job creation in specific
                sectors that are aligned in our region's unique area of opportunity.
              </p>
            </div>
          </v-col>

          <!-- Right: Image -->
          <v-col cols="12" md="6" class="mission-image-col d-flex align-center justify-center">
            <div class="banner-img-wrap">
              <v-img
                src="/images/MissionImg.jpg"
                height="320"
                cover
                rounded="xl"
                class="banner-img"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!-- ===== INCUBATEES SECTION ===== -->
      <v-container fluid class="incubatees-section py-14">
        <v-container>
          <h2 class="section-title text-center">
            NAVIGATÚ <span class="italic-accent">Incubatees</span>
          </h2>
          <p class="section-subtitle text-center mb-10">Our milestones for 7 Years of Operations</p>

          <v-row justify="center">
            <v-col v-for="company in incubatees" :key="company.name" cols="6" sm="4" md="3">
              <!--
                Clickable card — navigates to company route on click.
                White background top (logo area) + blue label bar revealed on hover.
              -->
              <div
                class="incubatee-card"
                @click="$router.push(`/incubatees/${company.slug}`)"
                @mouseenter="company.hovered = true"
                @mouseleave="company.hovered = false"
              >
                <!-- White logo area -->
                <div class="incubatee-logo-area">
                  <v-img :src="company.photo" height="150" contain class="incubatee-img" />
                </div>

                <!-- Blue label bar — slides up on hover -->
                <div
                  class="incubatee-label"
                  :class="{ 'incubatee-label--visible': company.hovered }"
                >
                  <span class="incubatee-label-text">{{ company.name }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== LEADERSHIP SECTION ===== -->
      <v-container fluid class="leadership-section py-14">
        <v-container>
          <h2 class="section-title text-center">
            Leadership <span class="italic-accent">Team</span>
          </h2>
          <p class="section-subtitle text-center mb-10">Meet the team driving Navigatú TBI</p>

          <v-row>
            <v-col v-for="leader in leaders" :key="leader.name" cols="12" sm="6" md="3">
              <v-card rounded="xl" elevation="1" class="leader-card" hover>
                <div class="leader-photo d-flex align-center justify-center">
                  <v-img :src="leader.photo" height="320" cover class="leader-img" />
                </div>
                <v-card-item class="text-center pb-4">
                  <v-card-title class="leader-name">{{ leader.name }}</v-card-title>
                  <v-card-subtitle class="leader-role">{{ leader.role }}</v-card-subtitle>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== FAQ ===== -->
      <div class="sec-white py-sec">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="7">
              <div class="text-center mb-12">
                <div class="eyebrow" style="color: #ea580c">Got questions?</div>
                <h2 class="sec-title">Frequently Asked <em>Questions</em></h2>
              </div>
              <div class="faq-list">
                <div
                  v-for="(faq, i) in faqs"
                  :key="faq.q"
                  class="faq-item"
                  :class="{ 'faq-item--open': openFaq === i }"
                  @click="openFaq = openFaq === i ? null : i"
                >
                  <div class="faq-row">
                    <span class="faq-q">{{ faq.q }}</span>
                    <v-icon class="faq-icon" size="18">{{
                      openFaq === i ? 'mdi-minus' : 'mdi-plus'
                    }}</v-icon>
                  </div>
                  <transition name="fx">
                    <div v-if="openFaq === i" class="faq-ans">{{ faq.a }}</div>
                  </transition>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
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
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

// ── Mobile drawer state ──────────────────────────────────────────────────────
const drawer = ref(false)
const navSearchQuery = ref('')

// ── Services data ────────────────────────────────────────────────────────────
const services = ref([
  {
    title: 'Incubation Program',
    description:
      'Comprehensive support for early-stage startups to develop and scale their innovative ideas into market-ready ventures.',
    icon: 'mdi-lightbulb-on-outline',
    gradient: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)',
  },
  {
    title: 'Mentorship Program',
    description:
      'One-on-one guidance from industry experts and seasoned entrepreneurs to accelerate your business growth.',
    icon: 'mdi-handshake-outline',
    gradient: 'linear-gradient(135deg, #1B5E20 0%, #66BB6A 100%)',
  },
  {
    title: 'Training Program',
    description:
      'Workshops and seminars covering entrepreneurship, technology, finance, and business development skills.',
    icon: 'mdi-school-outline',
    gradient: 'linear-gradient(135deg, #4A148C 0%, #AB47BC 100%)',
  },
])

// ── Achievements data ─────────────────────────────────────────────────────────
const achievements = ref([
  {
    label: 'Funding Received',
    value: '₱10.4M',
    desc: 'Through partnership with DOST PCIEERD and Public Funds to establish the facility & all related activities for the promotion of Startups.',
    icon: 'mdi-cash-multiple',
    color: '#1565C0', // blue — matches screenshot
  },
  {
    label: 'Facility Established',
    value: '200 sq.m',
    desc: '10m x 20m facility for tech-based Startups.',
    icon: 'mdi-office-building-outline',
    color: '#00897B', // teal/green — matches screenshot
  },
  {
    label: 'Incubatees',
    value: '142',
    desc: 'Venture Teams formed in the ICT, and Engineering.',
    icon: 'mdi-account-group-outline',
    color: '#EF6C00', // orange — matches screenshot
  },
  {
    label: 'Revenues Earned',
    value: '₱20.2M',
    desc: 'Total Revenues Generated by Startups.',
    icon: 'mdi-sack',
    color: '#C62828', // red — matches screenshot
  },
  {
    label: 'Partnership & Collaboration',
    value: '17',
    desc: '14 Local Partners · 3 International Partners established.',
    icon: 'mdi-handshake-outline',
    color: '#6A1B9A', // purple — matches screenshot
  },
  {
    label: 'Human Capital Development',
    value: '108',
    desc: '50 Faculty Wadwahni Certified · 16 MSMEs · 46 Startups.',
    icon: 'mdi-account-tie-outline',
    color: '#558B2F', // dark green — matches screenshot
  },
  {
    label: 'Jobs Created',
    value: '28',
    desc: 'Employees hired through various startups.',
    icon: 'mdi-lightbulb-on-outline',
    color: '#F9A825', // yellow/amber — matches screenshot
  },
  {
    label: 'Ecosystem Building',
    value: '1',
    desc: 'Consortium created and integrating HEIs, DOST, and DICT into one innovation network.',
    icon: 'mdi-hub-outline',
    color: '#B71C1C', // dark red — matches screenshot
  },
])

/* Incubatees data is loaded from Supabase — admin side writes to the same table. */
const incubatees = ref([])

async function fetchIncubatees() {
  const { data, error } = await supabase
    .from('incubatees')
    .select('id,name,slug,logo,status')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[AboutNavigatuView] fetchIncubatees error', error)
    return
  }

  incubatees.value = (data ?? []).map((item) => ({
    name: item.name || 'Untitled',
    slug: item.slug || item.id,
    photo: item.logo || '/images/incubatees/logo/default.png',
    hovered: false,
  }))
}

onMounted(fetchIncubatees)

// ── Leadership data ───────────────────────────────────────────────────────────
const leaders = ref([
  {
    name: 'Dr. Riah E. Encarnacion',
    photo: '/images/leaders/TbiDirector.jpg',
    role: 'TBI Director',
  },
  {
    name: 'John Mark B. Correa',
    photo: '/images/leaders/JohnMarkCorrea.jpg',
    role: 'TBI Project Head',
  },
  {
    name: 'Mary Pilar J. Barber',
    photo: '/images/leaders/MaryPilarBarber.jpg',
    role: 'Community Development Project Head',
  },
  { name: 'Mr. Ben Lim', role: 'Tech Advisor' },
  { name: 'Dr. Carlos Tan', role: 'Innovation Head' },
  { name: 'Ms. Liza Dela Cruz', role: 'Finance Officer' },
  { name: 'Mr. Rico Perez', role: 'Startup Mentor' },
  { name: 'Ms. Grace Uy', role: 'Communications' },
])

const openFaq = ref(null)
const faqs = ref([
  {
    q: 'How long is the incubation program?',
    a: 'The core program runs for 6 months, with optional alumni support and mentorship continuing beyond graduation.',
  },
  {
    q: 'Is there an equity or fee requirement?',
    a: 'Navigatú TBI does not take equity. Some programs may have a modest participation fee depending on services availed.',
  },
  {
    q: 'Do I need a registered business to apply?',
    a: 'No — you can apply as an individual or informal team. We assist with business registration as part of the program.',
  },
  {
    q: 'Can teams outside Butuan City apply?',
    a: 'Yes! We accept applications across Caraga and beyond through our hybrid program.',
  },
  {
    q: 'What happens after the program ends?',
    a: 'Graduates join the Navigatú Alumni Network with continued mentorship and investor introductions.',
  },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ── Global ──────────────────────────────────────────────────────────────────── */
.v-application {
  font-family: 'DM Sans', sans-serif !important;
}

/* ── Navbar ─────────────────────────────────────────────────────────────────── */
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
.gap-nav {
  gap: 4px;
}

/* ── About ───────────────────────────────────────────────────────────────────── */
.about-section {
  background: #ffffff;
}

.about-image-card {
  min-height: 280px;
  background: transparent;
}
.about-image-bg {
  height: 280px;
  background: linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #42a5f5 100%);
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}
.about-image-overlay {
  position: absolute;
  bottom: 16px;
  left: 16px;
}
.about-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  color: #9e9e9e;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.about-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #1565c0;
  line-height: 1.05;
  margin-bottom: 16px;
}
.about-body {
  color: #555;
  line-height: 1.8;
  font-size: 0.95rem;
  max-width: 480px;
  margin-bottom: 8px;
}

/* ── Section common ──────────────────────────────────────────────────────────── */
.section-title {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 900;
  color: #5f5f5f;
  margin-bottom: 4px;
}
.italic-accent {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #1565c0;
}
.section-subtitle {
  font-size: 0.82rem;
  color: #9e9e9e;
  letter-spacing: 0.5px;
}

/* ── Services ────────────────────────────────────────────────────────────────── */
.services-section {
  background: #f5f7fb;
}
.service-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.service-card:hover {
  transform: translateY(-6px);
}
.service-card-img {
  height: 180px;
  border-radius: 16px 16px 0 0;
}
.service-card-title {
  padding-left: 15px !important;
  font-size: 1rem !important;
  font-weight: 700 !important;
  color: #1a1a1a;
  white-space: normal !important;
  line-height: 1.3 !important;
}
.service-card-text {
  font-size: 0.82rem !important;
  color: #666;
  line-height: 1.7 !important;
}

/* ── Vision / Mission banners ─────────────────────────────────────────────────── */
.vision-banner {
  background: #1565c0;
  min-height: 420px; /* increased from 300px */
}
.mission-banner {
  background: #0d47a1;
  min-height: 420px; /* increased from 300px */
}
.vision-content,
.mission-content {
  background: transparent;
}

/* .banner-row makes the v-row stretch to fill the banner's min-height */
.banner-row {
  min-height: 420px;
}

/* Text side — full height flex so content stays vertically centered */
.banner-text-inner {
  width: 100%;
  max-width: 520px;
}

.banner-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 0;
}
.banner-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 3.5vw, 2.8rem); /* slightly larger */
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
  line-height: 1.1;
}
.banner-body {
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.9;
  font-size: 1rem; /* slightly larger than before */
  max-width: 460px;
}

/* Image columns — padding creates visible banner bg on all sides */
.vision-image-col {
  padding: 40px 48px; /* generous padding so bg shows around image */
  min-height: 420px; /* ensures col fills banner height on desktop */
}
.mission-image-col {
  padding: 40px 48px;
  min-height: 420px;
}

/* Image wrapper — constrained width, rounded corners, shadow */
.banner-img-wrap {
  width: 100%;
  max-width: 440px; /* wider than before (was 380px) */
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.32);
}
.banner-img {
  display: block;
  width: 100%;
  /* height controlled by height="320" on the v-img prop */
}

/* ── Responsive: stack vertically on mobile ──────────────────────────────────── */
@media (max-width: 959px) {
  .vision-banner,
  .mission-banner {
    min-height: unset; /* let content define height on mobile */
  }
  .banner-row {
    min-height: unset;
  }
  .vision-image-col,
  .mission-image-col {
    min-height: unset;
    padding: 0 24px 32px; /* less padding on mobile, top handled by text col */
  }
  .banner-img-wrap {
    max-width: 100%; /* full width on mobile */
  }
  .banner-text-inner {
    max-width: 100%;
  }
}

/* ── Achievements ─────────────────────────────────────────────────────────────── */
.achievements-section {
  background: #f5f7fb;
}

.achievement-card {
  overflow: hidden;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
  display: flex;
  flex-direction: column;
}
.achievement-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.14) !important;
}

/*
  Colored top banner — full card width, square-ish, holds white icon.
  Matches the screenshot where each card has a distinct solid color header.
*/
.achievement-top {
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/*
  White body — label, big bold value, smaller desc text.
  flex: 1 so it grows to fill space between top banner and bottom bar,
  keeping all cards the same height in a row.
*/
.achievement-body {
  flex: 1;
  padding: 16px 20px 14px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

/* Label — small grey uppercase text, like "Funding Received" */
.achievement-label {
  font-size: 0.78rem;
  font-weight: 500;
  color: #666;
  text-align: center;
  margin: 0 0 4px;
  line-height: 1.4;
}

/* Big value — bold, matches screenshot's large "10.4M", "142", etc. */
.achievement-value {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  line-height: 1.1;
  margin: 0 0 10px;
}

/* Description — small centered text below the value */
.achievement-desc {
  font-size: 0.72rem;
  color: #888;
  line-height: 1.65;
  text-align: center;
  margin: 0;
  flex: 1;
}

/*
  Colored bottom accent bar — thin strip matching the top banner color.
  Matches the screenshot's bottom colored line on each card.
*/
.achievement-bottom-bar {
  height: 10px;
  width: 100%;
  flex-shrink: 0;
}

/* ── Incubatees ────────────────────────────────────────────────────────────────── */
.incubatees-section {
  background: #f5f7fb;
}

/*
  Card wrapper — plain div (not v-card) so we control everything.
  White background, rounded corners, shadow, pointer cursor for clickability.
  position:relative so the label bar can be absolutely positioned at the bottom.
  height: 200px kept as requested — logo area fills top, label slides up from bottom.
*/
.incubatee-card {
  position: relative;
  width: 100%;
  height: 200px;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
.incubatee-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(21, 101, 192, 0.18);
}

/* White logo area — takes the full card space above the label */
.incubatee-logo-area {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 16px;
}

/* Logo image — contain so it never crops, stays fully visible */
.incubatee-img {
  display: block;
  width: 100%;
}

/*
  Blue label bar — sits at the bottom of the card.
  Hidden by default (translateY(100%) pushes it below the card).
  On hover (.incubatee-label--visible) it slides up into view.
  Height matches the screenshot: ~48px solid primary blue.
*/
.incubatee-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: #1565c0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  transform: translateY(100%); /* hidden below card by default */
  transition: transform 0.3s ease;
}
.incubatee-label--visible {
  transform: translateY(0); /* slides up into view on hover */
}

.incubatee-label-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.3px;
  text-align: center;
}

/* ── Leadership ────────────────────────────────────────────────────────────────── */
.leadership-section {
  background: #ffffff;
}
.leader-card {
  overflow: hidden;
  transition: transform 0.2s ease;
  /*height: 320px;*/
}
.leader-card:hover {
  transform: translateY(-4px);
}
.leader-photo {
  /*padding: 24px 0 16px; */
  background: #eef2fa;
}
.leader-name {
  font-size: 0.9rem !important;
  font-weight: 700 !important;
  color: #1a1a1a;
  white-space: normal !important;
  line-height: 1.3 !important;
}
.leader-role {
  font-size: 0.78rem !important;
  color: #888 !important;
}

/* ── FAQ Section Helpers (from Service style) ── */
.eyebrow {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #1565c0;
  margin-bottom: 10px;
}
.sec-title {
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  font-weight: 700;
  color: #0f172a;
  line-height: 1.18;
  margin-bottom: 10px;
}
.sec-title em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #1565c0;
}
.sec-sub {
  font-size: 0.86rem;
  color: #94a3b8;
  line-height: 1.8;
  max-width: 500px;
  margin: 0 auto;
}
.sec-white {
  background: #fff;
}
.py-sec {
  padding-top: 84px;
  padding-bottom: 84px;
}

/* ── FAQ ── */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.faq-item {
  border: 1.5px solid #e5eaf5;
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.2s;
}
.faq-item--open {
  border-color: #c4d5f7;
}
.faq-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  cursor: pointer;
  gap: 14px;
}
.faq-q {
  font-size: 0.87rem;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.4;
}
.faq-icon {
  flex-shrink: 0;
  color: #94a3b8;
  transition: color 0.2s;
}
.faq-item--open .faq-icon {
  color: #1565c0;
}
.faq-ans {
  padding: 0 22px 18px;
  font-size: 0.81rem;
  color: #64748b;
  line-height: 1.8;
}

/* FAQ expand/collapse transition */
.fx-enter-active,
.fx-leave-active {
  transition: all 0.22s ease;
}

.fx-enter-from,
.fx-leave-to {
  opacity: 0;
  transform: translateY(-6px);
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
