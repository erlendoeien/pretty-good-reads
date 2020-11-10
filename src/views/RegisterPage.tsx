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
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
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
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

type FormInputs = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    nationality: string;
};

const RegisterPage: React.FC = () => {
    const classes = useStyles();
    const [registerMut] = useRegisterMutation();
    const { register, handleSubmit, errors, setError } = useForm<FormInputs>();
    const [redirect, setRedirect] = useState(false);
    const onSubmit = handleSubmit(async (values) => {
        const response = await registerMut({
            variables: values,
            update: (cache, { data }) => {
                // Login user on register by saving user in "me"-query
                cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: { __typename: 'Query', me: data?.register.user }
                });
            }
        });
        if (response.data?.register.errors) {
            addServerErrors<FormInputs>(toErrorMap(response.data.register.errors), setError);
        } else {
            setRedirect(true);
        }
    });

    // Could use me-query instead
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
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                inputRef={register({
                                    required: {
                                        value: true,
                                        message: 'First name is required'
                                    }
                                })}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                            <ErrorMessage
                                errors={errors}
                                name="firstName"
                                as={<ErrorMessageContainer />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                inputRef={register({
                                    required: {
                                        value: true,
                                        message: 'Last name is required'
                                    }
                                })}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                            <ErrorMessage
                                errors={errors}
                                name="lastName"
                                as={<ErrorMessageContainer />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={register({
                                    required: {
                                        value: true,
                                        message: 'Email address is required'
                                    }
                                })}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                as={<ErrorMessageContainer />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={register({
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    }
                                })}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                as={<ErrorMessageContainer />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={register()}
                                variant="outlined"
                                fullWidth
                                id="nationality"
                                label="Nationality"
                                name="nationality"
                                autoComplete="nationality"
                            />
                            <ErrorMessage
                                errors={errors}
                                name="nationality"
                                as={<ErrorMessageContainer />}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={RouterLink} variant="body2" to="/login">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default RegisterPage;
