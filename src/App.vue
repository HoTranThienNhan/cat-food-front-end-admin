<script setup>
import { ref, reactive, computed } from 'vue';

import AppHeader from "@/components/AppHeader.vue";
</script>


<template>
  <div id="app">
    <AppHeader />

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
