import { Request, Response } from 'express';
import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

export class SignUp {
  public async create(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.singUp(req.body);
    req.session = {
      jwt: response.data.token
    };
    res.status(StatusCodes.CREATED).json({ message: response.data.message, user: response.data.user });
  }
}
