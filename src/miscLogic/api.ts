import type { BasicQueryApiData, BasicQueryData, RawQueryObject, SectionContentQueryObject } from '@/types/api';
import { isWikitext } from './typeAssertions';

const apiPath = 'https://nomanssky.fandom.com/api.php';

const basicQueryData: BasicQueryData = {
  format: 'json',
  origin: '*',
};

const getParseQueryRawObject: BasicQueryApiData = {
  ...basicQueryData,
  action: 'parse',
};

const getSectionQueryRawObject = (page: string): RawQueryObject => ({
  ...getParseQueryRawObject,
  page,
});

const getSectionContentQueryObject = (pageName: string, section: number): SectionContentQueryObject => ({
  ...getSectionQueryRawObject(pageName),
  prop: 'wikitext',
  section,
});

const buildQueryUrl = (queryObject: SectionContentQueryObject) =>
  `${apiPath}?${Object.entries(queryObject)
    .map((param) => param.join('='))
    .join('&')}`;

const getPageSectionContentApiUrl = (pageName: string, section: number) =>
  buildQueryUrl(getSectionContentQueryObject(pageName, section));

export async function fetchSectionWikiText(pageName: string, section: number) {
  const url = getPageSectionContentApiUrl(pageName, section);
  const apiResponse = await apiCall(url);
  if (!isWikitext(apiResponse)) return;
  const sectionWikitext = apiResponse.parse.wikitext['*'];
  return sectionWikitext;
}

async function apiCall(url: string): Promise<unknown> {
  const data = await fetch(url);
  const textData = await data.text();
  const json: unknown = JSON.parse(textData);
  return json;
}
