<template>
  <v-app>
    <AppHeader />
    <v-main>
      <UsersView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import UsersView from './views/UsersView.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
