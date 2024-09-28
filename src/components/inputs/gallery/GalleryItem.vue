<script setup lang="ts">
import { usePageDataStore } from '@/stores/pageData';
import type { GalleryFileItem } from '@/types/gallery';
import { storeToRefs } from 'pinia';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import SmallSelect from '../SmallSelect.vue';

const props = defineProps<{
  fileItem: GalleryFileItem;
  isLocationFile: boolean;
}>();

const pageData = usePageDataStore();
const { galleryFiles, locationFiles, galleryDescriptions } = storeToRefs(pageData);

const fileObjectUrl = URL.createObjectURL(props.fileItem.file);

function removeItem(fileItem: GalleryFileItem) {
  galleryFiles.value = galleryFiles.value.filter((item) => item !== fileItem);
  locationFiles.value = locationFiles.value.filter((item) => item !== fileItem);
}

function moveItem(fileItem: GalleryFileItem, direction: 'up' | 'down') {
  const galleryIndex = galleryFiles.value.indexOf(fileItem);
  const locGalleryIndex = locationFiles.value.indexOf(fileItem);

  const activeStoreProp = (() => {
    if (galleryIndex !== -1) return galleryFiles;
    if (locGalleryIndex !== -1) return locationFiles;
    throw new Error("Couldn't find item!");
  })();

  const indexInStore = activeStoreProp.value.indexOf(fileItem);
  if (direction === 'up' && indexInStore) {
    activeStoreProp.value.splice(indexInStore - 1, 0, fileItem);
    activeStoreProp.value.splice(indexInStore + 1, 1);
  } else if (direction === 'down' && indexInStore !== activeStoreProp.value.length - 1) {
    // for some reason I cannot splice this together like I can when moving up
    const filteredArray = activeStoreProp.value.filter((item) => item !== fileItem);
    filteredArray.splice(indexInStore + 1, 0, fileItem);
    activeStoreProp.value = filteredArray;
  }
}
</script>

<template>
  <Panel class="gallery-item">
    <div class="gallery-wrapper is-flex full-width">
      <a
        class="gallery-media is-flex is-unselectable is-justify-content-center"
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
      <div class="input-section is-flex is-flex-direction-column is-flex-grow-1 is-gap-1 p-2">
        <p style="word-break: break-all"><span class="has-text-weight-bold">Name: </span>{{ fileItem.file.name }}</p>
        <div v-show="galleryDescriptions.length">
          <SmallSelect
            v-model="fileItem.desc"
            :options="galleryDescriptions"
          />
        </div>
        <div>
          <!--TODO: Add input sanitisation-->
          <InputText
            v-model="fileItem.desc"
            placeholder="Description"
            size="small"
          />
        </div>
      </div>
      <div
        class="is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center is-gap-1 p-2 ml-auto"
      >
        <!--Delete icon-->
        <Button
          class="delete-icon is-clickable"
          severity="danger"
          title="Remove picture from gallery"
          @click="removeItem(fileItem)"
        >
          ❌
        </Button>
        <!--Move handle (only if input is mouse)-->
        <span
          v-show="!isLocationFile"
          class="handle pi pi-arrows-v"
          title="Move picture up or down"
          draggable="true"
        ></span>
        <!--Move buttons (only if input is touch)-->
        <div class="button-wrapper is-flex-direction-column is-gap-1">
          <Button
            v-show="!isLocationFile"
            icon="pi pi-sort-up-fill"
            severity="secondary"
            title="Move up"
            outlined
            @click="moveItem(fileItem, 'up')"
          />
          <Button
            v-show="!isLocationFile"
            icon="pi pi-sort-down-fill"
            severity="secondary"
            title="Move down"
            outlined
            @click="moveItem(fileItem, 'down')"
          />
        </div>
      </div>
    </div>
  </Panel>
</template>

<style scoped>
.gallery-media {
  width: 200px;

  img {
    border-radius: 5px;
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
  user-select: none !important;

  &:hover {
    opacity: 1;
  }
}

.handle {
  font-size: 2.5rem;

  &:hover {
    cursor: grab;
  }

  &:active {
    cursor: grabbing;
  }
}

.button-wrapper {
  display: none;
}

.gallery-item {
  container-type: inline-size;

  &:only-child :is(.handle, .button-wrapper) {
    visibility: hidden;
  }
}

@container (width < 350px) {
  .gallery-wrapper {
    flex-wrap: wrap;

    .input-section {
      order: 2;
    }

    .gallery-media {
      max-width: 60%;
    }
  }
}

@media (pointer: coarse) {
  .handle {
    display: none;
  }

  .button-wrapper {
    display: flex;
  }
}
</style>
