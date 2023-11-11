import { defineStore } from 'pinia';

export interface FileItem {
  file: File;
  id: number;
  desc: string;
}

interface State {
  galleryFiles: FileItem[];
  locationFiles: FileItem[];
}

export const useGalleryStore = defineStore('gallery', {
  state: (): State => {
    return {
      galleryFiles: [],
      locationFiles: [],
    };
  },
});
