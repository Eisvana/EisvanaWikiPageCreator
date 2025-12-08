import type { ParsedWikitextObject } from '@/types/api';

function isObject(obj: unknown): obj is object {
  return Boolean(obj) && typeof obj === 'object';
}

export function isWikitext(wikitextObject: unknown): wikitextObject is ParsedWikitextObject {
  if (!isObject(wikitextObject) || !('parse' in wikitextObject)) return false;
  const { parse } = wikitextObject;
  if (!isObject(parse) || !('wikitext' in parse)) return false;
  const { wikitext } = parse;
  if (!isObject(wikitext) || !('*' in wikitext)) return false;
  return typeof wikitext['*'] === 'string';
}
