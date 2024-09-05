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

  function removeSpecificMarkup(string: string, markup: string): string {
    const doubleMarkup = markup.repeat(2); // NoSonar we need to repeat the markup 2x because MW link syntax uses 2 characters (`[[`, `{{`)
    const noMarkupString = string
      .split(doubleMarkup) // split based on double markup (isolate valid markup)
      .map((part) => part.replaceAll(markup, '')) // remove all invalid markup
      .join(doubleMarkup); // join back together using double markup
    return noMarkupString;
  }

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
