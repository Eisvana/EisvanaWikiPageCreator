<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGalleryStore, type FileItem } from './stores/gallery';
import { watchEffect, onMounted, ref } from 'vue';
import Sortable, { type SortableEvent } from 'sortablejs';
import GalleryItem from './components/GalleryItem.vue';
import { pageData } from '../../variables/objects';
import FileUpload from './components/FileUpload.vue';

const filePreview = ref<HTMLDivElement | null>(null);

const isPreviewHidden = ref(false);

onMounted(() => {
  if (window.matchMedia('(pointer: coarse)').matches || !filePreview.value) return;
  // prettier-ignore
  new Sortable(filePreview.value, { // NoSonar (used by a library, not useless!)
    handle: '.handle', // handle's class
    animation: 250,
    onUpdate: dragItem,
  });
});

const galleryStore = useGalleryStore();
const { galleryFiles, locationFiles } = storeToRefs(galleryStore);

function dragItem(evt: SortableEvent) {
  const oldIndex = evt.oldIndex;
  const newIndex = evt.newIndex;
  if (!(typeof oldIndex === 'number' && typeof newIndex === 'number')) return;
  const extractedItem = galleryFiles.value.splice(oldIndex, 1);
  galleryFiles.value.splice(newIndex, 0, extractedItem[0]);
}

watchEffect(() => {
  const galleryFileCount = galleryFiles.value.length;
  const locationGalleryFileCount = locationFiles.value.length;

  const totalFiles = galleryFileCount + locationGalleryFileCount;

  const maxFiles = 5;

  if (totalFiles > maxFiles && (pageData.pageType === 'fauna' || pageData.pageType === 'sandworm')) {
    const locationDescs = ['Moon Page', 'Planet Page', 'System Page', 'Galaxy Map'];
    const lowercaseDescs = locationDescs.map((item) => item.toLowerCase());
    const locationItems = galleryFiles.value.filter((item) => lowercaseDescs.includes(item.desc.toLowerCase()));

    for (let i = locationItems.length - 1; i >= 0; i--) {
      const fileItem = locationItems[i];
      const locIndex = lowercaseDescs.indexOf(fileItem.desc.toLowerCase());
      fileItem.desc = locationDescs[locIndex];

      locationFiles.value.push(fileItem);
      const index = galleryFiles.value.indexOf(fileItem);
      galleryFiles.value.splice(index, 1);
    }

    for (let i = locationFiles.value.length - 1; i >= 0; i--) {
      const fileItem = locationFiles.value[i];
      if (lowercaseDescs.includes(fileItem.desc.toLowerCase())) continue;
      moveToGalleryArray(fileItem);
    }

    locationFiles.value = locationDescs.flatMap((desc) => locationFiles.value.filter((item) => item.desc === desc));
  } else {
    for (let i = locationFiles.value.length - 1; i >= 0; i--) {
      moveToGalleryArray(locationFiles.value[i]);
    }
  }
});

function moveToGalleryArray(fileItem: FileItem) {
  galleryFiles.value.push(fileItem);
  const index = locationFiles.value.indexOf(fileItem);
  locationFiles.value.splice(index, 1);
}

function galleryFileItem(fileItem: FileItem) {
  return fileItem.file.name + (fileItem.desc ? '|' + fileItem.desc : '');
}

function togglePreview() {
  isPreviewHidden.value = !isPreviewHidden.value;
}
</script>

<template>
  <FileUpload />

  <Teleport to="#galleryItems">
    <div
      v-if="galleryFiles.length"
      class="gallery-preview-header"
    >
      <label class="has-text-weight-bold">Gallery Preview</label>
      <button
        class="button"
        @click="togglePreview"
      >
        {{ isPreviewHidden ? 'Show' : 'Hide' }}
      </button>
    </div>
    <div v-show="!isPreviewHidden">
      <div
        v-show="galleryFiles.length"
        ref="filePreview"
        class="gallery-preview"
      >
        <GalleryItem
          v-for="fileItem in galleryFiles"
          :key="fileItem.id"
          :file-item="fileItem"
          :is-loc="false"
        />
      </div>
      <div
        v-if="locationFiles.length"
        class="gallery-preview"
      >
        <label class="has-text-weight-bold is-block mb-1">Location Files</label>
        <GalleryItem
          v-for="fileItem in locationFiles"
          :key="fileItem.id"
          :file-item="fileItem"
          :is-loc="true"
        />
      </div>
    </div>
  </Teleport>

  <Teleport to="#gallery">
    <div id="gallery">
      <div>==Gallery==</div>
      <div>&lt;gallery&gt;</div>
      <div id="galleryOutput">
        <div
          v-for="fileItem in galleryFiles"
          :key="fileItem.id"
        >
          {{ galleryFileItem(fileItem) }}
        </div>
      </div>
      <div>&lt;/gallery&gt;</div>
    </div>
    <div
      id="locationGallery"
      v-if="locationFiles.length"
    >
      <br />
      <div>===Location===</div>
      <div>&lt;gallery&gt;</div>
      <div id="locationGalleryOutput">
        <div
          v-for="fileItem in locationFiles"
          :key="fileItem.id"
        >
          {{ galleryFileItem(fileItem) }}
        </div>
      </div>
      <div>&lt;/gallery&gt;</div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.gallery-preview-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin-block-end: 0.5rem;
}
</style>
