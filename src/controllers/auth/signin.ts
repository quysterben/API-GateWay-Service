import { authService } from '@gateway/services/api/auth.service';
import { BadRequestError } from '@quysterben/jobber-shared';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class SignIn {
  public async read(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await authService.signIn(req.body);
      req.session = {
        jwt: response.data.token
      };
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'SignUp create() method'));
    }
  }
}
