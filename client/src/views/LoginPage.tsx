// eslint-disable-next-line
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap, addServerErrors } from '../utils/errors';
import ErrorMessageContainer from '../components/ErrorMessageContainer';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

type FormInputs = {
    email: string;
    password: string;
};

const LoginPage: React.FC = () => {
    const classes = useStyles();
    const [login] = useLoginMutation();
    const { register, handleSubmit, errors, setError } = useForm<FormInputs>();
    const [redirect, setRedirect] = useState(false);
    const onSubmit = handleSubmit(async (values) => {
        const response = await login({
            variables: values,
            // Update cache to display logged in status
            update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        __typename: 'Query',
                        me: data?.login.user
                    }
                });
            }
        });

        if (response.data?.login.errors) {
            addServerErrors<FormInputs>(toErrorMap(response.data.login.errors), setError);
        }
        if (response.data?.login.user) {
            console.log('Successful login');
            setRedirect(true);
        }
    });

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({
                            required: {
                                value: true,
                                message: 'Email address is required'
                            }
                        })}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <ErrorMessage errors={errors} name="email" as={<ErrorMessageContainer />} />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({ required: true })}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <ErrorMessage errors={errors} name="password" as={<ErrorMessageContainer />} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} variant="body2" to="/register">
                                Don&apos;t have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default LoginPage;
