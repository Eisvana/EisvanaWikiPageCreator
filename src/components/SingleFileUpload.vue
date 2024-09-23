<script setup lang="ts">
import { useId } from '@/helpers/id';
import { maxFileSize } from '@/variables/wikiLimits';
import type { FileUploadSelectEvent } from 'primevue/fileupload';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import InputTableItem from './InputTableItem.vue';

defineProps<{
  label: string;
}>();

const model = defineModel<string>({ required: true });

function onUpload(e: FileUploadSelectEvent) {
  const fileName = e.files[0]?.name;
  if (!fileName) return;
  model.value = fileName;
}

const id = useId('file-upload-');
</script>

<template>
  <InputTableItem>
    <template #label>
      <label :for="id">{{ label }}</label>
    </template>

    <template #input>
      <InputText
        v-model="model"
        :id
        class="mb-2"
        size="small"
      />
      <FileUpload
        :maxFileSize
        accept="image/*"
        class="p-button-outlined p-button-sm"
        mode="basic"
        auto
        customUpload
        @select="onUpload"
      />
    </template>
  </InputTableItem>
</template>
