import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddle implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
