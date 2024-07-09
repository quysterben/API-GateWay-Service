import { authService } from '@gateway/services/api/auth.service';
import { BadRequestError } from '@quysterben/jobber-shared';
import { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class CurrentUser {
  public async read(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await authService.getCurrentUser();
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Password forgotPassword() method'));
    }
  }

  public async resendEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await authService.resendEmail({
        email: req.body.email,
        userId: req.body.userId
      });
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Password forgotPassword() method'));
    }
  }
}
