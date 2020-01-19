import { LandingPage } from './landing-page.po';
import { browser, logging } from 'protractor';

describe('LandingPage', () => {
  let page: LandingPage;

  beforeEach(() => {
    page = new LandingPage();
  });

  it('should display landing page if user navigates to rootpath', () => {
    page.navigateToRoot();
    expect(page.getTitleText()).toEqual('Master maths through challenges.');
  });

  it('should display landing page if user navigates to /home', () => {
    page.navigateToPath('/home');
    expect(page.getTitleText()).toEqual('Master maths through challenges.');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
