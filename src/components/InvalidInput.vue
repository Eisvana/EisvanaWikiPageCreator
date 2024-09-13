<script setup lang="ts">
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';

defineProps<{
  invalid?: boolean;
  errorMessage?: string;
}>();
</script>

<template>
  <div>
    <IconField>
      <slot></slot>
      <InputIcon
        v-if="invalid"
        class="pi pi-exclamation-circle error-icon"
      />
    </IconField>
    <p
      v-if="invalid"
      class="help is-danger"
    >
      <slot name="errorMessage">{{ errorMessage }}</slot>
    </p>
  </div>
</template>

<style scoped>
.error-icon {
  color: var(--p-red-400);
}
</style>
