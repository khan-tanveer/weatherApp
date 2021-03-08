import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

const Weather = () => {
  const APIKEY = "1f2fd363ac3d15767f24684e28af7d87";

  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const [weather, setWeather] = useState([]);

  const weatherData = async (e) => {
    e.preventDefault();
    if (form.city === "") {
      alert("Add some value");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({
        data: data,
      });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
    if (name === "country") {
      setForm({ ...form, country: value });
    }

    // setForm({
    //   city: "",
    //   country: "",
    // });

    console.log(form.city, form.country);
  };

  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />

      <form>
        <input
          type="text"
          name="city"
          placeholder="enter city"
          onChange={(e) => handleChange(e)}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          name="country"
          placeholder="enter country"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>

      {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
};

export default Weather;
