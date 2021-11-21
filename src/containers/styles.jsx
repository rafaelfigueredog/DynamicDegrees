import makeStyles  from '@material-ui/styles/makeStyles';

export const useStyles = makeStyles((theme) => {
    return ({

        root: {
            marginTop: theme.spacing(15), 
            display: 'flex',
            justifyContent: 'flex-start', 
            alignItems: 'flex-start', 
            flexDirection: 'row',   
            marginLeft: 'auto',
            marginRight: 'auto' 
        },

        titleColumn: {
            width: 140, 
            height: 30 , 
            margin: 4, 
            display: "flex",
            justifyContent: "center",
            alignItems: 'center',
            flexDirection: "column", 
        }, 

        period: {
            width: 130, 
            height: 30, 
            margin: 4, 
        }
    });
})


export default useStyles; 