<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGalleryStore, type FileItem } from '../stores/gallery';
import { globalFunctions, pageData } from '../../../variables/objects';
import { onMounted, ref } from 'vue';

defineProps<{
  fileItem: FileItem;
  isLoc: boolean;
}>();

const galleryStore = useGalleryStore();
const { galleryFiles, locationFiles } = storeToRefs(galleryStore);

const getUrlObject = (file: File) => URL.createObjectURL(file);

const galleryDropdownItems = ref<string[]>(Array.isArray(pageData.galleryArray) ? pageData.galleryArray : []);

function updateGalleryDropdown() {
  if (typeof globalFunctions.generateGalleryArray === 'function') globalFunctions.generateGalleryArray();
  galleryDropdownItems.value = Array.isArray(pageData.galleryArray) ? pageData.galleryArray : [];
}

onMounted(() => updateGalleryDropdown());

function removeItem(fileItem: FileItem) {
  galleryFiles.value = galleryFiles.value.filter((item) => item !== fileItem);
  locationFiles.value = locationFiles.value.filter((item) => item !== fileItem);
}

function moveItem(fileItem: FileItem, direction: 'up' | 'down') {
  const galleryIndex = galleryFiles.value.indexOf(fileItem);
  const locGalleryIndex = locationFiles.value.indexOf(fileItem);

  const activeStore = (() => {
    if (galleryIndex !== -1) return galleryFiles;
    if (locGalleryIndex !== -1) return locationFiles;
    throw new Error("Couldn't find item!");
  })();

  const indexInStore = activeStore.value.indexOf(fileItem);
  if (direction === 'up' && indexInStore) {
    activeStore.value.splice(indexInStore - 1, 0, fileItem);
    activeStore.value.splice(indexInStore + 1, 1);
  } else if (direction === 'down' && indexInStore !== activeStore.value.length - 1) {
    // for some reason I cannot splice this together like I can when moving up
    const filteredArray = activeStore.value.filter((item) => item !== fileItem);
    filteredArray.splice(indexInStore + 1, 0, fileItem);
    activeStore.value = filteredArray;
  }
}
</script>

<template>
  <div class="gallery-item">
    <a
      class="gallery-media"
      :href="getUrlObject(fileItem.file)"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        :src="getUrlObject(fileItem.file)"
        :alt="fileItem.file.name"
      />
    </a>
    <div class="gallery-meta">
      <p style="word-break: break-all"><span class="has-text-weight-bold">Name: </span>{{ fileItem.file.name }}</p>
      <div v-show="galleryDropdownItems.length">
        <select
          v-model="fileItem.desc"
          @mousedown="updateGalleryDropdown"
          @touchstart="updateGalleryDropdown"
        >
          <option
            v-for="desc in galleryDropdownItems"
            :value="desc"
            :key="desc"
          >
            {{ desc }}
          </option>
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Description"
          v-model="fileItem.desc"
        />
      </div>
    </div>
    <div class="controlButtons">
      <button
        class="delete-icon is-clickable"
        title="Remove picture from gallery"
        @click="removeItem(fileItem)"
      >
        ❌
      </button>
      <img
        v-show="!isLoc"
        class="handle"
        src="/assets/icons/arrow.svg"
        title="Move picture up or down"
        alt="Move image via drag'n'drop"
      />
      <button
        v-show="!isLoc"
        class="button moveButton"
        title="Move up"
        data-move="up"
        @click="moveItem(fileItem, 'up')"
      >
        <svg
          width="36"
          height="36"
        >
          <path d="M2 25h32L18 9 2 25Z"></path>
        </svg>
      </button>
      <button
        v-show="!isLoc"
        class="button moveButton"
        title="Move down"
        data-move="down"
        @click="moveItem(fileItem, 'down')"
      >
        <svg
          width="36"
          height="36"
        >
          <path d="M2 11h32L18 27 2 11Z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>
