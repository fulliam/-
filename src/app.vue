<template>
  <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </router-view>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
@import '/src/assets/styles/index.scss';

:root {
  --nav-menu-color: #ffffff; /* Значение по умолчанию */
  --section-bg-color: rgba(0, 0, 0, 0.4); /* Значение по умолчанию */
  --font-color: #000000; /* Значение по умолчанию */
}
</style>
