import { checkBookbyISBN } from "./search.ts";

const testData = [
  { isbn: '0451526538', author: 'Mark Twain', title: 'The Adventures of Tom Sawyer' },
  { isbn: '9780679600855', author: 'Truman Capote', title: "Breakfast at Tiffany's" },
  { isbn: '0486415872', author: 'Фёдор Михайлович Достоевский', title: 'Crime and Punishment' },
  { isbn: '9780140449136 ', author: 'Фёдор Михайлович Достоевский', title: 'Crime and Punishment' },
];

testData.forEach((data) => {
  checkBookbyISBN(data.isbn, data.author, data.title)
});
