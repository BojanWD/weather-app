import React from "react";
import SingleDay from "./SingleDay";
import style from "../css/dailyForecast.module.css";

export default function DailyForecast({
  changeDay,
  index,
  weekIconData,
  presentedWeatherData,
}) {
  return (
    <section className={style.dailyForecast}>
      {weekIconData.map((day, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              changeDay(i);
              presentedWeatherData(i);
            }}
            className={`${style.addMargin} ${
              index === i ? `${style.dailyFocus}` : null
            } ${i > 4 ? `${style.small}` : null}`}
          >
            <SingleDay dayData={day} />
          </div>
        );
      })}
    </section>
  );
}
