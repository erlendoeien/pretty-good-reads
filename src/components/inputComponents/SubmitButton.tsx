import { makeStyles, Button } from '@material-ui/core';
// eslint-disable-next-line
import React, { FC } from 'react';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3, 1, 2)
    }
}));

interface SubmitButtonProps {
    disabled: boolean;
    submitText: string;
}

const SubmitButton: FC<SubmitButtonProps> = (props) => {
    const classes = useStyles();
    return (
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={props.disabled} // Disable button if rating is not set
        >
            {props.submitText}
        </Button>
    );
};

export default SubmitButton;
