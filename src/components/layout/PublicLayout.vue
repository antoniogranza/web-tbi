
<script setup>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
</script>


<template>
  <div>

    <Navbar />

    <v-main>
      <router-view />
    </v-main>

   <Footer />

  </div>
</template>

<style scoped>
</style>
