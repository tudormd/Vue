export default {
  bind(elem: Element, { value }: { value: string }) {
    M.Tooltip.init(elem, { html: value });
  },
  unbind(elem: Element) {
    const tooltip = M.Tooltip.getInstance(elem);
    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  }
};
