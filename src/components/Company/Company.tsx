import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/Business';
import { CompanyModel } from '../../services/company/company.model';
import { ChangeEvent, FormEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { CompanyService } from '../../services/company/company.service';
import { useHistory } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Company = (): JSX.Element => {

  const history = useHistory();

  const classes = useStyles();

  const defaultData: CompanyModel = {
    shopName: '',
    companyName: '',
    url: '',
  };

  const [companyData, setCompanyData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const getCompany = useCallback(async () => {
    const company = await CompanyService.getCompanyData()
      .catch((error: AxiosError) => {
        ApiService.catchFetchError(error, history.push, setErrorMessage);
      });
    if (company) {
      setCompanyData(company);
    }
    setLoading(false);
  }, []);

  const onChange = (event: ChangeEvent): void => {
    const target = event.target as typeof event.target & {
      name: string;
      value: string;
    };
    const { name, value } = target;
    const newCompanyData = { ...companyData };

    switch (name) {
      case 'shopName':
        newCompanyData.shopName = value;
        break;
      case 'companyName':
        newCompanyData.companyName = value;
        break;
      case 'url':
        newCompanyData.url = value;
        break;
    }

    setCompanyData(newCompanyData);
  };

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage('');
    await CompanyService.saveCompanyData(companyData)
      .catch((error: AxiosError) => {
        ApiService.catchFetchError(error, history.push, setErrorMessage);
      });
    setOpen(true);
    setLoading(false);
  };

  useEffect(() => {
    getCompany();
  }, [getCompany]);

  return (
    <Container component='div' maxWidth={'md'}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BusinessIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          О компании
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
            id='shopName'
            label='Название магазина'
            name='shopName'
            value={companyData.shopName}
            onChange={onChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='companyName'
            label='Название компании'
            name='companyName'
            value={companyData.companyName}
            onChange={onChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='url'
            label='Адрес сайта'
            name='url'
            value={companyData.url}
            onChange={onChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={loading}>
            Сохранить
          </Button>
        </form>
        <div>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'>
              Данные сохранены
            </Alert>
          </Snackbar>
        </div>
      </div>
    </Container>
  );
};
