<script setup lang="ts">
import { usePageDataStore } from '@/stores/pageData';
import type { GalleryFileItem } from '@/types/gallery';
import { storeToRefs } from 'pinia';

defineProps<{
  fileList?: GalleryFileItem[];
}>();

const pageData = usePageDataStore();
const { galleryFiles, locationFiles } = storeToRefs(pageData);
</script>

<template>
  <div>&lt;gallery&gt;</div>
  <div
    v-for="fileItem in fileList ?? galleryFiles"
    :key="fileItem.id"
  >
    {{ fileItem.file.name }}{{ fileItem.desc ? '|' : '' }}{{ fileItem.desc }}
  </div>
  <div>&lt;/gallery&gt;</div>
</template>
