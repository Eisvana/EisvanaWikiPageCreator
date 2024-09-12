<script setup lang="ts">
import { availableGlyphs, maxGlyphLength } from '@/variables/glyphData';
import { regions } from '@/variables/regions';
import { computed, watchEffect } from 'vue';
import TextInput from './TextInput.vue';
import Button from 'primevue/button';

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
</script>

<template>
  <div class="is-flex is-flex-direction-column glyph-input-wrapper mt-5">
    <div class="is-flex input-wrapper mt-3">
      <TextInput
        v-model.trim="model"
        :invalid="isError"
        :maxlength="maxGlyphLength"
        label="Glyphs"
      />
      <div>
        <Button
          icon="pi pi-arrow-left"
          label="Delete"
          severity="danger"
          @click="removeGlyph"
        />
      </div>
    </div>
    <div class="glyph-grid full-width">
      <Button
        v-for="glyph in validGlyphs"
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
  gap: 0.5rem;

  .input-wrapper {
    gap: 1rem;
  }
}

.preview {
  word-break: break-all;
}

@container (max-width: 500px) {
  .glyph-grid {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
