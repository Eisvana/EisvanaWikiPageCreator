<script setup lang="ts">
import { onMounted, ref, type Ref, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { pageData, staticBooleans } from '../../../variables/objects';
import { useGalleryStore, type FileItem } from '../stores/gallery';
import { addAllTooltips, explanation } from '../../tooltip';

const galleryUpload = ref<HTMLInputElement | null>(null);
const dragActive = ref(false);
const errors = ref<string[]>([]);
const tooltip = ref('');

onMounted(() => {
  nextTick(() => {
    if (!pageData.galleryExplanationExternal) return;
    tooltip.value = typeof pageData.galleryExplanationExternal === 'string' ? pageData.galleryExplanationExternal : '';
    nextTick(() => {
      if (tooltip.value) addAllTooltips();
    });
  });
});

let id = 0;

const galleryStore = useGalleryStore();
const { galleryFiles } = storeToRefs(galleryStore);

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

  const validFiles = fileArray.filter((file) => !largeFiles.includes(file));

  buildFileItem(Array.from(validFiles), galleryFiles);

  // If galleryUploadShown is true, exit the function. Otherwise, show gallery explanation popup
  if (staticBooleans.galleryUploadShown || !validFiles.length) return;

  // the galleryExplanationExternal() function should return string with the popup text. HTML is supported.
  if (pageData.galleryExplanationExternal) {
    explanation(
      'Gallery',
      `${pageData.galleryExplanationExternal}
	<div class="mt-3"><span class="has-text-weight-bold">NOTE</span>: You can access this popup at any time by clicking on the "?" next to the gallery upload button.</div>`
    );
  }
  staticBooleans.galleryUploadShown = true;
}

function buildFileItem(files: File | File[], storeLoc: Ref<FileItem[]>) {
  for (const file of [files].flat()) {
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
    <div>
      <span class="drop-title">Drop gallery files here</span>
      <button
        v-if="tooltip"
        class="tooltip"
        name="galleryFileUploadTooltip"
      >
        <data>There is a preferred order of pictures.</data>
        <data>Gallery</data>
        <data v-html="tooltip"></data>
      </button>
    </div>
    <input
      ref="galleryUpload"
      :class="{ error: errors.length }"
      accept="image/*"
      type="file"
      id="galleryUpload"
      multiple
      @change="uploadFile"
    />
  </label>
  <div
    v-if="errors.length"
    class="error-list"
  >
    <div>
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

  &.drag-active {
    * {
      pointer-events: none;
    }
  }

  .error {
    background-color: red;
  }

  .drop-title {
    font-weight: bold;
    text-align: center;
  }

  .tooltip {
    margin-inline-start: 1rem;
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
