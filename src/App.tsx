import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Dashboard, SignIn } from './components';
import MainTheme from './themes/main.theme';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={MainTheme}>
      <BrowserRouter>
        <Switch>
          <Route path={'/login'}>
            <SignIn />
          </Route>
          <Route path={'/'}>
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
