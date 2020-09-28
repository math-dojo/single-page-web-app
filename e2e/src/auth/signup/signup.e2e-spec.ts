import { SignupPage } from './signup.po';
import { browser, logging } from 'protractor';

describe('Given I navigate to the Signup Page', () => {
  let page: SignupPage;

  beforeEach(() => {
    page = new SignupPage();
    page.navigateToPath('/auth/signup');
  });

  it('should display Sign Up form if user navigates to /auth/signup', () => {
    expect(page.getFormSubmitButtonText()).toMatch('SIGN UP');
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
