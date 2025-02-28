import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly advancedSearchLink: Locator;
  readonly titleInput: Locator;
  readonly authorInput: Locator;
  readonly searchButton: Locator;
  readonly searchByDropdown: Locator;
  readonly loginButton: Locator;
  readonly userIcon: Locator;
  readonly userMenu: Locator;
  readonly carousel: Locator;
  readonly myBooksLink: Locator;


  
  constructor(page: Page) {
    this.page = page;
    this.searchByDropdown = page.locator('select[aria-label="Search by"]');
    this.loginButton = page.locator('.auth-component a[href="/account/login"]');
    this.userIcon = page.locator('img.account__icon[src^="https://archive.org/services/img/"]');
    this.userMenu = page.locator('img.hamburger__icon[alt="additional options menu"]');
    this.myBooksLink = page.locator('a[href="/account/books"][data-ol-link-track="Hamburger|MyBooks"]');
    this.carousel = page.locator('a[data-ol-link-track="BookCarousel|HeaderClick|public_domain"][href="/read"]:text("Classic Books")');
  }

  async goto() {
    await this.page.goto('https://openlibrary.org',  {waitUntil: "load"});
  }

  async openAdvancedSearch() {
    await this.searchByDropdown.click(); 
    await this.searchByDropdown.selectOption({ value: 'advanced' });
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }

  async clickOnMyBooks() {
    await this.userMenu.click();
    await this.myBooksLink.click();
  }
  
  async clickOnFirstBookWithReadCTA() {
    const books = this.carousel.locator('xpath=//ancestor::div[contains(@class, "carousel")]/descendant::a[contains(text(), "Read")]');
    const firstBookWithReadCTA = books.first();
    await firstBookWithReadCTA.click();
  }

}


