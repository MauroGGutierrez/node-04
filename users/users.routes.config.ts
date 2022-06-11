import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    // hijo
    super(app, "UsersRoutes"); //el super se comunica con el padre osea el CommonRoutesConfig
  }
  configureRoutes() {
    return this.app;
  }
}
