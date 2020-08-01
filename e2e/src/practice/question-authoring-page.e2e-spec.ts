import { browser, logging } from 'protractor';
import { QuestionAuthoringPage } from './question-authoring-page.po';

describe('Given I navigate to the Question Authoring Page', () => {
  let page: QuestionAuthoringPage;

  beforeEach(() => {
    page = new QuestionAuthoringPage();
    page.navigateToFeatureRoot();
  });

  it('it should display a success alert and reset the form when I submit a valid form', async () => {
    expect(page.submissionErrorAlert.isPresent()).toBe(false, 'a page submission error alert could be seen on startup');
    expect(page.submissionSuccessAlert.isPresent()).toBe(false, 'a page submission success alert could be seen on startup');

    page.fillFormCorrectly();

    page.submitButton.click();

    expect(page.submissionErrorAlert.isPresent()).toBe(false, 'a page submission error alert could be seen on submit');
    expect(page.submissionSuccessAlert.isPresent()).toBe(true, 'no submission success alert could be seen on submit');
    expect(page.checkFormEmpty()).toBe(true, 'form was not empty');

    /*
     * The nature of this test means that a 404 will be returned from the backend.
     * As default browser behaviour is to log this as a SEVERE error, this will
     * cause the test to fail in the afterEach performed after every test.
     * The following block removes the expected errors and performs the validaton
     * for no other SEVERE errors, given the buffer can only be read once.
     */
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    const sanitisedLogs: logging.Entry[] = logs.filter((each) =>
      ! (/(.*)\/questions\/(.*) - Failed to load resource/.test(each.message)));
    expect(sanitisedLogs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
