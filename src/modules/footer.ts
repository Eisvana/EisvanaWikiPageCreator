/**
 * @fileoverview Generates the footer and handles theming, as well as user defined global default values.
 */

import { hideDiscoverer, sanitiseString, triggerEvent } from '../common';
import { footerInputs, globalElements, pageData } from '../variables/objects';
import { regions } from '../variables/regions';
import { glyphError, validateGlyphs } from './portalglyphs';

/**
 * Changes the theme of the page and sets a localStorage variable to track the theme between page loads.
 * @function
 * @returns {void}
 */
export function switchTheme(): void {
  document.documentElement.dataset.transition = 'true';
  const theme = document.documentElement.dataset.theme ?? 'light';
  if (theme === 'light') {
    localStorage.setItem('theme', 'dark');
    document.documentElement.dataset.theme = 'dark';
  } else {
    localStorage.setItem('theme', 'light');
    document.documentElement.dataset.theme = 'light';
  }

  // adding delay to allow the CSS transition to complete. This is only for Chrome, Firefox would work with any timeout (even 0) #chromesucks
  setTimeout(() => {
    delete document.documentElement.dataset.transition;
  }, 400); // NoSonar wait 400ms so Chrome can finish its transition
}

/**
 * Displays the settings modal and restores default values.
 * @function
 * @global
 * @return {void}
 */
export function showSettings() {
  restoreDefaults();
  const dialog = globalElements.input.settings as HTMLDialogElement;
  dialog.style.scale = '0';
  dialog.showModal();
  dialog.style.scale = '1';
  dialog.scrollTo(0, 0);

  const settings = JSON.parse(localStorage.getItem('defaultSettings') ?? '{}');
  for (const setting in settings) {
    const input: HTMLInputElement | HTMLSelectElement | null = dialog.querySelector(`.data [data-store="${setting}"]`);
    if (!input) continue;
    input.value = settings[setting];
    if (input.id === 'portalglyphsDefault') triggerEvent(input, 'input');
  }
  hideDiscoverer();
  delete pageData.restored;
}

/**
 * Called when user submits values. Stores entered values in localstorage.
 * @function
 * @returns {void}
 */
export function updateDefaultValues() {
  if (pageData.restored) {
    localStorage.removeItem('defaultSettings');
    delete pageData.restored;
    return;
  }
  const settings: {
    [key: string]: string;
  } = {};
  const inputs = Array.from(footerInputs);
  for (const input of inputs) {
    const value = input?.value;
    const store = input?.dataset?.store;
    const selectInput = input as HTMLSelectElement;
    if ((selectInput?.options?.[selectInput.options.length - 1]?.value === value || value) && store)
      settings[store] = sanitiseString(value);
  }

  localStorage.setItem('defaultSettings', JSON.stringify(settings));
}

/**
 * Populates input fields with default values on page load and on reset.
 * Retrieves default values from local storage, if available.
 * @function
 * @returns {void}
 */
export function readDefaultValues() {
  const settings = JSON.parse(localStorage.getItem('defaultSettings') ?? '{}');
  for (const setting in settings) {
    const input = (() => {
      if (setting.split(' ').length > 1) {
        return setting
          .split(' ')
          .map((id) => document.getElementById(id))
          .find((element) => element);
      } else {
        return document.getElementById(setting);
      }
    })();
    if (!input) continue;

    (input as HTMLInputElement | HTMLSelectElement).value = settings[setting];

    switch (setting.split(' ')[0]) {
      case 'wealthInput':
        triggerEvent(input, 'change');
        break;

      case 'portalglyphsInput':
      case 'systemInput':
      case 'regionInput':
      case 'galaxyInput':
      case 'hubInput':
      case 'discoveredlinkInput':
      case 'discoveredInput':
      case 'builderlinkInput':
      case 'builderInput':
        triggerEvent(input, 'input');
        break;
    }
  }
}

/**
 * Sets dialog options back to their default values when the user resets custom globals.
 * @function
 * @returns {void}
 */
export function restoreDefaults() {
  /**
   * The input HTML elements in the footer.
   * @type {NodeList}
   */
  const inputs = Array.from(footerInputs);
  for (const input of inputs) {
    if (!input?.value) continue;
    if (input.tagName.toLowerCase() === 'select') {
      input.value = (input as HTMLSelectElement).options?.[0]?.value;
    } else {
      input.value = '';
    }
  }
  hideDiscoverer();
  pageData.restored = true;
}

/**
 * Validates a glyph user input and updates the UI with any errors
 * @param {HTMLInputElement} input - The user's glyph input
 */
export function validateGlyphSettings(input: HTMLInputElement) {
  const glyphString = input.value;
  const allRegions = structuredClone(regions);
  Object.freeze(allRegions);
  const region = validateGlyphs(glyphString, regions);
  glyphError(region, input);
  const settingsElement = globalElements.input.settings as HTMLDialogElement;
  const closeButton = settingsElement.querySelector('form button.is-primary') as HTMLButtonElement;
  closeButton.disabled = region === undefined;
}
