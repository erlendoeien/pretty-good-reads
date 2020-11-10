import { makeStyles, Theme, Button } from '@material-ui/core';
// eslint-disable-next-line
import React from 'react';
import { FC } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    resetButton: {
        margin: theme.spacing(1, 0, 1)
    }
}));

interface ResetButtonProps {
    onClick: () => void;
}

const ResetButton: FC<ResetButtonProps> = (props) => {
    const classes = useStyles();
    return (
        <Button variant="outlined" className={classes.resetButton} onClick={props.onClick}>
            Reset
        </Button>
    );
};

export default ResetButton;
