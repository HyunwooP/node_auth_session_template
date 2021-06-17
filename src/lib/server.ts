import * as http from "http";
import env from "../config";

export const createServer = (server: Express.Application) => {
  http
    .createServer(server)
    .listen(env.port, () => console.log(`App Listen Port ${env.port}`));
};
