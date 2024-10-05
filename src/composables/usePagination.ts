import { computed, ref, onMounted, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { PAGINATION_SIZE } from '@/constants'

export default function usePagination(totalServices: ComputedRef<number>) {
  const route = useRoute()
  const router = useRouter()

  const currentPageNumber = ref(1)
  const totalPages = computed(() => Math.ceil(totalServices.value / PAGINATION_SIZE))

  async function doPagination(direction: 'next' | 'prev') {
    let newPage: number

    if (direction === 'next') {
      newPage = Math.min(totalPages.value, currentPageNumber.value + 1)
    } else {
      newPage = Math.max(1, currentPageNumber.value - 1)
    }
    currentPageNumber.value = newPage
    router.push({
      query: {
        ...(route.query || {}),
        page: newPage === 1 ? undefined : newPage.toString(),
      },
    })
  }

  function resetPagination() {
    currentPageNumber.value = 1
    router.push({
      query: {
        ...(route.query || {}),
        page: undefined,
      },
    })
  }

  onMounted(() => {
    const page = Number(route.query.page)
    if (page) {
      currentPageNumber.value = page
    }
  })

  return {
    currentPageNumber,
    totalPages,

    doPagination,
    resetPagination,
  }
}
