import { browser, by, element } from 'protractor';
import { Utils } from '../../utils/utils.po';

export class LoginPage extends Utils {
  getFormSubmitButtonText() {
    return element(by.css('.btn.btn-primary')).getText() as Promise<string>;
  }

  getErrorAlertText() {
    return element(by.css('.login.mtdj__signupform .error.active.login-status')).getText() as Promise<string>;
  }

  fillLoginFormWithData({ username: username, password: password }) {
    return Promise.all([
      element(by.name('username')).sendKeys(username),
      element(by.name('password')).sendKeys(password),
    ]);
  }

  submitSignUpForm() {
    return element(by.tagName('form')).submit();
  }

  navigateToFeatureRoot() {
    this.navigateToPath('/auth/login');
  }
}
