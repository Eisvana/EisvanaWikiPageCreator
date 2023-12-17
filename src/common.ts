/**
 * @fileoverview Provides general functions which can be used by all pages.
 */

import { vowels, wikiLink } from './variables/simple';
import { dataIntegrityObj, globalElements, globalFunctions, pageData, staticBooleans } from './variables/objects';
import { getDestElements } from './commonElements/elementBackend/elementStore';
import { versions } from './variables/versions';
import { assignElementFunctions, assignFunction } from './commonElements/elementBackend/elementFunctions';
import { glyphInputOnChange } from './modules/portalglyphs';
import { explanation } from './modules/tooltip';
import { planetMoonSentence } from './miscLogic/locationLogic';
import type { Datalist, SortObj } from './types/objects';
import type { AnyPrimitive } from './types/values';
import type { ElementFunction, ElementFunctions, InputElements } from './types/elements';
import { useGalleryStore } from './modules/gallery/stores/gallery';
import md5Hex from 'md5-hex';
import { usePageDataStore } from './stores/pageData';
import generalDatalists from '@/datalists/GeneralDatalists';

/**
 * Returns an object containing references to input elements on the page.
 * @returns {Object} An object with properties "inputs", "checkboxes", "stores", "defaults", "simple", and "lists", each containing an array of relevant input elements.
 */
function getInputData() {
  const inputData: {
    [key: string]: NodeListOf<InputElements>;
  } = {
    inputs: document.querySelectorAll('[data-dest]'),
    checkboxes: document.querySelectorAll('[data-dest-checkbox]'),
    stores: document.querySelectorAll('[data-dest-noauto]'),
    defaults: document.querySelectorAll('[data-default]'),
    simple: document.querySelectorAll('[data-dest-simple]'),
    number: document.querySelectorAll('[data-dest-number]'),
    lists: document.querySelectorAll('[list]'),
  };
  return inputData;
}

/**
 * Creates a version dropdown menu in the app UI with custom text labels for certain options.
 *
 * @function
 * @name versionDropdown
 * @returns {void}
 */
export function versionDropdown() {
  const versionNames = Object.keys(versions);
  const versionTexts = Object.values(versions);
  const dropdownElement = globalElements.input.version;
  if (!(dropdownElement instanceof HTMLSelectElement)) return;

  setDropdownOptions(dropdownElement, versionNames, versionTexts);
}




/**
 * Sets the options in a dropdown element based on an array
 * of values and corresponding text.
 *
 * @param {HTMLElement} element - The dropdown element to update.
 * @param {Array} values - An array of values to use for each option.
 * @param {Array} [texts=values] - An optional array of text to use
 * for each option. If no text is provided, the value will be used instead.
 *
 * @returns {undefined}
 */
export function setDropdownOptions(element: HTMLSelectElement, values: Array<string>, texts: Array<string> = values) {
  const dropdown: Array<string> = [];
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const text = texts[i];
    const dropdownOption = document.createElement('option');
    dropdownOption.value = value;
    dropdownOption.innerText = text;
    dropdown.push(dropdownOption.outerHTML);
  }
  const dropdownHTML = dropdown.join('');
  // dont't update the dropdown if content is identical
  if (element.innerHTML !== dropdownHTML) element.innerHTML = dropdownHTML;
}

/**
 * Automatically sets up input fields, checkboxes, stores, and datalists with appropriate functions.
 *
 * @returns {void} Nothing is returned by this function.
 */
export function autoShow(): void {
  const inputData = getInputData();
  const functionObj: Array<{
    elements: NodeListOf<InputElements>;
    handler?: keyof HTMLElementEventMap;
    prio?: boolean;
    func: () => void;
  }> = [
    {
      elements: inputData.number,
      func: function () {
        numberStats(
          this as unknown as HTMLInputElement,
          parseInt((this as unknown as HTMLInputElement).dataset.destNumber as string) || undefined
        );
      },
    },
    {
      elements: inputData.defaults,
      func: function () {
        assignDefaultValue(this as unknown as HTMLInputElement);
      },
    },
    {
      elements: inputData.inputs,
      func: function () {
        wikiCode(this as unknown as HTMLInputElement | HTMLSelectElement);
      },
    },
    {
      elements: inputData.checkboxes,
      func: function () {
        checkboxWikiCode(this as unknown as HTMLInputElement);
      },
    },
    {
      elements: inputData.stores,
      func: function () {
        storeData(this as unknown as HTMLInputElement | HTMLSelectElement);
      },
    },
    {
      elements: inputData.simple,
      func: function () {
        wikiCodeSimple(this as unknown as HTMLInputElement);
      },
    },
    {
      elements: inputData.lists,
      handler: 'change',
      func: function () {
        forceDatalist(this as unknown as HTMLInputElement, generalDatalists);
        forceDatalist2(this as unknown as HTMLInputElement);
      },
    },
  ];

  const transformedFunctionArray: ElementFunctions = [];

  for (const obj of functionObj) {
    const { elements, handler, func } = obj;
    for (const element of Array.from(elements)) {
      const transformedFunctionObject: ElementFunction = {
        element,
        handler,
        func,
        prio: true,
      };
      transformedFunctionArray.push(transformedFunctionObject);
    }
  }
  assignElementFunctions(transformedFunctionArray);
}

/**
 * Displays all input fields, checkboxes, dropdowns, and other relevant elements to the webpage.
 * @function
 * @returns {void}
 */
export function showAll() {
  const inputData = getInputData();
  for (const input of Array.from(inputData.inputs)) {
    wikiCode(input);
  }
  for (const checkbox of Array.from(inputData.checkboxes)) {
    checkboxWikiCode(checkbox as HTMLInputElement);
  }
  for (const store of Array.from(inputData.stores)) {
    storeData(store);
  }

  for (const element of Array.from(inputData.defaults)) {
    assignDefaultValue(element);
  }

  for (const simple of Array.from(inputData.simple)) {
    wikiCodeSimple(simple);
  }

  numberStats();
  researchTeam();
  image(globalElements.input.fileUpload as HTMLInputElement);
  try {
    glyphInputOnChange(globalElements.input.portalglyphsInput as HTMLInputElement);
  } catch {
    /*do nothing*/
  }
  try {
    planetMoonSentence();
  } catch {
    /*do nothing*/
  }
  hideDiscoverer();
}

/**
 * Validates the option selected in a datalist element.
 * @param {HTMLInputElement} element - The input element with the datalist.
 * @returns {void}
 */
export function forceDatalist2(element: HTMLInputElement) {
  const option = element.list?.querySelector(`[value="${element.value}"]`);
  if (!option && element.value) {
    errorMessage(
      element,
      'No es una opción válida. Si cree que se trata de un error, envíe un <a href="https://forms.gle/LRhzWjMRkXoKd9CcA" rel="noreferrer noopener" target="_blank">informe de error</a>.'
    );
  } else {
    errorMessage(element);
  }
}


/**
 * Updates a destination element with the sanitized value of a source element's value or content.
 *
 * @param {Object} element - The source element to retrieve value or content from.
 * @param {string} dest - The ID of the destination element(s) to update, specified in a data attribute on the source element.
 */
export function wikiCode(
  element: InputElements | string,
  dest: string | undefined = (element as HTMLElement)?.dataset?.dest
) {
  const destElements = typeof dest === 'string' ? getDestElements(dest) : [];

  // sanitize the source value or content
  const value = sanitiseString(typeof element === 'string' ? element : element.value);

  // update the pageData with the sanitized value
  if (dest) {
    pageData[dest] = value;
  } else if (typeof element != 'string') {
    // no destination given, trying to store value in pageData without transferring it into code
    if (!element.dataset.destNoauto) return;
    pageData[element.dataset.destNoauto] = value;
    return;
  }

  // update the destination element(s) with the sanitized value
  for (const destElement of destElements) {
    try {
      destElement.innerText = value;
    } catch (error) {
      console.error('destElement is null. Element:', element, 'Value:', value, 'Stacktrace:', error);
      continue;
    }
  }
}

/**
 * Handles the change event for a checkbox and updates a DOM element's text and page data accordingly.
 *
 * @param {Object} element - The checkbox element that triggered the event.
 */
export function checkboxWikiCode(element: HTMLInputElement) {
  const dest = element.dataset.destCheckbox as string;
  const destElement = document.getElementById(dest) as HTMLOutputElement;
  const checked = element.value;
  const unchecked = element.dataset.checkboxUnchecked ?? '';
  if (element.checked) {
    destElement.innerText = checked;
    pageData[dest] = checked;
  } else {
    destElement.innerText = unchecked;
    pageData[dest] = unchecked;
  }
}

/**
 * Stores the value of a DOM element in the page data object.
 *
 * @param {Object} element - The DOM element whose value will be stored.
 * @param {string} [key=element.dataset.destNoauto] - The key under which the value will be stored in the page data object. Defaults to the value of the element's `dest-noauto` attribute.
 */
export function storeData(element: InputElements, key: string = element.dataset.destNoauto as string) {
  pageData[key] = sanitiseString(element.value);
}

/**
 * Adds target and rel attributes to all external links on the page.
 *
 * @function externalLinks
 * @return {void}
 */
export function externalLinks() {
  const isExternalURL = (url: string) => new URL(url).origin !== location.origin;
  const a = document.getElementsByTagName('a');
  for (const link of Array.from(a)) {
    if (!link.href || !isExternalURL(link.href)) continue;
    link.target ||= '_blank';
    link.rel ||= 'noopener noreferrer';
  }
}

/**
 * Update all wiki links on the page to open in a new tab.
 * @function openWikiLinksExternally
 * @returns {void}
 */
export function openWikiLinksExternally() {
  const a: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[data-wiki]');
  for (const link of Array.from(a)) {
    link.target ||= '_blank';
    link.rel ||= 'noopener noreferrer';
    delete link.dataset.wiki;
    const pagename = link.getAttribute('href') as string;
    if (pagename.startsWith('http')) continue;
    link.href = wikiLink + pagename;
  }
}

/**
 * Places a value from an element into an output element. Does not sanitize wikitext. Can also handle one-to-many relationships.
 *
 * @param {HTMLElement} element - The input element to source the value from.
 */
export function wikiCodeSimple(element: InputElements, dest: string = element.dataset.destSimple as string) {
  const outputs = Array.from(document.getElementsByName(dest));
  if (!outputs.length) outputs.push(document.getElementById(dest) as HTMLElement);
  for (const output of outputs) {
    output.innerText = element.value;
  }
}

/**
 * Adds static page data to the pageData object. This data is read-only and cannot be changed or deleted.
 *
 * @param {string} key - The key of the data to add.
 * @param {*} value - The value of the data to add.
 */
export function addStaticPageData(key: string, value: AnyPrimitive | Array<string>) {
  Object.defineProperty(pageData, key, { configurable: false, writable: false, value: value });
}

export function addStaticPageData2(key: string, value: any) {
  Object.defineProperty(pageData, key, { configurable: false, writable: false, value: value });
}


/**
 * Sanitizes a given string by removing all non-link wiki markup, and trimming the result.
 *
 * @param {string} input - The string to sanitize. Must contain only wiki links, templates, and external links in wiki markup.
 * @returns {string} The sanitized string with all non-link wiki markup removed.
 *
 * @example
 * // returns "this [[is]] a test [[with some extra markup mixed in]]crazy[http://test-link.com]link[http://another-link.net]abc[[d]]efghijklmnopqrstuv^w_x[[yz[http://nested-link.com]"
 * const inputString = "this [[is]] a {test} [[with] some {extra} {markup} {mixed [in}]}]crazy[http://test-link.com]link[http://another-link.net][a][b][c][[d]]e{f}g{hi}jkl[m]nop[qrs]t[u]v^w_x[[y]z{[http://nested-link.com]}";
 * const outputString = sanitiseString(inputString);
 */
export function sanitiseString(input: string) {
  const doubleWikiMarkup = ['{', '}', '[', ']'];
  const outputArray: Array<string> = [];

  // split text into sections that contain only wiki links in wiki markup and only non-wiki-linked text.
  const markupSections = input.split('[http');

  // remove all wiki markup except for wiki links in each section.
  for (let i = 0; i < markupSections.length; i++) {
    const noMarkupText = removeAllMarkup(markupSections[i], i !== 0);
    outputArray.push(noMarkupText);
  }

  // join sections back together and return trimmed string.
  const regex = /\n{3,}/g; // This regex searches for three or more consecutive new lines.
  const text = outputArray
    .join('[http') // Join the sections together with [http in between.
    .replace(regex, '\n\n') // Replace the three or more consecutive new lines with just two new lines.
    .trim(); // Trim any leading or trailing white space.
  return text;

  // This function removes all wiki markup from a given string. Returns a string.
  function removeAllMarkup(str: string, ignoreFirstBracket: boolean = false): string {
    let noMarkupString = str;
    for (const markup of doubleWikiMarkup) {
      if (ignoreFirstBracket && markup === ']') {
        noMarkupString = skipFirst(noMarkupString, markup);
      } else {
        noMarkupString = removeSpecificMarkup(noMarkupString, markup);
      }
    }
    return noMarkupString;
  }

  /**
   * Removes all instances of a specific wiki markup character from a given string.
   *
   * @param {string} string - The string to remove markup from.
   * @param {string} markup - The wiki markup character to remove.
   * @returns {string} The string with all instances of the markup character removed.
   */
  function removeSpecificMarkup(string: string, markup: string): string {
    const doubleMarkup = markup.repeat(2); // NoSonar we need to repeat the markup 2x because MW link syntax uses 2 characters (`[[`, `{{`)
    const noMarkupString = string
      .split(doubleMarkup) // split based on double markup (isolate valid markup)
      .map((part) => part.replaceAll(markup, '')) // remove all invalid markup
      .join(doubleMarkup); // join back together using double markup
    return noMarkupString;
  }

  /**
   * Removes the first occurrence of a given character in every occurrence of a double-wiki-markup-separated string.
   *
   * @param {string} string - The string to modify.
   * @param {string} char - The character to remove.
   * @returns {string} The modified string with the character removed.
   */
  function skipFirst(string: string, char: string): string {
    // get all indices of the character we want to strip out, except the first one
    const firstBracketIndex = string.indexOf(char);
    const noMarkupString = removeSpecificMarkup(string, char);
    const stringArray = noMarkupString.split('');
    // put a character at the character at the first bracket indices
    stringArray.splice(firstBracketIndex, 0, char);
    // join the array of modified strings with the wiki markup
    return stringArray.join('');
  }
}

/**
 * Handles a file input change event, sanitizes the filename, and generates wiki code.
 * Throws an error if the file size is larger than 10MB.
 *
 * @param {HTMLInputElement} element - The file input element to process.
 * @returns {void}
 */
export function image(element: HTMLInputElement) {
  const filename = element?.files?.[0]?.name;
  if (!filename) return;

  // throw error if file is bigger than 10MB (wiki upload limit)
  const fileSizeLimit: number = 10000000;
  const fileSizeExceeded = element.files![0].size > fileSizeLimit;
  errorMessage(
    element,
    fileSizeExceeded
      ? 'Este archivo es demasiado grande para cargarlo en la wiki. El tamaño máximo de archivo es 10 MB. Comprime tu archivo aquí: <a href="https://nmscd.com/Image-Compressor/" target="_blank" rel="noopener noreferrer">Compresor de imagen</a>'
      : ''
  );

  const fileInput = element.previousElementSibling as HTMLInputElement;
  const sanitisedName = sanitiseString(filename);
  fileInput.value = sanitisedName;
  wikiCode(fileInput);
  // this section handles an automatic notice about Special:Upload, since this is a big source of confusion for users
  if (staticBooleans.uploadShown) return; // ignore following code if we already alerted user about Special:Upload
  explanation(
    'Sube tu foto a la wiki!',
    `No olvides subir tu imagen a la wiki en <a href="https://nomanssky.fandom.com/wiki/Special:Upload?multiple=true" target="_blank" rel="noopener noreferrer">Especial :Subir</a>.
    El botón de carga solo completa automáticamente el nombre de la imagen en el código, no se carga automáticamente en la wiki.
    <div class="mt-3"><span class="has-text-weight-bold">NOTA</span>: Puede acceder a esta ventana emergente en cualquier momento haciendo clic en "?" junto al botón de carga de la imagen principal.</div>`
  );
  staticBooleans.uploadShown = true;
}

/**
 * Toggles the visibility of all elements with a matching `data-${attributeName}` attribute
 * based on the given `sectionName`. If called without arguments, initializes button element `data-display${id}`
 * attributes for all buttons with class 'sectionToggle'.
 *
 * @param {string} sectionName - The value of the `data-${attributeName}` attribute to match.
 * @param {HTMLElement} button - The button element that triggered the toggle action.
 * @param {string} [attributeName='section'] - The name of the data attribute to match against.
 */
export function toggleSection(
  sectionName: string = '',
  button: HTMLButtonElement | undefined = undefined,
  attributeName: string = 'section'
) {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-${attributeName}~="${sectionName}"]`);
  const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[data-button-id]');
  const childindex = getChildIndex(Array.from(buttons), 'dataset.buttonId');

  if (!arguments.length) {
    const buttonElements: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.sectionToggle button');
    for (let i = 0; i < buttonElements.length; i++) {
      const button = buttonElements[i];
      button.dataset.buttonId ??= (childindex + i).toString();
      const id = button.dataset.buttonId;
      button.dataset[`display${id}`] = button.dataset.displayDefault ?? '';
    }
    return;
  }

  button!.dataset.buttonId ??= childindex.toString();
  const id = button!.dataset.buttonId;
  const displayID = `display${id}`;
  const state = button!.dataset[displayID];

  for (const element of Array.from(elements)) {
    const object = element.dataset;
    let hide = false;
    for (const key in object) {
      if (!key.includes('display') || key === displayID) continue;
      if (object[key] === 'none') {
        hide = true;
        break;
      }
    }
    if (hide) continue;

    element.style.display = state ? '' : 'none';
    element.dataset[displayID] = state ? '' : 'none';
  }
  button!.innerText = state ? 'Ocultar' : 'Mostrar';
  button!.dataset[displayID] = state ? '' : 'none';
}

/**
 * Generates a dropdown for selecting a research team.
 *
 * @param {HTMLInputElement} [inputElement=globalElements.input.researchTeam] - The input element to generate the dropdown for.
 * @returns {void}
 */
export function researchTeamDropdown(
  inputElement: HTMLSelectElement = globalElements.input.researchTeam as HTMLSelectElement
) {
  if (!inputElement) return;
  const prevSelect = inputElement.value;
  const teams = ['', '', ''];

  setDropdownOptions(inputElement, teams);
  inputElement.value = prevSelect;
  if (!arguments.length) researchTeam();
}

/**
 * Adds a "researchteam" value to `pageData`, and displays it on the page.
 *
 * If no "researchteam" value is given, this function will add a default value based on the "civilized" value in `pageData`.
 *
 * Additionally, this function expands some "civilized" specific "researchteam" values, and updates the displayed value on the page.
 *
 * @function
 * @returns {void}
 */
export function researchTeam() {
  const researchteamInput = globalElements.input.researchTeam as HTMLSelectElement;
  const {
    value: researchteamValue,
    dataset: { destNoauto: dest },
  } = researchteamInput;
  if (!dest) return;
  pageData[dest] = researchteamValue;
  const exceptions = ['base', 'racetrack'];
  const researchteam = (() => {
    switch (researchteamValue) {
      case '':
        return '';

      case '':
        return '';

      default:
        return exceptions.includes(pageData.pageType as string) ? '' : '';
    }
  })();
  const outputElement = globalElements.output[dest] as HTMLElement;
  outputElement.innerText = researchteam as string;
}

/**
 * Adds documentation to a page if the documenter is not the same as the discoverer.
 * If docByExternal is defined, it will call that function instead.
 *
 * @return {void}
 */
export function docBy() {
  if (typeof globalFunctions.docByExternal == 'function') {
    globalFunctions.docByExternal();
    return;
  }

  const docByElement = globalElements.input.docbyInput as HTMLInputElement;
  if (!docByElement) return;
  const documenter = sanitiseString(docByElement.value);
  const discoverer = pageData.discovered ?? pageData.builder;
  const discoveredlink = pageData.discoveredlink ?? pageData.builderlink;
  const dest = docByElement.dataset.destNoauto;
  if (!dest) return;
  const chapter = displayResearch();
  const formattedDocumenter = formatName(documenter);
  const discArray = [discoverer, discoveredlink];

  const outputElement = globalElements.output[dest] as HTMLElement;
  if (documenter && !discArray.includes(documenter)) {
    outputElement.style.display = '';
    outputElement.innerText = `Documented by ${chapter} ${formattedDocumenter}`;
  } else {
    outputElement.style.display = 'none';
  }
  addInfoBullet();
}

/**
 * Adjusts the researchteam for display in a sentence.
 *
 * @function
 * @returns {string} Returns a string that describes the research team
 */
export function displayResearch() {
  const chapter = pageData.researchteam as string;
  if (!chapter) return chapter;

  const chapterSentence = (() => {
    switch (chapter) {
      case 'Wiki Scholars':
        return '[[Royal Space Society Wiki Scholars|Royal Space Society Wiki Scholar]]';

      case 'EBC':
        return '[[EBC]] member';
    }
    throw new Error(`Unexpected researchteam: ${chapter}`);
  })();
  return chapterSentence;
}

/**
 * Formats a name to conform to wiki standards.
 * Plain name is italicised, while a linked name has no formatting.
 *
 * @param {string} documenter - The name to be formatted.
 * @returns {string} - The formatted name.
 */
// formats a name to conform to wiki standards. Plain name = italicised, link = no formatting
export function formatName(documenter: string): string {
  if (!documenter) return documenter;

  const documented = (() => {
    if (documenter.includes('[') || documenter.includes('{')) {
      return documenter;
    } else {
      return `''${documenter}''`;
    }
  })();
  return documented;
}

/**
 * Hides the discoverer input fields for a set of paired inputs if one input is populated.
 * If no input IDs are specified, shows all input fields.
 *
 * @param {string} [keepId] - ID of paired input to keep visible.
 * @param {string} [removeId] - ID of paired input to hide.
 * @returns {undefined}
 */
export function hideDiscoverer(keepId: string = '', removeId: string = '') {
  if (!keepId && !removeId) {
    // show everything if no inputs are given
    // I wrote this, but I have no idea how it works
    const elements: NodeListOf<HTMLInputElement> = document.querySelectorAll('[data-player]');
    const usedElements: Set<HTMLInputElement> = new Set(); // holds already done elements so we don't get duplicates
    const inputPairs: Array<Array<HTMLInputElement | null | undefined>> = []; // holds our new pairs
    // builds the pair arrays and pushes them to inputPairs
    for (const element of Array.from(elements)) {
      if (usedElements.has(element)) continue;
      const tableCell = element.closest('.table-cell');
      const prev = tableCell?.previousElementSibling?.previousElementSibling?.querySelector('input');
      const next = tableCell?.nextElementSibling?.nextElementSibling?.querySelector('input');
      const siblingArray = [prev, next];
      const adjacentInput = siblingArray.find((input) => Array.from(elements).includes(input as HTMLInputElement));
      const pair = [element, adjacentInput];
      usedElements.add(adjacentInput as HTMLInputElement);
      inputPairs.push(pair);
    }
    for (const pair of inputPairs) {
      const input1 = pair[0] as HTMLInputElement;
      const input2 = pair[1] as HTMLInputElement;

      if (input1?.value) {
        hideDiscoverer(input1.id, input2.id);
      } else if (input2?.value) {
        hideDiscoverer(input2.id, input1.id);
      } else {
        pair.forEach((input) => hideInput(input as HTMLInputElement, ''));
      }
    }
    return;
  }
  const keepInput = document.getElementById(keepId) as HTMLInputElement;
  const removeInput = document.getElementById(removeId) as HTMLInputElement;

  const showStatus = (() => {
    if (keepInput.value) {
      return 'none'; // remove
    } else {
      return ''; // keep all
    }
  })();
  hideInput(removeInput, showStatus);
  removeInput.value = '';
  wikiCode(removeInput);
}

/**
 * Enables bulletpoint content if more than one sentence.
 *
 * @function
 * @name addInfoBullet
 * @returns {void}
 */
export function addInfoBullet() {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll('[data-add-info]');
  const lines: Array<HTMLElement> = [];
  for (const element of Array.from(elements)) {
    if (
      !(element.nextElementSibling as HTMLElement)?.style.display &&
      (element.nextElementSibling as HTMLElement)?.innerText
    )
      lines.push(element);
    element.innerHTML = '';
  }

  for (const line of lines) {
    if (lines.length > 1) {
      const content = line.dataset.addInfo as string;
      line.innerHTML = content;
    } else {
      line.innerHTML = '';
    }
  }
}

/**
 * Displays an error message for a given input element in a table cell.
 *
 * @param {HTMLElement} element - The input element for which to display the error.
 * @param {string|null} [msg=null] - The error message to display. If null, any existing error message is removed.
 * @returns {void}
 */
export function errorMessage(element: HTMLElement, msg: string = '') {
  const tableCell = element.closest('.data') as HTMLElement;
  tableCell?.querySelector('.error')?.remove();
  element.style.backgroundColor = '';
  (tableCell.previousElementSibling as HTMLElement).style.alignItems = '';
  if (!msg) return;
  element.style.backgroundColor = 'red';
  const div = document.createElement('div');
  div.innerHTML = msg;
  div.className = 'error';
  tableCell.appendChild(div);
  (tableCell.previousElementSibling as HTMLElement).style.alignItems = 'baseline';
}

/**
 * Validates input coordinates in the format "+/-ddd.dd, +/-ddd.dd". Throws an error message if the input is invalid.
 *
 * @param {Boolean} [error=true] - Whether to display an error message if the input is invalid. Defaults to true.
 *
 * @returns {string} - Returns "error" if the input is invalid, otherwise returns undefined.
 *
 * @example
 * // The following input would be considered invalid: "12.34, 56.78"
 * validateCoords();
 */
export function validateCoords(error: boolean = true) {
  const element = globalElements.input.axesInput as HTMLInputElement;
  const axes = element.value;
  const axesRegex = new RegExp(/[+-](?:[0-9]{1,3})\.(?:[0-9]{2}), [+-](?:[0-9]{1,3})\.(?:[0-9]{2})/);
  if (!axes || regexMatch(axes, axesRegex)) {
    errorMessage(element);
    return;
  }
  if (error) errorMessage(element, 'Formato de coordenadas no válido');
  return 'error';
}

/**
 * Hides an input cell and its label cell.
 * @param {HTMLElement} element - The input element to be hidden.
 * @param {string} [displayValue=null] - The CSS display value to apply to the input and label cells. Defaults to an empty string if not specified.
 * @returns {void}
 */
export function hideInput(element: HTMLElement, displayValue: string = '') {
  const inputCell = element.closest('.table-cell') as HTMLElement;
  const labelCell = inputCell.previousElementSibling as HTMLElement;
  const inputRow = [labelCell, inputCell];

  for (const cell of inputRow) {
    if (cell.style.display) {
      cell.style.display = displayValue ?? '';
    } else {
      cell.style.display = displayValue ?? 'none';
    }
  }
}

/**
 * Returns the English article "a" or "an" which should be used before a given word.
 *
 * @param {string} text - The word to prefix with an article.
 * @param {string} [dest=null] - The destination to write the output to using `wikiCode()`. Optional.
 * @returns {string} The article to use before `text`.
 */
export function enPrefix(text: string, dest: string | undefined = undefined) {
  const firstLetter = RegExp(/[a-zA-Z]/)
    .exec(text)?.[0]
    ?.toLowerCase() as string;
  const output = (() => {
    if (vowels.includes(firstLetter)) {
      return 'an';
    } else {
      return 'a';
    }
  })();
  if (dest) wikiCode(output, dest);
  return output;
}

/**
 * Returns true if a string matches a given regular expression.
 *
 * @param {string} string - The string to match.
 * @param {RegExp} regex - The regular expression to match against.
 * @returns {boolean} - True if the string matches the regex, false otherwise.
 */
export function regexMatch(string: string, regex: RegExp): boolean {
  const stringMatches = RegExp(regex).exec(string);
  return stringMatches?.length === 1 && stringMatches[0]?.length === string.length;
}

/**
 * Returns documentation text for a discovery page based on the research team that documented it.
 *
 * @returns {string} - The documentation text, including the research team name if it matches the expected abbreviation.
 */
export function docByResearchteam() {
  const researchteam = pageData.researchteam;
  return researchteam === 'Wiki Scholars' ? ` and documented by the [[Royal Space Society Wiki Scholars]]` : '';
}

/**
 * This function calculates the sum, average, minimum, and maximum of a set of numbers, and formats the results for display on a web page. If no arguments are provided, the function will automatically find and calculate the numbers for all elements with the `numberStats` property.
 *
 * @param {HTMLElement} element - The HTML element to calculate statistics for.
 * @param {number} [decimals=null] - The number of decimal places to use in formatted results. If `null`, the function will use the default number of decimal places.
 * @param {boolean} [outputRaw=false] - Whether to output the raw calculation values along with the formatted results. If `true`, the function will return an object with `formatted` and `raw` properties; if `false`, it will return only the formatted string.
 * @returns {string|Object} The formatted statistics string (and optionally, the raw calculation values).
 */
export function numberStats(
  element: HTMLInputElement | null = null,
  decimals: number | undefined = undefined,
  outputRaw: boolean = false
) {
  if (arguments.length === 0) {
    const numbers: NodeListOf<HTMLInputElement> = document.querySelectorAll('[data-dest-number]');
    for (const element of Array.from(numbers)) {
      const decimals = element.dataset.destNumber as string;
      numberStats(element, parseInt(decimals) || undefined);
    }
    return;
  }

  if (!element) return;

  const dest = element.dataset.destNoauto as string;
  const propertyValue = pageData[dest] as string;
  const prependString = propertyValue.startsWith('-') && !parseFloat(propertyValue) ? '-' : '';
  const propertyData = numberError(element, propertyValue, decimals, outputRaw);
  if (getDestElements(dest)[0]) {
    wikiCode(prependString + propertyData.toString(), dest);
  } else {
    pageData[dest] = prependString + propertyData;
  }
}

/**
 * Validates that a given input element contains only numeric characters, and displays an error message if it doesn't.
 * @param {Element} element - The input element to validate.
 * @param {string} [value=element.value] - The value to validate (defaults to the value of the input element).
 * @param {number} [decimals=null] - The number of decimal places to use when formatting the input value (if outputRaw is false).
 * @param {boolean} [outputRaw=false] - If true, returns the raw input value without formatting.
 * @returns {string|number} - The input value, parsed as a number (if valid) or an empty string (if not valid).
 */
export function numberError(
  element: HTMLInputElement,
  value: string = element.value,
  decimals: number | undefined = undefined,
  outputRaw: boolean = false
) {
  const number = getNumber(value, decimals, outputRaw);
  const allowedSymbols = ['+', '-'];
  if (number || !value || allowedSymbols.includes(value)) {
    errorMessage(element);
  } else {
    errorMessage(element, 'Sólo debe contener números');
  }
  return number;
}

/**
 * Parses a string containing a number and returns it as a formatted number string or numeric value.
 * @param {string} number - The string to parse as a number.
 * @param {number} [decimals=null] - The number of decimal places to use when formatting the output value.
 * @param {boolean} [outputRaw=false] - If true, returns the raw parsed value without formatting.
 * @returns {string|number} - The parsed number, formatted with commas and the specified number of decimal places (if decimals is non-null), or the raw parsed value (if outputRaw is true).
 */
export function getNumber(
  number: string,
  decimals: number | undefined = undefined,
  outputRaw: boolean = false
): number | string {
  const raw = parseFloat(number.replaceAll(',', ''));
  const decimalNumber = parseInt(String(decimals));
  const output = (() => {
    if (isNaN(raw)) return '';
    if (!isNaN(decimalNumber)) return raw.toFixed(decimalNumber);
    return raw;
  })();
  if (outputRaw || !output) return output.toString();
  return new Intl.NumberFormat('en-UK', { minimumFractionDigits: decimalNumber || 0 }).format(output as number); // does 3 decimals by default if no decimal number is given.
}

/**
 * Creates HTML5 datalists with the provided entries and appends them to the <body> tag.
 * @param {Object} object - An object containing datalist IDs as keys with an array of entries as values.
 * @example
 * // Creates a datalist with ID datalist1 and two entries, "entry1" and "entry2"
 * datalists({datalist1: ["entry1", "entry2"]});
 */
export function datalists(object: Datalist) {
  for (const id in object) {
    const datalist = document.createElement('datalist');
    datalist.id = id;
    for (const option of object[id]) {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      datalist.appendChild(optionElement);
    }
    document.body.appendChild(datalist);
  }
}
/**
 * Creates HTML5 datalists with the provided entries and appends them to the <body> tag.
 * @param {Object} object - An object containing datalist IDs as keys with an array of entries as values.
 * @example
 * // Creates a datalist with ID datalist1 and two entries, "entry1" and "entry2"
 * datalists2({datalist1: ["entry1", "entry2"]});
 */
export function datalists2(object: { [key: string]: string; }): string {
  let selectedValue = '';
  const datalist = document.createElement('datalist');
  datalist.id = 'creatureNotesDatalist';
  for (const id in object) {
    const optionElement = document.createElement('option');
    optionElement.value = object[id];
    datalist.appendChild(optionElement);
  }
  document.body.appendChild(datalist);

  const input = document.querySelector('input[list="creatureNotesDatalist"]');
  if (input) {
    input.addEventListener('input', function(e) {
      const selectedOption = Object.keys(object).find(key => object[key] === (e.target as HTMLInputElement).value);
      if (selectedOption) {
        e.preventDefault();
        (e.target as HTMLInputElement).value = selectedOption;
        selectedValue = selectedOption;
      }
    });
  }
  return selectedValue;
}

export function datalists3(object: { [key: string]: string; }): string {
  let selectedValue = '';
  const datalist = document.createElement('datalist');
  datalist.id = 'creatureBehavioursDatalist';
  for (const id in object) {
    const optionElement = document.createElement('option');
    optionElement.value = object[id];
    datalist.appendChild(optionElement);
  }
  document.body.appendChild(datalist);
const input = document.querySelector('input[list="creatureBehavioursDatalist"]');
if (input) {
  input.addEventListener('input', function(e) {
    const selectedOption = Object.keys(object).find(key => object[key] === (e.target as HTMLInputElement).value);
    if (selectedOption) {
      e.preventDefault();
      (e.target as HTMLInputElement).value = selectedOption;
      selectedValue = selectedOption;
    }
  });
}
return selectedValue;
}

export function datalists4(object: { [key: string]: string; }): string {
  let selectedValue = '';
  const datalist = document.createElement('datalist');
  datalist.id = 'creatureDietDatalist';
  for (const id in object) {
    const optionElement = document.createElement('option');
    optionElement.value = object[id];
    datalist.appendChild(optionElement);
  }
  document.body.appendChild(datalist);
const input = document.querySelector('input[list="creatureDietDatalist"]');
if (input) {
  input.addEventListener('input', function(e) {
    const selectedOption = Object.keys(object).find(key => object[key] === (e.target as HTMLInputElement).value);
    if (selectedOption) {
      e.preventDefault();
      (e.target as HTMLInputElement).value = selectedOption;
      selectedValue = selectedOption;
    }
  });
}
return selectedValue;
}

/**
 * Valida la opción seleccionada en un elemento datalist.
 * @param {HTMLInputElement} element - El elemento input con el datalist.
 * @param {Object} datalists - El objeto que contiene todos tus objetos de datalist.
 * @returns {void}
 */
export function forceDatalist(element: HTMLInputElement, datalists: {[key: string]: {[key: string]: string}}) {
  const key = element.value;
  const datalistId = element.getAttribute('list');
  if (datalistId !== null) {
    const datalistObject = datalists[datalistId];
    if (datalistObject && !datalistObject[key] && key) {
      errorMessage(
        element,
        'No es una opción válida. Si cree que se trata de un error, envíe un <a href="https://forms.gle/LRhzWjMRkXoKd9CcA" rel="noreferrer noopener" target="_blank">informe de error</a>.'
      );
    } else {
      errorMessage(element);
    }
  }
}


/**
 * Checks the integrity of the page data and returns an error message if there's an issue.
 * @param {HTMLElement} [element=null] - The HTML element related to the data check.
 * @param {boolean} [simple=false] - Indicates whether to perform a simple data check.
 * @returns {string} A string with an error message if a data integrity issue was found, or an empty string otherwise.
 */
export function checkDataIntegrity(element: HTMLElement | null = null, simple: boolean = false) {
  if (staticBooleans.debug) return '';
  const currentText = md5Hex(JSON.stringify(pageData));
  const savedText = dataIntegrityObj.text;
  const { name, portalglyphs: glyphs, region /**hub */} = pageData;

  if (
    name &&
    glyphs &&
    region &&
   /** hub &&*/
    ((currentText === savedText && dataIntegrityObj.link === element?.dataset?.link && dataIntegrityObj.copy) || simple)
  ) {
    dataIntegrityObj.copy = false;
    dataIntegrityObj.link = '';
    return '';
  } else if (!name) {
    return '¡Falta el nombre!';
  } else if (!glyphs) {
    return '¡Faltan los Glifos!';
  } else if (!glyphs || !region) {
    return '¡Glifos Incorrectos!';
 /** } else if (!hub) {
    return '¡Falta el Hub!';*/
  } else {
    return '¡Copie el código primero!';
  }
}

/**
 * Removes all newlines from a given string.
 *
 * @param {string} text - The text string to remove newlines from.
 * @return {string} - A modified string with all newlines replaced by empty spaces.
 */
export function removeNewlines(text: string): string {
  if (!text) return '';
  const newlineRegex = /\r?\n|\r/g;
  const textString = text.replace(newlineRegex, '');
  return textString;
}

/**
 * Returns the selected text within a given section of the wiki page, after performing some preprocessing to remove unwanted text.
 * @function
 * @param {HTMLElement} section - The HTML element representing the section to search for selected text.
 * @returns {void}
 */
export function getSelectedText(section: HTMLElement) {
  // this is some stupid BS: Chrome selects the button text, despite it having user-select:none. #chromesucks
  // I have no idea how to fix this, so I will just remove the button text from the string :shrug:
  const buttonText = document.getElementById('switchTheme')?.innerText as string;

  const wikiTextContainer = section.closest('.wikiText') as HTMLDivElement;
  const sectionText = removeNewlines(wikiTextContainer?.innerText).trim();
  const selected = (() => {
    const text = removeNewlines(window.getSelection()!.toString()).trim();
    if (text.endsWith(buttonText)) return text.replace(buttonText, '').trim();
    return text;
  })();

  dataIntegrityObj.text = md5Hex(JSON.stringify(pageData));
  dataIntegrityObj.copy = sectionText === selected;
  dataIntegrityObj.link = wikiTextContainer?.dataset?.link as string;
}

/**
 * Enables text marking on the page. If in debug mode, marks all text. Otherwise, marks only text that has errors.
 * @function
 * @returns {void}
 */
export function enableTextMarking() {
  document.body.dataset.mark = staticBooleans.debug ? true.toString() : (!checkDataIntegrity(null, true)).toString();
}

/**
 * Checks data integrity and displays an error message if data is missing or incorrect
 * @function preventCopy
 * @returns {void}
 */
export function preventCopy() {
  const error = checkDataIntegrity(null, true);
  if (error) {
    explanation('Datos faltantes/incorrectos', error);
    enableTextMarking();
  }
}

/**
 * Assigns a default value to an element if it is empty
 * @function assignDefaultValue
 * @param {HTMLElement} element - The element to assign a default value to
 * @param {string} [value=element.dataset.default] - The default value to assign (if no value is provided, the element's "data-default" attribute will be used)
 * @returns {void}
 */
export function assignDefaultValue(element: InputElements, value: string = element.dataset.default as string) {
  if (element.value.trim()) return;
  const dest = element.dataset.dest ?? element.dataset.destNoauto;
  wikiCode(value, dest);
}

/**
 * Removes all sections in a given array
 * @function removeSection
 * @param {Array.<HTMLElement>} array - The array of elements to remove
 * @returns {void}
 */
export function removeSection(array: Array<HTMLElement>) {
  for (const section of array) {
    section.remove();
  }
}

/**
 * Removes a specific section based on its name and an attribute
 * @function removeSpecificSection
 * @param {string} sectionName - The name of the section to remove
 * @param {string} [attribute='section'] - The data-attribute to search for (defaults to "section")
 * @returns {void}
 */
export function removeSpecificSection(sectionName: string, attribute: string = 'section') {
  const sections: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-${attribute}="${sectionName}"]`);
  removeSection(Array.from(sections));
}

/**
 * Hides the original name in wikicode if not provided
 * @function hideOrgName
 * @returns {void}
 */
export function hideOrgName() {
  const orgName = pageData.oldName;
  const aliascElement = (globalElements.output.oldName as HTMLOutputElement).parentElement;
  if (!aliascElement) return;
  aliascElement.style.display = orgName ? '' : 'none';
}

/**
 * Returns the next available child index of an array of objects, based on a given property.
 *
 * @param {Array} array - The array of objects to check.
 * @param {string} data - The path to the property to check for an index, in dot notation (e.g. 'dataset.planet').
 * @returns {number} - The next available child index.
 */
export function getChildIndex(array: Array<HTMLElement>, data: string) {
  const IDs = [0]; // dummy element to avoid if statement
  // get all numbers of the string into an array, then join that array
  for (const element of array) {
    const idNumber = extractNumber(fetchFromObject(element, data) as string) as number;
    IDs.push(idNumber);
  }
  function compareNumbers(a: number, b: number) {
    return a - b;
  }
  IDs.sort(compareNumbers);
  return IDs[IDs.length - 1] + 1;

  // necessary to access properties of different depths of an element
  // takes an object and a string representing the path to the property in dot notation ('dataset.planet')
  // code from https://stackoverflow.com/questions/4255472/javascript-object-access-variable-property-by-name-as-string
  function fetchFromObject(obj: HTMLElement | Object, prop: string): boolean | string | Object {
    //property not found
    if (typeof obj === 'undefined') return false;

    //index of next property split
    const index = prop.indexOf('.');

    //property split found; recursive call
    if (index > -1) {
      //get object at property (before split), pass on remainder
      return fetchFromObject(obj[prop.substring(0, index) as keyof Object], prop.substring(index + 1));
    }

    //no split; get property
    return obj[prop as keyof Object];
  }
}

/**
 * Sorts an object alphabetically by keys.
 * @param {Object} obj - The object to be sorted.
 * @param {boolean} [number=false] - A flag indicating whether numbers should be sorted correctly (i.e. by numerical value)
 * or not (i.e. by string value). Default is false.
 * @returns {Object} - A new object with the same key-value pairs as the input object, but with the keys sorted alphabetically.
 */
export function sortObj(obj: SortObj, number: boolean = false) {
  const resultObj: SortObj = {};
  if (!number) {
    return Object.keys(obj)
      .sort()
      .reduce((result, key) => {
        result[key] = obj[key];
        return result;
      }, resultObj);
  }
  const keys = Object.keys(sortObj(obj));
  const numbers = keys
    .map((key) => extractNumber(key))
    .map(Number)
    .sort((a, b) => a - b);
  for (const number of numbers) {
    const keyIndex = keys.findIndex((element) => extractNumber(element) === number);
    const key = keys[keyIndex];
    keys.splice(keyIndex, 1);
    resultObj[key] = obj[key];
  }
  return resultObj;
}

/**
 * Returns a number containing all the integers in a given string.
 * This function only works for integers.
 * If there are no integers, returns an empty string.
 *
 * @param {string} string - The string to extract integers from.
 * @returns {string} A number containing all the integers in the input string. Returns an empty string if no integers were found.
 */
export function extractNumber(string: string): string | number {
  const matchString = string?.match(/[0-9]/g)?.join('');
  return matchString ? parseInt(matchString) : '';
}

/**
 * Returns a string indicating whether a given number is even or odd.
 *
 * @param {number} number - The number to check.
 * @returns {string} A string indicating whether the number is 'even' or 'odd'
 */
export function oddEven(number: number) {
  if (number % 2 == 0) return 'even'; // NoSonar this checks if the number is even
  return 'odd';
}

/**
 * Replace specified variables in a HTML string, and add eventListeners to the resulting DOM.
 * @param {string} html - The string of HTML to be edited.
 * @param {Object} [varObj] - An object containing key-value pairs to replace in the loaded HTML.
 * @param {Object} [funcArray] - An ElementFunctions array containing event listeners to put in the loaded HTML.
 * @returns {string|Document} - A string of the edited HTML or a dom with attached eventListeners, depending on the input arguments.
 */
export function loadHTML(
  html: string,
  varObj: { [key: string]: string } = {},
  funcArray: ElementFunctions = []
): string | Document {
  let processingHTML = html;
  for (const variable in varObj) {
    processingHTML = processingHTML.replaceAll('${' + variable + '}', varObj[variable]);
  }
  if (!funcArray.length) return processingHTML;

  const parser = new DOMParser();
  const dom = parser.parseFromString(processingHTML, 'text/html');

  for (const functionObj of funcArray) {
    const elements: NodeListOf<HTMLElement> = dom.querySelectorAll(`[data-evt-id="${functionObj.element as string}"]`);
    for (const element of Array.from(elements)) {
      assignFunction({ element, handler: functionObj.handler ?? undefined, func: functionObj.func });
    }
  }
  return dom;
}

export function triggerEvent(element: HTMLElement, evt: keyof HTMLElementEventMap): void {
  const event = new Event(evt);
  element.dispatchEvent(event);
}

export function getCurrentHTMLFile() {
  return window.location.pathname.split('/')!.at(-1)!.slice(0, -5); // NoSonar stripping the `.html`
}

export function addDomAsElement(dom: Document, dest: HTMLElement, position: InsertPosition = 'afterbegin'): void {
  const elements = Array.from(dom.body.children);
  if (position === 'afterbegin' || position === 'afterend') elements.reverse();
  for (const element of elements) {
    dest.insertAdjacentElement(position, element);
  }
}

export function getWormAlbum() {
  return 'Royal Space Society Rare Fauna Album#Sandworm|Royal Space Society Rare Fauna';
}

export function limitCreatureSize(input: HTMLInputElement) {
  input.maxLength = input.value.startsWith('-') ? 4 : 3; // NoSonar negative numbers must have a limit of 4 to allow for `-0.1`. Else use 3 for `0.1`
}

export function capitaliseFirst(inputString: string) {
  return inputString.slice(0, 1).toUpperCase() + inputString.slice(1);
}

export function resetGallery() {
  const galleryStore = useGalleryStore();
  galleryStore.$reset();
}

export function hashPageData() {
  const pageDataStore = usePageDataStore();
  const pageDataArray = Object.entries(pageDataStore);
  const pageDataString = pageDataArray.join();
  return md5Hex(pageDataString);
}

// TODO: rename this function when the old one (numberError) is not used anymore
export function numberErrorComponent(
  value: string,
  decimals: number | undefined = undefined,
  outputRaw: boolean = false
) {
  const number = getNumber(value, decimals, outputRaw);
  const allowedSymbols = ['+', '-'];
  return number || !value || allowedSymbols.includes(value) ? '' : 'Sólo debe contener números';
}

// TODO: rename this function when the old one (forceDatalist) is not used anymore
export function forceDatalistComponent(value: string, list: string[]) {
  const option = list.includes(value);
  return !option && value
    ? 'No es una opción válida. Si cree que se trata de un error, envíe un <a href="https://forms.gle/LRhzWjMRkXoKd9CcA" rel="noreferrer noopener" target="_blank">reporte de bugs</a> aaa.'
    : '';
}
