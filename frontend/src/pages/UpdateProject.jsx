import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios"; 
import SummaryApi from "../common/SummaryApi"; 

const UpdateProject = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [formData, setFormData] = useState({ name: "", status: "" });

  // 📌 Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await Axios.get(SummaryApi.getAllProjects.url);
        if (res.data.success) {
          setProjects(res.data.projects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // 📌 Handle dropdown select
  const handleSelect = (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId);

    const project = projects.find((p) => p._id === projectId);
    if (project) {
      setFormData({ name: project.name, status: project.status });
    }
  };

  // 📌 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.put(SummaryApi.updateProject.url, {
        id: selectedProject,  // ✅ send id in body
        ...formData,
      });

      if (res.data.success) {
        alert("Project updated successfully!");
      } else {
        alert(res.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Update Project</h2>

      {/* Select Project */}
      <select
        className="w-full border rounded p-2"
        value={selectedProject}
        onChange={handleSelect}
      >
        <option value="">-- Select Project --</option>
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.name}
          </option>
        ))}
      </select>

      {/* Update Form */}
      {selectedProject && (
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Project Name"
          />

          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Project Status"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Project
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProject;
