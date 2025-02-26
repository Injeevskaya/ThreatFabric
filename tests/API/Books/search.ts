import { test, expect } from '@playwright/test';

const apiURL = "https://openlibrary.org";

function checkBookByTitleAndAuthor(title: string, author: string, authorSiteUrl: string) {
  test('Searching book by title and get authot key', async ({ request }) => {
    const getTitleResponse = await request.get(apiURL + `/search.json?title=${title}&author= ${author}`);
      expect(getTitleResponse.ok()).toBeTruthy();
      const titlePayload = await getTitleResponse.json();
      expect(titlePayload).not.toBeNull();
      titlePayload.docs.forEach((record) =>
        expect(record.title.toLowerCase()).toEqual(expect.stringContaining(title.toLowerCase()))
      );
      const authorKey = titlePayload.docs[0].author_key[0]

    const getAuthorInfoResponce = await request.get(apiURL + `/authors/${authorKey}.json`);
      expect(getAuthorInfoResponce.ok()).toBeTruthy();
      const authorPayload = await getAuthorInfoResponce.json();
      expect(authorPayload).not.toBeNull();
      expect(authorPayload.links[0].url).toEqual(authorSiteUrl);
  });
}

function checkBookbyISBN(isbn: string, author: string, title: string ){
    test(`Searching a book by isbn and check title and author name ${isbn}`, async ({ request }) => {
      const getBookByISBNResponse = await request.get(apiURL + `/isbn/${isbn}.json`);
      expect(getBookByISBNResponse.ok()).toBeTruthy();
      const bookResponse = await getBookByISBNResponse.json();
      expect(bookResponse).not.toBeNull();
      expect(bookResponse.title.toLowerCase()).toEqual(expect.stringContaining(title.toLowerCase()));
      const authorKey = bookResponse.authors[0].key;
  
      const authorResponse = await request.get(`${apiURL}${authorKey}.json`);
      expect(authorResponse.ok()).toBeTruthy();
      const authorInfo = await authorResponse.json();
      expect(authorInfo).not.toBeNull();
      expect(authorInfo.name.toLowerCase()).toEqual(expect.stringContaining(author.toLowerCase()))
    });
  }


export {checkBookByTitleAndAuthor, checkBookbyISBN };
