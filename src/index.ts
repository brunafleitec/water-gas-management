import express from "express";
import { dataSource } from "./data-source";
import routes from "./routes";

dataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.use(routes);

  return app.listen(process.env.PORT);
});
