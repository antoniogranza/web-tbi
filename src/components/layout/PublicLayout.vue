<script setup>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <div class="layout">
    <Navbar />
    <div class="layout__content">
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout__content {
  flex: 1;
}
</style>
