import { Container, Grid, Switch, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ProductTable } from './ProductTable';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { AllInbox } from '@material-ui/icons';
import { ChangeEvent, useState } from 'react';
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
}));

export const Catalog = (): JSX.Element => {

  const classes = useStyles();
  const [currentCategory, setCategory] = useState('');
  const [showCategories, setShowCategories] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShowCategories(event.target.checked);
    if (!showCategories) {
      setCategory('');
    }
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

        <Typography component='div'>
          <Grid component='label' container alignItems='center' spacing={1}>
            <Grid item>
              <Switch
                checked={showCategories}
                onChange={handleChange}
                color='primary'
                name='showCategories'
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid item>
              Отображать категории
            </Grid>
          </Grid>
        </Typography>
        <Grid component='label' container spacing={2}>
          {showCategories && <Grid item xs={4}>

            <CategoryTable category={currentCategory}
                           setCategory={setCategory} />
          </Grid>}
          <Grid item xs={(showCategories ? 8 : 12)}>
            <ProductTable categoryCode={showCategories ? currentCategory : undefined} />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
