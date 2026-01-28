import axios from "axios";

const BASE_URL = "http://localhost:5000/api/books";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* Get all books */
export const getAllBooks = async () => {
  const response = await api.get("/");
  return response.data;
};

/* Get single book by ID */
export const getBookById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

/* Add new book */
export const addBook = async (bookData) => {
  const response = await api.post("/", bookData);
  return response.data;
};

/* Update existing book */
export const updateBook = async (id, bookData) => {
  const response = await api.put(`/${id}`, bookData);
  return response.data;
};

/* Delete book */
export const deleteBook = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export default api;
