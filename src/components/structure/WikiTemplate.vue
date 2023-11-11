<script setup lang="ts">
interface Props {
  templateName: string;
  isSingleLine?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isSingleLine: true,
});

const wrapperElement = props.isSingleLine ? 'span' : 'div';
</script>

<template>
  <component :is="wrapperElement">
    <span v-pre>{{</span>
    <span>{{ templateName }}{{ isSingleLine ? '|' : '' }}</span></component
  ><span><slot></slot></span>
  <component :is="wrapperElement">
    <span v-pre>}}</span>
  </component>
</template>
