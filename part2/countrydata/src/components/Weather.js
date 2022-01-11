import React from "react";

const Weather = ({country, weather}) => {
    if (Object.values(weather).length === 0) {
        return (
            <div>
                <h3>Waiting for data...</h3>
            </div>
        )
    }

    return(
        <div>
            <h2>{`Weather in ${country.capital[0]}`}</h2>
            <div>Temperature: {weather.main.temp} &deg;C</div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="current weather" />
            <div>Conditions: {weather.weather[0].description}</div>
        </div>
    )
}

export default Weather