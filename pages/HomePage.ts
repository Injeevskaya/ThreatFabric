import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly advancedSearchLink: Locator;
  readonly titleInput: Locator;
  readonly authorInput: Locator;
  readonly searchButton: Locator;
  readonly searchByDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchByDropdown = page.locator('select[aria-label="Search by"]'); 
  }

  async goto() {
    await this.page.goto('https://openlibrary.org');
  }

  async openAdvancedSearch() {
    await this.searchByDropdown.click(); 
    await this.searchByDropdown.selectOption({ value: 'advanced' });
  }}
