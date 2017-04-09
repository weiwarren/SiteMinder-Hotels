import { browser, element, by } from 'protractor';

export class SiteMinderHotelsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('Hotels-root h1'));
  }
}
