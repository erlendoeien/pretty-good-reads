// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
import {
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    TextareaAutosize,
    Typography
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { ErrorMessage } from '@hookform/error-message';
import ErrorMessageContainer from './ErrorMessageContainer';
import {
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useYourReviewQuery,
    useMeQuery
} from '../generated/graphql';
import ResetButton from './inputComponents/ResetButton';
import DeleteButton from './inputComponents/DeleteButton';
import SubmitButton from './inputComponents/SubmitButton';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(3, 1, 2)
    },
    resetButton: {
        margin: theme.spacing(1, 0, 1)
    }
}));

interface FormInputs {
    rating: number;
    text: string;
}

interface ICreateUpdateReview {
    bookId: number;
    onCloseModal?: () => void;
}

const CreateUpdateReview: React.FC<ICreateUpdateReview> = ({
    bookId,
    onCloseModal
}: ICreateUpdateReview) => {
    const classes = useStyles();
    const { register, control, handleSubmit, errors, setValue } = useForm<FormInputs>();
    const [createReview] = useCreateReviewMutation();
    const [updateReview] = useUpdateReviewMutation();
    const [deleteReview] = useDeleteReviewMutation();
    const { data, loading } = useYourReviewQuery({
        variables: {
            bookId
        }
    });
    const [ratingState, setRatingState] = useState(0);
    const { data: meData } = useMeQuery();

    let yourReviewExists = false;
    let submitActionText = 'Create';
    let initialRating = 0;
    let initialText = '';

    // Set initial form values
    const yourReview = data?.book?.yourReview;
    if (!loading && yourReview) {
        yourReviewExists = true;
        submitActionText = 'Update';
        initialRating = yourReview.rating;
        if (yourReview.text) {
            initialText = yourReview.text;
        }
    }
    useEffect(() => {
        setRatingState(initialRating);
        if (initialText) {
            setValue('text', initialText);
        }
    }, [initialRating, initialText, setValue]);

    const onSubmit = handleSubmit(async ({ rating, text }) => {
        rating = Number(rating);
        const mutVariables = { bookId, rating, text };

        if (yourReviewExists) {
            const response = await updateReview({
                variables: mutVariables,
                update: (cache) => {
                    cache.evict({ id: `User:${meData?.me?.id}`, fieldName: 'reviews' });
                    cache.evict({ fieldName: 'book:{}' });
                    cache.gc();
                }
            });
            console.log(response);
        } else {
            const response = await createReview({
                variables: mutVariables,
                update: (cache) => {
                    // if (cache.evict({ fieldName: 'book:{}' })) cache.gc();
                    cache.evict({ id: `User:${meData?.me?.id}`, fieldName: 'reviews' });
                    cache.evict({ fieldName: 'book:{}' });
                    cache.gc();
                }
            });
            console.log(response);
        }

        if (onCloseModal !== undefined) {
            onCloseModal();
        }
    });

    const deleteAction = () => {
        deleteReview({
            variables: { bookId },
            update: (cache) => {
                cache.evict({ id: `User:${meData?.me?.id}`, fieldName: 'reviews' });
                cache.evict({ fieldName: 'book:{}' });
                cache.gc();
            }
        });
        if (onCloseModal !== undefined) {
            onCloseModal();
        }
    };

    const ratingElement = (
        <FormControlLabel
            control={
                <>
                    <input
                        name="rating"
                        type="number"
                        value={ratingState}
                        ref={register}
                        hidden
                        readOnly
                    />
                    <Rating
                        name="rating"
                        value={ratingState}
                        precision={0.5}
                        onChange={(_, value) => {
                            if (value) {
                                setRatingState(value);
                            }
                        }}
                    />
                </>
            }
            label=""
        />
    );

    const textArea = (
        <>
            <Controller
                as={<TextareaAutosize />}
                control={control}
                name="text"
                rowsMin={3}
                placeholder="Empty"
                defaultValue={initialText}
            />
            <ErrorMessage errors={errors} name="text" as={<ErrorMessageContainer />} />
        </>
    );

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <form className={classes.form} noValidate onSubmit={onSubmit}>
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <Typography component="h1" variant="h5">
                            {`${submitActionText} review`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item />
                            <Grid item>{ratingElement}</Grid>
                            <Grid item>
                                <ResetButton onClick={() => setRatingState(initialRating)} />;
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>{textArea}</Grid>
                    <Grid container>
                        <Grid item>
                            <SubmitButton
                                submitText={submitActionText}
                                disabled={ratingState === 0}
                            />
                        </Grid>
                        <Grid item>
                            {yourReviewExists && <DeleteButton onDelete={deleteAction} />}
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

CreateUpdateReview.defaultProps = {
    onCloseModal: () => {}
};

export default CreateUpdateReview;
