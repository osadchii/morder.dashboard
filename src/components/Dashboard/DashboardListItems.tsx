import { Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AllInbox, Brightness1, ListAlt, Telegram } from '@material-ui/icons';
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
      <ListItem component={Link} to={'/orders'} disabled={true}>
        <ListItemIcon>
          <ListAlt />
        </ListItemIcon>
        <ListItemText primary='Заказы' />
      </ListItem>
      <Divider />
      <ListItem component={Link} to={'/yandexmarket'} disabled={true}>
        <ListItemIcon>
          <Brightness1 />
        </ListItemIcon>
        <ListItemText primary='Яндекс.Маркет' />
      </ListItem>
      <ListItem component={Link} to={'/sbermegamarket'} disabled={true}>
        <ListItemIcon>
          <Brightness1 />
        </ListItemIcon>
        <ListItemText primary='СберМегаМаркет' />
      </ListItem>
      <ListItem component={Link} to={'/ozon'} disabled={true}>
        <ListItemIcon>
          <Brightness1 />
        </ListItemIcon>
        <ListItemText primary='Озон' />
      </ListItem>
      <ListItem component={Link} to={'/wildberries'} disabled={true}>
        <ListItemIcon>
          <Brightness1 />
        </ListItemIcon>
        <ListItemText primary='Wildberries' />
      </ListItem>
      <ListItem component={Link} to={'/meso'} disabled={true}>
        <ListItemIcon>
          <Brightness1 />
        </ListItemIcon>
        <ListItemText primary='MESO' />
      </ListItem>
      <ListItem component={Link} to={'/aliexpress'} disabled={true}>
        <ListItemIcon>
          <Brightness1 />
        </ListItemIcon>
        <ListItemText primary='Aliexpress' />
      </ListItem>
      <Divider />
      <ListItem component={Link} to={'/telegram'} disabled={true}>
        <ListItemIcon>
          <Telegram />
        </ListItemIcon>
        <ListItemText primary='Телеграм' />
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
