<template>
  <div
    class="logo"
    data-testid="logo"
    @click="emit('click')"
  >
    <router-link
      data-testid="logo-router-link"
      to="/"
    >
      <img
        alt="kong logo"
        class="kong-logo"
        data-testid="kong-logo"
        height="25.48"
        src="@/assets/images/logo.svg"
        width="29"
      >
      <img
        alt="konnect logo"
        data-testid="konnect-logo"
        height="25.48"
        src="@/assets/images/konnect.svg"
        width="99.45"
      >
    </router-link>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.logo {
  align-items: center;
  display: flex;
  padding: 0 24px;

  .kong-logo {
    margin-right: 14px;
  }
}

@media (max-width: $mobile) {
  .logo {
    padding: 16px 24px;
  }
}
</style>