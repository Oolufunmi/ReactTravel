import axios from 'axios';

export const getWeatherData = async(lat,lon) =>{
  try{
    const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/find',
    {
      params: {
        lon:lon,
        lat: lat,
      },
      headers: {
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_WEATHERDATA_API_KEY
      }
    }
    );
    return data;
  }
  catch(err){
    console.log(err);
  }
}


export const getPlacesData = async (Ltype,sw,ne) => {

    try{
      
      Ltype =  (Ltype)?"restaurants":Ltype.toLowerCase();
        const {data:{data}}  = await axios.get(`https://travel-advisor.p.rapidapi.com/${Ltype}/list-in-boundary`, {
          params: {
            bl_latitude:sw.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            tr_latitude: ne.lat,
            limit: '30',
            currency: 'USD',
            subcategory: 'hotel,bb,specialty',
            adults: '1'
          },
          headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key':  process.env.REACT_APP_PLACES_API_KEY
          }
       /* headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': '7d7cf387c9msh19c240cee408258p139e70jsn266c1c1b9950'
          }*/
           /* headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': '564c9caec5msh9878d4f0f104782p1d4e1bjsne2885d488620'
          }*/
        });
        return data;
    }
    catch(error){
        console.log(error);
    }

}