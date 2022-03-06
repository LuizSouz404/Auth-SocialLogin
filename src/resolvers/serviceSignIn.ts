import { compare } from 'bcryptjs';
import { Request, Response } from 'express'

import { prisma } from '../server';

type User = {
  id: string,
  name: string,
  email: string,
  password?: string,
  createdAt: Date,
  updatedAt: Date
}

export default async (request: Request, response: Response) => {
  const { email, password, provider, providerID } = request.body;

  const userAuth: User | null = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if(!userAuth) {
    return response.status(400).json({
      error: 'Invalid credentials email or password'
    });
  }

  if(!!provider) {
    const providerIDCheck = await prisma.user.findFirst({
      where: {
        providerID
      }
    });

    if(!!providerIDCheck) {

      delete userAuth.password;

      return response.status(200).json({
        user: userAuth,
        success: true,
      });
    }
  }

  const user = await compare(password, userAuth.password as string);

  if(!user) {
    return response.status(400).json({
      error: 'Invalid credentials email or password'
    });
  }

  delete userAuth.password;

  return response.status(200).json({
    user: userAuth,
    success: true,
  });
}
