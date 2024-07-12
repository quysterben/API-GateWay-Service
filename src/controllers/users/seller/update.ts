import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { sellerService } from '@gateway/services/api/seller.service';
import { BadRequestError } from '@quysterben/jobber-shared';

export class Update {
  public async updateSeller(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await sellerService.updateSeller(req.params.sellerId, req.body);
      res.status(StatusCodes.OK).json({ message: response.data.message, seller: response.data.seller });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Seller Update updateSeller() method'));
    }
  }
}
