import * as express from "express";
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
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));

  return app;
};
