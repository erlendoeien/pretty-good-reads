// eslint-disable-next-line
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            // width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3)
        },
        button: {
            margin: theme.spacing(1)
        }
    })
);

interface ISimpleModal {
    buttonText: string;
    children: React.ReactElement;
}

const SimpleModal: React.FC<ISimpleModal> = ({ buttonText, children }) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={handleOpen}
            >
                {buttonText}
            </Button>
            <Modal open={open} onClose={handleClose}>
                <div style={modalStyle} className={classes.paper}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    {React.cloneElement(children, { onCloseModal: handleClose })}
                </div>
            </Modal>
        </div>
    );
};

export default SimpleModal;
