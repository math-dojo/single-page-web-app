import { DashboardPage } from './dashboard-page.po';
import { browser, logging } from 'protractor';

describe('Given I navigate to the Dashboard Page', () => {
  let page: DashboardPage;

  beforeEach(() => {
    page = new DashboardPage();
    page.navigateToFeatureRoot();
  });

  it('should display at least 1 card containing a topic name', () => {
    const foundTopicCards = page.getNumberOfTopicCards();
    expect(foundTopicCards).toBeGreaterThanOrEqual(1);
  });

  it('should navigate to the topic page view when I click a topic card ', () => {
    const firstTopicCardName = page.getFirstTopicCardTitle().getText();

    page.clickFirstTopicCard();

    expect(page.getActiveSubNavText().getText()).toEqual(firstTopicCardName);

    const resourceUrl = page.getCurrentResourcePath();
    expect(resourceUrl).toMatch(/^\/practice\/topics\/([a-z0-9-])+$/);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
