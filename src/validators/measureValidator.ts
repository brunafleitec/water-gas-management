import { body } from "express-validator";

export const measureValidator = [
  body("image")
    .notEmpty()
    .withMessage("A imagem é obrigatória")
    .isBase64()
    .withMessage("A imagem deve estar em formato base64"),
  body("customer_code")
    .notEmpty()
    .withMessage("O código do cliente é obrigatório")
    .isString()
    .withMessage("O código do cliente deve ser uma string"),
  body("measure_datetime")
    .notEmpty()
    .withMessage("A data e hora da leitura são obrigatórias")
    .isISO8601()
    .withMessage("A data e hora devem estar em formato ISO8601"),
  body("measure_type")
    .notEmpty()
    .withMessage("O tipo de leitura é obrigatório")
    .isIn(["WATER", "GAS"])
    .withMessage("O tipo de leitura deve ser WATER ou GAS"),
];
