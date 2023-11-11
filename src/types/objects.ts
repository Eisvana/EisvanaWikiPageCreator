export interface StdObj {
  [key: string]: string;
}

export interface SortObj {
  [key: string]: unknown;
}

export interface TransformedElementFunctions {
  [key: string]: {
    // ID of HTMLElement
    [key: string]: {
      // handler
      element: HTMLElement;
      func: Array<() => void>;
    };
  };
}

export interface Datalist {
  [key: string]: Array<string>;
}

export interface CreatureData {
  ecosystems: {
    [key: string]: {
      [key: string]: {
        commonName: string;
        produces: Array<string>;
      };
    };
  };
  catalogs: {
    [key: string]: Array<string>;
  };
}

export interface PicObj {
  picName?: string;
  desc?: string;
}

export interface PageLinkProps {
  text: string;
  url: string;
  inactive?: boolean;
}

export interface BuiltByProps {
  text: string;
  link?: string;
  imgAlt?: string;
  img?: string;
}
export interface CivImageProps {
  link?: string;
  imgAlt: string;
  img: string;
}
