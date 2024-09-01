<script setup lang="ts">
defineProps<{
  options: {
    label?: string;
    value?: string;
    group?: string;
    disable?: boolean;
  }[];
}>();

const model = defineModel<string>({ required: true });
</script>
<template>
  <QSelect
    v-model="model"
    :options
    label="Standard"
  >
    <template v-slot:option="scope">
      <QItemLabel
        header
        v-if="scope.opt.group"
        v-bind="scope.itemProps"
        >{{ scope.opt.group }}</QItemLabel
      >
      <QItem
        v-if="!scope.opt.group"
        v-bind="scope.itemProps"
        v-on="scope"
      >
        <QItemSection>
          <QItemLabel v-html="scope.opt.label"></QItemLabel>
          <QItemLabel caption>{{ scope.opt.description }}</QItemLabel>
        </QItemSection>
      </QItem>
    </template>
  </QSelect>
</template>
