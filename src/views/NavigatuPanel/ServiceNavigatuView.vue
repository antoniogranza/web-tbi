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
          active
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
      <!-- ===== HERO ===== -->
      <div class="svc-hero">
        <!-- Layered background -->
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=60"
          alt=""
          class="svc-hero-bg-img"
          aria-hidden="true"
        />
        <div class="svc-hero-veil" />
        <div class="svc-hero-veil2" />
        <div class="svc-hero-grid-lines" />

        <!-- Floating particles (rendered via JS in onMounted) -->
        <div class="svc-hero-dots" ref="heroDots" />

        <v-container class="svc-hero-inner">
          <v-row align="center" :style="{ minHeight: '100%' }">
            <!-- LEFT: Copy -->
            <v-col cols="12" md="6" class="hero-left-col">
              <div class="hero-pill mb-5">
                <span class="hero-pulse" />
                Butuan City, Caraga Region
              </div>

              <h1 class="svc-hero-title mb-5">
                Programs Built for<br /><em>Real Startup Growth</em>
              </h1>

              <p class="svc-hero-body mb-9">
                Navigatú TBI offers three flagship programs — each crafted to move you from idea to
                validated, market-ready venture with hands-on mentorship and structured support.
              </p>

              <div class="d-flex flex-wrap ga-3 mb-10">
                <button class="btn-hero-solid" @click="scrollTo('services-grid')">
                  <v-icon size="16" class="mr-2">mdi-briefcase-outline</v-icon>
                  Explore Programs
                </button>
                <button class="btn-hero-ghost" @click="scrollTo('incubation-journey')">
                  <v-icon size="16" class="mr-2">mdi-map-outline</v-icon>
                  See the Journey
                </button>
              </div>

              <!-- Trust badges -->
              <div class="hero-trust-row">
                <span class="hero-trust-label">Recognized by</span>
                <div class="hero-trust-divider" />
                <div class="d-flex ga-2">
                  <span class="hero-trust-badge">DOST</span>
                  <span class="hero-trust-badge">DICT</span>
                  <span class="hero-trust-badge">QSU</span>
                </div>
              </div>
            </v-col>

            <!-- RIGHT: Photo collage (desktop only) -->
            <v-col cols="12" md="6" class="d-none d-md-flex justify-end">
              <div class="hero-photo-stack">
                <!-- Spinning accent ring -->
                <div class="hero-accent-ring" />

                <!-- Main photo -->
                <div class="hero-photo-main">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80"
                    alt="Navigatú team"
                    class="hero-photo-img"
                  />
                  <div class="hero-photo-veil" />
                  <div class="hero-photo-badge">
                    <span class="hero-pulse" />
                    <div>
                      <div class="hero-badge-title">Live Programs</div>
                      <div class="hero-badge-sub">Cohort now open</div>
                    </div>
                  </div>
                </div>

                <!-- Floating stat card -->
                <div class="hero-stat-float">
                  <div class="hero-stat-num">142</div>
                  <div class="hero-stat-lbl">Incubatees Served</div>
                </div>

                <!-- Secondary photo -->
                <div class="hero-photo-b">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&q=80"
                    alt="Navigatú workspace"
                    class="hero-photo-img"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- ===== INDUSTRY FOCUS ===== -->
      <div class="sec-white py-sec">
        <v-container>
          <div class="text-center mb-12">
            <div class="eyebrow">What We Focus On</div>
            <h2 class="sec-title">Industry <em>Focus Areas</em></h2>
            <p class="sec-sub">
              Click any area to learn how Navigatú supports that technology sector
            </p>
          </div>
          <v-row id="learn-more">
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
                    <div class="tech-tags mt-2">
                      <span
                        v-for="tag in cat.tags"
                        :key="tag"
                        class="tech-tag"
                        :style="{ background: cat.color + '18', color: cat.color }"
                        >{{ tag }}</span
                      >
                    </div>
                  </div>
                </transition>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- ===== WHO CAN APPLY ===== -->
      <div class="sec-offwhite py-sec">
        <v-container>
          <div class="text-center mb-12">
            <div class="eyebrow">Eligibility</div>
            <h2 class="sec-title">Who can <em>Apply</em></h2>
            <p class="sec-sub">
              Students, Faculty, Early-Stage startups, and Tech Entrepreneurs can apply
            </p>
          </div>

          <v-row>
            <v-col v-for="card in filteredApplyCards" :key="card.id" cols="12" sm="6" class="mb-2">
              <div
                class="wca-card"
                :class="{ 'wca-card--open': expandedCard === card.id }"
                @click="expandedCard = expandedCard === card.id ? null : card.id"
                role="button"
                :aria-expanded="expandedCard === card.id"
                tabindex="0"
                @keydown.enter="expandedCard = expandedCard === card.id ? null : card.id"
                @keydown.space.prevent="expandedCard = expandedCard === card.id ? null : card.id"
              >
                <div class="wca-card-top">
                  <div class="wca-header">
                    <div class="wca-icon" :style="{ background: card.iconBg }">
                      <v-icon :icon="card.icon" :color="card.iconColor" size="20" />
                    </div>
                    <div class="wca-title-group">
                      <div class="wca-title">{{ card.title }}</div>
                      <div class="wca-short">{{ card.tags[0] }}</div>
                    </div>
                    <div
                      class="wca-toggle"
                      :class="{ 'wca-toggle--open': expandedCard === card.id }"
                    >
                      <v-icon size="16" color="inherit">mdi-chevron-down</v-icon>
                    </div>
                  </div>
                  <p class="wca-desc">{{ card.desc }}</p>
                  <div class="wca-chips">
                    <span v-for="tag in card.tags" :key="tag" class="wca-chip">{{ tag }}</span>
                  </div>
                </div>
                <transition name="wca-expand">
                  <div v-if="expandedCard === card.id" class="wca-expanded">
                    <div class="wca-divider" />
                    <div class="wca-expanded-inner">
                      <div>
                        <div class="wca-section-label">Requirements</div>
                        <ul class="wca-req-list">
                          <li v-for="req in card.requirements" :key="req" class="wca-req-item">
                            <div class="wca-check" :style="{ background: card.iconBg }">
                              <v-icon size="11" :color="card.iconColor">mdi-check</v-icon>
                            </div>
                            {{ req }}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div class="wca-section-label">What you get</div>
                        <div class="wca-perks">
                          <div v-for="perk in card.perks" :key="perk.text" class="wca-perk">
                            <div class="wca-perk-icon">
                              <v-icon :icon="perk.icon" :color="card.iconColor" size="16" />
                            </div>
                            <div class="wca-perk-text">{{ perk.text }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- ===== INCUBATION JOURNEY ===== -->
      <div id="incubation-journey" class="journey-section">
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

      <!-- ===== SERVICES — REDESIGNED ===== -->
      <div id="services-grid" class="sec-white py-sec">
        <v-container>
          <div class="text-center mb-14">
            <div class="eyebrow" style="color: #16a34a">What we offer</div>
            <h2 class="sec-title">NAVIGATÚ <em>Services</em></h2>
            <p class="sec-sub">
              Three flagship programs designed to take your venture from concept to market
            </p>
          </div>

          <!-- Program selector tabs -->
          <div class="prog-tabs mb-10">
            <button
              v-for="svc in navServices"
              :key="svc.slug"
              class="prog-tab"
              :class="{ 'prog-tab--active': activeSvc === svc.slug }"
              :style="
                activeSvc === svc.slug
                  ? {
                      '--ac': svc.color,
                      borderColor: svc.color,
                      color: svc.color,
                      background: svc.color + '12',
                    }
                  : {}
              "
              @click="selectService(svc)"
            >
              <v-icon :icon="svc.icon" size="16" class="mr-2" />
              {{ svc.title }}
            </button>
          </div>

          <!-- Active service detail panel -->
          <transition name="prog-switch" mode="out-in">
            <div :key="activeSvc" class="prog-panel">
              <v-row align="stretch" v-if="activeService">
                <!-- Left: overview -->
                <v-col cols="12" md="5">
                  <div class="prog-overview" :style="{ borderTopColor: activeService.color }">
                    <!-- Header -->
                    <div class="prog-header">
                      <div class="prog-icon-ring" :style="{ background: activeService.iconBg }">
                        <v-icon :icon="activeService.icon" :color="activeService.color" size="28" />
                      </div>
                      <div>
                        <div class="prog-kicker" :style="{ color: activeService.color }">
                          {{ activeService.kicker }}
                        </div>
                        <h3 class="prog-title">{{ activeService.title }}</h3>
                      </div>
                    </div>

                    <p class="prog-summary mt-5 mb-6">{{ activeService.summary }}</p>

                    <!-- Tags -->
                    <div class="prog-tags mb-6">
                      <span
                        v-for="tag in activeService.tags"
                        :key="tag"
                        class="prog-tag"
                        :style="{
                          background: activeService.color + '16',
                          color: activeService.color,
                          borderColor: activeService.color + '30',
                        }"
                        >{{ tag }}</span
                      >
                    </div>

                    <!-- Detail blurb -->
                    <div
                      class="prog-detail-blurb"
                      :style="{ borderLeftColor: activeService.color }"
                    >
                      {{ activeService.detail }}
                    </div>

                    <!-- Who is this for -->
                    <div class="prog-who mt-6">
                      <div class="prog-who-label">Best suited for</div>
                      <div class="prog-who-tags mt-2">
                        <span v-for="who in activeService.who" :key="who" class="prog-who-chip">{{
                          who
                        }}</span>
                      </div>
                    </div>
                  </div>
                </v-col>

                <!-- Right: inclusions + outcomes -->
                <v-col cols="12" md="7">
                  <div class="prog-right">
                    <!-- Program Inclusions -->
                    <div class="prog-section mb-6">
                      <div class="prog-section-label">
                        <v-icon size="15" class="mr-2" :color="activeService.color"
                          >mdi-check-decagram-outline</v-icon
                        >
                        Program Inclusions
                      </div>
                      <div class="prog-inclusions mt-4">
                        <div
                          v-for="item in activeService.items"
                          :key="item"
                          class="prog-inclusion-item"
                          :style="{ '--ac': activeService.color }"
                        >
                          <div
                            class="prog-inclusion-dot"
                            :style="{ background: activeService.color }"
                          />
                          <span>{{ item }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- Outcomes -->
                    <div class="prog-section mb-6">
                      <div class="prog-section-label">
                        <v-icon size="15" class="mr-2" :color="activeService.color"
                          >mdi-trending-up</v-icon
                        >
                        Expected Outcomes
                      </div>
                      <v-row class="mt-3">
                        <v-col
                          v-for="outcome in activeService.outcomes"
                          :key="outcome.label"
                          cols="6"
                        >
                          <div class="outcome-card" :style="{ '--ac': activeService.color }">
                            <div class="outcome-icon" :style="{ background: activeService.iconBg }">
                              <v-icon :icon="outcome.icon" :color="activeService.color" size="18" />
                            </div>
                            <div class="outcome-label mt-2">{{ outcome.label }}</div>
                            <div class="outcome-desc">{{ outcome.desc }}</div>
                          </div>
                        </v-col>
                      </v-row>
                    </div>

                    <!-- Duration badge -->
                    <div
                      class="prog-duration"
                      :style="{
                        background: activeService.color + '0e',
                        borderColor: activeService.color + '28',
                      }"
                    >
                      <v-icon :color="activeService.color" size="18" class="mr-2"
                        >mdi-clock-outline</v-icon
                      >
                      <span class="prog-duration-label">Duration:</span>
                      <span class="prog-duration-val" :style="{ color: activeService.color }">{{
                        activeService.duration
                      }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </transition>

          <!-- Other programs quick-nav -->
          <div class="prog-other-row mt-10">
            <div class="prog-other-label">Other programs</div>
            <div class="prog-other-cards">
              <div
                v-for="svc in otherServices"
                :key="svc.slug"
                class="prog-other-card"
                @click="selectService(svc)"
              >
                <div class="prog-other-icon" :style="{ background: svc.iconBg }">
                  <v-icon :icon="svc.icon" :color="svc.color" size="18" />
                </div>
                <div class="prog-other-info">
                  <div class="prog-other-title">{{ svc.title }}</div>
                  <div class="prog-other-sub">{{ svc.kicker }}</div>
                </div>
                <v-icon size="16" color="#94a3b8">mdi-arrow-right</v-icon>
              </div>
            </div>
          </div>
        </v-container>
      </div>

      <!-- ===== MENTORS ===== -->
      <div v-if="leaders.length" class="sec-offwhite py-sec">
        <v-container>
          <div class="text-center mb-12">
            <div class="eyebrow" style="color: #7c3aed">Our Network</div>
            <h2 class="sec-title">Meet the <em>Mentors</em></h2>
            <p class="sec-sub">Industry experts and seasoned entrepreneurs guiding your journey</p>
          </div>
          <v-row justify="center">
            <v-col v-for="leader in leaders" :key="leader.name" cols="12" sm="6" md="3">
              <v-card rounded="xl" elevation="0" class="leader-card">
                <v-img :src="leader.photo" height="300" cover class="leader-img">
                  <div class="leader-img-overlay" />
                  <div class="leader-badge-wrap">
                    <v-chip
                      size="small"
                      variant="flat"
                      class="leader-badge"
                      prepend-icon="mdi-star-four-points"
                    >
                      Mentor
                    </v-chip>
                  </div>
                </v-img>

                <v-card-text class="leader-content">
                  <div class="leader-head">
                    <v-avatar size="44" class="leader-avatar" color="blue-lighten-5">
                      <span class="leader-initials">
                        {{
                          leader.name
                            .split(' ')
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join('')
                            .toUpperCase()
                        }}
                      </span>
                    </v-avatar>

                    <div>
                      <div class="leader-name">{{ leader.name }}</div>
                      <div class="leader-role">{{ leader.role }}</div>
                    </div>
                  </div>

                  <v-divider class="my-4" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- ===== SUCCESS STORIES ===== -->
      <div class="stories-section py-sec">
        <v-container>
          <div class="text-center mb-6">
            <div class="eyebrow">Graduates</div>
            <h2 class="sec-title">Success <em>Stories</em></h2>
            <p class="sec-sub">
              Every startup tells a story of resilience and breakthrough milestones
            </p>
          </div>

          <div class="d-flex justify-center flex-wrap ga-2 mb-10">
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

          <v-row>
            <v-col v-for="story in filteredStories" :key="story.name" cols="12" sm="6" lg="4">
              <div class="story-card-new" @click="openStory(story)">
                <div class="scn-image-zone">
                  <img :src="story.coverImg" :alt="story.name" class="scn-cover-img" />
                  <div
                    class="scn-status-badge"
                    :style="{ background: story.statusBg, color: story.statusText }"
                  >
                    <span class="scn-status-dot" :style="{ background: story.statusText }" />
                    {{ story.status }}
                  </div>
                  <div class="scn-logo-overlay">
                    <div class="scn-logo-ring" :style="{ background: story.logoBg }">
                      <span class="scn-logo-initials">{{ story.initials }}</span>
                    </div>
                  </div>
                </div>
                <div class="scn-body">
                  <div class="scn-name-row">
                    <h3 class="scn-name">{{ story.name }}</h3>
                    <span class="scn-industry-chip">{{ story.industryShort }}</span>
                  </div>
                  <p class="scn-desc mt-2 mb-4">{{ story.desc }}</p>
                  <div class="scn-meta-row">
                    <div class="scn-meta-item">
                      <v-icon size="13" color="#1565c0" class="mr-1">mdi-calendar-outline</v-icon>
                      <span class="scn-meta-label">Founded</span>
                      <span class="scn-meta-val">{{ story.year }}</span>
                    </div>
                    <div class="scn-meta-item">
                      <v-icon size="13" color="#16a34a" class="mr-1">mdi-cash-multiple</v-icon>
                      <span class="scn-meta-label">Raised</span>
                      <span class="scn-meta-val">{{ story.funding }}</span>
                    </div>
                    <div class="scn-meta-item">
                      <v-icon size="13" color="#7c3aed" class="mr-1"
                        >mdi-account-group-outline</v-icon
                      >
                      <span class="scn-meta-label">Team</span>
                      <span class="scn-meta-val">{{ story.team }}</span>
                    </div>
                  </div>
                  <div class="scn-footer mt-4">
                    <span class="scn-read-more">
                      Read story <v-icon size="14" class="ml-1">mdi-arrow-right</v-icon>
                    </span>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>

          <div class="text-right mt-8">
            <button class="btn-outlined">
              More Stories <v-icon size="15" class="ml-1">mdi-arrow-right</v-icon>
            </button>
          </div>
        </v-container>
      </div>

      <!-- Story detail dialog -->
      <v-dialog v-model="storyDialog" max-width="620" transition="dialog-bottom-transition">
        <v-card v-if="activeStory" rounded="xl" class="overflow-hidden pa-0">
          <div class="story-dialog-hero">
            <img
              :src="activeStory.coverImg"
              :alt="activeStory.name"
              class="story-dialog-hero-img"
            />
            <div class="story-dialog-hero-veil" />
            <div class="story-dialog-identity">
              <div class="story-dialog-logo-ring" :style="{ background: activeStory.logoBg }">
                <span class="story-dialog-initials">{{ activeStory.initials }}</span>
              </div>
              <div>
                <div class="story-dialog-name">{{ activeStory.name }}</div>
                <span
                  class="story-dialog-status"
                  :style="{ background: activeStory.statusBg, color: activeStory.statusText }"
                  >{{ activeStory.status }}</span
                >
              </div>
            </div>
            <v-btn
              icon
              size="small"
              variant="flat"
              class="story-dialog-close"
              @click="storyDialog = false"
            >
              <v-icon size="18">mdi-close</v-icon>
            </v-btn>
          </div>
          <div class="pa-7">
            <div class="d-flex flex-wrap gap-2 mb-5">
              <v-chip size="small" color="primary" variant="tonal" prepend-icon="mdi-tag-outline">{{
                activeStory.industry
              }}</v-chip>
              <v-chip
                size="small"
                color="success"
                variant="tonal"
                prepend-icon="mdi-calendar-outline"
                >Founded {{ activeStory.year }}</v-chip
              >
              <v-chip
                size="small"
                color="purple"
                variant="tonal"
                prepend-icon="mdi-account-group-outline"
                >{{ activeStory.team }} team members</v-chip
              >
            </div>
            <p class="story-dialog-body mb-6">{{ activeStory.fullDesc }}</p>
            <v-divider class="mb-5" />
            <v-row>
              <v-col cols="4" class="text-center">
                <div class="story-stat-val" style="color: #1565c0">{{ activeStory.funding }}</div>
                <div class="story-stat-label">Funding Raised</div>
              </v-col>
              <v-col cols="4" class="text-center">
                <div class="story-stat-val" style="color: #16a34a">{{ activeStory.team }}</div>
                <div class="story-stat-label">Team Size</div>
              </v-col>
              <v-col cols="4" class="text-center">
                <div class="story-stat-val" style="color: #7c3aed">{{ activeStory.year }}</div>
                <div class="story-stat-label">Year Founded</div>
              </v-col>
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
            <button class="btn-cta-ghost">
              <v-icon size="17" class="mr-2">mdi-calendar-check-outline</v-icon>Schedule a Tour
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
            <v-stepper-item value="3" title="Review" :color="applyStep >= 3 ? 'primary' : ''" />
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
                <v-icon icon="mdi-information-outline" size="56" color="primary" class="mb-4" />
                <h3 class="text-h6 font-weight-bold mb-2">Application is reviewed offline</h3>
                <p class="text-body-2 text-medium-emphasis">
                  This website does not accept online submissions. Please contact Navigatú TBI for
                  application instructions.
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
            color="primary"
            rounded="lg"
            prepend-icon="mdi-close"
            @click="closeApplyDialog"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/utils/supabase'

// ── Scroll ──
const scrolled = ref(false)
const onScroll = () => {
  scrolled.value = window.scrollY > 20
}
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const drawer = ref(false)
const searchQuery = ref('')
const router = useRouter()
const route = useRoute()

function runNavbarSearch() {
  const query = searchQuery.value.trim()
  if (!query) return
  router.push({ path: '/news-navigatu', query: { q: query } })
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// ── Hero particles ──
const heroDots = ref(null)

onMounted(() => {
  // spawn floating particles
  if (heroDots.value) {
    for (let i = 0; i < 22; i++) {
      const d = document.createElement('div')
      d.className = 'hero-dot'
      const sz = Math.random() * 3 + 2
      const color = Math.random() > 0.5 ? '96,165,250' : '34,197,94'
      d.style.cssText = `
        width:${sz}px;height:${sz}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        background:rgba(${color},.4);
        animation-duration:${Math.random() * 8 + 6}s;
        animation-delay:${Math.random() * 6}s`
      heroDots.value.appendChild(d)
    }
  }
})

// ── Industry Focus ──
const animatedCards = ref(false)
onMounted(() =>
  setTimeout(() => {
    animatedCards.value = true
  }, 300),
)

const selectedTech = ref(null)
const techCategories = ref([
  {
    title: 'ICT & Software',
    desc: 'Mobile apps, web platforms, enterprise solutions.',
    icon: 'mdi-monitor-cellphone',
    color: '#1565C0',
    iconBg: '#dbeafe',
    detail: 'Build scalable apps with support from seasoned engineers and product managers.',
    tags: ['Web Apps', 'Mobile', 'Enterprise'],
  },
  {
    title: 'Artificial Intelligence',
    desc: 'Machine learning, computer vision, NLP.',
    icon: 'mdi-brain',
    color: '#d97706',
    iconBg: '#fef3c7',
    detail: 'Develop AI products with compute resources, AI mentors, and open datasets.',
    tags: ['ML', 'Computer Vision', 'NLP'],
  },
  {
    title: 'Internet of Things',
    desc: 'Smart devices, sensors, connected systems.',
    icon: 'mdi-access-point-network',
    color: '#059669',
    iconBg: '#d1fae5',
    detail: 'Prototype IoT solutions with hardware lab access and industry partnerships.',
    tags: ['Embedded', 'Sensors', 'Connectivity'],
  },
  {
    title: 'Engineering Tech',
    desc: 'Digital tools for engineering and manufacturing.',
    icon: 'mdi-cog-outline',
    color: '#7c3aed',
    iconBg: '#ede9fe',
    detail: 'From CAD to digital twins — build next-gen engineering software.',
    tags: ['CAD', 'Digital Twins', 'Manufacturing'],
  },
])

// ── Who Can Apply ──
const activeApplyTab = ref('all')
const expandedCard = ref(null)

const applyCards = ref([
  {
    id: 'students',
    title: 'Students',
    icon: 'mdi-school',
    iconBg: '#E6F1FB',
    iconColor: '#185FA5',
    desc: 'Undergraduate and graduate students with innovative ideas ready to build real-world startups from any discipline.',
    tags: ['Undergraduate', 'Graduate', 'All Disciplines'],
    requirements: [
      'Enrolled in a Philippine university',
      'Tech-focused project or idea',
      'Letter of endorsement from adviser',
      'Commitment to 6-month program',
    ],
    perks: [
      { icon: 'mdi-brain', text: 'Mentorship from founders' },
      { icon: 'mdi-laptop', text: 'Software & tools access' },
      { icon: 'mdi-book-open-outline', text: 'Startup workshops' },
      { icon: 'mdi-earth', text: 'Community network' },
    ],
  },
  {
    id: 'faculty',
    title: 'Faculty & Researchers',
    icon: 'mdi-flask-outline',
    iconBg: '#EAF3DE',
    iconColor: '#3B6D11',
    desc: 'Professors and researchers commercializing research innovations to bridge academia and industry.',
    tags: ['R&D Commercialization', 'Academia', 'IP Support'],
    requirements: [
      'Faculty or researcher at an HEI',
      'Published or patentable research',
      'Tech transfer readiness',
      'Institutional endorsement',
    ],
    perks: [
      { icon: 'mdi-scale-balance', text: 'IP & legal support' },
      { icon: 'mdi-handshake-outline', text: 'Investor introductions' },
      { icon: 'mdi-bank-outline', text: 'Commercialization strategy' },
      { icon: 'mdi-chart-bar', text: 'Market validation' },
    ],
  },
  {
    id: 'startups',
    title: 'Early-Stage Startups',
    icon: 'mdi-rocket-launch-outline',
    iconBg: '#FAECE7',
    iconColor: '#993C1D',
    desc: 'Pre-seed and seed-stage startups needing structured support to validate, grow, and achieve product-market fit.',
    tags: ['Pre-Seed', 'Seed Stage', 'MVP Ready'],
    requirements: [
      'Registered business entity or in process',
      'Working MVP or prototype',
      'Founding team of 2+',
      'Tech-driven product',
    ],
    perks: [
      { icon: 'mdi-currency-php', text: 'Funding access' },
      { icon: 'mdi-domain', text: '24/7 coworking space' },
      { icon: 'mdi-account-group-outline', text: 'Co-founder network' },
      { icon: 'mdi-file-document-outline', text: 'Legal & compliance' },
    ],
  },
  {
    id: 'techpreneurs',
    title: 'Tech Entrepreneurs',
    icon: 'mdi-lightning-bolt',
    iconBg: '#EEEDFE',
    iconColor: '#534AB7',
    desc: 'Experienced entrepreneurs scaling technology-driven solutions for real, validated market problems.',
    tags: ['Tech-Driven', 'Growth Stage', 'Market Ready'],
    requirements: [
      'Prior entrepreneurial experience',
      'Revenue-generating or investment-ready',
      'Scalable tech solution',
      'Full-time commitment to venture',
    ],
    perks: [
      { icon: 'mdi-trending-up', text: 'Growth mentorship' },
      { icon: 'mdi-factory', text: 'Corporate partnerships' },
      { icon: 'mdi-earth', text: 'Expansion support' },
      { icon: 'mdi-target', text: 'GTM coaching' },
    ],
  },
])

const filteredApplyCards = computed(() =>
  activeApplyTab.value === 'all'
    ? applyCards.value
    : applyCards.value.filter((c) => c.id === activeApplyTab.value),
)

// ── Journey ──
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

// ── Services ──
const activeSvc = ref('business-ideation')

const navServices = ref([
  {
    slug: 'business-ideation',
    title: 'Business Ideation',
    kicker: 'From idea to opportunity',
    summary:
      'Shape your concept with structured incubation, expert mentoring, and practical venture-building support from day one.',
    icon: 'mdi-lightbulb-on-outline',
    iconBg: '#dbeafe',
    color: '#1565C0',
    tags: ['Incubation', 'Mentorship', 'Networking'],
    duration: '6 months (core program)',
    detail:
      'Ideal for founders building from zero to a validated concept, with curated guidance at each milestone. Our structured approach ensures you test assumptions early and build confidently.',
    who: ['Students', 'Early founders', 'Idea-stage teams'],
    items: [
      'Business incubation and startup development',
      'Mentorship and guidance from entrepreneurs and industry experts',
      'Assistance in accessing funding opportunities and investor networks',
      'Workspace and infrastructure support',
      'Networking events and collaboration opportunities',
      'Business development workshops and training programs',
    ],
    outcomes: [
      {
        icon: 'mdi-lightbulb-outline',
        label: 'Validated Concept',
        desc: 'A market-tested idea with real user feedback',
      },
      {
        icon: 'mdi-account-multiple-outline',
        label: 'Strong Network',
        desc: 'Access to mentor and investor connections',
      },
      {
        icon: 'mdi-file-chart-outline',
        label: 'Business Plan',
        desc: 'A solid, investor-ready business plan',
      },
      {
        icon: 'mdi-cash-multiple',
        label: 'Funding Pathway',
        desc: 'Clear roadmap to your first funding round',
      },
    ],
  },
  {
    slug: 'startup-support',
    title: 'Startup Support',
    kicker: 'Build with confidence',
    summary:
      'Move from early traction to market readiness with commercial, legal, and product support systems built for growth.',
    icon: 'mdi-rocket-launch-outline',
    iconBg: '#d1fae5',
    color: '#059669',
    tags: ['Validation', 'Commercialization', 'Go-to-Market'],
    duration: 'Ongoing (cohort-based)',
    detail:
      'Designed for teams ready to de-risk execution, sharpen product-market fit, and scale efficiently. Access legal, IP, and commercialization resources under one roof.',
    who: ['MVP-stage startups', 'Seed-funded teams', 'Commercializing researchers'],
    items: [
      'Business planning assistance',
      'Market research and validation support',
      'Legal and intellectual property guidance',
      'Prototype development and testing facilities',
      'Assistance with product commercialization and go-to-market strategies',
      'Access to local, regional, national, and international competitions',
    ],
    outcomes: [
      {
        icon: 'mdi-target',
        label: 'Market Fit',
        desc: 'Validated product-market fit with paying users',
      },
      {
        icon: 'mdi-shield-check-outline',
        label: 'IP Protection',
        desc: 'Patents or trademarks filed and protected',
      },
      {
        icon: 'mdi-chart-line',
        label: 'Revenue Growth',
        desc: 'Clear revenue model and early traction',
      },
      {
        icon: 'mdi-trophy-outline',
        label: 'Competition Ready',
        desc: 'Prepared for regional and national competitions',
      },
    ],
  },
  {
    slug: 'training-program',
    title: 'Training Program',
    kicker: 'Develop entrepreneurial capability',
    summary:
      'Strengthen startup and academic innovation pipelines through focused entrepreneurship learning tracks and curriculum.',
    icon: 'mdi-school-outline',
    iconBg: '#ffedd5',
    color: '#ea580c',
    tags: ['Education', 'Curriculum', 'R&D Commercialization'],
    duration: 'Flexible (modular format)',
    detail:
      'Tailored for students, faculty, and startup teams that need both entrepreneurial mindset and execution skills. Modules can be taken independently or as a full certification track.',
    who: ['Faculty & researchers', 'Students', 'Corporate teams'],
    items: [
      'Entrepreneurship education training',
      'Entrepreneurship curriculum development',
      'Assistance in commercializing R&D outputs produced by university faculty and researchers',
    ],
    outcomes: [
      {
        icon: 'mdi-certificate-outline',
        label: 'Certification',
        desc: 'Recognized entrepreneurship training certificate',
      },
      {
        icon: 'mdi-flask-outline',
        label: 'R&D Pipeline',
        desc: 'Accelerated research-to-market pathway',
      },
      {
        icon: 'mdi-book-open-outline',
        label: 'Curriculum',
        desc: 'Institutional entrepreneurship curriculum',
      },
      {
        icon: 'mdi-account-star-outline',
        label: 'Skilled Founders',
        desc: 'Execution-ready entrepreneurial teams',
      },
    ],
  },
])

const activeService = computed(
  () => navServices.value.find((s) => s.slug === activeSvc.value) || null,
)
const otherServices = computed(() => navServices.value.filter((s) => s.slug !== activeSvc.value))

function selectService(service) {
  activeSvc.value = service.slug
  router.replace({
    path: '/services-navigatu',
    hash: '#services-grid',
    query: { ...route.query, service: service.slug },
  })
}

watch(
  () => route.query.service,
  (serviceQuery) => {
    if (typeof serviceQuery !== 'string') return
    const matched = navServices.value.find((s) => s.slug === serviceQuery)
    if (matched) activeSvc.value = matched.slug
  },
  { immediate: true },
)

// ── Mentors (Supabase unchanged) ──
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

// ── Success Stories ──
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
    industryShort: 'AI',
    funding: '₱4.2M',
    year: '2025',
    team: '8',
    desc: 'A context-aware AI translation platform delivering precise results for law, medicine, and marketing.',
    fullDesc:
      'Ascribo.AI solves the critical problem of inaccurate language translation in high-stakes fields. Their proprietary context engine reduces translation errors by over 90%.',
    coverImg: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=600&q=80',
  },
  {
    name: 'BizNest',
    initials: 'BN',
    logoBg: '#15803d',
    status: 'Scaling',
    statusBg: '#dbeafe',
    statusText: '#1d4ed8',
    industry: 'Business Software',
    industryShort: 'SaaS',
    funding: '₱4.2M',
    year: '2025',
    team: '12',
    desc: 'A smart business management platform for MSMEs integrating POS, inventory, finance, and CRM.',
    fullDesc:
      'BizNest helps over 500 small businesses reduce operational overhead by 40% through a unified digital workspace.',
    coverImg: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&q=80',
  },
  {
    name: 'MediLink PH',
    initials: 'ML',
    logoBg: '#7c3aed',
    status: 'MVP',
    statusBg: '#fef9c3',
    statusText: '#a16207',
    industry: 'HealthTech',
    industryShort: 'Health',
    funding: '₱1.8M',
    year: '2024',
    team: '5',
    desc: 'A telemedicine platform connecting rural Caraga communities with licensed physicians nationwide.',
    fullDesc:
      'MediLink PH enables real-time teleconsultations, digital prescriptions, and secure medical records for underserved areas.',
    coverImg: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
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

// ── Apply dialog ──
const applyDialog = ref(false)
const applyStep = ref(1)
const applyForm = ref({ name: '', email: '', type: '', venture: '', category: '', pitch: '' })
function closeApplyDialog() {
  applyDialog.value = false
  applyStep.value = 1
}

// ── Footer ──
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

/* ── BUTTONS ── */
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
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(21, 101, 192, 0.5);
}
.btn-line {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: #1565c0;
  font-family: 'Sora', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  border: 1.5px solid rgba(21, 101, 192, 0.4);
  border-radius: 50px;
  padding: 12px 26px;
  cursor: pointer;
  transition: all 0.22s;
}
.btn-line:hover {
  background: rgba(21, 101, 192, 0.06);
  border-color: #1565c0;
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

/* ══════════════════════════════════
   HERO — Dark cinematic redesign
   ══════════════════════════════════ */
.svc-hero {
  background: #06080f;
  position: relative;
  overflow: hidden;
  min-height: 680px;
  display: flex;
  align-items: center;
  padding-top: 64px; /* navbar height offset */
}

/* Background photo */
.svc-hero-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.18;
  filter: saturate(0.4);
  pointer-events: none;
}

/* Dark cinematic veil */
.svc-hero-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    #06080f 38%,
    rgba(6, 8, 15, 0.72) 68%,
    rgba(21, 101, 192, 0.16) 100%
  );
  pointer-events: none;
}
.svc-hero-veil2 {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, #06080f 100%);
  pointer-events: none;
}

/* Subtle grid */
.svc-hero-grid-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(37, 99, 235, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.055) 1px, transparent 1px);
  background-size: 48px 48px;
}

/* Floating dots container */
.svc-hero-dots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

/* Individual dot */
.hero-dot {
  position: absolute;
  border-radius: 50%;
  animation: heroDotFloat linear infinite;
}
@keyframes heroDotFloat {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.55;
  }
  50% {
    opacity: 0.18;
  }
  100% {
    transform: translateY(-130px) scale(0.5);
    opacity: 0;
  }
}

/* Inner layout */
.svc-hero-inner {
  position: relative;
  z-index: 2;
  padding-top: 56px;
  padding-bottom: 72px;
}
.hero-left-col {
  padding-top: 16px;
}

/* Location pill */
.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(37, 99, 235, 0.14);
  border: 1px solid rgba(37, 99, 235, 0.32);
  border-radius: 50px;
  padding: 6px 16px;
  font-size: 0.68rem;
  font-weight: 700;
  color: #93c5fd;
  letter-spacing: 0.5px;
}

/* Animated pulse dot */
.hero-pulse {
  display: block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
  animation: heroPulse 2s ease-in-out infinite;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
}
@keyframes heroPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

/* Title */
.svc-hero-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
}
.svc-hero-title em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #60a5fa;
}

/* Body */
.svc-hero-body {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.88;
  max-width: 480px;
}

/* Buttons */
.btn-hero-solid {
  display: inline-flex;
  align-items: center;
  background: #1565c0;
  color: #fff;
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  padding: 13px 28px;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(21, 101, 192, 0.42);
  transition: all 0.22s;
}
.btn-hero-solid:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(21, 101, 192, 0.55);
}
.btn-hero-ghost {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.78);
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  padding: 12px 26px;
  cursor: pointer;
  transition: all 0.22s;
}
.btn-hero-ghost:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Trust row */
.hero-trust-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.hero-trust-label {
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.28);
}
.hero-trust-divider {
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
}
.hero-trust-badge {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 5px 12px;
  font-size: 0.65rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.42);
}

/* ── Photo collage ── */
.hero-photo-stack {
  position: relative;
  width: 420px;
  height: 480px;
  flex-shrink: 0;
}

/* Spinning decorative ring */
.hero-accent-ring {
  position: absolute;
  top: -28px;
  right: -28px;
  width: 110px;
  height: 110px;
  border: 2px solid rgba(37, 99, 235, 0.22);
  border-radius: 50%;
  animation: heroSpinRing 14s linear infinite;
}
.hero-accent-ring::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(37, 99, 235, 0.12);
  border-radius: 50%;
}
@keyframes heroSpinRing {
  to {
    transform: rotate(360deg);
  }
}

/* Main photo */
.hero-photo-main {
  position: absolute;
  top: 0;
  left: 0;
  right: 64px;
  height: 320px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.55);
}
.hero-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.hero-photo-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(6, 8, 15, 0.68) 100%);
}

/* Badge on main photo */
.hero-photo-badge {
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 14px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.hero-badge-title {
  font-size: 0.72rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}
.hero-badge-sub {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.48);
  margin-top: 1px;
}

/* Floating stat card */
.hero-stat-float {
  position: absolute;
  top: 192px;
  right: 52px;
  background: rgba(6, 8, 15, 0.84);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 16px 20px;
  text-align: center;
  z-index: 3;
  animation: heroFloatCard 4s ease-in-out infinite;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
}
@keyframes heroFloatCard {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
.hero-stat-num {
  font-family: 'Sora', sans-serif;
  font-size: 1.65rem;
  font-weight: 700;
  color: #60a5fa;
  line-height: 1;
}
.hero-stat-lbl {
  font-size: 0.58rem;
  color: rgba(255, 255, 255, 0.38);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-top: 4px;
}

/* Secondary photo */
.hero-photo-b {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 210px;
  height: 228px;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5);
}

@media (max-width: 959px) {
  .svc-hero {
    min-height: 560px;
  }
  .svc-hero-title {
    font-size: 2rem;
  }
}
@media (max-width: 599px) {
  .svc-hero-inner {
    padding-top: 40px;
    padding-bottom: 56px;
  }
  .hero-btns {
    flex-direction: column;
  }
  .btn-hero-solid,
  .btn-hero-ghost {
    justify-content: center;
  }
}

/* ── INDUSTRY FOCUS ── */
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
  margin-bottom: 10px;
}
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.tech-tag {
  font-size: 0.62rem;
  font-weight: 600;
  border-radius: 50px;
  padding: 3px 10px;
}

/* ── WHO CAN APPLY ── */
.wca-card {
  border: 1.5px solid #e5eaf5;
  border-radius: 18px;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  transition:
    border-color 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}
.wca-card:hover {
  border-color: #c4d5f7;
  transform: translateY(0px);
  box-shadow: 0 8px 28px rgba(21, 101, 192, 0.08);
}
.wca-card--open {
  border-color: #1565c0;
  box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.08);
}
.wca-card-top {
  padding: 22px 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.wca-header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.wca-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.wca-title-group {
  flex: 1;
}
.wca-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
}
.wca-short {
  font-size: 0.72rem;
  color: #94a3b8;
  margin-top: 2px;
}
.wca-toggle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: #f8faff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  flex-shrink: 0;
  transition: all 0.25s;
}
.wca-toggle--open {
  background: #dbeafe;
  border-color: #bfdbfe;
  color: #1565c0;
  transform: rotate(180deg);
}
.wca-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.7;
}
.wca-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.wca-chip {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 50px;
  border: 1px solid #e5eaf5;
  color: #64748b;
  background: #f8faff;
}
.wca-divider {
  height: 1px;
  background: #f1f5f9;
  margin: 0 22px;
}
.wca-expanded-inner {
  padding: 18px 22px 22px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.wca-section-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 10px;
}
.wca-req-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.wca-req-item {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  font-size: 0.8rem;
  color: #475569;
  line-height: 1.55;
}
.wca-check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}
.wca-perks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.wca-perk {
  background: #f8faff;
  border: 1px solid #e5eaf5;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.wca-perk-text {
  font-size: 0.75rem;
  color: #475569;
  line-height: 1.4;
}
.wca-expand-enter-active,
.wca-expand-leave-active {
  transition:
    opacity 0.25s,
    transform 0.25s;
}
.wca-expand-enter-from,
.wca-expand-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ── JOURNEY ── */
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

/* ── SERVICES / PROGRAMS — New Design ── */
.prog-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
.prog-tab {
  display: inline-flex;
  align-items: center;
  padding: 10px 22px;
  border-radius: 50px;
  border: 1.5px solid #e5eaf5;
  background: #fff;
  color: #64748b;
  font-family: 'Sora', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.prog-tab:hover {
  border-color: #c4d5f7;
  color: #1565c0;
}
.prog-tab--active {
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.prog-panel {
  background: #fff;
  border: 1.5px solid #e5eaf5;
  border-radius: 24px;
  padding: 32px;
}

.prog-overview {
  height: 100%;
  border-top: 4px solid #1565c0;
  border-radius: 16px;
  background: #f8faff;
  padding: 28px;
  display: flex;
  flex-direction: column;
}
.prog-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
.prog-icon-ring {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.prog-kicker {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.prog-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.25;
}
.prog-summary {
  font-size: 0.84rem;
  color: #475569;
  line-height: 1.8;
}
.prog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.prog-tag {
  font-size: 0.68rem;
  font-weight: 600;
  border-radius: 50px;
  padding: 4px 12px;
  border: 1px solid;
}
.prog-detail-blurb {
  font-size: 0.78rem;
  color: #475569;
  line-height: 1.75;
  border-left: 3px solid;
  padding-left: 14px;
  border-radius: 0;
}
.prog-who {
  margin-top: auto;
}
.prog-who-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
}
.prog-who-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.prog-who-chip {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  padding: 4px 12px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #475569;
}

.prog-right {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.prog-section-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #334155;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 10px;
}

.prog-inclusions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.prog-inclusion-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.8rem;
  color: #475569;
  line-height: 1.6;
}
.prog-inclusion-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}

.outcome-card {
  background: #f8faff;
  border: 1.5px solid #e5eaf5;
  border-radius: 14px;
  padding: 14px;
  transition: border-color 0.2s;
}
.outcome-card:hover {
  border-color: var(--ac, #1565c0);
}
.outcome-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.outcome-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
}
.outcome-desc {
  font-size: 0.7rem;
  color: #64748b;
  line-height: 1.5;
  margin-top: 3px;
}

.prog-duration {
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 12px 16px;
  border: 1px solid;
  margin-top: auto;
}
.prog-duration-label {
  font-size: 0.75rem;
  color: #64748b;
  margin-right: 6px;
}
.prog-duration-val {
  font-size: 0.8rem;
  font-weight: 700;
}

.prog-other-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  border-top: 1px solid #f1f5f9;
  padding-top: 20px;
}
.prog-other-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
  white-space: nowrap;
}
.prog-other-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
}
.prog-other-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8faff;
  border: 1.5px solid #e5eaf5;
  border-radius: 14px;
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.18s;
  flex: 1;
  min-width: 200px;
}
.prog-other-card:hover {
  border-color: #c4d5f7;
  background: #fff;
  transform: translateY(-1px);
}
.prog-other-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.prog-other-info {
  flex: 1;
}
.prog-other-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #0f172a;
}
.prog-other-sub {
  font-size: 0.68rem;
  color: #94a3b8;
  margin-top: 1px;
}

/* Program switch transition */
.prog-switch-enter-active,
.prog-switch-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.prog-switch-enter-from,
.prog-switch-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* ── MENTORS ── */
.leader-card {
  position: relative;
  overflow: hidden;
  border: 1px solid #e6edf8;
  background: linear-gradient(180deg, #ffffff 0%, #f9fbff 100%);
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    border-color 0.24s ease;
}
.leader-card:hover {
  transform: translateY(-8px);
  border-color: #cfe0fb;
  box-shadow: 0 22px 44px rgba(15, 23, 42, 0.14);
}
.leader-img {
  position: relative;
  overflow: hidden;
}
.leader-card:hover .leader-img {
  transform: scale(1.02);
  transition: transform 0.35s ease;
}
.leader-img-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.05) 30%, rgba(15, 23, 42, 0.42) 100%),
    radial-gradient(circle at 78% 12%, rgba(37, 99, 235, 0.3), transparent 45%);
}
.leader-badge-wrap {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
}
.leader-badge {
  background: rgba(255, 255, 255, 0.9) !important;
  color: #0f172a !important;
  font-size: 0.68rem !important;
  font-weight: 700 !important;
  backdrop-filter: blur(8px);
}
.leader-content {
  padding: 18px 18px 20px !important;
}
.leader-head {
  display: flex;
  gap: 12px;
  align-items: center;
}
.leader-avatar {
  border: 1px solid #dbeafe;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.65);
}
.leader-initials {
  font-size: 0.8rem;
  font-weight: 700;
  color: #1d4ed8;
}
.leader-name {
  font-size: 0.92rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.25;
}
.leader-role {
  margin-top: 2px;
  font-size: 0.77rem;
  color: #64748b;
  line-height: 1.35;
}

@media (max-width: 600px) {
  .leader-content {
    padding: 16px !important;
  }
}

/* ── SUCCESS STORIES ── */
.stories-section {
  background: #fff;
}
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
.story-card-new {
  background: #fff;
  border: 1.5px solid #e5eaf5;
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.25s,
    box-shadow 0.25s,
    border-color 0.25s;
}
.story-card-new:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 52px rgba(21, 101, 192, 0.13);
  border-color: #bcd0f7;
}
.scn-image-zone {
  position: relative;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}
.scn-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.story-card-new:hover .scn-cover-img {
  transform: scale(1.04);
}
.scn-image-zone::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.55) 100%);
}
.scn-status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  border-radius: 50px;
  padding: 4px 12px;
  font-size: 0.65rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.scn-status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}
.scn-logo-overlay {
  position: absolute;
  bottom: -22px;
  left: 20px;
  z-index: 3;
}
.scn-logo-ring {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  border: 3px solid #fff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.scn-logo-initials {
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}
.scn-body {
  flex: 1;
  padding: 30px 20px 20px;
  display: flex;
  flex-direction: column;
}
.scn-name-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}
.scn-name {
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.25;
}
.scn-industry-chip {
  background: #f0f4ff;
  color: #1565c0;
  font-size: 0.62rem;
  font-weight: 700;
  border-radius: 50px;
  padding: 3px 10px;
  white-space: nowrap;
  flex-shrink: 0;
  border: 1px solid #dbeafe;
  margin-top: 2px;
}
.scn-desc {
  font-size: 0.78rem;
  color: #64748b;
  line-height: 1.75;
  flex: 1;
}
.scn-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border-top: 1px solid #f1f5f9;
  padding-top: 12px;
}
.scn-meta-item {
  display: flex;
  align-items: center;
  font-size: 0.72rem;
  color: #94a3b8;
  gap: 2px;
}
.scn-meta-label {
  margin-right: 2px;
}
.scn-meta-val {
  font-weight: 700;
  color: #1e293b;
}
.scn-footer {
  border-top: 1px solid #f1f5f9;
  padding-top: 12px;
}
.scn-read-more {
  font-size: 0.76rem;
  font-weight: 600;
  color: #1565c0;
  display: inline-flex;
  align-items: center;
  transition: gap 0.18s;
}
.story-card-new:hover .scn-read-more {
  gap: 4px;
}

/* ── STORY DIALOG ── */
.story-dialog-hero {
  position: relative;
  height: 200px;
  overflow: hidden;
}
.story-dialog-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.story-dialog-hero-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.65) 100%);
}
.story-dialog-identity {
  position: absolute;
  bottom: 18px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2;
}
.story-dialog-logo-ring {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  border: 2.5px solid rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
}
.story-dialog-initials {
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}
.story-dialog-name {
  font-family: 'Sora', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}
.story-dialog-status {
  display: inline-block;
  font-size: 0.62rem;
  font-weight: 700;
  border-radius: 50px;
  padding: 3px 10px;
  margin-top: 4px;
}
.story-dialog-close {
  position: absolute !important;
  top: 12px !important;
  right: 12px !important;
  z-index: 3 !important;
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(8px) !important;
}
.story-dialog-body {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.85;
}
.story-stat-val {
  font-family: 'Sora', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
}
.story-stat-label {
  font-size: 0.7rem;
  color: #94a3b8;
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

@media (max-width: 599px) {
  .scn-image-zone {
    height: 160px;
  }
  .hss-item {
    min-width: 80px;
  }
  .prog-panel {
    padding: 20px 16px;
  }
  .wca-perks {
    grid-template-columns: 1fr;
  }
}
</style>
