import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: { defaultSet: 'mdi' },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#25671E',
          secondary: '#48A111',
          accent: '#F2B50B',
        }
      }
    }
  },
  defaults: {
    global: {
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    }
  }
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
