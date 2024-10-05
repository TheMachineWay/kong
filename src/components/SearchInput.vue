<template>
  <div class="search-input-container">
    <img
      alt="search icon"
      :src="searchIcon"
    >
    <input
      v-model="searchQuery"
      class="search-input"
      data-testid="search-input"
      placeholder="Search"
    >
  </div>
</template>

<script lang="ts" setup>
import useSearch from '@/composables/useSearch'

import searchIcon from '@/assets/images/search.svg'


const { searchQuery } = useSearch()
</script>

<style lang="scss" scoped>
.search-input-container {
  align-items: center;
  background-color: var(--white);
  border: 1px solid #E7E7EC;
  border-radius: 4px;
  display: flex;
  gap: 8px;
  padding: 10px 16px 10px 8px;

  input {
    border: none;
    font-size: var(--small-font-size);

    &:focus {
      border: none;
      outline: none;
    }
  }
}
</style>