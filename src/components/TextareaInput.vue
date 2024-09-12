<script setup lang="ts">
import { useId } from '@/helpers/id';
import Textarea from 'primevue/textarea';

defineProps<{
  label: string;
}>();

const id = useId('textarea-');
</script>

<template>
  <div class="is-flex is-flex-direction-column textarea-wrapper">
    <label :for="id">{{ label }}</label>
    <Textarea
      :id
      class="textarea"
    />
  </div>
</template>

<style scoped>
.textarea-wrapper {
  gap: 0.25rem;

  .textarea {
    resize: vertical;
    min-height: 75px;
  }
}
</style>
