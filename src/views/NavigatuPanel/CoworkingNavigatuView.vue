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
          active
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
      <!-- ===== HERO SECTION ===== -->
      <section class="hero-section">
        <div class="hero-noise" />
        <div class="hero-grid-pattern" />
        <div class="hero-glow-left" />
        <div class="hero-glow-right" />

        <v-container class="hero-inner">
          <v-row align="center" justify="center">
            <!-- Left: Text -->
            <v-col cols="12" md="5" class="hero-left-col">
              <div class="hero-badge mb-5">
                <span class="hero-badge-dot" />
                <span>Butuan City, Caraga Region</span>
              </div>
              <h1 class="hero-title">
                NAVIGATÚ
                <span class="hero-title-em">Facility</span>
              </h1>
              <p class="hero-body mt-4 mb-8">
                The Innovation and Technopreneurship Hub (iTecH) of Caraga State University — where
                ideas become ventures and ventures become legacies.
              </p>
              <div class="d-flex flex-wrap" style="gap: 14px">
                <button class="btn-primary-hero">
                  <v-icon size="16" class="mr-2">mdi-rocket-launch-outline</v-icon>
                  Get Started
                </button>
                <button class="btn-ghost-hero">
                  <v-icon size="16" class="mr-2">mdi-play-circle-outline</v-icon>
                  Take a Tour
                </button>
              </div>
            </v-col>

            <!-- Right: Image collage -->
            <v-col cols="12" md="7">
              <div class="hero-collage">
                <div class="hero-collage-main">
                  <v-img
                    src="/images/collage/CollageImg1.jpg"
                    height="280"
                    cover
                    class="collage-main-img"
                  />
                  <div class="collage-live-badge">
                    <span class="badge-dot-green" />
                    Live Workspace
                  </div>
                </div>
                <div class="hero-collage-grid">
                  <div class="collage-stat-card">
                    <div class="csc-num">60+</div>
                    <div class="csc-label">Startups Launched</div>
                    <v-icon
                      icon="mdi-rocket-launch"
                      size="28"
                      color="rgba(255,255,255,0.2)"
                      class="csc-deco"
                    />
                  </div>
                  <v-img
                    src="/images/collage/CollageImg2.JPG"
                    height="125"
                    cover
                    rounded="lg"
                    class="collage-sm-img"
                  />
                  <v-img
                    src="/images/collage/CollageImg3.JPG"
                    height="105"
                    cover
                    rounded="lg"
                    class="collage-sm-img"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- ===== FACILITY OFFERED SECTION ===== -->
      <section class="facility-section py-16">
        <v-container>
          <div class="text-center mb-4">
            <div class="eyebrow-label">Our Spaces</div>
            <h2 class="section-title">Facility <span class="section-title-em">Offered</span></h2>
            <p class="section-sub mt-3">
              Purpose-built spaces for <strong>Pitching Competitions</strong>,
              <strong>Startup Incubation</strong>, and <strong>Workshops</strong>
            </p>
          </div>

          <!-- Tab filter -->
          <div class="facility-filter-row mb-10">
            <button
              v-for="f in facilityFilters"
              :key="f.key"
              class="fac-filter-pill"
              :class="{ 'fac-filter-pill--on': activeFacilityFilter === f.key }"
              @click="activeFacilityFilter = f.key"
            >
              <v-icon :icon="f.icon" size="14" class="mr-1" />
              {{ f.label }}
            </button>
          </div>

          <v-row>
            <v-col
              v-for="(facility, idx) in filteredFacilities"
              :key="facility.name"
              cols="12"
              sm="6"
              class="mb-4"
            >
              <div
                class="facility-card"
                :class="{ 'facility-card--active': activeFacility === idx }"
                @mouseenter="activeFacility = idx"
                @mouseleave="activeFacility = null"
                @click="openFacilityDetail(facility)"
              >
                <!-- Image -->
                <v-img :src="facility.photo" height="300" cover class="facility-base-img" />

                <!-- Gradient overlay always present -->
                <div class="facility-gradient" />

                <!-- Hover overlay -->
                <div
                  class="facility-overlay"
                  :class="{ 'facility-overlay--visible': activeFacility === idx }"
                >
                  <div class="fac-overlay-icon">
                    <v-icon :icon="facility.icon" size="28" color="white" />
                  </div>
                  <h3 class="facility-overlay-name">{{ facility.name }}</h3>
                  <p class="facility-overlay-desc">{{ facility.desc }}</p>
                  <div class="fac-chips mt-3">
                    <span v-for="tag in facility.tags" :key="tag" class="fac-chip">{{ tag }}</span>
                  </div>
                  <button class="fac-overlay-btn mt-4">
                    View Details <v-icon size="13" class="ml-1">mdi-arrow-right</v-icon>
                  </button>
                </div>

                <!-- Bottom label always visible -->
                <div
                  class="facility-label"
                  :class="{ 'facility-label--hidden': activeFacility === idx }"
                >
                  <div class="fac-label-icon">
                    <v-icon :icon="facility.icon" size="14" color="white" />
                  </div>
                  <span>{{ facility.name }}</span>
                  <span class="fac-label-cap ml-2">{{ facility.capacity }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Facility Detail Dialog -->
      <v-dialog v-model="facilityDialog" max-width="580" transition="dialog-bottom-transition">
        <v-card
          v-if="activeFacilityDetail"
          rounded="xl"
          class="overflow-hidden facility-dialog-card"
        >
          <v-img :src="activeFacilityDetail.photo" height="220" cover>
            <div class="fac-dialog-overlay pa-6 d-flex align-end" style="height: 100%">
              <div>
                <div class="fac-dialog-badge mb-2">
                  <v-icon :icon="activeFacilityDetail.icon" size="14" class="mr-1" color="white" />
                  {{ activeFacilityDetail.capacity }}
                </div>
                <h3 class="fac-dialog-title">{{ activeFacilityDetail.name }}</h3>
              </div>
              <v-spacer />
              <v-btn icon variant="text" color="white" @click="facilityDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-img>
          <div class="pa-6">
            <p class="fac-dialog-desc mb-5">{{ activeFacilityDetail.fullDesc }}</p>
            <v-divider class="mb-4" />
            <div class="fac-dialog-features">
              <div v-for="feat in activeFacilityDetail.features" :key="feat" class="fac-feat-item">
                <v-icon icon="mdi-check-circle" size="16" color="#1565C0" class="mr-2" />
                <span>{{ feat }}</span>
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>

      <!-- ===== COWORKING PERKS ===== -->
      <section class="perks-section py-16">
        <div class="perks-bg-orb perks-orb-1" />
        <div class="perks-bg-orb perks-orb-2" />
        <v-container class="position-relative">
          <div class="text-center mb-14">
            <div class="eyebrow-label" style="color: #f97316">Why Choose Us</div>
            <h2 class="section-title" style="color: #fff">
              Why Work at <span class="section-title-em" style="color: #f97316">iTecH</span>
            </h2>
            <p class="section-sub mt-3" style="color: rgba(255, 255, 255, 0.45)">
              Everything you need to build, collaborate, and grow
            </p>
          </div>
          <v-row>
            <v-col v-for="(perk, i) in perks" :key="perk.title" cols="12" sm="6" md="3">
              <div
                class="perk-card"
                :class="{ 'perk-card--open': activePerk === i }"
                @click="activePerk = activePerk === i ? null : i"
              >
                <div class="perk-icon-wrap" :style="{ background: perk.iconBg }">
                  <v-icon :icon="perk.icon" :color="perk.color" size="22" />
                </div>
                <h4 class="perk-title mt-4 mb-2">{{ perk.title }}</h4>
                <p class="perk-desc">{{ perk.desc }}</p>
                <transition name="fx">
                  <div v-if="activePerk === i" class="perk-detail mt-3">
                    <div class="perk-divider mb-3" />
                    <p class="perk-detail-text">{{ perk.detail }}</p>
                  </div>
                </transition>
                <div class="perk-card-footer mt-4">
                  <span class="perk-value" :style="{ color: perk.color }">{{ perk.value }}</span>
                  <v-icon
                    :icon="activePerk === i ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    size="16"
                    color="rgba(255,255,255,0.3)"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- ===== STAFF TESTIMONIALS ===== -->
      <section class="testimonials-section py-16">
        <v-container>
          <div class="text-center mb-4">
            <div class="eyebrow-label" style="color: #7c3aed">People & Culture</div>
            <h2 class="section-title">
              <span class="testimonial-bold">NAVIGATÚ</span>
              <span class="testimonial-italic"> Staff Voices</span>
            </h2>
            <p class="section-sub mt-3">Stories from the people who make iTecH extraordinary</p>
          </div>

          <!-- Testimonial tabs -->
          <div class="testi-selector mb-10">
            <div
              v-for="(t, i) in testimonials"
              :key="i"
              class="testi-avatar-btn"
              :class="{ 'testi-avatar-btn--active': activeTestimonial === i }"
              @click="activeTestimonial = i"
            >
              <v-img :src="t.photo" width="52" height="52" cover rounded="circle" />
              <span class="testi-avatar-name">{{ t.name }}</span>
            </div>
          </div>

          <v-row justify="center">
            <v-col cols="12" md="10">
              <transition name="testi-fade" mode="out-in">
                <div :key="activeTestimonial" class="testimonial-panel">
                  <v-row no-gutters align="stretch">
                    <v-col cols="12" sm="4">
                      <div class="testi-photo-col">
                        <v-img
                          :src="testimonials[activeTestimonial].photo"
                          height="300"
                          cover
                          class="testi-photo"
                        />
                        <div class="testi-photo-overlay" />
                        <div class="testi-role-badge">
                          <v-icon icon="mdi-briefcase-outline" size="12" class="mr-1" />
                          {{ testimonials[activeTestimonial].role }}
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <div class="testi-content pa-8 pa-md-10">
                        <div class="testi-quote-mark">"</div>
                        <p class="testi-text mt-2">{{ testimonials[activeTestimonial].quote }}</p>
                        <div class="testi-author mt-6">
                          <span class="author-name">{{
                            testimonials[activeTestimonial].name
                          }}</span>
                          <span class="author-role">{{
                            testimonials[activeTestimonial].role
                          }}</span>
                        </div>
                        <div class="testi-stars mt-4">
                          <v-icon
                            v-for="n in 5"
                            :key="n"
                            icon="mdi-star"
                            size="14"
                            color="#f59e0b"
                          />
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </transition>
            </v-col>
          </v-row>

          <!-- Nav dots -->
          <div class="testi-dots mt-8">
            <button
              v-for="(t, i) in testimonials"
              :key="i"
              class="testi-dot"
              :class="{ 'testi-dot--active': activeTestimonial === i }"
              @click="activeTestimonial = i"
            />
          </div>
        </v-container>
      </section>

      <!-- ===== GALLERY STRIP ===== -->
      <section class="gallery-section py-14">
        <v-container>
          <div class="text-center mb-10">
            <div class="eyebrow-label">Inside iTecH</div>
            <h2 class="section-title">
              A Glimpse of <span class="section-title-em">Our Space</span>
            </h2>
          </div>
          <div class="gallery-grid">
            <div v-for="(img, i) in galleryImages" :key="i" class="gallery-item" :class="img.span">
              <v-img :src="img.src" cover class="gallery-img" :height="img.h" />
              <div class="gallery-hover">
                <v-icon icon="mdi-magnify-plus-outline" size="28" color="white" />
              </div>
            </div>
          </div>
        </v-container>
      </section>

      <!-- ===== CTA BANNER ===== -->
      <section class="cta-section">
        <div class="cta-noise" />
        <div class="cta-glow" />
        <v-container class="text-center position-relative py-16">
          <div class="cta-icon-ring mb-6">
            <v-icon icon="mdi-office-building-outline" size="32" color="white" />
          </div>
          <h2 class="cta-title mb-4">Ready to Work from iTecH?</h2>
          <p class="cta-sub mb-10 mx-auto">
            Join a growing community of founders, researchers, and innovators at Caraga's premier
            tech hub.
          </p>
          <div class="d-flex justify-center flex-wrap" style="gap: 16px">
            <button class="btn-cta-solid">
              <v-icon size="16" class="mr-2">mdi-calendar-plus-outline</v-icon>
              Book a Tour
            </button>
            <button class="btn-cta-ghost">
              <v-icon size="16" class="mr-2">mdi-phone-outline</v-icon>
              Contact Us
            </button>
          </div>
        </v-container>
      </section>
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
import { ref, computed } from 'vue'

const drawer = ref(false)
const navSearchQuery = ref('')
const activeTestimonial = ref(0)
const activeFacility = ref(null)
const activeFacilityFilter = ref('all')
const activePerk = ref(null)
const facilityDialog = ref(false)
const activeFacilityDetail = ref(null)

const facilityFilters = [
  { key: 'all', label: 'All Spaces', icon: 'mdi-apps' },
  { key: 'work', label: 'Workspaces', icon: 'mdi-laptop' },
  { key: 'lounge', label: 'Lounge', icon: 'mdi-sofa-outline' },
  { key: 'lab', label: 'Labs', icon: 'mdi-test-tube' },
]

const facilities = ref([
  {
    name: 'Co-Working Space',
    desc: 'A vibrant open-floor workspace designed to foster collaboration and creativity among startup teams and entrepreneurs.',
    fullDesc:
      'Our flagship co-working space features ergonomic workstations, standing desks, high-speed fiber internet, and multiple collaboration zones. The open-floor design encourages spontaneous connections between founders, developers, and designers working on the next big idea.',
    icon: 'mdi-laptop',
    photo: '/images/facilities/FacilityA.JPG',
    capacity: 'Up to 40 seats',
    category: 'work',
    tags: ['High-Speed WiFi', 'Standing Desks', '24/7 Access'],
    features: [
      'High-speed fiber internet (1 Gbps)',
      'Ergonomic chairs & standing desks',
      'Dedicated lockers',
      'Printing & scanning',
      'Coffee & refreshments',
      'Air conditioning',
    ],
  },
  {
    name: 'Lounge & Breakout Area',
    desc: 'Comfortable seating and relaxed zones where teams can brainstorm, hold informal discussions, and recharge.',
    fullDesc:
      "The lounge is the social heartbeat of iTecH. With curated reading material, bean bags, modular sofas, and a refreshment station, it's the perfect spot to decompress, ideate, or host informal investor chats.",
    icon: 'mdi-sofa-outline',
    photo: '/images/facilities/FacilityB.jpg',
    capacity: 'Up to 20 guests',
    category: 'lounge',
    tags: ['Relaxed Zones', 'Refreshments', 'Informal Meetings'],
    features: [
      'Modular seating arrangements',
      'Snack & coffee bar',
      'Ambient music system',
      'Natural lighting',
      'Whiteboards',
      'TV screen for presentations',
    ],
  },
  {
    name: 'Open Innovation Lab',
    desc: 'A fully-equipped lab for prototyping and development, complete with workstations, tools, and ping-pong for breaks.',
    fullDesc:
      'Where ideas meet execution. The Innovation Lab houses dedicated hardware prototyping stations, 3D printing access, IoT development kits, and dual-monitor workstations — everything a deep-tech startup needs to move from sketch to working prototype.',
    icon: 'mdi-test-tube',
    photo: '/images/facilities/FacilityC.jpg',
    capacity: '16 workstations',
    category: 'lab',
    tags: ['Prototyping', 'IoT Kits', 'Dual Monitors'],
    features: [
      'Dual-monitor developer setups',
      '3D printing access',
      'IoT development kits',
      'Electronics workbench',
      'Software licenses (Adobe, Figma, GitHub Pro)',
      'Ping-pong table',
    ],
  },
  {
    name: 'Inspiration Wall — iTecH',
    desc: 'The iconic "Embark on a Voyage of Innovation" mural — the heart and soul of the Navigatú spirit.',
    fullDesc:
      "More than a mural, the Inspiration Wall is iTecH's manifesto made visual. Founders, mentors, and visiting partners have left their mark here — post-its, signatures, milestones celebrated. It's a living artifact of every breakthrough made within these walls.",
    icon: 'mdi-wall',
    photo: '/images/facilities/FacilityD.png',
    capacity: 'Shared space',
    category: 'lounge',
    tags: ['Iconic Landmark', 'Photo Spot', 'Community'],
    features: [
      'Curated mural by local artists',
      'Interactive milestone board',
      "Founders' signature wall",
      'Ideal photo backdrop',
      'Vision & mission display',
    ],
  },
])

const filteredFacilities = computed(() =>
  activeFacilityFilter.value === 'all'
    ? facilities.value
    : facilities.value.filter((f) => f.category === activeFacilityFilter.value),
)

function openFacilityDetail(facility) {
  activeFacilityDetail.value = facility
  facilityDialog.value = true
}

const perks = ref([
  {
    title: 'Lightning-Fast WiFi',
    desc: 'Symmetric 1 Gbps fiber for seamless video calls, cloud uploads, and dev work.',
    detail:
      'Our dedicated 1 Gbps symmetric fiber is shared across a managed network with QoS policies ensuring every seat gets consistent speeds — even during events.',
    icon: 'mdi-wifi',
    color: '#2563eb',
    iconBg: 'rgba(37,99,235,0.15)',
    value: '1 Gbps Fiber',
  },
  {
    title: 'Flexible Hours',
    desc: "24/7 access for members — work when you're most productive, day or night.",
    detail:
      'Key-card access for members provides entry anytime. The facility is staffed during business hours (8AM–6PM) and accessible via smart lock after hours.',
    icon: 'mdi-clock-outline',
    color: '#059669',
    iconBg: 'rgba(5,150,105,0.15)',
    value: '24/7 Access',
  },
  {
    title: 'Expert Mentorship',
    desc: 'Scheduled 1:1 sessions with industry mentors, investors, and technical advisors.',
    detail:
      'Members get 4 guaranteed mentorship hours per month, plus access to our mentor marketplace to request specialist sessions in legal, tech, finance, and growth.',
    icon: 'mdi-account-group-outline',
    color: '#7c3aed',
    iconBg: 'rgba(124,58,237,0.15)',
    value: '15+ Mentors',
  },
  {
    title: 'Meeting & Event Rooms',
    desc: 'Bookable private rooms for investor calls, team syncs, and workshop facilitation.',
    detail:
      'Two private meeting rooms (8-person and 4-person) plus a 50-person event hall — all bookable through the member portal with AV equipment included.',
    icon: 'mdi-presentation',
    color: '#ea580c',
    iconBg: 'rgba(234,88,12,0.15)',
    value: '3 Rooms',
  },
])

const testimonials = ref([
  {
    quote:
      'Working at Navigatu TBI provides a warm and inspiring atmosphere, enhanced by the open-space concept design, which truly elevates our productivity and creativity. Every morning I walk in feeling genuinely excited to build.',
    name: 'Riah',
    role: 'Director, TBI',
    photo: '/images/testimonials/TestimonialA.jpg',
  },
  {
    quote:
      "Being part of Navigatú has transformed how I see entrepreneurship. The mentorship, the community, and the facilities here are second to none in the region. iTecH isn't just a workspace — it's a launchpad.",
    name: 'Marco',
    role: 'Program Manager, TBI',
    photo: '/images/testimonials/TestimonialB.png',
  },
  {
    quote:
      'The energy inside iTecH is contagious. Every day I walk in, I am reminded of the mission we share — to cultivate the next generation of Filipino innovators. The space makes that mission feel real and achievable.',
    name: 'Carla',
    role: 'Innovation Lead, TBI',
    photo: '/images/testimonials/TestimonialC.jpg',
  },
])

const galleryImages = ref([
  { src: '/images/facilities/FacilityA.JPG', span: 'gallery-wide', h: '260' },
  { src: '/images/facilities/FacilityB.jpg', span: '', h: '260' },
  { src: '/images/facilities/FacilityC.jpg', span: '', h: '260' },
  { src: '/images/facilities/FacilityD.png', span: 'gallery-wide', h: '260' },
  { src: '/images/collage/CollageImg1.jpg', span: '', h: '260' },
  { src: '/images/collage/CollageImg2.JPG', span: '', h: '260' },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&family=Sora:wght@300;400;500;600;700&display=swap');

/* ── RESET / BASE ─────────────────────────────────────────────────── */
* {
  box-sizing: border-box;
}
.v-application {
  font-family: 'Sora', sans-serif !important;
}

/* ── NAVBAR (unchanged) ────────────────────────────────────────────── */
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

/* ── SHARED HELPERS ───────────────────────────────────────────────── */
.eyebrow-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #1565c0;
  margin-bottom: 10px;
}
.section-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  font-weight: 700;
  color: #0f172a;
  line-height: 1.18;
  margin-bottom: 6px;
}
.section-title-em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #1565c0;
}
.section-sub {
  font-size: 0.87rem;
  color: #94a3b8;
  line-height: 1.8;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
}

/* ── BUTTON SYSTEM ─────────────────────────────────────────────────── */
.btn-primary-hero {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #1565c0, #2563eb);
  color: #fff;
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  padding: 14px 30px;
  cursor: pointer;
  box-shadow: 0 6px 22px rgba(21, 101, 192, 0.38);
  transition: all 0.22s;
}
.btn-primary-hero:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(21, 101, 192, 0.52);
}

.btn-ghost-hero {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: #1565c0;
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1.5px solid rgba(21, 101, 192, 0.4);
  border-radius: 50px;
  padding: 13px 30px;
  cursor: pointer;
  transition: all 0.22s;
}
.btn-ghost-hero:hover {
  background: rgba(21, 101, 192, 0.06);
  border-color: #1565c0;
  transform: translateY(-2px);
}

/* ── HERO ──────────────────────────────────────────────────────────── */
.hero-section {
  background: #f0f4ff;
  background-image:
    radial-gradient(ellipse at 70% 20%, rgba(37, 99, 235, 0.12) 0%, transparent 55%),
    radial-gradient(ellipse at 15% 80%, rgba(124, 58, 237, 0.08) 0%, transparent 50%);
  position: relative;
  overflow: hidden;
  padding-top: 80px;
  padding-bottom: 72px;
}
.hero-noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
.hero-grid-pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(21, 101, 192, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(21, 101, 192, 0.04) 1px, transparent 1px);
  background-size: 44px 44px;
}
.hero-glow-left {
  position: absolute;
  top: -80px;
  left: -120px;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%);
  pointer-events: none;
}
.hero-glow-right {
  position: absolute;
  bottom: -60px;
  right: -80px;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%);
  pointer-events: none;
}
.hero-inner {
  position: relative;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(21, 101, 192, 0.09);
  border: 1px solid rgba(21, 101, 192, 0.22);
  border-radius: 50px;
  padding: 6px 16px;
  font-size: 0.73rem;
  font-weight: 600;
  color: #1565c0;
}
.hero-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.28);
  flex-shrink: 0;
}

.hero-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  font-weight: 700;
  color: #0a0f1e;
  line-height: 1.1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.hero-title-em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #1565c0;
  font-size: 1.05em;
}
.hero-body {
  font-size: 0.97rem;
  color: #5a6478;
  line-height: 1.85;
  max-width: 440px;
}

/* Hero collage */
.hero-collage {
  display: flex;
  gap: 12px;
  height: 280px;
}
.hero-collage-main {
  flex: 2;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(21, 101, 192, 0.22);
}
.collage-main-img {
  width: 100%;
  border-radius: 20px;
}
.collage-live-badge {
  position: absolute;
  bottom: 14px;
  left: 14px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(10px);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 50px;
  padding: 6px 14px;
  display: flex;
  align-items: center;
  gap: 7px;
}
.badge-dot-green {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3);
}

.hero-collage-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 280px;
}
.collage-stat-card {
  background: linear-gradient(135deg, #1565c0, #2563eb);
  border-radius: 16px;
  padding: 18px 16px;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(21, 101, 192, 0.35);
  flex-shrink: 0;
}
.csc-num {
  font-family: 'Sora', sans-serif;
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1;
}
.csc-label {
  font-size: 0.65rem;
  opacity: 0.7;
  margin-top: 4px;
  font-weight: 500;
}
.csc-deco {
  position: absolute;
  bottom: -4px;
  right: 8px;
}
.collage-sm-img {
  width: 100%;
  border-radius: 12px;
}

/* ── FACILITY SECTION ─────────────────────────────────────────────── */
.facility-section {
  background: #f8faff;
}

.facility-filter-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}
.fac-filter-pill {
  display: inline-flex;
  align-items: center;
  background: white;
  border: 1.5px solid #e5eaf5;
  border-radius: 50px;
  padding: 8px 20px;
  font-family: 'Sora', sans-serif;
  font-size: 0.76rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.fac-filter-pill:hover {
  border-color: #1565c0;
  color: #1565c0;
}
.fac-filter-pill--on {
  background: #1565c0;
  border-color: #1565c0;
  color: #fff;
  box-shadow: 0 4px 16px rgba(21, 101, 192, 0.35);
}

.facility-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.09);
  transition:
    box-shadow 0.3s,
    transform 0.3s;
}
.facility-card:hover,
.facility-card--active {
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.16);
  transform: translateY(-6px);
}
.facility-base-img {
  display: block;
  width: 100%;
  transition: transform 0.5s ease;
}
.facility-card:hover .facility-base-img {
  transform: scale(1.07);
}

.facility-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(6, 9, 23, 0.75) 0%,
    rgba(6, 9, 23, 0.1) 55%,
    transparent 100%
  );
  z-index: 1;
  pointer-events: none;
}

.facility-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: rgba(13, 71, 161, 0.9);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
  border-radius: 20px;
}
.facility-overlay--visible {
  opacity: 1;
  transform: translateY(0);
}

.fac-overlay-icon {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
}
.facility-overlay-name {
  font-family: 'Sora', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
}
.facility-overlay-desc {
  font-size: 0.81rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin: 0;
}
.fac-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}
.fac-chip {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.65rem;
  font-weight: 600;
  border-radius: 50px;
  padding: 3px 10px;
}
.fac-overlay-btn {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.18);
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  font-family: 'Sora', sans-serif;
  font-size: 0.76rem;
  font-weight: 600;
  border-radius: 50px;
  padding: 8px 18px;
  cursor: pointer;
  transition: background 0.2s;
}
.fac-overlay-btn:hover {
  background: rgba(255, 255, 255, 0.28);
}

.facility-label {
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.48);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 0.74rem;
  font-weight: 600;
  padding: 7px 16px;
  border-radius: 50px;
  transition: opacity 0.3s ease;
}
.fac-label-icon {
  width: 24px;
  height: 24px;
  background: rgba(21, 101, 192, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fac-label-cap {
  font-size: 0.64rem;
  opacity: 0.6;
  font-weight: 400;
}
.facility-label--hidden {
  opacity: 0;
}

/* Facility dialog */
.facility-dialog-card {
  border: none;
}
.fac-dialog-overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.1) 60%,
    transparent 100%
  );
}
.fac-dialog-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  padding: 4px 12px;
  font-size: 0.65rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}
.fac-dialog-title {
  font-family: 'Sora', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
}
.fac-dialog-desc {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.85;
}
.fac-dialog-features {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.fac-feat-item {
  display: flex;
  align-items: center;
  font-size: 0.82rem;
  color: #334155;
  font-weight: 500;
}

/* ── PERKS SECTION ────────────────────────────────────────────────── */
.perks-section {
  background: #080d1c;
  position: relative;
  overflow: hidden;
}
.perks-bg-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.perks-orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%);
  top: -100px;
  left: -100px;
}
.perks-orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
  bottom: -80px;
  right: -60px;
}

.perk-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 22px;
  padding: 26px 22px;
  cursor: pointer;
  transition:
    background 0.25s,
    border-color 0.25s,
    transform 0.25s;
  height: 100%;
}
.perk-card:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-4px);
}
.perk-card--open {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow: 0 20px 54px rgba(0, 0, 0, 0.4);
}
.perk-icon-wrap {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.perk-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
}
.perk-desc {
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.48);
  line-height: 1.75;
  margin: 0;
}
.perk-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}
.perk-detail-text {
  font-size: 0.73rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.75;
  margin: 0;
}
.perk-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.perk-value {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.3px;
}

/* ── TESTIMONIALS ─────────────────────────────────────────────────── */
.testimonials-section {
  background: #fff;
}

.testimonial-bold {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: #5f5f5f;
  letter-spacing: 1px;
}
.testimonial-italic {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 600;
  color: #1565c0;
}

.testi-selector {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
}
.testi-avatar-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  opacity: 0.45;
  transition:
    opacity 0.22s,
    transform 0.22s;
}
.testi-avatar-btn:hover {
  opacity: 0.75;
}
.testi-avatar-btn--active {
  opacity: 1;
  transform: scale(1.05);
}
.testi-avatar-name {
  font-size: 0.7rem;
  font-weight: 600;
  color: #0f172a;
}

.testimonial-panel {
  background: #fff;
  border-radius: 24px;
  border: 1.5px solid #e5eaf5;
  overflow: hidden;
  box-shadow: 0 8px 36px rgba(21, 101, 192, 0.07);
}

.testi-photo-col {
  position: relative;
  height: 300px;
  overflow: hidden;
}
.testi-photo {
  width: 100%;
  border-radius: 0;
}
.testi-photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13, 71, 161, 0.5) 0%, transparent 60%);
}
.testi-role-badge {
  position: absolute;
  bottom: 14px;
  left: 14px;
  background: rgba(21, 101, 192, 0.85);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 600;
  border-radius: 50px;
  padding: 5px 12px;
  display: flex;
  align-items: center;
}

.testi-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 300px;
}
.testi-quote-mark {
  font-family: 'Playfair Display', serif;
  font-size: 4.5rem;
  color: #1565c0;
  line-height: 0.8;
  font-weight: 700;
  opacity: 0.65;
}
.testi-text {
  font-size: 0.88rem;
  color: #444;
  line-height: 1.9;
  margin: 0;
  max-width: 420px;
}
.testi-author {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.author-name {
  font-family: 'Sora', sans-serif;
  font-weight: 800;
  font-size: 0.97rem;
  color: #1a1a1a;
}
.author-role {
  font-size: 0.78rem;
  color: #94a3b8;
}
.testi-stars {
  display: flex;
  gap: 3px;
}

.testi-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
}
.testi-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d1d5db;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.testi-dot--active {
  background: #1565c0;
  width: 24px;
  border-radius: 4px;
}

/* ── GALLERY ──────────────────────────────────────────────────────── */
.gallery-section {
  background: #f8faff;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.gallery-wide {
  grid-column: span 2;
}
.gallery-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
}
.gallery-img {
  width: 100%;
  display: block;
  transition: transform 0.45s ease;
  border-radius: 16px;
}
.gallery-item:hover .gallery-img {
  transform: scale(1.06);
}
.gallery-hover {
  position: absolute;
  inset: 0;
  background: rgba(13, 71, 161, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.gallery-item:hover .gallery-hover {
  opacity: 1;
}

/* ── CTA ──────────────────────────────────────────────────────────── */
.cta-section {
  background: #080d1c;
  position: relative;
  overflow: hidden;
}
.cta-noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
.cta-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 40% 50%, rgba(37, 99, 235, 0.25) 0%, transparent 55%),
    radial-gradient(ellipse at 75% 45%, rgba(124, 58, 237, 0.18) 0%, transparent 50%);
}
.cta-icon-ring {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 0 0 18px rgba(255, 255, 255, 0.04);
}
.cta-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.7rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: #fff;
}
.cta-sub {
  font-size: 0.98rem;
  color: rgba(255, 255, 255, 0.48);
  line-height: 1.85;
  max-width: 460px;
}
.btn-cta-solid {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #2563eb, #1565c0);
  color: #fff;
  font-family: 'Sora', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  padding: 15px 32px;
  cursor: pointer;
  box-shadow: 0 8px 28px rgba(37, 99, 235, 0.45);
  transition: all 0.22s;
}
.btn-cta-solid:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(37, 99, 235, 0.6);
}
.btn-cta-ghost {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(8px);
  color: rgba(255, 255, 255, 0.82);
  font-family: 'Sora', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  border-radius: 50px;
  padding: 14px 32px;
  cursor: pointer;
  transition: all 0.22s;
}
.btn-cta-ghost:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.32);
  transform: translateY(-2px);
}

/* ── FOOTER (unchanged) ───────────────────────────────────────────── */
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
}

/* ── TRANSITIONS ──────────────────────────────────────────────────── */
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
.testi-fade-enter-active,
.testi-fade-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}
.testi-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.testi-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* ── MOBILE ───────────────────────────────────────────────────────── */
@media (max-width: 599px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .gallery-wide {
    grid-column: span 2;
  }
  .hero-collage {
    height: auto;
  }
  .hero-collage-main {
    height: 200px;
  }
}
</style>
