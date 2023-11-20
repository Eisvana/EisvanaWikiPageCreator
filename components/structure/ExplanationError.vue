<script setup lang="ts">
import { nextTick, ref, watchEffect } from 'vue';

const props = defineProps<{
  open: boolean;
  errorMessage: string;
}>();

const translate = ref('0 -100vh');
const dialogElement = ref<HTMLDialogElement | null>(null);

defineEmits(['update:open']);

watchEffect(() => {
  if (props.open) openModal();
});

function openModal() {
  translate.value = '0 -100vh';
  nextTick(() => {
    dialogElement.value?.showModal();
    translate.value = '0 0';
  });
}
</script>

<template>
  <Teleport to="body">
    <dialog
      :style="{ translate }"
      class="explanation modal-content content"
      ref="dialogElement"
      @close="$emit('update:open', false)"
    >
      <h2 class="explanation-heading">Missing/Incorrect Data</h2>
      <div class="explanation-content">{{ errorMessage }}</div>
      <form method="dialog">
        <button
          class="button"
          type="submit"
          autofocus
        >
          Close
        </button>
      </form>
    </dialog>
  </Teleport>
</template>
