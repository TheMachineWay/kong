<template>
  <li class="service">
    <header class="header">
      <SkeletonLoader
        height="15px"
        width="50%"
      />
    </header>
    <SkeletonLoader
      height="24px"
    />
    <div class="description">
      <SkeletonLoader
        height="12px"
      />
      <SkeletonLoader
        height="12px"
        width="75%"
      />
    </div>
    <div class="metrics">
      <SkeletonLoader
        height="12px"
        width="50%"
      />
      <SkeletonLoader
        height="12px"
        width="25%"
      />
      <SkeletonLoader
        height="12px"
        width="100%"
      />
    </div>
  </li>
</template>

<script lang="ts" setup>
import SkeletonLoader from '../ds/SkeletonLoader.vue'
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.service {
  background-color: var(--white);
  border-radius: 2px;
  box-sizing: border-box;
  height: 232px;
  padding: 22px;
  width: 426px;

  .header {
    display: flex;
    padding-bottom: 18px;
    padding-top: 8px;
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-top: 12px;
  }

  .metrics {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 32px;
    }
}

@media (max-width: $tablet) {
  .service {
    width: 100%;
  }
}
</style>