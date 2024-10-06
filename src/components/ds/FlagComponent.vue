<template>
  <div
    class="flag"
    :class="type || 'primary'"
    :dataTestId="dataTestId || 'app-flag'"
  >
    {{ label }}
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  type?: 'primary' | 'secondary',
  label: string,
  dataTestId?: string,
}>()
</script>

<style lang="scss" scoped>
.flag {
  border-radius: 4px;
  color: var(--blue);
  font-size: var(--smallest-font-size);
  padding: 2px 6px;
  width: fit-content;
}

.primary {
  background-color: var(--faded-blue);
}

.secondary {
  background-color: var(--faded-white);

}
</style>