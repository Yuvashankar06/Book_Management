import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "../services/api";

function Details() {
  const { id } = useParams();        // get book id from URL
  const navigate = useNavigate();    // navigation hook

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Loading state
  if (loading) {
    return <h3 style={{ padding: "20px" }}>Loading book details...</h3>;
  }

  // Book not found
  if (!book) {
    return <h3 style={{ padding: "20px" }}>Book not found</h3>;
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>
        ⬅ Back to Home
      </button>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Book Image */}
        <img
          src={book.image}
          alt={book.title}
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/200x300?text=No+Image")
          }
          style={{
            width: "220px",
            height: "320px",
            objectFit: "cover",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        />

        {/* Book Details */}
        <div style={{ flex: 1 }}>
          <h1>{book.title}</h1>
          <h3 style={{ color: "#555" }}>by {book.author}</h3>

          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>

          <p>
            <strong>Published Date:</strong> {book.publishedDate}
          </p>

          <p>
            <strong>Contact Email:</strong> {book.email}
          </p>

          <p>
            <strong>Recommended Age:</strong> {book.age}
          </p>

          <div style={{ marginTop: "15px" }}>
            <strong>Overview:</strong>
            <p style={{ lineHeight: "1.6" }}>
              {book.overview || "No overview available for this book."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
