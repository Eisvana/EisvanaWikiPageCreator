<script setup lang="ts">
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';

defineProps<{
  invalid?: boolean;
  errorMessage?: string;
  moveLeft?: string;
  top?: string;
}>();
</script>

<template>
  <div>
    <IconField>
      <slot></slot>
      <InputIcon
        v-if="invalid"
        :style="{ 'margin-inline-end': moveLeft, top }"
        class="pi pi-exclamation-circle is-error"
      />
    </IconField>
    <p
      v-if="invalid"
      class="help is-error"
    >
      <slot name="errorMessage">{{ errorMessage }}</slot>
    </p>
  </div>
</template>

<style scoped>
.is-error {
  color: var(--p-red-400);
  z-index: 2;
}
</style>
