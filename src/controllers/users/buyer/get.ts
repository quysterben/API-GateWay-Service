import { buyerService } from '@gateway/services/api/buyer.service';
import { BadRequestError } from '@quysterben/jobber-shared';
import { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Get {
  public async email(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await buyerService.getBuyerByEmail();
      res.status(StatusCodes.OK).json({
        message: response.data.message,
        buyer: response.data.buyer
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Buyer Get email() method'));
    }
  }

  public async currentUsername(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await buyerService.getCurrentBuyerByUsername();
      res.status(StatusCodes.OK).json({
        message: response.data.message,
        buyer: response.data.buyer
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Buyer Get currentUsername() method'));
    }
  }

  public async username(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await buyerService.getBuyerByUsername(req.params.username);
      res.status(StatusCodes.OK).json({
        message: response.data.message,
        buyer: response.data.buyer
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Buyer Get username() method'));
    }
  }
}
