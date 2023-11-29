/**
 * @fileoverview Provides functions which can be used by the Creature page creator.
 */

import { triggerEvent } from "../../common";
import { globalElements, pageData } from "../../variables/objects";
import { getGenderData } from "../../datalists/creatureDatalists";

function setDropdownOptions(selectElement: HTMLSelectElement, options: Record<string, string>) {
  // Clear existing options
  selectElement.innerHTML = '';

  // Iterate over each option
  for (const key in options) {
      // Create a new option element
      const optionElement = document.createElement('option');

      // Set the value and text of the option
      optionElement.value = key;
      optionElement.text = options[key];

      // Add the option to the select element
      selectElement.add(optionElement);
  }
}

export function genderDropdown() {
  const genus = pageData.genus as string;
  const genderInput = globalElements.input.genderInput as HTMLSelectElement;
  const gender2Input = globalElements.input.gender2Input as HTMLSelectElement;
  const genderData = getGenderData(genus) as Record<string, string>;
  const gender2Data = getGenderData(genus) as Record<string, string>;

  // Pass entire object instead of just keys
  setDropdownOptions(genderInput, genderData);
  setDropdownOptions(gender2Input, gender2Data);

  for (const input of [genderInput, gender2Input]) {
      triggerEvent(input, 'change');
  }
}
