import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class Health {
  public health(_req: Request, res: Response) {
    res.status(StatusCodes.OK).send('API GateWay Service is up and running');
  }
}