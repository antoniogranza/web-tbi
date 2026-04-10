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
      :elevation="scrolled ? 3 : 0"
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
              v-model="searchQuery"
              class="nav-search-field"
              type="text"
              placeholder="Search..."
            />
            <v-btn variant="text" icon size="small" class="nav-search-icon-btn">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </div>
          <button class="nav-apply-btn ml-2" @click="applyDialog = true">Apply Now</button>
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
        />
        <v-list-item
          title="Services"
          prepend-icon="mdi-briefcase-outline"
          rounded="lg"
          class="mb-1"
        />
        <v-list-item
          title="Coworking"
          prepend-icon="mdi-office-building-outline"
          rounded="lg"
          class="mb-1"
        />
        <v-list-item
          title="News"
          prepend-icon="mdi-newspaper-variant-outline"
          rounded="lg"
          class="mb-1"
          active
        />
        <v-list-item title="Events" prepend-icon="mdi-calendar-outline" rounded="lg" class="mb-1" />
      </v-list>
      <template #append>
        <div class="pa-4">
          <button class="nav-apply-btn w-full" @click="openApplyFromDrawer">Apply Now</button>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <!-- ===== HERO ===== -->
      <div class="hero-section">
        <div class="hero-grid" />
        <v-container class="hero-inner">
          <v-row align="center">
            <v-col cols="12" md="6" class="hero-left">
              <div class="hero-pill mb-6">
                <span class="live-dot" />
                Butuan City, Caraga Region
              </div>
              <h1 class="hero-title">
                <em>Your Hub</em> for<br />Innovation &<br />Technopreneurship
              </h1>
              <p class="hero-body mt-5 mb-8">
                Navigatú TBI empowers the next generation of Filipino tech founders through
                mentorship, funding pathways, and a thriving startup community.
              </p>
              <div class="d-flex flex-wrap gap-3 mb-10">
                <button class="btn-primary" @click="applyDialog = true">
                  <v-icon size="17" class="mr-2">mdi-rocket-launch-outline</v-icon> Apply Now
                </button>
                <button class="btn-ghost" @click="learnMoreScroll">
                  <v-icon size="17" class="mr-2">mdi-play-circle-outline</v-icon> Learn More
                </button>
              </div>
              <div class="hero-stats">
                <div v-for="s in heroStats" :key="s.label" class="hero-stat">
                  <div class="hero-stat-num">{{ s.num }}</div>
                  <div class="hero-stat-label">{{ s.label }}</div>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="d-none d-md-block">
              <div class="hero-collage">
                <div class="collage-main">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                    alt="Team"
                    class="collage-img-main"
                  />
                  <div class="collage-live-badge"><span class="live-dot" /> Live Programs</div>
                </div>
                <div class="collage-side">
                  <div class="collage-stat-card">
                    <div class="collage-big">60+</div>
                    <div class="collage-sub">Startups Launched</div>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&q=80"
                    alt="Office"
                    class="collage-img-side"
                  />
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Tech cards -->
          <v-row id="learn-more" class="mt-10">
            <v-col
              v-for="(cat, i) in techCategories"
              :key="cat.title"
              cols="12"
              sm="6"
              md="3"
              :class="['tc', { 'tc--in': animatedCards }]"
              :style="{ animationDelay: `${i * 80}ms` }"
            >
              <div
                class="tech-card"
                :class="{ 'tech-card--sel': selectedTech === cat.title }"
                @click="selectedTech = selectedTech === cat.title ? null : cat.title"
              >
                <div class="tech-icon" :style="{ background: cat.iconBg }">
                  <v-icon :icon="cat.icon" :color="cat.color" size="22" />
                </div>
                <div class="tech-title">{{ cat.title }}</div>
                <div class="tech-desc">{{ cat.desc }}</div>
                <transition name="fx">
                  <div v-if="selectedTech === cat.title" class="tech-detail">
                    <div class="tech-divider" />
                    <p class="tech-detail-text">{{ cat.detail }}</p>
                    <button
                      class="btn-micro"
                      :style="{
                        color: cat.color,
                        borderColor: cat.color + '55',
                        background: cat.color + '14',
                      }"
                    >
                      <v-icon size="12" class="mr-1">mdi-arrow-right</v-icon> Explore
                    </button>
                  </div>
                </transition>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- ===== WHO CAN APPLY ===== -->
      <div class="sec-white py-sec">
        <v-container>
          <div class="text-center mb-12">
            <div class="eyebrow">Eligibility</div>
            <h2 class="sec-title">Who can <em>Apply</em></h2>
            <p class="sec-sub">
              Students, Faculty, Early-Stage startups, and Tech Entrepreneurs can apply
            </p>
          </div>
          <v-tabs
            v-model="activeApplyTab"
            color="primary"
            align-tabs="center"
            class="mb-8"
            show-arrows
          >
            <v-tab value="all">All</v-tab>
            <v-tab v-for="c in applyCards" :key="c.id" :value="c.id">{{ c.short }}</v-tab>
          </v-tabs>
          <v-row>
            <v-col v-for="card in filteredApplyCards" :key="card.id" cols="12" md="6" class="mb-4">
              <div class="apply-card" :class="'ac--' + card.id" @click="openApplyDetail(card)">
                <div class="ac-inner">
                  <div class="ac-badge" :style="{ background: card.badgeColor }">
                    <v-icon :icon="card.icon" size="26" color="white" />
                  </div>
                  <h3 class="ac-title mt-4 mb-2">{{ card.title }}</h3>
                  <p class="ac-body mb-4">{{ card.desc }}</p>
                  <div class="ac-chips mb-4">
                    <span v-for="tag in card.tags" :key="tag" class="ac-chip">{{ tag }}</span>
                  </div>
                  <button class="btn-card" :style="{ '--c': card.badgeColor }">
                    Learn More <v-icon size="13" class="ml-1">mdi-arrow-right</v-icon>
                  </button>
                </div>
                <div class="ac-deco">{{ card.emoji }}</div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- Apply Detail Dialog -->
      <v-dialog v-model="applyDetailDialog" max-width="520" transition="dialog-bottom-transition">
        <v-card v-if="activeApplyCard" rounded="xl" class="overflow-hidden">
          <div class="pa-6 pb-5" :class="'ac--' + activeApplyCard.id">
            <div class="d-flex align-center justify-space-between">
              <div class="ac-badge" :style="{ background: activeApplyCard.badgeColor }">
                <v-icon :icon="activeApplyCard.icon" size="24" color="white" />
              </div>
              <v-btn icon size="small" variant="text" @click="applyDetailDialog = false"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </div>
            <h3 class="ac-title mt-3">{{ activeApplyCard.title }}</h3>
          </div>
          <div class="pa-6">
            <p class="text-body-2 text-medium-emphasis mb-5" style="line-height: 1.8">
              {{ activeApplyCard.fullDesc }}
            </p>
            <v-divider class="mb-4" />
            <p class="text-caption font-weight-bold text-medium-emphasis mb-3">REQUIREMENTS</p>
            <v-list density="compact" class="pa-0 bg-transparent">
              <v-list-item
                v-for="req in activeApplyCard.requirements"
                :key="req"
                :title="req"
                prepend-icon="mdi-check-circle-outline"
                :base-color="activeApplyCard.badgeColor"
                density="compact"
                class="px-0"
              />
            </v-list>
            <button
              class="btn-primary mt-6"
              style="width: 100%; justify-content: center"
              @click="openApplyFromDetail"
            >
              Apply as {{ activeApplyCard.short }}
            </button>
          </div>
        </v-card>
      </v-dialog>

      <!-- ===== INCUBATION JOURNEY ===== -->
      <div class="journey-section">
        <div class="journey-glow" />
        <v-container class="position-relative">
          <div class="text-center mb-16">
            <div class="eyebrow" style="color: #f97316">How it works</div>
            <h2 class="sec-title" style="color: #fff">The Incubation <em>Journey</em></h2>
            <p class="sec-sub" style="color: rgba(255, 255, 255, 0.5)">
              From idea to market-ready startup in four structured phases
            </p>
          </div>

          <!-- Desktop -->
          <div class="d-none d-md-block journey-desktop">
            <div class="journey-rail" />
            <v-row>
              <v-col v-for="(step, i) in journeySteps" :key="step.phase" cols="3">
                <div
                  class="jcard"
                  :class="{ 'jcard--open': activeJourneyStep === i }"
                  @click="activeJourneyStep = activeJourneyStep === i ? null : i"
                >
                  <div class="jcard-bubble" :style="{ background: step.color }">
                    <v-icon :icon="step.icon" color="white" size="20" />
                  </div>
                  <div class="jcard-num">Phase {{ i + 1 }}</div>
                  <h4 class="jcard-title">{{ step.phase }}</h4>
                  <div class="jcard-dur" :style="{ color: step.color }">
                    <v-icon size="11" class="mr-1">mdi-clock-outline</v-icon>{{ step.duration }}
                  </div>
                  <p class="jcard-desc">{{ step.desc }}</p>
                  <div class="jcard-tags mt-3">
                    <span
                      v-for="tag in step.tags"
                      :key="tag"
                      class="jtag"
                      :style="{ background: step.color + '22', color: step.color }"
                      >{{ tag }}</span
                    >
                  </div>
                  <transition name="fx">
                    <div v-if="activeJourneyStep === i" class="jcard-expand">
                      <img :src="step.img" :alt="step.phase" class="jcard-img" />
                      <p class="jcard-expand-text">{{ step.expandDetail }}</p>
                    </div>
                  </transition>
                </div>
              </v-col>
            </v-row>
          </div>

          <!-- Mobile -->
          <div class="d-md-none">
            <div
              v-for="(step, i) in journeySteps"
              :key="step.phase"
              class="jmobile"
              :class="{ 'jmobile--open': mobileJourneyOpen === i }"
            >
              <div
                class="jmobile-header"
                @click="mobileJourneyOpen = mobileJourneyOpen === i ? null : i"
              >
                <div class="d-flex align-center gap-3">
                  <div class="jbubble-sm" :style="{ background: step.color }">
                    <v-icon :icon="step.icon" color="white" size="15" />
                  </div>
                  <div>
                    <div class="jmobile-num">Phase {{ i + 1 }} · {{ step.duration }}</div>
                    <div class="jmobile-title">{{ step.phase }}</div>
                  </div>
                </div>
                <v-icon
                  :icon="mobileJourneyOpen === i ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  color="white"
                  size="20"
                />
              </div>
              <transition name="fx">
                <div v-if="mobileJourneyOpen === i" class="jmobile-body">
                  <img :src="step.img" :alt="step.phase" class="jmobile-img" />
                  <p class="jmobile-desc">{{ step.desc }}</p>
                  <div class="jcard-tags mt-2">
                    <span
                      v-for="tag in step.tags"
                      :key="tag"
                      class="jtag"
                      :style="{ background: step.color + '30', color: step.color }"
                      >{{ tag }}</span
                    >
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </v-container>
      </div>

      <!-- ===== SERVICES ===== -->
      <div class="sec-offwhite py-sec">
        <v-container>
          <div class="text-center mb-12">
            <div class="eyebrow" style="color: #16a34a">What we offer</div>
            <h2 class="sec-title">NAVIGATÚ <em>Services</em></h2>
            <p class="sec-sub">Comprehensive support to help your venture thrive at every stage</p>
          </div>
          <v-row align="stretch">
            <v-col cols="12" md="5" class="d-none d-md-flex">
              <div class="svc-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80"
                  alt="Services"
                  class="svc-img"
                />
                <div class="svc-img-badge">
                  <v-icon icon="mdi-star-four-points" size="15" color="#f59e0b" class="mr-2" />
                  Top-rated TBI in Caraga
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="7">
              <v-row>
                <v-col v-for="svc in navServices" :key="svc.title" cols="12" sm="6" class="mb-4">
                  <div
                    class="svc-card"
                    :class="{ 'svc-card--active': activeSvc === svc.title }"
                    @click="activeSvc = activeSvc === svc.title ? null : svc.title"
                  >
                    <div class="svc-icon" :style="{ background: svc.iconBg }">
                      <v-icon :icon="svc.icon" :color="svc.color" size="20" />
                    </div>
                    <h4 class="svc-title mt-3 mb-2" :style="{ color: svc.color }">
                      {{ svc.title }}
                    </h4>
                    <ul class="svc-list">
                      <li v-for="item in svc.items" :key="item">{{ item }}</li>
                    </ul>
                    <transition name="fx">
                      <div v-if="activeSvc === svc.title" class="svc-detail mt-3">
                        {{ svc.detail }}
                      </div>
                    </transition>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- ===== MENTORS ===== -->
      <div v-if="leaders.length" class="sec-white py-sec">
        <v-container>
          <div class="text-center mb-12">
            <div class="eyebrow" style="color: #7c3aed">Our Network</div>
            <h2 class="sec-title">Meet the <em>Mentors</em></h2>
            <p class="sec-sub">Industry experts and seasoned entrepreneurs guiding your journey</p>
          </div>
          <v-row justify="center">
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
      </div>

      <!-- ===== SUCCESS STORIES ===== -->
      <div class="sec-offwhite py-sec">
        <v-container>
          <div class="text-center mb-12">
            <div class="eyebrow">Graduates</div>
            <h2 class="sec-title">Success <em>Stories</em></h2>
            <p class="sec-sub">
              Every startup tells a story of success and milestones in their journey
            </p>
          </div>
          <div class="d-flex justify-center flex-wrap gap-2 mb-8">
            <button
              v-for="f in storyFilters"
              :key="f"
              class="filter-pill"
              :class="{ 'filter-pill--on': activeStoryFilter === f }"
              @click="activeStoryFilter = f"
            >
              {{ f }}
            </button>
          </div>
          <div
            v-for="story in filteredStories"
            :key="story.name"
            class="story-card mb-5"
            @click="openStory(story)"
          >
            <div class="story-logo" :style="{ background: story.logoBg }">{{ story.initials }}</div>
            <div class="story-body">
              <div class="d-flex align-center justify-space-between mb-2 flex-wrap gap-2">
                <h3 class="story-name">{{ story.name }}</h3>
                <span
                  class="story-pill"
                  :style="{ background: story.statusBg, color: story.statusText }"
                  >{{ story.status }}</span
                >
              </div>
              <p class="story-desc mb-4">{{ story.desc }}</p>
              <div class="story-meta">
                <div class="sm-item">
                  <v-icon size="13" color="#1565c0" class="mr-1">mdi-tag-outline</v-icon
                  ><span>{{ story.industry }}</span>
                </div>
                <div class="sm-item">
                  <v-icon size="13" color="#16a34a" class="mr-1">mdi-cash-multiple</v-icon
                  ><span>{{ story.funding }}</span>
                </div>
                <div class="sm-item">
                  <v-icon size="13" color="#e65100" class="mr-1">mdi-calendar-outline</v-icon
                  ><span>{{ story.year }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-right mt-4">
            <button class="btn-outlined">
              More Stories <v-icon size="15" class="ml-1">mdi-arrow-right</v-icon>
            </button>
          </div>
        </v-container>
      </div>

      <!-- Story dialog -->
      <v-dialog v-model="storyDialog" max-width="560" transition="dialog-bottom-transition">
        <v-card v-if="activeStory" rounded="xl" class="overflow-hidden">
          <div
            class="pa-6"
            :style="{
              background: activeStory.logoBg + '18',
              borderBottom: '1px solid ' + activeStory.logoBg + '33',
            }"
          >
            <div class="d-flex align-center gap-4">
              <div class="story-dialog-logo" :style="{ background: activeStory.logoBg }">
                {{ activeStory.initials }}
              </div>
              <div>
                <h3 class="story-name">{{ activeStory.name }}</h3>
                <span
                  class="story-pill d-inline-block mt-1"
                  :style="{ background: activeStory.statusBg, color: activeStory.statusText }"
                  >{{ activeStory.status }}</span
                >
              </div>
              <v-spacer /><v-btn icon size="small" variant="text" @click="storyDialog = false"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </div>
          </div>
          <div class="pa-6">
            <p class="text-body-2 text-medium-emphasis mb-5" style="line-height: 1.8">
              {{ activeStory.fullDesc }}
            </p>
            <v-divider class="mb-4" />
            <v-row>
              <v-col cols="4" class="text-center"
                ><div class="text-h6 font-weight-bold" style="color: #1565c0">
                  {{ activeStory.funding }}
                </div>
                <div class="text-caption text-medium-emphasis">Funding</div></v-col
              >
              <v-col cols="4" class="text-center"
                ><div class="text-h6 font-weight-bold" style="color: #16a34a">
                  {{ activeStory.team }}
                </div>
                <div class="text-caption text-medium-emphasis">Team</div></v-col
              >
              <v-col cols="4" class="text-center"
                ><div class="text-h6 font-weight-bold" style="color: #e65100">
                  {{ activeStory.year }}
                </div>
                <div class="text-caption text-medium-emphasis">Founded</div></v-col
              >
            </v-row>
          </div>
        </v-card>
      </v-dialog>

      <!-- ===== CTA ===== -->
      <div class="cta-section">
        <div class="cta-glow" />
        <v-container class="text-center position-relative">
          <div class="cta-icon-ring mb-6">
            <v-icon icon="mdi-rocket-launch" size="34" color="white" />
          </div>
          <h2 class="cta-title mb-4">Ready to Launch Your Startup?</h2>
          <p class="cta-sub mb-10 mx-auto">
            Join Navigatú TBI and get access to mentorship, funding, and a thriving community of
            innovators.
          </p>
          <div class="d-flex justify-center flex-wrap gap-4">
            <button class="btn-cta-solid" @click="applyDialog = true">
              <v-icon size="17" class="mr-2">mdi-send-outline</v-icon> Start Application
            </button>
            <button class="btn-cta-ghost">
              <v-icon size="17" class="mr-2">mdi-calendar-check-outline</v-icon> Schedule a Tour
            </button>
          </div>
        </v-container>
      </div>
    </v-main>

    <!-- APPLY DIALOG -->
    <v-dialog v-model="applyDialog" max-width="540" persistent>
      <v-card rounded="xl" class="pa-2">
        <v-card-title class="pa-6 pb-2 d-flex align-center justify-space-between">
          <span class="text-h6 font-weight-bold">Apply to Navigatú TBI</span>
          <v-btn icon size="small" variant="text" @click="closeApplyDialog"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-stepper v-model="applyStep" flat>
          <v-stepper-header class="px-4">
            <v-stepper-item value="1" title="Profile" :color="applyStep >= 1 ? 'primary' : ''" />
            <v-divider />
            <v-stepper-item value="2" title="Venture" :color="applyStep >= 2 ? 'primary' : ''" />
            <v-divider />
            <v-stepper-item value="3" title="Submit" :color="applyStep >= 3 ? 'primary' : ''" />
          </v-stepper-header>
          <v-stepper-window>
            <v-stepper-window-item value="1">
              <div class="pa-4 pt-2">
                <v-text-field
                  v-model="applyForm.name"
                  label="Full Name"
                  variant="outlined"
                  rounded="lg"
                  density="comfortable"
                  class="mb-3"
                />
                <v-text-field
                  v-model="applyForm.email"
                  label="Email Address"
                  variant="outlined"
                  rounded="lg"
                  density="comfortable"
                  class="mb-3"
                />
                <v-select
                  v-model="applyForm.type"
                  label="Applicant Type"
                  :items="[
                    'Student',
                    'Faculty / Researcher',
                    'Early-Stage Startup',
                    'Tech Entrepreneur',
                  ]"
                  variant="outlined"
                  rounded="lg"
                  density="comfortable"
                />
              </div>
            </v-stepper-window-item>
            <v-stepper-window-item value="2">
              <div class="pa-4 pt-2">
                <v-text-field
                  v-model="applyForm.venture"
                  label="Venture / Project Name"
                  variant="outlined"
                  rounded="lg"
                  density="comfortable"
                  class="mb-3"
                />
                <v-select
                  v-model="applyForm.category"
                  label="Tech Category"
                  :items="[
                    'ICT & Software',
                    'Artificial Intelligence',
                    'Internet of Things',
                    'Engineering Tech',
                  ]"
                  variant="outlined"
                  rounded="lg"
                  density="comfortable"
                  class="mb-3"
                />
                <v-textarea
                  v-model="applyForm.pitch"
                  label="Brief Pitch (2–3 sentences)"
                  variant="outlined"
                  rounded="lg"
                  rows="3"
                />
              </div>
            </v-stepper-window-item>
            <v-stepper-window-item value="3">
              <div class="pa-6 text-center">
                <v-icon icon="mdi-check-circle-outline" size="56" color="success" class="mb-4" />
                <h3 class="text-h6 font-weight-bold mb-2">You're all set!</h3>
                <p class="text-body-2 text-medium-emphasis">
                  Our team will contact you within 5 business days.
                </p>
                <v-card class="mt-4 pa-4 text-left" color="grey-lighten-4" rounded="lg" flat>
                  <div class="text-caption font-weight-bold mb-2 text-medium-emphasis">SUMMARY</div>
                  <div class="text-body-2">
                    {{ applyForm.name || '—' }} · {{ applyForm.type || '—' }}
                  </div>
                  <div class="text-body-2 text-medium-emphasis">
                    {{ applyForm.venture || '—' }} · {{ applyForm.category || '—' }}
                  </div>
                </v-card>
              </div>
            </v-stepper-window-item>
          </v-stepper-window>
        </v-stepper>
        <v-card-actions class="px-6 pb-6 gap-2">
          <v-btn v-if="applyStep > 1" variant="text" @click="applyStep--">Back</v-btn>
          <v-spacer />
          <v-btn v-if="applyStep < 3" color="primary" rounded="lg" @click="applyStep++"
            >Continue</v-btn
          >
          <v-btn
            v-else
            color="success"
            rounded="lg"
            prepend-icon="mdi-send"
            @click="submitApplication"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :timeout="4000"
      color="success"
      rounded="lg"
      location="bottom center"
    >
      <v-icon icon="mdi-check-circle" class="mr-2" /> Application submitted! We'll be in touch soon.
      <template #actions
        ><v-btn variant="text" color="white" @click="snackbar = false">Close</v-btn></template
      >
    </v-snackbar>

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
            <div class="d-flex gap-3 mt-5">
              <button class="social-btn"><v-icon size="15">mdi-facebook</v-icon></button>
              <button class="social-btn"><v-icon size="15">mdi-linkedin</v-icon></button>
              <button class="social-btn"><v-icon size="15">mdi-twitter</v-icon></button>
            </div>
          </v-col>
          <v-col cols="6" md="2" class="mb-8">
            <div class="footer-col-title mb-4">Programs</div>
            <div v-for="l in footerLinks.programs" :key="l" class="footer-link mb-3">{{ l }}</div>
          </v-col>
          <v-col cols="6" md="2" class="mb-8">
            <div class="footer-col-title mb-4">Company</div>
            <div v-for="l in footerLinks.company" :key="l" class="footer-link mb-3">{{ l }}</div>
          </v-col>
          <v-col cols="12" md="4" class="mb-8">
            <div class="footer-col-title mb-4">Newsletter</div>
            <p class="footer-desc mb-4">Stay updated on events, funding, and startup news.</p>
            <div class="newsletter">
              <input v-model="newsletterEmail" class="nl-input" placeholder="your@email.com" />
              <button class="nl-btn" @click="subscribeNewsletter">
                <v-icon size="17">mdi-send</v-icon>
              </button>
            </div>
          </v-col>
        </v-row>
        <div class="footer-hr" />
        <div class="d-flex flex-wrap justify-space-between align-center gap-2 pt-6">
          <p class="footer-copy">© 2024 Navigatú TBI. All Rights Reserved.</p>
          <p class="footer-copy">Empowering startups. Building futures.</p>
        </div>
      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/utils/supabase'

const scrolled = ref(false)
const onScroll = () => {
  scrolled.value = window.scrollY > 20
}
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const drawer = ref(false)
const searchQuery = ref('')

const animatedCards = ref(false)
onMounted(() =>
  setTimeout(() => {
    animatedCards.value = true
  }, 300),
)

const heroStats = ref([
  { num: '60+', label: 'Startups Incubated' },
  { num: '₱80M+', label: 'Funding Raised' },
  { num: '15+', label: 'Expert Mentors' },
  { num: '95%', label: 'Survival Rate' },
])

const selectedTech = ref(null)
const techCategories = ref([
  {
    title: 'ICT & Software',
    desc: 'Mobile apps, web platforms, enterprise solutions.',
    icon: 'mdi-monitor-cellphone',
    color: '#1565C0',
    iconBg: '#dbeafe',
    detail: 'Build scalable apps with support from seasoned engineers and product managers.',
  },
  {
    title: 'Artificial Intelligence',
    desc: 'Machine learning, computer vision, NLP.',
    icon: 'mdi-brain',
    color: '#d97706',
    iconBg: '#fef3c7',
    detail: 'Develop AI products with compute resources, AI mentors, and open datasets.',
  },
  {
    title: 'Internet of Things',
    desc: 'Smart devices, sensors, connected systems.',
    icon: 'mdi-access-point-network',
    color: '#059669',
    iconBg: '#d1fae5',
    detail: 'Prototype IoT solutions with hardware lab access and industry partnerships.',
  },
  {
    title: 'Engineering Tech',
    desc: 'Digital tools for engineering and manufacturing.',
    icon: 'mdi-cog-outline',
    color: '#7c3aed',
    iconBg: '#ede9fe',
    detail: 'From CAD to digital twins — build next-gen engineering software.',
  },
])

function learnMoreScroll() {
  document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })
}

const activeApplyTab = ref('all')
const applyDetailDialog = ref(false)
const activeApplyCard = ref(null)

const applyCards = ref([
  {
    id: 'students',
    short: 'Students',
    title: 'Students',
    emoji: '🎓',
    icon: 'mdi-school',
    badgeColor: '#1565C0',
    desc: 'Undergraduate and graduate students with innovative ideas ready to build real-world startups.',
    fullDesc:
      'Students from any discipline with a passion for tech and entrepreneurship are encouraged to apply. Navigatú provides mentorship, tools, and community to help you build your first venture.',
    tags: ['Undergraduate', 'Graduate', 'All Disciplines'],
    requirements: [
      'Enrolled in a Philippine university',
      'Tech-focused project or idea',
      'Letter of endorsement from adviser',
      'Commitment to 6-month program',
    ],
  },
  {
    id: 'faculty',
    short: 'Faculty',
    title: 'Faculty & Researchers',
    emoji: '🔬',
    icon: 'mdi-flask-outline',
    badgeColor: '#059669',
    desc: 'Professors and researchers looking to commercialize research and bridge academia and industry.',
    fullDesc:
      'University faculty and researchers who have developed innovations with commercial potential. Navigatú bridges research and market through IP support, commercialization strategy, and investor intros.',
    tags: ['R&D Commercialization', 'Academia', 'IP Support'],
    requirements: [
      'Faculty or researcher at an HEI',
      'Published or patentable research',
      'Tech transfer readiness',
      'Institutional endorsement',
    ],
  },
  {
    id: 'startups',
    short: 'Startups',
    title: 'Early-Stage Startups',
    emoji: '🚀',
    icon: 'mdi-rocket-launch-outline',
    badgeColor: '#ea580c',
    desc: 'Pre-seed and seed-stage startups needing structured support to validate and scale.',
    fullDesc:
      'Pre-seed and seed-stage tech startups that need support to move from MVP to product-market fit. Gain access to investor networks, legal support, and a community of co-founders.',
    tags: ['Pre-Seed', 'Seed Stage', 'MVP Ready'],
    requirements: [
      'Registered business entity or in process',
      'Working MVP or prototype',
      'Founding team of 2+',
      'Tech-driven product',
    ],
  },
  {
    id: 'techpreneurs',
    short: 'Entrepreneurs',
    title: 'Tech Entrepreneurs',
    emoji: '⚡',
    icon: 'mdi-lightning-bolt',
    badgeColor: '#7c3aed',
    desc: 'Experienced entrepreneurs building technology-driven solutions for real market problems.',
    fullDesc:
      'Seasoned entrepreneurs with prior startup experience looking to scale their tech businesses. Navigatú provides coworking, growth mentors, and corporate partnership programs.',
    tags: ['Tech-Driven', 'Growth Stage', 'Market Ready'],
    requirements: [
      'Prior entrepreneurial experience',
      'Revenue-generating or investment-ready',
      'Scalable tech solution',
      'Full-time commitment to venture',
    ],
  },
])

const filteredApplyCards = computed(() =>
  activeApplyTab.value === 'all'
    ? applyCards.value
    : applyCards.value.filter((c) => c.id === activeApplyTab.value),
)
function openApplyDetail(card) {
  activeApplyCard.value = card
  applyDetailDialog.value = true
}

function openApplyFromDrawer() {
  applyDialog.value = true
  drawer.value = false
}

function openApplyFromDetail() {
  applyDetailDialog.value = false
  applyDialog.value = true
}

function closeApplyDialog() {
  applyDialog.value = false
  applyStep.value = 1
}

const activeJourneyStep = ref(null)
const mobileJourneyOpen = ref(0)

const journeySteps = ref([
  {
    phase: 'Application & Screening',
    icon: 'mdi-file-document-outline',
    color: '#2563eb',
    duration: 'Weeks 1–2',
    desc: 'Submit your pitch deck and documents. Our committee evaluates team strength, technology, and market fit.',
    expandDetail:
      'Our panel of industry experts reviews each application holistically — balancing innovation potential with execution readiness. Top applicants are invited for a live pitch session.',
    tags: ['Pitch Deck', 'Interview', 'Evaluation'],
    img: '/images/facilities/FacilityA.JPG',
  },
  {
    phase: 'Onboarding & Validation',
    icon: 'mdi-clipboard-check-outline',
    color: '#059669',
    duration: 'Months 1–2',
    desc: 'Validate your business model with real customers. Participate in workshops, design sprints, and mentor check-ins.',
    expandDetail:
      "Weekly structured sessions with mentors, plus access to NAVIGATÚ's customer discovery toolkit. Founders test assumptions before writing a single line of production code.",
    tags: ['Customer Discovery', 'MVP Testing', 'Workshops'],
    img: '/images/facilities/FacilityB.jpg',
  },
  {
    phase: 'Development & Acceleration',
    icon: 'mdi-rocket-launch-outline',
    color: '#ea580c',
    duration: 'Months 3–5',
    desc: 'Build, iterate, and accelerate. Access funding networks, legal support, and co-working facilities.',
    expandDetail:
      'Get paired with a technical mentor, tap into our investor network for pre-seed conversations, and use our 24/7 coworking space and premium software stack.',
    tags: ['Product Dev', 'Investor Intro', 'Legal Support'],
    img: '/images/facilities/FacilityC.jpg',
  },
  {
    phase: 'Demo Day & Graduation',
    icon: 'mdi-trophy-outline',
    color: '#7c3aed',
    duration: 'Month 6',
    desc: 'Showcase your startup to investors, industry partners, and media at Navigatú Demo Day.',
    expandDetail:
      'A high-profile public event attended by VCs, corporate partners, government agencies, and media. Graduates join the Alumni Network and stay connected to the Navigatú ecosystem.',
    tags: ['Demo Day', 'Alumni Network', 'Press Coverage'],
    img: '/images/facilities/FacilityD.png',
  },
])

const activeSvc = ref(null)
const navServices = ref([
  {
    title: 'Technical Support',
    icon: 'mdi-code-braces',
    iconBg: '#dbeafe',
    color: '#1565C0',
    items: ['Software Development', 'Cloud Infrastructure', 'Technical Mentorship', 'Code Reviews'],
    detail:
      'Access hands-on guidance from senior engineers, cloud credits, and a dedicated technical helpdesk.',
  },
  {
    title: 'Business Development',
    icon: 'mdi-chart-line',
    iconBg: '#d1fae5',
    color: '#059669',
    items: [
      'Business Model Design',
      'Market Validation',
      'Go-to-Market Strategy',
      'Sales Coaching',
    ],
    detail:
      'Work with mentors to refine your go-to-market strategy and build a sustainable revenue model.',
  },
  {
    title: 'Funding Access',
    icon: 'mdi-currency-php',
    iconBg: '#ffedd5',
    color: '#ea580c',
    items: ['Seed Funding', 'Investor Connections', 'Pitch Preparation', 'Grant Applications'],
    detail:
      'Get introduced to angel investors, VCs, and government grant programs with a 70% success rate.',
  },
  {
    title: 'Workspace & Facilities',
    icon: 'mdi-domain',
    iconBg: '#ede9fe',
    color: '#7c3aed',
    items: ['Co-working Space', 'Meeting Rooms', 'High Speed Internet', 'Development Tools'],
    detail:
      'A 24/7 coworking space with private offices, gigabit internet, and premium software licenses.',
  },
])

const leaders = ref([])

async function fetchMentors() {
  const { data, error } = await supabase
    .from('mentors')
    .select('name, role, photo, tbi_id, status, created_at')
    .eq('tbi_id', 'navigatu')
    .eq('status', 'active')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[ServiceNavigatuView] fetchMentors error', error)
    leaders.value = []
    return
  }

  if (!data || data.length === 0) {
    leaders.value = []
    return
  }

  leaders.value = data.map((mentor) => ({
    name: mentor.name,
    role: mentor.role,
    photo: mentor.photo,
  }))
}

onMounted(fetchMentors)

const storyDialog = ref(false)
const activeStory = ref(null)
const activeStoryFilter = ref('All')
const storyFilters = ['All', 'Artificial Intelligence', 'Business Software', 'HealthTech']
const successStories = ref([
  {
    name: 'Ascribo AI',
    initials: 'AI',
    logoBg: '#1d4ed8',
    status: 'Funded',
    statusBg: '#dcfce7',
    statusText: '#15803d',
    industry: 'Artificial Intelligence',
    funding: '₱4.2M',
    year: '2025',
    team: '8',
    desc: 'A context-aware AI translation platform delivering precise results for law, medicine, and marketing.',
    fullDesc:
      'Ascribo.AI solves the critical problem of inaccurate language translation in high-stakes fields. Their proprietary context engine reduces translation errors by over 90%.',
  },
  {
    name: 'BizNest',
    initials: 'BN',
    logoBg: '#15803d',
    status: 'Scaling',
    statusBg: '#dbeafe',
    statusText: '#1d4ed8',
    industry: 'Business Software',
    funding: '₱4.2M',
    year: '2025',
    team: '12',
    desc: 'A smart business management platform for MSMEs integrating POS, inventory, finance, and CRM.',
    fullDesc:
      'BizNest helps over 500 small businesses reduce operational overhead by 40% through a unified digital workspace.',
  },
  {
    name: 'MediLink PH',
    initials: 'ML',
    logoBg: '#7c3aed',
    status: 'MVP',
    statusBg: '#fef9c3',
    statusText: '#a16207',
    industry: 'HealthTech',
    funding: '₱1.8M',
    year: '2024',
    team: '5',
    desc: 'A telemedicine platform connecting rural Caraga communities with licensed physicians nationwide.',
    fullDesc:
      'MediLink PH enables real-time teleconsultations, digital prescriptions, and secure medical records for underserved areas.',
  },
])

const filteredStories = computed(() =>
  activeStoryFilter.value === 'All'
    ? successStories.value
    : successStories.value.filter((s) => s.industry === activeStoryFilter.value),
)
function openStory(story) {
  activeStory.value = story
  storyDialog.value = true
}

const applyDialog = ref(false)
const applyStep = ref(1)
const applyForm = ref({ name: '', email: '', type: '', venture: '', category: '', pitch: '' })
const snackbar = ref(false)

function submitApplication() {
  applyDialog.value = false
  applyStep.value = 1
  snackbar.value = true
  applyForm.value = { name: '', email: '', type: '', venture: '', category: '', pitch: '' }
}

const newsletterEmail = ref('')
const footerLinks = {
  programs: ['Incubation', 'Pre-incubation', 'Acceleration', 'Alumni Network'],
  company: ['About Us', 'Careers', 'News', 'Contact'],
}
function subscribeNewsletter() {
  newsletterEmail.value = ''
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,600&family=Sora:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}
.v-application {
  font-family: 'Sora', sans-serif !important;
}

/* ── NAVBAR ── */
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
.btn-primary {
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
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(21, 101, 192, 0.5);
}

.btn-ghost {
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
.btn-ghost:hover {
  background: rgba(21, 101, 192, 0.06);
  border-color: #1565c0;
  transform: translateY(-2px);
}

.btn-outlined {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: #1565c0;
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1.5px solid #1565c0;
  border-radius: 50px;
  padding: 10px 24px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-outlined:hover {
  background: #1565c0;
  color: #fff;
}

.btn-micro {
  display: inline-flex;
  align-items: center;
  font-family: 'Sora', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  border: 1px solid;
  border-radius: 50px;
  padding: 4px 12px;
  cursor: pointer;
  transition: opacity 0.18s;
}
.btn-micro:hover {
  opacity: 0.75;
}

.btn-card {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.55);
  color: var(--c, #1565c0);
  font-family: 'Sora', sans-serif;
  font-size: 0.76rem;
  font-weight: 600;
  border: 1.5px solid var(--c, #1565c0);
  border-radius: 50px;
  padding: 7px 18px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-card:hover {
  background: var(--c, #1565c0);
  color: #fff;
}

/* ── SECTION HELPERS ── */
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

/* ── HERO ── */
.hero-section {
  background: #f0f4ff;
  background-image:
    radial-gradient(ellipse at 68% 30%, rgba(37, 99, 235, 0.1) 0%, transparent 55%),
    radial-gradient(ellipse at 18% 75%, rgba(124, 58, 237, 0.07) 0%, transparent 50%);
  position: relative;
  overflow: hidden;
  padding-top: 84px;
  padding-bottom: 64px;
}
.hero-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(21, 101, 192, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(21, 101, 192, 0.045) 1px, transparent 1px);
  background-size: 40px 40px;
}
.hero-inner {
  position: relative;
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
.hero-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2.1rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #0a0f1e;
  line-height: 1.13;
}
.hero-title em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #1565c0;
}
.hero-body {
  font-size: 0.98rem;
  color: #5a6478;
  line-height: 1.85;
  max-width: 460px;
}
.hero-stats {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}
.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.hero-stat-num {
  font-family: 'Sora', sans-serif;
  font-size: 1.45rem;
  font-weight: 700;
  color: #1565c0;
  line-height: 1;
}
.hero-stat-label {
  font-size: 0.68rem;
  color: #999;
}

/* Hero collage */
.hero-collage {
  display: flex;
  gap: 14px;
  max-width: 460px;
  margin-left: auto;
}
.collage-main {
  flex: 1.7;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(21, 101, 192, 0.2);
}
.collage-img-main {
  width: 100%;
  height: 350px;
  object-fit: cover;
  display: block;
}
.collage-live-badge {
  position: absolute;
  bottom: 14px;
  left: 14px;
  background: rgba(0, 0, 0, 0.62);
  backdrop-filter: blur(10px);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 50px;
  padding: 6px 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.collage-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.collage-stat-card {
  background: linear-gradient(135deg, #1565c0, #2563eb);
  border-radius: 16px;
  padding: 20px 16px;
  color: #fff;
  box-shadow: 0 10px 30px rgba(21, 101, 192, 0.32);
}
.collage-big {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}
.collage-sub {
  font-size: 0.68rem;
  opacity: 0.72;
  margin-top: 4px;
}
.collage-img-side {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 16px;
  display: block;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

/* Tech cards */
.tc {
  opacity: 0;
  transform: translateY(18px);
}
.tc--in {
  animation: fadeUp 0.48s ease forwards;
}
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.tech-card {
  background: #fff;
  border-radius: 18px;
  padding: 22px;
  border: 1.5px solid #e5eaf5;
  cursor: pointer;
  transition:
    transform 0.22s,
    box-shadow 0.22s,
    border-color 0.22s;
}
.tech-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(21, 101, 192, 0.1);
  border-color: #c4d5f7;
}
.tech-card--sel {
  border-color: #1565c0;
  box-shadow:
    0 0 0 3px rgba(21, 101, 192, 0.1),
    0 12px 32px rgba(21, 101, 192, 0.14);
}
.tech-icon {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}
.tech-title {
  font-size: 0.87rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 5px;
  line-height: 1.3;
}
.tech-desc {
  font-size: 0.74rem;
  color: #94a3b8;
  line-height: 1.65;
}
.tech-detail {
  padding-top: 12px;
}
.tech-divider {
  height: 1px;
  background: #eee;
  margin-bottom: 10px;
}
.tech-detail-text {
  font-size: 0.73rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 8px;
}

/* ── APPLY CARDS ── */
.apply-card {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  cursor: pointer;
  transition:
    transform 0.25s,
    box-shadow 0.25s;
}
.apply-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.12);
}
.ac-inner {
  position: relative;
  z-index: 1;
  padding: 32px;
}
.ac--students {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}
.ac--faculty {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
}
.ac--startups {
  background: linear-gradient(135deg, #ffedd5, #fed7aa);
}
.ac--techpreneurs {
  background: linear-gradient(135deg, #ede9fe, #ddd6fe);
}
.ac-badge {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}
.ac-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}
.ac-body {
  font-size: 0.82rem;
  color: #475569;
  line-height: 1.75;
}
.ac-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.ac-chip {
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 50px;
  padding: 3px 12px;
  font-size: 0.67rem;
  font-weight: 600;
  color: #444;
}
.ac-deco {
  position: absolute;
  top: 14px;
  right: 20px;
  font-size: 3rem;
  opacity: 0.11;
  pointer-events: none;
}

/* ── JOURNEY SECTION ── */
.journey-section {
  background: #080d1c;
  position: relative;
  overflow: hidden;
  padding-top: 84px;
  padding-bottom: 84px;
}
.journey-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 12% 55%, rgba(37, 99, 235, 0.22) 0%, transparent 48%),
    radial-gradient(ellipse at 88% 25%, rgba(124, 58, 237, 0.18) 0%, transparent 48%),
    radial-gradient(ellipse at 50% 95%, rgba(234, 88, 12, 0.12) 0%, transparent 40%);
}
.journey-desktop {
  position: relative;
}
.journey-rail {
  position: absolute;
  top: 72px;
  left: calc(12.5% + 24px);
  right: calc(12.5% + 24px);
  height: 2px;
  background: linear-gradient(90deg, #2563eb, #059669, #ea580c, #7c3aed);
  opacity: 0.3;
}

.jcard {
  background: rgba(255, 255, 255, 0.055);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 22px;
  padding: 26px 20px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition:
    background 0.25s,
    border-color 0.25s,
    transform 0.25s,
    box-shadow 0.25s;
}
.jcard:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-4px);
}
.jcard--open {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
}
.jcard-bubble {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}
.jcard-num {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.38);
  margin-bottom: 5px;
}
.jcard-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 7px;
  line-height: 1.28;
}
.jcard-dur {
  font-size: 0.7rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.jcard-desc {
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.75;
  margin: 0;
}
.jcard-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.jtag {
  font-size: 0.62rem;
  font-weight: 600;
  border-radius: 50px;
  padding: 3px 10px;
}
.jcard-expand {
  margin-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 14px;
}
.jcard-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 10px;
}
.jcard-expand-text {
  font-size: 0.73rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.75;
  margin: 0;
}

/* Journey mobile */
.jmobile {
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 16px;
  margin-bottom: 10px;
  overflow: hidden;
}
.jmobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.04);
}
.jbubble-sm {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.jmobile-num {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.38);
}
.jmobile-title {
  font-size: 0.86rem;
  font-weight: 700;
  color: #fff;
}
.jmobile-body {
  padding: 16px 20px 20px;
  background: rgba(255, 255, 255, 0.03);
}
.jmobile-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
}
.jmobile-desc {
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.75;
}

/* ── SERVICES ── */
.svc-img-wrap {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  width: 100%;
}
.svc-img {
  width: 100%;
  height: 100%;
  min-height: 400px;
  object-fit: cover;
  border-radius: 22px;
}
.svc-img-badge {
  position: absolute;
  bottom: 18px;
  left: 18px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 9px 18px;
  font-size: 0.76rem;
  font-weight: 700;
  color: #111;
  display: flex;
  align-items: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}
.svc-card {
  background: #fff;
  border: 1.5px solid #e5eaf5;
  border-radius: 18px;
  padding: 22px;
  cursor: pointer;
  height: 100%;
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
}
.svc-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(21, 101, 192, 0.09);
  border-color: #c4d5f7;
}
.svc-card--active {
  border-color: #1565c0;
  box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.08);
}
.svc-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.svc-title {
  font-size: 0.88rem;
  font-weight: 700;
}
.svc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.svc-list li {
  font-size: 0.77rem;
  color: #64748b;
  padding: 5px 0;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 6px;
}
.svc-list li::before {
  content: '›';
  font-size: 1rem;
  color: #cbd5e1;
}
.svc-list li:last-child {
  border-bottom: none;
}
.svc-detail {
  font-size: 0.73rem;
  color: #777;
  line-height: 1.7;
  border-top: 1px solid #eee;
  padding-top: 12px;
}

/* ── LEADERSHIP CARDS (from About style) ── */
.leader-card {
  overflow: hidden;
  transition: transform 0.2s ease;
}
.leader-card:hover {
  transform: translateY(-4px);
}
.leader-photo {
  background: #eef2fa;
}
.leader-name {
  font-size: 0.9rem !important;
  font-weight: 700;
  color: #1a1a1a;
  white-space: normal !important;
  line-height: 1.3 !important;
}
.leader-role {
  font-size: 0.78rem !important;
  color: #888 !important;
}

/* ── STORIES ── */
.story-card {
  display: flex;
  align-items: stretch;
  background: #fff;
  border: 1.5px solid #e5eaf5;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.22s,
    box-shadow 0.22s,
    border-color 0.22s;
}
.story-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
  border-color: #c4d5f7;
}
.story-logo {
  width: 120px;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Sora', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.88);
}
.story-body {
  padding: 24px 28px;
  flex: 1;
}
.story-name {
  font-size: 1.08rem;
  font-weight: 700;
  color: #0f172a;
}
.story-pill {
  font-size: 0.66rem;
  font-weight: 700;
  border-radius: 50px;
  padding: 3px 12px;
}
.story-desc {
  font-size: 0.79rem;
  color: #64748b;
  line-height: 1.8;
}
.story-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.sm-item {
  display: flex;
  align-items: center;
  font-size: 0.76rem;
  color: #94a3b8;
  font-weight: 500;
}
.sm-item span {
  color: #1e293b;
  font-weight: 600;
}
.story-dialog-logo {
  width: 62px;
  height: 62px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

/* Filter pills */
.filter-pill {
  background: transparent;
  border: 1.5px solid #dde3f0;
  border-radius: 50px;
  padding: 7px 18px;
  font-family: 'Sora', sans-serif;
  font-size: 0.76rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.18s;
}
.filter-pill:hover {
  border-color: #1565c0;
  color: #1565c0;
}
.filter-pill--on {
  background: #1565c0;
  border-color: #1565c0;
  color: #fff;
  box-shadow: 0 4px 14px rgba(21, 101, 192, 0.32);
}

/* ── CTA ── */
.cta-section {
  background: #080d1c;
  position: relative;
  overflow: hidden;
  padding-top: 84px;
  padding-bottom: 84px;
}
.cta-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 30% 50%, rgba(37, 99, 235, 0.28) 0%, transparent 55%),
    radial-gradient(ellipse at 75% 45%, rgba(124, 58, 237, 0.22) 0%, transparent 50%);
}
.cta-icon-ring {
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.09);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 0 0 16px rgba(255, 255, 255, 0.04);
}
.cta-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.7rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: #fff;
}
.cta-sub {
  font-size: 0.98rem;
  color: rgba(255, 255, 255, 0.5);
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
  box-shadow: 0 14px 38px rgba(37, 99, 235, 0.58);
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

/* Mobile */
@media (max-width: 599px) {
  .story-card {
    flex-direction: column;
  }
  .story-logo {
    width: 100%;
    min-width: unset;
    min-height: 72px;
    justify-content: flex-start;
    padding: 16px 20px;
    gap: 14px;
    flex-direction: row;
  }
}
</style>
