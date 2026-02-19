const http = require("http");

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(`
    <h1>✅ Employee Management System is Live</h1>
    <p>This project is deployed successfully on Render.</p>
    <p><a href="https://github.com/Mumuksh-Jain/FullStack">View GitHub Repo</a></p>
  `);

}).listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
