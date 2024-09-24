<script setup lang="ts">
import { useId } from '@/helpers/id';
import { maxFileSize } from '@/variables/wikiLimits';
import type { FileUploadSelectEvent } from 'primevue/fileupload';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import InputTableItem from '../InputTableItem.vue';
import { useDropZone } from '@vueuse/core';
import InputGroup from 'primevue/inputgroup';
import { ref } from 'vue';

defineProps<{
  label: string;
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

const { isOverDropZone } = useDropZone(dropzone, {
  onDrop,
  // specify the types of data to be received.
  dataTypes: (types) => types.every((type) => type.startsWith('image/')),
  // control multi-file drop
  multiple: false,
  // whether to prevent default behavior for unhandled events
  preventDefaultForUnhandled: true,
});
</script>

<template>
  <InputTableItem>
    <template #label>
      <label :for="id">{{ label }}</label>
    </template>

    <template #input>
      <div ref="dropzone">
        <InputGroup>
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
            customUpload
            @select="onUpload"
          />
        </InputGroup>
      </div>
    </template>
  </InputTableItem>
</template>

<style scoped>
:deep(.upload-button) {
  --p-inputgroup-addon-border-radius: 0;
}
</style>
