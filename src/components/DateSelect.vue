<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import InputTableItem from './InputTableItem.vue';
import DatePicker from 'primevue/datepicker';
import { useId } from '@/helpers/id';

defineProps<{
  label: string;
}>();

const model = defineModel<string>({ required: true });

const id = useId('date-input-');

const dateModel = ref<Date>();

const padDate = (num: number): string => num.toString().padStart(2, '0');

watchEffect(() => {
  if (!dateModel.value) {
    model.value = '';
    return;
  }
  const day = padDate(dateModel.value.getDate());
  const month = padDate(dateModel.value.getMonth() + 1); // getMonth() returns a 0-based month number
  const year = dateModel.value.getFullYear();
  model.value = `${year}-${month}-${day}`;
});
</script>

<template>
  <InputTableItem>
    <template #label>
      <label for="date-input">{{ label }}</label>
    </template>
    <template #input>
      <DatePicker
        v-model="dateModel"
        :input-id="id"
        date-format="yy-mm-dd"
        icon-display="input"
        input-class="p-inputtext-sm"
        pt:inputIconContainer:class="mt-0"
        pt:inputIconContainer:style="top: 5px"
        show-icon
      />
    </template>
  </InputTableItem>
</template>
