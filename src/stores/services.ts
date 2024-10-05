import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import usePagination from '@/composables/usePagination'

import type { TServicesStatus, IService } from '@/types'
import { PAGINATION_SIZE } from '@/constants'

const useServicesStore = defineStore('services', () => {
  const isInitialCallComplete = ref(false)
  /**
   * Three possible states of `servicesStatus`:
   * - default: request has been completed without errors
   * - loading: request is in progress
   * - error: request has failed
   */
  const servicesStatus = ref<TServicesStatus>('loading')
  const serviceList = ref<IService[]>([])

  const totalServices = computed(() => serviceList.value.length)

  const {
    currentPageNumber,
    totalPages,
    doPagination,
    resetPagination,
  } = usePagination(totalServices)

  const servicesToRender = computed(() => serviceList.value.slice(
    (currentPageNumber.value - 1) * PAGINATION_SIZE, currentPageNumber.value * PAGINATION_SIZE),
  )

  async function fetchServices(searchQuery?: string) {
    try {
      servicesStatus.value = 'loading'
      let url = '/api/services'
      if (searchQuery) {
        url = `/api/services?q=${searchQuery}`
      }
      const { data } = await axios.get(url)
      if (searchQuery && isInitialCallComplete.value) {
        resetPagination()
      }
      isInitialCallComplete.value = true
      serviceList.value = data
      servicesStatus.value = 'default'
    } catch (error) {
      console.error(error)
      servicesStatus.value = 'error'
    }
  }

  function fetchServiceById(serviceId: string) {
    return serviceList.value.find(service => service.id === serviceId) || null
  }

  return {
    servicesStatus,
    serviceList: servicesToRender,
    totalServices,
    totalPages,
    currentPageNumber,

    fetchServices,
    fetchServiceById,
    doPagination,
  }
})

export default useServicesStore
