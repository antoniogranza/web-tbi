// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'navigatuTheme',
    themes: {
      navigatuTheme: {
        dark: false,
        colors: {
          primary: '#1565C0',
          'primary-darken-1': '#1A237E',
          'primary-darken-2': '#0D47A1',
          secondary: '#F9A825',
          surface: '#FFFFFF',
          background: '#F5F7FB',
          success: '#2E7D32',
          warning: '#F57F17',
          error: '#C62828',
          info: '#1976D2',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      style: 'font-family: "DM Sans", sans-serif; text-transform: none; letter-spacing: 0',
    },
    VCard: {
      rounded: 'xl',
    },
  },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
