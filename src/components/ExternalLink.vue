<script setup lang="ts">
import Button from 'primevue/button';

defineProps<{
  link: string;
  text: string;
}>();
</script>

<template>
  <Button
    :href="link"
    class="link is-inline external-link is-borderless p-0 m-0"
    as="a"
    target="_blank"
    link
    >{{ text }}</Button
  >
</template>

<style scoped>
.external-link {
  font-size: inherit;
  user-select: unset;
}
</style>
