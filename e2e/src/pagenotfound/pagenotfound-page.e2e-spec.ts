import { PageNotFoundPage } from './pagenotfound-page.po';
import { browser, logging } from 'protractor';

describe('PageNotFound Page', () => {
  let page: PageNotFoundPage;

  beforeEach(() => {
    page = new PageNotFoundPage();
  });

  it('should display page not found text', () => {
    page.navigateToPath('/i-cant-possibly-exist');
    expect(page.getPageNotFoundMainText()).toMatch('The page you are looking for cannot be found.');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
