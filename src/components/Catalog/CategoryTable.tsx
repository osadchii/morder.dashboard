import {
  Container,
  CssBaseline,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { CategoryService } from '../../services/category/category.service';
import { CategoryModel } from '../../services/category/category.model';
import { CategoryTableProps } from './CategoryTable.props';
import { ArrowUpward } from '@material-ui/icons';
import { StyledTableCell } from '../Table/StyledTableCell';
import { StyledTableRow } from '../Table/StyledTableRow';
import { ApiService } from '../../services/api.service';
import { useHistory, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { CatalogBlockMenu } from './CatalogBlockMenu';

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
}));

interface TableState {
  rows: CategoryModel[];
  parent: string;
}

export const CategoryTable = ({ category, setCategory }: CategoryTableProps): JSX.Element => {

  const history = useHistory();
  const params = useParams();

  const { marketplaceId } = params as typeof params & { marketplaceId: string };

  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState('');
  const [tableState, setTableState] = useState({
    rows: [] as CategoryModel[],
    parent: '',
  } as TableState);

  const getCategories = async () => {
    const categories = await CategoryService.getByParentCode(category)
      .catch((error: AxiosError) => {
        ApiService.catchFetchError(error, history.push, setErrorMessage);
      });
    if (categories && categories.length > 0) {
      const parent = categories[0].parentCode ?? '';
      setTableState({
        parent: parent,
        rows: categories,
      });
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

  const isCategoryBlocked = (categoryModel: CategoryModel, id: string): boolean => {
    let blocked = false;

    if (categoryModel.marketplaceSettings) {
      for (const setting of categoryModel.marketplaceSettings) {
        if (setting.marketplaceId == id && setting.blocked) {
          blocked = true;
          break;
        }
      }
    }
    return blocked;
  };

  return (
    <Container>
      <CssBaseline />
      <Typography color={'primary'}>
        Категории
      </Typography>
      <Typography color={'error'}>
        {errorMessage}
      </Typography>
      <TableContainer component={Paper} elevation={10}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Категория</StyledTableCell>
              {marketplaceId &&
              <StyledTableCell>Блокирование</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {category &&
            <StyledTableRow key={'to-up-category'}>
              <StyledTableCell component='th' scope='row' id={'to-up-category'} onClick={onClickToUpper}>
                <ArrowUpward />
              </StyledTableCell>
            </StyledTableRow>}
            {tableState.rows.map((row) => (
              <StyledTableRow key={row.erpCode}>
                <StyledTableCell component='th' scope='row' id={row.erpCode} onClick={onClick}>
                  {row.name}
                </StyledTableCell>
                {marketplaceId && <StyledTableCell align='right'>
                  <CatalogBlockMenu value={isCategoryBlocked(row, marketplaceId)}
                                    marketplaceId={marketplaceId}
                                    erpCode={row.erpCode}
                                    menuType={'blockCategory'} />
                </StyledTableCell>}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
