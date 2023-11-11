<script setup lang="ts">
import InputRow from '../structure/InputRow.vue';
import { usePageDataStore } from '../../stores/pageData';
import { storeToRefs } from 'pinia';
import Explanation from '../structure/Explanation.vue';

const pageData = usePageDataStore();
const { picName } = storeToRefs(pageData);

function addPicName(e: Event) {
  if (!e.target || !(e.target instanceof HTMLInputElement)) return;

  const file = e.target.files?.[0];
  picName.value = file?.name ?? '';
}
</script>

<template>
  <InputRow>
    <template #label>
      <label for="picInput">Main image name, including file extension:</label>
      <Explanation>
        Picture won't be uploaded to the wiki. This is only to autofill the image name.
        <template #heading>File Upload</template>
        <template #content>
          Any pictures you upload here won't be uploaded to the wiki. This is only to autofill the image name. Maximum
          filesize is 10MB. You can upload your pictures to the wiki on
          <a
            href="Special:Upload?multiple=true"
            data-wiki
            >Special:Upload</a
          >
          <iframe
            src="https://nmscd.com/Image-Compressor/"
            title="Image Compressor"
            class="explanation-embed"
            width="450"
            height="300"
            >Image Compressor</iframe
          >
        </template>
      </Explanation>
    </template>

    <template #input>
      <input
        v-model="picName"
        type="text"
        id="picInput"
      />
      <input
        type="file"
        @change="addPicName"
      />
    </template>
  </InputRow>
</template>
