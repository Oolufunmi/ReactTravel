import react,{useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import {AppBar,Toolbar,Typography,InputBase,Box} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';

const Header = ({type,setCoordinates,LoadAPI,setrefresh,refresh})=>{
const classes = useStyles();
const [autocomplete, setAutocomplete] = useState(null)
const onLoad = (autoC)=> setAutocomplete(autoC);

const onPlaceChange = ()=>{
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({lat:lat,lng:lng});
  
}
    
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className="classes.title">
                    Travel Advisor
                </Typography>
                <Box display="flex">
                <Typography variant="h6" className="classes.title">
                    Explore new places
                </Typography>
                <button onClick={LoadAPI}>Load</button>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChange}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>  
                        <InputBase placeholder="Search..." classes={{root:classes.inputRoot,input:classes.inputInput}}/>
                    </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    )
}


export default Header;