import { makeStyles } from '@material-ui/core/styles';
import placeholder from '../images/placeholder.png';
// eslint-disable-next-line
import React, { useState } from 'react';

type IProps = {
    coverImg: string;
    title: string;
};

const useStyles = makeStyles({
    wrapper: {
        boxShadow:
            '0 2.8px 2.2px rgba(0, 0, 0, 0.02),' +
            '0 6.7px 5.3px rgba(0, 0, 0, 0.028),' +
            '0 12.5px 10px rgba(0, 0, 0, 0.035),' +
            '0 22.3px 17.9px rgba(0, 0, 0, 0.042),' +
            '0 41.8px 33.4px rgba(0, 0, 0, 0.05),' +
            '0 100px 80px rgba(0, 0, 0, 0.07)',
        width: '170px',
        '&:hover': {
            opacity: '0.5'
        }
    },
    coverImg: {
        width: '170px'
    },
    title: {
        fontSize: '1em',
        width: '150px',
        padding: '10px',
        margin: '0px'
    },
    displayImg: {
        display: 'none'
    }
});

/**
 * Book thumbnail with title, 2 images because bad practice with
 * switching src of img, ref: https://stackoverflow.com/a/57749325
 */
const BookItem: React.FC<IProps> = ({ coverImg, title }) => {
    const classes = useStyles();
    const [isLoaded, setIsLoaded] = useState(false);

    const displayImage = (_: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setIsLoaded(true);
    };

    return (
        <div className={classes.wrapper}>
            <img
                className={`${classes.coverImg} ${isLoaded ? classes.displayImg : ''}`}
                src={placeholder}
                alt="Book Cover placeholder"
            />
            <img
                className={classes.coverImg}
                onLoad={displayImage}
                src={coverImg}
                alt="Book Cover"
            />
            <h3 className={classes.title}> {title}</h3>
        </div>
    );
};

export default BookItem;
