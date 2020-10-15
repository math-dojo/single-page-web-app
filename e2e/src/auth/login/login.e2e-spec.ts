import { LoginPage } from './login.po';
import { browser, logging } from 'protractor';

describe('Given I navigate to the Login Page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateToFeatureRoot();
  });

  it('should display Login form if user navigates to /auth/login', () => {
    expect(page.getFormSubmitButtonText()).toMatch('LOGIN');
  });

  it('should redirect a user who signs up correctly to /practice', () => {
    page.fillLoginFormWithData({
      username: 'consumer',
      password: 'consumer',
    });
    page.submitSignUpForm();
    expect(page.getCurrentResourcePath()).toMatch(/\/practice$/);
  });

  it('should not redirect a user who signs up incorrectly', () => {
    page.fillLoginFormWithData({
      username: 'wrong',
      password: 'obviouslyWrong',
    });
    page.submitSignUpForm();
    expect(page.getCurrentResourcePath()).toMatch(/\/auth\/login$/);
    expect(page.getErrorAlertText()).toMatch(/Invalid username or password/);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
