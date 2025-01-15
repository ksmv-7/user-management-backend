import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FilterQueryValidationPipe implements PipeTransform<string, string> {
  transform(value?: string): string {
    if (!value) {
      throw new BadRequestException('Query parameter cannot be empty.');
    }
    if (value.length < 3) {
      throw new BadRequestException('Query parameter length must be at least 3 characters.');
    }
    return value;
  }
}