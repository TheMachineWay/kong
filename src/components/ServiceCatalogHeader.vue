<template>
  <header>
    <div class="first-row">
      <h1 class="service-catalog-heading">
        Service hub
      </h1>
      <div class="service-catalog-action-container">
        <SearchInput />
        <AppButton
          label="Service Package"
          :leading-icon="plusIcon"
          @click="handleServicePackageClick"
        />
      </div>
    </div>
    <div class="second-row">
      Organize services, manage and track versioning and API service documentation.
      <a
        class="learn-more"
        href="https://konghq.com/"
        rel="noreferrer noopener"
        target="_blank"
      >
        Learn more
      </a>
    </div>
  </header>
</template>

<script lang="ts" setup>
import SearchInput from './SearchInput.vue'
import AppButton from './ds/AppButton.vue'
import plusIcon from '@/assets/images/plus.svg'

function handleServicePackageClick() {
  console.log('Service package clicked')
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.first-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .service-catalog-heading {
    margin-block-end: 0;
    margin-block-start: 0;
    margin-bottom: 16px;
  }
  .service-catalog-action-container {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  @media (max-width: $tablet) {
    .service-catalog-heading {
      font-size: 24px;
    }
  }

  @media (max-width: $mobile) {
    .service-catalog-action-container {
      gap: 8px;
      width: 100%;

      & > * {
        width: 100%;
      }
    }
  }
}

.second-row {
  .learn-more {
    color: var(--blue);
    text-decoration: none;
  }
}

@media (max-width: $tablet) {
  .second-row {
    margin-top: 16px;
  }
}
</style>
