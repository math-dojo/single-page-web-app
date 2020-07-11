import { DashboardPage } from './dashboard-page.po';
import { browser, logging } from 'protractor';

describe('Dashboard Page', () => {
  let page: DashboardPage;

  beforeEach(() => {
    page = new DashboardPage();
  });

  it('should display at least 1 card containing a topic name', () => {
    page.navigateToFeatureRoot();
    const foundTopicCards = page.getNumberOfTopicCards();
    expect(foundTopicCards).toBeGreaterThanOrEqual(1);
  });

  it('clicking a topic card should navigate to the topic page view', () => {
    page.navigateToFeatureRoot();

    const firstTopicCardName = page.getFirstTopicCardTitle().getText();

    page.clickFirstTopicCard();

    expect(page.getActiveSubNavText().getText()).toEqual(firstTopicCardName);

    const resourceUrl = page.getCurrentResourcePath();
    expect(resourceUrl).toMatch(/^\/topics\/([a-z0-9-])+$/);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
