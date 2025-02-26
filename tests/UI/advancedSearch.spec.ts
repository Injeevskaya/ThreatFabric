import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SearchResultsPage } from '../../pages/SearchResultsPage';
import { AuthorPage } from '../../pages/AuthorPage';
import { AdvancedSearchPage } from '../../pages/AdvancedSearchPage';

test('Advanced search and validate top-rated book by J.K. Rowling', async ({ page }) => {

  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);
  const authorPage = new AuthorPage(page);
  const advancedSearchPage = new AdvancedSearchPage(page);

  const title = 'Harry Potter';
  const author = 'Rowling';
  const topRatedBook = 'Harry Potter and the Half-Blood Prince'

  await homePage.goto();
  await homePage.openAdvancedSearch();
  await expect(page).toHaveURL(/advancedsearch/);
  await advancedSearchPage.searchBookByTitleAndAuthor(title, author);
  await expect(page).toHaveURL(/search/);
  expect(page.url()).toContain('title=Harry+Potter');
  expect(page.url()).toContain('author=Rowling');
  await searchResultsPage.clickOnAuthorLink(author);
  await expect(page).toHaveURL(/authors/);
  expect(page.url()).toContain(author);
  await authorPage.sortByRating();
  await expect(page).toHaveURL(/authors/);
  expect(page.url()).toContain('sort=rating');
  const topBook = await authorPage.getTopRatedBookTitle()
  expect(topBook).toContain(topRatedBook);
});

