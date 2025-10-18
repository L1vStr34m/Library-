const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  renderLibrary();
}

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    renderLibrary();
  }
}

function toggleBookReadStatus(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) {
    book.toggleRead();
    renderLibrary();
  }
}

function renderLibrary() {
  const container = document.getElementById("books-container");
  container.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
      <button class="toggle-read-btn">${book.read ? "Mark as Unread" : "Mark as Read"}</button>
      <button class="remove-btn">Remove</button>
    `;

    // Event listeners for buttons
    card.querySelector(".remove-btn").addEventListener("click", () => {
      removeBookFromLibrary(book.id);
    });

    card.querySelector(".toggle-read-btn").addEventListener("click", () => {
      toggleBookReadStatus(book.id);
    });

    container.appendChild(card);
  });
}

// Initial sample books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);

// Modal dialog form handling
const newBookBtn = document.getElementById("new-book-btn");
const newBookDialog = document.getElementById("new-book-dialog");
const newBookForm = document.getElementById("new-book-form");
const cancelBtn = document.getElementById("cancel-btn");

newBookBtn.addEventListener("click", () => {
  newBookDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  newBookDialog.close();
});

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(newBookForm);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = parseInt(formData.get("pages"), 10);
  const read = formData.get("read") === "on";

  addBookToLibrary(title, author, pages, read);

  newBookForm.reset();
  newBookDialog.close();
});
