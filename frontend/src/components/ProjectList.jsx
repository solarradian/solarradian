import { useNavigate } from "react-router-dom";

const ProjectList = ({ projects }) => {
  const navigate = useNavigate();

  const handleEdit = (project) => {
    navigate("/update-project", { state: { project } }); // pass project in state
  };

  return (
    <div>
      {projects.map((proj) => (
        <div key={proj._id} className="border p-2 my-2 flex justify-between">
          <span>{proj.name}</span>
          <button
            onClick={() => handleEdit(proj)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
