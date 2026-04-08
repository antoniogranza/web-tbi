<template>
  <v-app>
    <!-- ===================== NAVIGATION BAR ===================== -->
    <v-app-bar
      flat
      color="white"
      border="b"
      height="64"
      :elevation="scrolled ? 2 : 0"
      style="transition: box-shadow 0.3s"
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
        <div class="d-none d-md-flex align-center mr-6 gap-1">
          <v-btn variant="text" class="nav-link" to="/about-navigatu">About</v-btn>
          <v-btn variant="text" class="nav-link" to="/services-navigatu">Services</v-btn>
          <v-btn variant="text" class="nav-link" to="/coworking-navigatu">Coworking</v-btn>
          <v-btn variant="text" class="nav-link nav-link--active" to="/news-navigatu">News</v-btn>
          <v-btn variant="text" class="nav-link" to="/events-navigatu">Events</v-btn>
          <v-btn variant="text" icon size="small" @click="searchDialog = true">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
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
          <v-btn
            block
            color="primary"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-rocket-launch-outline"
          >
            Apply Now
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- ===================== SEARCH DIALOG ===================== -->
    <v-dialog v-model="searchDialog" max-width="560" transition="dialog-top-transition">
      <v-card rounded="xl" class="pa-2">
        <v-text-field
          v-model="searchQuery"
          autofocus
          placeholder="Search programs, events, startups…"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          rounded="lg"
          hide-details
          class="search-field"
          @keyup.esc="searchDialog = false"
        />
        <div v-if="!searchQuery" class="pa-4 pb-2">
          <p class="text-caption text-medium-emphasis mb-3 font-weight-medium">Quick Links</p>
          <div class="d-flex flex-wrap gap-2">
            <v-chip
              v-for="tag in searchTags"
              :key="tag"
              size="small"
              label
              variant="tonal"
              color="primary"
              class="cursor-pointer"
              @click="searchQuery = tag"
              >{{ tag }}</v-chip
            >
          </div>
        </div>
        <div v-else class="pa-3 pt-1">
          <v-list density="compact">
            <v-list-item
              v-for="r in filteredResults"
              :key="r"
              :title="r"
              prepend-icon="mdi-arrow-top-right"
              rounded="lg"
            />
            <v-list-item
              v-if="filteredResults.length === 0"
              title="No results found"
              prepend-icon="mdi-magnify-remove-outline"
            />
          </v-list>
        </div>
      </v-card>
    </v-dialog>

    <!-- ===================== MAIN CONTENT ===================== -->
    <v-main>
      <!-- ===== HERO ===== -->
      <v-container fluid class="hero-section pa-0">
        <div class="hero-bg-pattern" />
        <v-container class="py-16 position-relative">
          <v-row justify="center">
            <v-col cols="12" md="9" lg="7" class="text-center">
              <v-chip
                color="primary"
                variant="tonal"
                size="small"
                class="mb-5 font-weight-semibold"
                prepend-icon="mdi-map-marker-outline"
              >
                Butuan City, Caraga Region
              </v-chip>
              <h1 class="hero-title">
                <span class="hero-italic">Your Hub</span> for Innovation<br
                  class="d-none d-sm-block"
                />
                and Technopreneurship
              </h1>
              <p class="hero-body mt-4 mb-8 mx-auto">
                Navigatú TBI empowers the next generation of Filipino tech founders through
                mentorship, funding pathways, and a thriving startup community.
              </p>
              <div class="d-flex justify-center flex-wrap gap-3">
                <v-btn
                  color="primary"
                  rounded="lg"
                  size="large"
                  class="hero-btn"
                  prepend-icon="mdi-rocket-launch-outline"
                  elevation="0"
                  @click="applyDialog = true"
                >
                  Apply Now
                </v-btn>
                <v-btn
                  variant="outlined"
                  color="primary"
                  rounded="lg"
                  size="large"
                  class="hero-btn"
                  prepend-icon="mdi-play-circle-outline"
                  @click="learnMoreScroll"
                >
                  Learn More
                </v-btn>
              </div>

              <!-- Stats row -->
              <v-row justify="center" class="mt-12 mb-2">
                <v-col v-for="stat in heroStats" :key="stat.label" cols="6" sm="3">
                  <div class="stat-box">
                    <div class="stat-num">{{ stat.num }}</div>
                    <div class="stat-label">{{ stat.label }}</div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <!-- Tech Category Cards -->
          <v-row justify="center" class="mt-6" id="learn-more">
            <v-col
              v-for="(cat, i) in techCategories"
              :key="cat.title"
              cols="12"
              sm="6"
              md="3"
              :class="['tech-col', { 'animate-in': animatedCards }]"
              :style="{ animationDelay: `${i * 80}ms` }"
            >
              <v-card
                class="tech-card pa-5 h-100"
                flat
                rounded="xl"
                :class="{ 'tech-card--selected': selectedTech === cat.title }"
                @click="selectedTech = selectedTech === cat.title ? null : cat.title"
              >
                <div class="tech-icon-wrap mb-4" :style="{ background: cat.iconBg }">
                  <v-icon :icon="cat.icon" :color="cat.color" size="24" />
                </div>
                <v-card-title class="tech-card-title px-0 pb-1">{{ cat.title }}</v-card-title>
                <v-card-text class="tech-card-text px-0 pt-0">{{ cat.desc }}</v-card-text>
                <v-expand-transition>
                  <div v-if="selectedTech === cat.title" class="tech-expanded mt-2">
                    <v-divider class="mb-3" />
                    <p class="text-caption" style="color: #555; line-height: 1.7">
                      {{ cat.detail }}
                    </p>
                    <v-btn
                      size="x-small"
                      variant="tonal"
                      :color="cat.color"
                      rounded="lg"
                      class="mt-2"
                      prepend-icon="mdi-arrow-right"
                      >Explore</v-btn
                    >
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== WHO CAN APPLY ===== -->
      <v-container fluid class="apply-section py-16">
        <v-container>
          <div class="text-center mb-12">
            <v-chip color="primary" variant="tonal" size="small" class="mb-3">Eligibility</v-chip>
            <h2 class="section-title">Who can <span class="italic-accent">Apply</span></h2>
            <p class="section-subtitle mt-2">
              Students, Faculty and Researchers, Early-Stage startups, and Tech Entrepreneurs can
              apply
            </p>
          </div>

          <!-- Tabs for mobile / filter -->
          <v-tabs
            v-model="activeApplyTab"
            color="primary"
            align-tabs="center"
            class="mb-8"
            show-arrows
          >
            <v-tab value="all">All</v-tab>
            <v-tab v-for="card in applyCards" :key="card.id" :value="card.id">{{
              card.short
            }}</v-tab>
          </v-tabs>

          <v-row>
            <v-col v-for="card in filteredApplyCards" :key="card.id" cols="12" md="6" class="mb-4">
              <v-card
                class="apply-card h-100"
                :class="['apply-card--' + card.id]"
                rounded="xl"
                flat
                :ripple="false"
                @click="openApplyDetail(card)"
              >
                <div class="apply-card-inner pa-8">
                  <div class="apply-badge mb-4" :style="{ background: card.badgeColor }">
                    <v-icon :icon="card.icon" size="30" color="white" />
                  </div>
                  <h3 class="apply-card-title">{{ card.title }}</h3>
                  <p class="apply-card-body mt-2 mb-4">{{ card.desc }}</p>
                  <div class="apply-tags">
                    <v-chip
                      v-for="tag in card.tags"
                      :key="tag"
                      size="small"
                      class="apply-chip mr-2 mb-2"
                      >{{ tag }}</v-chip
                    >
                  </div>
                  <v-btn
                    size="small"
                    variant="tonal"
                    rounded="lg"
                    class="mt-4"
                    :style="{ background: 'rgba(255,255,255,0.5)', color: card.badgeColor }"
                    append-icon="mdi-arrow-right"
                    @click.stop="openApplyDetail(card)"
                  >
                    Learn More
                  </v-btn>
                  <div class="apply-deco">{{ card.emoji }}</div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- Apply Detail Dialog -->
      <v-dialog v-model="applyDetailDialog" max-width="520" transition="dialog-bottom-transition">
        <v-card v-if="activeApplyCard" rounded="xl" class="pa-0 overflow-hidden">
          <div class="pa-6 pb-4" :class="['apply-card--' + activeApplyCard.id]">
            <div class="d-flex align-center justify-space-between">
              <div class="apply-badge" :style="{ background: activeApplyCard.badgeColor }">
                <v-icon :icon="activeApplyCard.icon" size="28" color="white" />
              </div>
              <v-btn icon size="small" variant="text" @click="applyDetailDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <h3 class="apply-card-title mt-3">{{ activeApplyCard.title }}</h3>
          </div>
          <div class="pa-6">
            <p class="text-body-2 text-medium-emphasis mb-5" style="line-height: 1.75">
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
            <v-btn
              block
              color="primary"
              rounded="lg"
              class="mt-6"
              @click="openApplyDialogFromDetail"
            >
              Apply as {{ activeApplyCard.short }}
            </v-btn>
          </div>
        </v-card>
      </v-dialog>

      <!-- ===== PROCESS TIMELINE ===== -->
      <v-container fluid class="timeline-section py-16">
        <v-container>
          <div class="text-center mb-12">
            <v-chip color="deep-orange" variant="tonal" size="small" class="mb-3"
              >How it works</v-chip
            >
            <h2 class="section-title">The Incubation <span class="italic-accent">Journey</span></h2>
            <p class="section-subtitle mt-2">
              From idea to market-ready startup in four structured phases
            </p>
          </div>

          <v-timeline align="start" side="end" class="d-none d-md-block">
            <v-timeline-item
              v-for="(step, i) in journeySteps"
              :key="step.phase"
              :dot-color="step.color"
              size="large"
              class="mb-4"
            >
              <template #icon>
                <v-icon :icon="step.icon" color="white" size="20" />
              </template>
              <v-card class="timeline-card pa-5" flat rounded="xl">
                <div class="d-flex align-center justify-space-between mb-3">
                  <v-chip
                    :color="step.color"
                    size="x-small"
                    label
                    variant="tonal"
                    class="font-weight-bold"
                    >Phase {{ i + 1 }}</v-chip
                  >
                  <span class="text-caption text-medium-emphasis">{{ step.duration }}</span>
                </div>
                <h4 class="timeline-card-title mb-2">{{ step.phase }}</h4>
                <p class="text-caption text-medium-emphasis mb-3" style="line-height: 1.7">
                  {{ step.desc }}
                </p>
                <div class="d-flex flex-wrap gap-1">
                  <v-chip
                    v-for="tag in step.tags"
                    :key="tag"
                    size="x-small"
                    :color="step.color"
                    variant="tonal"
                    >{{ tag }}</v-chip
                  >
                </div>
              </v-card>
            </v-timeline-item>
          </v-timeline>

          <!-- Mobile stepper -->
          <v-stepper v-model="timelineStep" class="d-md-none" flat rounded="xl" alt-labels>
            <v-stepper-header>
              <template v-for="(step, i) in journeySteps" :key="step.phase">
                <v-stepper-item
                  :value="i + 1"
                  :color="step.color"
                  :title="step.phase"
                  :icon="step.icon"
                />
                <v-divider v-if="i < journeySteps.length - 1" />
              </template>
            </v-stepper-header>
            <v-stepper-window>
              <v-stepper-window-item
                v-for="(step, i) in journeySteps"
                :key="step.phase"
                :value="i + 1"
              >
                <div class="pa-4 text-center">
                  <v-chip :color="step.color" class="mb-3" variant="tonal">{{
                    step.duration
                  }}</v-chip>
                  <p class="text-body-2 text-medium-emphasis" style="line-height: 1.75">
                    {{ step.desc }}
                  </p>
                </div>
              </v-stepper-window-item>
            </v-stepper-window>
            <div class="d-flex justify-space-between pa-4 pt-0">
              <v-btn variant="text" :disabled="timelineStep === 1" @click="timelineStep--"
                >Back</v-btn
              >
              <v-btn
                variant="text"
                :disabled="timelineStep === journeySteps.length"
                @click="timelineStep++"
                >Next</v-btn
              >
            </div>
          </v-stepper>
        </v-container>
      </v-container>

      <!-- ===== SERVICES ===== -->
      <v-container fluid class="services-section py-16">
        <v-container>
          <div class="text-center mb-12">
            <v-chip color="green" variant="tonal" size="small" class="mb-3">What we offer</v-chip>
            <h2 class="section-title">NAVIGATÚ <span class="italic-accent">Services</span></h2>
            <p class="section-subtitle mt-2">
              Comprehensive support to help your venture thrive at every stage
            </p>
          </div>

          <v-row>
            <v-col v-for="svc in navServices" :key="svc.title" cols="12" sm="6" md="3">
              <v-card
                class="svc-card pa-6 h-100"
                flat
                rounded="xl"
                :class="{ 'svc-card--active': activeSvc === svc.title }"
                @click="activeSvc = activeSvc === svc.title ? null : svc.title"
              >
                <div class="svc-icon-wrap mb-4" :style="{ background: svc.iconBg }">
                  <v-icon :icon="svc.icon" :color="svc.color" size="22" />
                </div>
                <h4 class="svc-card-title mb-4" :style="{ color: svc.color }">{{ svc.title }}</h4>
                <v-list density="compact" class="pa-0 bg-transparent">
                  <v-list-item
                    v-for="item in svc.items"
                    :key="item"
                    prepend-icon="mdi-circle-small"
                    :base-color="svc.color"
                    class="px-0"
                    density="compact"
                  >
                    <v-list-item-title class="svc-item-text">{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
                <v-expand-transition>
                  <div v-if="activeSvc === svc.title" class="mt-4">
                    <v-divider class="mb-3" />
                    <p class="text-caption" style="line-height: 1.7; color: #666">
                      {{ svc.detail }}
                    </p>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== MENTORS ===== -->
      <v-container fluid class="mentors-section py-16">
        <v-container>
          <div class="text-center mb-12">
            <v-chip color="purple" variant="tonal" size="small" class="mb-3">Our Network</v-chip>
            <h2 class="section-title">Meet the <span class="italic-accent">Mentors</span></h2>
            <p class="section-subtitle mt-2">
              Industry experts and seasoned entrepreneurs guiding your startup journey
            </p>
          </div>
          <v-row justify="center">
            <v-col
              v-for="mentor in mentors"
              :key="mentor.name"
              cols="12"
              sm="6"
              md="3"
              class="text-center"
            >
              <v-card
                class="mentor-card pa-6"
                flat
                rounded="xl"
                @click="activeMentor = activeMentor?.name === mentor.name ? null : mentor"
              >
                <v-avatar
                  size="80"
                  class="mentor-avatar mb-4"
                  :style="{ background: mentor.avatarBg }"
                >
                  <span class="mentor-initials">{{ mentor.initials }}</span>
                </v-avatar>
                <h4 class="mentor-name">{{ mentor.name }}</h4>
                <p class="mentor-role text-caption text-medium-emphasis">{{ mentor.role }}</p>
                <div class="d-flex justify-center flex-wrap gap-1 mt-3">
                  <v-chip
                    v-for="tag in mentor.expertise"
                    :key="tag"
                    size="x-small"
                    variant="tonal"
                    color="purple"
                    >{{ tag }}</v-chip
                  >
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== SUCCESS STORIES ===== -->
      <v-container fluid class="stories-section py-16">
        <v-container>
          <div class="text-center mb-12">
            <v-chip color="primary" variant="tonal" size="small" class="mb-3">Graduates</v-chip>
            <h2 class="section-title">Success <span class="italic-accent">Stories</span></h2>
            <p class="section-subtitle mt-2">
              Every startup tells a story of success and milestones in their journey
            </p>
          </div>

          <!-- Filter chips -->
          <div class="d-flex flex-wrap justify-center gap-2 mb-8">
            <v-chip
              v-for="filter in storyFilters"
              :key="filter"
              :color="activeStoryFilter === filter ? 'primary' : 'default'"
              :variant="activeStoryFilter === filter ? 'flat' : 'outlined'"
              size="small"
              class="cursor-pointer"
              @click="activeStoryFilter = filter"
              >{{ filter }}</v-chip
            >
          </div>

          <v-row justify="center">
            <v-col
              v-for="story in filteredStories"
              :key="story.name"
              cols="12"
              md="10"
              class="mb-6"
            >
              <v-card class="story-card" rounded="xl" elevation="0" @click="openStory(story)">
                <v-row no-gutters align="stretch">
                  <v-col cols="12" sm="3" class="d-flex align-center justify-center">
                    <div class="story-logo-box">
                      <v-avatar size="90" :style="{ background: story.logoBg }" rounded="lg">
                        <span style="font-size: 1.3rem; font-weight: 700; color: #fff">{{
                          story.initials
                        }}</span>
                      </v-avatar>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="9">
                    <div class="story-content pa-7">
                      <div class="d-flex align-center justify-space-between mb-2">
                        <h3 class="story-name">{{ story.name }}</h3>
                        <v-chip
                          :color="story.statusColor"
                          size="x-small"
                          variant="tonal"
                          label
                          class="font-weight-semibold"
                          >{{ story.status }}</v-chip
                        >
                      </div>
                      <p class="story-desc mb-5">{{ story.desc }}</p>
                      <div class="d-flex flex-wrap story-meta-row gap-4">
                        <div class="story-meta-item">
                          <v-icon icon="mdi-tag-outline" size="14" color="#1565c0" class="mr-1" />
                          <span class="story-meta-label">Industry:</span>
                          <span class="story-meta-value ml-1">{{ story.industry }}</span>
                        </div>
                        <div class="story-meta-item">
                          <v-icon icon="mdi-cash-multiple" size="14" color="#2e7d32" class="mr-1" />
                          <span class="story-meta-label">Funding:</span>
                          <span class="story-meta-value ml-1">{{ story.funding }}</span>
                        </div>
                        <div class="story-meta-item">
                          <v-icon
                            icon="mdi-calendar-outline"
                            size="14"
                            color="#e65100"
                            class="mr-1"
                          />
                          <span class="story-meta-label">Year:</span>
                          <span class="story-meta-value ml-1">{{ story.year }}</span>
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <v-row justify="end">
            <v-col cols="12" md="10" class="text-right">
              <v-btn
                variant="outlined"
                color="primary"
                rounded="lg"
                append-icon="mdi-arrow-right"
                class="more-btn"
                @click="$router.push('/success-stories')"
              >
                More Stories
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- Story Detail Dialog -->
      <v-dialog v-model="storyDialog" max-width="580" transition="dialog-bottom-transition">
        <v-card v-if="activeStory" rounded="xl" class="overflow-hidden">
          <div
            class="pa-6"
            :style="{
              background: activeStory.logoBg + '22',
              borderBottom: '1px solid ' + activeStory.logoBg + '44',
            }"
          >
            <div class="d-flex align-center gap-4">
              <v-avatar size="72" :style="{ background: activeStory.logoBg }" rounded="lg">
                <span style="font-size: 1.2rem; font-weight: 700; color: #fff">{{
                  activeStory.initials
                }}</span>
              </v-avatar>
              <div>
                <h3 class="story-name">{{ activeStory.name }}</h3>
                <v-chip
                  :color="activeStory.statusColor"
                  size="x-small"
                  variant="tonal"
                  label
                  class="mt-1"
                  >{{ activeStory.status }}</v-chip
                >
              </div>
              <v-spacer />
              <v-btn icon size="small" variant="text" @click="storyDialog = false"
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
              <v-col cols="4" class="text-center">
                <div class="text-h6 font-weight-bold" style="color: #1565c0">
                  {{ activeStory.funding }}
                </div>
                <div class="text-caption text-medium-emphasis">Funding Raised</div>
              </v-col>
              <v-col cols="4" class="text-center">
                <div class="text-h6 font-weight-bold" style="color: #2e7d32">
                  {{ activeStory.team }}
                </div>
                <div class="text-caption text-medium-emphasis">Team Size</div>
              </v-col>
              <v-col cols="4" class="text-center">
                <div class="text-h6 font-weight-bold" style="color: #e65100">
                  {{ activeStory.year }}
                </div>
                <div class="text-caption text-medium-emphasis">Founded</div>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>

      <!-- ===== FAQ ===== -->
      <v-container fluid class="faq-section py-16">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="8">
              <div class="text-center mb-12">
                <v-chip color="orange" variant="tonal" size="small" class="mb-3"
                  >Got questions?</v-chip
                >
                <h2 class="section-title">
                  Frequently Asked <span class="italic-accent">Questions</span>
                </h2>
              </div>
              <v-expansion-panels variant="accordion" rounded="xl" class="faq-panels">
                <v-expansion-panel v-for="faq in faqs" :key="faq.q" rounded="xl" class="mb-2">
                  <v-expansion-panel-title class="faq-question">{{
                    faq.q
                  }}</v-expansion-panel-title>
                  <v-expansion-panel-text class="faq-answer">{{ faq.a }}</v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- ===== CTA BANNER ===== -->
      <v-container fluid class="cta-section py-16">
        <v-container>
          <v-card class="cta-card pa-12 text-center" rounded="xl" flat>
            <v-icon icon="mdi-rocket-launch" size="48" color="white" class="mb-4" />
            <h2 class="cta-title mb-3">Ready to Launch Your Startup?</h2>
            <p class="cta-sub mb-8">
              Join Navigatú TBI and get access to mentorship, funding, and a thriving community of
              innovators.
            </p>
            <div class="d-flex justify-center flex-wrap gap-3">
              <v-btn
                color="white"
                rounded="lg"
                size="large"
                class="cta-btn-primary"
                prepend-icon="mdi-send-outline"
                @click="applyDialog = true"
              >
                Start Application
              </v-btn>
              <v-btn
                variant="outlined"
                color="white"
                rounded="lg"
                size="large"
                class="cta-btn-secondary"
                prepend-icon="mdi-calendar-check-outline"
              >
                Schedule a Tour
              </v-btn>
            </div>
          </v-card>
        </v-container>
      </v-container>
    </v-main>

    <!-- ===== APPLY DIALOG ===== -->
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
                  Review your application and submit. Our team will contact you within 5 business
                  days.
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
            >Submit Application</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Success Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :timeout="4000"
      color="success"
      rounded="lg"
      location="bottom center"
    >
      <v-icon icon="mdi-check-circle" class="mr-2" />
      Application submitted! We'll be in touch soon.
      <template #actions>
        <v-btn variant="text" color="white" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>

    <!-- ===================== FOOTER ===================== -->
    <v-footer color="grey-darken-4" class="pa-0">
      <v-container class="py-12">
        <v-row>
          <v-col cols="12" md="4" class="mb-6">
            <div class="footer-logo mb-1">NAVIGATÚ</div>
            <p class="footer-tagline mb-4">Technology Business Incubator</p>
            <p class="text-caption" style="color: rgba(255, 255, 255, 0.45); line-height: 1.7">
              Empowering the next generation of Filipino tech founders through mentorship,
              innovation, and community.
            </p>
            <div class="d-flex gap-2 mt-4">
              <v-btn icon size="small" variant="outlined" color="white" opacity="0.4"
                ><v-icon>mdi-facebook</v-icon></v-btn
              >
              <v-btn icon size="small" variant="outlined" color="white" opacity="0.4"
                ><v-icon>mdi-linkedin</v-icon></v-btn
              >
              <v-btn icon size="small" variant="outlined" color="white" opacity="0.4"
                ><v-icon>mdi-twitter</v-icon></v-btn
              >
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="2" class="mb-6">
            <div class="footer-col-title mb-4">Programs</div>
            <div v-for="link in footerLinks.programs" :key="link" class="footer-link mb-2">
              {{ link }}
            </div>
          </v-col>
          <v-col cols="6" sm="4" md="2" class="mb-6">
            <div class="footer-col-title mb-4">Company</div>
            <div v-for="link in footerLinks.company" :key="link" class="footer-link mb-2">
              {{ link }}
            </div>
          </v-col>
          <v-col cols="12" sm="4" md="4" class="mb-6">
            <div class="footer-col-title mb-4">Newsletter</div>
            <p class="text-caption mb-3" style="color: rgba(255, 255, 255, 0.45)">
              Stay updated on events, funding, and startup news.
            </p>
            <div class="d-flex gap-2">
              <v-text-field
                v-model="newsletterEmail"
                placeholder="your@email.com"
                variant="outlined"
                density="compact"
                rounded="lg"
                hide-details
                bg-color="grey-darken-3"
                style="color: white"
              />
              <v-btn
                color="primary"
                rounded="lg"
                density="comfortable"
                icon
                @click="subscribeNewsletter"
              >
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-divider color="white" opacity="0.1" class="my-6" />
        <div class="d-flex flex-wrap justify-space-between align-center gap-2">
          <p class="footer-copy">© 2024 Navigatú TBI. All Rights Reserved.</p>
          <p class="footer-copy">Empowering startups. Building futures.</p>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ── Scroll ──
const scrolled = ref(false)
const onScroll = () => {
  scrolled.value = window.scrollY > 20
}
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// ── Drawer / Search ──
const drawer = ref(false)
const searchDialog = ref(false)
const searchQuery = ref('')
const searchTags = ['Apply Now', 'Coworking Space', 'AI Programs', 'Funding', 'Events 2025']
const allSearchResults = [
  'Apply to Navigatú',
  'Coworking Space Tour',
  'AI Incubation Program',
  'Seed Funding Access',
  'Upcoming Events',
  'Meet our Mentors',
  'Success Stories',
]
const filteredResults = computed(() =>
  allSearchResults.filter((r) => r.toLowerCase().includes(searchQuery.value.toLowerCase())),
)

// ── Hero animations ──
const animatedCards = ref(false)
onMounted(() =>
  setTimeout(() => {
    animatedCards.value = true
  }, 300),
)

const heroStats = ref([
  { num: '60+', label: 'Startups Incubated' },
  { num: '₱80M+', label: 'Funding Raised' },
  { num: '15+', label: 'Mentors' },
  { num: '95%', label: 'Survival Rate' },
])

const selectedTech = ref(null)
const techCategories = ref([
  {
    title: 'ICT & Software Development',
    desc: 'Mobile apps, web platforms, enterprise solutions.',
    icon: 'mdi-monitor-cellphone',
    color: '#1565C0',
    iconBg: '#E3F2FD',
    detail:
      'Build scalable web and mobile applications with support from seasoned software engineers and product managers.',
  },
  {
    title: 'Artificial Intelligence',
    desc: 'Machine learning, computer vision, NLP.',
    icon: 'mdi-brain',
    color: '#F9A825',
    iconBg: '#FFF8E1',
    detail:
      'Develop AI-driven products with access to compute resources, AI mentors, and open datasets to accelerate your model.',
  },
  {
    title: 'Internet of Things',
    desc: 'Smart devices, sensors, connected systems.',
    icon: 'mdi-access-point-network',
    color: '#1565C0',
    iconBg: '#E3F2FD',
    detail:
      'Prototype and deploy IoT solutions with hardware lab access, embedded systems mentors, and industry partnerships.',
  },
  {
    title: 'Engineering Tech',
    desc: 'Digital tools for engineering and manufacturing.',
    icon: 'mdi-cog-outline',
    color: '#F9A825',
    iconBg: '#FFF8E1',
    detail:
      'From CAD tools to digital twins — build the next generation of engineering software with deep industry connections.',
  },
])

function learnMoreScroll() {
  document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })
}

// ── Who Can Apply ──
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
    desc: 'Undergraduate and graduate students with innovative ideas ready to turn academic projects into real-world startups.',
    fullDesc:
      'Students from any discipline with a passion for technology and entrepreneurship are encouraged to apply. Whether you have a working prototype or just an idea, Navigatú provides the mentorship, tools, and community to help you build your first venture.',
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
    badgeColor: '#2E7D32',
    desc: 'Professors and researchers looking to commercialize research findings and bridge the gap between academia and industry.',
    fullDesc:
      'University faculty and researchers who have developed innovations with commercial potential. Navigatú bridges the gap between academic research and the market through IP support, commercialization strategy, and investor introductions.',
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
    badgeColor: '#E65100',
    desc: 'Pre-seed and seed-stage startups needing structured support to validate business models and access funding networks.',
    fullDesc:
      'Pre-seed and seed-stage tech startups that need structured support to move from MVP to product-market fit. Gain access to investor networks, legal support, and a community of co-founders.',
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
    badgeColor: '#6A1B9A',
    desc: 'Experienced entrepreneurs building technology-driven solutions for real market problems.',
    fullDesc:
      'Seasoned entrepreneurs with prior startup experience looking to scale their technology businesses. Navigatú provides access to coworking facilities, growth mentors, and corporate partnership programs.',
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

function openApplyDialogFromDetail() {
  applyDetailDialog.value = false
  applyDialog.value = true
}

function closeApplyDialog() {
  applyDialog.value = false
  applyStep.value = 1
}

// ── Journey ──
const timelineStep = ref(1)
const journeySteps = ref([
  {
    phase: 'Application & Screening',
    icon: 'mdi-file-document-outline',
    color: '#1565C0',
    duration: 'Weeks 1–2',
    desc: 'Submit your application, pitch deck, and supporting documents. Our screening committee evaluates team, technology, and market fit.',
    tags: ['Pitch Deck', 'Interview', 'Evaluation'],
  },
  {
    phase: 'Onboarding & Validation',
    icon: 'mdi-clipboard-check-outline',
    color: '#2E7D32',
    duration: 'Months 1–2',
    desc: 'Validate your business model with real customers. Participate in workshops, design sprints, and weekly mentor check-ins.',
    tags: ['Customer Discovery', 'MVP Testing', 'Workshops'],
  },
  {
    phase: 'Development & Acceleration',
    icon: 'mdi-rocket-launch-outline',
    color: '#E65100',
    duration: 'Months 3–5',
    desc: 'Build, iterate, and accelerate. Access funding networks, legal support, and co-working facilities to develop your product.',
    tags: ['Product Dev', 'Investor Intro', 'Legal Support'],
  },
  {
    phase: 'Demo Day & Graduation',
    icon: 'mdi-trophy-outline',
    color: '#6A1B9A',
    duration: 'Month 6',
    desc: 'Showcase your startup to investors, industry partners, and media at Navigatú Demo Day. Graduate and join our alumni network.',
    tags: ['Demo Day', 'Alumni Network', 'Press Coverage'],
  },
])

// ── Services ──
const activeSvc = ref(null)
const navServices = ref([
  {
    title: 'Technical Support',
    icon: 'mdi-code-braces',
    iconBg: '#E3F2FD',
    color: '#1565C0',
    items: ['Software Development', 'Cloud Infrastructure', 'Technical Mentorship', 'Code Reviews'],
    detail:
      'Access hands-on technical guidance from senior engineers, cloud credits, and a dedicated technical helpdesk for your startup.',
  },
  {
    title: 'Business Development',
    icon: 'mdi-chart-line',
    iconBg: '#E8F5E9',
    color: '#2E7D32',
    items: [
      'Business Model Design',
      'Market Validation',
      'Go-to-Market Strategy',
      'Sales Coaching',
    ],
    detail:
      'Work with business development mentors to refine your go-to-market strategy and build a sustainable revenue model.',
  },
  {
    title: 'Funding Access',
    icon: 'mdi-currency-php',
    iconBg: '#FFF3E0',
    color: '#E65100',
    items: ['Seed Funding', 'Investor Connections', 'Pitch Preparation', 'Grant Applications'],
    detail:
      'Get introduced to angel investors, VCs, and government grant programs. Our pitch prep workshops have a 70% investment success rate.',
  },
  {
    title: 'Workspace & Facilities',
    icon: 'mdi-domain',
    iconBg: '#F3E5F5',
    color: '#6A1B9A',
    items: ['Co-working Space', 'Meeting Rooms', 'High Speed Internet', 'Development Tools'],
    detail:
      'A 24/7 coworking space with private offices, conference rooms, gigabit internet, and access to premium software licenses.',
  },
])

// ── Mentors ──
const activeMentor = ref(null)
const mentors = ref([
  {
    name: 'Dr. Maria Santos',
    initials: 'MS',
    role: 'AI & Deep Tech',
    avatarBg: 'linear-gradient(135deg,#1565C0,#42A5F5)',
    expertise: ['Machine Learning', 'NLP'],
  },
  {
    name: 'Engr. Rico Dela Cruz',
    initials: 'RD',
    role: 'IoT & Hardware',
    avatarBg: 'linear-gradient(135deg,#2E7D32,#66BB6A)',
    expertise: ['Embedded Systems', 'IoT'],
  },
  {
    name: 'Atty. Claire Reyes',
    initials: 'CR',
    role: 'Startup Law & IP',
    avatarBg: 'linear-gradient(135deg,#6A1B9A,#AB47BC)',
    expertise: ['IP Law', 'Incorporation'],
  },
  {
    name: 'Mr. Jose Tan',
    initials: 'JT',
    role: 'Growth & Funding',
    avatarBg: 'linear-gradient(135deg,#E65100,#FF8A65)',
    expertise: ['Venture Capital', 'Growth'],
  },
])

// ── Stories ──
const storyDialog = ref(false)
const activeStory = ref(null)
const activeStoryFilter = ref('All')
const storyFilters = ['All', 'Artificial Intelligence', 'Business Software', 'HealthTech']
const successStories = ref([
  {
    name: 'Ascribo AI',
    initials: 'AI',
    logoBg: '#1565C0',
    status: 'Funded',
    statusColor: 'success',
    industry: 'Artificial Intelligence',
    funding: '₱4.2M',
    year: '2025',
    team: '8',
    desc: 'A context-aware AI language translation platform delivering accurate, nuanced translations for law, medicine, and marketing.',
    fullDesc:
      'Ascribo.AI solves the critical problem of inaccurate language translation in high-stakes fields. Their proprietary context engine ensures that legal, medical, and marketing documents are translated with precision and cultural nuance — reducing costly translation errors by over 90%.',
  },
  {
    name: 'BizNest',
    initials: 'BN',
    logoBg: '#2E7D32',
    status: 'Scaling',
    statusColor: 'primary',
    industry: 'Business Software',
    funding: '₱4.2M',
    year: '2025',
    team: '12',
    desc: 'A smart business management platform for micro and small enterprises, integrating POS, inventory, finance, and CRM.',
    fullDesc:
      'BizNest was built to solve the fragmented tools problem for MSMEs in the Philippines. By bringing POS, inventory, financial tracking, and CRM into one platform, BizNest has helped over 500 small businesses reduce operational overhead by 40%.',
  },
  {
    name: 'MediLink PH',
    initials: 'ML',
    logoBg: '#6A1B9A',
    status: 'MVP',
    statusColor: 'warning',
    industry: 'HealthTech',
    funding: '₱1.8M',
    year: '2024',
    team: '5',
    desc: 'A telemedicine and patient records platform connecting rural communities in Caraga with licensed physicians nationwide.',
    fullDesc:
      'MediLink PH addresses the healthcare access gap in underserved communities. Their platform enables real-time teleconsultations, digital prescriptions, and secure medical records — bringing quality healthcare to patients who previously had to travel hours to see a doctor.',
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

// ── FAQs ──
const faqs = ref([
  {
    q: 'How long is the incubation program?',
    a: 'The core incubation program runs for 6 months, with optional alumni support and mentorship continuing beyond graduation.',
  },
  {
    q: 'Is there an equity or fee requirement?',
    a: 'Navigatú TBI does not take equity from incubatees. Some programs may have a modest participation fee depending on the services availed.',
  },
  {
    q: 'Do I need a registered business to apply?',
    a: 'No, you can apply as an individual or informal team. We can help with business registration and legal structuring as part of the program.',
  },
  {
    q: 'Can teams outside Butuan City apply?',
    a: 'Yes! While our physical facilities are in Butuan City, we accept applications from startups across Caraga and beyond through our hybrid program.',
  },
  {
    q: 'What happens after the program ends?',
    a: 'Graduates join the Navigatú Alumni Network, gaining access to continued mentorship, investor introductions, and co-investment opportunities.',
  },
])

// ── Apply ──
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
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&family=DM+Sans:wght@300;400;500;600&family=Montserrat:wght@700;900&display=swap');

.v-application {
  font-family: 'DM Sans', sans-serif !important;
}

/* Navbar */
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
.nav-link--active {
  color: #1565c0 !important;
}

/* Section headers */
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
  margin: 0 auto;
}

/* Hero */
.hero-section {
  background: #f0f3fa;
  padding-top: 72px;
  padding-bottom: 72px;
  position: relative;
  overflow: hidden;
}
.hero-bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 80% 20%, rgba(21, 101, 192, 0.06) 0%, transparent 60%),
    radial-gradient(circle at 20% 80%, rgba(249, 168, 37, 0.06) 0%, transparent 50%);
  pointer-events: none;
}
.hero-title {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.8rem, 4.5vw, 3rem);
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.22;
}
.hero-italic {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #1565c0;
  font-weight: 600;
}
.hero-body {
  font-size: 1rem;
  color: #666;
  line-height: 1.8;
  max-width: 520px;
}
.hero-btn {
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: 0.2px !important;
}

.stat-box {
  text-align: center;
  padding: 12px 8px;
}
.stat-num {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.6rem;
  font-weight: 900;
  color: #1565c0;
  line-height: 1;
}
.stat-label {
  font-size: 0.72rem;
  color: #9e9e9e;
  margin-top: 4px;
  letter-spacing: 0.3px;
}

/* Tech cards */
.tech-col {
  opacity: 0;
  transform: translateY(20px);
}
.tech-col.animate-in {
  animation: fadeUp 0.5s ease forwards;
}
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.tech-card {
  background: #fff;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  border: 1.5px solid transparent;
}
.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 28px rgba(21, 101, 192, 0.12) !important;
}
.tech-card--selected {
  border-color: #1565c0 !important;
  box-shadow: 0 8px 28px rgba(21, 101, 192, 0.15) !important;
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

/* Apply cards */
.apply-section {
  background: #fff;
}
.apply-card {
  position: relative;
  overflow: hidden;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  cursor: pointer;
}
.apply-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1) !important;
}
.apply-card--students {
  background: linear-gradient(145deg, #e8f0fe, #c5d8ff);
}
.apply-card--faculty {
  background: linear-gradient(145deg, #e8f5e9, #b8e6bc);
}
.apply-card--startups {
  background: linear-gradient(145deg, #fff3e0, #ffcc80);
}
.apply-card--techpreneurs {
  background: linear-gradient(145deg, #f3e5f5, #ce93d8);
}
.apply-badge {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.apply-card-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a1a;
}
.apply-card-body {
  font-size: 0.87rem;
  color: #444;
  line-height: 1.75;
}
.apply-chip {
  background: rgba(255, 255, 255, 0.65) !important;
  color: #333 !important;
  font-weight: 600 !important;
  font-size: 0.72rem !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
}
.apply-deco {
  position: absolute;
  top: 16px;
  right: 24px;
  font-size: 3rem;
  opacity: 0.15;
  pointer-events: none;
}

/* Timeline */
.timeline-section {
  background: #f7f9fc;
}
.timeline-card {
  background: #fff;
  border: 0.5px solid rgba(0, 0, 0, 0.07);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.timeline-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07) !important;
}
.timeline-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
}

/* Services */
.services-section {
  background: #f0f3fa;
}
.svc-card {
  background: #fff;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  border: 1.5px solid transparent;
}
.svc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(21, 101, 192, 0.1) !important;
}
.svc-card--active {
  border-color: #1565c0 !important;
}
.svc-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.svc-card-title {
  font-size: 0.95rem;
  font-weight: 700;
}
.svc-item-text {
  font-size: 0.8rem !important;
  color: #555 !important;
}

/* Mentors */
.mentors-section {
  background: #fff;
}
.mentor-card {
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  background: #f7f9fc;
}
.mentor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08) !important;
}
.mentor-avatar {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
.mentor-initials {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
}
.mentor-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
}
.mentor-role {
  color: #888;
}

/* Stories */
.stories-section {
  background: #f7f9fc;
}
.story-card {
  background: #f5f6f8;
  cursor: pointer;
  transition:
    box-shadow 0.22s ease,
    transform 0.22s ease;
}
.story-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.09) !important;
}
.story-logo-box {
  width: 100%;
  height: 100%;
  min-height: 200px;
  background: #fff;
  border-radius: 16px 0 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
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
  line-height: 1.8;
  margin: 0;
}
.story-meta-item {
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
}
.story-meta-label {
  margin-right: 2px;
}
.story-meta-value {
  font-weight: 700;
  color: #1a1a1a;
}
.more-btn {
  text-transform: none !important;
  font-weight: 600 !important;
}

/* FAQ */
.faq-section {
  background: #fff;
}
.faq-panels {
  border: 0.5px solid rgba(0, 0, 0, 0.07);
  border-radius: 16px;
  overflow: hidden;
}
.faq-question {
  font-weight: 600 !important;
  font-size: 0.92rem !important;
}
.faq-answer {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.8;
}

/* CTA */
.cta-section {
  background: #f0f3fa;
}
.cta-card {
  background: linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #42a5f5 100%);
}
.cta-title {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 900;
  color: #fff;
}
.cta-sub {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 480px;
  margin: 0 auto;
}
.cta-btn-primary {
  color: #1565c0 !important;
  font-weight: 700 !important;
  text-transform: none !important;
}
.cta-btn-secondary {
  text-transform: none !important;
  font-weight: 600 !important;
}

/* Footer */
.footer-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
  font-style: italic;
}
.footer-tagline {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 1px;
}
.footer-col-title {
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 2px;
  text-transform: uppercase;
}
.footer-link {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: color 0.15s;
}
.footer-link:hover {
  color: #fff;
}
.footer-copy {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  margin: 0;
}

/* Search field */
.search-field :deep(.v-field__outline) {
  border-radius: 12px !important;
}

@media (max-width: 599px) {
  .story-logo-box {
    border-radius: 16px 16px 0 0;
    min-height: 140px;
  }
}
</style>
