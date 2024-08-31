import { Repository } from "typeorm";
import { Measure } from "../entities/Measure";

interface ICheckDoubleReportsParams {
  customer_code: string;
  measure_datetime: Date;
  measure_type: string;
  measureRepository: Repository<Measure>;
}

export const checkDoubleReports = async ({
  customer_code,
  measureRepository,
  measure_type,
  measure_datetime,
}: ICheckDoubleReportsParams): Promise<boolean> => {
  const queryBuilder = measureRepository.createQueryBuilder("measurements");

  const year = measure_datetime.getFullYear();
  const month = measure_datetime.getMonth();

  queryBuilder
    .where("measurements.customer = :customer_id", { customer_code })
    .andWhere("measurements.measure_type = :measure_type", { measure_type })
    .andWhere(
      "measurements.measure_datetime BETWEEN :initialDate AND :endDate",
      {
        initialDate: new Date(year, month, -1, 1),
        endDate: new Date(year, month),
      }
    );

  const hasRecords = (await queryBuilder.getMany()).length > 0;

  return hasRecords;
};
