import { ReadUserResponseDto } from "../dto/read.dto";

export type ListUserPaginatedResponseType = {
  userData: ReadUserResponseDto[];
  total: number;
  totalPages: number;
  nextPage?: number;
};