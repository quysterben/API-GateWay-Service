import { NextFunction, Request, Response } from 'express';
import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '@quysterben/jobber-shared';

export class SignUp {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await authService.singUp(req.body);
      req.session = {
        jwt: response.data.token
      };
      res.status(StatusCodes.CREATED).json({ message: response.data.message, user: response.data.user });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'SignUp create() method'));
    }
  }
}
