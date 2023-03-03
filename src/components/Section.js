export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);

  }

  renderItems(items) {
    // this._clear();
    items.reverse().forEach(item => this._renderer(item));
  }

  _clear() {
    this._container.innerHTML = '';
  }

  addItem(element) {
    this._container.prepend(element);
  }
}