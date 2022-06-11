import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    // hijo
    super(app, "UsersRoutes"); //el super se comunica con el padre osea el CommonRoutesConfig
  }
  configureRoutes() {
    this.app
      .route(`/users`)
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`List of users`);
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send(`Post to users`);
      });
    this.app
      .route(`/users/:userId`)
      .all(
        //el aplica a todas las rutas get,post,etc
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          // this middleware function runs before any request to /users/:userId
          // but it doesn't accomplish anything just yet---
          // it simply passes control to the next applicable function below using next()
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET requested for id ${req.params.userId}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT requested for id ${req.params.userId}`);
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send(`PATCH requested for id ${req.params.userId}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE requested for id ${req.params.userId}`);
      });
    return this.app;
  }
}