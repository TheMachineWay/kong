import { ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import useServicesStore from '@/stores/services'
import { debounce } from '@/utils'

export default function useSearch() {
  const route = useRoute()
  const router = useRouter()

  const servicesStore = useServicesStore()
  const searchQuery = ref<string>(route.query.q as string || '')

  const debouncedSearchQueryWatcher = debounce(watchSearchQuery)

  function watchSearchQuery(searchTerm: string) {
    router.push({
      query: {
        ...(route.query || {}),
        q: searchTerm || undefined,
      },
    })
    nextTick(() => {
      servicesStore.fetchServices(searchTerm)
    })
  }

  watch(() => searchQuery.value, () => {
    debouncedSearchQueryWatcher(searchQuery.value)
  })

  return {
    searchQuery,
  }
}
