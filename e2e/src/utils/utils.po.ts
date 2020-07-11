import { browser, element, by } from 'protractor';

export class Utils {
  navigateToRoot() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  navigateToPath(path: string) {
    const fullUrl = new URL(path, browser.baseUrl);
    return browser.get(fullUrl.href) as Promise<any>;
  }

  getCurrentResourcePath() {
    return browser.getCurrentUrl().then(fullUrl => (new URL(fullUrl)).pathname);
  }

  getActiveSubNavText() {
    return element(by.css('.subnav.mtdj__practice_subnav .nav-link.active'));
  }
}
