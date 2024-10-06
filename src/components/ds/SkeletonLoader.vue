<template>
  <div
    class="loader"
    :data-testid="dataTestId"
    :style="{ height, width, borderRadius: radius }"
  />
</template>

<script setup lang="ts">
interface Props {
  dataTestId?: string,
  height?: string,
  width?: string,
  radius?: string,
}

withDefaults(defineProps<Props>(), {
  dataTestId: 'skeleton-loader',
  height: '32px',
  width: '100%',
  radius: '4px',
})
</script>

<style lang="scss" scoped>
.loader {
  animation: loading 1s infinite linear;
  background: linear-gradient(90deg, #d2d2d2 25%, #a3a3a3 50%, #d2d2d2 75%);
  background-size: 200% 100%;
}

@keyframes loading {
  0% {
      background-position: 100% 0;
  }
  50% {
      background-position: 0 0;
  }
}

</style>