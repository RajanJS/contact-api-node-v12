import { ServerConfig } from "./config";
import { contacts, contacts_v2, groups } from "./routes";

async function main() {
  const PORT = process.env.PORT || 3000;
  const server = new ServerConfig({
    port: PORT,
    // middleware: [],
    routers: [contacts, contacts_v2, groups]
  });

  server.listen();
}

main();