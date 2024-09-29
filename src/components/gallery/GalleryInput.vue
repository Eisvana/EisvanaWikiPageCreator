<script setup lang="ts">
import { usePageDataStore } from '@/stores/pageData';
import type { GalleryFileItem } from '@/types/gallery';
import { maxFileSize } from '@/variables/wikiLimits';
import { useDropZone } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload';
import { ref } from 'vue';
import GalleryPreview from './GalleryPreview.vue';

const pageData = usePageDataStore();
const { galleryFiles, locationFiles } = storeToRefs(pageData);

let id = 0;

function onUpload(e: FileUploadSelectEvent) {
  const files: unknown = e.files;
  if (!Array.isArray(files)) return;
  const galleryItems: GalleryFileItem[] = files
    .filter((file) => file instanceof File)
    .map((file) => ({
      file,
      id: id++,
      desc: '',
    }));
  galleryFiles.value.unshift(...galleryItems);
}

function onDrop(files: File[] | null) {
  if (!files) return;
  const galleryItems: GalleryFileItem[] = files.map((file) => ({
    file,
    id: id++,
    desc: '',
  }));
  galleryFiles.value.unshift(...galleryItems);
}

const dropzone = ref<HTMLDivElement | null>(null);

const { isOverDropZone } = useDropZone(dropzone, {
  onDrop,
  // specify the types of data to be received.
  dataTypes: (types) => types.every((type) => type.startsWith('image/')),
  // control multi-file drop
  multiple: true,
  // whether to prevent default behavior for unhandled events
  preventDefaultForUnhandled: true,
});
</script>

<template>
  <div class="is-flex is-flex-direction-column is-gap-2 mt-5">
    <FileUpload
      :maxFileSize
      :show-cancel-button="false"
      :show-upload-button="false"
      accept="image/*"
      auto
      custom-upload
      multiple
      @select="onUpload"
    >
      <template #header>
        <div
          class="full-width"
          ref="dropzone"
        >
          <FileUpload
            :class="{ 'p-button-outlined': !isOverDropZone }"
            :maxFileSize
            accept="image/*"
            choose-label="Add Files"
            auto
            custom-upload
            mode="basic"
            multiple
            @select="onUpload"
          />
        </div>
      </template>
      <template #empty>
        <div class="is-flex is-justify-content-center is-align-items-center my-5">
          <p>Drop gallery files here</p>
        </div>
      </template>
    </FileUpload>

    <GalleryPreview />
  </div>
</template>
