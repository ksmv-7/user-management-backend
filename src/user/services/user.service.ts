import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { UserRepository } from '../repositories/user.repository';
import { ReadUserResponseDto } from '../dto/read.dto';
import { ReadUserResponseType } from '../types/read.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  private handleError(method: string, error: any): never {
    console.error(`Error in UserService.${method}:`, error);
    throw new InternalServerErrorException(`Failed to ${method} user`);
  }

  async create(user: Partial<User>): Promise<User> {
    try {
      return await this.userRepo.create(user);
    } catch (error) {
      this.handleError('create', error);
    }
  }

  async paginatedList(page: number, limit: number): Promise<ReadUserResponseType> {
    try {
      const { data, total } = await this.userRepo.paginatedList(page, limit);
      const userData = ReadUserResponseDto.fromArray(data);
      const totalPages = Math.ceil(total / limit);
      const nextPage = page < totalPages ? page + 1 : undefined;

      return {
        userData,
        total,
        totalPages,
        nextPage,
      };
    } catch (error) {
      this.handleError('list', error);
    }
  }
  
  async findById(id: string): Promise<ReadUserResponseDto | null> {
    try {
      const user = new ReadUserResponseDto(await this.userRepo.findById(id))
      return user
    } catch (error) {
      this.handleError('findById', error);
    }
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    try {
      return this.userRepo.update(id, user);
    } catch (error) {
      this.handleError('update', error);
    }
  }

  async delete(id: string): Promise<ReadUserResponseDto | null> {
    try {
      const deletedUser = new ReadUserResponseDto(await this.userRepo.delete(id))
      return deletedUser;
    } catch (error) {
      this.handleError('delete', error);
    }
  }
}
