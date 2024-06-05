export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    //this.cleaner();
    this._renderedItems.forEach((item) => this.addItem(item));
  }

  addItem(element) {
    const card = this._renderer(element);
    this._container.prepend(card);
  }
}
