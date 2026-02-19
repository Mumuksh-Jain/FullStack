const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(`
    <h1>Employee Management System is Running ✅</h1>
    <p>Your CLI project is successfully deployed on Render.</p>
    <p>GitHub Repo: <a href="https://github.com/Mumuksh-Jain/FullStack">View Code</a></p>
  `);
});

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
