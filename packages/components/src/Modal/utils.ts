export function getOffset(el?: HTMLElement | null) {
  if (!el) {
    return;
  }
  const rect = el.getBoundingClientRect();

  const position = {
    left: rect.left,
    top: rect.top,
  };

  const window = el.ownerDocument.defaultView;

  position.left += window?.pageXOffset || 0;
  position.top += window?.pageYOffset || 0;

  return position;
}
