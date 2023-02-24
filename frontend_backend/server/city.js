const { City } = require("country-state-city");

const Country = require("country-state-city").Country;

const State = require("country-state-city").State;

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017", function (err, db) {
  if (err) throw err;
  var dbo = db.db("newcard");
  const countriesbulk = dbo.collection("countries").initializeOrderedBulkOp();
  var countries = Country.getAllCountries();
  countries.forEach((country) => {
    countriesbulk.insert({ name: country.name, code: country.isoCode });
  });
  countriesbulk.execute();
  console.log("counties inserted");

  const statesbulk = dbo.collection("states").initializeOrderedBulkOp();
  var states = State.getAllStates();
  states.forEach((state) => {
    statesbulk.insert({ name: state.name, code: state.countryCode });
  });
  statesbulk.execute();
  console.log("states inserted");

  const citybulk = dbo.collection("cities").initializeOrderedBulkOp();
  var cities = City.getAllCities();
  cities.forEach((city) => {
    citybulk.insert({ name: city.name, code: city.stateCode });
  });
  cities.execute();
  console.log("cities inserted");
});
