<script setup lang="ts">
import { useId } from '@/helpers/id';
import InputTableItem from '../../InputTableItem.vue';
import SelectDropdown from '../SelectDropdown.vue';
import Explainer from '..//../Explainer.vue';
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import creatureData from '@/miscLogic/creatureData';
import { watch, ref, computed } from 'vue';

const model = defineModel<string>({ required: true });

const id = useId('genus');

defineProps<{ resetEvent?: string }>();

const pageData = usePageDataStore();
const {
  ecosystem,
} = storeToRefs(pageData);

const genera = ref<string[]>([]);
const selectedGenus = ref<string>('');
const produces = ref<string[]>([]);

function updateGeneraList() {
  const currentEcosystem = ecosystem.value;
  genera.value = Object.keys(creatureData.ecosystems[currentEcosystem] || {});
}

watch(ecosystem, updateGeneraList);

watch(selectedGenus, (newGenus) => {
  if (newGenus && ecosystem.value) {
    produces.value = creatureData.ecosystems[ecosystem.value][newGenus]?.produces || [];
  }
});

const formattedGenera = computed(() => {
  return genera.value.map(genus => ({
    label: genus,
    value: genus
  }));
});

updateGeneraList();
</script>

<template>
  <InputTableItem>
    <template #label>
      <div class="is-flex is-justify-content-space-between is-align-items-center full-width">
        <label :id>Genre:</label>
        <Explainer tooltip="Found in the creature discovery menu.">
        </Explainer>
      </div>
    </template>

    <template #input>
      <SelectDropdown
        v-model="model"
        :aria-labelledby="id"
        :options="formattedGenera"
        :reset-event
      />
    </template>
  </InputTableItem>
</template>
