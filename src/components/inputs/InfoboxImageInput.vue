<script setup lang="ts">
import InputRow from '../structure/InputRow.vue';
import { usePageDataStore } from '../../stores/pageData';
import { storeToRefs } from 'pinia';
import Explanation from '../structure/Explanation.vue';
import { ref, watchEffect } from 'vue';
import ErrorMessage from './ErrorMessage.vue';
import WikiLink from '../structure/WikiLink.vue';

const pageData = usePageDataStore();
const { image } = storeToRefs(pageData);

const isOpen = ref(false);
const isAuto = ref(false);
const uploadNoticeShown = ref(false);
const isLargeFile = ref(false);

watchEffect(() => {
  if (isAuto.value && !isOpen.value) isAuto.value = false;
});

watchEffect(() => {
  if (!uploadNoticeShown.value && isOpen.value) uploadNoticeShown.value = true;
});

const maxUploadSize = 10000000;

function addPicName(e: Event) {
  if (!e.target || !(e.target instanceof HTMLInputElement)) return;

  const file = e.target.files?.[0];
  image.value = file?.name ?? '';
  isLargeFile.value = Boolean(file && file.size > maxUploadSize);

  if (uploadNoticeShown.value || isLargeFile.value) return;
  isOpen.value = true;
  isAuto.value = true;
  uploadNoticeShown.value = true;
}
</script>

<template>
  <InputRow>
    <template #label>
      <label for="picInput">Main image name, including file extension:</label>
      <Explanation v-model:open="isOpen">
        Picture won't be uploaded to the wiki. This is only to autofill the image name.
        <template #heading>File Upload</template>
        <template #content>
          <template v-if="!isAuto">
            Any pictures you upload here won't be uploaded to the wiki. This is only to autofill the image name. Maximum
            filesize is 10MB. You can upload your pictures to the wiki on
            <WikiLink
              link="Special:Upload?multiple=true"
              text="Special:Upload"
            />.

            <iframe
              src="https://nmscd.com/Image-Compressor/"
              title="Image Compressor"
              class="explanation-embed"
              width="450"
              height="300"
              >Image Compressor</iframe
            >
          </template>
          <template v-else>
            <span>
              Don't forget to upload your picture to the wiki on
              <WikiLink
                link="Special:Upload?multiple=true"
                text="Special:Upload"
              />. The upload button only auto-filled the image name into the code, it is not automatically uploaded to
              the wiki.
            </span>
            <div class="mt-3">
              <span class="has-text-weight-bold">NOTE</span>: You can access this popup at any time by clicking on the
              "?" next to the main image upload button.
            </div>
          </template>
        </template>
      </Explanation>
    </template>

    <template #input>
      <input
        v-model="image"
        type="text"
        id="picInput"
      />
      <input
        :class="{ 'error-input': isLargeFile }"
        type="file"
        @change="addPicName"
      />
      <ErrorMessage v-if="isLargeFile"
        >This file is too big to be uploaded to the wiki. Maximum filesize is 10MB. Compress your file here:
        <a
          href="https://nmscd.com/Image-Compressor/"
          target="_blank"
          rel="noopener noreferrer"
          >Image Compressor</a
        ></ErrorMessage
      >
    </template>
  </InputRow>
</template>
