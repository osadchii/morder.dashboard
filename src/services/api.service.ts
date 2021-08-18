export class ApiService {
    static AuthorizationHeaders(token: string) {
        return {
            "Authorization": `Bearer ${token}`
        }
    }
}
