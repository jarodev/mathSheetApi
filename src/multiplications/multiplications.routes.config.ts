import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";

export class MultiplicationsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Multiplication routes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/multiplications")
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send("Multiplications");
      });

    return this.app;
  }
}
