import React,{useState,createRef,useEffect} from 'react';
import {CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,SelectElement, Select} from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';


const List = ({type,setType,rating,setRating,LoadAPII,places,clicked,isLoading})=>{
  const classes = useStyles();
    
    
    const [elRefs,setElRefs] = useState([]);
   
   console.log({clicked})


    useEffect(()=>{
          setElRefs(refs => Array(places?.length).fill().map((_,i)=>refs[i]||createRef()));
    },[places]);

    useEffect(()=>{
        LoadAPII(type);
    },[type]);



    return <div className={classes.container}>
        <Typography variant="h4">
            {isLoading?(
                <div className={classes.loading}><CircularProgress size="5rem"/></div>
            ):(
            <>
            Restaurants,Hotels & Attractions around you
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e)=>setType(e.target.value)}>
                    <MenuItem value="Restaurants">Restaurants</MenuItem>
                    <MenuItem value="Hotels">Hotels</MenuItem>
                    <MenuItem value="Attractions">Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
                    <MenuItem value="0">All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place,index)=>(
                    <Grid ref={elRefs[index]}  item key={index} xs={12} >
                            <PlaceDetails 
                            refProp={elRefs[index]}
                            selected={Number(clicked)===index}  
                            place={place} />
                    </Grid>
                ))}
            </Grid>
            </>
            )};
        </Typography>
    </div>
}


export default List;