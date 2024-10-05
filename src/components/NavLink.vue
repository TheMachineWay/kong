<template>
  <router-link
    active-class="selected"
    class="nav-link"
    exact-active-class="router-link-exact-active"
    :to="to"
  >
    <img
      v-if="icon"
      :alt="`${label}-icon`"
      :src="icon"
    >
    <span>{{ label }}</span>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  to: string,
  label: string,
  icon?: string,
  selected?: boolean
}>()
</script>

<style lang="scss" scoped>
.nav-link {
  align-items: center;
  color: var(--white);
  display: flex;
  font-size: var(--base-font-size);
  font-weight: var(--semi-bold);
  gap: 12px;
  padding: 24px;
  text-decoration: none;

  img {
    height: 20px;
    width: 20px;
  }

  span {
    margin: 1px 0;
  }
}

.selected {
  background-color: var(--dark-blue);
}
</style>