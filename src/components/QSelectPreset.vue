<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  useInput?: boolean;
  label: string;
  options: (
    | string
    | {
        label: string;
        value: string;
      }
  )[];
}>();

const options = ref(props.options);

const model = defineModel<string>({ required: true });

function filterFn(val: string, update: (ref: () => void) => void) {
  if (!val) {
    update(() => (options.value = props.options));
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = props.options.filter((v) => {
      if (typeof v === 'string') {
        return v.toLowerCase().indexOf(needle) > -1;
      } else {
        return v.label.toLowerCase().indexOf(needle) > -1;
      }
    });
  });
}
</script>

<template>
  <QSelect
    v-model="model"
    :label
    :options
    :use-input
    input-debounce="0"
    emit-value
    map-options
    outlined
    @filter="filterFn"
  />
</template>
