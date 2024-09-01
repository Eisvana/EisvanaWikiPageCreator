<script setup lang="ts">
import { ref } from 'vue';
import { maxGlyphLength } from '@/variables/glyphData';

const glyphs = ref('');

const validGlyphs = Array.from({ length: 16 }, (_v, k) => k.toString(16).toUpperCase());

function addGlyph(glyph: string) {
  if (glyphs.value.length >= 16) return;
  glyphs.value += glyph;
}

function removeGlyph() {
  glyphs.value = glyphs.value.slice(0, -1);
}
</script>

<template>
  <div class="column">
  <div class="row">
    <QInput
      v-model="glyphs"
      label="Glyphs"
      :maxlength="maxGlyphLength"
    />
    <QBtn
      color="negative"
      label="&larr; Delete"
      @click="removeGlyph"
    />
  </div>
  <div class="glyph-grid">
    <QBtn
      v-for="glyph in validGlyphs"
      :label="glyph"
      class="glyphs"
      dense
      @click="addGlyph(glyph)"
    />
  </div>
  <output class="glyphs">{{ glyphs }}</output>
</div>
</template>

<style scoped lang="scss">
.glyph-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  font-family: NMS-Glyphs-Tight;
}
</style>
