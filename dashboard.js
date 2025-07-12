import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");
const logoutBtn = document.getElementById("logout-btn");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    fetchBooks();
  } else {
    window.location.href = "login.html";
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  if (!title || !author) return;

  const book = {
    userId: currentUser.uid,
    title,
    body: author,
    read: false
  };

  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });

  bookForm.reset();
  fetchBooks();
});

async function fetchBooks() {
  bookList.innerHTML = "Loading...";
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  const userBooks = data.filter(b => b.userId === currentUser.uid);
  renderBooks(userBooks);
}

function renderBooks(books) {
  if (books.length === 0) {
    bookList.innerHTML = "<li>No books found.</li>";
    return;
  }
  bookList.innerHTML = "";
  books.forEach(book => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${book.title}</strong> by ${book.body}
        ${book.read ? "(Read)" : "(Unread)"}
      </div>
      <div>
        <button data-id="${book.id}" class="mark-btn">${book.read ? "Mark Unread" : "Mark Read"}</button>
        <button data-id="${book.id}" class="delete-btn">Delete</button>
      </div>
    `;
    bookList.appendChild(li);
  });

  document.querySelectorAll(".mark-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: btn.textContent === "Mark Read" })
      });
      fetchBooks();
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE"
      });
      fetchBooks();
    });
  });
}
