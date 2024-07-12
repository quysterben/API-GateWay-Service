import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { sellerService } from '@gateway/services/api/seller.service';
import { BadRequestError } from '@quysterben/jobber-shared';

export class Get {
  public async id(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await sellerService.getSellerById(req.params.sellerId);
      res.status(StatusCodes.OK).json({ message: response.data.message, seller: response.data.seller });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Seller Get id() method'));
    }
  }

  public async username(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await sellerService.getSellerByUsername(req.params.username);
      res.status(StatusCodes.OK).json({ message: response.data.message, seller: response.data.seller });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Seller Get username() method'));
    }
  }

  public async random(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await sellerService.getRandomSellers(req.params.size);
      res.status(StatusCodes.OK).json({ message: response.data.message, seller: response.data.seller });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Seller Get random() method'));
    }
  }
}
