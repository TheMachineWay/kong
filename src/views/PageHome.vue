<template>
  <ServiceCatalog />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ServiceCatalog from '@/components/ServiceCatalog.vue'
import useServicesStore from '@/stores/services'

const route = useRoute()
const servicesStore = useServicesStore()

onMounted(() => {
  servicesStore.fetchServices(route.query.q as string)
})
</script>
