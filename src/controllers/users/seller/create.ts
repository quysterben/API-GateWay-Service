import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { sellerService } from '@gateway/services/api/seller.service';

export class Create {
  public async seller(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await sellerService.createSeller(req.body);
      res.status(StatusCodes.CREATED).json({ message: response.data.message, seller: response.data.seller });
    } catch (error) {
      next(error);
    }
  }
}
