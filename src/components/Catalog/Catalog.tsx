import { Box, Container, Grid, Switch, TextField, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ProductTable } from './ProductTable';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { AllInbox } from '@material-ui/icons';
import React, { ChangeEvent, useState } from 'react';
import { CategoryTable } from './CategoryTable';

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
  searchField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      width: '500px',
    },
  },
}));

export const Catalog = (): JSX.Element => {

  const classes = useStyles();
  const [currentCategory, setCategory] = useState('');
  const [searchString, setSearchString] = useState('');
  const [showCategories, setShowCategories] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShowCategories(event.target.checked);
    if (!showCategories) {
      setCategory('');
    }
  };

  const onSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      search: { value: string };
    };

    const searchString = target.search.value;
    setSearchString(searchString);
  };

  return (
    <Container component='div' maxWidth={'xl'}>
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AllInbox />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Каталог
        </Typography>

        <Box display='flex'
             flexDirection='row'
             p={0}
             m={0}
             bgcolor='background.paper'
             alignItems='center'>
          <Box p={0}>
            <Switch
              checked={showCategories}
              onChange={handleChange}
              color='primary'
              name='showCategories'
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Box>
          <Box p={0}>
            <Typography component='div'>
              Отображать категории
            </Typography>
          </Box>
        </Box>

        <div className={classes.searchField}>
          <form method={'post'} onSubmit={onSearchSubmit}>
            <TextField id={'search'}
                       name={'search'}
                       label={'Поиск товаров'}
                       type={'search'}
            />
          </form>
        </div>
        <Grid component='label' container spacing={2}>
          {showCategories &&
          <Grid item xs={4}>
            <CategoryTable category={currentCategory}
                           setCategory={setCategory} />
          </Grid>}
          <Grid item xs={(showCategories ? 8 : 12)}>
            <ProductTable categoryCode={showCategories ? currentCategory : undefined}
                          searchString={searchString ? searchString : undefined} />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
