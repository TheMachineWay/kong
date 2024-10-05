<template>
  <div class="service-catalog">
    <ServiceCatalogHeader />
    <div
      v-if="servicesStatus === 'loading'"
      class="catalog"
    >
      <ServiceCardLoader
        v-for="i in 12"
        :key="i"
      />
    </div>
    <ErrorScreen
      v-if="servicesStatus === 'error'"
      show-reload
    />
    <ul
      v-else-if="serviceList.length"
      class="catalog"
    >
      <ServiceCard
        v-for="service in serviceList"
        :key="service.id"
        :service="service"
        @open="() => toggleModal(service)"
      />
    </ul>
    <div
      v-else
      data-testid="no-results"
    >
      No services
    </div>
    <ServicePagination v-if="totalServices > PAGINATION_SIZE" />
  </div>
  <ServiceDetailModal
    v-if="selectedService"
    :service="selectedService"
    @close="toggleModal"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { storeToRefs } from 'pinia'
import useServicesStore from '@/stores/services'
import ServiceCatalogHeader from './ServiceCatalogHeader.vue'
import ServiceCard from './ServiceCard/ServiceCard.vue'
import ServicePagination from './ServicePagination.vue'
import { PAGINATION_SIZE } from '@/constants'
import ServiceDetailModal from './ServiceDetailModal.vue'
import ErrorScreen from './ErrorScreen.vue'
import ServiceCardLoader from './ServiceCard/ServiceCardLoader.vue'

import type { IService } from '@/types'

const route = useRoute()
const router = useRouter()

const serviceStore = useServicesStore()
const {
  servicesStatus,
  serviceList,
  totalServices,
} = storeToRefs(serviceStore)

const selectedService = ref<IService | null>(null)

// this is used as we do not have a wait to finish the services api which is fired on app load
const hasFetchedServiceDetailOnInit = ref(false)

function toggleModal(service?: IService | null) {
  if (service) {
    selectedService.value = service
    router.push({
      query: {
        ...(route.query || {}),
        service: service.id,
      },
    })
  } else {
    selectedService.value = null
    router.push({
      query: {
        ...(route.query || {}),
        service: undefined,
      },
    })
  }
}

watch(() => servicesStatus.value, () => {
  if (!hasFetchedServiceDetailOnInit.value && servicesStatus.value === 'default') {
    const fetchedService = serviceStore.fetchServiceById(route.query.service as string)
    toggleModal(fetchedService)
    hasFetchedServiceDetailOnInit.value = true
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.service-catalog {
  // max-width: 1366px;
  margin-top: 52px;
  padding: 0 24px;
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  list-style: none;
  margin: 24px 0 0 0;
  padding-inline-start: 0;
}

@media (max-width: $mobile) {
  .service-catalog  {
    margin-top: 24px;
  }
}
</style>
