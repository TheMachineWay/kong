<template>
  <header class="service-header">
    <div class="service-status">
      <img
        :alt="publishedStatusConfig.alt"
        height="20"
        :src="publishedStatusConfig.icon"
        width="20"
      >
      <span>{{ publishedStatusConfig.text }}</span>
    </div>
    <AppButton
      v-if="showVersion && service.versions?.length"
      :label="versionLabel"
      size="small"
      type="secondary"
      @click="emit('open')"
    />
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import AppButton from '../ds/AppButton.vue'

import type { IService } from '@/types'
import publishedIcon from '@/assets/images/published.svg'
import inProgressIcon from '@/assets/images/in-progress.svg'
import unpublishedIcon from '@/assets/images/unpublished.svg'

interface IProps {
  service: IService
  showVersion?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  showVersion: true,
})

const emit = defineEmits(['open'])

const publishConfig = {
  published: {
    text: 'Published to portal',
    icon: publishedIcon,
    alt: 'Published',
  },
  inProgress: {
    text: 'In Progress',
    icon: inProgressIcon,
    alt: 'In Progress',
  },
  unpublished: {
    text: 'Unpublished',
    icon: unpublishedIcon,
    alt: 'Unpublished',
  },
}

const publishedStatusConfig = computed(() => {
  if (props.service.published) {
    return publishConfig.published
  }
  if (!props.service.published && !props.service.versions?.length) {
    return publishConfig.inProgress
  }
  return publishConfig.unpublished
})

const versionLabel = computed(() => {
  const text = props.service.versions?.length === 1 ? 'version' : 'versions'
  return `${props.service.versions?.length} ${text}`
})
</script>

<style lang="scss" scoped>
.service-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .service-status {
    align-items: center;
    display: flex;
    font-size: var(--extra-small-font-size);
    gap: 2px;
    height: 32px;

    img {
      margin-bottom: 2px;
    }
  }
}
</style>