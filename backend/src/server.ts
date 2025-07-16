import express from "express";
import router from "./router";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("<h1>Tasky api endpoints</h1>");
});

app.use("/api", router);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
