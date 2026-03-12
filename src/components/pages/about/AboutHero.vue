<template>
  <section id="about-hero" style="position:relative;padding-top:68px;overflow:hidden;">

    <!-- ── Background photo layer ── -->
    <div v-if="bgPhotoUrl" style="position:absolute;inset:0;z-index:0;">
      <img :src="bgPhotoUrl" alt="CSU TBI Campus"
        style="width:100%;height:100%;object-fit:cover;display:block;" />
      <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(17,24,16,0.90) 0%,rgba(17,24,16,0.65) 100%);" />
    </div>
    <div v-else style="position:absolute;inset:0;z-index:0;background:#111810;" />

    <!-- ── Content ── -->
    <v-container fluid class="pa-10 pa-md-16" style="position:relative;z-index:1;">
      <v-row align="center">

        <!-- Left: headline -->
        <v-col cols="12" md="7">
          <div class="d-flex align-center ga-3 mb-4">
            <v-divider length="22" color="#48A111" thickness="2" />
            <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.16em;color:rgba(72,161,17,0.8);text-transform:uppercase;">
              About TBI
            </span>
          </div>
          <div style="font-family:'Instrument Serif',serif;font-size:clamp(2.2rem,4vw,3.5rem);color:#fff;line-height:1.07;letter-spacing:-0.03em;margin-bottom:20px;">
            Legitimacy, Governance &amp;<br />
            <em style="font-style:italic;color:#48A111;">Institutional Positioning</em>
          </div>
          <p style="font-size:16px;color:rgba(255,255,255,0.5);line-height:1.74;max-width:560px;margin:0;">
            The Technology Business Incubator (TBI) is a DOST-accredited facility
            operating under the university's mandate to translate research into
            commercial and social value.
          </p>
          <div v-if="bgPhotoUrl" class="d-flex align-center ga-2 mt-5">
            <v-icon size="12" color="rgba(255,255,255,0.25)">mdi-camera-outline</v-icon>
            <span style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.25);">
              Caraga State University · Main Campus
            </span>
          </div>
        </v-col>

       

      </v-row>
    </v-container>

  </section>
</template>

<script setup>
const bgPhotoUrl = '' // → e.g. '/src/assets/about/campus.jpg'


</script>

<style scoped>
.section-index-item {
  display: block;
  text-decoration: none;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  transition: all 0.18s ease;
  border-radius: 8px;
  padding-left: 8px;
  padding-right: 8px;
  margin: 0 -8px;
}

.section-index-item:last-child {
  border-bottom: none;
}

.section-index-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.section-index-item:hover .v-icon {
  color: #48A111 !important;
  transform: translateX(3px);
  transition: transform 0.18s ease;
}
</style>
