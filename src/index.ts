import express from "express";
import * as http from "http";

import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";

import { CommonRoutesConfig } from "./common/common.routes.config";
import { MultiplicationsRoutes } from "./multiplications/multiplications.routes.config";

import debug from "debug";

import dotenv from "dotenv";

// eslint-disable-next-line import/no-named-as-default-member
dotenv.config();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

const port = process.env.PORT || 3000;

// eslint-disable-next-line import/no-named-as-default-member
app.use(express.json());
app.use(cors());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
      winston.format.colorize({ all: true })
    ),
  })
);

routes.push(new MultiplicationsRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  console.log(runningMessage);
});
