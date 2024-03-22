import '../../startup/minimal';

const eisvanaHosts = ['wiki.eisvana.com', 'nmswikipagecreator.eisvana.com', 'eisvanawikipagecreator.eisvana.com'];
if (eisvanaHosts.includes(window.location.host)) {
  const linkElement: HTMLAnchorElement | null = document.querySelector('a[href=".."]');
  if (linkElement) linkElement.href = 'https://eisvana.com';
}
