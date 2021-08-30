import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormEvent, useEffect, useState } from 'react';
import { AuthService } from '../../services/auth/auth.service';
import { useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';

const Copyright = (): JSX.Element => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='http://m.osdc.ru'>
        MOrder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignIn = (): JSX.Element => {
  const classes = useStyles();

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (AuthService.isAuthorized()) {
      history.push('/');
    }
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    await AuthService.login({
      login: email,
      password,
    })
      .then(() => history.push('/'))
      .catch((error: AxiosError) => {
        let message = '';
        if (error.response && error.response.status) {
          const { status } = error.response;
          if (status === 403 || status === 401) {
            message = 'Неверный пароль';
          }
        }
        if (!message) {
          message = error.message;
        }
        setErrorMessage(message);
      });

    setLoading(false);
  };

  return (
    <Container component={'div'} maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Панель управления
        </Typography>
        <Typography color={'error'}>
          {errorMessage}
        </Typography>
        <form className={classes.form} noValidate
              onSubmit={onSubmit}
              method={'post'}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Электронная почта'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Пароль'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={loading}
            className={classes.submit}
          >
            Войти
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
