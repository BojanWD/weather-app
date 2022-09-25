const unixToDay = (time) => {
  const miliseconds = time * 1000;
  const dateObject = new Date(miliseconds);
  return dateObject.toLocaleString("en-US", { weekday: "long" });
};

const mSToKmh = (meters_per_second) => {
  return Math.round(meters_per_second * 3.6);
};

export { unixToDay, mSToKmh };
