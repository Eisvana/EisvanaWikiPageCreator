import '@/main';

const isEisvanaHost = window.location.host === 'wiki.eisvana.com';
const linkElement: HTMLAnchorElement | null = document.querySelector('a[href=".."]');
if (linkElement && isEisvanaHost) linkElement.href = 'https://eisvana.com';
