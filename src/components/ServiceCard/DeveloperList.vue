<template>
  <div
    class="developer"
  >
    <div
      v-for="developer, index in uniqueDevelopers.initialDevelopers"
      :key="developer.id"
      class="dev-image-wrapper"
      :style="{ right: `${index * 22}px`}"
    >
      <Image
        :alt="developer.name"
        height="36"
        radius="50%"
        :src="developer.avatar"
        width="36"
      />
    </div>
    <div
      v-if="uniqueDevelopers.totalCount > NUMBER_OF_DEV_TO_SHOW"
      class="additional-developers-indicator"
      :style="{ right: `${(uniqueDevelopers.initialDevelopers?.length * 22) + 2}px` }"
    >
      +{{ uniqueDevelopers.totalCount - uniqueDevelopers.initialDevelopers?.length }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { IService, IDeveloper } from '@/types'
import Image from '../ds/AppImage.vue'
import { NUMBER_OF_DEV_TO_SHOW } from '@/constants'

const props = defineProps<{
  service: IService
}>()

const uniqueDevelopers = computed(() => {
  const uniqueDeveloperIds = new Set<string>()
  const initialDevelopers = [] as IDeveloper[]

  props.service.versions?.forEach(({ developer }) => {
    const isUnseenDev = !uniqueDeveloperIds.has(developer?.id as string)
    if (developer?.id && isUnseenDev) {
      uniqueDeveloperIds.add(developer.id)
      if (initialDevelopers.length < NUMBER_OF_DEV_TO_SHOW) {
        initialDevelopers.push(developer)
      }
    }
  })

  return {
    initialDevelopers,
    totalCount: uniqueDeveloperIds.size,
  }
})
</script>

<style scoped lang="scss">
.developer {
  align-items: center;
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.dev-image-wrapper {
  position: absolute;
}

.dev-image-wrapper:first-child {
  position: static;
}

.additional-developers-indicator {
  align-items: center;
  background-color: #F1F1F8;
  border: 2px solid var(--white);
  border-radius: 50%;
  color: var(--secondary-text-color);

  display: flex;

  font-size: var(--extra-small-font-size);
  font-weight: (--semi-bold);
  height: 36px;
  justify-content: center;
  position: absolute;
  width: 36px;
}
</style>