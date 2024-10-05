<template>
  <div class="pagination-container">
    <AppButton
      aria-label="previous"
      :disabled="!canPaginatePrevious"
      :leading-icon="canPaginatePrevious ? backArrow : backArrowDisabled"
      type="icon"
      @click="() => servicesStore.doPagination('prev')"
    />
    <div class="pagination-message-container">
      <div>{{ servicesNumbering }}</div>
      <div>{{ totalServicesMessage }}</div>
    </div>
    <AppButton
      aria-label="next"
      :disabled="!canPaginateNext"
      :leading-icon="canPaginateNext ? forwardArrow : forwardArrowDisabled"
      type="icon"
      @click="() => servicesStore.doPagination('next')"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useServicesStore from '@/stores/services'
import { PAGINATION_SIZE } from '@/constants'
import AppButton from './ds/AppButton.vue'

import backArrow from '@/assets/images/back-arrow.svg'
import backArrowDisabled from '@/assets/images/back-arrow-disabled.svg'
import forwardArrow from '@/assets/images/forward-arrow.svg'
import forwardArrowDisabled from '@/assets/images/forward-arrow-disabled.svg'

const servicesStore = useServicesStore()
const {
  totalServices,
  currentPageNumber,
  totalPages,
} = storeToRefs(useServicesStore())

const servicesNumbering = computed(() => {
  return `${((currentPageNumber.value - 1) * PAGINATION_SIZE) + 1} to ${Math.min(currentPageNumber.value * PAGINATION_SIZE, totalServices.value)}`
})

const totalServicesMessage = computed(() => {
  return `of ${totalServices.value} services`
})

const canPaginatePrevious = computed(() => currentPageNumber.value > 1)
const canPaginateNext = computed(() => currentPageNumber.value < totalPages.value)

</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.pagination-container {
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 24px 0 48px;
}

.pagination-message-container {
  align-items: center;
  display: flex;

  font-size: var(--extra-small-font-size);
  font-weight: var(--semi-bold);
  gap: 4px;

  div:last-of-type {
    color: var(--secondary-text-color)
  }

  @media (max-width: $mobile) {
    flex-direction: column;
  }
}
</style>