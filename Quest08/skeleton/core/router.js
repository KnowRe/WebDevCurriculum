import { URL } from "url";
import { getBaseURL } from "../utils.js";

export class Router {
  #uses = new Map();
  #getRoutes = new Map();
  #postRoutes = new Map();

  use(path, router) {
    this.#uses.set(path, router);
  }

  route(req, res, base = "") {
    let routed = false;
    const targetPath = req.url.slice(base.length);
    const url = new URL(targetPath, getBaseURL(req));
    const { pathname } = url;

    for (const [path, router] of this.#uses) {
      if (pathname.startsWith(path)) {
        router.route(req, res, path + base);
        routed = true;
        break;
      }
    }

    if (!routed) {
      switch (req.method) {
        case "GET":
          this.#getRoutes.has(pathname) &&
            this.#getRoutes.get(pathname)(req, res);
          break;
        case "POST":
          this.#postRoutes.has(pathname) &&
            this.#postRoutes.get(pathname)(req, res);
          break;
        default:
          break;
      }
    }
  }

  get(path, router) {
    this.#getRoutes.set(path, router);
  }

  post(path, router) {
    this.#postRoutes.set(path, router);
  }
}
