<template>
  <v-sheet color="#F7F0F0">
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          E · Mentor Network
        </span>
      </div>
      <v-row align="end" class="mb-4">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Expert Advisors
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            Industry practitioners, investors, and academics who provide hands-on
            guidance to incubated ventures through structured mentoring engagements.
          </p>
        </v-col>
      </v-row>

      <!-- Domain filter -->
      <div class="d-flex flex-wrap ga-2 mb-8">
        <v-chip
          v-for="domain in mentorDomains" :key="domain"
          :color="activeDomain === domain ? '#25671E' : 'default'"
          :variant="activeDomain === domain ? 'flat' : 'outlined'"
          size="small" style="cursor:pointer;font-size:12px;"
          @click="activeDomain = domain"
        >
          {{ domain }}
        </v-chip>
      </div>

      <v-row>
        <v-col v-for="mentor in filteredMentors" :key="mentor.name" cols="12" sm="6" md="4">
          <v-card color="white" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
            <v-card-text class="pa-6">
              <v-row no-gutters align="start" class="mb-4">
                <v-col cols="auto">
                  <v-avatar color="#25671E" size="48" class="mr-4">
                    <span style="font-family:'Instrument Serif',serif;font-size:1.1rem;color:#fff;font-weight:700;">{{ mentor.initials }}</span>
                  </v-avatar>
                </v-col>
                <v-col>
                  <div style="font-weight:700;font-size:14px;color:#111810;">{{ mentor.name }}</div>
                  <div style="font-size:12px;color:#6B7B6A;margin-top:2px;">{{ mentor.title }}</div>
                </v-col>
              </v-row>
              <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:14px;">{{ mentor.bio }}</p>
              <div class="d-flex flex-wrap ga-2 mb-4">
                <v-chip v-for="exp in mentor.expertise" :key="exp" color="#25671E" variant="tonal" size="x-small" style="font-size:11px;">{{ exp }}</v-chip>
              </div>
              <v-divider class="mb-3" />
              <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center ga-2">
                  <v-icon size="14" color="#48A111">mdi-briefcase-outline</v-icon>
                  <span style="font-size:12px;color:#6B7B6A;">{{ mentor.years }} yrs experience</span>
                </div>
                <v-chip color="#48A111" variant="tonal" size="x-small"
                  style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.06em;text-transform:uppercase;">
                  {{ mentor.domain }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Become a mentor -->
      <v-card color="#111810" rounded="xl" elevation="0" class="mt-8">
        <v-card-text class="pa-8">
          <v-row align="center">
            <v-col cols="12" md="8">
              <div style="font-family:'Instrument Serif',serif;font-size:1.4rem;color:#fff;margin-bottom:8px;">Join the Mentor Network</div>
              <p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;margin:0;">
                Experienced practitioners and industry leaders can apply to join
                TBI's mentor roster and directly guide the next generation of
                regional tech founders.
              </p>
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-md-end">
              <v-btn to="/apply" color="#F2B50B" variant="flat" rounded="lg" append-icon="mdi-arrow-right"
                style="text-transform:none;font-weight:700;color:#111810;">
                Become a Mentor
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref, computed } from 'vue'

const mentorDomains = ['All', 'DeepTech', 'AgriTech', 'HealthTech', 'Business', 'Legal & IP', 'Investment']
const activeDomain = ref('All')

const allMentors = [
  { initials: 'JR', name: 'Jose Reyes, PhD',     title: 'CTO, TechVentures PH',         bio: 'Hardware engineer and deep tech founder with 3 successful exits. Specializes in IoT product development and embedded systems.',               expertise: ['IoT', 'Hardware', 'Product Dev'],      years: 15, domain: 'DeepTech'   },
  { initials: 'MC', name: 'Maria Cruz, MBA',     title: 'VP Strategy, Aboitiz Equity',  bio: 'Business development and corporate strategy expert with deep experience in scaling startups from seed to Series B across Southeast Asia.', expertise: ['Strategy', 'BD', 'Series A/B'],       years: 12, domain: 'Business'   },
  { initials: 'AL', name: 'Andres Lim',          title: 'Partner, Beacon Fund',          bio: 'Venture capitalist with ₱800M deployed across 34 Philippine startups. Former GFSI analyst with focus on fintech and climate tech.',         expertise: ['VC', 'Cap Tables', 'Fundraising'],    years: 10, domain: 'Investment' },
  { initials: 'RS', name: 'Rosa Santos, PhD',    title: 'AgriTech Advisor, DA-BAR',      bio: 'Agricultural scientist turned entrepreneur. Advises on agri-tech commercialization, field validation protocols, and farmer adoption.',        expertise: ['AgriTech', 'R&D', 'Farmer Linkage'], years: 18, domain: 'AgriTech'  },
  { initials: 'PV', name: 'Paolo Vergara, Atty', title: 'Senior Partner, Vergara & Co', bio: 'Intellectual property lawyer specializing in technology transfer, patent prosecution, and licensing agreements for Philippine universities.',  expertise: ['IP Law', 'Licensing', 'Patents'],      years: 14, domain: 'Legal & IP' },
  { initials: 'JT', name: 'Jane Tan',            title: 'Growth Lead, GrowthHackers PH', bio: 'Digital marketing and growth hacking specialist. Has scaled 12+ Philippine startups to 6-figure MRR through data-driven acquisition.',       expertise: ['Growth', 'Marketing', 'SEO'],         years: 8,  domain: 'Business'  },
  { initials: 'RG', name: 'Ramon Garcia, MD',    title: 'Co-founder, HealthPH',          bio: 'Physician-turned-entrepreneur with experience building health tech products for rural Philippine communities and DOH program integration.',    expertise: ['HealthTech', 'Regulatory', 'UX'],     years: 11, domain: 'HealthTech' },
  { initials: 'LM', name: 'Liza Mendoza',        title: 'Director, QBO Innovation Hub',  bio: 'Startup ecosystem builder with 9 years running accelerator programs. Expert in cohort design, mentor matchmaking, and Demo Day preparation.', expertise: ['Ecosystem', 'Accelerators', 'Pitch'],  years: 9,  domain: 'Business'  },
  { initials: 'CT', name: 'Carlos Torres, PhD',  title: 'AI Researcher, ASTI-DOST',      bio: 'Machine learning researcher and applied AI specialist. Advises startups on AI/ML architecture, data strategy, and DOST grant applications.',  expertise: ['AI/ML', 'Data Science', 'R&D'],        years: 13, domain: 'DeepTech'  },
]

const filteredMentors = computed(() =>
  activeDomain.value === 'All'
    ? allMentors
    : allMentors.filter(m => m.domain === activeDomain.value)
)
</script>