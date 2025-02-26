import { Page, Locator } from '@playwright/test';

export class AuthorPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly selectOption:Locator
  readonly topRatedBook: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('xpath=//details/summary/p')
    this.topRatedBook = this.page.locator("[data-ol-link-track='SearchSort|Rating']");
  }

  async sortByRating() {
      await this.sortDropdown.click();
      await this.topRatedBook.waitFor( {state: "visible"} );
      await this.topRatedBook.click();
  }

  async getTopRatedBookTitle() {
    const firstBookResult = await this.page.locator('#searchResults ul li').first();
    console.log(firstBookResult);
    return await firstBookResult.locator('a.results').innerText();
  }
}