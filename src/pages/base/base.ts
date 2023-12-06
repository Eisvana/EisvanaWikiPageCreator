/**
 * @fileoverview Provides functions which can be used by the Base page creator.
 */

import { checkboxWikiCode, errorMessage, regexMatch, wikiCode } from '../../common';
import { globalElements, pageData } from '../../variables/objects';

/**
 * Validates Discord tags.
 *
 * @returns {void}
 */
export function validateDiscord() {
  const element = globalElements.input.censusDiscordInput as HTMLInputElement;
  const tag = element.value;

  const hasValidNewTag = /^[a-z0-9._]+$/.test(tag);

  errorMessage(
    element,
    !tag || hasValidNewTag ? '' : 'Invalid Discord tag. Please give your username, not your display name.'
  );
}

/**
 * Validates the input value for a Reddit user name and generates wiki code for it.
 * @function
 *
 * @returns {void}
 */
export function validateReddit() {
  const element = globalElements.input.censusRedditInput as HTMLInputElement;
  const value = element.value.trim();
  const redditName = (() => {
    if (value.toLowerCase().startsWith('u/')) {
      return value.substring(2); // NoSonar 0-1 are the `u/`, and we want to ignore that
    } else {
      return value;
    }
  })();
  if (redditName.includes(' ')) {
    errorMessage(element, 'Reddit name must not include spaces');
    return;
  } else {
    errorMessage(element);
  }
  const dest = element.dataset.destNoauto;
  wikiCode(redditName, dest);
}

/**
 * Capitalizes the input value of a friend code input element and calls the wikiCode function.
 * @function
 */
export function capitaliseFriendCode() {
  const element = globalElements.input.censusFriendInput as HTMLInputElement;
  element.value = element.value.toUpperCase();
  const dest = element.dataset.destNoauto;
  wikiCode(element, dest);
}

/**
 * Validates a friend code format (xxxx-xxxx-xxxxx).
 * @function
 * @returns {void}
 */
export function validateFriendcode() {
  const element = globalElements.input.censusFriendInput as HTMLInputElement;
  const friendCode = element.value;
  const friendCodeRegex = new RegExp(/(?:[0-9A-Za-z]{4}-){2}[0-9A-Za-z]{5}/);
  if (!friendCode || regexMatch(friendCode, friendCodeRegex)) {
    errorMessage(element);
  } else {
    errorMessage(element, 'Wrong friend code format');
  }
}

/**
 * Automatically checks or unchecks a checkbox to create a census entry.
 *
 * @function
 * @returns {void}
 */
export function createCensusEntry() {
  const checkbox = globalElements.input.censusShowInput as HTMLInputElement;
  const input = globalElements.input.censusPlayerInput as HTMLInputElement;
  const inputBool = Boolean(input.value); // boolean from the input (true if any input is given)
  if (checkbox.checked === inputBool) return;
  checkbox.checked = inputBool;
  checkboxWikiCode(checkbox);
}

export function validateSocial() {
  const element = globalElements.input.censusSocialInput;
  const link = pageData.censussocial;
  if (typeof link !== 'string' || !(element instanceof HTMLInputElement)) return;
  const isValid = !link || isValidHttpUrl(link);
  errorMessage(element, isValid ? undefined : 'Please provide the full link');
}

function isValidHttpUrl(string: string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function switchCensusSocialParm(keepId: string = '', removeId: string = '') {
  if (!keepId && !removeId) {
    const socialParms = ['censussocial', 'censusreddit'];
    const parmsHaveContent = socialParms.map((parm) => Boolean(pageData[parm]));
    if (parmsHaveContent.every((parm) => !parm)) {
      showSocialParm();
    } else {
      for (const parm of socialParms) {
        const outputElement = globalElements.output[parm];
        if (!(outputElement instanceof HTMLOutputElement)) continue;
        const parent = outputElement.parentElement;
        if (parent) parent.style.display = pageData[parm] ? '' : 'none';
      }
    }
    return;
  }

  if (!pageData[keepId]) {
    showSocialParm();
    return;
  }

  const keepOutput = globalElements.output[keepId];
  const removeOutput = globalElements.output[removeId];

  if (!(keepOutput instanceof HTMLOutputElement) || !(removeOutput instanceof HTMLOutputElement)) return;

  if (keepOutput.parentElement) keepOutput.parentElement.style.display = '';
  if (removeOutput.parentElement) removeOutput.parentElement.style.display = 'none';

  function showSocialParm() {
    const social = globalElements.output.censussocial;
    const reddit = globalElements.output.censusreddit;
    if (!(social instanceof HTMLOutputElement) || !(reddit instanceof HTMLOutputElement)) return;
    const socialParent = social.parentElement;
    const redditParent = reddit.parentElement;

    if (socialParent) socialParent.style.display = '';
    if (redditParent) redditParent.style.display = 'none';
  }
}
