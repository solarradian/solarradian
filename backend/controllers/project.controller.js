import UserModel from "../models/user.model.js";
import ProjectModel from "../models/project.model.js";
import InverterModel from "../models/inverter.model.js"; // Fixed typo
import PanelModel from "../models/panel.model.js";
import { generateProjectId } from "../middleware/projectIdGeneration.js";
import AddressModel from './../models/address.model.js';

// 📌 Create Project (with inverter & panels) - Admin only
export const createProject = async (req, res) => {
  try {
    // 0️⃣ Check if user is admin
    const requestingUser = req.user;
    if (!requestingUser || requestingUser.role !== "Admin") {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied. Only administrators can create projects." 
      });
    }

    const {
      customer,
      businessHead, 
      projectHead,
      projectType,
      capacityKW,
      location,
      startDate,
      endDate,
      inverterData,
      panelsData
    } = req.body;


    // 1️⃣ Validate customer role
    const customerUser = await UserModel.findById(customer);
    if (!customerUser || customerUser.role !== "Customer") { 
      return res.status(400).json({ 
        success: false,
        message: "Invalid Customer ID or role" 
      });
    }

    // 2️⃣ Validate Business Head & Project Head
    const businessHeadUsers = await UserModel.find({
      _id: { $in: businessHead },
      role: "Employee",
    });
    
    const projectHeadUsers = await UserModel.find({
      _id: { $in: projectHead },
      role: "Employee",
    });

    if (businessHeadUsers.length !== businessHead.length) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid BusinessHead IDs or roles" 
      });
    }
    
    if (projectHeadUsers.length !== projectHead.length) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid ProjectHead IDs or roles" 
      });
    }
    const addressExists = await AddressModel.findById(location);
    if (!addressExists) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid Address ID" 
      });
    };

    // 3️⃣ Validate inverter data
    let inverter = null;
    if (inverterData) {
      try {
        inverter = new InverterModel(inverterData);
        await inverter.save();
      } catch (inverterError) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid inverter data", 
          error: inverterError.message 
        });
      }
    } else {
      return res.status(400).json({ 
        success: false,
        message: "Inverter data is required" 
      });
    }

    // 4️⃣ Validate and create panels
    let createdPanels = [];
    if (panelsData && panelsData.length > 0) {
      try {
        createdPanels = await PanelModel.insertMany(panelsData);
      } catch (panelError) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid panel data", 
          error: panelError.message 
        });
      }
    } else {
      return res.status(400).json({ 
        success: false,
        message: "At least one panel is required" 
      });
    }

    // 5️⃣ Generate unique project ID
    const projectuniqueId = await generateProjectId();

    // 6️⃣ Prepare project panels array (just IDs)
    const panelIds = createdPanels.map(p => p._id);

    // 7️⃣ Create Project
    const newProject = new ProjectModel({
      projectuniqueId,
      customer,
      businessHead,
      projectHead,
      projectType,
      capacityKW,
      location :addressExists ,
      startDate,
      endDate,
      inverter: inverter._id,
      panels: panelIds, 
    });

    await newProject.save();

    // ✅ Populate the response with details
    const populatedProject = await ProjectModel.findById(newProject._id)
      .populate("customer", "name email mobile uniqueId")
      .populate("businessHead", "name email mobile uniqueId")
      .populate("projectHead", "name email mobile uniqueId")
      .populate("inverter")
      .populate("location")
      .populate("panels"); // Simple populate for array of panel IDs
      

    // ✅ Final Response
    res.status(201).json({
      success: true,
      message: "Project created successfully with inverter and panels",
      project: populatedProject,
    });

  } catch (error) {
    console.error("❌ Error creating project:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

// 📌 Get Projects by Role
export const getAllProjects = async (req, res) => {
  try {
    const user = req.user; // ✅ from auth middleware

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No user found",
      });
    }

    let query = {};

    // 🔐 Role-based access control
    if (user.role === "Admin") {
      query = {}; // Admin can fetch all projects
    } else if (user.role === "Employee") {
      // Employee can see projects where they are either businessHead OR projectHead
      query = {
        $or: [
          { businessHead: user._id },
          { projectHead: user._id }
        ]
      };
    } else if (user.role === "Customer") {
      query = { customer: user._id };
    } else {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Role not allowed",
      });
    }

    const projects = await ProjectModel.find(query)
      .populate("customer", "name email mobile  uniqueId")
      .populate("businessHead", "name email mobile  uniqueId")
      .populate("projectHead", "name email mobile  uniqueId")
      .populate("panels") // ✅ Simple population for array of panel IDs
      .populate("inverter");

    return res.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  };
};

// 📌 Update Project
// 📌 Update Project (from body)
export const updateProject = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Project ID is required" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, project: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// 📌 Delete Project
export const deleteProject = async (req, res) => {
  try {
    const project = await ProjectModel.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


