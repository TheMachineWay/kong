<template>
  <nav class="nav">
    <NavItems />
  </nav>
  <AppButton
    aria-label="Toggle navigation"
    class="navigation-bar"
    :leading-icon="barsIcon"
    type="icon"
    @click="isModalOpen = true"
  />
  <AppModal
    v-if="isModalOpen"
    type="full"
    @close="isModalOpen = false"
  >
    <div class="mobile-nav-container">
      <AppLogo @click="isModalOpen = false" />
      <NavItems @click="isModalOpen = false" />
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import AppButton from './ds/AppButton.vue'
import AppModal from './ds/AppModal.vue'
import AppLogo from './AppLogo.vue'
import NavItems from './NavItems.vue'

import barsIcon from '@/assets/images/bars.svg'

const isModalOpen = ref(false)
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.nav {
  display: flex;
  gap: 16px;
  height: 100%;
}

.navigation-bar {
  display: none;
}

@media (max-width: $mobile) {
  .nav {
    display: none;
  }

  .navigation-bar {
    display: block;
  }
}

.mobile-nav-container {
  background: linear-gradient(to bottom, var(--header-gradient-dark), var(--header-gradient-light));
  background-color: red;

  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
