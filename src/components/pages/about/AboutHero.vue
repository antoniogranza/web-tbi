<template>
  <v-sheet color="#111810" style="padding-top:68px;">
    <v-container fluid class="pa-10 pa-md-16">
      <v-row align="end">
        <v-col cols="12" md="7">
          <div class="d-flex align-center ga-3 mb-4">
            <v-divider length="22" color="#48A111" thickness="2" />
            <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:rgba(72,161,17,0.8);text-transform:uppercase;">
              About TBI
            </span>
          </div>
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.2rem,4vw,3.5rem);color:#fff;line-height:1.07;letter-spacing:-0.03em;margin-bottom:20px;">
            Legitimacy, Governance &amp;<br />Institutional Positioning
          </div>
          <p style="font-size:16px;color:rgba(255,255,255,0.5);line-height:1.74;max-width:560px;margin:0;">
            The Technology Business Incubator (TBI) is a DOST-accredited facility
            operating under the university's mandate to translate research into
            commercial and social value.
          </p>
        </v-col>
        <v-col cols="12" md="4" offset-md="1">
          <v-row dense>
            <v-col v-for="s in pageStats" :key="s.label" cols="6">
              <v-sheet color="rgba(255,255,255,0.05)" rounded="lg" class="pa-5" style="border:1px solid rgba(255,255,255,0.08);">
                <div style="font-family:'Instrument Serif',serif;font-size:2rem;color:#fff;letter-spacing:-0.04em;line-height:1;margin-bottom:4px;">
                  {{ s.val }}
                </div>
                <div style="font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.04em;">{{ s.label }}</div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
const pageStats = [
  { val: '2010', label: 'Year Established'   },
  { val: 'DOST', label: 'Accreditation Body' },
  { val: 'CSU',  label: 'Host University'    },
  { val: 'TBI',  label: 'Program Type'       },
]
</script>
