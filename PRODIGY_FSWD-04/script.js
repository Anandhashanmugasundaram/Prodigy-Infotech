let tempVal= document.querySelector(".temperature");
let cityVal=document.querySelector(".city");
let humidityVal=   document.querySelector(".humiditypercent")
let windVal= document.querySelector(".windspeed")
let btn= document.querySelector(".searchbtn")
let citiesVal=document.getElementById("cities")
let weatherImg=document.querySelector('.weathericon')

const apiKey='1e80e3e49eb5a3da80593b0fece51d3d';
const apiUrl='https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

function weather(city){
    fetch(apiUrl + city + `&appid=${apiKey}`)
    .then(res=>res.json())
    .then(data => {
      
        
        

        
       tempVal.innerHTML=Math.round(data.main.temp) + ' °C';
        cityVal.innerHTML=data.name;
     humidityVal.innerHTML=data.main.humidity + ' %';
       windVal.innerHTML=data.wind.speed + ' km/h';

      // if(data.weather[0].main == 'Clouds'){
      //   weatherImg.src='./images/cloud.png';
      // }
      // else if(data.weather[0].main == 'Mist'){
      //   weatherImg.src='./images/mist.png'
      // }
      // else if(data.weather[0].main == 'Rain'){
      //   weatherImg.src='./images/rain.png'
      // }
      // else if(data.weather[0].main == 'Snow'){
      //   weatherImg.src='./images/snow.png'
      // }
      // else if(data.weather[0].main == 'Drizzle'){
      //   weatherImg.src='./images/drizzle.png'
      // }
      // else{
      //       weatherImg.src='./images/wind.png'
      // }

      if (data.weather[0].main == 'Clouds') {
        weatherImg.src = './weather-app-img/images/clouds.png';
    } else if (data.weather[0].main == 'Mist') {
        weatherImg.src = './weather-app-img/images/mist.png';
    } else if (data.weather[0].main == 'Rain') {
        weatherImg.src = './weather-app-img/images/rain.png';
    } else if (data.weather[0].main == 'Snow') {
        weatherImg.src = './weather-app-img/images/snow.png';
    } else if (data.weather[0].main == 'Drizzle') {
        weatherImg.src = './weather-app-img/images/drizzle.png';
    } else {
        weatherImg.src = './weather-app-img/images/wind.png';
    }
})
       
      


    // const{temp,humidity}=data.main;
        // tempValue.innerHTML=`${temp} °C`

        // console.log(temp);
        // console.log(humidity);
      
   
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });

    
}

btn.addEventListener('click',() =>{
    const city=citiesVal.value;
    weather(city);  
})



