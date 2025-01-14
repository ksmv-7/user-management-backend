import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }

  async paginatedList(page: number, limit: number): Promise<{ data: User[]; total: number }> {
    const skip = (page - 1) * limit;
    const data = await this.userModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.userModel.countDocuments().exec();

    return { data, total };
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}