<script setup lang="ts">
import type { CheckboxData } from '@/types/checkboxTypes';
import { computed } from 'vue';
import CompactCheckbox from './inputs/CompactCheckbox.vue';
import { paginate } from '@/helpers/pagination';

// TODO: find a way to get this component to also be able to handle checkbox groups with the `name` attribute. They just use a `value` attribute and output an array with all checked values.

const props = defineProps<{
  checkboxes: CheckboxData[];
}>();

const paginatedCheckboxes = computed(() => paginate(props.checkboxes, 2));

const defaultTrueValue = 'Yes';
const defaultFalseValue = 'No';
</script>

<template>
  <div
    v-for="checkboxArray in paginatedCheckboxes"
    class="columns is-mobile mb-0 checkbox-row"
  >
    <div
      v-for="checkbox in checkboxArray"
      :key="checkbox.label"
      class="column is-flex is-align-items-center checkbox-wrapper"
    >
      <CompactCheckbox
        v-model="checkbox.model"
        :false-value="checkbox.falseValue ?? defaultFalseValue"
        :label="checkbox.label"
        :true-value="checkbox.trueValue ?? defaultTrueValue"
      />
    </div>
  </div>
</template>

<style scoped>
.checkbox-row:last-child .checkbox-wrapper {
  padding-block-end: 0;
}
</style>
