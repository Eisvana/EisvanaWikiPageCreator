export interface BasicQueryData {
  format: string;
  origin: string;
}

export interface BasicQueryApiData extends BasicQueryData {
  action: string;
}

export interface RawQueryObject extends BasicQueryApiData {
  page: string;
}

export interface SectionContentQueryObject extends RawQueryObject {
  prop: string;
  section: number;
}

export interface ParsedWikitextObject {
  parse: {
    title: string;
    pageid: number;
    wikitext: {
      '*': string;
    };
  };
}
