import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as path from "path";
import env from "../config";

const corsConfig = {
  origin: env.origin,
  credentials: true,
};

export const createExpress = (): express.Application => {
  const app: express.Application = express();

  app.use(cors(corsConfig));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));

  return app;
};
