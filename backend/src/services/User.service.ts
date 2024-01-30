import PrismaClient from '../helpers/PrismaClient';
import { hash, } from 'bcrypt-ts';
import type { CreateUserDto, UpdateUserDto } from '../validations/users.validator';

class UserService {
  static async createUser(userDto: CreateUserDto) {
    const hashedPassword = await hash(userDto.password, 10);

    const user = await PrismaClient.instance.user.create({
      data: { ...userDto, password: hashedPassword },
      select: { id: true, username: true, email: true, role: true },
    });

    return user;
  }

  static async getUserById(id: number) {
    const user = await PrismaClient.instance.user.findUnique({
      where: { id },
    })

    return user;
  }

  static async getUsers() {
    const users = await PrismaClient.instance.user.findMany();

    return users;
  }

  static async updateUser(id: number, userDto: UpdateUserDto) {

    const user = await PrismaClient.instance.user.update({
      where: { id },
      data: { ...userDto },
    });

    return user;
  }

  static async getUserByIpAddress(userIpAddress: string) {
    const deviceIdRecord = await PrismaClient.instance.accessLink.findFirst({
      where: { data: userIpAddress }
    });

    console.log("deviceIdRecord: ", deviceIdRecord)

    const userRoomRecord = await PrismaClient.instance.userRoom.findFirst({
      where: { device_id: deviceIdRecord?.device_id }
    });

    console.log("userRoomRecord: ", userRoomRecord)

    const userRecord = await PrismaClient.instance.user.findFirst({
      where: { id: userRoomRecord?.user_id }
    });

    console.log("userRecord: ", userRecord)

    return { email: userRecord?.email, name: userRecord?.username };
  }
}

export default UserService;