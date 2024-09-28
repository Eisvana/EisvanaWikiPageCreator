<script setup lang="ts">
import { useId } from '@/helpers/id';
import { maxFileSize } from '@/variables/wikiLimits';
import type { FileUploadSelectEvent } from 'primevue/fileupload';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import InputTableItem from '../InputTableItem.vue';
import { useDropZone, useElementBounding } from '@vueuse/core';
import InputGroup from 'primevue/inputgroup';
import { computed, ref } from 'vue';
import Explainer from '../Explainer.vue';

defineProps<{
  label: string;
  tooltip?: string;
  helpImg?: string;
  helpTitle?: string;
}>();

const model = defineModel<string>({ required: true });

function onUpload(e: FileUploadSelectEvent) {
  const fileName = e.files[0]?.name;
  if (!fileName) return;
  model.value = fileName;
}

function onDrop(files: File[] | null) {
  const fileName = files?.[0]?.name;
  if (!fileName) return;
  model.value = fileName;
}

const id = useId('file-upload-');

const dropzone = ref<HTMLDivElement | null>(null);
const inputWrapper = ref<HTMLDivElement | null>(null);

const { isOverDropZone } = useDropZone(dropzone, {
  onDrop,
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
        <div class="is-flex is-justify-content-space-between full-width">
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
              :maxFileSize
              accept="image/*"
              class="p-button-sm upload-button"
              mode="basic"
              auto
              custom-upload
              @select="onUpload"
            />
          </component>
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
