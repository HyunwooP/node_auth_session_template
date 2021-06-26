import * as express from "express";
import * as http from "http";
import env from "../config";

export const createServer = (server: express.Application): void => {
  http
    .createServer(server)
    .listen(env.port, () => console.log(`App Listen Port ${env.port}`));
};
