import { Page, Locator } from '@playwright/test';

export class MyBooksPage {
  readonly page: Page;
  readonly currentlyReadingSection: Locator;
  readonly currentlyReadingCount: Locator;

  constructor(page: Page) {
    this.page = page;
    //this.currentlyReadingSection = page.locator('a[data-ol-link-track="MyBooksSidebar|CurrentlyReading"]');
    this.currentlyReadingSection = page.locator('.sidebar-section', { hasText: 'Reading Log' }).locator('li').nth(1);
    this.currentlyReadingCount = this.currentlyReadingSection.locator('.li-count'); 
  
  }

  async openCurrentlyReading() {
    await this.currentlyReadingSection.click();
  }

  async verifyBooksInReadingList() {
    const count = await this.currentlyReadingCount.textContent();
    const numberOfBooks = parseInt(count || '0');
    return numberOfBooks > 0;
  }
}

