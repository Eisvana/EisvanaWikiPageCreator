import { getRouteComponent } from '@/helpers/router';
import { getCurrentRoute } from '@/helpers/router';

// build a custom "fake router" instead of using client-side routing to avoid 404 pages on direct navigation
export const router: Record<string, string> = {
  flora: 'Flora',
  mineral: 'Mineral',
  home: 'Home',
  base: 'Base',
};

export const route = getCurrentRoute();
export const componentName = getRouteComponent();
