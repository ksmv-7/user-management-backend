import { Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ReadUserResponseDto } from '../dto/read.dto';
import { ListUserPaginatedResponseType } from '../types/read.type';
import { FilterQueryValidationPipe } from 'src/common/pipes/validate-search-query.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('by-page')
  async paginatedList(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<ListUserPaginatedResponseType> {
    try {
      return await this.userService.paginatedList(page, limit);
    } catch (error) {
      console.error('Error listing users:', error);
      throw new InternalServerErrorException('Error listing users');
    }
  }

  @Get('by-filter')
  async debouncedSearch(@Query('query', FilterQueryValidationPipe) query: string): Promise<ReadUserResponseDto[]> {
    try {
      const filter = { email: new RegExp(query, 'i') };
      return await this.userService.list(filter);
    } catch (error) {
      console.error('Error listing users:', error);
      throw new InternalServerErrorException('Error listing users');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ReadUserResponseDto | null> {
    try {
      return await this.userService.delete(id);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new InternalServerErrorException('Error fetching user');
    }
  }
}

