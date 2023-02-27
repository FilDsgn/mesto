export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);

  }

  renderItems() {
    this._renderedItems.reverse();
    this._renderedItems.forEach(this._renderer);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  // renderItems(items) {
  //   this._clear();
  //   items.reverse();
  //   items.forEach((item) => {
  //     this.addItem(item)
  //   })

  // }

  addItem(element) {
    this._container.prepend(element);
  }
}