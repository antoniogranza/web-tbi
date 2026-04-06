import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/utils/supabase'

import PublicLayout from '@/components/layout/PublicLayout.vue'

// Admin Routing
import AdminDashboard from '@/views/AdminPanel/AdminDashboard.vue'
import LoginView from '@/views/LoginView.vue'

// Navigatu Routing
import AboutNavigatuView from '@/views/NavigatuPanel/AboutNavigatuView.vue'
import CoworkingNavigatuView from '@/views/NavigatuPanel/CoworkingNavigatuView.vue'
import ServiceNavigatuView from '@/views/NavigatuPanel/ServiceNavigatuView.vue'
import IncubateePageView from '@/views/NavigatuPanel/IncubateePageView.vue'
import NewsNavigatuView from '@/views/NavigatuPanel/NewsNavigatuView.vue'
import NewsDetailNavigatuView from '@/views/NavigatuPanel/NewsDetailNavigatuView.vue'
import EventNavigatuView from '@/views/NavigatuPanel/EventNavigatuView.vue'
import EventDetailNavigatuView from '@/views/NavigatuPanel/EventDetailNavigatuView.vue'

// TBI Main Routing
import Home from '@/views/tbi_main/HomeView.vue'
import About from '@/views/tbi_main/AboutView.vue'
import Program from '@/views/tbi_main/ProgramView.vue'
import Navigatu from '@/views/tbi_main/NavigatuView.vue'
import Tara from '@/views/tbi_main/TaraView.vue'
import Ecosystem from '@/views/tbi_main/EcosystemView.vue'
import Impact from '@/views/tbi_main/ImpactView.vue'
import Events from '@/views/tbi_main/EventsView.vue'
import News from '@/views/tbi_main/NewsView.vue'
import NewsArticle from '@/views/tbi_main/NewsArticleView.vue'
import Apply from '@/views/tbi_main/ApplyView.vue'

// Auth guard
const requireAuth = async (to, from, next) => {
  const {
    data: { user },
  } = await auth.getCurrentUser()
  if (user) {
    next()
  } else {
    next('/login')
  }
}

// Admin guard
const requireAdmin = async (to, from, next) => {
  const {
    data: { user },
  } = await auth.getCurrentUser()
  if (user && user.user_metadata?.role === 'admin') {
    next()
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', component: Home },
      { path: 'about', component: About },
      { path: 'program', component: Program },
      { path: 'navigatu', component: Navigatu },
      { path: 'tara', component: Tara },
      { path: 'ecosystem', component: Ecosystem },
      { path: 'impact', component: Impact },
      { path: 'events', component: Events },
      { path: 'news', component: News },
      { path: 'news/:id', component: NewsArticle },
      { path: 'apply', component: Apply },
    ],
  },
  {
    path: '/about-navigatu',
    component: AboutNavigatuView,
  },
  {
    path: '/coworking-navigatu',
    component: CoworkingNavigatuView,
  },
  {
    path: '/services-navigatu',
    component: ServiceNavigatuView,
  },
  {
    path: '/incubatees/:slug',
    name: 'IncubateePage',
    component: IncubateePageView,
    beforeEnter: requireAuth,
  },
  {
    path: '/news-navigatu',
    component: NewsNavigatuView,
  },
  {
    path: '/news-navigatu/:id',
    name: 'NavigatuNewsDetail',
    component: NewsDetailNavigatuView,
  },
  {
    path: '/events-navigatu',
    component: EventNavigatuView,
  },
  {
    path: '/events-navigatu/:id',
    name: 'NavigatuEventDetail',
    component: EventDetailNavigatuView,
  },
  {
    path: '/admin',
    component: AdminDashboard,
    beforeEnter: requireAdmin,
    meta: { requiresAuth: true },
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
