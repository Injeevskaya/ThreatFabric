import { test, expect } from '@playwright/test';

const apiURL = "https://openlibrary.org/api";
const isbnId = "9780441172719";
const bookKey = "ISBN:9780441172719";
const incorrectISBNId = "INCORRECT566772"

test.describe('books API Tests', () => {

    test('Validating response structure', async ({ request }) => {
        const validatingResponse =
            await request.get(apiURL + `/books?bibkeys=ISBN:${isbnId}&format=json&jscmd=data`);
        expect(validatingResponse.status()).toBe(200);
        const validatingResponseBody = await validatingResponse.json();
        expect(validatingResponseBody[bookKey]).toMatchObject({
            title: expect.any(String),
            authors: expect.any(Array),
            publishers: expect.any(Array),
            publish_date: expect.any(String),
        });
    });

    test('Get book details with valid ISBN', async ({ request }) => {
        const getBookDetailsResponse =
            await request.get(apiURL + `/books?bibkeys=ISBN:${isbnId}&format=json&jscmd=data`);
        expect(getBookDetailsResponse.status()).toBe(200);
        const responseBody = await getBookDetailsResponse.json();
        expect(responseBody).toHaveProperty(bookKey);
        expect(responseBody[bookKey]).toHaveProperty('url');
        expect(responseBody[bookKey]).toHaveProperty('key');
        expect(responseBody[bookKey]).toHaveProperty('title', 'Dune');
        expect(responseBody[bookKey]).toHaveProperty('authors');
    });

    test('Response has to be empty for invalid book ID', async ({ request }) => {
        const invalidISBNIdResponse =
            await request.get(apiURL + `/books?bibkeys=ISBN:${incorrectISBNId}&format=json&jscmd=data`);
        expect(invalidISBNIdResponse.status()).toBe(200);
        const invalidISBNIdResponseBody = await invalidISBNIdResponse.json();
        expect(invalidISBNIdResponseBody).toEqual({});
    });

    test('Return JSON format when requested', async ({ request }) => {
        const response = await request.get(apiURL + `/books?bibkeys=ISBN:${isbnId}&format=json&`);
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');
    });

});
