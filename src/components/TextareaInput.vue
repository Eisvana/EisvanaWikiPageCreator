<script setup lang="ts">
import { useId } from '@/helpers/id';
import { sanitiseString } from '@/helpers/inputSanitisation';
import { useEventListener } from '@vueuse/core';
import Textarea from 'primevue/textarea';
import { ref, watchEffect, watchPostEffect } from 'vue';

const props = defineProps<{
  label: string;
  initialValue?: string;
}>();

const id = useId('textarea-');

const model = defineModel<string>({ required: true });

const initialState = ref(props.initialValue ?? model.value);

const dirtyModel = ref(initialState.value);

watchEffect(() => {
  if (props.initialValue !== undefined) initialState.value = props.initialValue;
});

watchPostEffect(() => (model.value = sanitiseString(dirtyModel.value)));

useEventListener(document, 'reset', () => {
  dirtyModel.value = initialState.value;
});
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
