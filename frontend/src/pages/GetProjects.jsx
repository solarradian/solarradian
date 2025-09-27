
import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useSelector } from "react-redux";
import { Loader2, Users, Wrench, User, Cpu } from "lucide-react";
import { ExternalLink } from "lucide-react";
const GetProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get logged-in user directly from Redux
  const user = useSelector((state) => state.user);

  // ✅ Fetch projects (API already applies role restrictions)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await Axios({
          ...SummaryApi.getallprojects,
        });
        if (res.data.success) {
          setProjects(res.data.projects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No projects found for your role.
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white shadow rounded-2xl p-5 hover:shadow-lg transition"
          >
            {/* Project Header */}
            <h2 className="text-lg font-semibold mb-3">
              {project.projectuniqueId}
            </h2>

            {/* Show Customer (Admins & Employees can see customer details) */}
            {user?.role !== "Customer" && project.customer && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <User className="w-4 h-4 mr-2 text-blue-500" />
                <span>
                  {project.customer.name} ({project.customer.email}){" "}
                  {project.customer.uniqueId}
                </span>
              </div>
            )}

            {/* Business Head */}
            {project.businessHead?.length > 0 && (
              <div className="text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-500" />
                  <span className="font-medium">Business Head</span>
                </div>
                {project.businessHead.map((head) => (
                  <p key={head._id} className="ml-6">
                    {head.name}{" "}
                    <span className="text-gray-500">(Emp ID: {head.uniqueId})</span>
                  </p>
                ))}
              </div>
            )}

            {/* Project Head */}
            {project.projectHead?.length > 0 && (
              <div className="text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <Wrench className="w-4 h-4 mr-2 text-orange-500" />
                  <span className="font-medium">Project Head</span>
                </div>
                {project.projectHead.map((head) => (
                  <p key={head._id} className="ml-6">
                    {head.name}{" "}
                    <span className="text-gray-500">(Emp ID: {head.uniqueId})</span>
                  </p>
                ))}
              </div>
            )}

            {/* Inverter */}
            {project.inverter && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Cpu className="w-4 h-4 mr-2 text-purple-500" />
                <span>Inverter: {project.inverter.model || "N/A"}</span>
              </div>
            )}

            {/* Panels */}
            {project.panels?.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Panels:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {project.panels.map((panel) => (
                    <li key={panel._id}>{panel.model || "Unnamed Panel"}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        ))}


      </div>
      {/* ✅ Role-based Check Status */}
      <div className="mt-4">
        <a
          href={
            user?.role === "Customer"
              ? "https://consumer.pmsuryaghar.gov.in/consumer/#/login"
              : "https://vendor.pmsuryaghar.gov.in/vendor/#/login"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          Check Status
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>

    </div>
  );
};

export default GetProjects;
