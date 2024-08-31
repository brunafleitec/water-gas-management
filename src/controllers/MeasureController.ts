import { Request, Response } from "express";
import { MeasureRepository } from "../repositories/MeasureRepository";

const measureErrors = {
  DOUBLE_REPORT: {
    statusCode: 409,
    message: "Já existe uma leitura para este tipo no mês atual",
    error_description: "Leitura do mês já realizada",
  },
};

export class MeasureController {
  constructor() {}

  private measureRepository = new MeasureRepository();

  async createMeasure(req: Request, res: Response): Promise<any> {
    try {
      const { image, customer_code, measure_datetime, measure_type } = req.body;

      const newMeasure = await this.measureRepository.createMeasure({
        image,
        customer_code,
        measure_datetime,
        measure_type,
      });

      return res.status(200).json({
        message: "Operação realizada com sucesso",
        data: {
          image_url: newMeasure.image_url,
          measure_value: newMeasure.value,
          measure_uuid: newMeasure.id,
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error));
      const errorData = measureErrors[error];
      return res.status(errorData.statusCode).json({
        message: errorData.message,
        data: {
          error_code: error,
          error_description: errorData.error_description,
        },
      });
    }
  }
}
