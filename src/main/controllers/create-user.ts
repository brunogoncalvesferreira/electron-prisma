import { prisma } from "../lib/prisma";

export interface Props {
  name: string
  email: string
}

export async function createUser(data: Props) {
  const { name, email} = data

  await prisma.user.create({
    data: {
      name, email
    }
  })
}