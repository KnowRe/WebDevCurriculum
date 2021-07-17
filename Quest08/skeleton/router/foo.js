import { Router } from "../core/router.js";
import { getBody, getParsed } from "../utils.js";

const router = new Router();

router.get("/", (req, res) => {
  const { query } = getParsed(req);
  if (Reflect.has(query, "bar")) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write(`Hello, ${query.bar}`);
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.write(`Bad request`);
  }
  res.end();
});

router.post("/", async (req, res) => {
  const body = await getBody(req, res);
  if (Reflect.has(body, "bar")) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write(`Hello, ${body.bar}`);
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.write(`Bad request`);
  }
  res.end();
});

export default router;
