import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    baseSalary: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    incentive: {
      amount: { type: Number, default: 0 },
      reason: { type: String },
    },
    totalSalary: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    paidDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const SalaryModel = mongoose.model("Salary", salarySchema);

export default SalaryModel;
