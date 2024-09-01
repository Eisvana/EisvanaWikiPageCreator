export const mapOptions = (mappingObj: Record<string, string>) =>
  Object.entries(mappingObj).map((item) => ({ label: item[0], value: item[1] }));
