<script setup lang="ts">
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import GalleryItem from './GalleryItem.vue';
import Panel from 'primevue/panel';
import Draggable from 'vuedraggable';

const pageData = usePageDataStore();
const { galleryFiles, locationFiles } = storeToRefs(pageData);

const isPreviewHidden = ref(false);

const drag = ref(false);
</script>

<template>
  <Panel
    v-if="galleryFiles.length"
    v-model:collapsed="isPreviewHidden"
    header="Gallery Preview"
    toggleable
  >
    <Draggable
      v-model="galleryFiles"
      animation="250"
      class="is-flex is-flex-direction-column is-gap-1"
      handle=".handle"
      item-key="id"
      @end="drag = false"
      @start="drag = true"
    >
      <template #item="{ element }">
        <GalleryItem
          :file-item="element"
          :is-location-file="false"
        />
      </template>
    </Draggable>
    <div
      v-if="locationFiles.length"
      class="is-flex is-flex-direction-column is-gap-1"
    >
      <p class="has-text-weight-bold is-block mb-1">Location Files</p>
      <GalleryItem
        v-for="fileItem in locationFiles"
        :file-item="fileItem"
        :key="fileItem.id"
        :is-location-file="true"
      />
    </div>
  </Panel>
</template>
