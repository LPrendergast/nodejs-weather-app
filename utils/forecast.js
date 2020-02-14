const request = require("request");
const key = require("../config.js");
const dotenv = require("dotenv").config();

const weatherKey = key.SECRET_KEY;
const herokuKey = dotenv.parsed.herokuKey;

const forecast = (latitude, longitude, callback) => {
  const forecastUrl = `https://api.darksky.net/forecast/${weatherKey ||
    herokuKey}/${latitude},${longitude}?units=si&exclude=[minutely,flags,hourly]`;

  request({ url: forecastUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const weatherBody = response.body;
      callback(undefined, {
        summary: weatherBody.daily.data[0].summary,
        temperature: weatherBody.currently.temperature,
        chanceOfRain: weatherBody.currently.precipProbability
      });
    }
  });
};

module.exports = forecast;
