import { browser, by, element } from 'protractor';
import { Utils } from '../utils/utils.po';
require('url');

export class LandingPage extends Utils {

  getTitleText() {
    return element(by.css('app-root app-landing-page #primary h1')).getText() as Promise<string>;
  }
}
