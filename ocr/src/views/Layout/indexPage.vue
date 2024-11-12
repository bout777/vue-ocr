<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutImagen from './components/LayoutImagen.vue';
import LayoutFooter from './components/LayoutFooter.vue'
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <LayoutImagen />
  <RouterView />
  <LayoutFooter />
</template>