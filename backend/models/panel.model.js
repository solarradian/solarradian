import mongoose from "mongoose";

const panelSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  efficiency: {
    type: Number
  },
  warrantyYears: {
    type: Number
  },
  type: {
    type: String,  // ["Monocrystalline", "Polycrystalline", "Thin Film"],
    required: true
  },
  serialNumber: {
    type: String,
    unique: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PanelModel = mongoose.model("Panel", panelSchema);
export default PanelModel;