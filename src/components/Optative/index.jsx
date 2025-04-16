import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4, 6),
        width: '60%',
        maxHeight: '80%',
        overflowY: 'auto',
    },
    optativeTitle: {
        textAlign: 'center',
    },
    closeButton: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
    },
    optativeList: {
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(4), // Adiciona espaçamento para a lista
    },
    optativeItem: {
        marginBottom: theme.spacing(1),
        fontSize: '1.1rem', // Aumenta o tamanho da fonte
    },
}));

export default function OptativeModal({ open, handleClose, optatives }) {
    const classes = useStyles();

    // Garante que optatives seja definido e seja um array
    const validOptatives = Array.isArray(optatives) ? optatives : [];

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Paper className={classes.paper}>
                    <Typography className={classes.optativeTitle} variant="h5" gutterBottom>
                        DISCIPLINAS OPTATIVAS POSSÍVEIS 
                    </Typography>
                    <ul className={classes.optativeList}>
                        {validOptatives.length > 0 ? (
                            validOptatives.map((optative, index) => (
                                <li key={index} className={classes.optativeItem}>
                                    {optative.name} - {optative.workload || 'N/A'}h
                                </li>
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                Nenhuma disciplina optativa disponível no momento.
                            </Typography>
                        )}
                    </ul>
                    <div className={classes.closeButton}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Fechar
                        </Button>
                    </div>
                </Paper>
            </Fade>
        </Modal>
    );
}