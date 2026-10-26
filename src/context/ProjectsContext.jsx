import { createContext, useState, useContext, useEffect } from 'react';

const API_URL = 'http://localhost:3001/projects';

const ProjectsContext = createContext();

// Custom hook for using projects
export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return context;
};

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch once on mount; the cleanup flag stops a stale response from updating state
  useEffect(() => {
    let isCancelled = false;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error, status ${response.status}`);
        }
        const data = await response.json();
        if (!isCancelled) {
          setProjects(data);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isCancelled = true;
    };
  }, []);

  // The server is the source of truth: append the project it returned, not the one we sent
  const addProject = async (projectData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...projectData, id: Date.now() })
    });
    if (!response.ok) {
      throw new Error('Failed to add project');
    }
    const newProject = await response.json();
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  // Optimistic: remove first, put the old list back if the request fails
  const deleteProject = async (id) => {
    const oldProjects = projects;
    setProjects(prev => prev.filter(project => project.id !== id));
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error, status ${response.status}`);
      }
    } catch (err) {
      setProjects(oldProjects);
      throw new Error(`Failed to delete project: ${err.message}`);
    }
  };

  const value = { projects, loading, error, addProject, deleteProject };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
