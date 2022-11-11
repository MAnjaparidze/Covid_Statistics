import { Country } from "../models/country";
import axios from "axios";
import { Statistic } from "../models/statistic";

interface ICountryData {
  code: string,
  name: {
    en: string,
    ka: string
  }
}

async function populateDB() {
  let result = await Country.find();

  if (result.length === 0) {
    let dataset = await getCountries();

    try {
      await Country.insertMany(dataset).then(async () => {
        let statistics = await getStatistics();
        await Statistic.insertMany(statistics);
      });
    } catch (err) {
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

async function getStatistics() {
  let countries = await Country.find();

  let result = await Promise.allSettled(
    countries.map(async (country: ICountryData) =>
      await axios.post(
        "https://devtest.ge/get-country-statistics",
        { code: country.code }
      )
        .then(res => res.data)
    )
  )

  let returnData = result.map(stat => stat.status === 'fulfilled' && stat.value);
  return returnData;
}

async function updateStatistics() {
  let newStatistics = await getStatistics();

  await Statistic.deleteMany({})
  await Statistic.insertMany(newStatistics)
}

export {
  populateDB,
  getCountries,
  getStatistics,
  updateStatistics
}