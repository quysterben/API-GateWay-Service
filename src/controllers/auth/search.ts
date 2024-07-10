import { authService } from '@gateway/services/api/auth.service';
import { BadRequestError } from '@quysterben/jobber-shared';
import { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Search {
  public async gigById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response: AxiosResponse = await authService.getGig(req.params.id);
      res.status(StatusCodes.OK).json({ message: response.data.message, gig: response.data.gig });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Search gigById() method'));
    }
  }

  public async gigs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { from, size, type } = req.params;
      let query = '';
      const objList = Object.entries(req.query);
      const lastItemIndex = objList.length - 1;
      objList.forEach(([key, value], index) => {
        query += `${key}=${value}${index !== lastItemIndex ? '&' : ''}`;
      });
      const response: AxiosResponse = await authService.getGigs(query, from, size, type);
      res.status(StatusCodes.OK).json({ message: response.data.message, total: response.data.total, gigs: response.data.gigs });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(new BadRequestError(err.response.data.message, 'Search gigs() method'));
    }
  }
}
