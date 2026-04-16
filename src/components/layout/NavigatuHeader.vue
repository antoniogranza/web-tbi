<template>
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
          <div class="nav-brand">NAVIGATU</div>
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
            :placeholder="searchPlaceholder"
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

  <v-navigation-drawer v-model="drawer" temporary location="right" width="260">
    <v-list nav class="pt-4">
      <v-list-item
        title="About"
        prepend-icon="mdi-information-outline"
        rounded="lg"
        class="mb-1"
        to="/about-navigatu"
        :active="route.path === '/about-navigatu'"
      />
      <v-list-item
        title="Services"
        prepend-icon="mdi-briefcase-outline"
        rounded="lg"
        class="mb-1"
        to="/services-navigatu"
        :active="route.path === '/services-navigatu'"
      />
      <v-list-item
        title="Coworking"
        prepend-icon="mdi-office-building-outline"
        rounded="lg"
        class="mb-1"
        to="/coworking-navigatu"
        :active="route.path === '/coworking-navigatu'"
      />
      <v-list-item
        title="News"
        prepend-icon="mdi-newspaper-variant-outline"
        rounded="lg"
        class="mb-1"
        to="/news-navigatu"
        :active="route.path === '/news-navigatu'"
      />
      <v-list-item
        title="Events"
        prepend-icon="mdi-calendar-outline"
        rounded="lg"
        class="mb-1"
        to="/events-navigatu"
        :active="route.path === '/events-navigatu'"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  searchPlaceholder: {
    type: String,
    default: 'Search...',
  },
})

const drawer = ref(false)
const scrolled = ref(false)
const searchQuery = ref('')
const route = useRoute()
const router = useRouter()

const onScroll = () => {
  scrolled.value = window.scrollY > 20
}

function runNavbarSearch() {
  const query = searchQuery.value.trim()
  router.push({ path: '/news-navigatu', query: query ? { q: query } : {} })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
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
</style>
