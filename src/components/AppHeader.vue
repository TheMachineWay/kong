<template>
  <header>
    <AppLogo />
    <Nav />
  </header>
</template>

<script lang="ts" setup>
import AppLogo from './AppLogo.vue'
import Nav from './AppNav.vue'
</script>


<style lang="scss" scoped>
@import '@/assets/styles/variables';

header {
  align-items: center;
  background: linear-gradient(to bottom, var(--header-gradient-dark), var(--header-gradient-light));
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
}
</style>
