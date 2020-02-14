const request = require("request");
const key = require("./config.js");
const dotenv = require("dotenv").config();

const weatherKey = key.SECRET_KEY;
const herokuKey = dotenv.parsed.herokuKey;
const mapKey = dotenv.parsed.mapKey;

const forecastUrl = `https://api.darksky.net/forecast/${weatherKey ||
  herokuKey}/51.5528,0.1128?units=si&exclude=[minutely,flags,hourly]`;
const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/london.json?access_token=${mapKey}&limit=1`;

// request({ url: forecastUrl, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather service");
//   } else if (response.body.error) {
//     console.log("Unable to find location");
//   } else {
//     const weatherBody = response.body;
//     console.log(
//       `${weatherBody.daily.data[0].summary} It is currently ${weatherBody.currently.temperature} degrees out. There is ${weatherBody.currently.precipProbability}% chance of rain.`
//     );
//   }
// });

// request({ url: mapUrl, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather service");
//   } else if (response.body.features.length === 0) {
//     console.log("Unable to find location");
//   } else {
//     const mapBody = response.body;
//     const latitude = mapBody.features[0].center[1];
//     const longitude = mapBody.features[0].center[0];
//     console.log(latitude, longitude);
//   }
// });

const geocode = (address, callback) => {
  const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapKey}&limit=1`;

  request({ url: mapUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find locatiom. Try another search.", undefined);
    }
  });
};

geocode("London", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});
