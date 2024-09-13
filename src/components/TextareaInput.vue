<script setup lang="ts">
import { useId } from '@/helpers/id';
import { sanitiseString } from '@/helpers/inputSanitisation';
import Textarea from 'primevue/textarea';
import { ref, watchEffect } from 'vue';

defineProps<{
  label: string;
}>();

const id = useId('textarea-');

const model = defineModel<string>({ required: true });

const dirtyModel = ref(model.value);

watchEffect(() => (model.value = sanitiseString(dirtyModel.value)));
</script>

<template>
  <div class="is-flex is-flex-direction-column textarea-wrapper">
    <label :for="id">{{ label }}</label>
    <Textarea
      v-model="dirtyModel"
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
