<script setup>
const menus = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Program", path: "/program" },
  { name: "Navigatu", path: "/navigatu" },
  { name: "TARA", path: "/tara" },
  { name: "Ecosystem", path: "/ecosystem" },
  { name: "Impact", path: "/impact" },
  { name: "Events", path: "/events" },
  { name: "News", path: "/news" },
  { name: "Apply", path: "/apply" }
];
</script>

<template>
  <v-app-bar app elevation="2">

    <v-toolbar-title class="font-weight-bold">
      TBI Platform
    </v-toolbar-title>

    <v-spacer />

    <v-btn
      v-for="menu in menus"
      :key="menu.path"
      text
      :to="menu.path"
    >
      {{ menu.name }}
    </v-btn>

  </v-app-bar>
</template>

<style scoped>
</style>
