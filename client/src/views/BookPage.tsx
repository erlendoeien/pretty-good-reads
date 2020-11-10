import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link, useParams } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import CreateUpdateReview from '../components/CreateUpdateReview';
import Review, { IReview } from '../components/Review';
import SimpleModal from '../components/SimpleModal';
import { useBookQuery, useMeQuery, useYourReviewQuery } from '../generated/graphql';
// eslint-disable-next-line
import React, { useState } from 'react';
import placeholder from '../images/placeholder.png';
import StyledSpinner from '../components/StyledSpinner';

interface ParamTypes {
    id: string;
}

const useStyles = makeStyles({
    root: {
        padding: '20px',
        marginTop: '5vh'
    },
    coverImg: {
        height: '50vh',
        width: '35vh'
    },
    info: {
        textAlign: 'left'
    },
    h4: {
        fontSize: '0.8em'
    },
    h5: {
        display: 'inline',
        margin: '0px'
    },
    link: {
        textDecoration: 'none',
        color: 'rgba(89,29,169)',
        margin: '10px',
        justifySelf: 'flex-Start'
    },
    displayImg: {
        display: 'none'
    }
});

const BookPage = () => {
    const classes = useStyles();
    const { id } = useParams<ParamTypes>();
    const { data, loading, error } = useBookQuery({
        variables: {
            id: parseInt(id, 10)
        }
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const { data: meData, loading: meLoading } = useMeQuery();
    const { data: yourReviewData, loading: yourReviewLoading } = useYourReviewQuery({
        variables: {
            bookId: parseInt(id, 10)
        }
    });

    if (!loading && !data?.book) return <div>Sorry, we could not display the book right now</div>;

    const displayImage = (_: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setIsLoaded(true);
    };

    if (!loading && !data) {
        return (
            <div>
                <div>Sorry, we could not display this book right now</div>
                <div>{error?.message}</div>
            </div>
        );
    }

    const isLoggedIn = () => {
        return meData?.me != null;
    };

    /**
     * Render book cover image
     */
    const renderBookCover = () => {
        return (
            <Box>
                <img
                    className={`${classes.coverImg} ${isLoaded ? classes.displayImg : ''}`}
                    src={placeholder}
                    alt="Book Cover placeholder"
                />
                <img
                    className={classes.coverImg}
                    onLoad={displayImage}
                    src={data!.book!.bookCoverUrl || placeholder}
                    alt="Book Cover"
                />
            </Box>
        );
    };

    /**
     * Render book info
     */
    const renderBookInfo = () => {
        const book = data?.book;

        const reviewsNum = book?.reviews?.length;
        const authorsString = book?.authors
            .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
            .join(' | ');

        return (
            <Box>
                <h1>{book?.title}</h1>
                <h4 className={classes.h4}>Author: {authorsString}</h4>
                <h4 className={classes.h4}>Publication date: {book?.publicationDate}</h4>
                <h4 className={classes.h4}>{`ISBN: ${book?.isbn} (ISBN13: ${book?.isbn13})`}</h4>
                <h4 className={classes.h4}>
                    Average rating:{' '}
                    <Rating
                        name="rating"
                        value={book?.averageRating}
                        precision={0.5}
                        size="small"
                        readOnly
                    />
                    {book?.averageRating} (
                    {reviewsNum === 1 ? `${reviewsNum} review` : `${reviewsNum} reviews`})
                </h4>
            </Box>
        );
    };

    /**
     * General render review method
     */
    const renderReview = (review: IReview) => {
        return (
            <Review
                key={review.reviewedById}
                rating={review.rating}
                text={review.text}
                updatedAt={review.updatedAt}
                createdAt={review.createdAt}
                reviewedBy={review.reviewedBy}
            />
        );
    };

    /**
     * Render only the users review, including write/edit button
     */
    const renderYourReview = () => {
        if (!isLoggedIn() || meLoading || yourReviewLoading) return null;

        const yourReview = yourReviewData?.book?.yourReview;

        let modalButtonText = 'Write a review';
        if (yourReview != null) {
            modalButtonText = 'Edit your review';
        }

        return (
            <Box>
                <h1>Your review</h1>
                {yourReview != null && renderReview(yourReview)}
                {data?.book?.id != null && (
                    <SimpleModal buttonText={modalButtonText}>
                        <CreateUpdateReview bookId={data.book.id} />
                    </SimpleModal>
                )}
            </Box>
        );
    };

    /**
     * Render reviews, skips own review if exists
     */
    const renderReviews = () => {
        if (meLoading || loading) return null;
        const reviews = data?.book?.reviews.filter(
            (review) => review.reviewedById !== meData?.me?.id
        );
        return reviews?.length
            ? reviews?.map((review) => renderReview(review))
            : `There are no other reviews`;
    };

    return (
        <Container>
            <Link to="/" className={classes.link}>
                <Grid container justify="center" alignItems="center">
                    <Grid item>
                        <ArrowBackIcon fontSize="large" />
                    </Grid>
                    <Grid item>
                        <h5 className={classes.h5}>Back to frontpage</h5>
                    </Grid>
                </Grid>
            </Link>
            {!data && loading ? (
                <StyledSpinner />
            ) : (
                <Grid container className={classes.root}>
                    <Grid item xs={12} lg={4}>
                        {renderBookCover()}
                    </Grid>
                    <Grid item xs={12} lg={8} className={classes.info}>
                        {renderBookInfo()}
                    </Grid>
                    <Container maxWidth="sm">
                        <Grid item xs={12}>
                            {renderYourReview()}
                        </Grid>
                        <Grid item xs={12}>
                            <h1>All reviews</h1>
                            {renderReviews()}
                        </Grid>
                    </Container>
                </Grid>
            )}
        </Container>
    );
};

export default BookPage;
