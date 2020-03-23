import { browser, logging } from 'protractor';
import { MoviesListPO } from './movies-lsit.po';

describe('workspace-project App', () => {
  let page: MoviesListPO;

  beforeEach(() => {
    page = new MoviesListPO();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    const search = page.searchFor("spider");
    browser.wait(search, 7000);
    const containers = page.countContainerMovies();
    browser.wait(containers, 500);
    expect(containers).toEqual(10);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
