import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // role name
  value: { type: Number, default: 0 } // counter
});

const Counter = mongoose.model("Counter", counterSchema);
export default  Counter;
