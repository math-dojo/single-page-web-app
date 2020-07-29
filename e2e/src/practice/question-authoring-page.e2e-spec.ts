import { browser, logging } from 'protractor';
import { QuestionAuthoringPage } from './question-authoring-page.po';

describe('Given I navigate to the Question Authoring Page', () => {
  let page: QuestionAuthoringPage;

  beforeEach(() => {
    page = new QuestionAuthoringPage();
    page.navigateToFeatureRoot();
  });

  it('it should display a success alert and reset the form when I submit a valid form', () => {
    expect(page.submissionErrorAlert.isPresent()).toBe(false, 'a page submission error alert could be seen on startup');
    expect(page.submissionSuccessAlert.isPresent()).toBe(false, 'a page submission success alert could be seen on startup');


  });

  it('should display no alerts', () => {

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
