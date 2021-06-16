import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as path from "path";
import generateRoute from "../route";
import env from "../config/env";

const corsConfig = {
  origin: env.origin,
  credentials: true,
};

export default () => {
  const app: express.Application = express();

  app.use(cors(corsConfig));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
  generateRoute(app);

  return app;
};
