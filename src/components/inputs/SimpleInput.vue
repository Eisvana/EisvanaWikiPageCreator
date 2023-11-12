<script setup lang="ts">
import InputRow from '../structure/InputRow.vue';
import Explanation from '../structure/Explanation.vue';
import ErrorMessage from './ErrorMessage.vue';

defineProps<{
  label: string;
  identifier: string;
  list?: string;
  img?: string;
  modelValue: string;
  error?: string;
  maxlength?: string;
}>();
const emit = defineEmits(['update:modelValue', 'change']);

function updateValue(e: Event) {
  if (!(e.target instanceof HTMLInputElement)) return;
  const value = e.target.value;
  emit('update:modelValue', value);
}
</script>

<template>
  <InputRow>
    <template #label>
      <label :for="identifier">{{ label }}</label>
      <Explanation
        v-if="$slots.default"
        :img="img"
      >
        <slot></slot>
        <template
          #heading
          v-if="$slots.heading"
        >
          <slot name="heading"></slot>
        </template>
        <template
          #content
          v-if="$slots.content"
        >
          <slot name="content"></slot>
        </template>
      </Explanation>
    </template>

    <template #input>
      <input
        :class="{ 'error-input': error }"
        :list="list"
        :value="modelValue"
        :id="identifier"
        :maxlength="maxlength"
        type="text"
        @input="updateValue"
        @change="$emit('change', $event)"
      />
      <ErrorMessage
        v-if="error"
        v-html="error"
      ></ErrorMessage>
    </template>
  </InputRow>
</template>
