import { Country } from "../models/country";
import axios from "axios";

async function populateDB() {
  let result = await Country.find();

  if (result.length === 0) {
    let dataset = await getCountries();

    try {
      await Country.insertMany(dataset);
    } catch(err) {
      console.error("Failed DB Population...", err);
    }
  }
}

async function getCountries() {
  return await axios
    .get("https://devtest.ge/countries")
    .then(res => res.data)
    .catch(err => console.error("Something went wrong...", err));
  ;
}

export {
  populateDB,
  getCountries
}