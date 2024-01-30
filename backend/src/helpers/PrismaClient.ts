import { PrismaClient as PrismaClientClass } from '@prisma/client';

class PrismaClient {
  private static _instance: PrismaClientClass;
  constructor () {
    if (!PrismaClient._instance) {
      PrismaClient._instance = new PrismaClientClass();
    }
  }

  public get instance() {
    return PrismaClient._instance;
  }
}

export default new PrismaClient();
