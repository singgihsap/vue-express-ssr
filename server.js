const express = require("express");
const { createSSRApp } = require("vue");
const { renderToString } = require("@vue/server-renderer");

const server = express();

// Definisikan rute dengan parameter
server.get("/user/:id", async (req, res) => {
  const app = createSSRApp({
    template: `
      <div>
        <h1>User Profile</h1>
        <p>User ID: {{ userId }}</p>
      </div>
    `,
    data() {
      return {
        userId: req.params.id,
      };
    },
  });

  try {
    const html = await renderToString(app);
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>User Profile</title>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Jalankan server
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
