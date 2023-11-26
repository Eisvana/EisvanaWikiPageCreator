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
      <label for="picInput">Nombre de la imagen principal, incluida la extensión del archivo:</label>
      <Explanation v-model:open="isOpen">
        La imagen no se cargará en la wiki. Esto es sólo para autocompletar el nombre de la imagen.
        <template #heading>Subir archivo</template>
        <template #content>
            <template v-if="!isAuto">
              Cualquier imagen que cargue aquí no se cargará en la wiki. Esto es sólo para autocompletar el nombre de la imagen. El tamaño máximo del archivo es 10 MB. Puedes subir tus fotos a la wiki en
              <WikiLink
                link="Special:Upload?multiple=true"
                text="Especial:Subir"
              />.

            <iframe
              src="https://nmscd.com/Image-Compressor/"
              title="Image Compressor"
              class="explanation-embed"
              width="450"
              height="300"
              >Compresor de imagen</iframe
            >
          </template>
          <template v-else>
            <span>
              No olvides subir tu foto a la wiki en
              <WikiLink
                link="Special:Upload?multiple=true"
                text="Especial:Subir"
              />. El botón de carga solo completa automáticamente el nombre de la imagen en el código, no se carga automáticamente en la wiki.
            </span>
            <div class="mt-3">
              <span class="has-text-weight-bold">NOTA</span>: Puede acceder a esta ventana emergente en cualquier momento haciendo clic en "?" junto al botón de carga de la imagen principal.
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
        >Este archivo es demasiado grande para cargarlo en la wiki. El tamaño máximo del archivo es 10 MB. Comprime tu archivo aquí:
        <a
          href="https://nmscd.com/Image-Compressor/"
          target="_blank"
          rel="noopener noreferrer"
          >Compresor de imagen</a
        ></ErrorMessage
      >
    </template>
  </InputRow>
</template>
