const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode("London", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});

forecast(51.5528, 0.1128, (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});
