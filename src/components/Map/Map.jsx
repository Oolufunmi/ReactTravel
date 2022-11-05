import react,{useRef,useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper,Typography,useMediaQuery} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import mapStyles from '../../mapStyles';


const Map = ({setCoordinates,setBounds,coordinates,places,setClicked,weatherData})=>{
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

  

    return <div className={classes.mapContainer}>
        <GoogleMapReact
         bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChildClick={(child)=>setClicked(child)}
        onChange={(e)=>{
            setCoordinates({lat:e.center.lat,lng:e.center.lng});
            setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw});
        }}
        >
            {
                places?.map((place,index)=>(
                    <div className={classes.mapContainer}
                    lat={place.latitude} 
                    lng={place.longitude}
                    key={index}
                    >
                        {
                            !isDesktop?(
                                <LocationOnIcon  onClick={setClicked(index)} color="primary" fontSize="large"/>
                            ):(
                                <Paper  onClick={setClicked(index)}  elevation={3} className={classes.paper}>
                                    <Typography className={classes.pointer} variant="subtitle">
                                        {place.name}
                                    </Typography>
                                    <img className={classes.pointer}
                                   src={place.photo?place.photo.images.large.url:'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                   alt={place.name}
                                   />
                                   <Rating size="small" value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>
                ))
            }
            
            {
               
                weatherData?.list?.map((data,index)=>(
                 
                    <div lat={data.coord.lat} lng={data.coord.lon} key={index}>
                        <img alt="djdjdj" src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px"/>
                    </div>
                ))
            }
        </GoogleMapReact>
    </div>
}


export default Map;