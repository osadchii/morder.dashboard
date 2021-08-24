interface AuthorizationHeader {
  'Authorization': string;
}

export class ApiService {
  static AuthorizationHeaders(token: string): AuthorizationHeader {
    return {
      'Authorization': `Bearer ${token}`,
    };
  }
}
