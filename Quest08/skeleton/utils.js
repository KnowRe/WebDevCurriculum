import { URL } from "url";

export const bodyParser = new Map([
  ["application/json", (data) => JSON.parse(data)],
  ["image/jpeg", (data) => Buffer.concat(data)],
]);

export const getBody = async (req, res) => {
  return new Promise((resolve, reject) => {
    let body = [];
    const contentType = req.headers["content-type"];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      if (!bodyParser.has(contentType)) {
        return reject();
      }
      resolve(bodyParser.get(contentType)(body));
    });
  });
};

export const getBaseURL = (req) => {
  return `http://${req.headers.host}/`;
};

export const getParsed = (req) => {
  const url = new URL(req.url, getBaseURL(req));
  const query = [...url.searchParams].reduce((acc, cur) => {
    if (!Reflect.has(acc, cur[0])) {
      acc[cur[0]] = undefined;
    }
    acc[cur[0]] = cur[1];
    return acc;
  }, {});
  return {
    url,
    path: url.pathname,
    query,
  };
};
