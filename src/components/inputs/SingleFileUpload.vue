<script setup lang="ts">
import { useId } from '@/helpers/id';
import { maxFileSize } from '@/variables/wikiLimits';
import type { FileUploadSelectEvent } from 'primevue/fileupload';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import InputTableItem from '../InputTableItem.vue';
import { useDropZone, useElementBounding, watchDebounced } from '@vueuse/core';
import InputGroup from 'primevue/inputgroup';
import { computed, ref } from 'vue';
import Explainer from '../Explainer.vue';
import { debounceDelay } from '@/variables/debounce';
import ExternalLink from '../ExternalLink.vue';

defineProps<{
  label: string;
  tooltip?: string;
  helpImg?: string;
  helpTitle?: string;
}>();

const model = defineModel<string>({ required: true });

const isTooLarge = ref(false);
const hasFileEnding = ref(true);

const isInvalid = computed(() => isTooLarge.value || !hasFileEnding.value);

watchDebounced(model, (newVal) => (hasFileEnding.value = !newVal || newVal.includes('.')), {
  debounce: debounceDelay,
});

function onUpload(e: FileUploadSelectEvent) {
  const file = e.files[0];
  if (!(file instanceof File)) return;
  updateFile([file]);
}

function updateFile(files: File[] | null) {
  const file = files?.[0];
  if (!file) return;
  const fileSize = file.size;
  const fileIsTooBig = fileSize > maxFileSize;
  isTooLarge.value = fileIsTooBig;
  if (fileIsTooBig) return;
  const fileName = file.name;
  model.value = fileName;
}

const id = useId('file-upload-');

const dropzone = ref<HTMLDivElement | null>(null);
const inputWrapper = ref<HTMLDivElement | null>(null);

const { isOverDropZone } = useDropZone(dropzone, {
  onDrop: updateFile,
  // specify the types of data to be received.
  dataTypes: (types) => types.every((type) => type.startsWith('image/')),
  // control multi-file drop
  multiple: false,
  // whether to prevent default behavior for unhandled events
  preventDefaultForUnhandled: true,
});

const { width } = useElementBounding(inputWrapper);
const smallContainerWidth = 200;
const isSmallScreen = computed(() => width.value <= smallContainerWidth);
</script>

<template>
  <div ref="dropzone">
    <InputTableItem>
      <template #label>
        <div class="is-flex is-justify-content-space-between is-align-items-center full-width">
          <label :for="id">{{ label }}</label>
          <Explainer
            v-if="tooltip"
            :help-img
            :help-title
            :tooltip
          >
            <slot></slot>
          </Explainer>
        </div>
      </template>

      <template #input>
        <div ref="inputWrapper">
          <component
            :class="{ 'is-flex is-flex-direction-column is-gap-1': isSmallScreen }"
            :is="isSmallScreen ? 'div' : InputGroup"
          >
            <InputText
              v-model="model"
              :id
              size="small"
            />
            <FileUpload
              :class="{ 'p-button-outlined': !isOverDropZone }"
              accept="image/*"
              class="p-button-sm upload-button"
              mode="basic"
              auto
              custom-upload
              @select="onUpload"
            />
          </component>
          <p
            v-if="isInvalid"
            class="help is-error"
          >
            <template v-if="isTooLarge">
              This file is too big to be uploaded to the wiki. Maximum filesize is 10MB. Compress your file here:
              <ExternalLink
                link="https://nmscd.com/Image-Compressor/"
                text="Image Compressor"
              />
            </template>

            <template v-else-if="!hasFileEnding">File has no file extension (i. e. .jpg, .png)!</template>
          </p>
        </div>
      </template>
    </InputTableItem>
  </div>
</template>

<style scoped>
:deep(.upload-button) {
  --p-inputgroup-addon-border-radius: 0;
}
</style>
