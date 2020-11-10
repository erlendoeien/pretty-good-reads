// eslint-disable-next-line
import React from 'react';
import { Rating } from '@material-ui/lab';
import { Box, Container, CssBaseline, Grid, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Cover from '../images/bookCover.jpg';

const useStyles = makeStyles({
    root: {
        padding: '20px',
        marginTop: '5vh'
    },
    coverImg: {
        height: '10vh'
    },
    link: {
        textDecoration: 'none',
        color: 'rgba(89,29,169)'
    }
});

interface IReviewedBy {
    firstName: string;
    lastName: string;
}

interface IReviewItem {
    id: number;
    title: string;
    bookCoverUrl?: string | null;
}

export interface IReview {
    rating: number;
    text?: string | null;
    updatedAt: string;
    createdAt: string;
    reviewedBy: IReviewedBy;
    reviewedById?: number;
    reviewItem?: IReviewItem;
}

const Review: React.FC<IReview> = (review: IReview) => {
    const classes = useStyles();

    const reviewerName = `${review.reviewedBy.firstName} ${review.reviewedBy.lastName}`;
    const rating = (
        <Rating name="rating" value={review.rating} precision={0.5} size="small" readOnly />
    );

    let it: JSX.Element | string = 'this book';
    let coverImage: JSX.Element | null = null;
    const { reviewItem } = review;
    if (reviewItem != null) {
        it = (
            <Link to={`/${reviewItem.id}`} className={classes.link}>
                {reviewItem.title}
            </Link>
        );

        coverImage = (
            <img
                className={classes.coverImg}
                src={reviewItem.bookCoverUrl || Cover}
                alt="Book Cover"
            />
        );
    }

    // Convert from timestamp to datetime (current locale)
    const updatedAtText = new Date(Number(review.updatedAt)).toLocaleString();

    const ratingBox = (
        <Box>
            {reviewerName} rated {it} {rating}
        </Box>
    );

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />

            <Grid container direction="column" alignItems="flex-start">
                <Grid container>
                    {coverImage != null && (
                        <Grid item xs={2}>
                            {coverImage}
                        </Grid>
                    )}
                    <Grid item xs={10}>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Grid container direction="column" alignItems="flex-start">
                                    <Grid item>{ratingBox}</Grid>
                                    <Grid item>{review.text}</Grid>
                                </Grid>
                            </Grid>
                            <Grid item>{updatedAtText}</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Review;
