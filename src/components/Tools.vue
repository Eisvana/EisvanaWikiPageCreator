<script setup lang="ts">
import { ref, type ComponentInstance } from 'vue';
import Menu from 'primevue/menu';
import Button from 'primevue/button';

const menu = ref<ComponentInstance<typeof Menu> | null>(null);

const items = [
  {
    label: 'Tools',
    items: [
      {
        label: 'Image Compressor',
        url: 'https://nmscd.com/Image-Compressor/',
      },
      {
        label: 'Glyph Reader',
        url: 'https://nmspar.vercel.app/',
      },
      {
        label: 'Portal Decoder',
        url: 'https://nmsportals.github.io/',
      },
    ],
  },
];

const toggle = (event: Event) => menu.value?.toggle(event);
</script>

<template>
  <Button
    aria-controls="overlay-menu"
    aria-haspopup="true"
    icon="pi pi-wrench"
    title="Tools"
    @click="toggle"
  />

  <Menu
    :model="items"
    :popup="true"
    id="overlay-menu"
    ref="menu"
  >
    <template #item="{ item, props }">
      <a
        v-bind="props.action"
        :href="item.url"
        rel="noopener noreferrer"
        target="_blank"
        >{{ item.label }}</a
      >
    </template>
  </Menu>
</template>
