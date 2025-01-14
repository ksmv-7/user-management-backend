import { User } from "../schemas/user.schema";

export class ReadUserResponseDto {
  id: string;
  name: string;
  email: string;
  phone: string;

  constructor(userSchema: User) {
    this.id = userSchema._id.toString();
    this.name = userSchema.name;
    this.email = userSchema.email;
    this.phone = userSchema.phone;
  }

  static fromArray(userSchemas: User[]): ReadUserResponseDto[] {
    return userSchemas.map(user => new ReadUserResponseDto(user));
  }
}

