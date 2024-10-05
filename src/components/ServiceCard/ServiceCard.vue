<template>
  <li class="service">
    <ServiceHeader
      :service="service"
      @open="emit('open')"
    />
    <h2 class="service-name">
      {{ service.name }}
    </h2>
    <p
      class="service-description"
      :title="service.description"
    >
      {{ service.description }}
    </p>
    <section class="service-meta">
      <div>
        <ServiceMetrics
          v-if="service.metrics && service.configured"
          :metrics="service.metrics"
        />
        <div
          v-else
          class="no-config"
        >
          <div class="marker" />
          <div>Not configured with runtime yet</div>
        </div>
      </div>
      <DeveloperList :service="service" />
    </section>
  </li>
</template>

<script lang="ts" setup>
import type { IService } from '@/types'

import ServiceMetrics from './ServiceMetrics.vue'
import ServiceHeader from './ServiceHeader.vue'

import DeveloperList from './DeveloperList.vue'

defineProps<{
  service: IService
}>()

const emit = defineEmits(['open'])
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
}

.service-name {
  font-size: var(--heading-2-font-size);
  font-weight: var(--semi-bold);
  line-height: 24px;
  margin-block-end: 0;
  margin-block-start: 0;
}

.service-description {
  color: var(--secondary-text-color);
  font-size: var(--extra-small-font-size);
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;

  white-space: nowrap;


  @supports (-webkit-line-clamp: 2) {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
  }
}

.service-meta {
  align-items: flex-end;
  display: flex;
  height: 60px;
  justify-content: space-between;

  .no-config {
    align-items: center;

    color: var(--secondary-text-color);
    display: flex;
    font-size: var(--extra-small-font-size);
    font-weight: var(--semi-bold);
    gap: 8px;

    .marker {
      background-color: var(--secondary-text-color);
      border-radius: 50%;
      height: 6px;
      margin-bottom: 2px;
      margin-right: 6px;
      width: 6px;
    }
  }
}

@media (max-width: $tablet) {
  .service {
    width: 100%;
  }
}
</style>