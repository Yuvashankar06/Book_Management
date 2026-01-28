import React, { useEffect, useState } from "react";
import { getAllBooks, deleteBook } from "../services/api";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";

function Home() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBook, setEditBook] = useState(null);

  // Fetch all books from API
  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Load books when page loads
  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete book handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
      fetchBooks();
    }
  };

  // Edit book handler
  const handleEdit = (book) => {
    setEditBook(book);
    setShowForm(true);
  };

  // After form submit
  const handleFormClose = () => {
    setShowForm(false);
    setEditBook(null);
    fetchBooks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Inventory Management</h2>

      {/* Add Book Button */}
      <button onClick={() => setShowForm(true)}>Add Book</button>

      {/* Book Form */}
      {showForm && (
        <BookForm
          editBook={editBook}
          onClose={handleFormClose}
        />
      )}

      {/* Book Table */}
      <BookList
        books={books}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Home;
