import { CurrentUser } from '@gateway/controllers/auth/current-user';
import { RefreshToken } from '@gateway/controllers/auth/refresh-token';
import { authMiddleware } from '@gateway/services/auth-middleware';
import { Router } from 'express';

class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public routes(): Router {
    this.router.get('/auth/current-user', authMiddleware.checkAuthentication, CurrentUser.prototype.read);
    this.router.post('/auth/resend-email', authMiddleware.checkAuthentication, CurrentUser.prototype.resendEmail);
    this.router.get('/auth/refresh-token/:username', authMiddleware.checkAuthentication, RefreshToken.prototype.read);
    return this.router;
  }
}

export const currentUserRoutes = new CurrentUserRoutes();
