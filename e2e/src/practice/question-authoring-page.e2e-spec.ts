import { browser, logging } from 'protractor';
import { QuestionAuthoringPage } from './question-authoring-page.po';

describe('Given I navigate to the Question Authoring Page', () => {
  let page: QuestionAuthoringPage;

  beforeEach(() => {
    page = new QuestionAuthoringPage();
    page.navigateToFeatureRoot();
  });

  it('should display at least 1 card containing a topic name', () => {

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
