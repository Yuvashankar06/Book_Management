const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(cors());
server.use(jsonServer.bodyParser);

// API prefix
server.use("/api", router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 JSON Server running on port ${PORT}`);
  console.log(`📚 Books API: http://localhost:${PORT}/api/books`);
});
