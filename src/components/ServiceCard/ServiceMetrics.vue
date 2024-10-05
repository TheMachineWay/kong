<template>
  <ul class="service-metrics">
    <li>
      <div class="marker" />
      <span class="metrics-value">{{ metrics.latency }}ms</span>
      <span class="metrics-label">latency</span>
    </li>
    <li>
      <div class="marker" />
      <span class="metrics-value">{{ (metrics.uptime * 100).toFixed(2) }}%</span>
      <span class="metrics-label">uptime</span>
    </li>
    <li>
      <div class="marker" />
      <span class="metrics-value">{{ formatNumberToReadable(metrics.requests) }}</span>
      <span class="metrics-label">requests</span>
      <div class="separator" />
      <span class="metrics-value">{{ (metrics.errors * 100).toFixed(2) }}%</span>
      <span class="metrics-label">errors</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Metrics } from '@/types'
import { formatNumberToReadable } from '@/utils'

defineProps<{
  metrics: Metrics
}>()
</script>

<style scoped lang="scss">
ul.service-metrics{
  list-style: none;
  padding-inline-start: 0px;

  li {
    align-items: center;
    display: flex;
    font-size: var(--extra-small-font-size);
    height: 20px;
    .marker {
      background-color: var(--light-green);
      border-radius: 50%;
      height: 6px;
      margin-right: 6px;
      width: 6px;
    }

    .metrics-value {
      font-weight: var(--semi-bold);
      margin-right: 4px;
    }

    .metrics-label {
      color: var(--secondary-text-color);
    }

    .separator {
      background-color: var(--default-text-color);
      height: 2px;
      margin: 0 6px;
      width: 2px;
    }
  }
}
</style>