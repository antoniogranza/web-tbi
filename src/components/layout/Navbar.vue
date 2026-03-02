<script setup>
const menus = [
  
  { name: 'About', path: '/about' },
  { name: 'Program', path: '/program' },
  { name: 'Navigatu', path: '/navigatu' },
  { name: 'TARA', path: '/tara' },
  { name: 'Ecosystem', path: '/ecosystem' },
  { name: 'Impact', path: '/impact' },
  { name: 'Events', path: '/events' },
  { name: 'News', path: '/news' },
  { name: 'Apply', path: '/apply' },
]
</script>

<template>
  <v-app-bar app elevation="2" class="py-3">
    <v-toolbar-title>
  <router-link to="/" class="logo-link">
    <img src="@/assets/csulogo.png" class="navbar-logo" alt="TBI Logo" />
  </router-link>
</v-toolbar-title>

    <v-spacer />

    <router-link v-for="menu in menus" :key="menu.path" :to="menu.path" class="nav-link">
      {{ menu.name }}
    </router-link>
  </v-app-bar>
</template>

<style scoped>

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

.navbar-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}
.nav-link {
  position: relative;
  text-decoration: none;
  color: inherit;
  margin: 0 14px;
  font-weight: 500;
  padding-bottom: 6px; /* space for the bar */
  transition: color 0.2s ease;
}

/* Animated bottom bar */
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 2px;
  background-color: #1b5e20;
  transition: width 0.25s ease;
}

/* Hover effects */
.nav-link:hover {
  color: #1b5e20;
}

.nav-link:hover::after {
  width: 100%;
}
</style>
