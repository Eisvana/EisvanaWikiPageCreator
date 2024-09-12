<script setup lang="ts">
import Button from 'primevue/button';

const eisvanaHosts = ['wiki.eisvana.com', 'wikipagecreator.eisvana.com'];
const isEisvanaHost = eisvanaHosts.includes(window.location.host);
</script>

<template>
  <Button
    :href="isEisvanaHost ? 'https://eisvana.com' : '/'"
    as="a"
    icon="pi pi-arrow-left"
    label="View other pages"
    link
  />
</template>
