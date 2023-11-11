import { defineStore } from 'pinia';

interface State {
  text: string;
  copy: boolean;
}

export const useDataValidationStore = defineStore('dataValidation', {
  state: (): State => ({
    text: '',
    copy: false,
  }),
});
