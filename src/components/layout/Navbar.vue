<script setup>
import { ref } from 'vue'

const menus = [
  { name: 'About', path: '/about' },
  { name: 'Program', path: '/program' },
  { name: 'Navigatu', path: '/navigatu' },
  { name: 'TARA', path: '/tara' },
  { name: 'Ecosystem', path: '/ecosystem' },
  { name: 'Impact', path: '/impact' },
  { name: 'Events', path: '/events' },
  { name: 'News', path: '/news' },
]

const drawerOpen = ref(false)
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}
const closeDrawer = () => {
  drawerOpen.value = false
}
</script>

<template>
  <v-app-bar elevation="0" class="glass-bar py-3">
    <v-toolbar-title>
      <router-link to="/" class="logo-link" @click="closeDrawer">
        <img src="@/assets/csulogo.png" class="navbar-logo" alt="TBI Logo" />
      </router-link>
    </v-toolbar-title>

    <v-spacer />

    <!-- Desktop nav -->
    <div class="desktop-nav">
      <router-link v-for="menu in menus" :key="menu.path" :to="menu.path" class="nav-link">
        {{ menu.name }}
      </router-link>
    </div>

    <!-- Mobile hamburger -->
    <v-btn
      class="mobile-menu-btn"
      icon
      variant="text"
      @click="toggleDrawer"
      aria-label="Toggle menu"
    >
      <div class="hamburger" :class="{ open: drawerOpen }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </v-btn>
  </v-app-bar>

  <!-- Mobile drawer overlay -->
  <Transition name="fade">
    <div v-if="drawerOpen" class="drawer-overlay" @click="closeDrawer" />
  </Transition>

  <!-- Mobile drawer -->
  <Transition name="slide-down">
    <div v-if="drawerOpen" class="mobile-drawer">
      <nav class="mobile-nav">
        <router-link
          v-for="menu in menus"
          :key="menu.path"
          :to="menu.path"
          class="mobile-nav-link"
          @click="closeDrawer"
        >
          {{ menu.name }}
        </router-link>
      </nav>
    </div>
  </Transition>
</template>

<style scoped>
:deep(.v-toolbar__content) {
  padding: 0 32px;
}

.glass-bar {
  background: rgba(247, 240, 240, 0.6) !important;
  backdrop-filter: blur(18px) saturate(160%) !important;
  -webkit-backdrop-filter: blur(18px) saturate(160%) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25) !important;
  box-shadow: 0 1px 0 0 rgba(200, 190, 185, 0.2) !important;
  z-index: 1000 !important;
}

.navbar-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

/* ── Desktop Nav ── */
.desktop-nav {
  display: flex;
  align-items: center;
}

.nav-link {
  position: relative;
  text-decoration: none;
  color: #3a3a3a;
  margin: 0 14px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -0.01em;
  padding-bottom: 6px;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 1.5px;
  background-color: #25671e;
  border-radius: 99px;
  transition: width 0.25s ease;
}

.nav-link:hover {
  color: #25671e;
}
.nav-link:hover::after {
  width: 100%;
}
.nav-link.router-link-active {
  color: #25671e;
}
.nav-link.router-link-active::after {
  width: 100%;
}

/* ── Hamburger button ── */
.mobile-menu-btn {
  display: none !important;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 22px;
  height: 16px;
}

.hamburger span {
  display: block;
  height: 2px;
  width: 100%;
  background-color: #3a3a3a;
  border-radius: 99px;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    width 0.3s ease;
  transform-origin: center;
}

/* Animate to X */
.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
  width: 0;
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Overlay ── */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  z-index: 998;
}

/* ── Mobile Drawer ── */
.mobile-drawer {
  position: fixed;
  top: 80px; /* height of app bar */
  left: 0;
  right: 0;
  z-index: 999;
  background: rgba(247, 242, 240, 0.96);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(200, 190, 185, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  padding: 8px 0 16px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
}

.mobile-nav-link {
  text-decoration: none;
  color: #3a3a3a;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  padding: 14px 32px;
  border-bottom: 1px solid rgba(200, 190, 185, 0.2);
  transition:
    color 0.2s ease,
    background 0.2s ease,
    padding-left 0.2s ease;
}

.mobile-nav-link:last-child {
  border-bottom: none;
}

.mobile-nav-link:hover {
  color: #25671e;
  background: rgba(37, 103, 30, 0.04);
  padding-left: 40px;
}

.mobile-nav-link.router-link-active {
  color: #25671e;
  font-weight: 600;
  border-left: 3px solid #25671e;
  padding-left: 29px;
}

/* ── Transitions ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-12px);
  opacity: 0;
}

/* ── Responsive Breakpoint ── */
@media (max-width: 960px) {
  .desktop-nav {
    display: none;
  }
  .mobile-menu-btn {
    display: inline-flex !important;
  }

  :deep(.v-toolbar__content) {
    padding: 0 16px;
  }
}
</style>
