import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { AuthService } from '../../services/auth/auth.service';
import { CategoryService } from '../../services/category/category.service';
import { CategoryModel } from '../../services/category/category.model';
import { CategoryTableProps } from './CategoryTable.props';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  table: {
    minWidth: 200,
  },
  root: {
    '& > *': {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

interface TableState {
  rows: CategoryModel[];
  parent: string;
}

export const CategoryTable = ({ category, setCategory }: CategoryTableProps): JSX.Element => {

  const history = useHistory();

  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState('');
  const [tableState, setTableState] = useState({
    rows: [] as CategoryModel[],
    parent: '',
  } as TableState);

  const getCategories = async () => {
    try {
      const categories = await CategoryService.getByParentCode(category);
      if (categories.length > 0) {
        const parent = categories[0].parentCode ?? '';
        setTableState({
          parent: parent,
          rows: categories,
        });
      }
    } catch (error) {
      const { statusCode } = error.response.data;
      let message = '';
      if (statusCode === 401
        || statusCode === 403) {
        AuthService.logout();
        history.push('/login');
      } else {
        message = error.toString();
      }

      setErrorMessage(message);
    }
  };

  const getCategoriesCallback = useCallback(async () => {
    await getCategories();
  }, [category]);

  useEffect(() => {
    getCategoriesCallback();
  }, [getCategoriesCallback]);

  const onClick = (event: SyntheticEvent) => {
    const target = event.target as typeof event.target & { id: string };
    setCategory(target.id);
  };

  const onClickToUpper = async () => {
    if (!tableState.parent) {
      return;
    }
    const parentCategory = await CategoryService.getUpperCategoryCode(tableState.parent);
    setCategory(parentCategory);
  };

  return (
    <>
      <Typography color={'primary'}>
        Категории
      </Typography>
      <Typography color={'error'}>
        {errorMessage}
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Категория</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category &&
            <StyledTableRow key={'to-up-category'}>
              <StyledTableCell component='th' scope='row' id={'to-up-category'} onClick={onClickToUpper}>
                Наверх
              </StyledTableCell>
            </StyledTableRow>}
            {tableState.rows.map((row) => (
              <StyledTableRow key={row.erpCode}>
                <StyledTableCell component='th' scope='row' id={row.erpCode} onClick={onClick}>
                  {row.name}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
