<script setup lang="ts">
import { sanitiseString } from "../../common";
import InputRow from "../structure/InputRow.vue";
import Explanation from "../structure/Explanation.vue";

const props = defineProps({
  label: String,
  identifier: String,
  list: { type: String, required: false },
  img: { type: String, required: false },
  modelValue: String,
  modelModifiers: { default: () => ({}) },
});
const emit = defineEmits(["update:modelValue"]);

function updateValue(e: Event) {
  if (!(e.target instanceof HTMLInputElement)) return;
  const value = e.target.value;
  const returnValue =
    "sanitise" in props.modelModifiers ? sanitiseString(value) : value;
  emit("update:modelValue", returnValue);
}
</script>

<template>
  <InputRow>
    <template #label>
      <label :for="identifier">{{ label }}</label>
      <Explanation v-if="$slots.default" :img="img"><slot></slot></Explanation>
    </template>

    <template #input>
      <input
        :list="list"
        :value="modelValue"
        :id="identifier"
        type="text"
        @input="updateValue"
      />
    </template>
  </InputRow>
</template>
