/**
 * True: String matches Regex. False: String does not match Regex
 * @param string string to test
 * @param regex regex to test string for
 * @returns boolean whether the string matches the regex
 */
export function regexMatch(string: string, regex: RegExp): boolean {
  const stringMatches = RegExp(regex).exec(string);
  return stringMatches?.length === 1 && stringMatches[0]?.length === string.length;
}

/**
 * True: Axes format is valid. False: Axes format is invalid.
 * @param axes axes to test for proper format
 * @returns boolean whether axes are valid or not
 */
export function validateCoords(axes: string) {
  const axesRegex = new RegExp(/[+-](?:[0-9]{1,3})\.(?:[0-9]{2}), [+-](?:[0-9]{1,3})\.(?:[0-9]{2})/);
  return !axes || regexMatch(axes, axesRegex);
}

export function isValidHttpUrl(string: string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
