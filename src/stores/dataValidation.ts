import { hashPageData, removeNewlines } from '@/common';
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

  actions: {
    getSelectedText(e: Event) {
      // this is some stupid BS: Chrome selects the theme switch button text, despite it having user-select:none. #chromesucks
      // I have no idea how to fix this, so I will just remove the button text from the string :shrug:
      const buttonText = document.getElementById('switchTheme')?.innerText;

      const element = e.target;
      if (!(element instanceof HTMLElement && buttonText)) return;

      const wikiTextContainer = element.closest('.wikiText');

      if (!(wikiTextContainer instanceof HTMLDivElement)) return;

      const sectionText = removeNewlines(wikiTextContainer.innerText).trim();
      const selection = window.getSelection() ?? '';
      const selectedText = (() => {
        const text = removeNewlines(selection.toString()).trim();
        if (text.endsWith(buttonText)) return text.replace(buttonText, '').trim();
        return text;
      })();

      this.text = hashPageData();
      this.copy = sectionText === selectedText;
    },
  },
});
