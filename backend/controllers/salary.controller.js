// controllers/salary.controller.js
import SalaryModel from "../models/salary.model.js";
import UserModel from "../models/user.model.js";

// ✅ Create salary (Admin only, for Employees only)
export const createSalary = async (req, res) => {
  try {
    // Only Admin can create salary
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only admin can create salary" });
    }

    const { employee, baseSalary, month, year, incentive } = req.body;

    // ✅ Check employee exists
    const user = await UserModel.findById(employee);
    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // ✅ Ensure salary is only created for role = Employee
    if (user.role !== "Employee") {
      return res.status(400).json({ message: "Only employees can have salary records" });
    }

    // ✅ Prevent duplicate salary for same month/year
    const existing = await SalaryModel.findOne({ employee, month, year });
    if (existing) {
      return res.status(400).json({ message: "Salary already generated for this month" });
    }

    // ✅ Calculate total salary
    const incentiveAmount = incentive?.amount || 0;
    const totalSalary = baseSalary + incentiveAmount;

    const salary = new SalaryModel({
      employee,
      baseSalary,
      month,
      year,
      incentive,
      totalSalary,
    });

    await salary.save();

    // ✅ Save salary reference inside user (if you maintain array in user model)
    if (!user.salaries) user.salaries = [];
    user.salaries.push(salary._id);
    await user.save();

    res.status(201).json({
      message: "Salary record created successfully",
      salary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating salary", error: error.message });
  }
};


// ✅ Get all salaries (Admin only)
export const getAllSalaries = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only admin can view all salaries" });
    }

    const salaries = await SalaryModel.find()
      .populate("employee", "name email userid role")
      .sort({ createdAt: -1 });

    res.json(salaries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching salaries", error: error.message });
  }
};

// ✅ Get salary by employee (Any logged-in employee can view their own, admin can view anyone's)
export const getSalaryByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // employee can only view their own salary
    if (req.user.role !== "Admin" && req.user._id.toString() !== employeeId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const salaries = await SalaryModel.find({ employee: employeeId })
      .populate("employee", "name email userid role")
      .sort({ createdAt: -1 });

    res.json(salaries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee salary", error: error.message });
  }
};

// ✅ update salary (Admin only)
export const updateSalary = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only admin can update salary" });
    }

    const { id } = req.params; 
  
    const { baseSalary, incentive } = req.body;

    const salary = await SalaryModel.findById(id);
    if (!salary) {
      return res.status(404).json({ message: "Salary not found" });
    }

    // ✅ Allow editing before marking Paid
    if (baseSalary !== undefined) {
      salary.baseSalary = baseSalary;
    }
    if (incentive !== undefined) {
      salary.incentive = incentive;
    }

    // ✅ Recalculate total salary
    salary.totalSalary = salary.baseSalary + (salary.incentive?.amount || 0);

    // ✅ If already Paid, block duplicate marking
    if (salary.status === "Paid") {
      return res.status(400).json({ message: "Salary is already marked as Paid" });
    }

    // ✅ Update status → Paid & set paidDate
    salary.status = "Paid";
    salary.paidDate = Date.now();

    await salary.save();

    res.json({
      message: "Salary updated and marked as Paid successfully",
      salary,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error marking salary as Paid",
      error: error.message,
    });
  }
};


