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


  static catchFetchError(error: Record<string, unknown>,
                         pushHistory: (url: string) => void,
                         setErrorText?: (text: string) => void): void {

    console.log('catch');
    if (!error.hasOwnProperty('response')) {
      return;
    }

    const response = error.response as typeof error.response & { status: number };
    const { status } = response;
    console.log(response);

    console.log(status);

    if (status === 403
      || status === 401) {
      AuthService.logout();
      pushHistory('/login');
    } else {
      if (setErrorText) {
        setErrorText(error.toString());
      }
    }
  }
}
