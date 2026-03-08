export function toLocalPoint(el: HTMLElement, clientX: number, clientY: number): { x: number; y: number } {
  const rect = el.getBoundingClientRect();
  const scaleX = el.offsetWidth / rect.width;
  const scaleY = el.offsetHeight / rect.height;
  return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
}
