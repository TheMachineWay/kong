import { computed } from 'vue'
import { vi, describe, it, expect } from 'vitest'

import { renderComposable } from '@/testUtils'

import usePagination from './usePagination'
import { PAGINATION_SIZE } from '@/constants'

const { push, useRoute } = vi.hoisted(() => ({
  push: vi.fn(),
  useRoute: vi.fn(),
}))

vi.mock('vue-router', async (importOriginal) => {
  const vueRouter = await importOriginal() as any
  return {
    ...vueRouter,
    useRoute,
    useRouter: () => ({
      push,
    }),
  }
})

describe('usePagination', () => {
  it('should initialize with the correct current page and total pages', () => {
    useRoute.mockReturnValueOnce({ query: {} })
    const totalServices = 25
    const { result: { currentPageNumber, totalPages } } = renderComposable(() => usePagination(
      computed(() => totalServices)),
    )

    expect(currentPageNumber.value).toBe(1)
    expect(totalPages.value).toBe(Math.ceil(totalServices / PAGINATION_SIZE))
  })

  it('should should read page query from url and set correct currentPages', () => {
    useRoute.mockReturnValueOnce({
      query: { page: 3 },
    })
    const totalServices = 25
    const { result: { currentPageNumber } } = renderComposable(() => usePagination(
      computed(() => totalServices)),
    )

    expect(currentPageNumber.value).toBe(3)
  })

  it('doPagination should navigate to next page', () => {
    useRoute.mockReturnValueOnce({
      query: {},
    })
    const totalServices = 25
    const {
      result: {
        currentPageNumber, doPagination,
      } } = renderComposable(() => usePagination(computed(() => totalServices)),
    )

    expect(currentPageNumber.value).toBe(1)

    doPagination('next')

    // now page should increase by 1
    expect(currentPageNumber.value).toBe(2)
  })

  it('doPagination should navigate to previous page', () => {
    useRoute.mockReturnValueOnce({
      query: { page: 2 },
    })
    const totalServices = 25
    const {
      result: {
        currentPageNumber, doPagination,
      } } = renderComposable(() => usePagination(computed(() => totalServices)),
    )

    // since page query is 2, currentPageNumber should be 2
    expect(currentPageNumber.value).toBe(2)

    doPagination('prev')

    // now page should decrease by 1
    expect(currentPageNumber.value).toBe(1)
  })

  it('doPagination should navigate to next page but should not go beyond last page', () => {
    useRoute.mockReturnValueOnce({
      query: {},
    })
    const totalServices = 12
    const {
      result: {
        currentPageNumber, doPagination, totalPages,
      } } = renderComposable(() => usePagination(computed(() => totalServices)),
    )

    expect(currentPageNumber.value).toBe(1)

    doPagination('next')

    // reached last page
    expect(currentPageNumber.value).toBe(totalPages.value)

    doPagination('next')
    // should not go beyond last page
    expect(currentPageNumber.value).toBe(totalPages.value)
  })

  it('should not go below page 1', async () => {
    useRoute.mockReturnValueOnce({
      query: {},
    })
    const totalServices = 12
    const {
      result: {
        currentPageNumber, doPagination,
      } } = renderComposable(() => usePagination(computed(() => totalServices)),
    )

    expect(currentPageNumber.value).toBe(1)

    doPagination('prev')

    // should not go below page 1
    expect(currentPageNumber.value).toBe(1)
  })

  it('should reset to the first page', async () => {
    useRoute.mockReturnValueOnce({
      query: {},
    })
    const totalServices = 100
    const {
      result: {
        currentPageNumber, doPagination, resetPagination,
      } } = renderComposable(() => usePagination(computed(() => totalServices)),
    )

    doPagination('next')
    doPagination('next')
    doPagination('next')

    expect(currentPageNumber.value).not.toBe(1)

    resetPagination()
    expect(currentPageNumber.value).toBe(1)
  })
})
