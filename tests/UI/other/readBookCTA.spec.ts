import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/HomePage';
import { MyBooksPage } from '../../../pages/MyBookPage';
import { LoginPage } from '../../../pages/LoginPage';


test('Login, find book with "Read" CTA, and verify it in "Currently Reading"', async ({ page }) => {
    const homePage = new HomePage(page);
    const myBooksPage = new MyBooksPage(page);
    const loginPage = new LoginPage(page);

    const username = 'tatyana.injeevskaya@gmail.com';
    const password = 'OcGACfnt5%6OcGACfnt';
    const userTitle = 'tatiinzhee';

    await homePage.goto();
    await homePage.clickOnLoginButton();
    await expect(page).toHaveURL(/account\/login/);
    await loginPage.login(username, password);
    await expect(page).toHaveURL('https://openlibrary.org');
    await expect(homePage.userIcon).toBeVisible();  
    await expect(homePage.userMenu).toBeVisible();
    await homePage.clickOnFirstBookWithReadCTA();
    await expect(page).toHaveURL(/archive.org\/details/);
    await homePage.goto();
    await homePage.clickOnMyBooks();
    await expect(page).toHaveURL(`https://openlibrary.org/people/${userTitle}/books`)
    const hasBooksInCurrentlyReading = await myBooksPage.verifyBooksInReadingList();
    expect(hasBooksInCurrentlyReading).toBe(true);
});