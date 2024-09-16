export function emitGlobalEvent(evt: string) {
  const event = new Event(evt);
  document.dispatchEvent(event);
}
