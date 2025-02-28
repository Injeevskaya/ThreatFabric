import { Page, Locator, expect } from '@playwright/test';

export class UserPage {
  readonly page: Page;
  readonly userIcon: Locator;
  readonly userMenu: Locator;
 

  constructor(page: Page, userTitle: string) {
    this.page = page;
    this.userIcon = page.locator(`img.account__icon[title^=]`);
    this.userMenu = page.locator('img.hamburger__icon[alt="additional options menu"]');
  }


}
