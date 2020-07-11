import { TopicPage } from './topic-page.po';
import { browser, logging } from 'protractor';

describe('Topic Page', () => {
  let page: TopicPage;

  beforeEach(() => {
    page = new TopicPage();
    page.navigateToFeatureRoot();
  });

  it('should display at least 1 card containing a question', () => {
    const foundTopicCards = page.getNumberOfQuestionCards();
    expect(foundTopicCards).toBeGreaterThanOrEqual(1);
  });

  it('clicking a question card should navigate to the question view', () => {

    const firstQuestionCardName = page.getFirstQuestionCardTitle();

    page.clickFirstQuestionCard();

    expect(page.getActiveSubNavText()).toEqual(firstQuestionCardName);

    const resourceUrl = page.getCurrentResourcePath();
    expect(resourceUrl).toMatch(/^\/questions\/([a-z0-9-])+$/);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
