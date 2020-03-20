import { ServerConfig } from "./config";
import { redirectRouter, routerV1, routerV2, authRouter } from "./routes";

async function main() {
  const PORT = process.env.PORT || 3000;
  const server = new ServerConfig({
    port: PORT,
    // middleware: [],
    routers: [redirectRouter, routerV1, routerV2, authRouter]
  });

  server.listen();
}

main();