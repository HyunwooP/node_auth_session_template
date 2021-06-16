import * as http from "http";
import env from "./config/env";
import { express, connectDB, generateTestData } from "./lib";

(async () => {
  try {
    // setting express middlewares
    const server = await express();

    // db connect
    await connectDB();

    // setting test data
    await generateTestData();

    // create server
    http
      .createServer(server)
      .listen(env.port, () => console.log(`listen port ${env.port}`));
  } catch (e) {
    console.log(e);
  }
})();
