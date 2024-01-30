import PrismaClient from '../helpers/PrismaClient';
import { hash, } from 'bcrypt-ts';
import type { CreateUserDto, UpdateUserDto } from '../validations/users.validator';

class RoomService {
    static async getRooms() {

        const rooms = await PrismaClient.instance.userRoom.findMany();

        return rooms;
    }

    static async getRoom(id: number) {

        const room = await PrismaClient.instance.userRoom.findMany({
            where: { user_id: id },
        });

        return room;
    }

    static async getAccessLinks() {

        const accessLinks = await PrismaClient.instance.accessLink.findMany();

        return accessLinks;
    }

    static async getRoomById(id: number) {
        const room = await PrismaClient.instance.userRoom.findUnique({
            where: { id },

        });

        const accessLink = await PrismaClient.instance.accessLink.findFirst({
            where: { device_id: room?.device_id }
        })


        return { ...room, device_data: accessLink?.data }
    }

    static async deleteRoomById(id: number) {
        const room = await PrismaClient.instance.userRoom.delete({
            where: { id },

        });

    }

    static async deleteAccessLinkById(id: number) {
        const accessLinkId = await PrismaClient.instance.accessLink.delete({
            where: { id },
        })
    }

    static async createAccessLink(createRoom: any) {

        const room = await PrismaClient.instance.accessLink.create({

            data: {
                device_id: createRoom.device_id,
                data: createRoom.data
            }
        })

        return room
    }

    static async createRoom(id: number, createRoom: any) {

        const room = await PrismaClient.instance.userRoom.create({
            data: {
                user_id: id,
                device_type: createRoom.device_type,
                device_name: createRoom.device_name,
                device_id: createRoom.device_id,
                device_info: createRoom.device_info,
                room_no: createRoom.room_no,
                room_name: createRoom.room_name
            },

            select: {
                id: true,
                user_id: true,
                device_type: true,
                device_name: true,
                device_id: true,
                device_info: true,
                room_no: true,
                room_name: true
            }
        });

        return room;
    }
}

export default RoomService;