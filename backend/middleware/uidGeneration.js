// middleware/uidGeneration.js
import Counter from "../models/Counter.js";

export const uidGeneration = async (user) => {
  let prefix;
  if (user.role === "Admin") prefix = "SRA00";
  else if (user.role === "Employee") prefix = "SRE00";
  else prefix = "SRC00";

  // Increase counter for that role
  const counter = await Counter.findOneAndUpdate(
    { key: user.role },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  // Concatenate directly: SRE00 + counter
  user.uniqueId = `${prefix}${counter.value}`;

  await user.save();
  return user;
};
