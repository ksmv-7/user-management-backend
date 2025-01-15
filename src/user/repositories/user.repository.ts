import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { ObjectId } from "mongodb";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }

  async list(filter?: Record<string, any>): Promise<User[]> {
    return this.userModel.find(filter).exec();
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

  async get(id: string): Promise<User | null> {
    return this.userModel.findById(new ObjectId(id)).exec();
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(new ObjectId(id), user, { new: true }).exec();
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(new ObjectId(id)).exec();
  }
}