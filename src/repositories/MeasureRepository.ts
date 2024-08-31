import { dataSource } from "../data-source";
import { Measure } from "../entities/Measure";
import { checkDoubleReports } from "../services/checkDoubleReports";
import { geminiService } from "../services/geminiService";

export interface ICreateMeasureParams {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: string;
}

interface ICreateMeasureResponse extends Measure {
  image_url: string;
}

export class MeasureRepository {
  constructor() {}

  private measureRepository = dataSource.getRepository(Measure);

  async createMeasure(
    measure: ICreateMeasureParams
  ): Promise<ICreateMeasureResponse> {
    const isDoubleReport = await checkDoubleReports({
      customer_code: measure.customer_code,
      measure_datetime: measure.measure_datetime,
      measure_type: measure.measure_type,
      measureRepository: this.measureRepository,
    });

    if (isDoubleReport) {
      throw new Error("DOUBLE_REPORT");
    }

    const { image_url, measure_guid, measure_value } = await geminiService(
      measure.image
    );

    const newMeasure = this.measureRepository.create({
      customer: {
        customer_code: measure.customer_code,
      },
      measure_datetime: measure.measure_datetime,
      value: measure_value,
      measure_type: measure.measure_type,
    });
    await this.measureRepository.save(newMeasure);

    return {
      ...newMeasure,
      image_url,
    };
  }
}
