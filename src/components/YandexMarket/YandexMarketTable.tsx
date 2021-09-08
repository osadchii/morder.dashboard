import { useHistory } from 'react-router-dom';
import { ReactNode, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Container,
  Fab,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { StyledTableCell } from '../Table/StyledTableCell';
import { StyledTableRow } from '../Table/StyledTableRow';
import { makeStyles } from '@material-ui/core/styles';
import { YandexMarketModel } from '../../services/yandexmarket/yandexmarket.model';
import { YandexMarketService } from '../../services/yandexmarket/yandexmarket.service';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import { Brightness1 } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { ApiService } from '../../services/api.service';
import { AxiosError } from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  table: {
    minWidth: 500,
  },
  root: {
    '& > *': {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  },
  addButtonDiv: {
    '& > *': {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(3),
    },
  },
}));

export const YandexMarketTable = (): JSX.Element => {

  const history = useHistory();

  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState('');
  const [rows, setRows] = useState<YandexMarketModel[]>([]);

  const getItems = async () => {
    const items = await YandexMarketService.getList()
      .catch((error: AxiosError) => {
        ApiService.catchFetchError(error, history.push, setErrorMessage);
      });
    if (items) {
      setRows(items);
    }
  };

  const getItemsCallback = useCallback(async () => {
    await getItems();
  }, []);

  useEffect(() => {
    getItemsCallback();
  }, [getItemsCallback]);

  const onClick = (event: SyntheticEvent) => {
    const target = event.target as typeof event.target & { parentNode: ReactNode };
    const { parentNode } = target;
    const { id } = parentNode as typeof parentNode & { id: string };
    if (id) {
      history.push(`/yandexmarket/${id}`);
    }
  };

  const onCatalogButtonClick = (_id: string) => {
    history.push(`/catalog/${_id}`);
  };

  return (
    <>
      <Container component='div' maxWidth={'xl'}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Brightness1 />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Yandex.Market
          </Typography>
          <Typography color={'error'}>
            {errorMessage}
          </Typography>
          <TableContainer component={Paper} elevation={10}>
            <Table className={classes.table} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Наименование</StyledTableCell>
                  <StyledTableCell align='right'>Активна</StyledTableCell>
                  <StyledTableCell align='right'>Минимальная цена</StyledTableCell>
                  <StyledTableCell align='right'>Действия</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row._id} id={row._id} onClick={onClick}>
                    <StyledTableCell component='th' scope='row'>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align='right'>{row.active.toString()}</StyledTableCell>
                    <StyledTableCell align='right'>{row.minimalPrice}</StyledTableCell>
                    <StyledTableCell align='right'>
                      <Button variant='contained' color='primary' onClick={() => onCatalogButtonClick(row._id)}>
                        Управление каталогом
                      </Button></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className={classes.addButtonDiv}>
          <Fab color='primary' aria-label='add'>
            <AddIcon />
          </Fab>
        </div>
      </Container>
    </>
  );
};
