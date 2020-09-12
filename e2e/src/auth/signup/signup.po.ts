import { browser, by, element } from 'protractor';
import { Utils } from '../../utils/utils.po';

export class AuthPage extends Utils {

  getFormSubmitButtonText() {
    return element(by.css('.btn.btn-primary')).getText() as Promise<string>;
  }

  fillSignupFormWithData({
    name: name,
    email: email,
    password: password
}) {
  return Promise.all([
    element(by.name('name')).sendKeys(name),
    element(by.name('email')).sendKeys(email),
    element(by.name('password')).sendKeys(password)
  ]);
  }

  submitSignUpForm() {
    return element(by.tagName('form')).submit();
  }



}
