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
      <!-- ===== ABOUT SECTION ===== -->
      <v-container fluid class="about-section py-12 py-md-16">
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" md="5">
              <v-card rounded="xl" elevation="0" class="about-image-card overflow-hidden">
                <div class="about-image-bg d-flex align-center justify-center">
                  <v-img src="/images/imga.JPG" height="280" cover rounded="xl" />
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
          <v-col cols="12" md="6" class="vision-content d-flex align-center">
            <div class="banner-text-inner px-8 px-sm-12 px-md-16 py-10 py-md-0">
              <p class="banner-eyebrow">Our</p>
              <h2 class="banner-title">Vision</h2>
              <p class="banner-body">
                A socially-engaged digital, innovation, and entrepreneurial university excelling
                globally in science, engineering, and the arts by 2028.
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
              <v-card rounded="xl" elevation="2" class="achievement-card h-100" hover>
                <div
                  class="achievement-icon-row d-flex align-center justify-center"
                  :style="{ background: item.iconBg }"
                >
                  <v-icon :icon="item.icon" size="36" :color="item.color" />
                </div>
                <v-card-item>
                  <p class="achievement-label">{{ item.label }}</p>
                  <p class="achievement-value" :style="{ color: item.color }">{{ item.value }}</p>
                  <p class="achievement-desc">{{ item.desc }}</p>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== MISSION BANNER ===== -->
      <v-container fluid class="mission-banner pa-0">
        <v-row no-gutters class="banner-row">
          <!-- Left: Text -->
          <v-col cols="12" md="6" class="mission-content d-flex align-center">
            <div class="banner-text-inner px-8 px-sm-12 px-md-16 py-10 py-md-0">
              <p class="banner-eyebrow">Our</p>
              <h2 class="banner-title">Mission</h2>
              <p class="banner-body">
                A socially-engaged digital, innovation, and entrepreneurial university excelling
                globally in science, engineering, and the arts by 2028.
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

          <v-row>
            <v-col v-for="company in incubatees" :key="company.name" cols="6" sm="4" md="3">
              <v-card rounded="xl" elevation="2" class="incubatee-card" hover>
                <div
                  class="incubatee-logo d-flex align-center justify-center"
                  :style="{ background: company.bg }"
                >
                  <v-icon :icon="company.icon" size="40" :color="company.color" />
                </div>
                <v-btn
                  block
                  color="primary"
                  variant="flat"
                  rounded="0"
                  class="incubatee-btn"
                  size="small"
                >
                  {{ company.name }}
                </v-btn>
              </v-card>
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
                  <v-avatar size="72" color="blue-grey-lighten-3">
                    <v-icon icon="mdi-account" size="40" color="blue-grey" />
                  </v-avatar>
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
import { ref } from 'vue'

// ── Mobile drawer state ──────────────────────────────────────────────────────
const drawer = ref(false)

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
    desc: 'Total grants from DICT, YCEF-EE and PCIU funds supporting activities for Bukidnon.',
    icon: 'mdi-bank-outline',
    color: '#1565C0',
    iconBg: '#E3F2FD',
  },
  {
    label: 'Facility Established',
    value: '200 sq.m',
    desc: 'Coworking Facility for Tech-based Startups.',
    icon: 'mdi-office-building-outline',
    color: '#2E7D32',
    iconBg: '#E8F5E9',
  },
  {
    label: 'Incubatees',
    value: '142',
    desc: 'Startup Teams formed by ICT and Engineering.',
    icon: 'mdi-account-group-outline',
    color: '#E65100',
    iconBg: '#FFF3E0',
  },
  {
    label: 'Revenues Earned',
    value: '₱20.2M',
    desc: 'Total revenues earned by our Startups.',
    icon: 'mdi-cash-multiple',
    color: '#C62828',
    iconBg: '#FFEBEE',
  },
  {
    label: 'Partnership & Collaboration',
    value: '17',
    desc: 'Local, National and International Partnerships.',
    icon: 'mdi-link-variant',
    color: '#6A1B9A',
    iconBg: '#EDE7F6',
  },
  {
    label: 'Human Capital Development',
    value: '108',
    desc: 'ICT Faculty Members trained via Startups.',
    icon: 'mdi-human-male-board',
    color: '#00695C',
    iconBg: '#E0F2F1',
  },
  {
    label: 'Jobs Created',
    value: '28',
    desc: 'Employees hired through various Startups.',
    icon: 'mdi-briefcase-check-outline',
    color: '#F57F17',
    iconBg: '#FFFDE7',
  },
  {
    label: 'Ecosystem Building',
    value: '1',
    desc: 'Pioneering the Mindanao inter-incubator Network.',
    icon: 'mdi-web',
    color: '#C62828',
    iconBg: '#FCE4EC',
  },
])

// ── Incubatees data ───────────────────────────────────────────────────────────
const incubatees = ref([
  { name: 'Ascribo AI', icon: 'mdi-sprout', color: '#558B2F', bg: '#F1F8E9' },
  { name: 'BizNest', icon: 'mdi-leaf', color: '#2E7D32', bg: '#E8F5E9' },
  { name: 'Care Guardian', icon: 'mdi-heart-pulse', color: '#1565C0', bg: '#E3F2FD' },
  { name: 'Vision Drive', icon: 'mdi-eye-outline', color: '#4527A0', bg: '#EDE7F6' },
  { name: 'Sinawali Showdown', icon: 'mdi-paw', color: '#AD1457', bg: '#FCE4EC' },
  { name: 'ScrapCycle', icon: 'mdi-recycle', color: '#00695C', bg: '#E0F7FA' },
  { name: 'Snap Scout', icon: 'mdi-camera-outline', color: '#E65100', bg: '#FFF3E0' },
  { name: 'ParaGo', icon: 'mdi-atom', color: '#1565C0', bg: '#E8EAF6' },
])

// ── Leadership data ───────────────────────────────────────────────────────────
const leaders = ref([
  { name: 'Dr. Maria Santos', role: 'TBI Director' },
  { name: 'Engr. Jose Reyes', role: 'Program Manager' },
  { name: 'Ms. Ana Cruz', role: 'Operations Lead' },
  { name: 'Mr. Ben Lim', role: 'Tech Advisor' },
  { name: 'Dr. Carlos Tan', role: 'Innovation Head' },
  { name: 'Ms. Liza Dela Cruz', role: 'Finance Officer' },
  { name: 'Mr. Rico Perez', role: 'Startup Mentor' },
  { name: 'Ms. Grace Uy', role: 'Communications' },
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
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: #1a1a1a;
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
  background: #ffffff;
}
.achievement-card {
  transition: transform 0.2s ease;
}
.achievement-card:hover {
  transform: translateY(-4px);
}
.achievement-icon-row {
  height: 72px;
  border-radius: 16px 16px 0 0;
}
.achievement-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #9e9e9e;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 12px 0 2px;
}
.achievement-value {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 6px;
}
.achievement-desc {
  font-size: 0.75rem;
  color: #888;
  line-height: 1.6;
  margin: 0;
}

/* ── Incubatees ────────────────────────────────────────────────────────────────── */
.incubatees-section {
  background: #f5f7fb;
}
.incubatee-card {
  overflow: hidden;
  transition: transform 0.2s ease;
}
.incubatee-card:hover {
  transform: translateY(-4px);
}
.incubatee-logo {
  height: 100px;
  border-radius: 16px 16px 0 0;
}
.incubatee-btn {
  border-radius: 0 !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.3px !important;
}

/* ── Leadership ────────────────────────────────────────────────────────────────── */
.leadership-section {
  background: #ffffff;
}
.leader-card {
  overflow: hidden;
  transition: transform 0.2s ease;
}
.leader-card:hover {
  transform: translateY(-4px);
}
.leader-photo {
  padding: 24px 0 16px;
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

/* ── Footer ─────────────────────────────────────────────────────────────────────── */
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
