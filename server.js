const app = require("./app/app");
const PORT = process.env.PORT || 4000;
const http = require("http");
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log("server running on port " + PORT);
  console.log("# ".repeat(15));
});
