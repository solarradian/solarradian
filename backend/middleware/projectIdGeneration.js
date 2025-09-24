// import Counter from "../models/Counter.js";

// export const generateProjectId = async () => {
//   const counter = await Counter.findOneAndUpdate(
//     { key: "projectuniqueId" },      // identify project counter
//     { $inc: { value: 1 } },    // increment by 1
//     { new: true, upsert: true } // create if not exists
//   );

//   // Format: SR + counter, starting from SR001
//   const id = `SR${String(counter.value).padStart(3, "0")}`;
//   return id;
// };

import Counter from "../models/Counter.js";

export const generateProjectId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { key: "projectuniqueId" },   // identify project counter
    { $inc: { value: 1 } },       // increment by 1
    { new: true, upsert: true }   // create if not exists
  );

  // Format: SR00 + number (SR001, SR002, SR003...)
  const id = `SR00${counter.value}`;
  return id;
};