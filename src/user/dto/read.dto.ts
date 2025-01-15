import { User } from "../schemas/user.schema";

export class ReadUserResponseDto {
  id: string;
  name: string;
  email: string;
  phone: string;
}

