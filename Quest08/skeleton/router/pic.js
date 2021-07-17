import { writeFile, readFile } from "fs/promises";
import { Router } from "../core/router.js";
import { getBody } from "../utils.js";

const router = new Router();

const imageName = "pic.jpg";

router.get("/show", async (req, res) => {
  const img = await readFile(imageName);
  res.writeHead(200, { "Content-Type": "image/jpeg" });
  res.write(img);
  res.end();
});

router.post("/upload", async (req, res) => {
  try {
    const image = await getBody(req, res);
    await writeFile(imageName, image);
  } catch (e) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.write(`JPG only`);
  } finally {
    res.end();
  }
});

router.get("/download", async (req, res) => {
  try {
    const img = await readFile(imageName);
    res.writeHead(200, {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=${imageName}`
    });
    res.write(img);
  } catch (e) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.write(`PNG only`);
  } finally {
    res.end();
  }
});

export default router;
