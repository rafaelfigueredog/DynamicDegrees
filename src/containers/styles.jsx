import makeStyles from '@material-ui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    resetButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing(2), // Espaço abaixo do botão
        marginTop: theme.spacing(0), // Espaço acima do botão
        width: '100%', // Garante que o botão fique centralizado na largura total
    },

    titleColumn: {
        width: 140,
        height: 30,
        margin: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    period: {
        width: 130,
        height: 30,
        margin: 4,
    },
}));

export default useStyles;