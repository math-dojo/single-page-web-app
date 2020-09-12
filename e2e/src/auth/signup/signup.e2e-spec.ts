import { AuthPage } from './signup.po';
import { browser, logging } from 'protractor';

describe('Given I navigate to the Auth Page', () => {
  let page: AuthPage;

  beforeEach(() => {
    page = new AuthPage();
    page.navigateToPath('/auth/signup');
  });

  it('should display Sign Up form if user navigates to /auth/signup', () => {
    expect(page.getFormSubmitButtonText()).toMatch('SIGN UP');
  });

  xit('should display Login form if user navigates to /auth/login', () => {
    expect(page.getFormSubmitButtonText()).toMatch('LOGIN');
  });

  xit('should redirect a user who signs up correctly to /dashboard', () => {
    page.fillSignupFormWithData({
      name: 'worzel gummidge',
      password: 'somethingSecret',
      email: 'scarecrow@tenacrefields.uk'
    });
    page.submitSignUpForm();
    expect(page.getCurrentResourcePath()).toMatch(/\/dashboard$/);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
