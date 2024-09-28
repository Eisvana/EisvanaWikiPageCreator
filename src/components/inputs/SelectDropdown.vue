<script setup lang="ts">
import { isObject } from '@/helpers/typeAssertions';
import type { SelectOption, SelectOptionGroup } from '@/types/selectInputOptions';
import { useEventListener } from '@vueuse/core';
import SmallSelect from './SmallSelect.vue';
import { computed, ref, watchEffect } from 'vue';

const props = defineProps<{
  options: (SelectOption | SelectOptionGroup | string)[];
  initialValue?: string | null;
  resetEvent?: string;
}>();

const model = defineModel<string | null>({ required: true });

const flattenedOptions = computed(() =>
  props.options.flatMap((item) => {
    if (typeof item === 'string') {
      return { label: item, value: item };
    } else if ('label' in item) {
      return item;
    } else if ('items' in item) {
      return item.items.flatMap((subItem) => {
        if (typeof subItem === 'string') {
          return { label: subItem, value: subItem };
        } else if ('label' in subItem) {
          return subItem;
        }
        return [];
      });
    }
    return [];
  })
);

const initialState = ref(
  props.initialValue === undefined ? (flattenedOptions.value[0]?.value ?? '') : props.initialValue
);
model.value ||= initialState.value;

watchEffect(() => {
  if (props.initialValue !== undefined) initialState.value = props.initialValue;
});

useEventListener(document, props.resetEvent ?? 'reset', () => {
  model.value = initialState.value;
});

const maxUnsearchableItemCount = 6;
const amountOfOptions = computed(() => flattenedOptions.value.length);
const showFilter = computed(() => amountOfOptions.value > maxUnsearchableItemCount);

const dataHasGroups = computed(() => isObject(props.options[0]) && 'items' in props.options[0]);

const isStringArray = (data: unknown) => Array.isArray(data) && typeof data[0] === 'string';

const dataIsPlain = computed(() => {
  if (isObject(props.options[0]) && 'items' in props.options[0]) {
    return isStringArray(props.options[0].items);
  } else {
    return isStringArray(props.options);
  }
});
</script>

<template>
  <SmallSelect
    v-model="model"
    :filter="showFilter"
    :options
    :option-group-children="dataHasGroups ? 'items' : undefined"
    :option-group-label="dataHasGroups ? 'groupLabel' : undefined"
    :option-label="dataIsPlain ? undefined : 'label'"
    :option-value="dataIsPlain ? undefined : 'value'"
  />
</template>
