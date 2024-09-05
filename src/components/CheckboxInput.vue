<script setup lang="ts">
defineProps<{
  label: string;
}>();

const model = defineModel<string>({ required: true });
</script>

<template>
  <QCheckbox
    v-model="model"
    :label
    false-value="No"
    true-value="Yes"
  />
</template>
