import React, { useState } from "react";
import cityData from "../data/cityData";
import styles from "../css/search.module.css";

export default function Search({ changeCity }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = cityData.filter((value) => {
      return (
        value.city.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.country.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSearch = (element) => {
    setFilteredData([]);
    setWordEntered("");
    let index = cityData.indexOf(element);
    changeCity(index);
  };

  return (
    <section>
      <div className={styles.search}>
        <div className={styles.searchInputs}>
          <input
            type="text"
            placeholder="Search by location"
            value={wordEntered}
            onChange={handleFilter}
          />
        </div>
        {filteredData.length !== 0 && (
          <div className={styles.dataResults}>
            {filteredData.slice(0, 15).map((value, index) => {
              return (
                <div
                  className={styles.srcItem}
                  key={index}
                  onClick={() => handleSearch(filteredData[index])}
                >
                  {`${value.city}, ${value.country}`}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
