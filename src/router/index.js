import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '@/components/layout/PublicLayout.vue'
import LoginView from '@/views/LoginView.vue'

//Navigatu Routing
import AboutNavigatuView from '@/views/NavigatuPanel/AboutNavigatuView.vue'
import CoworkingNavigatuView from '@/views/NavigatuPanel/CoworkingNavigatuView.vue'
import ServiceNavigatuView from '@/views/NavigatuPanel/ServiceNavigatuView.vue'

import Home from '@/views/tbi_main/HomeView.vue'
import About from '@/views/tbi_main/AboutView.vue'
import Program from '@/views/tbi_main/ProgramView.vue'
import Navigatu from '@/views/tbi_main/NavigatuView.vue'
import Tara from '@/views/tbi_main/TaraView.vue'
import Ecosystem from '@/views/tbi_main/EcosystemView.vue'
import Impact from '@/views/tbi_main/ImpactView.vue'
import Events from '@/views/tbi_main/EventsView.vue'
import News from '@/views/tbi_main/NewsView.vue'
import Apply from '@/views/tbi_main/ApplyView.vue'

const routes = [
  // ✅ Standalone Login Route
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
      { path: 'apply', component: Apply },
    ],
  },

  // ✅ Navigatu Pages Route
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
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
