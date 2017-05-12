import { browser, element, by } from 'protractor';

export class Angular2-rails5api-frontPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
