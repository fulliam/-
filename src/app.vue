<template>
  <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </router-view>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
// @import './assets/styles/index.scss';
@import '/src/assets/styles/index.scss';
// @import '@/assets/styles/index.scss';

</style>
