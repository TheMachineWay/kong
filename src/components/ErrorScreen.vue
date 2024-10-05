<template>
  <section>
    <h2>{{ error || 'Something went wrong' }}</h2>
    <p>Sorry, we couldn't load the page you requested. Please try again later.</p>
    <div class="link-container">
      <a
        v-if="showReload"
        @click="handleReload"
      >click here to reload the page</a>
      <a href="/">click here to go to home</a>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  error?: string,
  showReload?: boolean
}>()

function handleReload() {
  window.location.reload()
}
</script>

<style lang="scss" scoped>
section {
  background-color: var(--dark-blue);
  border-radius: 8px;
  color: var(--faded-white);
  display: flex;
  flex-direction: column;
  margin: 32px 0;
  padding: 32px;
  text-align: center;


  .link-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    a {
      color: var(--faded-blue);
      cursor: pointer;
    }
  }
}
</style>