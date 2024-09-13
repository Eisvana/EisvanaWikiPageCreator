<script setup lang="ts">
import { availableGlyphs, maxGlyphLength } from '@/variables/glyphData';
import { regions } from '@/variables/regions';
import { computed, watchEffect } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Explainer from './Explainer.vue';
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { route } from '@/variables/route';
import InvalidInput from './InvalidInput.vue';

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

watchEffect(lintGlyphs);

const activeCelestialBody = computed(() => (moon.value || route === 'moon' ? 'moon' : 'planet'));
</script>

<template>
  <div class="is-flex is-flex-direction-column glyph-input-wrapper full-width pb-3">
    <div class="columns is-mobile mb-0">
      <div class="column is-flex is-align-items-center is-justify-content-space-between glyph-label-wrapper">
        <div class="is-flex is-flex-wrap-wrap label-button-wrapper">
          <label for="glyph-input">Glyphs</label>
          <div>
            <Button
              icon="pi pi-arrow-left"
              label="Delete"
              severity="danger"
              size="small"
              @click="removeGlyph"
            />
          </div>
        </div>
        <Explainer
          :tooltip="`Found in Photo Mode. Glyphs are specific to each ${activeCelestialBody}.`"
          help-img="shared/glyphs"
          help-title="Portalglyphs"
        >
          Found in Photo Mode. Glyphs are specific to each {{ activeCelestialBody }}.
          <iframe
            class="mt-4"
            height="300"
            sandbox="allow-scripts allow-same-origin"
            src="https://nmspar.vercel.app/"
            title="Glyph Reader"
            width="450"
            >Glyph Reader</iframe
          >
        </Explainer>
      </div>
      <div class="column is-flex is-align-items-center">
        <InvalidInput
          :invalid="isError"
          error-message="Not in Eisvana"
          class="full-width"
        >
          <InputText
            v-model.trim="model"
            :invalid="isError"
            :maxlength="maxGlyphLength"
            id="glyph-input"
          />
          <template #errorMessage>
            No valid Eisvana region. See
            <a
              class="link"
              href="https://nomanssky.fandom.com/Eisvana#Claimed_Regions"
              rel="noopener noreferrer"
              target="_blank"
              >Eisvana Claimed Regions</a
            >
            for a list of valid regions.
          </template>
        </InvalidInput>
      </div>
    </div>
    <div class="glyph-grid full-width">
      <Button
        v-for="glyph in validGlyphs"
        :fluid="false"
        class="glyph-button"
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

  .glyph-button {
    padding: 0;

    .glyphs.icon.is-small {
      height: 1em;
    }
  }
}

.glyph-input-wrapper {
  container-type: inline-size;

  .glyph-label-wrapper,
  .label-button-wrapper {
    gap: 0.5rem 1rem;
  }
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
