import { CatalogBlockMenuProps } from './CatalogBlockMenu.props';
import { createStyles, Fab, Theme } from '@material-ui/core';
import { Favorite, FavoriteBorder, Lock, LockOpen } from '@material-ui/icons';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CategoryService } from '../../services/category/category.service';
import { AxiosError } from 'axios';
import { ApiService } from '../../services/api.service';
import { useHistory } from 'react-router-dom';
import { ProductService } from '../../services/product/product.service';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export const CatalogBlockMenu = ({ menuType, marketplaceId, value, erpCode }: CatalogBlockMenuProps): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const [currentValue, setCurrentValue] = useState(value);
  const [disabled, setDisabled] = useState(false);

  const onClick = async () => {
    setDisabled(true);
    const newStatus = !currentValue;
    try {
      switch (menuType) {
        case 'blockProduct':
          ProductService.setProductNullifyStockFlag(erpCode, marketplaceId, newStatus)
            .catch((error: AxiosError) => {
              ApiService.catchFetchError(error, history.push);
            });
          break;
        case 'ignoreRestrictionsProduct':
          ProductService.setProductIgnoreRestrictionsFlag(erpCode, marketplaceId, newStatus)
            .catch((error: AxiosError) => {
              ApiService.catchFetchError(error, history.push);
            });
          break;
        case 'blockCategory':
          CategoryService.setCategoryBlockedFlag(erpCode, marketplaceId, newStatus)
            .catch((error: AxiosError) => {
              ApiService.catchFetchError(error, history.push);
            });
          break;
      }
      setCurrentValue(newStatus);
    } catch (error) {
      console.log(error);
    }
    setDisabled(false);
  };

  return (
    <>
      {menuType === 'ignoreRestrictionsProduct' ?
        <Fab color={currentValue ? 'primary' : 'inherit'}
             size='small' key={erpCode}
             disableFocusRipple={true}
             onClick={onClick}
             className={classes.margin}
             disabled={disabled}
             autoFocus={false}>
          {currentValue ? <FavoriteBorder /> : <Favorite />}
        </Fab> :
        <Fab color={currentValue ? 'inherit' : 'primary'}
             size='small' key={erpCode}
             disableFocusRipple={true}
             onClick={onClick}
             className={classes.margin}
             disabled={disabled}
             autoFocus={false}>
          {currentValue ? <LockOpen /> : <Lock />}
        </Fab>}
    </>
  );
};
