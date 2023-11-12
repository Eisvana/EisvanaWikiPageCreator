<script setup lang="ts">
import { ref, type Ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { pageData } from '../../../variables/objects';
import { useGalleryStore, type FileItem } from '../stores/gallery';
import Explanation from '@/components/structure/Explanation.vue';
import { usePageDataStore } from '@/stores/pageData';

const galleryUpload = ref<HTMLInputElement | null>(null);
const dragActive = ref(false);
const errors = ref<string[]>([]);
const infoboxImage = ref('');
const infoboxImageInGallery = ref(false);
const tooltip = ref('');

const isOpen = ref(false);
const isAuto = ref(false);
const uploadNoticeShown = ref(false);

watchEffect(() => {
  if (isAuto.value && !isOpen.value) isAuto.value = false;
});

watchEffect(() => {
  if (!isOpen.value && !isAuto.value)
    tooltip.value = typeof pageData.galleryExplanationExternal === 'string' ? pageData.galleryExplanationExternal : '';
});

watchEffect(() => {
  if (!uploadNoticeShown.value && isOpen.value) uploadNoticeShown.value = true;
});

const galleryStore = useGalleryStore();
const { galleryFiles } = storeToRefs(galleryStore);

const pageDataStore = usePageDataStore();
const { image } = storeToRefs(pageDataStore);

function dropFile(e: DragEvent) {
  dragActive.value = false;
  const uploadedFiles = e.dataTransfer?.files;
  if (uploadedFiles?.length) addFiles(uploadedFiles);
}

function uploadFile(e: Event) {
  if (!(e.target instanceof HTMLInputElement)) return;
  const uploadedFiles = e.target.files;
  if (uploadedFiles?.length) addFiles(uploadedFiles);
}

function addFiles(files: FileList) {
  const fileArray = Array.from(files);

  const uploadSizeLimit = 10000000;

  const largeFiles = fileArray.filter((file) => file.size > uploadSizeLimit);
  errors.value = largeFiles.map((file) => file.name);

  infoboxImage.value = typeof pageData.image === 'string' ? pageData.image : image.value;
  infoboxImageInGallery.value = fileArray.map((file) => file.name).includes(infoboxImage.value);

  const validFiles = fileArray.filter((file) => !largeFiles.includes(file) && file.name !== infoboxImage.value);

  buildFileItem(Array.from(validFiles), galleryFiles);

  // If there are no valid pics, exit the function. Otherwise, show gallery explanation popup
  if (uploadNoticeShown.value || typeof pageData.galleryExplanationExternal !== 'string' || !validFiles.length) return;

  // the galleryExplanationExternal() function should return string with the popup text. HTML is supported.
  tooltip.value =
    pageData.galleryExplanationExternal +
    `<div class="mt-3"><span class="has-text-weight-bold">NOTE</span>: You can access this popup at any time by clicking on the "?" next to the gallery upload button.</div>`;
  isOpen.value = true;
  isAuto.value = true;
  uploadNoticeShown.value = true;
}

let id = 0;

function buildFileItem(files: File[], storeLoc: Ref<FileItem[]>) {
  for (const file of files) {
    storeLoc.value.unshift({
      id: id++,
      desc: '',
      file,
    });
  }
}
</script>

<template>
  <label
    for="galleryUpload"
    class="drop-container"
    :class="{ 'drag-active': dragActive }"
    @dragenter="dragActive = true"
    @dragleave="dragActive = false"
    @drop.prevent="dropFile"
    @dragover.prevent
  >
    <div class="title-wrapper">
      <span class="drop-title">Drop gallery files here</span>
      <Explanation
        v-if="tooltip"
        v-model:open="isOpen"
      >
        There is a preferred order of pictures.
        <template #heading>Gallery</template>
        <template #content><div v-html="tooltip"></div></template>
      </Explanation>
    </div>
    <input
      ref="galleryUpload"
      :class="{ error: errors.length || infoboxImageInGallery }"
      accept="image/*"
      type="file"
      id="galleryUpload"
      multiple
      @change="uploadFile"
    />
  </label>
  <div
    v-if="errors.length || infoboxImageInGallery"
    class="error-list"
  >
    <div v-if="infoboxImageInGallery">
      {{ infoboxImage }} is already in the infobox and therefore wasn't added to the gallery.
    </div>
    <div v-if="errors.length">
      The following file(s) exceed the 10MB upload limit and couldn't be added. You can compress them with the
      <a
        href="https://nmscd.com/Image-Compressor/"
        target="_blank"
        rel="noopener noreferrer"
        >Image Compressor</a
      >.
    </div>
    <div
      v-for="error in errors"
      :key="error"
    >
      {{ error }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../../scss/components/variables' as *;

.drop-container {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 175px;
  border-radius: var(--border-radius);
  border: 2px dashed var(--border-color);
  cursor: pointer;
  margin-block-end: 1rem;
  transition: background-color 0.2s ease-in-out, border 0.2s ease-in-out;

  &:hover,
  &.drag-active {
    border: 3px solid var(--border-color-hover);

    input {
      border-color: var(--border-color-hover);
    }
  }

  &.drag-active * {
    pointer-events: none;
  }

  .error {
    background-color: red;
  }

  .title-wrapper {
    display: flex;
    gap: 0.5rem;

    .drop-title {
      font-weight: bold;
      text-align: center;
    }
  }

  input {
    width: max-content;
    height: auto;
    padding: 5px;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);

    &::file-selector-button {
      padding: 10px 20px;
    }
  }
}
</style>
