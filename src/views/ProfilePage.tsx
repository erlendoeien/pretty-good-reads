import { Box } from '@material-ui/core';
// eslint-disable-next-line
import React from 'react';
import { Redirect } from 'react-router-dom';
import Review, { IReview } from '../components/Review';
import { useMyProfileQuery } from '../generated/graphql';

const ProfilePage: React.FC = () => {
    // const classes = useStyles();
    const { data, loading } = useMyProfileQuery();

    if (loading) {
        return <Box>Loading...</Box>;
    }

    if (data?.me == null) {
        // Not logged in
        return <Redirect exact to="/" />;
    }

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
                reviewItem={review.reviewItem}
            />
        );
    };

    /**
     * Render all your reviews
     */
    const renderYourReviews = () => {
        const yourReviews = data.me?.reviews;

        return (
            <Box>
                <h1>Your reviews</h1>
                {yourReviews?.length
                    ? yourReviews?.map((review) => renderReview(review))
                    : `You don't have any reviews yet`}
            </Box>
        );
    };

    return <Box>{renderYourReviews()}</Box>;
};

export default ProfilePage;
