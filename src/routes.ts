import { Router } from "express";
import { MeasureController } from "./controllers/MeasureController";
import { measureValidator } from "./validators/measureValidator";
import { validationMiddleware } from "./middlewares/validationMiddleware";

const routes = Router();

const measureController = new MeasureController();

routes.post(
  "/upload",
  measureValidator,
  validationMiddleware,
  measureController.createMeasure
);

export default routes;
