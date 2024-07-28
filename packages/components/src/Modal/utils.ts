export function getOffset(el?: HTMLElement | null) {
  if (!el) {
    return;
  }
  const rect = el.getBoundingClientRect();

  const position = {
    left: rect.left + rect.width / 2,
    top: rect.top + rect.height / 2,
  };

  const window = el.ownerDocument.defaultView;

  position.left += window?.pageXOffset || 0;
  position.top += window?.pageYOffset || 0;

  return position;
}
