<template>
  <v-sheet color="white" border>
    <v-container fluid class="pa-10 pa-md-16">

      <div class="d-flex align-center ga-3 mb-3">
        <v-divider length="22" color="#48A111" thickness="2" />
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:#48A111;text-transform:uppercase;">
          D · Annual Reports
        </span>
      </div>
      <v-row align="end" class="mb-10">
        <v-col cols="12" md="6">
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,2.8vw,2.5rem);color:#111810;letter-spacing:-0.025em;line-height:1.1;">
            Downloadable Reports
          </div>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <p style="font-size:14px;color:#6B7B6A;line-height:1.72;margin:0;">
            TBI submits quarterly progress, semi-annual, and annual reports to the
            University President through the OVPRDIE. Reports are also submitted to
            DOST-PCIEERD and DOST-PCAARRD per their prescribed formats.
          </p>
        </v-col>
      </v-row>

      <!-- Report cards -->
      <v-row class="mb-8">
        <v-col v-for="report in annualReports" :key="report.title" cols="12" sm="6" md="4">
          <v-card color="#FAFAF8" rounded="xl" elevation="0" border style="border-color:#E8E0D8;height:100%;" hover>
            <v-card-text class="pa-0">
              <div class="d-flex">
                <v-sheet :color="report.color" rounded="0" style="border-radius:12px 0 0 12px;min-width:6px;" />
                <div class="pa-6" style="flex:1;">
                  <div class="d-flex align-center justify-space-between mb-4">
                    <v-chip :color="report.color" variant="tonal" size="x-small"
                      style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;">
                      {{ report.type }}
                    </v-chip>
                    <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#9eaa9c;">{{ report.year }}</span>
                  </div>
                  <div style="font-weight:700;font-size:15px;color:#111810;margin-bottom:6px;">{{ report.title }}</div>
                  <p style="font-size:13px;color:#6B7B6A;line-height:1.65;margin-bottom:16px;">{{ report.desc }}</p>
                  <v-divider class="mb-4" />
                  <div class="d-flex flex-wrap ga-2 mb-4">
                    <v-chip v-for="tag in report.includes" :key="tag" variant="outlined" size="x-small"
                      style="border-color:#E8E0D8;color:#6B7B6A;font-size:10px;">
                      {{ tag }}
                    </v-chip>
                  </div>
                  <v-btn
                    :color="report.available ? report.color : '#C8C0B8'"
                    variant="tonal" rounded="lg" size="small"
                    :append-icon="report.available ? 'mdi-download' : 'mdi-clock-outline'"
                    :disabled="!report.available"
                    style="text-transform:none;font-weight:600;"
                  >
                    {{ report.available ? 'Download PDF' : 'Coming Soon' }}
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Submission note -->
      <v-alert color="#25671E" variant="tonal" rounded="xl" border="start" icon="mdi-information-outline">
        <div style="font-size:14px;color:#25671E;line-height:1.7;">
          Per TBI Manual of Operations, all progress reports are submitted quarterly to the
          OVPRDIE, 15 days after the end of each quarter. Terminal reports are submitted
          within 2 months of program completion. Reports for externally-funded programs
          (DOST-PCIEERD, DOST-PCAARRD) follow the respective funding agency's prescribed format.
        </div>
      </v-alert>

    </v-container>
  </v-sheet>
</template>

<script setup>
const annualReports = [
  {
    year: '2024', type: 'Annual Report', color: '#25671E',
    title: 'TBI Annual Report 2024',
    desc: 'Full-year performance report covering NAVIGATÚ and TARA-ATBI programs, IP filings, startup progress, and economic indicators for FY 2024.',
    includes: ['Startup Metrics', 'IP Portfolio', 'Financial Report', 'DOST Compliance'],
    available: false,
  },
  {
    year: '2023', type: 'Annual Report', color: '#48A111',
    title: 'TBI Annual Report 2023',
    desc: 'Covers the third year of NAVIGATÚ operations and first year of TARA-ATBI. Includes IPOPHIL Platinum Award documentation and cohort outcomes.',
    includes: ['Cohort Outcomes', 'IPOPHIL Data', 'IP Filings', 'LGU Adoptions'],
    available: false,
  },
  {
    year: '2022', type: 'Annual Report', color: '#e09000',
    title: 'TBI Annual Report 2022',
    desc: 'Second full year of NAVIGATÚ, featuring startup graduation metrics, MapX commercialization progress, and ecosystem partnership milestones.',
    includes: ['MapX Adoption', 'Graduation Data', 'Partnership MOUs', 'IP Report'],
    available: false,
  },
  {
    year: '2024 Q3', type: 'Progress Report', color: '#25671E',
    title: 'NAVIGATÚ Q3 Progress Report',
    desc: 'Quarterly report submitted to DOST-PCIEERD covering startup milestones, mentorship sessions, bootcamp outcomes, and facility utilization.',
    includes: ['Startup KPIs', 'Mentor Log', 'Facility Usage', 'Financial Status'],
    available: false,
  },
  {
    year: '2024 Q3', type: 'Progress Report', color: '#48A111',
    title: 'TARA-ATBI Q3 Progress Report',
    desc: 'Quarterly report to DOST-PCAARRD detailing agri-aqua startup progress, field validation activities, and farmer linkage program outcomes.',
    includes: ['Startup KPIs', 'Field Validation', 'Farmer Linkages', 'R&D Transfer'],
    available: false,
  },
  {
    year: 'Annual', type: 'Sustainability Report', color: '#25671E',
    title: 'TBI Sustainability Framework Report',
    desc: 'Covers TBI revenue mechanisms including royalty collection, facility rentals, and reinvestment policies per the TBI Manual of Operations.',
    includes: ['Revenue Model', 'Royalty Data', 'Reinvestment Policy', 'Outlook'],
    available: false,
  },
]
</script>