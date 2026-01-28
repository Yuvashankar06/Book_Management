import React from "react";
import { useNavigate } from "react-router-dom";

function BookList({ books, onDelete, onEdit }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        marginTop: "20px",
        maxHeight: "450px",
        overflowY: "auto",
        border: "1px solid #ddd",
      }}
    >
      <table width="100%" cellPadding="10">
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Author</th>
            <th align="center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="4" align="center">
                No books available
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id}>
                <td>
                  <img
                    src={book.image}
                    alt={book.title}
                    style={{
                      width: "60px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </td>

                <td>{book.title}</td>
                <td>{book.author}</td>

                <td align="center">
                  <button
                    onClick={() => navigate(`/book/${book.id}`)}
                    style={{ marginRight: "6px" }}
                  >
                    View
                  </button>

                  <button
                    onClick={() => onEdit(book)}
                    style={{ marginRight: "6px" }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(book.id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
