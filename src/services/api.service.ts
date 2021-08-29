import { AuthService } from './auth/auth.service';

interface AuthorizationHeader {
  'Authorization': string;
}

export class ApiService {
  static AuthorizationHeaders(): AuthorizationHeader {
    return {
      'Authorization': `Bearer ${AuthService.getTokenFromStorage()}`,
    };
  }
}
