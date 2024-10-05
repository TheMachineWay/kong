<template>
  <ErrorScreen
    error="404! Page not found"
    :show-reload="false"
  />
</template>

<script lang="ts" setup>
import ErrorScreen from '@/components/ErrorScreen.vue'
</script>
