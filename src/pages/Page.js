/* global browser */
export default class Page {
  open(path) {
    browser.url(path)
  }
}
