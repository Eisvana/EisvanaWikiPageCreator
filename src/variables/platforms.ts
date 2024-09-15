import { mapOptions } from "@/helpers/selectMapping";

export const platforms = {
  PC: 'PC',
  PlayStation: 'PS',
  Xbox: 'XB',
  Switch: 'NS',
} as const;

export const mappedPlatformOptions = mapOptions(platforms)
