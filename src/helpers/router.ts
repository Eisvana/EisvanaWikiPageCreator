import { route, router } from '@/variables/route';

export function getCurrentRoute() {
  const path = window.location.pathname;
  const fileName = path.split('/').at(-1);
  const fileNameWithoutExtension = fileName?.split('.').slice(0, -1).join('.');
  return fileNameWithoutExtension ?? '';
}

export function getRouteComponent() {
  if (!route || !router[route]) return router.home;
  return router[route];
}
