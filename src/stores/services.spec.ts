import { ref } from 'vue'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import axios from 'axios'

import useServicesStore from './services'

const { doPagination, resetPagination } = vi.hoisted(() => ({
  doPagination: vi.fn(),
  resetPagination: vi.fn(),
}))

vi.mock('@/composables/usePagination', async () => {
  return {
    default: () => ({
      currentPageNumber: ref(1),
      totalPages: ref(0),
      resetPagination,
      doPagination,
    }),
  }
})

describe('servicesStore', async () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should have correct initial values', async () => {
    const store = useServicesStore()
    const {
      servicesStatus,
      serviceList,
      totalServices,
      currentPageNumber,
      totalPages,
    } = storeToRefs(store)

    expect(servicesStatus.value).toBe('loading')
    expect(serviceList.value).toEqual([])
    expect(totalServices.value).toBe(0)

    // ensures no unexpected mutation of pagination values
    expect(currentPageNumber.value).toBe(1)
    expect(totalPages.value).toBe(0)
  })

  it('calling fetchServices without param should trigger api call to /api/services', async () => {
    const callSpy = vi.spyOn(axios, 'get').mockImplementationOnce(() => {
      return Promise.resolve({ data: [] })
    })

    const store = useServicesStore()
    await store.fetchServices()

    expect(callSpy).toHaveBeenCalledWith('/api/services')
  })

  it('calling fetchServices with param should trigger api call to /api/services?q=query', async () => {
    const callSpy = vi.spyOn(axios, 'get').mockImplementation(() => {
      return Promise.resolve({ data: [] })
    })

    const store = useServicesStore()
    await store.fetchServices('Telecom')

    expect(callSpy).toHaveBeenLastCalledWith('/api/services?q=Telecom')

    // reset pagination should be called only if it was not the first call to fetchServices
    expect(resetPagination).not.toHaveBeenCalled()
  })

  it('resetPagination should be called if fetchServices is called second time with a query', async () => {
    const callSpy = vi.spyOn(axios, 'get').mockImplementation(() => {
      return Promise.resolve({ data: [] })
    })

    const store = useServicesStore()
    await store.fetchServices()
    await store.fetchServices('Telecom')

    expect(callSpy).toHaveBeenLastCalledWith('/api/services?q=Telecom')
    expect(resetPagination).toHaveBeenCalledOnce()
  })

  it('calling doPagination should trigger call to doPagination from usePagination', async () => {
    const store = useServicesStore()

    store.doPagination('next')

    expect(doPagination).toHaveBeenCalledWith('next')
  })

  it('should update totalServices and serviceList after successful fetchServices', async () => {
    vi.spyOn(axios, 'get').mockImplementation(() => {
      return Promise.resolve({ data: [1, 2, 3] })
    })

    const store = useServicesStore()

    await store.fetchServices()

    const {
      servicesStatus,
      serviceList,
      totalServices,
    } = storeToRefs(store)

    expect(servicesStatus.value).toBe('default')
    expect(serviceList.value).toEqual([1, 2, 3])
    expect(totalServices.value).toBe(3)
  })
})
