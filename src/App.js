import React,{useState,useEffect,createRef} from 'react';

import {CssBaseline, Grid} from '@material-ui/core';

import Header from './components/Header/header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData,getWeatherData } from './api';
import { type } from '@testing-library/user-event/dist/type';
const App = ()=>{
    const [places,setPlaces] = useState([]);
    const [refresh, setrefresh] = useState(false)
    const [weatherData,setWeatherData] = useState([]);
    const [coordinates,setCoordinates] = useState({});   
    const [bounds,setBounds] = useState({'sw':{'lat':0,'lng':0},'ne':{'lat':0,'lng':0}});
    const [clicked,setClicked] = useState(null);
    const [rating,setRating] = useState(null);
    const [filteredPlaces,setFilteredPlaces] = useState([]);
    const [type,setType] = useState('restaurants');

    const [isLoading, setisLoading] = useState(false);

   

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
            setCoordinates({lat:latitude,lng:longitude});
        });
    },[]);

    
    useEffect(()=>{
        setisLoading(true);
        getPlacesData(type,bounds.sw,bounds.ne)
        .then((data)=>{
            setisLoading(false);
            setFilteredPlaces([]);
            setPlaces(data);
        });
    },[refresh]);

    useEffect(()=>{
        const filteredPlaces = places.filter((place)=>place.rating>rating);
        setFilteredPlaces(filteredPlaces);
    },[rating]);
   



    const LoadAPI = (()=>{
        setisLoading(true);
        getWeatherData(coordinates.lat,coordinates.lng).then((data)=>{
            setWeatherData(data);
         
        });
        getPlacesData(type,bounds.sw,bounds.ne)
        .then((data)=>{
            setisLoading(false);
            setPlaces(data);
        });
    });

    const LoadAPII = ((Ltype)=>{
        setisLoading(true);
        getWeatherData(coordinates.lat,coordinates.lng).then((data)=>{
            setWeatherData(data);
         
        });
        getPlacesData(Ltype,bounds.sw,bounds.ne)
        .then((data)=>{
            setisLoading(false);
            setFilteredPlaces([]);
            setPlaces(data);
        });
    });

    useEffect(() => {
        LoadAPI();
    }, [bounds,type])
    
    //coordinates,bounds
    return <>
    <CssBaseline/>
    <Header type={type} LoadAPI={LoadAPI} setCoordinates={setCoordinates} setrefresh={setrefresh} refresh={refresh}/>
    <Grid container spacing={3} style={{width:'100%'}}>
        <Grid item xs={12} md={4}>
         <List type={type} setType={setType} rating={rating} setRating={setRating} LoadAPII={LoadAPII} isLoading={isLoading}  clicked={clicked}  places={filteredPlaces.length?filteredPlaces:places} />   
        </Grid>
        <Grid item xs={12} md={8}>
         <Map weatherData={weatherData} setClicked={setClicked} setCoordinates={setCoordinates}
                setBounds = {setBounds}
                coordinates={coordinates}
                places={filteredPlaces.length?filteredPlaces:places}

         />   
        </Grid>
    </Grid>

     </>;
}


export default App; 