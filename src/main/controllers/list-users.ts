import { prisma } from "../lib/prisma";

export async function listUsers() {

  return await prisma.user.findMany()

}