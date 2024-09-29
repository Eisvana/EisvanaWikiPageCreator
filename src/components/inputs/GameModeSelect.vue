<script setup lang="ts">
import { useId } from '@/helpers/id';
import InputTableItem from '../structure/InputTableItem.vue';
import SelectDropdown from './SelectDropdown.vue';
import { mappedModeOptions } from '@/variables/gamemodes';
import Explainer from '../structure/Explainer.vue';

defineProps<{ resetEvent?: string }>();

const model = defineModel<string>({ required: true });

const id = useId('gamemode-');
</script>

<template>
  <InputTableItem>
    <template #label>
      <div class="is-flex is-justify-content-space-between is-align-items-center full-width">
        <label :id>Gamemode</label>
        <Explainer
          tooltip="Gamemode of the save on which this base was built."
          help-img="shared/gamemode"
          help-title="Gamemode"
        >
          Gamemode of the save on which this base was built.<br />Found in the main menu:
        </Explainer>
      </div>
    </template>

    <template #input>
      <SelectDropdown
        v-model="model"
        :aria-labelledby="id"
        :options="mappedModeOptions"
        :reset-event
      />
    </template>
  </InputTableItem>
</template>
