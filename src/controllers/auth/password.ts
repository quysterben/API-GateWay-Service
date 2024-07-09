import { authService } from '@gateway/services/api/auth.service';
import { BadRequestError } from '@quysterben/jobber-shared';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Password {
  public async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await authService.forgotPassword(req.body.email);
      res.status(StatusCodes.OK).json({ message: response.data.message });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Password forgotPassword() method'));
    }
  }

  public async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { password, confirmPassword } = req.body;
      const response = await authService.resetPassword(req.params.token, password, confirmPassword);
      res.status(StatusCodes.OK).json({ message: response.data.message });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Password resetPassword() method'));
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body;
      const response = await authService.changePassword(currentPassword, newPassword);
      res.status(StatusCodes.OK).json({ message: response.data.message });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Password changePassword() method'));
    }
  }
}
