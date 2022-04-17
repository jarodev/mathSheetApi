import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import { permutations, scrumbleTuples } from "./scrumbler";

export class MultiplicationsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Multiplication routes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/multiplications")
      .post((req: express.Request, res: express.Response) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
          const numberOfTasks = parseInt(req.body.numberOfTasks);
          //res.status(200).send(`numberOfTasks: ${numberOfTasks}`);
          const itemsToScrumble: never[] = [];

          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          req.body.itemsToScrumble.forEach((element: never) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            itemsToScrumble.push(element);
          });

          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
          if (numberOfTasks > Math.pow(itemsToScrumble.length, 2)) {
            res
              .status(400)
              .send(
                `numberOfTasks: ${numberOfTasks} to big for amount of single items.`
              );
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-shadow
            const tuples = permutations(itemsToScrumble);
            const tasks = scrumbleTuples(tuples, numberOfTasks);
            const resJSON = {
              tasks: tasks,
            };
            res.status(200).send(resJSON);
          }
        } catch (error) {
          res.status(400).send(error);
        }
      });

    return this.app;
  }
}
