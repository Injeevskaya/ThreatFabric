import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly firstBookResult:Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.firstBookResult = this.page.locator('#searchResults ul li').first();
  }

  authorLink(authorName: string): Locator {
    return this.firstBookResult.locator(`.bookauthor a:has-text("${authorName}")`);
  }

  async clickOnAuthorLink(authorName: string) {
    await this.authorLink(authorName).click();
  }
}