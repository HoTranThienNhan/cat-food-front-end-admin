<script setup>
import { ref, watch, reactive, computed } from 'vue';

import AppHeader from "@/components/AppHeader.vue";
import SideBar from "@/components/SideBar.vue";
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
let user = ref(authStore?.user);

// watch the state of user (signed in or out), cart to update navbar header
watch(
    [authStore],
    () => {
        user.value = authStore?.user;
    },
    { deep: true }
);
</script>


<template>
  <div id="app">
    
    <a-row v-if="user">
      <a-col offset="0" span="4" style="height: 800px">
        <SideBar />
      </a-col>
      <a-col span="20" style="height: 800px; background-color: whitesmoke;">
        <AppHeader />
        <router-view />
      </a-col>
    </a-row>

    <a-row v-else>
      <a-col span="24" style="height: 800px; background-color: whitesmoke;">
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
