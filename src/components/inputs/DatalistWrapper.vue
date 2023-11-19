<script setup lang="ts">
defineProps<{
  data: string[];
  identifier: string;
}>();
</script>

<template>
  <datalist :id="identifier">
    <option
      v-for="option in data"
      :value="option"
    ></option>
  </datalist>
</template>
