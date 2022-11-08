const mongoose = require("mongoose");
const { Schema } = mongoose;

const countrySchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    en: {
      type: String,
      required: true
    },
    ka: {
      type: String,
      required: true
    }
  }
});

const Country = mongoose.model("Countries", countrySchema);

export {
  Country
}