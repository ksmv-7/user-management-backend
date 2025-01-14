import { Controller, Get, InternalServerErrorException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ReadUserResponseDto } from '../dto/read.dto';
import { ReadUserResponseType } from '../types/read.type';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async paginatedList(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<ReadUserResponseType> {
    try {
      return await this.userService.paginatedList(page, limit);
    } catch (error) {
      console.error('Error listing users:', error);
      throw new InternalServerErrorException('Error listing users');
    }
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<ReadUserResponseDto | null> {
    try {
      return await this.userService.findById(id);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new InternalServerErrorException('Error fetching user');
    }
  }
}

