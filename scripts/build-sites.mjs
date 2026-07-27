import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, "out");
const dist = resolve(root, "dist");
const client = resolve(dist, "client");
const server = resolve(dist, "server");

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });
await cp(output, client, { recursive: true });

const worker = `const worker = {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const url = new URL(request.url);
    if (!url.pathname.includes(".")) {
      url.pathname = url.pathname.replace(/\\/$/, "") + ".html";
      const htmlResponse = await env.ASSETS.fetch(new Request(url, request));
      if (htmlResponse.status !== 404) return htmlResponse;
    }

    const fallback = new URL("/404.html", request.url);
    return env.ASSETS.fetch(new Request(fallback, request));
  },
};

export default worker;
`;

await writeFile(resolve(server, "index.js"), worker, "utf8");
