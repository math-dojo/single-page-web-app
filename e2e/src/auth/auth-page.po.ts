import { browser, by, element } from 'protractor';
import { Utils } from '../utils/utils.po';

export class AuthPage extends Utils{

  getFormSubmitButtonText() {
    return element(by.css('.btn.btn-primary')).getText() as Promise<string>;
  }

}
