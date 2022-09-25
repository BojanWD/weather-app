import React from "react";
import icons from "../data/icons";
import styles from "../css/currentTempAndLocation.module.css";
import { unixToDay, mSToKmh } from "../helpFunctions/helpFunctions";

function CurrentTempAndLocation({ weatherData, cOrF, switchCF, currentCity }) {
  const {
    currentTemp,
    feelsLike,
    humidity,
    windSpeed,
    time,
    description,
    precipitation,
  } = weatherData;

  return (
    <section className={styles.tempAndLocation}>
      <div className={styles.curStats}>
        <div className={styles.iconAndTemp}>
          <div className={styles.iconContainer}>
            <div className="weatherIcon">
              <div className={icons[weatherData.main]}>
                <div className="inner"></div>
              </div>
            </div>
          </div>

          <div className={styles.currTemp}>
            <h1>
              {`${currentTemp.toFixed(0)}`}{" "}
              <span
                className={`${styles.pointer} ${
                  cOrF === "f" ? `${styles.passive}` : ""
                }`}
                onClick={() => switchCF("c")}
              >{`\u00b0C`}</span>
              <span className={styles.passive}> | </span>
              <span
                className={`${styles.pointer} ${
                  cOrF === "c" ? `${styles.passive}` : ""
                }`}
                onClick={() => switchCF("f")}
              >{`\u00b0F`}</span>
            </h1>
          </div>
        </div>
        <div className={`${styles.additionalInfo} ${styles.small}`}>
          <p>
            {`Feels like: ${feelsLike.toFixed(0)}`}{" "}
            {cOrF === "c" ? `\u00b0C` : `\u00b0F`}
          </p>
          <p>{`Probability of precipitation: ${(precipitation * 100).toFixed(
            0
          )}%`}</p>
          <p>{`Humidity: ${humidity.toFixed(0)}%`}</p>
          <p>{`Wind speed: ${mSToKmh(windSpeed).toFixed(0)}  km/h`}</p>
        </div>
      </div>
      <div className={styles.location}>
        <h2>{currentCity.city}</h2>
        <p>{unixToDay(time)}</p>
        <p>{description}</p>
      </div>
    </section>
  );
}

export default CurrentTempAndLocation;
