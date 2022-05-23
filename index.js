const add = document.querySelector('.add-button');
const remove = document.querySelector('#remove');
const ul = document.querySelector('.book-list');

const display_books = [
  { title: 'Wonderland', author: 'James Brown' },
  { title: 'Night Crawler', author: 'Charles Chase' },
];

add.addEventListener('click', (e) => {
  display_books.title = document.getElementById('title-input').value;
  display_books.author = document.getElementById('author-input').value;
  display_books.push({
    title: display_books.title,
    auhtor: display_books.author,
  });
  bookTitle = display_books.title;
  bookAuthor = display_books.author;
  const display_content = `<p class="display_title">${bookTitle}</p>
  <p class="display_author">${bookAuthor}</p>
  <button type="button" id="remove">remove</button>`;

  const li = document.createElement('li');
  li.classList.add('bbline');
  li.innerHTML = display_content;
  ul.append(li);
  console.log(display_books);
});

let bookTitle = '';
let bookAuthor = '';

display_books.forEach((book) => {
  bookTitle = book.title;
  bookAuthor = book.author;

  const display_content = `<p class="display_title">${bookTitle}</p>
<p class="display_author">${bookAuthor}</p>
<button type="button" id="remove">remove</button>`;

  const li = document.createElement('li');
  li.classList.add('bbline');
  li.innerHTML = display_content;
  ul.append(li);
});
