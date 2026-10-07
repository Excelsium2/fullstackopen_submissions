
const Weather = (props) => {
    if (!props.weather) {
        return null
    }
    return (
      <div>
            <p>Temperature: {props.weather.main.temp} °C</p>
            <img
            src={`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}
            alt={props.weather.weather[0].description}
            />
            <p>Wind: {props.weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather