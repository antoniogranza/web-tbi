<template>
  <v-app class="admin-app">
    <!-- ===== SIDEBAR ===== -->
    <v-navigation-drawer
      v-model="sidebarOpen"
      :rail="sidebarRail"
      permanent
      class="admin-sidebar"
      width="260"
    >
      <div class="sidebar-brand" :class="{ 'sidebar-brand--rail': sidebarRail }">
        <div class="sb-logo">
          <v-icon icon="mdi-shield-crown-outline" size="22" color="white" />
        </div>
        <transition name="fade-label">
          <div v-if="!sidebarRail" class="sb-brand-text">
            <div class="sb-name">TBI Admin</div>
            <div class="sb-sub">Control Panel</div>
          </div>
        </transition>
      </div>

      <v-divider color="rgba(255,255,255,0.1)" />

      <div class="sidebar-user" :class="{ 'sidebar-user--rail': sidebarRail }">
        <v-avatar size="34" color="rgba(255,255,255,0.15)" class="sb-avatar">
          <v-icon icon="mdi-account" size="20" color="white" />
        </v-avatar>
        <transition name="fade-label">
          <div v-if="!sidebarRail" class="sb-user-text">
            <div class="sb-user-email">{{ currentUser?.email || 'Administrator' }}</div>
            <div class="sb-user-role">Super Admin</div>
          </div>
        </transition>
      </div>

      <v-divider color="rgba(255,255,255,0.1)" />

      <v-list nav density="compact" class="sidebar-nav mt-2">
        <v-list-item
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          value="dashboard"
          :active="activePage === 'dashboard' && !activeTBI"
          active-color="white"
          class="nav-item"
          rounded="lg"
          @click="goToDashboard"
        />

        <v-list-subheader v-if="!sidebarRail" class="nav-subheader mt-2"
          >TBI Portals</v-list-subheader
        >

        <v-list-item
          v-for="tbi in tbiList"
          :key="tbi.id"
          :prepend-icon="tbi.icon"
          :title="tbi.name"
          :value="tbi.id"
          :active="activeTBI?.id === tbi.id"
          active-color="white"
          class="nav-item"
          rounded="lg"
          @click="selectTBI(tbi)"
        />

        <v-divider color="rgba(255,255,255,0.1)" class="my-3" />

        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          value="logout"
          active-color="white"
          class="nav-item nav-item--logout"
          rounded="lg"
          @click="handleLogout"
        />
      </v-list>

      <template #append>
        <div class="sidebar-toggle-wrap">
          <v-btn
            :icon="sidebarRail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
            variant="text"
            size="small"
            color="rgba(255,255,255,0.5)"
            @click="sidebarRail = !sidebarRail"
          />
        </div>
      </template>
    </v-navigation-drawer>

    <!-- ===== TOP APP BAR ===== -->
    <v-app-bar flat color="white" border="b" height="60" class="admin-appbar">
      <v-app-bar-title>
        <div class="appbar-title-block">
          <span class="appbar-page-label">{{ activeTBI ? activeTBI.name : 'Dashboard' }}</span>
          <v-chip
            v-if="activeTBI"
            size="x-small"
            :color="activeTBI.color"
            variant="tonal"
            class="ml-2"
          >
            {{ activeTBI.shortName }}
          </v-chip>
        </div>
      </v-app-bar-title>
      <template #append>
        <div class="d-flex align-center mr-3" style="gap: 8px">
          <v-btn icon="mdi-bell-outline" variant="text" size="small" color="#555" />
          <v-avatar size="32" color="#EEF4FF" style="cursor: pointer" @click="handleLogout">
            <v-icon icon="mdi-account" size="18" color="#1565C0" />
          </v-avatar>
        </div>
      </template>
    </v-app-bar>

    <!-- ===== MAIN CONTENT ===== -->
    <v-main class="admin-main">
      <div class="content-area">
        <!-- DASHBOARD HOME -->
        <div v-if="!activeTBI">
          <div class="welcome-strip mb-8">
            <div>
              <div class="welcome-greeting">Good day, Administrator 👋</div>
              <div class="welcome-sub">Select a TBI portal below to manage its content.</div>
            </div>
            <div class="welcome-date">{{ todayLabel }}</div>
          </div>

          <v-row class="mb-6">
            <v-col v-for="stat in dashStats" :key="stat.label" cols="6" md="3">
              <div class="stat-card">
                <div class="stat-icon-wrap" :style="{ background: stat.iconBg }">
                  <v-icon :icon="stat.icon" :color="stat.color" size="22" />
                </div>
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </v-col>
          </v-row>

          <div class="section-eyebrow mb-5">
            <v-icon icon="mdi-office-building-outline" size="14" class="mr-1" />
            TBI Portals — Select to Manage
          </div>

          <v-row>
            <v-col v-for="tbi in tbiList" :key="tbi.id" cols="12" md="4">
              <div class="tbi-card" :class="`tbi-card--${tbi.id}`" @click="selectTBI(tbi)">
                <div class="tbi-card-pattern" />
                <div class="tbi-card-body">
                  <div class="tbi-card-icon-wrap mb-4">
                    <v-icon :icon="tbi.icon" size="30" color="white" />
                  </div>
                  <div class="tbi-card-eyebrow">TBI Portal</div>
                  <h3 class="tbi-card-name">{{ tbi.name }}</h3>
                  <p class="tbi-card-desc">{{ tbi.desc }}</p>
                  <div class="tbi-card-chips mt-4">
                    <v-chip
                      v-for="a in tbi.actions"
                      :key="a"
                      size="x-small"
                      variant="tonal"
                      color="white"
                      class="tbi-chip mr-1 mb-1"
                      >{{ a }}</v-chip
                    >
                  </div>
                  <div class="tbi-card-cta mt-5">
                    Open Portal <v-icon icon="mdi-arrow-right" size="14" class="ml-1" />
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- TBI PORTAL VIEW -->
        <div v-else>
          <div class="portal-header mb-8">
            <v-btn
              variant="text"
              prepend-icon="mdi-arrow-left"
              size="small"
              color="#555"
              class="back-btn mb-4"
              @click="goToDashboard"
              >Back to Dashboard</v-btn
            >
            <div class="portal-title-row">
              <div class="portal-icon-wrap" :style="{ background: activeTBI.color }">
                <v-icon :icon="activeTBI.icon" size="24" color="white" />
              </div>
              <div>
                <h2 class="portal-title">{{ activeTBI.name }}</h2>
                <p class="portal-subtitle">{{ activeTBI.desc }}</p>
              </div>
            </div>
          </div>

          <div class="section-eyebrow mb-5">
            <v-icon icon="mdi-lightning-bolt" size="13" class="mr-1" />
            Management Actions
          </div>

          <v-row>
            <v-col v-for="action in activeTBI.menuActions" :key="action.id" cols="12" sm="6" md="4">
              <div class="action-card" @click="router.push(action.route)">
                <div class="action-icon-wrap" :style="{ background: action.iconBg }">
                  <v-icon :icon="action.icon" :color="action.color" size="26" />
                </div>
                <div class="mt-4">
                  <h4 class="action-title">{{ action.title }}</h4>
                  <p class="action-desc">{{ action.desc }}</p>
                </div>
                <div class="action-arrow">
                  <v-icon icon="mdi-arrow-right" size="16" color="#1565C0" />
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-main>

    <!-- LOGOUT DIALOG -->
    <v-dialog v-model="logoutDialog" max-width="360">
      <v-card rounded="xl" class="pa-6" elevation="0" border>
        <div class="text-center mb-5">
          <v-icon icon="mdi-logout" size="40" color="#C62828" />
          <h3 class="logout-dialog-title mt-3">Sign Out?</h3>
          <p class="logout-dialog-sub mt-2">You will be returned to the login page.</p>
        </div>
        <v-row dense>
          <v-col cols="6"
            ><v-btn block variant="outlined" rounded="lg" @click="logoutDialog = false"
              >Cancel</v-btn
            ></v-col
          >
          <v-col cols="6"
            ><v-btn block color="error" rounded="lg" @click="confirmLogout">Sign Out</v-btn></v-col
          >
        </v-row>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/utils/supabase'

const router = useRouter()
const currentUser = ref(null)
const activePage = ref('dashboard')
const activeTBI = ref(null)
const sidebarOpen = ref(true)
const sidebarRail = ref(false)
const logoutDialog = ref(false)

const tbiList = [
  {
    id: 'navigatu',
    name: 'Navigatú TBI',
    shortName: 'NAV',
    icon: 'mdi-compass-outline',
    color: '#1565C0',
    desc: 'Manage incubatees, news, events, and partnerships for Navigatú TBI.',
    actions: ['Incubatees', 'News', 'Events', 'Partners'],
    menuActions: [
      {
        id: 'incubatees',
        title: 'Incubatees',
        desc: 'Add, edit, or remove incubatee startup profiles.',
        icon: 'mdi-rocket-launch-outline',
        color: '#1565C0',
        iconBg: '#E3F2FD',
        route: '/admin/navigatu/incubatees',
      },
      {
        id: 'news',
        title: 'News',
        desc: 'Publish news articles, announcements, and press releases.',
        icon: 'mdi-newspaper-variant-outline',
        color: '#2E7D32',
        iconBg: '#E8F5E9',
        route: '/admin/navigatu/news',
      },
      {
        id: 'events',
        title: 'Events',
        desc: 'Create and manage workshops, pitch nights, and demo days.',
        icon: 'mdi-calendar-star-outline',
        color: '#E65100',
        iconBg: '#FFF3E0',
        route: '/admin/navigatu/events',
      },
      {
        id: 'achievements',
        title: 'Achievements',
        desc: 'Record awards, milestones, and funding received.',
        icon: 'mdi-trophy-outline',
        color: '#F9A825',
        iconBg: '#FFF8E1',
        route: '/admin/navigatu/achievements',
      },
      {
        id: 'partners',
        title: 'Partners',
        desc: 'Manage institutional and industry partnerships.',
        icon: 'mdi-handshake-outline',
        color: '#6A1B9A',
        iconBg: '#EDE7F6',
        route: '/admin/navigatu/partners',
      },
      {
        id: 'team',
        title: 'Leadership Team',
        desc: 'Update team members, roles, and contact information.',
        icon: 'mdi-account-group-outline',
        color: '#00695C',
        iconBg: '#E0F2F1',
        route: '/admin/navigatu/team',
      },
    ],
  },
  {
    id: 'tara',
    name: 'TARA ATBI',
    shortName: 'TARA',
    icon: 'mdi-leaf-circle-outline',
    color: '#2E7D32',
    desc: 'Manage incubatees, news, events, and programs for TARA ATBI.',
    actions: ['Incubatees', 'News', 'Events', 'Programs'],
    menuActions: [
      {
        id: 'incubatees',
        title: 'Incubatees',
        desc: 'Add, edit, or remove incubatee startup profiles.',
        icon: 'mdi-rocket-launch-outline',
        color: '#2E7D32',
        iconBg: '#E8F5E9',
        route: '/admin/tara/incubatees',
      },
      {
        id: 'news',
        title: 'News',
        desc: 'Publish news articles, announcements, and press releases.',
        icon: 'mdi-newspaper-variant-outline',
        color: '#1565C0',
        iconBg: '#E3F2FD',
        route: '/admin/tara/news',
      },
      {
        id: 'events',
        title: 'Events',
        desc: 'Create and manage workshops, training sessions, and expos.',
        icon: 'mdi-calendar-star-outline',
        color: '#E65100',
        iconBg: '#FFF3E0',
        route: '/admin/tara/events',
      },
      {
        id: 'programs',
        title: 'Programs',
        desc: 'Manage incubation batches and training programs.',
        icon: 'mdi-school-outline',
        color: '#6A1B9A',
        iconBg: '#EDE7F6',
        route: '/admin/tara/programs',
      },
      {
        id: 'partners',
        title: 'Partners',
        desc: 'Manage institutional and industry partnerships.',
        icon: 'mdi-handshake-outline',
        color: '#00695C',
        iconBg: '#E0F2F1',
        route: '/admin/tara/partners',
      },
      {
        id: 'team',
        title: 'Leadership Team',
        desc: 'Update team members, roles, and contact information.',
        icon: 'mdi-account-group-outline',
        color: '#F57F17',
        iconBg: '#FFFDE7',
        route: '/admin/tara/team',
      },
    ],
  },
  {
    id: 'csutbi',
    name: 'CSU TBI',
    shortName: 'CSU',
    icon: 'mdi-domain',
    color: '#B71C1C',
    desc: 'Manage programs, reports, users, and content for CSU TBI.',
    actions: ['Programs', 'Reports', 'Users', 'Content'],
    menuActions: [
      {
        id: 'programs',
        title: 'Programs',
        desc: 'Manage incubation batches, cohorts, and training schedules.',
        icon: 'mdi-school-outline',
        color: '#B71C1C',
        iconBg: '#FFEBEE',
        route: '/admin/csutbi/programs',
      },
      {
        id: 'reports',
        title: 'Reports & Analytics',
        desc: 'Generate and download system performance reports.',
        icon: 'mdi-chart-bar-stacked',
        color: '#1565C0',
        iconBg: '#E3F2FD',
        route: '/admin/csutbi/reports',
      },
      {
        id: 'users',
        title: 'User Management',
        desc: 'Manage admin accounts, roles, and access permissions.',
        icon: 'mdi-account-cog-outline',
        color: '#E65100',
        iconBg: '#FFF3E0',
        route: '/admin/csutbi/users',
      },
      {
        id: 'content',
        title: 'Content',
        desc: 'Manage announcements, publications, and static content.',
        icon: 'mdi-file-document-edit-outline',
        color: '#2E7D32',
        iconBg: '#E8F5E9',
        route: '/admin/csutbi/content',
      },
      {
        id: 'partners',
        title: 'Partners',
        desc: 'Manage funding agencies and industry partnerships.',
        icon: 'mdi-handshake-outline',
        color: '#6A1B9A',
        iconBg: '#EDE7F6',
        route: '/admin/csutbi/partners',
      },
      {
        id: 'settings',
        title: 'System Settings',
        desc: 'Configure system preferences and integrations.',
        icon: 'mdi-tune-vertical',
        color: '#546E7A',
        iconBg: '#ECEFF1',
        route: '/admin/csutbi/settings',
      },
    ],
  },
]

const dashStats = [
  {
    label: 'Total Incubatees',
    value: '142',
    icon: 'mdi-rocket-launch-outline',
    color: '#1565C0',
    iconBg: '#E3F2FD',
  },
  {
    label: 'Active News',
    value: '28',
    icon: 'mdi-newspaper-variant-outline',
    color: '#2E7D32',
    iconBg: '#E8F5E9',
  },
  {
    label: 'Upcoming Events',
    value: '6',
    icon: 'mdi-calendar-star-outline',
    color: '#E65100',
    iconBg: '#FFF3E0',
  },
  {
    label: 'TBI Portals',
    value: '3',
    icon: 'mdi-office-building-outline',
    color: '#6A1B9A',
    iconBg: '#EDE7F6',
  },
]

const todayLabel = computed(() =>
  new Date().toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
)

function goToDashboard() {
  activeTBI.value = null
  activePage.value = 'dashboard'
}
function selectTBI(tbi) {
  activeTBI.value = tbi
  activePage.value = tbi.id
}
function handleLogout() {
  logoutDialog.value = true
}
async function confirmLogout() {
  try {
    await auth.signOut()
  } catch (e) {
    /* silence */
  }
  logoutDialog.value = false
  router.push('/login')
}

onMounted(async () => {
  const {
    data: { user },
  } = await auth.getCurrentUser()
  currentUser.value = user
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
.admin-app {
  font-family: 'DM Sans', sans-serif !important;
}
.admin-sidebar {
  background: linear-gradient(180deg, #0d47a1 0%, #1565c0 60%, #1976d2 100%) !important;
}
.admin-sidebar :deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
}
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 16px 16px;
}
.sidebar-brand--rail {
  justify-content: center;
  padding: 20px 0 16px;
}
.sb-logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sb-name {
  font-family: 'Playfair Display', serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
}
.sb-sub {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.5px;
  margin-top: 1px;
}
.sidebar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
}
.sidebar-user--rail {
  justify-content: center;
  padding: 12px 0;
}
.sb-user-email {
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}
.sb-user-role {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 1px;
}
.sidebar-nav :deep(.v-list-item-title) {
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  color: rgba(255, 255, 255, 0.75) !important;
}
.sidebar-nav :deep(.v-list-item__prepend .v-icon) {
  color: rgba(255, 255, 255, 0.55) !important;
  font-size: 18px !important;
}
.sidebar-nav :deep(.v-list-item--active .v-list-item-title) {
  color: #fff !important;
  font-weight: 700 !important;
}
.sidebar-nav :deep(.v-list-item--active .v-icon) {
  color: #fff !important;
}
.sidebar-nav :deep(.v-list-item--active) {
  background: rgba(255, 255, 255, 0.15) !important;
}
.sidebar-nav :deep(.v-list-item:hover:not(.v-list-item--active)) {
  background: rgba(255, 255, 255, 0.08) !important;
}
.nav-subheader {
  font-size: 0.62rem !important;
  color: rgba(255, 255, 255, 0.35) !important;
  font-weight: 700 !important;
  letter-spacing: 1.5px !important;
  text-transform: uppercase !important;
}
.nav-item--logout :deep(.v-list-item-title) {
  color: rgba(255, 160, 160, 0.8) !important;
}
.nav-item--logout :deep(.v-icon) {
  color: rgba(255, 160, 160, 0.7) !important;
}
.sidebar-toggle-wrap {
  padding: 12px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.admin-appbar :deep(.v-toolbar__content) {
  padding: 0 20px;
}
.appbar-title-block {
  display: flex;
  align-items: center;
}
.appbar-page-label {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
}
.admin-main {
  background: #f5f7fb;
}
.content-area {
  padding: 32px 36px;
  max-width: 1200px;
}
@media (max-width: 600px) {
  .content-area {
    padding: 20px 16px;
  }
}
.welcome-strip {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.welcome-greeting {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
}
.welcome-sub {
  font-size: 0.85rem;
  color: #888;
  margin-top: 4px;
}
.welcome-date {
  font-size: 0.78rem;
  color: #aaa;
  font-weight: 500;
  padding-top: 6px;
}
.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #edf0f7;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(21, 101, 192, 0.1);
}
.stat-icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
}
.stat-label {
  font-size: 0.72rem;
  color: #888;
  font-weight: 600;
  margin-top: 4px;
}
.section-eyebrow {
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 700;
  color: #1565c0;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.tbi-card {
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  min-height: 290px;
}
.tbi-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18) !important;
}
.tbi-card--navigatu {
  background: linear-gradient(145deg, #1565c0, #0d47a1);
}
.tbi-card--tara {
  background: linear-gradient(145deg, #2e7d32, #1b5e20);
}
.tbi-card--csutbi {
  background: linear-gradient(145deg, #c62828, #b71c1c);
}
.tbi-card-pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size:
    auto,
    32px 32px,
    32px 32px;
}
.tbi-card-body {
  position: relative;
  z-index: 1;
  padding: 28px;
}
.tbi-card-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
}
.tbi-card-eyebrow {
  font-size: 0.62rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 2px;
}
.tbi-card-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin: 4px 0 10px;
  line-height: 1.15;
}
.tbi-card-desc {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.65;
  margin: 0;
}
.tbi-chip {
  background: rgba(255, 255, 255, 0.12) !important;
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 0.62rem !important;
  font-weight: 600 !important;
}
.tbi-card-cta {
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 6px 16px;
  transition: background 0.18s ease;
}
.tbi-card:hover .tbi-card-cta {
  background: rgba(255, 255, 255, 0.25);
}
/* tempo
.portal-header {
}
*/
.back-btn {
  text-transform: none !important;
  font-size: 0.82rem !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
}
.portal-title-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
.portal-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
}
.portal-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.7rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}
.portal-subtitle {
  font-size: 0.82rem;
  color: #888;
  margin: 4px 0 0;
}
.action-card {
  background: #fff;
  border-radius: 18px;
  padding: 24px;
  border: 1px solid #edf0f7;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
  display: flex;
  flex-direction: column;
}
.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(21, 101, 192, 0.12) !important;
  border-color: #c5d8ff;
}
.action-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.action-title {
  font-size: 0.98rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 6px;
}
.action-desc {
  font-size: 0.78rem;
  color: #888;
  line-height: 1.6;
  margin: 0;
}
.action-arrow {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0f4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s ease;
}
.action-card:hover .action-arrow {
  background: #1565c0;
}
.action-card:hover .action-arrow :deep(.v-icon) {
  color: white !important;
}
.logout-dialog-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}
.logout-dialog-sub {
  font-size: 0.82rem;
  color: #888;
  margin: 0;
}
.fade-label-enter-active,
.fade-label-leave-active {
  transition: opacity 0.18s ease;
}
.fade-label-enter-from,
.fade-label-leave-to {
  opacity: 0;
}
</style>
