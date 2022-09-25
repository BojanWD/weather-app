import { useEffect, useState } from "react";
import useUpdateEffect from "./customHooks/useUpdateEffect";
import cityData from "./data/cityData";
// components
import Loading from "./components/Loading";
import Search from "./components/Search";
import CurrentTempAndLocation from "./components/CurrentTempAndLocation";
import TempLineGraph from "./components/TempLineGraph";
import DailyForecast from "./components/DailyForecast";

function App() {
  const [weatherData, setWeatherData] = useState([]); // presented weather data
  const [allWeatherData, setAllWeatherData] = useState({}); // all weather data pulled through an API
  const [lineGraphData, setLineGraphData] = useState([]);
  const [currentCity, setCurrentCity] = useState(cityData[1717]); //1717 ns 509 bg

  const [weekIconData, setWeekIconData] = useState([]);
  const [cOrF, setCOrF] = useState("c"); // Celsius or Fahrenheit
  const [index, setIndex] = useState(0); // Index denoting day of the week - 0 is today
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, [currentCity]);

  useUpdateEffect(() => {
    if (allWeatherData.current === undefined) {
      return;
    }
    presentedWeatherData(index);
  }, [cOrF, allWeatherData]);

  const kelvinToCorF = (temp) => {
    let res;
    if (cOrF === "f") {
      res = (temp - 273.15) * 1.8 + 32;
    }
    if (cOrF === "c") {
      res = temp - 273.15;
    }

    return res;
  };

  const fetchWeatherData = async () => {
    const apiKey = "ab1658aef0966b814887e72544046e26";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCity.lat}&lon=${currentCity.lng}&appid=${apiKey}`;
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      // Initial setting for the weather data
      setWeatherData({
        currentTemp: kelvinToCorF(data.current.temp),
        feelsLike: kelvinToCorF(data.current.feels_like),
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        time: data.current.dt,
        description: data.current.weather[0].description,
        main: data.current.weather[0].main,
        precipitation: data.hourly[0].pop,
      });
      setWeekIconData([]); //we need this because multiple api calls repeat same days in the array
      for (const x of data.daily) {
        setWeekIconData((weekIconData) => {
          return [
            ...weekIconData,
            {
              dt: kelvinToCorF(x.dt),
              min: kelvinToCorF(x.temp.min),
              max: kelvinToCorF(x.temp.max),
              main: x.weather[0].main,
            },
          ];
        });
      }

      setLineGraphData([
        kelvinToCorF(data.daily[0].temp.morn * 0.99),
        kelvinToCorF(data.daily[0].temp.morn),
        kelvinToCorF(data.daily[0].temp.day),
        kelvinToCorF(data.daily[0].temp.eve),
        kelvinToCorF(data.daily[0].temp.night),
        kelvinToCorF(data.daily[0].temp.night * 0.99),
      ]);

      setAllWeatherData(data);
      setIndex(0);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const presentedWeatherData = (index) => {
    setWeekIconData([]); //we need this because multiple api calls repeat same days in the array
    for (const x of allWeatherData.daily) {
      setWeekIconData((weekIconData) => {
        return [
          ...weekIconData,
          {
            dt: kelvinToCorF(x.dt),
            min: kelvinToCorF(x.temp.min),
            max: kelvinToCorF(x.temp.max),
            main: x.weather[0].main,
          },
        ];
      });
    }
    if (index === 0) {
      // For today we use different object to set state than for other days of the week for which we use forecast (future) data
      setWeatherData({
        currentTemp: kelvinToCorF(allWeatherData.current.temp),
        feelsLike: kelvinToCorF(allWeatherData.current.feels_like),
        humidity: allWeatherData.current.humidity,
        windSpeed: allWeatherData.current.wind_speed,
        time: allWeatherData.current.dt,
        description: allWeatherData.current.weather[0].description,
        main: allWeatherData.current.weather[0].main,
        precipitation: allWeatherData.hourly[0].pop,
      });
      setLineGraphData([
        kelvinToCorF(allWeatherData.daily[0].temp.morn * 0.99),
        kelvinToCorF(allWeatherData.daily[0].temp.morn),
        kelvinToCorF(allWeatherData.daily[0].temp.day),
        kelvinToCorF(allWeatherData.daily[0].temp.eve),
        kelvinToCorF(allWeatherData.daily[0].temp.night),
        kelvinToCorF(allWeatherData.daily[0].temp.night * 0.99),
      ]);
      return;
    }
    setWeatherData({
      currentTemp: kelvinToCorF(allWeatherData.daily[index].temp.day),
      feelsLike: kelvinToCorF(allWeatherData.daily[index].feels_like.day),
      humidity: allWeatherData.daily[index].humidity,
      windSpeed: allWeatherData.daily[index].wind_speed,
      time: allWeatherData.daily[index].dt,
      description: allWeatherData.daily[index].weather[0].description,
      main: allWeatherData.daily[index].weather[0].main,
      precipitation: allWeatherData.daily[index].pop,
    });
    setLineGraphData([
      kelvinToCorF(allWeatherData.daily[index].temp.morn * 0.99),
      kelvinToCorF(allWeatherData.daily[index].temp.morn),
      kelvinToCorF(allWeatherData.daily[index].temp.day),
      kelvinToCorF(allWeatherData.daily[index].temp.eve),
      kelvinToCorF(allWeatherData.daily[index].temp.night),
      kelvinToCorF(allWeatherData.daily[index].temp.night * 0.99),
    ]);
  };

  const changeLocation = (index) => {
    setCurrentCity(cityData[index]);
  };

  const changeTemperatureUnit = (tempUnit) => {
    setCOrF(tempUnit);
  };

  const changeDay = (dayIndex) => {
    setIndex(dayIndex);
  };

  return (
    <main>
      <Search changeCity={changeLocation} />
      {loading && <Loading />}
      {!loading && (
        <>
          <CurrentTempAndLocation
            currentCity={currentCity}
            cOrF={cOrF}
            weatherData={weatherData}
            switchCF={changeTemperatureUnit}
          />
          <TempLineGraph lineGraphData={lineGraphData} />
          <DailyForecast
            changeDay={changeDay}
            index={index}
            weekIconData={weekIconData}
            presentedWeatherData={presentedWeatherData}
          />
        </>
      )}
    </main>
  );
}

export default App;
