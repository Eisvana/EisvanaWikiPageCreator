<script setup lang="ts">
import { usePageDataStore } from '@/stores/pageData';
import type { GalleryFileItem } from '@/types/gallery';
import { storeToRefs } from 'pinia';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';
import { ref } from 'vue';
import Select from 'primevue/select';
import Button from 'primevue/button';
import { useBulmaBreakpoints } from '@/composables/useBulmaBreakpoints';

const props = defineProps<{
  fileItem: GalleryFileItem;
  isLocationFile: boolean;
}>();

const breakpoints= useBulmaBreakpoints();
const activeBreakpoint = breakpoints.active()

const pageData = usePageDataStore();
const { galleryFiles, locationFiles } = storeToRefs(pageData);

const galleryDropdownItems = ref<string[]>([]);

// function updateGalleryDropdown() {
//   if (typeof globalFunctions.generateGalleryArray === 'function') globalFunctions.generateGalleryArray();
//   galleryDropdownItems.value = Array.isArray(pageData.galleryArray) ? pageData.galleryArray : [];
// }

const fileObjectUrl = URL.createObjectURL(props.fileItem.file);

function removeItem(fileItem: GalleryFileItem) {
  galleryFiles.value = galleryFiles.value.filter((item) => item !== fileItem);
  locationFiles.value = locationFiles.value.filter((item) => item !== fileItem);
}

function moveItem(fileItem: GalleryFileItem, direction: 'up' | 'down') {
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
  <Panel class="gallery-item">
    <div class="is-flex full-width">
      <a
        class="gallery-media is-flex is-justify-content-center"
        :href="fileObjectUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          :alt="fileItem.file.name"
          :src="fileObjectUrl"
          class="mx-auto"
        />
      </a>
      <div class="is-flex is-flex-direction-column is-flex-grow-1 is-gap-1 p-2 is-relative">
        <p style="word-break: break-all"><span class="has-text-weight-bold">Name: </span>{{ fileItem.file.name }}</p>
        <div v-show="galleryDropdownItems.length">
          <Select v-model="fileItem.desc">
            <option
              v-for="desc in galleryDropdownItems"
              :key="desc"
              :value="desc"
            >
              {{ desc }}
            </option>
          </Select>
        </div>
        <div>
          <InputText
          type="text"
          placeholder="Description"
          v-model="fileItem.desc"
          />
        </div>
        <p>{{activeBreakpoint}}</p>
      </div>
      <div
        class="is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center is-gap-1 p-2 pl-0"
      >
        <Button
          class="delete-icon is-clickable"
          severity="danger"
          title="Remove picture from gallery"
          @click="removeItem(fileItem)"
        >
          ❌
        </Button>
        <img
          v-show="!isLocationFile"
          class="handle"
          src="/src/assets/icons/arrow.svg"
          title="Move picture up or down"
          alt="Move via drag'n'drop"
        />
        <Button
          v-show="!isLocationFile"
          class="move-button"
          title="Move up"
          outlined
          severity="secondary"
          @click="moveItem(fileItem, 'up')"
        >
          <svg
            width="36"
            height="36"
          >
            <path d="M2 25h32L18 9 2 25Z"></path>
          </svg>
        </Button>
        <Button
          v-show="!isLocationFile"
          class="move-button"
          title="Move down"
          severity="secondary"
          outlined
          @click="moveItem(fileItem, 'down')"
        >
          <svg
            width="36"
            height="36"
          >
            <path d="M2 11h32L18 27 2 11Z"></path>
          </svg>
        </Button>
      </div>
    </div>
  </Panel>
</template>

<style scoped>
.gallery-media {
  width: 200px;

  img {
    border-radius: 0.5em;
    max-height: 150px;
    min-width: 100px;
    object-fit: contain;
  }
}

.delete-icon {
  all: unset;

  &:hover {
    all: unset;
  }
}

.delete-icon,
.handle {
  opacity: 0.7;
  user-select: none;

  &:hover {
    opacity: 1;
  }
}

.handle {
  filter: invert(var(--invert));
  width: 33px;

  &:hover {
    cursor: grab;
  }

  &:active {
    cursor: grabbing;
  }
}

.move-button {
  display: none;
}

.gallery-item:only-child :is(.handle, .move-button) {
  visibility: hidden;
}

@media (pointer: coarse) {
  .handle {
    display: none;
  }

  .move-button {
    display: flex;
  }
}
</style>
