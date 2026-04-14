<template>
  <v-app>
    <!-- ===================== NAVIGATION BAR (unchanged) ===================== -->
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
        </div>
        <v-app-bar-nav-icon class="d-flex d-md-none mr-2" @click="drawer = !drawer" />
      </v-container>
    </v-app-bar>

    <!-- Mobile Drawer (unchanged) -->
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

    <!-- ===================== MAIN CONTENT ===================== -->
    <v-main>
      <!-- ===== HERO — full-bleed diagonal split ===== -->
      <div class="about-hero">
        <!-- Right panel: full-bleed photo -->
        <div class="hero-photo-panel">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85"
            alt="Navigatú team"
            class="hero-photo-img"
          />
          <!-- dark gradient over photo so text on left stays legible at overlap -->
          <div class="hero-photo-veil" />
        </div>

        <!-- Diagonal cut SVG mask that clips the left white panel -->
        <div class="hero-left-panel py-sm-10 py-md-0">
          <div class="hero-left-content px-4 px-sm-6 px-md-10 px-lg-16 px-xl-16">
            <!-- Breadcrumb-style label -->

            <!-- Vertical accent line + heading -->
            <div class="hero-heading-wrap mt-5">
              <div class="hero-accent-bar" />
              <div>
                <p class="hero-overline">Technology Business Incubator</p>
                <h1 class="hero-title">
                  Turning bold<br />
                  <em>ideas</em> into<br />
                  real ventures.
                </h1>
              </div>
            </div>

            <p class="hero-body mt-6 mb-8">
              At Navigatú, we provide services that fit your startup project and suit your needs —
              empowering emerging Filipino technopreneurs to build, validate, and scale impactful
              ventures across Southern Philippines.
            </p>

            <!-- CTA row -->
            <div class="d-flex flex-wrap ga-3 mb-10">
              <button class="btn-solid" @click="videoDialog = true">
                <v-icon size="16" class="mr-2">mdi-play-circle-outline</v-icon>Watch Our Story
              </button>
              <button class="btn-line">
                <v-icon size="16" class="mr-2">mdi-arrow-right</v-icon>Read More
              </button>
            </div>
          </div>
        </div>

        <!-- Floating badge pinned over the diagonal edge -->
        <div class="hero-edge-badge d-none d-md-flex">
          <v-icon size="14" color="#1565C0" class="mr-1">mdi-lightning-bolt</v-icon>
          Innovation Hub · Butuan City
        </div>
      </div>

      <!-- ===== VISION & MISSION ===== -->
      <div class="vm-section py-12 py-md-14 py-xl-16">
        <v-container>
          <!-- VISION -->
          <v-row align="center" class="mb-12 mb-md-16">
            <v-col cols="12" md="6" class="mb-8 mb-md-0">
              <div class="vm-img-wrap">
                <img src="/public/images/VisionImg.jpg" alt="Vision" class="vm-img" />
                <div class="vm-float-chip vm-float-chip--blue">
                  <v-icon size="13" class="mr-1">mdi-eye-outline</v-icon>Our Vision
                </div>
                <!-- Year badge -->
                <div class="vm-year-badge">
                  <span class="vm-year-num">7</span>
                  <span class="vm-year-sub">Years</span>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="pl-md-14">
              <div class="vm-eyebrow" style="color: #1565c0">Vision</div>
              <h2 class="vm-title">A Prime <em>Tech Incubator</em><br />in the South</h2>
              <p class="vm-body mt-5 mb-7">
                A prime technology business incubator of sustainable startups in Southern
                Philippines.
              </p>
              <div class="vm-tag-row">
                <span class="vm-tag vm-tag--blue">Sustainable Startups</span>
                <span class="vm-tag vm-tag--blue">Southern Philippines</span>
                <span class="vm-tag vm-tag--blue">Innovation Culture</span>
              </div>
            </v-col>
          </v-row>

          <!-- MISSION (image right) -->
          <v-row align="center" class="flex-md-row-reverse">
            <v-col cols="12" md="6" class="mb-8 mb-md-0">
              <div class="vm-img-wrap">
                <img src="/public/images/collage/CollageImg1.jpg" alt="Mission" class="vm-img" />
                <div class="vm-float-chip vm-float-chip--green">
                  <v-icon size="13" class="mr-1">mdi-bullseye-arrow</v-icon>Our Mission
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="pr-md-14">
              <div class="vm-eyebrow" style="color: #059669">Mission</div>
              <h2 class="vm-title">Empowering <em>Technopreneurs</em><br />for Impact</h2>
              <p class="vm-body mt-5 mb-7">
                Our mission is to contribute to the prominent success of emerging technopreneurships
                in southern Philippines through strategic partnerships, relevant education and
                training programs, networking, business-enabling assistance, and facilitate the
                creation of spinoffs or startups from research and development, towards job creation
                in specific sectors that are aligned in our regions unique areas of opportunity.
              </p>
              <div class="vm-tag-row">
                <span class="vm-tag vm-tag--green">Strategic Partnerships</span>
                <span class="vm-tag vm-tag--green">R&D Spinoffs</span>
                <span class="vm-tag vm-tag--green">Job Creation</span>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- ===== SERVICES ===== -->
      <div class="services-band py-12 py-md-14 py-xl-16">
        <v-container>
          <div class="text-center mb-14">
            <div class="band-eyebrow">What We Offer</div>
            <h2 class="band-title">Services <em>Offered</em></h2>
            <p class="band-sub">
              Three flagship programs to take your idea from concept to company
            </p>
          </div>

          <v-row>
            <v-col v-for="(svc, i) in services" :key="svc.title" cols="12" md="4">
              <div
                class="svc-card"
                :class="{ 'svc-card--hover': hoveredSvc === i }"
                @mouseenter="hoveredSvc = i"
                @mouseleave="hoveredSvc = null"
              >
                <div class="svc-icon-zone" :style="{ background: svc.gradient }">
                  <v-icon :icon="svc.icon" size="44" color="white" />
                  <div class="svc-icon-glow" :style="{ background: svc.glowColor }" />
                </div>
                <div class="svc-body pa-6">
                  <h3 class="svc-title mb-3">{{ svc.title }}</h3>
                  <p class="svc-desc mb-5">{{ svc.description }}</p>
                  <button class="svc-btn" :style="{ '--sc': svc.accentColor }">
                    Learn More <v-icon size="13" class="ml-1">mdi-arrow-right</v-icon>
                  </button>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- ===== ACHIEVEMENTS ===== -->
      <div class="ach-band py-12 py-md-14 py-xl-16">
        <div class="ach-band-glow" />
        <v-container class="position-relative">
          <div class="text-center mb-14">
            <div class="band-eyebrow" style="color: rgba(255, 255, 255, 0.45)">Milestones</div>
            <h2 class="band-title" style="color: #fff">NAVIGATÚ <em>Achievements</em></h2>
            <p class="band-sub" style="color: rgba(255, 255, 255, 0.45)">
              Our milestones for 7 years of operations
            </p>
          </div>

          <v-row>
            <v-col v-for="item in achievements" :key="item.label" cols="12" sm="6" md="3">
              <div
                class="ach-card"
                :class="{ 'ach-card--hover': hoveredAch === item.label }"
                @mouseenter="hoveredAch = item.label"
                @mouseleave="hoveredAch = null"
              >
                <div class="ach-top" :style="{ background: item.color }">
                  <v-icon :icon="item.icon" size="36" color="white" />
                </div>
                <div class="ach-body">
                  <div class="ach-label">{{ item.label }}</div>
                  <div class="ach-value">{{ item.value }}</div>
                  <p class="ach-desc">{{ item.desc }}</p>
                </div>
                <div class="ach-bar" :style="{ background: item.color }" />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- ===== INCUBATEES (original Supabase logic retained) ===== -->
      <v-container fluid class="incubatees-section py-12 py-md-14 py-xl-16">
        <v-container>
          <h2 class="section-title text-center">
            NAVIGATÚ <span class="italic-accent">Incubatees</span>
          </h2>
          <p class="section-subtitle text-center mb-10">Our milestones for 7 Years of Operations</p>

          <div class="d-flex justify-center flex-wrap ga-2 mb-8">
            <v-btn
              v-for="filter in incubateeFilters"
              :key="filter.value"
              rounded="pill"
              :variant="activeIncubateeFilter === filter.value ? 'flat' : 'outlined'"
              :color="activeIncubateeFilter === filter.value ? 'primary' : 'grey-darken-1'"
              size="small"
              class="text-none"
              @click="activeIncubateeFilter = filter.value"
            >
              {{ filter.label }}
            </v-btn>
          </div>

          <v-row justify="center">
            <v-col v-for="company in filteredIncubatees" :key="company.name" cols="6" sm="4" md="3">
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

          <p
            v-if="!filteredIncubatees.length"
            class="section-subtitle text-center mt-2"
          >
            No startups found for this filter.
          </p>
        </v-container>
      </v-container>

      <!-- ===== VIDEO DIALOG ===== -->
      <v-dialog v-model="videoDialog" max-width="760" transition="dialog-bottom-transition">
        <v-card rounded="xl" class="overflow-hidden pa-0">
          <div
            class="d-flex align-center justify-space-between pa-4 pb-3"
            style="border-bottom: 1px solid #f1f5f9"
          >
            <span style="font-weight: 700; font-size: 0.95rem; font-family: 'Sora', sans-serif"
              >Navigatú Story</span
            >
            <v-btn icon size="small" variant="text" @click="videoDialog = false"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
          <div class="video-wrap">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Navigatú Story"
              allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
              "
              allowfullscreen
              class="video-iframe"
            />
          </div>
        </v-card>
      </v-dialog>

      <!-- ===== FAQ ===== -->
      <div class="faq-band py-12 py-md-14 py-xl-16">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="7">
              <div class="text-center mb-12">
                <div class="band-eyebrow" style="color: #ea580c">Got questions?</div>
                <h2 class="band-title">Frequently Asked <em>Questions</em></h2>
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

    <!-- ===================== FOOTER (unchanged) ===================== -->
    <footer class="footer-section">
      <v-container class="py-8 py-md-10 py-xl-12">
        <v-row>
          <v-col cols="12" md="4" class="mb-8">
            <div class="footer-brand mb-1">NAVIGATÚ</div>
            <p class="footer-tag mb-4">Technology Business Incubator</p>
            <p class="footer-desc">
              Empowering the next generation of Filipino tech founders through mentorship,
              innovation, and community.
            </p>
            <div class="d-flex flex-wrap ga-3 mt-5">
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
              <button class="nl-btn"><v-icon size="17">mdi-send</v-icon></button>
            </div>
          </v-col>
        </v-row>
        <div class="footer-hr" />
        <div class="d-flex flex-wrap justify-space-between align-center pt-4 pt-md-6 ga-2">
          <p class="footer-copy">© 2024 Navigatú TBI. All Rights Reserved.</p>
          <p class="footer-copy">Empowering startups. Building futures.</p>
        </div>
      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

// ── Navbar / drawer ──
const drawer = ref(false)
const navSearchQuery = ref('')

// ── UI state ──
const videoDialog = ref(false)
const hoveredSvc = ref(null)
const hoveredAch = ref(null)
const openFaq = ref(null)

// ── Services ──
const services = ref([
  {
    title: 'Incubation Program',
    description:
      'Comprehensive 6-month support for early-stage startups to develop, validate, and scale their innovative ideas into market-ready ventures.',
    icon: 'mdi-lightbulb-on-outline',
    gradient: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)',
    glowColor: 'rgba(21,101,192,0.4)',
    accentColor: '#1565C0',
  },
  {
    title: 'Mentorship Program',
    description:
      'One-on-one guidance from industry experts, seasoned entrepreneurs, and academic researchers to accelerate your business growth.',
    icon: 'mdi-handshake-outline',
    gradient: 'linear-gradient(135deg, #1B5E20 0%, #66BB6A 100%)',
    glowColor: 'rgba(27,94,32,0.4)',
    accentColor: '#2E7D32',
  },
  {
    title: 'Training Program',
    description:
      'Workshops, bootcamps, and seminars covering entrepreneurship, tech development, financial modeling, and business strategy.',
    icon: 'mdi-school-outline',
    gradient: 'linear-gradient(135deg, #4A148C 0%, #AB47BC 100%)',
    glowColor: 'rgba(74,20,140,0.4)',
    accentColor: '#7B1FA2',
  },
])

// ── Achievements ──
const achievements = ref([
  {
    label: 'Funding Received',
    value: '₱10.4M',
    desc: 'Through partnership with DOST PCIEERD and public funds to establish the facility & all related activities.',
    icon: 'mdi-cash-multiple',
    color: '#1565C0',
  },
  {
    label: 'Facility Established',
    value: '200 sq.m',
    desc: '10m × 20m facility for tech-based startups.',
    icon: 'mdi-office-building-outline',
    color: '#00897B',
  },
  {
    label: 'Incubatees',
    value: '142',
    desc: 'Venture teams formed in ICT and Engineering.',
    icon: 'mdi-account-group-outline',
    color: '#EF6C00',
  },
  {
    label: 'Revenues Earned',
    value: '₱20.2M',
    desc: 'Total revenues generated by startups.',
    icon: 'mdi-sack',
    color: '#C62828',
  },
  {
    label: 'Partnership & Collaboration',
    value: '17',
    desc: '14 Local Partners · 3 International Partners established.',
    icon: 'mdi-handshake-outline',
    color: '#6A1B9A',
  },
  {
    label: 'Human Capital Development',
    value: '108',
    desc: '50 Faculty Certified · 16 MSMEs · 46 Startups.',
    icon: 'mdi-account-tie-outline',
    color: '#558B2F',
  },
  {
    label: 'Jobs Created',
    value: '28',
    desc: 'Employees hired through various startups.',
    icon: 'mdi-lightbulb-on-outline',
    color: '#F9A825',
  },
  {
    label: 'Ecosystem Building',
    value: '1',
    desc: 'Consortium integrating HEIs, DOST, and DICT into one innovation network.',
    icon: 'mdi-hub-outline',
    color: '#B71C1C',
  },
])

// ── Incubatees — original Supabase logic (unchanged) ──
const incubatees = ref([])
const incubateeFilters = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Graduated', value: 'graduated' },
]
const activeIncubateeFilter = ref('all')

const filteredIncubatees = computed(() => {
  if (activeIncubateeFilter.value === 'all') {
    return incubatees.value
  }

  return incubatees.value.filter((company) => company.status === activeIncubateeFilter.value)
})

async function fetchIncubatees() {
  const { data, error } = await supabase
    .from('incubatees')
    .select('id,name,slug,logo,status')
    .in('status', ['active', 'graduated'])
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[AboutNavigatuView] fetchIncubatees error', error)
    return
  }

  incubatees.value = (data ?? []).map((item) => ({
    name: item.name || 'Untitled',
    slug: item.slug || item.id,
    photo: item.logo || '/images/incubatees/logo/default.png',
    status: String(item.status || '').toLowerCase(),
    hovered: false,
  }))
}

onMounted(fetchIncubatees)

// ── FAQs ──
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
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&family=Sora:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}
.v-application {
  font-family: 'Sora', sans-serif !important;
}

/* ── NAVBAR (unchanged) ── */
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
  font-family: 'DM Sans', sans-serif;
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
.w-full {
  width: 100%;
}

/* ── BUTTON SYSTEM ── */
.btn-solid {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #1565c0, #2563eb);
  color: #fff;
  font-family: 'Sora', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  padding: 13px 26px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(21, 101, 192, 0.38);
  transition: all 0.22s;
}
.btn-solid:hover {
  transform: translateY(0px);
  box-shadow: 0 10px 30px rgba(21, 101, 192, 0.5);
}
.btn-line {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.12);
  color: #1a1a1a;
  font-family: 'Sora', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  border: 1.5px solid rgba(21, 101, 192, 0.35);
  border-radius: 50px;
  padding: 12px 26px;
  cursor: pointer;
  transition: all 0.22s;
  backdrop-filter: blur(6px);
}
.btn-line:hover {
  background: rgba(21, 101, 192, 0.06);
  border-color: #1565c0;
  transform: translateY(0px);
}

/* ── SHARED SECTION STYLES ── */
.band-eyebrow {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #1565c0;
  margin-bottom: 10px;
}
.band-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  font-weight: 700;
  color: #0f172a;
  line-height: 1.18;
  margin-bottom: 10px;
}
.band-title em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #1565c0;
}
.band-sub {
  font-size: 0.86rem;
  color: #94a3b8;
  line-height: 1.8;
  max-width: 500px;
  margin: 0 auto;
}

/* ══════════════════════════════════════════
   HERO — diagonal split layout
   Left: white panel with text
   Right: full-bleed photo behind a diagonal clip
   ══════════════════════════════════════════ */
.about-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  padding-top: 64px; /* navbar height */
}

/* Full-bleed photo fills the entire hero container */
.hero-photo-panel {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
/* gradient veil: solid white on far left → transparent on right */
.hero-photo-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    #ffffff 0%,
    #ffffff 48%,
    rgba(255, 255, 255, 0.82) 58%,
    rgba(255, 255, 255, 0) 75%
  );
}

/* Left content panel sits on top of the veil */
.hero-left-panel {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 620px;
  display: flex;
  align-items: center;
}
.hero-left-content {
  width: 100%;
}

.hero-label-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
  flex-shrink: 0;
}
.hero-label-text {
  white-space: nowrap;
}

/* Vertical accent bar + overline + heading */
.hero-heading-wrap {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
.hero-accent-bar {
  width: 5px;
  min-height: 120px;
  border-radius: 4px;
  background: linear-gradient(180deg, #1565c0, #2563eb 50%, #93c5fd);
  flex-shrink: 0;
  margin-top: 6px;
}
.hero-overline {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 10px;
}
.hero-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2.2rem, 4.5vw, 3.6rem);
  font-weight: 700;
  color: #0a0f1e;
  line-height: 1.12;
}
.hero-title em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #1565c0;
  font-weight: 600;
}
.hero-body {
  font-size: 0.96rem;
  color: #475569;
  line-height: 1.9;
  max-width: 440px;
}

.ribbon-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 8px;
  border-right: 1px solid #e2e8f0;
  gap: 3px;
}
.ribbon-item:last-child {
  border-right: none;
}
.ribbon-val {
  font-family: 'Sora', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #1565c0;
  line-height: 1;
}
.ribbon-label {
  font-size: 0.6rem;
  color: #94a3b8;
  letter-spacing: 0.3px;
  text-align: center;
  line-height: 1.3;
}

/* Edge badge (floats over the diagonal seam) */
.hero-edge-badge {
  position: absolute;
  right: 32px;
  bottom: 36px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(10px);
  border: 1px solid #dbeafe;
  border-radius: 50px;
  padding: 8px 18px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #0f172a;
  box-shadow: 0 6px 20px rgba(21, 101, 192, 0.12);
  display: flex;
  align-items: center;
}

/* Mobile: stack everything */
@media (max-width: 959px) {
  .about-hero {
    min-height: unset;
    padding-top: 0px;
  }
  .hero-photo-veil {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.97) 55%,
      rgba(255, 255, 255, 0.3) 100%
    );
  }

  .hero-accent-bar {
    min-height: 90px;
  }
  .hero-edge-badge {
    display: none !important;
  }
}

/* ── VISION / MISSION ── */
.vm-section {
  background: #fff;
}

.vm-img-wrap {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 20px 56px rgba(0, 0, 0, 0.1);
}
.vm-img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  display: block;
}
.vm-float-chip {
  position: absolute;
  top: 18px;
  left: 18px;
  border-radius: 50px;
  padding: 6px 14px;
  font-size: 0.7rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  backdrop-filter: blur(8px);
}
.vm-float-chip--blue {
  background: rgba(219, 234, 254, 0.92);
  color: #1565c0;
}
.vm-float-chip--green {
  background: rgba(209, 250, 229, 0.92);
  color: #065f46;
}

.vm-year-badge {
  position: absolute;
  bottom: 18px;
  right: 18px;
  background: linear-gradient(135deg, #1565c0, #2563eb);
  border-radius: 14px;
  padding: 12px 16px;
  text-align: center;
  color: #fff;
  box-shadow: 0 8px 20px rgba(21, 101, 192, 0.35);
}
.vm-year-num {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1;
}
.vm-year-sub {
  display: block;
  font-size: 0.6rem;
  opacity: 0.7;
  margin-top: 2px;
}

.vm-eyebrow {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.vm-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
}
.vm-title em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #1565c0;
}
.vm-body {
  font-size: 0.87rem;
  color: #64748b;
  line-height: 1.85;
}
.vm-tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.vm-tag {
  font-size: 0.69rem;
  font-weight: 600;
  border-radius: 50px;
  padding: 4px 14px;
}
.vm-tag--blue {
  background: #dbeafe;
  color: #1e40af;
}
.vm-tag--green {
  background: #d1fae5;
  color: #065f46;
}

/* ── SERVICES ── */
.services-band {
  background: #f8faff;
}
.svc-card {
  background: #fff;
  border: 1.5px solid #e5eaf5;
  border-radius: 22px;
  overflow: hidden;
  transition:
    transform 0.25s,
    box-shadow 0.25s,
    border-color 0.25s;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.svc-card--hover {
  transform: translateY(0px);
  box-shadow: 0 16px 48px rgba(21, 101, 192, 0.12);
  border-color: #c4d5f7;
}
.svc-icon-zone {
  height: 155px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.svc-icon-glow {
  position: absolute;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(28px);
  opacity: 0.55;
}
.svc-body {
  flex: 1;
}
.svc-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
}
.svc-desc {
  font-size: 0.81rem;
  color: #64748b;
  line-height: 1.8;
}
.svc-btn {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: var(--sc, #1565c0);
  font-family: 'Sora', sans-serif;
  font-size: 0.76rem;
  font-weight: 600;
  border: 1.5px solid var(--sc, #1565c0);
  border-radius: 50px;
  padding: 7px 18px;
  cursor: pointer;
  transition: all 0.2s;
}
.svc-btn:hover {
  background: var(--sc, #1565c0);
  color: #fff;
}

/* ── ACHIEVEMENTS ── */
.ach-band {
  background: #080d1c;
  position: relative;
  overflow: hidden;
}
.ach-band-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 10% 50%, rgba(37, 99, 235, 0.22) 0%, transparent 48%),
    radial-gradient(ellipse at 90% 25%, rgba(124, 58, 237, 0.16) 0%, transparent 48%);
}
.ach-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.22s,
    box-shadow 0.22s,
    border-color 0.22s;
  height: 100%;
}
.ach-card--hover {
  transform: translateY(0px);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.18);
}
.ach-top {
  height: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.ach-body {
  flex: 1;
  padding: 16px 18px 14px;
}
.ach-label {
  font-size: 0.68rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.42);
  text-align: center;
  margin-bottom: 4px;
  letter-spacing: 0.4px;
}
.ach-value {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  line-height: 1.1;
  margin-bottom: 10px;
}
.ach-desc {
  font-size: 0.69rem;
  color: rgba(255, 255, 255, 0.42);
  line-height: 1.65;
  text-align: center;
  margin: 0;
}
.ach-bar {
  height: 4px;
  width: 100%;
  flex-shrink: 0;
}

/* ── INCUBATEES (original styling preserved exactly) ── */
.incubatees-section {
  background: #f5f7fb;
}

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
.incubatee-logo-area {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 16px;
}
.incubatee-img {
  display: block;
  width: 100%;
}
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
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.incubatee-label--visible {
  transform: translateY(0);
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

/* ── VIDEO EMBED ── */
.video-wrap {
  position: relative;
  padding-bottom: 56.25%;
  background: #000;
}
.video-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* ── FAQ ── */
.faq-band {
  background: #fff;
}
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
  border-color: #bcd0f7;
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

/* ── FOOTER (unchanged) ── */
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
  font-family: 'Sora', sans-serif;
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
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(21, 101, 192, 0.4);
  transition: all 0.18s;
}
.nl-btn:hover {
  box-shadow: 0 6px 20px rgba(21, 101, 192, 0.55);
  transform: translateY(-1px);
}

/* ── TRANSITIONS ── */
.fx-enter-active,
.fx-leave-active {
  transition:
    opacity 0.24s,
    transform 0.24s;
}
.fx-enter-from,
.fx-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
