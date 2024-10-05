<template>
  <AppModal
    @close="emit('close')"
  >
    <ServiceHeader
      :service="service"
      :show-version="false"
    />
    <h2 class="service-name">
      {{ service.name }}
    </h2>
    <ServiceVersions
      v-if="service.versions"
      :type="service.type"
      :versions="service.versions"
    />
  </AppModal>
</template>

<script lang="ts" setup>
import AppModal from './ds/AppModal.vue'
import ServiceHeader from './ServiceCard/ServiceHeader.vue'
import ServiceVersions from './ServiceCard/ServiceVersions.vue'
import type { IService } from '@/types'

defineProps<{
  service: IService
}>()

const emit = defineEmits(['close'])
</script>

<style lang="scss" scoped>
.service-name {
  font-size: var(--heading-2-font-size);
  font-weight: var(--semi-bold);
  line-height: 24px;
  margin-block-end: 0;
  margin-block-start: 0;
}
</style>