import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  id: string;
}
