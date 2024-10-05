<template>
  <Teleport to="#modal">
    <div
      class="modal"
      @click="emit('close')"
    >
      <main
        class="content"
        :class="type || 'default'"
        @click.stop
      >
        <AppButton
          aria-label="close icon"
          class="close-icon"
          :leading-icon="closeIcon"
          type="icon"
          @click="emit('close')"
        />
        <slot />
      </main>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

import AppButton from './AppButton.vue'
import closeIcon from '@/assets/images/close.svg'

defineProps<{
  type?: 'default' | 'full'
}>()

const emit = defineEmits(['close'])

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  document.getElementById('app')?.classList.add('no-scroll')
  document.body.classList.add('no-scroll')
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.getElementById('app')?.classList.remove('no-scroll')
  document.body.classList.remove('no-scroll')
})

</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.modal {
  align-items: center;
  background: #00000099;
  display: flex;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 999;
}

.content {
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  height: fit-content;
  margin: auto;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;


  .close-icon {
    position: absolute;
    right: 0;
    top: 0;
  }
}

.default {
  border-radius: 5px;
  max-height: 70vh;
  padding: 32px 24px;
  width: 50vw;
}

.full {
  height: 100vh;
  width: 100vw !important;
}

@media (max-width: $tablet) {
  .content {
    width: 80vw;
  }
}
</style>