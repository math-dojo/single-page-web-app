import { browser, by, element } from 'protractor';
import { Utils } from '../utils/utils.po';

export class PageNotFoundPage extends Utils {

  getPageNotFoundMainText() {
    return element(by.css('.mtdj__pagenotfound_maintext')).getText() as Promise<string>;
  }

}
