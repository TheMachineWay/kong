import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import { mount } from '@vue/test-utils'
import ServiceCatalog from './ServiceCatalog.vue'
import servicesData from '../../mocks/services'

// Mock the axios module for fetching API services
const mockedResponses = new Map()
  .set('/api/services', vi.fn(() => ({
    data: servicesData,
  })))

vi.mock('axios', async () => {
  const actual: any = await vi.importActual('axios')
  return {
    default: {
      ...actual.default,
      // Mock get request responses
      get: (url: string) => vi.fn().mockResolvedValue(mockedResponses.get(url) !== undefined
        ? mockedResponses.get(url)()
        : undefined)(),
    },
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

function mountComponent() {
  return mount(ServiceCatalog, {
    global: {
      plugins: [router],
    },
  })
}

vi.mock('vue-router', async (importOriginal) => {
  const vueRouter = await importOriginal() as any
  return {
    ...vueRouter,
    useRoute: () => ({
      query: {
        q: 'tele',
      },
    }),
  }
})

describe('ServiceCatalog', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('shows the search input', async () => {
    // No `mockedResponses` modification needed; just use the default mocked response
    const wrapper = mountComponent()

    expect(wrapper.findTestId('search-input').isVisible()).toBe(true)
  })

  it('properly handles no services returned from the API', async () => {
    // Provide a custom `mockedResponses` response payload instead of using the default mocked response
    mockedResponses.get('/api/services').mockReturnValue({
      data: [],
    })

    const wrapper = mountComponent()

    expect(wrapper.findTestId('no-results').isVisible()).toBe(true)
  })
})
