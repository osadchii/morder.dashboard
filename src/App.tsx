import {Dashboard, SignIn} from "./components";
import {useState} from "react";
import {AuthService} from "./services/auth/auth.service";
import {AuthModel} from "./services/auth/auth.model";

const App = (): JSX.Element => {
    const [token, setToken] = useState(AuthService.getTokenFromStorage());

    const login = async (authModel: AuthModel): Promise<void> => {
        await AuthService.login(authModel, setToken);
    }
    const logout = (): void => {
        AuthService.logout(setToken);
    }

    if (!token) {
        return LoginPage(login);
    }
    return <Dashboard
        logout={logout}
        token={token}
    />
}

const LoginPage = (login: (authModel: AuthModel) => Promise<void>): JSX.Element => {
    return (
        <SignIn login={login}/>
    );
}

export default App;
