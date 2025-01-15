import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { UserRepository } from '../repositories/user.repository';
import { ReadUserResponseDto } from '../dto/read.dto';
import { ListUserPaginatedResponseType } from '../types/read.type';
import { schemaToReadUserResponseMapper, updateUserDtoToUserSchemaMapper } from '../mappers/mappers';
import { CreateUserDto, UpdateUserDto } from '../dto/update.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  private handleError(method: string, error: any): never {
    console.error(`Error in UserService.${method}:`, error);
    throw new InternalServerErrorException(`Failed to ${method} user`);
  }

  async create(user: CreateUserDto): Promise<ReadUserResponseDto | null> {
    try {
      const createdUser = await this.userRepo.create(updateUserDtoToUserSchemaMapper(user));
      return schemaToReadUserResponseMapper(createdUser);
    } catch (error) {
      this.handleError('create', error);
    }
  }

  async get(id: string): Promise<ReadUserResponseDto | null> {
    try {
      const user = await this.userRepo.get(id);
      return schemaToReadUserResponseMapper(user);
    } catch (error) {
      this.handleError('get', error);
    }
  }

  async list(filter: any): Promise<ReadUserResponseDto[]> {
    try {
      const data = await this.userRepo.list(filter);
      return schemaToReadUserResponseMapper(data);
    } catch (error) {
      this.handleError('debounced search', error);
    }
  }
  

  async paginatedList(page: number, limit: number): Promise<ListUserPaginatedResponseType> {
    try {
      const { data, total } = await this.userRepo.paginatedList(page, limit);
      const userData = schemaToReadUserResponseMapper(data);
      const totalPages = Math.ceil(total / limit);
      const nextPage = page < totalPages ? page + 1 : undefined;

      return {
        userData,
        total,
        totalPages,
        nextPage,
      };
    } catch (error) {
      this.handleError('paginated list', error);
    }
  }
  
  async findById(id: string): Promise<ReadUserResponseDto | null> {
    try {
      const user = await this.userRepo.get(id);
      return schemaToReadUserResponseMapper(user)
    } catch (error) {
      this.handleError('findById', error);
    }
  }

  async update(id: string, user: UpdateUserDto): Promise<ReadUserResponseDto | null> {
    try {
      const mappedToSchema = updateUserDtoToUserSchemaMapper(user);
      const updatedUser = await this.userRepo.update(id, mappedToSchema);
      return schemaToReadUserResponseMapper(updatedUser)
    } catch (error) {
      this.handleError('update', error);
    }
  }

  async delete(id: string): Promise<ReadUserResponseDto | null> {
    try {
      const deletedUser = await this.userRepo.delete(id);
      return schemaToReadUserResponseMapper(deletedUser);
    } catch (error) {
      this.handleError('delete', error);
    }
  }
}
