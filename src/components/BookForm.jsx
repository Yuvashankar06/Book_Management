import React, { useEffect, useState } from "react";
import { addBook, updateBook } from "../services/api";

function BookForm({ editBook, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    email: "",
    age: "",
    publishedDate: "",
    overview: "",
  });

  const [errors, setErrors] = useState({});

  // If edit mode, fill form with existing data
  useEffect(() => {
    if (editBook) {
      setFormData({
        title: editBook.title || "",
        author: editBook.author || "",
        publisher: editBook.publisher || "",
        email: editBook.email || "",
        age: editBook.age || "",
        publishedDate: editBook.publishedDate || "",
        overview: editBook.overview || "",
      });
    }
  }, [editBook]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation logic
  const validate = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }

    if (!formData.publisher.trim()) {
      newErrors.publisher = "Publisher is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (!Number.isInteger(Number(formData.age))) {
      newErrors.age = "Age must be an integer";
    }

    if (!formData.publishedDate) {
      newErrors.publishedDate = "Published date is required";
    }

    return newErrors;
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (editBook) {
        await updateBook(editBook.id, formData);
      } else {
        await addBook(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        border: "1px solid #ccc",
      }}
    >
      <h3>{editBook ? "Edit Book" : "Add Book"}</h3>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        </div>

        {/* Author */}
        <div>
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={formData.author}
            onChange={handleChange}
          />
          {errors.author && <p style={{ color: "red" }}>{errors.author}</p>}
        </div>

        {/* Publisher */}
        <div>
          <input
            type="text"
            name="publisher"
            placeholder="Publisher"
            value={formData.publisher}
            onChange={handleChange}
          />
          {errors.publisher && (
            <p style={{ color: "red" }}>{errors.publisher}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Contact Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        {/* Age */}
        <div>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
        </div>

        {/* Published Date */}
        <div>
          <input
            type="date"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
          />
          {errors.publishedDate && (
            <p style={{ color: "red" }}>{errors.publishedDate}</p>
          )}
        </div>
        <input
  type="text"
  name="image"
  placeholder="Image URL"
  value={formData.image}
  onChange={handleChange}
/>


        {/* Overview */}
        <div>
          <textarea
            name="overview"
            placeholder="Book Overview"
            value={formData.overview}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div style={{ marginTop: "10px" }}>
          <button type="submit">
            {editBook ? "Update Book" : "Add Book"}
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;
