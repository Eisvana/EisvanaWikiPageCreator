<script setup lang="ts">
import { availableGlyphs, maxGlyphLength } from '@/variables/glyphData';
import { regions } from '@/variables/regions';
import { computed, watchEffect } from 'vue';

const model = defineModel<string>({ required: true });

const validRegionGlyphs = Object.keys(regions);
const isError = computed(
  () => model.value.length === maxGlyphLength && !validRegionGlyphs.some((item) => model.value.endsWith(item))
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
  <div class="column q-gutter-y-sm full-width glyph-input-wrapper">
    <div class="row q-gutter-md items-center">
      <QInput
        v-model.trim="model"
        :error="isError"
        :maxlength="maxGlyphLength"
        error-message="No valid Eisvana region"
        label="Glyphs"
        hide-bottom-space
        outlined
      />
      <div>
        <QBtn
          color="negative"
          icon="keyboard_backspace"
          label="Delete"
          @click="removeGlyph"
        />
      </div>
    </div>
    <div class="glyph-grid">
      <QBtn
        v-for="glyph in validGlyphs"
        :label="glyph"
        class="glyphs glyph-button"
        padding="none"
        outline
        @click="addGlyph(glyph)"
      />
    </div>
    <output class="glyphs">{{ model }}</output>
  </div>
</template>

<style scoped lang="scss">
.glyph-grid {
  --glyph-button-width: 70px;
  display: grid;
  grid-template-columns: repeat(8, var(--glyph-button-width));
  gap: 2px;

  .glyph-button {
    line-height: initial;
    width: var(--glyph-button-width);
  }
}

.glyph-input-wrapper {
  container-type: inline-size;
}

@container (max-width: 500px) {
  .glyph-grid {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
