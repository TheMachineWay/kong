<template>
  <img
    v-show="isLoaded"
    ref="imgRef"
    alt="Kong default image"
    :data-testid="imageTestId"
    :height="height || '20'"
    :src="src"
    :style="{ borderRadius: radius || 0 }"
    :width="width || '20'"
    @load="isLoaded = true"
  >
  <img
    v-if="!isLoaded"
    :alt="alt"
    class="default"
    :data-testid="loadingImageTestId"
    :height="height || '20'"
    :src="defaultImage"
    :style="{ borderRadius: radius }"
    :width="width || '20'"
  >
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import defaultImage from '@/assets/images/kong-transparent.webp'

interface IImageProps {
  src: string,
  alt: string,
  imageTestId?: string,
  loadingImageTestId?: string,
  height?: string,
  width?: string,
  radius?: '2px' | '4px' | '8px' | '50%',
}

defineProps<IImageProps>()

const isLoaded = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)

onMounted(() => {
  if (imgRef.value) {
    imgRef.value.onload = () => {
      isLoaded.value = true
    }
  }
})
</script>

<style scoped lang="scss">
.default {
  background-color: var(--faded-white);
}
</style>