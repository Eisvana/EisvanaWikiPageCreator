<script setup lang="ts">
import { sanitiseString } from '@/helper/inputSanitisation';
import { computed, ref, watchEffect } from 'vue';
import type { QInputProps } from 'quasar';

const props = defineProps<{
  label: string;
  error?: boolean;
  errorMessage?: string;
  type?: QInputProps['type'];
  helpTitle?: string;
  helpImg?: string;
  tooltip?: string;
}>();

// TODO: This isn't auto-populated at startup anymore if there are defaults set. Fix this.
const model = defineModel<string>();
const dirtyModel = defineModel<string>('dirty');

watchEffect(() => (model.value = sanitiseString(dirtyModel.value ?? '')));

const isOpen = ref(false);

const helperImage = computed(() => `/src/assets/images/${props.helpImg}.webp`);
</script>

<template>
  <QInput
    v-model.trim="dirtyModel"
    :error
    :error-message
    :label
    :type
    dense
    outlined
  >
    <template
      v-if="helpTitle || tooltip"
      #append
    >
      <QBtn
        :class="{ 'disable-override': !helpTitle }"
        :disable="!helpTitle"
        icon="help"
        fab-mini
        flat
        @click="isOpen = true"
      >
        <QTooltip
          v-if="tooltip"
          :offset="[0, 0]"
          anchor="top middle"
          class="tooltip"
          max-width="150px"
          self="bottom middle"
          >{{ tooltip }}</QTooltip
        >
      </QBtn>

      <QDialog v-model="isOpen">
        <QCard class="card-wrapper full-width">
          <QCardSection>
            <h2 class="text-h4 no-margin text-center">{{ helpTitle }}</h2>
          </QCardSection>
          <QCardSection class="text-center">
            <slot></slot>
          </QCardSection>
          <QCardSection>
            <a
              :href="helperImage"
              class="image-wrapper link"
              rel="noopener noreferrer"
              target="_blank"
            >
              <QImg
                :src="helperImage"
                alt="Explainer Image"
                class="help-img"
                fit="contain"
              />
            </a>
          </QCardSection>
          <QCardActions class="justify-center">
            <QBtn
              v-close-popup
              class="q-mb-md"
              label="Close"
              type="submit"
              outline
            />
          </QCardActions>
        </QCard>
      </QDialog>
    </template>
  </QInput>
</template>

<style scoped lang="scss">
.disable-override {
  opacity: unset !important;

  &,
  * {
    cursor: default !important;
  }
}

.card-wrapper {
  max-width: 640px;
}

.image-wrapper::after {
  content: 'Click to enlarge';
  display: block;
  text-align: center;
  padding-block-start: 0.5rem;
}

.help-img {
  max-height: 500px;
}
</style>
