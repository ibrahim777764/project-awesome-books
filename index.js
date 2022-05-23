/* eslint-disable max-classes-per-file */

const listLink = document.getElementById('list');
const formLink = document.getElementById('add-new');
const contactLink = document.getElementById('contact');

const list = document.getElementById('list-section');
const formSection = document.getElementById('add-new-section');
const contactSection = document.getElementById('contact-section');

formSection.style.display = 'none';
contactSection.style.display = 'none';

listLink.addEventListener('click', () => {
  formSection.style.display = 'none';
  contactSection.style.display = 'none';
  list.style.display = 'block';
});

formLink.addEventListener('click', () => {
  formSection.style.display = 'block';
  contactSection.style.display = 'none';
  list.style.display = 'none';
});

contactLink.addEventListener('click', () => {
  formSection.style.display = 'none';
  contactSection.style.display = 'block';
  list.style.display = 'none';
});

// eslint-disable-next-line max-classes-per-file
class Book {
  constructor({ title, author, id }) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class BookStore {
  constructor(initialData = []) {
    this.saveToLocalStorage = (data) => {
      const booksString = JSON.stringify(data);
      localStorage.setItem('bookStoreData', booksString);
      return true;
    };

    const rawBooksData = localStorage.getItem('bookStoreData');
    if (rawBooksData) {
      this.books = JSON.parse(rawBooksData);
    } else {
      this.books = initialData;
      this.saveToLocalStorage(this.books);
    }
  }

  all() {
    return this.books;
  }

  add(newData) {
    if (!newData || !newData.id) {
      return false;
    }

    const newBook = new Book(newData);
    this.books.push(newBook);
    return this.saveToLocalStorage(this.books);
  }

  remove(id) {
    this.books = this.books.filter((book) => book.id !== id);
    return this.saveToLocalStorage(this.books);
  }
}

// Display book function:
// 1. accepts an object with {id, author, title}
// 2. creates a li element and populates the objects with it
// 3. query the ul element and appends the li to it
const displayBook = ({ title, author, id }, parentElement) => {
  const bookListItemElement = document.createElement('li');
  bookListItemElement.className = 'book-list-item';
  bookListItemElement.innerHTML = `
      <section class="book-store-section display-flex">
        <div class="display-flex">
          <h3>"${title}"</h3>&nbsp;
          <span>by</span>&nbsp;
          <p class="paragraph">${author}</p>
        </div>
        <button id="${id}" type="button" onclick="handleRemove('${id}')" class="remove-button">Remove</button>
      </section>`;
  parentElement.appendChild(bookListItemElement);
};

const generateId = () => `id_${Math.random().toString(36).slice(2)}`;

const initialBooks = [
  {
    title: 'the boy with wings',
    author: 'Basit Korede',
    id: generateId(),
  },

  {
    title: 'Think Pythone',
    author: 'korede Basit',
    id: generateId(),
  },
];

const bookListElement = document.querySelector('ul.book-list');

const bookStore = new BookStore(initialBooks);
const books = bookStore.all();
books.forEach((book) => {
  displayBook(book, bookListElement);
});

const formElement = document.querySelector('#book-form');
const handleSubmition = (event) => {
  event.preventDefault();
  const title = document.querySelector('.title-input').value;
  const author = document.querySelector('.author-input').value;
  const id = generateId();
  const clearField = document.querySelectorAll('input');
  clearField.forEach((input) => {
    input.value = '';
  });
  const newBook = new Book({ title, author, id });
  if (bookStore.add(newBook)) {
    displayBook(newBook, bookListElement);
  }
};
formElement.addEventListener('submit', handleSubmition);

// eslint-disable-next-line no-unused-vars
const handleRemove = (currentId) => {
  if (bookStore.remove(currentId)) {
    const removeButton = document.getElementById(currentId);
    removeButton.parentElement.parentElement.remove();
  }
};

const navigatePage = () => {
  const navLists = document.querySelectorAll('.nav-list-item');
  const handleNavigation = (event) => {
    //
    if (event.target.classList.contains('active')) {
      return false;
    }

    document.querySelector('.nav-list-item.active').classList.remove('active');
    event.target.classList.add('active');
    document.querySelector('section.active').classList.remove('active');
    document.querySelector(`#${event.target.id}-section`).classList.add('active');
    return true;
  };

  navLists.forEach((navlist) => {
    navlist.addEventListener('click', handleNavigation);
  });
};
navigatePage();
