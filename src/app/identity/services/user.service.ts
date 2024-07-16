import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas';
import { UserDetails } from '../interfaces';
import { CreateUserDto, UpdateUserDto } from '../dtos/user_dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument | boolean> {
    if (createUserDto.role === 'admin') {
      const admin = await this.findByRole('admin');
      console.log(admin);

      if (!!admin) throw new ConflictException('Da co admin');
    }

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) return null;
    return user;
  }

  async findByRole(role: string): Promise<UserDocument[] | boolean> {
    const listLore = await this.userModel.find({ role: role }).exec();
    console.log(listLore);
    if (listLore.length === 0) return false;

    return listLore;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument | boolean> {
    updateUserDto.updatedAt = new Date();

    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    this.userModel.findByIdAndDelete(id).exec();

    return true;
  }
}
