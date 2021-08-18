import {AuthModel} from "./auth.model";
import axios from "axios";

export class AuthService {
    private static readonly loginUrl = `${process.env.REACT_APP_API_BASE_URL}/auth/login`;
    private static readonly tokenKey = 'token';

    static async login(authModel: AuthModel, setToken: (token: string) => void): Promise<void> {

        const response = await axios.post(this.loginUrl, authModel);
        const data = response.data as typeof response.data & { access_token: string };
        const {access_token} = data;

        setToken(access_token);
        this.saveToken(access_token);

    }

    static logout(setToken: (token: string) => void): void {
        setToken('');
        this.saveToken('');
    }

    static getTokenFromStorage(): string {
        const tokenFromStorage = localStorage.getItem(this.tokenKey);
        if (tokenFromStorage)
            return tokenFromStorage;
        return '';
    }

    private static saveToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

}
