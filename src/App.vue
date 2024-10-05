<template>
  <Header />
  <main>
    <router-view />
  </main>
</template>

<script lang="ts" setup>
import Header from '@/components/AppHeader.vue'
</script>

<style lang="scss">
// Unscoped styles for html and body
:root {
  // TODO: fix sizes and move to scss variables

  // Screen sizes
  --mobile: 540px; // surface duo
  --tablet: 820px; // ipad Air 820px
  --desktop: 1024px;

  // typography
  --regular: 400;
  --semi-bold: 600;
  --bold: 700;
  --smallest-font-size: 10px;
  --extra-small-font-size: 12px;
  --small-font-size: 14px;
  --base-font-size: 16px;
  --heading-2-font-size: 20px;
  --heading-font-size: 32px;

  // TODO: fix color variable and move to scss variables

  // colors
  --white: #fff;
  --faded-white: #f8f8fa;
  --green: green;
  --dark-green: #07A88D;
  --light-green: #42D782;
  --blue: #1456CB;
  --dark-blue: #072863;
  --light-blue: #5888DB;
  --faded-blue: #BDD3F9;
  --default-text-color: #3C4557;
  --secondary-text-color: #707888;
  --placeholder-color: #6F7787;
  --secondary-button-bg: #F2F6FE;
  --secondary-button-text: #5888DB;
  --header-gradient-dark: #09224F;
  --header-gradient-light: #073382;
}

html {
  font-size: 10px;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--faded-white);
  color: var(--default-text-color);
  font-size: var(--base-font-size);
  font-weight: var(--regular);
  line-height: 1.2;
  margin: 0 auto;
}

button {
  cursor: pointer;
}

.no-scroll {
  overflow: hidden;
}
</style>
