<template>
  <button
    :aria-label="ariaLabel"
    :class="buttonClass"
    :data-testid="dataTestId || 'app-button'"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <span
      v-if="leadingIcon"
    >
      <img
        alt="leading icon"
        :src="leadingIcon"
      >
    </span>
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  ariaLabel?: string;
  disabled?: boolean;
  label?: string;
  leadingIcon?: string;
  type?: 'primary' | 'secondary' | 'icon';
  size?: 'large' | 'medium' | 'small';
  dataTestId?: string;
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>()

if (!props.label && !props.ariaLabel) {
  console.error('AppButton: At least one of label or ariaLabel is required')
}

const buttonClass = computed(() => {
  return `${props.size || 'medium'} ${props.type || 'primary'}`
})

</script>

<style lang="scss" scoped>
button {
  border: none;
  border-radius: 100px;
  display: flex;
  gap: 8px;
}

.primary {
  background-color: var(--dark-green);
  color: var(--white);
}

.secondary {
  background-color: var(--secondary-button-bg);
  color: var(--secondary-button-text);
}

.medium {
  font-size: var(--base-font-size);
  padding: 12px 24px 12px 16px;
}

.small {
  font-size: var(--extra-small-font-size);
  padding: 8px 16px;
}

.icon {
  background: none;
}
</style>
