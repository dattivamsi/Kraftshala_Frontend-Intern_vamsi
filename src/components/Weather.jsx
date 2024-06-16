import React, { useEffect, useState } from "react";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";
import search_icon from "../assets/Assets/search.png";
import clear_icon from "../assets/Assets/clear.png";
import cloud_icon from "../assets/Assets/cloud.png";
import drizzle_icon from "../assets/Assets/drizzle.png";
import humidity_icon from "../assets/Assets/humidity.png";
import rain_icon from "../assets/Assets/rain.png";
import snow_icon from "../assets/Assets/snow.png";
import wind_icon from "../assets/Assets/wind.png";
import { API_KEY } from "../apis";
import { CiDark, CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const Weather = () => {
  const [inputData, setInputData] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [darkmode, setDarkMode] = useState(true);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": rain_icon,
    "11n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": snow_icon,
  };

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  function formatDateTime(timestamp,timezoneOffset) {
    
    const utcDate = new Date(timestamp * 1000);

    const localDate = new Date(utcDate.getTime() + timezoneOffset * 1000);

    const formattedDate = localDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    return formattedDate;
  }

  const search = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();
      const icon = allIcons[data?.weather[0]?.icon];
      setWeatherData({
        humidity: data?.main?.humidity,
        windSpeed: data?.wind?.speed,
        temperature: Math.floor(data?.main?.temp) / 10,
        min_temperature: Math.floor(data?.main?.temp_max) / 10,
        max_temperature: Math.floor(data?.main?.temp_min) / 10,
        location: data?.name,
        icon: icon,
        datetime: formatDateTime(data?.dt, data?.timezone),
      });
      setInputData("");
    } catch (error) {
      setWeatherData({
        humidity: "Details Not Found",
        windSpeed: "Details Not Found",
        // temperature: "Details Not Found",
        // location: "Details Not Found",
        icon: "Details Not Found",
        datetime: "Details Not Found",
        inValid: "Enter Correct City"
      });
      // console.log(error)
    }
  };

  useEffect(() => {
    search("hyderabad");
  }, []);

  const darkmodeChanges = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <>
      <div className="weather-container darkmode">
        <div className="dark-button">
          <div
            onClick={() => darkmodeChanges()}
            className={
              darkmode ? "dark-mode-container" : "dark-mode-container dark"
            }
          >
            <button>
              {darkmode ? (
                <MdDarkMode />
              ) : (
                <CiLight style={{ color: "white", fontWeight: "bold" }} />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="weather-container">
        <div className={darkmode ? "weather" : "weather dark"}>
          <label htmlFor="country">Enter Loacation</label>
          <div className="search-bar">
            <input
              type="text"
              id="country"
              placeholder="enter city"
              value={inputData}
              onChange={(e) => handleChange(e)}
            />
            <img src={search_icon} alt="" onClick={() => search(inputData)} />
          </div>
          {weatherData?.inValid && <p className="date-time red">{weatherData?.inValid}</p>}
          <p className="date-time">{weatherData?.datetime}</p>
          <img src={weatherData?.icon} alt="" className="weather-icon" />
          <div className="temperature-container">
            <div>
              <p className="min-temp">Min Temp</p>
          <p className="tempretarure">{weatherData?.min_temperature ? weatherData?.min_temperature : "-"} °C</p>
            </div>
            <div>
            <p className="min-temp">Avg Temp</p>
          <p className="tempretarure">{weatherData?.temperature ? weatherData?.temperature : "-"} °C</p>
            </div>
            <div>
            <p className="min-temp">Max Temp</p>
          <p className="tempretarure">{weatherData?.max_temperature ? weatherData?.max_temperature : "-"} °C</p>
            </div>

          </div>
          <p className="weather-location">{weatherData?.location ? weatherData?.location :"-"}</p>
          <div className="weather-Data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData?.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData?.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <div>
          <p>TuesDay, 18 Jun 2024 | Local Time 07:21</p>
        </div>
        <div>
          <p>Berlin</p>
        </div>
      </div> */}
    </>
  );
};

export default Weather;
