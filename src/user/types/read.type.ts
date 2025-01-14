import { ReadUserResponseDto } from "../dto/read.dto";

export type ReadUserResponseType = {
  userData: ReadUserResponseDto[];
  total: number;
  totalPages: number;
  nextPage?: number;
};