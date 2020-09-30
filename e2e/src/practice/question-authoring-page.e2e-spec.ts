import { browser, logging } from 'protractor';
import { LoginPage } from '../auth/login/login.po';
import { QuestionAuthoringPage } from './question-authoring-page.po';

describe('Given I navigate to the Question Authoring Page', () => {
  let page: QuestionAuthoringPage;
  let loginPage: LoginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    loginPage.navigateToFeatureRoot();
    loginPage.fillLoginFormWithData({
      username: 'creator',
      password: 'creator',
    });
    loginPage.submitSignUpForm();
    page = new QuestionAuthoringPage();
    page.navigateToFeatureRoot().click();
  });

  it('it should display a success alert and reset the form when I submit a valid form', async () => {
    expect(page.submissionErrorAlert.isPresent()).toBe(false, 'a page submission error alert could be seen on startup');
    expect(page.submissionSuccessAlert.isPresent()).toBe(false, 'a page submission success alert could be seen on startup');

    page.fillFormCorrectly();

    page.submitButton.click();

    expect(page.submissionErrorAlert.isPresent()).toBe(false, 'a page submission error alert could be seen on submit');
    expect(page.submissionSuccessAlert.isPresent()).toBe(true, 'no submission success alert could be seen on submit');
    expect(page.checkFormEmpty()).toBe(true, 'form was not empty');

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
