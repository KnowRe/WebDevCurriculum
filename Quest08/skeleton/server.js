import http from "http";
import { Router } from "./core/router.js";
import fooRouter from "./router/foo.js";
import picRouter from "./router/pic.js";

const PORT = 8080;
const app = new Router();

app.get("/", (req, res) => {
  res.write("Hello World!");
  res.end();
});
app.use("/foo", fooRouter);
app.use("/pic", picRouter);

const server = http.createServer((req, res) => {
  app.route(req, res);
});

server.listen(PORT);
