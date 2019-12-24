import { AuthPage } from './auth-page.po';
import { browser, logging } from 'protractor';

describe('Auth Page', () => {
  let page: AuthPage;

  beforeEach(() => {
    page = new AuthPage();
  });

  it('should display Sign Up form if user navigates to /auth/signup', () => {
    page.navigateToPath('/auth/signup');
    expect(page.getFormSubmitButtonText()).toMatch('SIGN UP');
  });

  it('should display Login form if user navigates to /auth/login', () => {
    page.navigateToPath('/auth/signup');
    expect(page.getFormSubmitButtonText()).toMatch('LOGIN');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
