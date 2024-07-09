import { CurrentUser } from '@gateway/controllers/auth/current-user';
import { authMiddleware } from '@gateway/services/auth-middleware';
import { Router } from 'express';

class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public routes(): Router {
    this.router.get('/current-user', authMiddleware.checkAuthentication, CurrentUser.prototype.read);
    this.router.post('/resend-email', authMiddleware.checkAuthentication, CurrentUser.prototype.resendEmail);
    return this.router;
  }
}

export const currentUserRoutes = new CurrentUserRoutes();
