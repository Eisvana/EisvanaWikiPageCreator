<script setup lang="ts">
import InputRow from '../structure/InputRow.vue';
import mineralFormationDatalist from '@/datalists/mineralDatalists';
import Explanation from '../structure/Explanation.vue';
import { usePageDataStore } from '../../stores/pageData';
import { storeToRefs } from 'pinia';
import ErrorMessage from './ErrorMessage.vue';

const pageData = usePageDataStore();
const { formation } = storeToRefs(pageData);

defineProps<{
  label: string;
  identifier: string;
  img?: string;
  modelValue: string;
  error?: string;
  maxlength?: string;}>();
</script>
<template>
  <InputRow>
    <template #label>
      <label :for="identifier">{{ label }}</label>
      <Explanation
        v-if="$slots.default"
        :img="img"
      >
        <slot></slot>
        <template
          #heading
          v-if="$slots.heading"
        >
          <slot name="heading"></slot>
        </template>
        <template
          #content
          v-if="$slots.content"
        >
          <slot name="content"></slot>
        </template>
      </Explanation>
    </template>
    <template #input>
      <input list="mineralFormationDatalist" v-model="formation" type="text" :class="{ 'error-input': error }">
      <datalist id="mineralFormationDatalist">
        <option v-for="(esmineralFormationDatalist, enmineralFormationDatalist) in mineralFormationDatalist"
          :value="enmineralFormationDatalist">
          {{ esmineralFormationDatalist }}
        </option>
      </datalist>
      <ErrorMessage
        v-if="error"
        v-html="error"
      ></ErrorMessage>
    </template>
  </InputRow>
</template>
