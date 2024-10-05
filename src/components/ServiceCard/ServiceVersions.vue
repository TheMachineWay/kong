<template>
  <header>
    Versions ({{ versions.length }})
  </header>
  <div
    class="version-table"
    role="table"
  >
    <div
      v-for="version in versions"
      :key="version.id"
      class="row"
    >
      <div class="name-column">
        v{{ version.name }}
      </div>

      <div class="description-column">
        {{ version.description }}
      </div>

      <div class="type-column">
        <FlagComp
          :label="type"
          :type="type === 'REST' ? 'primary' : 'secondary'"
        />
      </div>

      <div class="developer-column">
        <div
          v-if="version.developer"
          class="developer-details"
        >
          <AppImage
            :alt="version.developer.name"
            radius="50%"
            :src="version.developer.avatar"
          />
          {{ version.developer.name }}
        </div>
        <div class="version-age">
          {{ timeAgo(version.updated_at) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppImage from '../ds/AppImage.vue'
import type { IVersion, TServiceType } from '@/types'
import FlagComp from '../ds/FlagComponent.vue'
import { timeAgo } from '@/utils'

defineProps<{
  versions: IVersion[],
  type: TServiceType
}>()
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

header {
  font-size: var(--base-font-size);
  font-weight: var(--semi-bold) !important;
  margin: 32px 0;
}

.version-table {
  .row {
    align-items: center;
    display: grid;
    grid-template-columns: 65px 1fr 1fr 224px;
    padding: 10px 0 12px;

    .name-column {
      font-size: var(--extra-small-font-size);
      font-weight: var(--semi-bold);
    }

    .description-column {
      color: var(--secondary-text-color);
      font-size: var(--extra-small-font-size);
      margin-right: 16px;
    }

    .developer-column {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      .developer-details {
        align-items: center;
        display: flex;
        font-size: var(--extra-small-font-size);
        font-weight: var(--semi-bold);
        gap: 6px;
      }

      .version-age {
        color: var(--secondary-text-color);
        font-size: var(--extra-small-font-size);
        margin-left: 26px;
      }
    }
  }

  .row:not(:last-child) {
    border-bottom: 1px solid #F1F1F5;
  }
}

@media (max-width: $tablet) {
  .version-table {
    .row {
      gap: 8px;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);
    }
  }
}
</style>