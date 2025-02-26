import { checkBookByTitleAndAuthor } from "./search.ts";

const testData = [
    { title: 'Harry Potter', author: 'Rowling', authorSiteUrl: 'http://www.jkrowling.com/' },
  ];

testData.forEach((data) =>{
    checkBookByTitleAndAuthor(data.title, data.author, data.authorSiteUrl);
})
