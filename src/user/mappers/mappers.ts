import { UpdateUserDto } from "../dto/update.dto";
import { User } from "../schemas/user.schema";

export function updateUserDtoToUserSchemaMapper(updateUserDto: UpdateUserDto) {
  return {
    email: updateUserDto.email,
    name: updateUserDto.name,
    phone: updateUserDto.phone,
  }
}
export function schemaToReadUserResponseMapper (userSchema: User | User[]) {
  if (!userSchema || (Array.isArray(userSchema) && userSchema.length === 0)) {
    return null;
  }
  if (!Array.isArray(userSchema)) {
    return {
      email: userSchema.email,
      name: userSchema.name,
      phone: userSchema.phone,
      id: userSchema._id.toString()
    };
  }
  return userSchema.map(userSchema => schemaToReadUserResponseMapper(userSchema));
}