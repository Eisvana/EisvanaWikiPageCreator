<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import Panel from 'primevue/panel';
import DateSelect from '@/components/inputs/DateSelect.vue';
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { computed, ref, watchEffect } from 'vue';
import InputTableItem from '@/components/InputTableItem.vue';
import SanitisedTextInput from './SanitisedTextInput.vue';
import { watchDebounced } from '@vueuse/core';
import { debounceDelay } from '@/variables/debounce';
import { isValidHttpUrl, regexMatch } from '@/helpers/inputValidation';
import TextInput from './TextInput.vue';

const pageData = usePageDataStore();
const { censusplayer, censussocial, censusreddit, censusdiscord, censusfriend, censusarrival, censusshow } =
  storeToRefs(pageData);

const isCollapsed = ref(false);

// validate Discord name format
const isDiscordValid = ref(true);
watchDebounced(
  censusdiscord,
  (newVal) => {
    const hasValidNewTag = /^[a-z0-9._]+$/.test(newVal);
    isDiscordValid.value = !newVal || hasValidNewTag;
  },
  { debounce: debounceDelay }
);

// fix reddit input (remove leading 'u/')
watchEffect(() => {
  if (censusreddit.value.toLowerCase().startsWith('u/')) censusreddit.value = censusreddit.value.substring(2);
});

// validate Reddit name format
const isRedditValid = computed(() => !censusreddit.value.includes(' '));

// capitalise friend code
watchEffect(() => (censusfriend.value = censusfriend.value.toUpperCase()));

// validate friend code format
const isFriendCodeValid = ref(true);
watchDebounced(
  censusfriend,
  (newVal) => {
    const friendCodeRegex = new RegExp(/(?:[0-9A-Za-z]{4}-){2}[0-9A-Za-z]{5}/);
    const matchesRegex = regexMatch(newVal, friendCodeRegex);
    isFriendCodeValid.value = !newVal || matchesRegex;
  },
  { debounce: debounceDelay }
);

// validate social link
const isSocialLinkValid = ref(true);
watchDebounced(
  censussocial,
  (newVal) => (isSocialLinkValid.value = !newVal || isValidHttpUrl(newVal) || newVal.startsWith('{{')),
  { debounce: debounceDelay }
);
</script>

<template>
  <Panel
    v-model:collapsed="isCollapsed"
    class="my-4"
    header="Census"
    toggleable
  >
    <template #toggleicon>
      <span :class="`pi pi-chevron-${isCollapsed ? 'down' : 'up'}`"></span>
    </template>
    <SanitisedTextInput
      v-model="censusplayer"
      help-img="base/playerName"
      help-title="Player Name"
      label="Ingame name"
      tooltip="Your ingame name"
      >Your ingame name. Don't include any ingame titles.
    </SanitisedTextInput>
    <SanitisedTextInput
      v-if="!censussocial"
      v-model="censusreddit"
      :invalid="!isRedditValid"
      error-message="Reddit name must not include spaces"
      label="Reddit name"
      tooltip='Your Reddit name. "u/" not necessary'
    />
    <SanitisedTextInput
      v-if="!censusreddit"
      v-model="censussocial"
      :invalid="!isSocialLinkValid"
      error-message="Please provide the full link"
      label="Social media name"
      tooltip="Social Media profile if you don't have Reddit (Facebook, Instagram, Wiki, etc). Put the full link here"
    />
    <SanitisedTextInput
      v-model="censusdiscord"
      :invalid="!isDiscordValid"
      error-message="'Invalid Discord tag. Please give your username, not your display name.'"
      label="Discord name"
      tooltip="Your Discord name. Please enter your username, not your display name"
    />
    <TextInput
      v-model="censusfriend"
      :invalid="!isFriendCodeValid"
      error-message="Wrong friend code format"
      help-img="base/friendCode"
      help-title="NMS Friend Code"
      label="Friend code"
      tooltip="Can be found in the Options"
    >
      You can find your friend code in the Options &rarr; Network &rarr; View No Man's Sky Friends List &rarr; Show My
      No Man's Sky Friend Code
    </TextInput>
    <DateSelect
      v-model="censusarrival"
      label="Date of arrival in Eisvana"
    />
    <InputTableItem>
      <template #label>
        <label for="census-checkbox">Create census entry</label>
      </template>
      <template #input>
        <Checkbox
          v-model="censusshow"
          false-value=""
          input-id="census-checkbox"
          true-value="Y"
          binary
        />
      </template>
    </InputTableItem>
  </Panel>
</template>
