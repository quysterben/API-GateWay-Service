import { authService } from '@gateway/services/api/auth.service';
import { BadRequestError } from '@quysterben/jobber-shared';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class AuthSeed {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await authService.seed(req.params.count);
      res.status(StatusCodes.OK).json({ message: response.data.message });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.message, 'AuthSeed create() method'));
    }
  }
}
