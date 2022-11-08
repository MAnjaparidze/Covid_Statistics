import mongoose from "mongoose";
const { Schema } = mongoose;
const statisticSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Number,
    required: true
  },
  recovered: {
    type: Number,
    required: true
  },
  critical: {
    type: Number,
    required: true
  },
  death: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  updated_at: {
    type: Date,
    required: true
  }
}, { _id: false });

const Statistic = mongoose.model("Countries", statisticSchema);

export {
  Statistic
}