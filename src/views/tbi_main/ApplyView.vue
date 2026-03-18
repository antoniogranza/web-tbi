
<script setup>
import { ref } from 'vue'
import StudentForm    from '../../components/pages/apply/StudentForm.vue'
import FacultyForm    from '../../components/pages/apply/FacultyForm.vue'
import StartupForm    from '../../components/pages/apply/StartupForm.vue'
import TechnologyForm from '../../components/pages/apply/TechnologyForm.vue'
import PartnerForm    from '../../components/pages/apply/PartnerForm.vue'
import MentorForm     from '../../components/pages/apply/MentorForm.vue'

const selectedPath = ref(null)

const applicationPaths = [
  { id: 'student',    icon: 'mdi-school-outline',        color: '#48A111', label: 'Apply as Student',    sub: 'Ideas & student ventures',          desc: 'For undergraduate and graduate students with innovative ideas ready for incubation.',     tag: 'Student Track'    },
  { id: 'faculty',    icon: 'mdi-flask-outline',         color: '#25671E', label: 'Apply as Faculty',    sub: 'R&D commercialization',              desc: 'For faculty members looking to commercialize research outputs through TBI.',              tag: 'Faculty Track'    },
  { id: 'startup',    icon: 'mdi-rocket-launch-outline', color: '#48A111', label: 'Apply as Startup',    sub: 'External startups',                  desc: 'For external startups seeking structured incubation support from CSU TBI.',              tag: 'Startup Track'    },
  { id: 'technology', icon: 'mdi-lightbulb-outline',     color: '#25671E', label: 'Submit Technology',   sub: 'Technology transfer',                desc: 'For researchers with a technology ready for transfer, licensing, or commercialization.',  tag: 'Tech Transfer'    },
  { id: 'partner',    icon: 'mdi-handshake-outline',     color: '#48A111', label: 'Partner With TBI',    sub: 'Collaboration & ecosystem',          desc: 'For government agencies, corporations, and organizations interested in partnering.',      tag: 'Partnership'      },
  { id: 'mentor',     icon: 'mdi-account-tie-outline',   color: '#25671E', label: 'Become a Mentor',     sub: 'Guide the next founders',            desc: 'For experienced professionals willing to mentor and advise incubated startups.',          tag: 'Mentor Network'   },
]

const selectionCriteria = [
  'Innovation and uniqueness of the solution',
  'Market potential and scalability',
  'Team capability and commitment',
  'Technical feasibility',
  'Social and economic impact',
]

const evaluationProcess = [
  'Application review — 2 weeks',
  'Pitch presentation (selected applicants)',
  'Due diligence and technical assessment',
  'Final decision notification',
  'Onboarding for accepted applicants',
]

const contactInfo = [
  { icon: 'mdi-email-outline',  label: 'Email',        value: 'applications@csu-tbi.edu.ph' },
  { icon: 'mdi-phone-outline',  label: 'Phone',        value: '+63 XXX XXX XXXX'            },
  { icon: 'mdi-clock-outline',  label: 'Office Hours', value: 'Mon–Fri, 8AM–5PM'            },
]

const cta = {
  eyebrow: 'Applications Open · Apply Early',
  headline: 'Ready to Build<br /><em style="font-style:italic;color:#F2B50B;">What\'s Next?</em>',
  body: 'Submit your application and our team will guide you<br />to the right track.',
  buttons: [
    { label: 'Start Application', to: '/apply', primary: true  },
    { label: 'Learn About TBI',   to: '/about', primary: false },
  ],
}
</script>

<template>
  <v-main style="background:#F7F0F0;">

    <!-- ── PAGE HERO ───────────────────────────────────────── -->
    <v-sheet color="#111810" style="padding-top:68px;">
      <v-container fluid class="pa-10 pa-md-16">
        <v-row align="end">
          <v-col cols="12" md="7">
            <div class="d-flex align-center ga-3 mb-4">
              <v-divider length="22" color="#48A111" thickness="2" />
              <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:rgba(72,161,17,0.8);text-transform:uppercase;">
                Applications
              </span>
            </div>
            <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.2rem,4vw,3.5rem);color:#fff;line-height:1.07;letter-spacing:-0.03em;margin-bottom:20px;">
              Apply to TBI<br />
              <em style="font-style:italic;color:#48A111;">Choose Your Track</em>
            </div>
            <p style="font-size:16px;color:rgba(255,255,255,0.5);line-height:1.74;max-width:560px;margin:0;">
              Whether you're a student founder, faculty researcher, or external startup —
              TBI has a track for you. Select your application type below to get started.
            </p>
          </v-col>

          
        </v-row>
      </v-container>
    </v-sheet>

    <!-- ── PATH SELECTION ──────────────────────────────────── -->
    <v-sheet v-if="!selectedPath" color="#F7F0F0">
      <v-container fluid class="pa-10 pa-md-16">

        <div class="d-flex align-center ga-3 mb-3">
          <v-divider length="22" color="#48A111" thickness="2" />
          <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
            Select Application Type
          </span>
        </div>
        <v-row align="end" class="mb-10">
          <v-col cols="12" md="6">
            <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
              What brings you to TBI?
            </div>
          </v-col>
          <v-col cols="12" md="5" offset-md="1">
            <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
              Each track has its own intake requirements, review timeline, and support program.
              Pick the one that best describes you.
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="path in applicationPaths" :key="path.id" cols="12" sm="6" md="4">
            <v-card
              color="white"
              rounded="xl"
              elevation="0"
              border
              style="border-color:#E8E0D8;height:100%;cursor:pointer;"
              hover
              @click="selectedPath = path.id"
            >
              <v-sheet :color="path.color" height="3" rounded="0" style="border-radius:12px 12px 0 0;opacity:0.8;" />
              <v-card-text class="pa-7">
                <v-avatar :color="path.color" variant="tonal" rounded="lg" size="48" class="mb-5">
                  <v-icon :icon="path.icon" size="22" :color="path.color" />
                </v-avatar>
                <div style="font-weight:700;font-size:15px;color:#111810;margin-bottom:8px;">
                  {{ path.label }}
                </div>
                <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:16px;">
                  {{ path.desc }}
                </p>
                <v-chip :color="path.color" variant="tonal" size="x-small"
                  style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;">
                  {{ path.tag }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-sheet>

    <!-- ── APPLICATION FORM ────────────────────────────────── -->
    <v-sheet v-else color="#F7F0F0">
      <v-container fluid class="pa-10 pa-md-16" style="max-width:900px;">

        <!-- Back + breadcrumb -->
        <div class="d-flex align-center ga-3 mb-8">
          <v-btn
            variant="tonal"
            color="#25671E"
            rounded="lg"
            size="small"
            prepend-icon="mdi-arrow-left"
            style="text-transform:none;font-family:'Inter',sans-serif;font-weight:600;font-size:13px;"
            @click="selectedPath = null"
          >
            Back
          </v-btn>
          <v-icon size="14" color="#9eaa9c">mdi-chevron-right</v-icon>
          <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6B7B6A;">
            {{ applicationPaths.find(p => p.id === selectedPath)?.label }}
          </span>
        </div>

        <StudentForm     v-if="selectedPath === 'student'"    />
        <FacultyForm     v-if="selectedPath === 'faculty'"    />
        <StartupForm     v-if="selectedPath === 'startup'"    />
        <TechnologyForm  v-if="selectedPath === 'technology'" />
        <PartnerForm     v-if="selectedPath === 'partner'"    />
        <MentorForm      v-if="selectedPath === 'mentor'"     />

      </v-container>
    </v-sheet>

    <!-- ── GUIDELINES ──────────────────────────────────────── -->
    <v-sheet color="white" border>
      <v-container fluid class="pa-10 pa-md-16">

        <div class="d-flex align-center ga-3 mb-3">
          <v-divider length="22" color="#48A111" thickness="2" />
          <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
            Application Guidelines
          </span>
        </div>
        <v-row align="end" class="mb-10">
          <v-col cols="12" md="6">
            <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
              What to Expect
            </div>
          </v-col>
        </v-row>

        <v-row class="mb-6">
          <v-col cols="12" md="6">
            <v-card color="#FAFAF8" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
              <v-card-text class="pa-7">
                <v-avatar color="#25671E" variant="tonal" rounded="lg" size="40" class="mb-5">
                  <v-icon icon="mdi-check-decagram-outline" size="20" color="#25671E" />
                </v-avatar>
                <div style="font-family:'Instrument Serif',serif;font-size:1.2rem;color:#111810;margin-bottom:16px;">Selection Criteria</div>
                <div v-for="item in selectionCriteria" :key="item" class="d-flex align-start ga-3 mb-3">
                  <v-icon size="7" color="#48A111" style="margin-top:6px;">mdi-circle</v-icon>
                  <span style="font-size:13px;color:#6B7B6A;line-height:1.65;">{{ item }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card color="#FAFAF8" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;">
              <v-card-text class="pa-7">
                <v-avatar color="#48A111" variant="tonal" rounded="lg" size="40" class="mb-5">
                  <v-icon icon="mdi-timeline-check-outline" size="20" color="#48A111" />
                </v-avatar>
                <div style="font-family:'Instrument Serif',serif;font-size:1.2rem;color:#111810;margin-bottom:16px;">Evaluation Process</div>
                <div v-for="(item, i) in evaluationProcess" :key="item" class="d-flex align-start ga-3 mb-3">
                  <v-avatar color="#48A111" variant="tonal" rounded="lg" size="22" style="flex-shrink:0;margin-top:1px;">
                    <span style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:700;color:#48A111;">{{ i + 1 }}</span>
                  </v-avatar>
                  <span style="font-size:13px;color:#6B7B6A;line-height:1.65;">{{ item }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Contact card -->
        <v-card color="#111810" rounded="xl" elevation="0">
          <v-card-text class="pa-8">
            <v-row align="center">
              <v-col cols="12" md="5">
                <div style="font-family:'Instrument Serif',serif;font-size:1.3rem;color:#fff;margin-bottom:8px;">Need Help?</div>
                <p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;margin:0;">
                  For questions about the application process, reach out during office hours.
                </p>
              </v-col>
              <v-col cols="12" md="7">
                <v-row dense>
                  <v-col v-for="c in contactInfo" :key="c.label" cols="12" sm="4">
                    <div class="d-flex align-center ga-3">
                      <v-avatar color="#48A111" variant="tonal" rounded="lg" size="36">
                        <v-icon :icon="c.icon" size="16" color="#48A111" />
                      </v-avatar>
                      <div>
                        <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);">{{ c.label }}</div>
                        <div style="font-size:13px;color:#fff;margin-top:2px;">{{ c.value }}</div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

      </v-container>
    </v-sheet>

    <CtaBand v-bind="cta" />

  </v-main>
</template>

