import express from "express";
import { validationResult } from "express-validator"; // me crea una lista de errores que tuvimos eso hace el validateResult

class BodyValidationMiddleware {
  verifyBodyFieldsErrors(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //isEmpty me pregunta si esta vacio
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  }
}

export default new BodyValidationMiddleware();
