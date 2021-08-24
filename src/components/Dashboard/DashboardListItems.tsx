import { Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AllInbox } from '@material-ui/icons';
import { AuthService } from '../../services/auth/auth.service';
import { Link, useHistory } from 'react-router-dom';

export const DashboardListItems = (): JSX.Element => {

  const history = useHistory();

  const logout = () => {
    AuthService.logout();
    history.push('/login');
  };

  return (
    <div>
      <ListItem component={Link} to={'/'}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Панель управления' />
      </ListItem>
      <ListItem component={Link} to={'/company'}>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary='О компании' />
      </ListItem>
      <ListItem component={Link} to={'/catalog'}>
        <ListItemIcon>
          <AllInbox />
        </ListItemIcon>
        <ListItemText primary='Каталог' />
      </ListItem>
      <Divider />
      <ListItem button
                onClick={logout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary='Выйти' />
      </ListItem>
    </div>
  );
};
