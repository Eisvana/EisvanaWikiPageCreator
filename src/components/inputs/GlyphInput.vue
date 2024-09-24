<script setup lang="ts">
import { availableGlyphs, maxGlyphLength } from '@/variables/glyphData';
import { regions } from '@/variables/regions';
import { computed, watchPostEffect } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Explainer from '../Explainer.vue';
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { route } from '@/variables/route';
import InvalidInput from '../InvalidInput.vue';
import WikiLink from '../WikiLink.vue';
import { useId } from '@/helpers/id';

defineProps<{
  noExplain?: boolean;
}>();

const pageData = usePageDataStore();
const { moon } = storeToRefs(pageData);

const model = defineModel<string>({ required: true });

const validRegionGlyphs = Object.keys(regions);
const isError = computed(
  () =>
    (model.value.length === maxGlyphLength && !validRegionGlyphs.some((item) => model.value.endsWith(item))) ||
    model.value.length > maxGlyphLength
);

const validGlyphs = Array.from({ length: availableGlyphs }, (_value, index) => index.toString(16).toUpperCase());

function addGlyph(glyph: string) {
  if (model.value.length >= maxGlyphLength) return;
  model.value += glyph;
}

function removeGlyph() {
  model.value = model.value.slice(0, -1);
}

function lintGlyphs() {
  model.value = model.value
    .toUpperCase()
    .split('')
    .filter((char) => validGlyphs.includes(char))
    .join('');
}

watchPostEffect(lintGlyphs);

const activeCelestialBody = computed(() => (moon.value || route === 'moon' ? 'moon' : 'planet'));

const id = useId('glyph-input-');
</script>

<template>
  <div class="is-flex is-flex-direction-column glyph-input-wrapper full-width pb-3">
    <div class="columns is-mobile mb-0">
      <div class="column is-flex is-align-items-center is-justify-content-space-between is-row-gap-1 is-column-gap-2">
        <div class="is-flex is-flex-wrap-wrap is-align-items-center is-row-gap-1 is-column-gap-2">
          <label :for="id">Glyphs</label>
          <div>
            <Button
              icon="pi pi-arrow-left"
              label="Delete"
              severity="danger"
              size="small"
              outlined
              @click="removeGlyph"
            />
          </div>
        </div>
        <Explainer
          v-if="!noExplain"
          :tooltip="`Found in Photo Mode. Glyphs are specific to each ${activeCelestialBody}.`"
          help-img="shared/glyphs"
          help-title="Portalglyphs"
        >
          Found in Photo Mode. Glyphs are specific to each {{ activeCelestialBody }}.
        </Explainer>
      </div>
      <div class="column is-flex is-align-items-center">
        <InvalidInput
          :invalid="isError"
          class="full-width"
        >
          <InputText
            v-model.trim="model"
            :id
            :invalid="isError"
            :maxlength="maxGlyphLength"
            size="small"
          />
          <template #errorMessage>
            No valid Eisvana region. See
            <WikiLink
              link="Eisvana#Claimed_Regions"
              text="Eisvana Claimed Regions"
            />
            for a list of valid regions.
          </template>
        </InvalidInput>
      </div>
    </div>
    <div class="glyph-grid full-width">
      <Button
        v-for="glyph in validGlyphs"
        :fluid="false"
        class="p-0"
        severity="secondary"
        outlined
        @click="addGlyph(glyph)"
      >
        <span class="glyphs icon is-small">{{ glyph }}</span>
      </Button>
    </div>
    <output class="glyphs preview full-width">{{ model }}</output>
  </div>
</template>

<style scoped>
.glyph-grid {
  display: grid;
  grid-template-columns: repeat(8, 60px);
  gap: 1px;

  .glyphs.icon.is-small {
    height: 1em;
  }
}

.glyph-input-wrapper {
  container-type: inline-size;
}

.preview {
  word-break: break-all;
}

@container (max-width: 500px) {
  .glyph-grid {
    display: flex;
    flex-wrap: wrap;

    .glyphs {
      width: 3.5rem;
    }
  }
}
</style>
