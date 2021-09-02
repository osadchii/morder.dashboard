import { AuthService } from './auth/auth.service';
import { AxiosError } from 'axios';

interface AuthorizationHeader {
  'Authorization': string;
}

export class ApiService {
  static AuthorizationHeaders(): AuthorizationHeader {
    return {
      'Authorization': `Bearer ${AuthService.getTokenFromStorage()}`,
    };
  }

  static catchFetchError(error: AxiosError,
                         pushHistory: (url: string) => void,
                         setErrorText?: (text: string) => void): void {

    if (error.response && error.response.status) {
      const { status } = error.response;
      if (status === 403 || status === 401) {
        AuthService.logout();
        pushHistory('/login');
        return;
      }
    }
    if (setErrorText) {
      setErrorText(error.message);
    }
  }
}
