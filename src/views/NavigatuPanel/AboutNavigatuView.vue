<template>
  <NavigatuLayout>
    <!-- ===== HERO ===== -->
    <div class="about-hero">
      <div class="hero-photo-panel">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85"
          alt="NavigatÃº team"
          class="hero-photo-img"
        />
        <div class="hero-photo-veil" />
      </div>

      <div class="hero-left-panel py-sm-10 py-md-0">
        <div class="hero-left-content px-4 px-sm-6 px-md-10 px-lg-16">
          <div class="hero-pill mb-6">
            <span class="live-dot" />
            Butuan City, Caraga Region Â· Est. 2017
          </div>
          <div class="hero-heading-wrap mt-2">
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
            Navigatu TBI is the premier technology business incubator in Southern Philippines -
            empowering emerging Filipino technopreneurs to build, validate, and scale impactful
            ventures through strategic partnerships, education, and a thriving startup ecosystem.
          </p>
          <div class="d-flex flex-wrap ga-3 mb-10">
            <button class="btn-solid" @click="videoDialog = true">
              <v-icon size="16" class="mr-2">mdi-play-circle-outline</v-icon>Watch Our Story
            </button>
            <button class="btn-line" @click="scrollTo('about-detail')">
              <v-icon size="16" class="mr-2">mdi-arrow-down</v-icon>Learn More
            </button>
          </div>
        </div>
      </div>

      <div class="hero-edge-badge d-none d-md-flex">
        <v-icon size="14" color="#1565C0" class="mr-1">mdi-lightning-bolt</v-icon>
        Innovation Hub Â· Butuan City
      </div>
    </div>

    <!-- ===== WHAT IS NAVIGATU ===== -->
    <div id="about-detail" class="sec-white py-sec">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="5" class="mb-8 mb-md-0">
            <div class="about-img-stack">
              <img
                src="/public/images/facilities/FacilityA.JPG"
                alt="NavigatÃº facility"
                class="about-img-main"
              />
              <div class="about-img-float">
                <img
                  src="/public/images/facilities/FacilityD.png"
                  alt="Team collaboration"
                  class="about-img-sm"
                />
              </div>
              <div class="about-img-badge">
                <v-icon size="13" color="#1565c0" class="mr-1">mdi-map-marker-outline</v-icon>
                BUCAS, Butuan City
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="7" class="pl-md-14">
            <div class="eyebrow">About NavigatÃº</div>
            <h2 class="sec-title">What is <em>NavigatÃº TBI?</em></h2>
            <p class="sec-body mt-5 mb-5">
              <strong>Navigatu Technology Business Incubator (TBI)</strong> is a DOST
              PCIEERD-supported startup incubator based at Butuan City, Agusan del Norte, Caraga.
              Officially established in 2017, it operates as a flagship innovation facility under
              Caraga State University (CSU), designed to nurture technology-based ventures in the
              region.
            </p>
            <p class="sec-body mb-7">
              Coined from the word navigation and is inspired by the rich history of Butuan's
              Balangay Boats as the oldest wooden watercraft excavated in the region that showed
              evidence of our trading relationships all throughout Southeast Asia in as early as 700
              AD.
            </p>

            <!-- Key facts grid -->
            <div class="facts-grid">
              <div v-for="fact in keyFacts" :key="fact.label" class="fact-item">
                <div class="fact-icon" :style="{ background: fact.bg }">
                  <v-icon :icon="fact.icon" :color="fact.color" size="18" />
                </div>
                <div>
                  <div class="fact-val">{{ fact.val }}</div>
                  <div class="fact-label">{{ fact.label }}</div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- ===== VISION & MISSION ===== -->
    <div class="sec-offwhite py-sec">
      <v-container>
        <div class="text-center mb-14">
          <div class="eyebrow">Core Identity</div>
          <h2 class="sec-title">Vision & <em>Mission</em></h2>
          <p class="sec-sub">The guiding principles behind everything we do</p>
        </div>

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
              A prime technology business incubator of sustainable startups in Southern Philippines.
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

    <!-- ===== OBJECTIVES ===== -->
    <div class="sec-white py-sec">
      <v-container>
        <div class="text-center mb-14">
          <div class="eyebrow">What We Aim For</div>
          <h2 class="sec-title">Our <em>Objectives</em></h2>
          <p class="sec-sub">Six strategic goals that drive our work every day</p>
        </div>

        <v-row>
          <v-col v-for="obj in objectives" :key="obj.title" cols="12" sm="6" md="4" class="mb-4">
            <div class="obj-card">
              <div class="obj-icon" :style="{ background: obj.bg }">
                <v-icon :icon="obj.icon" :color="obj.color" size="22" />
              </div>
              <h4 class="obj-title mt-3 mb-2">{{ obj.title }}</h4>
              <p class="obj-short">{{ obj.short }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- ===== CORE VALUES ===== -->
    <div class="values-section py-sec">
      <div class="values-glow" />
      <v-container class="position-relative">
        <div class="text-center mb-14">
          <div class="eyebrow" style="color: rgba(255, 255, 255, 0.45)">What We Stand For</div>
          <h2 class="sec-title" style="color: #fff">Core <em>Values</em></h2>
          <p class="sec-sub" style="color: rgba(255, 255, 255, 0.45)">
            The principles that guide every interaction, decision, and program we run
          </p>
        </div>
        <v-row justify="center">
          <v-col
            v-for="val in coreValues"
            :key="val.label"
            cols="12"
            sm="6"
            md="4"
            lg="2"
            class="mb-4"
          >
            <div
              class="val-card"
              :class="{ 'val-card--active': activeValue === val.label }"
              @click="activeValue = activeValue === val.label ? null : val.label"
            >
              <div
                class="val-icon-ring"
                :style="{ background: val.color + '22', borderColor: val.color + '44' }"
              >
                <v-icon :icon="val.icon" :color="val.color" size="26" />
              </div>
              <div class="val-label mt-4">{{ val.label }}</div>
              <transition name="fx">
                <p v-if="activeValue === val.label" class="val-desc mt-2">{{ val.desc }}</p>
              </transition>
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
          <p class="band-sub">Three flagship programs to take your idea from concept to company</p>
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

        <div class="d-flex justify-end mt-8">
          <button class="explore-services-btn" style="--sc: #1565c0" @click="goToServicesSection">
            Explore All Services
            <v-icon size="16" class="ml-2">mdi-arrow-right</v-icon>
          </button>
        </div>
      </v-container>
    </div>

    <!-- ===== ACHIEVEMENTS ===== -->
    <div class="ach-band py-sec">
      <div class="ach-band-glow" />
      <v-container class="position-relative">
        <div class="text-center mb-14">
          <div class="band-eyebrow" style="color: rgba(255, 255, 255, 0.45)">Milestones</div>
          <h2 class="sec-title" style="color: #fff">NAVIGATU <em>Achievements</em></h2>
          <p class="sec-sub" style="color: rgba(255, 255, 255, 0.45)">
            7 years of operations, measurable impact
          </p>
        </div>
        <v-row>
          <v-col
            v-for="item in achievements"
            :key="item.label"
            cols="12"
            sm="6"
            md="3"
            class="mb-4"
          >
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

    <!-- ===== INCUBATEES ===== -->
    <v-container fluid class="incubatees-section py-sec">
      <v-container>
        <div class="text-center mb-10">
          <div class="eyebrow">Our Portfolio</div>
          <h2 class="sec-title">NAVIGATÃš <em>Incubatees</em></h2>
          <p class="sec-sub">Startups we have supported across 7 years of operations</p>
        </div>

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
              <div class="incubatee-logo-area">
                <v-img :src="company.photo" height="150" contain class="incubatee-img" />
              </div>
              <div class="incubatee-label" :class="{ 'incubatee-label--visible': company.hovered }">
                <span class="incubatee-label-text">{{ company.name }}</span>
              </div>
            </div>
          </v-col>
        </v-row>

        <p v-if="!filteredIncubatees.length" class="sec-sub text-center mt-6">
          No startups found for this filter.
        </p>
      </v-container>
    </v-container>

    <!-- ===== TIMELINE ===== -->
    <div class="sec-white py-sec">
      <v-container>
        <div class="text-center mb-14">
          <div class="eyebrow">Our Journey</div>
          <h2 class="sec-title">Navigatu<em>Timeline</em></h2>
          <p class="sec-sub">Key milestones from our founding to today</p>
        </div>

        <div class="timeline">
          <div
            v-for="(event, i) in timeline"
            :key="event.year"
            class="tl-item"
            :class="i % 2 === 0 ? 'tl-item--left' : 'tl-item--right'"
          >
            <div
              class="tl-content"
              :class="{ 'tl-content--active': activeTimeline === i }"
              @click="activeTimeline = activeTimeline === i ? null : i"
            >
              <div class="tl-year" :style="{ color: event.color }">{{ event.year }}</div>
              <h4 class="tl-title">{{ event.title }}</h4>
              <p class="tl-desc">{{ event.desc }}</p>
              <transition name="fx">
                <div v-if="activeTimeline === i" class="tl-detail mt-3">
                  <div class="tl-detail-divider" />
                  <p class="tl-detail-text">{{ event.detail }}</p>
                </div>
              </transition>
            </div>
            <div class="tl-dot" :style="{ background: event.color }" />
          </div>
        </div>
      </v-container>
    </div>

    <!-- ===== VIDEO DIALOG ===== -->
    <v-dialog v-model="videoDialog" max-width="760" transition="dialog-bottom-transition">
      <v-card rounded="xl" class="overflow-hidden pa-0">
        <div
          class="d-flex align-center justify-space-between pa-4 pb-3"
          style="border-bottom: 1px solid #f1f5f9"
        >
          <span style="font-weight: 700; font-size: 0.95rem; font-family: 'Sora', sans-serif"
            >NavigatÃº Story</span
          >
          <v-btn icon size="small" variant="text" @click="videoDialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <div class="video-wrap">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="NavigatÃº Story"
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
    <div class="sec-offwhite py-sec">
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
  </NavigatuLayout>
</template>

<script setup>
import NavigatuLayout from '@/components/layout/NavigatuLayout.vue'
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const router = useRouter()

function goToServicesSection() {
  router.push({ path: '/services-navigatu', hash: '#learn-more' })
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const videoDialog = ref(false)
const hoveredSvc = ref(null)
const hoveredAch = ref(null)
const openFaq = ref(null)
const activeValue = ref(null)
const activeTimeline = ref(null)

//  Key Facts
const keyFacts = ref([
  { label: 'Established', val: '2017', icon: 'mdi-calendar-star', bg: '#dbeafe', color: '#1565c0' },
  {
    label: 'Host University',
    val: 'CSU',
    icon: 'mdi-school-outline',
    bg: '#d1fae5',
    color: '#059669',
  },
  {
    label: 'Facility Size',
    val: '200 mÂ²',
    icon: 'mdi-office-building-outline',
    bg: '#ede9fe',
    color: '#7c3aed',
  },
  { label: 'Funded By', val: 'DOST', icon: 'mdi-cash-multiple', bg: '#ffedd5', color: '#ea580c' },
])

//  Objectives
const objectives = ref([
  {
    title: 'Advance Entrepreneurial Culture',
    short: 'Advance the entrepreneurial culture of the university.',
    detail:
      'Cultivate a strong innovation mindset and entrepreneurial spirit across the university community.',
    icon: 'mdi-school-outline',
    bg: '#dbeafe',
    color: '#1565c0',
  },
  {
    title: 'Lead Innovation Programs',
    short:
      'Lead in the development of a comprehensive set of programs to nurture innovation and entrepreneurship among students, researchers, and faculty members in the university.',
    detail:
      'Design and implement structured programs that build entrepreneurial capability and innovation outcomes for all university sectors.',
    icon: 'mdi-lightbulb-on-outline',
    bg: '#d1fae5',
    color: '#059669',
  },
  {
    title: 'Be the Central Connection Point',
    short:
      'Serve as the central point where students, faculty, researchers, alumni, entrepreneurs, business leaders, investors, and industry can connect with each other.',
    detail:
      'Strengthen cross-sector collaboration by convening key stakeholders through one shared innovation platform.',
    icon: 'mdi-connection',
    bg: '#ffedd5',
    color: '#ea580c',
  },
  {
    title: 'Establish Innovation Offices and Spaces',
    short:
      'Establish the incubation and innovation space, technology commercialization office, and industry collaboration offices.',
    detail:
      'Build physical and institutional structures that support incubation, commercialization, and collaborative development.',
    icon: 'mdi-office-building-cog-outline',
    bg: '#ede9fe',
    color: '#7c3aed',
  },
  {
    title: 'Create Jobs, Wealth, and Businesses',
    short: 'Help create jobs, wealth, and businesses aligning with national priorities.',
    detail:
      'Drive inclusive economic impact by supporting ventures that align with strategic national development goals.',
    icon: 'mdi-briefcase-check-outline',
    bg: '#fef3c7',
    color: '#d97706',
  },
  {
    title: 'Promote Innovation-Based Startups',
    short: 'Promote new technology, knowledge, and innovation-based startups.',
    detail:
      'Encourage formation and growth of high-potential startups grounded in research and emerging technologies.',
    icon: 'mdi-rocket-launch-outline',
    bg: '#fee2e2',
    color: '#dc2626',
  },
  {
    title: 'Enable Speedy Commercialization',
    short:
      'Provide a platform for speedy commercialization of technologies developed by the university, any academic, technical, or R&D institution, or by an individual.',
    detail:
      'Accelerate the path from research outputs and inventions to market-ready products and services.',
    icon: 'mdi-flask-outline',
    bg: '#e0f2fe',
    color: '#0284c7',
  },
  {
    title: 'Build a Vibrant Startup Ecosystem',
    short:
      'Build a vibrant startup ecosystem by establishing a network between the university, financial institutions, industries, and other institutions.',
    detail:
      'Create durable partnerships that expand opportunities for founders, funders, and collaborators.',
    icon: 'mdi-hub-outline',
    bg: '#ecfccb',
    color: '#65a30d',
  },
  {
    title: 'Deliver Value-Added Startup Services',
    short:
      'Provide cost-effective, value-added services to startups such as mentoring, legal, financial, technical, and intellectual property support to help establish startups and build successful business models.',
    detail:
      'Offer end-to-end startup support services that reduce friction and improve venture survival and growth.',
    icon: 'mdi-account-tie-outline',
    bg: '#ffe4e6',
    color: '#e11d48',
  },
])

//  Core Values  //
const coreValues = ref([
  {
    label: 'Innovation',
    icon: 'mdi-lightbulb-on-outline',
    color: '#1565c0',
    desc: 'We champion bold, creative approaches to problem-solving and product development.',
  },
  {
    label: 'Integrity',
    icon: 'mdi-shield-check-outline',
    color: '#059669',
    desc: 'We operate with transparency and ethical standards in all our programs and partnerships.',
  },
  {
    label: 'Collaboration',
    icon: 'mdi-account-group-outline',
    color: '#ea580c',
    desc: 'We believe the strongest ventures are built through meaningful community and partnership.',
  },
  {
    label: 'Excellence',
    icon: 'mdi-star-outline',
    color: '#7c3aed',
    desc: 'We set high standards for our programs, mentors, and the startups we support.',
  },
  {
    label: 'Impact',
    icon: 'mdi-trending-up',
    color: '#d97706',
    desc: 'Every program, session, and investment is measured by the real-world change it creates.',
  },
  {
    label: 'Resilience',
    icon: 'mdi-refresh',
    color: '#dc2626',
    desc: 'We build founders who can withstand setbacks and emerge stronger from adversity.',
  },
])

//  Services  //
const services = ref([
  {
    title: 'Business Ideation',
    description:
      'Comprehensive 6-month support for early-stage startups to develop, validate, and scale innovative ideas into market-ready ventures.',
    features: [
      'Mentorship & coaching',
      'Co-working space access',
      'Investor introductions',
      'Legal & IP support',
    ],
    icon: 'mdi-lightbulb-on-outline',
    gradient: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)',
    glowColor: 'rgba(21,101,192,0.4)',
    accentColor: '#1565C0',
  },
  {
    title: 'Startup Support',
    description:
      'One-on-one guidance from industry experts, seasoned entrepreneurs, and academic researchers to accelerate your growth.',
    features: [
      'Industry expert matching',
      'Weekly check-ins',
      'Network access',
      'Business model coaching',
    ],
    icon: 'mdi-handshake-outline',
    gradient: 'linear-gradient(135deg, #1B5E20 0%, #66BB6A 100%)',
    glowColor: 'rgba(27,94,32,0.4)',
    accentColor: '#2E7D32',
  },
  {
    title: 'Training Program',
    description:
      'Workshops, bootcamps, and seminars covering entrepreneurship, tech development, financial modeling, and business strategy.',
    features: [
      'Bootcamps & sprints',
      'Certification courses',
      'Financial modeling',
      'GTM strategy workshops',
    ],
    icon: 'mdi-school-outline',
    gradient: 'linear-gradient(135deg, #4A148C 0%, #AB47BC 100%)',
    glowColor: 'rgba(74,20,140,0.4)',
    accentColor: '#7B1FA2',
  },
])

//  Achievements  //
const achievements = ref([
  {
    label: 'Funding Received',
    value: '10.4M',
    desc: 'Through DOST PCIEERD partnership to establish the facility and all related activities.',
    icon: 'mdi-cash-multiple',
    color: '#1565C0',
  },
  {
    label: 'Facility Established',
    value: '200 mq',
    desc: '10m — 20m facility purpose-built for tech-based startups in Butuan City.',
    icon: 'mdi-office-building-outline',
    color: '#00897B',
  },
  {
    label: 'Incubatees',
    value: '142',
    desc: 'Venture teams formed across ICT, Engineering, and related technology sectors.',
    icon: 'mdi-account-group-outline',
    color: '#EF6C00',
  },
  {
    label: 'Revenues Earned',
    value: '20.2M',
    desc: 'Total revenues generated by graduated and active startup incubatees.',
    icon: 'mdi-sack',
    color: '#C62828',
  },
  {
    label: 'Partnerships',
    value: '17',
    desc: '14 local partners and 3 international partners across government and industry.',
    icon: 'mdi-handshake-outline',
    color: '#6A1B9A',
  },
  {
    label: 'Human Capital',
    value: '108',
    desc: '50 faculty certified · 16 MSMEs trained · 46 startups developed.',
    icon: 'mdi-account-tie-outline',
    color: '#558B2F',
  },
  {
    label: 'Jobs Created',
    value: '28',
    desc: 'Employees hired directly through Navigatu-incubated startup companies.',
    icon: 'mdi-briefcase-check-outline',
    color: '#F9A825',
  },
  {
    label: 'Ecosystem',
    value: '1',
    desc: 'Consortium integrating HEIs, DOST, and DICT into one innovation network.',
    icon: 'mdi-hub-outline',
    color: '#B71C1C',
  },
])

//  Timeline  //
const timeline = ref([
  {
    year: '2017',
    title: 'Navigatu TBI Founded',
    desc: 'Established with DOST PCIEERD support at Caraga State University.',
    detail:
      'Navigatu was formally established as a technology business incubator with initial funding of ₱10.4M from DOST PCIEERD, housed at a purpose-built 200 m² facility inside CSU, Butuan City.',
    color: '#1565c0',
  },
  {
    year: '2018',
    title: 'First Incubatee Cohort',
    desc: 'Welcomed the first batch of tech startup teams for incubation.',
    detail:
      'The inaugural cohort comprised student and faculty teams from CSU focusing on ICT solutions for local government and agriculture sectors in the Caraga region.',
    color: '#059669',
  },
  {
    year: '2019',
    title: 'Partnership Expansion',
    desc: 'Signed MOAs with 8 local government and private sector partners.',
    detail:
      'Strategic partnerships were formalized with DICT Caraga, DTI Agusan del Norte, and several private tech companies â€” expanding mentorship resources and funding pathways for incubatees.',
    color: '#ea580c',
  },
  {
    year: '2020',
    title: 'Hybrid Program Launch',
    desc: 'Pivoted to hybrid incubation in response to the pandemic.',
    detail:
      'Navigatu rapidly adapted its programs to a blended online-offline model, enabling continuous operations during COVID-19 and demonstrating the resilience of its startup community.',
    color: '#7c3aed',
  },
  {
    year: '2022',
    title: 'International Linkages',
    desc: 'Forged 3 international partnerships with foreign universities.',
    detail:
      'Linkage agreements with partner universities in South Korea, Malaysia, and Australia opened new doors for cross-border mentorship, student exchange programs, and joint research commercialization.',
    color: '#d97706',
  },
  {
    year: '2024',
    title: '20.2M Revenue Milestone',
    desc: 'Incubatee-generated revenues surpassed 20 million.',
    detail:
      "A landmark milestone reflecting the commercial success of Navigatu graduates ” validating the incubator's approach of combining rigorous mentorship with real-world market validation.",
    color: '#dc2626',
  },
])

//  Incubatees (Supabase)  //
const incubatees = ref([])
const incubateeFilters = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Graduated', value: 'graduated' },
]
const activeIncubateeFilter = ref('all')

const filteredIncubatees = computed(() => {
  if (activeIncubateeFilter.value === 'all') return incubatees.value
  return incubatees.value.filter((c) => c.status === activeIncubateeFilter.value)
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

//  FAQs
const faqs = ref([
  {
    q: 'What is Navigatu TBI?',
    a: 'Navigatu Technology Business Incubator is a DOST PCIEERD-supported startup incubator at Caraga State University in Butuan City, established in 2017 to nurture technology-based ventures in Southern Philippines.',
  },
  {
    q: 'Who can apply to the incubation program?',
    a: 'Students, faculty researchers, early-stage startups, and technology entrepreneurs from any discipline can apply, provided their venture has a tech-driven component and a clear market opportunity.',
  },
  {
    q: 'How long is the incubation program?',
    a: 'The core program runs for 6 months, with optional alumni support and continued mentorship available after graduation for qualifying ventures.',
  },
  {
    q: 'Is there an equity or fee requirement?',
    a: 'Navigatu TBI does not take equity from incubatees. Some programs may have a modest participation fee depending on the specific services availed.',
  },
  {
    q: 'Do I need a registered business to apply?',
    a: 'No — you can apply as an individual or informal team. We assist with business registration and legal structuring as part of the program itself.',
  },
  {
    q: 'Can teams outside Butuan City apply?',
    a: 'Yes. We accept applications from across the Caraga region and beyond through our hybrid (online + in-person) program format.',
  },
  {
    q: 'What happens after the program ends?',
    a: 'Graduates join the Navigatu Alumni Network with continued access to mentorship, investor introductions, and co-working facilities at discounted rates.',
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

/*  NAVBAR  */
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

/*  BUTTONS  */
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
  box-shadow: 0 10px 30px rgba(21, 101, 192, 0.5);
  transform: translateY(-1px);
}
.btn-line {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: #1a1a1a;
  font-family: 'Sora', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  border: 1.5px solid rgba(21, 101, 192, 0.35);
  border-radius: 50px;
  padding: 12px 26px;
  cursor: pointer;
  transition: all 0.22s;
}
.btn-line:hover {
  background: rgba(21, 101, 192, 0.06);
  border-color: #1565c0;
}

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

/*  SECTION HELPERS  */
.eyebrow {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #1565c0;
  margin-bottom: 10px;
}
.sec-title {
  font-family: 'Sora', sans-serif;
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
.sec-body {
  font-size: 0.87rem;
  color: #64748b;
  line-height: 1.85;
}
.sec-white {
  background: #fff;
}
.sec-offwhite {
  background: #f8faff;
}
.py-sec {
  padding-top: 84px;
  padding-bottom: 84px;
}

/*  HERO  */
.about-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  padding-top: 64px;
}
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
.hero-left-panel {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 640px;
  display: flex;
  align-items: center;
}
.hero-left-content {
  width: 100%;
}
.hero-pill {
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
.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.28);
  flex-shrink: 0;
}
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

@media (max-width: 959px) {
  .about-hero {
    min-height: unset;
    padding-top: 0;
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
}

/*  ABOUT SECTION  */
.about-img-stack {
  position: relative;
}
.about-img-main {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 22px;
  display: block;
  box-shadow: 0 20px 56px rgba(0, 0, 0, 0.1);
}
.about-img-float {
  position: absolute;
  bottom: -24px;
  right: -16px;
  width: 180px;
  border-radius: 16px;
  overflow: hidden;
  border: 4px solid #fff;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.14);
}
.about-img-sm {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}
.about-img-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 50px;
  padding: 6px 14px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #0f172a;
  display: inline-flex;
  align-items: center;
}

.facts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.fact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8faff;
  border: 1px solid #e5eaf5;
  border-radius: 14px;
  padding: 14px 16px;
}
.fact-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.fact-val {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
}
.fact-label {
  font-size: 0.68rem;
  color: #94a3b8;
  margin-top: 2px;
}

/*  VISION / MISSION  */
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
  height: 320px;
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

/*  OBJECTIVES  */
.obj-card {
  background: #fff;
  border: 1.5px solid #e5eaf5;
  border-radius: 18px;
  padding: 24px;
  height: 100%;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
  position: relative;
}
.obj-card:hover {
  transform: translateY(0px);
  box-shadow: 0 10px 32px rgba(21, 101, 192, 0.09);
  border-color: #c4d5f7;
}
.obj-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.obj-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.3;
}
.obj-short {
  font-size: 0.77rem;
  color: #64748b;
  line-height: 1.7;
}

/* â”€â”€ CORE VALUES â”€â”€ */
.values-section {
  background: #080d1c;
  position: relative;
  overflow: hidden;
  padding-top: 84px;
  padding-bottom: 84px;
}
.values-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 12% 55%, rgba(37, 99, 235, 0.22) 0%, transparent 48%),
    radial-gradient(ellipse at 88% 25%, rgba(124, 58, 237, 0.18) 0%, transparent 48%);
}
.val-card {
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 18px;
  padding: 26px 20px;
  text-align: center;
  cursor: pointer;
  transition:
    background 0.22s,
    border-color 0.22s,
    transform 0.22s;
}
.val-card:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-3px);
}
.val-card--active {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.22);
}
.val-icon-ring {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1.5px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.val-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
}
.val-desc {
  font-size: 0.73rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
  margin: 0;
}

/*  SERVICES  */
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
  padding: 5px 18px;
  cursor: pointer;
  transition: all 0.2s;
}
.svc-btn:hover {
  background: var(--sc, #1565c0);
  color: #fff;
}

.explore-services-btn {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: var(--sc, #1565c0);
  font-family: 'Sora', sans-serif;
  font-size: 0.76rem;
  font-weight: 600;
  border: 1.5px solid var(--sc, #1565c0);
  border-radius: 10px;
  padding: 12px 18px;
  cursor: pointer;
  transition: all 0.2s;
}

.explore-services-btn:hover {
  background: var(--sc, #1565c0);
  color: #fff;
}

/*  ACHIEVEMENTS  */
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
  transform: translateY(-4px);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.18);
}
.ach-top {
  height: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
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

/*  INCUBATEES  */
.incubatees-section {
  background: #f5f7fb;
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
  font-size: 0.78rem;
  font-weight: 700;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

/*  TIMELINE  */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #1565c0, #7c3aed);
  transform: translateX(-50%);
  opacity: 0.2;
}
.tl-item {
  display: flex;
  justify-content: flex-end;
  padding-right: calc(50% + 32px);
  margin-bottom: 24px;
  position: relative;
}
.tl-item--right {
  justify-content: flex-start;
  padding-right: 0;
  padding-left: calc(50% + 32px);
}
.tl-dot {
  position: absolute;
  left: 50%;
  top: 24px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transform: translateX(-50%);
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.2);
  z-index: 1;
}
.tl-content {
  background: #fff;
  border: 1.5px solid #e5eaf5;
  border-radius: 16px;
  padding: 20px 22px;
  cursor: pointer;
  width: 100%;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.tl-content:hover {
  border-color: #c4d5f7;
  box-shadow: 0 6px 24px rgba(21, 101, 192, 0.08);
}
.tl-content--active {
  border-color: #1565c0;
  box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.07);
}
.tl-year {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 6px;
}
.tl-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 5px;
}
.tl-desc {
  font-size: 0.76rem;
  color: #64748b;
  line-height: 1.65;
  margin: 0;
}
.tl-detail-divider {
  height: 1px;
  background: #f1f5f9;
  margin: 10px 0;
}
.tl-detail-text {
  font-size: 0.74rem;
  color: #475569;
  line-height: 1.75;
  margin: 0;
}

@media (max-width: 599px) {
  .timeline::before {
    left: 16px;
  }
  .tl-item,
  .tl-item--right {
    justify-content: flex-start;
    padding-right: 0;
    padding-left: 44px;
  }
  .tl-dot {
    left: 16px;
  }
  .facts-grid {
    grid-template-columns: 1fr;
  }
}

/*  VIDEO  */
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

/*  FAQ  */
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

/*  FOOTER  */
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

/*  TRANSITIONS  */
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
