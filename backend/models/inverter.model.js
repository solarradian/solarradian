import mongoose from "mongoose";

const inverterSchema = new mongoose.Schema({
  brand: {
    type: String,  // ["SMA", "ABB", "Luminous", "Hitachi", "Delta"],
    required: true
  },
  model: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  capacity: { 
    type: Number, 
    required: true
  }, 
  technologyType: {
    type: String, //["String", "Central", "Microinverter"],
    required: true
  },
  gridType: {
    type: String,  // ["On-Grid", "Off-Grid", "Hybrid"],
    required: true
  },
  warrantyYears: {
    type: Number
  },
  createdAt: { type: Date, default: Date.now }
});

const InverterModel = mongoose.model("Inverter", inverterSchema);
export default InverterModel;