import { browser, by, element, $, $$ } from "protractor";
export class MoviesListPO {
  get searchBox() {
    return $(".search-box input");
  }
  get containerMovies() {
    return $$(".container-movies");
  }
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  searchFor(term) {
    return this.searchBox.sendKeys(term);
  }

  countContainerMovies() {
      return this.containerMovies.count();
  }
}
