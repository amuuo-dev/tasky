import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.send("<h1>Tasky api endpoints</h1>");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
