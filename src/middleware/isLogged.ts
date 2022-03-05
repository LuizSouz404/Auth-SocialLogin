import { NextFunction, Request, Response } from 'express';

export const isLoggedIn = (request: Request, response: Response, next: NextFunction) => {
  request.user ? next() : response.sendStatus(401);
}
