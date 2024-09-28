<script setup lang="ts">
import { ref } from 'vue';
import SanitisedTextInput from './SanitisedTextInput.vue';
import { validateCoords } from '@/helpers/inputValidation';
import { watchDebounced } from '@vueuse/core';
import { debounceDelay } from '@/variables/debounce';

const model = defineModel<string>({ required: true });

const invalid = ref(false);

watchDebounced(model, (newVal) => (invalid.value = !validateCoords(newVal)), { debounce: debounceDelay });
</script>

<template>
  <SanitisedTextInput
    v-model="model"
    :invalid
    error-message="Invalid coordinate format"
    label="Planetary coordinates"
    placeholder="+0.00, -0.00"
    maxlength="16"
    tooltip="Found using your analysis visor OR on your ship's dashboard."
    help-title="Planetary Coordinates"
    help-img="shared/axes"
  >
    Found using your analysis visor OR on your ship's dashboard.
  </SanitisedTextInput>
</template>
