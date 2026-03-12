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
      <v-container fluid class="hero-section">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="8" class="text-center">
              <h1 class="hero-title">
                <span class="hero-italic">Your Hub</span> for Innovation and<br />Technopreneurship
              </h1>
              <v-btn
                color="primary"
                variant="outlined"
                rounded="lg"
                size="large"
                class="mt-6 hero-btn"
              >
                Get Started
              </v-btn>
            </v-col>
          </v-row>

          <!-- Tech Category Cards -->
          <v-row justify="center" class="mt-10">
            <v-col v-for="cat in techCategories" :key="cat.title" cols="12" sm="6" md="3">
              <v-card class="tech-card pa-4" flat rounded="xl" hover>
                <div class="tech-icon-wrap mb-3" :style="{ background: cat.iconBg }">
                  <v-icon :icon="cat.icon" :color="cat.color" size="26" />
                </div>
                <v-card-title class="tech-card-title px-0 pb-1">{{ cat.title }}</v-card-title>
                <v-card-text class="tech-card-text px-0 pt-0">{{ cat.desc }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== WHO CAN APPLY SECTION ===== -->
      <v-container fluid class="apply-section py-16">
        <v-container>
          <h2 class="section-title text-center">Who can Apply</h2>
          <p class="section-subtitle text-center mb-12">
            Students, Faculty and Researchers, Early-Stage startups, and Tech Entrepreneurs can
            apply
          </p>

          <v-row>
            <!-- Students -->
            <v-col cols="12" md="6" class="mb-4">
              <v-card class="apply-card apply-card--students h-100" rounded="xl" flat>
                <div class="apply-card-inner pa-8">
                  <div class="apply-badge mb-4">
                    <v-icon icon="mdi-school" size="32" color="white" />
                  </div>
                  <h3 class="apply-card-title">Students</h3>
                  <p class="apply-card-body">
                    Undergraduate and graduate students with innovative ideas ready to turn their
                    academic projects into real-world startups. Get mentorship, resources, and a
                    launchpad to build your first venture.
                  </p>
                  <div class="apply-tags mt-4">
                    <v-chip size="small" class="apply-chip mr-2 mb-2">Undergraduate</v-chip>
                    <v-chip size="small" class="apply-chip mr-2 mb-2">Graduate</v-chip>
                    <v-chip size="small" class="apply-chip mb-2">All Disciplines</v-chip>
                  </div>
                  <div class="apply-deco">🎓</div>
                </div>
              </v-card>
            </v-col>

            <!-- Faculty & Researchers -->
            <v-col cols="12" md="6" class="mb-4">
              <v-card class="apply-card apply-card--faculty h-100" rounded="xl" flat>
                <div class="apply-card-inner pa-8">
                  <div class="apply-badge mb-4">
                    <v-icon icon="mdi-flask-outline" size="32" color="white" />
                  </div>
                  <h3 class="apply-card-title">Faculty & Researchers</h3>
                  <p class="apply-card-body">
                    University professors and researchers looking to commercialize their research
                    findings and innovations. Bridge the gap between academia and industry with
                    expert guidance and funding pathways.
                  </p>
                  <div class="apply-tags mt-4">
                    <v-chip size="small" class="apply-chip mr-2 mb-2">R&D Commercialization</v-chip>
                    <v-chip size="small" class="apply-chip mr-2 mb-2">Academia</v-chip>
                    <v-chip size="small" class="apply-chip mb-2">IP Support</v-chip>
                  </div>
                  <div class="apply-deco">🔬</div>
                </div>
              </v-card>
            </v-col>

            <!-- Early-Stage Startups -->
            <v-col cols="12" md="6" class="mb-4">
              <v-card class="apply-card apply-card--startups h-100" rounded="xl" flat>
                <div class="apply-card-inner pa-8">
                  <div class="apply-badge mb-4">
                    <v-icon icon="mdi-rocket-launch-outline" size="32" color="white" />
                  </div>
                  <h3 class="apply-card-title">Early-Stage Startups</h3>
                  <p class="apply-card-body">
                    Pre-seed and seed-stage startups needing structured support to validate their
                    business model, access funding networks, and scale operations. Join a thriving
                    community of founders and investors.
                  </p>
                  <div class="apply-tags mt-4">
                    <v-chip size="small" class="apply-chip mr-2 mb-2">Pre-Seed</v-chip>
                    <v-chip size="small" class="apply-chip mr-2 mb-2">Seed Stage</v-chip>
                    <v-chip size="small" class="apply-chip mb-2">MVP Ready</v-chip>
                  </div>
                  <div class="apply-deco">🚀</div>
                </div>
              </v-card>
            </v-col>

            <!-- Tech Entrepreneurs -->
            <v-col cols="12" md="6" class="mb-4">
              <v-card class="apply-card apply-card--techpreneurs h-100" rounded="xl" flat>
                <div class="apply-card-inner pa-8">
                  <div class="apply-badge mb-4">
                    <v-icon icon="mdi-lightning-bolt" size="32" color="white" />
                  </div>
                  <h3 class="apply-card-title">Tech Entrepreneurs</h3>
                  <p class="apply-card-body">
                    Experienced entrepreneurs building technology-driven solutions for real market
                    problems. Leverage Navigatú's network, coworking facilities, and ecosystem to
                    accelerate your growth trajectory.
                  </p>
                  <div class="apply-tags mt-4">
                    <v-chip size="small" class="apply-chip mr-2 mb-2">Tech-Driven</v-chip>
                    <v-chip size="small" class="apply-chip mr-2 mb-2">Growth Stage</v-chip>
                    <v-chip size="small" class="apply-chip mb-2">Market Ready</v-chip>
                  </div>
                  <div class="apply-deco">⚡</div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== NAVIGATÚ SERVICES SECTION ===== -->
      <v-container fluid class="services-section py-16">
        <v-container>
          <h2 class="section-title text-center">
            NAVIGATÚ <span class="italic-accent">Services</span>
          </h2>
          <p class="section-subtitle text-center mb-12">
            Students, Faculty and Researchers, Early-Stage startups, and Tech Entrepreneurs can
            apply
          </p>

          <v-row>
            <v-col v-for="svc in navServices" :key="svc.title" cols="12" sm="6" md="3">
              <v-card class="svc-card pa-6 h-100" rounded="xl" flat hover>
                <h4 class="svc-card-title mb-4">{{ svc.title }}</h4>
                <v-list density="compact" class="pa-0 bg-transparent">
                  <v-list-item
                    v-for="item in svc.items"
                    :key="item"
                    :prepend-icon="svc.bulletIcon"
                    :base-color="svc.color"
                    class="svc-list-item px-0"
                    density="compact"
                  >
                    <v-list-item-title class="svc-item-text">{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== SUCCESS STORIES SECTION ===== -->
      <v-container fluid class="stories-section py-16">
        <v-container>
          <h2 class="section-title text-center">
            Success <span class="italic-accent">Stories</span>
          </h2>
          <p class="section-subtitle text-center mb-12">
            Every startup tells a story of success and milestone of their journey
          </p>

          <v-row justify="center">
            <v-col v-for="story in successStories" :key="story.name" cols="12" md="10" class="mb-4">
              <v-card class="story-card pa-0" rounded="xl" flat>
                <v-row no-gutters align="center">
                  <v-col cols="12" sm="3">
                    <div
                      class="story-logo d-flex align-center justify-center"
                      :style="{ background: story.logoBg }"
                    >
                      <v-icon :icon="story.icon" size="48" :color="story.iconColor" />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="9" class="pa-6">
                    <h3 class="story-name mb-2">{{ story.name }}</h3>
                    <p class="story-desc mb-4">{{ story.desc }}</p>
                    <div class="d-flex flex-wrap gap-2">
                      <v-chip size="small" color="primary" variant="tonal">
                        Industry: <strong class="ml-1">{{ story.industry }}</strong>
                      </v-chip>
                      <v-chip size="small" color="success" variant="tonal">
                        Funding Raised: <strong class="ml-1">{{ story.funding }}</strong>
                      </v-chip>
                      <v-chip size="small" color="secondary" variant="tonal">
                        Year: <strong class="ml-1">{{ story.year }}</strong>
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <v-row justify="end" class="mt-4">
            <v-col cols="12" md="10" class="text-right">
              <v-btn variant="outlined" color="primary" rounded="lg" append-icon="mdi-arrow-right">
                More
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-main>

    <!-- ===================== FOOTER ===================== -->
    <v-footer color="grey-darken-4" class="pa-0">
      <v-container class="py-8 text-center">
        <div class="footer-logo mb-2">NAVIGATÚ</div>
        <p class="footer-tagline">Technology Business Incubator</p>
        <v-divider color="white" opacity="0.15" class="my-4" />
        <p class="footer-copy">
          © 2024 Navigatú TBI. All Rights Reserved. · Empowering startups. Building futures.
        </p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

// ── Mobile drawer ────────────────────────────────────────────────────────────
const drawer = ref(false)

// ── Hero tech categories ─────────────────────────────────────────────────────
const techCategories = ref([
  {
    title: 'ICT & Software Development',
    desc: 'Mobile apps, web platforms, enterprise software solutions.',
    icon: 'mdi-monitor-cellphone',
    color: '#1565C0',
    iconBg: '#E3F2FD',
  },
  {
    title: 'Artificial Intelligence',
    desc: 'Machine learning, computer vision, NLP applications.',
    icon: 'mdi-brain',
    color: '#F9A825',
    iconBg: '#FFF8E1',
  },
  {
    title: 'Internet of Things',
    desc: 'Smart devices, sensors, connected systems.',
    icon: 'mdi-access-point-network',
    color: '#1565C0',
    iconBg: '#E3F2FD',
  },
  {
    title: 'Engineering Tech',
    desc: 'Digital tools for engineering and manufacturing.',
    icon: 'mdi-cog-outline',
    color: '#F9A825',
    iconBg: '#FFF8E1',
  },
])

// ── Navigatú services ────────────────────────────────────────────────────────
const navServices = ref([
  {
    title: 'Technical Support',
    bulletIcon: 'mdi-circle-small',
    color: '#1565C0',
    items: ['Software Development', 'Cloud Infrastructure', 'Technical Mentorship', 'Code Reviews'],
  },
  {
    title: 'Business Development',
    bulletIcon: 'mdi-circle-small',
    color: '#2E7D32',
    items: [
      'Business Model Design',
      'Market Validation',
      'Go-to-Market Strategy',
      'Sales Coaching',
    ],
  },
  {
    title: 'Funding Access',
    bulletIcon: 'mdi-circle-small',
    color: '#E65100',
    items: ['Seed Funding', 'Investor Connections', 'Pitch Preparations', 'Grant Applications'],
  },
  {
    title: 'Workspace & Facilities',
    bulletIcon: 'mdi-circle-small',
    color: '#6A1B9A',
    items: ['Co-working Space', 'Meeting Rooms', 'High Speed Internet', 'Development Tools'],
  },
])

// ── Success stories ───────────────────────────────────────────────────────────
const successStories = ref([
  {
    name: 'Ascribo AI',
    desc: 'Ascribo.AI is a context-aware AI language translation platform that delivers accurate, nuanced translations; solving the problem of inaccurate language translations. Those suffering from inaccurate translations oftentimes use services that do not guarantee quality or pay a hefty price of hiring a professional, since most critical fields such as law, medicine, and marketing require accurate translations to avoid chaos.',
    industry: 'Artificial Intelligence',
    funding: '₱2M',
    year: '2023',
    icon: 'mdi-translate',
    iconColor: '#F9A825',
    logoBg: '#FFFDE7',
  },
  {
    name: 'BizNest',
    desc: 'BizNest is a smart business management platform built for micro and small enterprises in the Philippines. It simplifies operations by integrating inventory management, point-of-sale, financial tracking, and customer relationship tools in one seamless digital workspace.',
    industry: 'Business Technology',
    funding: '₱1.5M',
    year: '2022',
    icon: 'mdi-store-outline',
    iconColor: '#1565C0',
    logoBg: '#E3F2FD',
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

/* ── Shared section titles ───────────────────────────────────────────────────── */
.section-title {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: 900;
  color: #5f5f5f;
  margin-bottom: 6px;
}
.italic-accent {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #1565c0;
}
.section-subtitle {
  font-size: 0.88rem;
  color: #9e9e9e;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}

/* ── HERO ────────────────────────────────────────────────────────────────────── */
.hero-section {
  background: #f0f3fa;
  padding-top: 72px;
  padding-bottom: 72px;
}
.hero-title {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.25;
}
.hero-italic {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #1565c0;
  font-weight: 600;
}
.hero-btn {
  font-family: 'DM Sans', sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.3px !important;
  text-transform: none !important;
  border-width: 1.5px !important;
}

/* Tech category cards */
.tech-card {
  background: #ffffff;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: default;
}
.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 28px rgba(21, 101, 192, 0.12) !important;
}
.tech-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tech-card-title {
  font-size: 0.92rem !important;
  font-weight: 700 !important;
  color: #1a1a1a;
  white-space: normal !important;
  line-height: 1.3 !important;
}
.tech-card-text {
  font-size: 0.78rem !important;
  color: #888 !important;
  line-height: 1.6 !important;
}

/* ── WHO CAN APPLY ───────────────────────────────────────────────────────────── */
.apply-section {
  background: #ffffff;
}

.apply-card {
  position: relative;
  overflow: hidden;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
.apply-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1) !important;
}
.apply-card-inner {
  position: relative;
  z-index: 1;
}

/* Per-card color themes */
.apply-card--students {
  background: linear-gradient(145deg, #e8f0fe 0%, #c5d8ff 100%);
}
.apply-card--faculty {
  background: linear-gradient(145deg, #e8f5e9 0%, #b8e6bc 100%);
}
.apply-card--startups {
  background: linear-gradient(145deg, #fff3e0 0%, #ffcc80 100%);
}
.apply-card--techpreneurs {
  background: linear-gradient(145deg, #f3e5f5 0%, #ce93d8 100%);
}

.apply-badge {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.apply-card--students .apply-badge {
  background: #1565c0;
}
.apply-card--faculty .apply-badge {
  background: #2e7d32;
}
.apply-card--startups .apply-badge {
  background: #e65100;
}
.apply-card--techpreneurs .apply-badge {
  background: #6a1b9a;
}

.apply-card-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 10px;
}
.apply-card-body {
  font-size: 0.87rem;
  color: #444;
  line-height: 1.75;
  margin: 0;
}
.apply-chip {
  background: rgba(255, 255, 255, 0.65) !important;
  color: #333 !important;
  font-weight: 600 !important;
  font-size: 0.72rem !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
}

/* Decorative emoji */
.apply-deco {
  position: absolute;
  top: 16px;
  right: 24px;
  font-size: 3rem;
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}

/* ── NAVIGATÚ SERVICES ───────────────────────────────────────────────────────── */
.services-section {
  background: #f0f3fa;
}

.svc-card {
  background: #ffffff;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.svc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(21, 101, 192, 0.1) !important;
}
.svc-card-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
}
.svc-list-item {
  min-height: 28px !important;
}
.svc-item-text {
  font-size: 0.8rem !important;
  color: #555 !important;
}

/* ── SUCCESS STORIES ─────────────────────────────────────────────────────────── */
.stories-section {
  background: #ffffff;
}

.story-card {
  border: 1px solid #e8eaf0;
  transition: box-shadow 0.2s ease;
}
.story-card:hover {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08) !important;
}
.story-logo {
  height: 100%;
  min-height: 160px;
  border-radius: 16px 0 0 16px;
}
.story-name {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a1a;
}
.story-desc {
  font-size: 0.84rem;
  color: #666;
  line-height: 1.75;
  margin: 0;
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
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
  margin: 0;
}
.footer-copy {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}
</style>
