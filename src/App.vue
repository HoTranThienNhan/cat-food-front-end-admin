<script setup>
import { ref, reactive, computed } from 'vue';

import AppHeader from "@/components/AppHeader.vue";
</script>


<template>
  <div id="app">
    <AppHeader />

    <a-row>
      <a-col offset="2" span="22">
        <router-view />
      </a-col>
    </a-row>
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
