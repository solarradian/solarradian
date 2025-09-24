import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectuniqueId: { 
    type: String, 
    unique: true,
    required: true
  }, 

  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, 

  businessHead: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" 
  }], 

  projectHead: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],

  // CORRECTED panels structure to match your data format
panels: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Panel'
}],

  inverter: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Inverter",
    required: true
  }, 

  projectType: {
    type: String,
    enum: ["On-Grid", "Off-Grid", "Hybrid"],
    required: true
  },

  capacityKW: { 
    type: Number,
    required: true,
    min: 1
  },   

  location: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Address",
    // type: String,
    // required :true,
  
  },     

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Cancelled"],
    default: "Pending"
  },

  startDate: { type: Date, default: Date.now },

  endDate: { type: Date },
},

{ timestamps: true }

);

const ProjectModel = mongoose.model("Project", projectSchema);
export default ProjectModel;