import { Request, Response } from 'express'

import { hash } from 'bcryptjs';
import { prisma } from '../server';

export default async (request: Request, response: Response) => {
  const { _json: data, provider } = request.body;
  let hashedPassword = "";

  const userExists = await prisma.user.findFirst({
    where: {
      email: data.email
    }
  });

  if(userExists) {
    return response.status(400).json({error: 'User already exists!'});
  }

  if(!!data.password) {
    hashedPassword = await hash(data.password, 5);
  }

  const result = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      providerID: data.sub,
      provider,
      password: hashedPassword
    },
    select: {
      id: true,
      name: true,
      email: true,
      provider: true,
      providerID: true,
      createdAt: true,
      updatedAt: true,
      password: false
    }
  })

  return response.status(201).json(result);
}
