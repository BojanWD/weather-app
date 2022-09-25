import React from "react";
import icons from "../data/icons";
import { unixToDay } from "../helpFunctions/helpFunctions";
import style from "../css/dailyForecast.module.css";

function SingleDay({ dayData }) {
  const { dt, min, max, main } = dayData;
  return (
    <div className={style.daily}>
      <p className={style.shortDayName}>{unixToDay(dt).substring(0, 3)}</p>
      <div className="weatherIcon-small">
        <div className={icons[main]}>
          <div className="inner"></div>
        </div>
      </div>

      <div className={style.maxAndMin}>
        <p className={style.max}>{`${max.toFixed(0)}\u00b0 `}</p>
        <p className={style.min}>{` ${min.toFixed(0)}\u00b0 `}</p>
      </div>
    </div>
  );
}

export default SingleDay;
