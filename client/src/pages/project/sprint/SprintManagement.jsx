// SprintManagement.jsx - Dedicated sprint management page
import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { CreateSprint, ViewSprint, EditSprint } from "./SprintMeta";
import fetcher from "../../../lib/api";

const SprintManagement = () => {
  const { project, refreshProject } = useOutletContext();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSprintId, setEditingSprintId] = useState(null);

  // Get current sprint
  const currentSprint = project.sprints?.find((sprint) => sprint.isCurrent);

  // Handler for creating a new sprint
  const handleCreateSprint = async (sprintData) => {
    try {
      await fetcher(`/projects/${project._id}/sprints`, {
        method: "POST",
        body: JSON.stringify({
          ...sprintData,
          projectId: project._id,
        }),
      });

      setShowCreateForm(false);
      await refreshProject();
    } catch (error) {
      console.error("Error creating sprint:", error);
      // TODO: Show error toast
    }
  };

  // Handler for updating a sprint
  const handleUpdateSprint = async (updatedSprintData) => {
    try {
      await fetcher(`/sprints/${updatedSprintData._id}`, {
        method: "PUT",
        body: JSON.stringify(updatedSprintData),
      });

      setEditingSprintId(null);
      await refreshProject();
    } catch (error) {
      console.error("Error updating sprint:", error);
      // TODO: Show error toast
    }
  };

  // Handler for deleting a sprint
  const handleDeleteSprint = async (sprintId) => {
    if (!confirm("Are you sure you want to delete this sprint?")) return;

    try {
      await fetcher(`/sprints/${sprintId}`, {
        method: "DELETE",
      });

      await refreshProject();
    } catch (error) {
      console.error("Error deleting sprint:", error);
      // TODO: Show error toast
    }
  };

  // Handler for setting current sprint
  const handleSetCurrentSprint = async (sprintId) => {
    try {
      await fetcher(`/sprints/${sprintId}/set-current`, {
        method: "PATCH",
      });

      await refreshProject();
    } catch (error) {
      console.error("Error setting current sprint:", error);
      // TODO: Show error toast
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
        <div className="text-center md:text-start">
          <h1 className="text-2xl font-bold text-white ">Sprint Management</h1>
          <p className="text-slate-400 text-sm mt-1">
            Organize your project work into focused sprints
          </p>
        </div>
        {!showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 w-36 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
          >
            Create Sprint
          </button>
        )}
      </div>

      {/* Create Sprint Form */}
      {showCreateForm && (
        <CreateSprint
          onSave={handleCreateSprint}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {/* Current Sprint */}
      {currentSprint && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Active Sprint
          </h2>
          {editingSprintId === currentSprint._id ? (
            <EditSprint
              sprintData={currentSprint}
              onSave={handleUpdateSprint}
              onCancel={() => setEditingSprintId(null)}
            />
          ) : (
            <ViewSprint
              sprintData={currentSprint}
              onEdit={() => setEditingSprintId(currentSprint._id)}
            />
          )}
        </div>
      )}

      {/* All Sprints */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">All Sprints</h2>
        {project.sprints && project.sprints.length > 0 ? (
          <div className="space-y-4">
            {project.sprints.map((sprint) => (
              <div key={sprint._id}>
                {editingSprintId === sprint._id &&
                sprint._id !== currentSprint?._id ? (
                  <EditSprint
                    sprintData={sprint}
                    onSave={handleUpdateSprint}
                    onCancel={() => setEditingSprintId(null)}
                  />
                ) : (
                  <div className="flex items-center justify-between px-4 rounded-lg border border-slate-700">
                    <div className="flex-1">
                      <ViewSprint
                        sprintData={sprint}
                        onEdit={() => setEditingSprintId(sprint._id)}
                        onDelete={() => handleDeleteSprint(sprint._id)}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-medium mb-2">No sprints yet</h3>
            <p className="text-sm">
              Create your first sprint to start organizing your work
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SprintManagement;
