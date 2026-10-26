import { useState } from 'react';
import { useProjects } from '../context/ProjectsContext';

const EMPTY_FORM = {
  title: '',
  description: '',
  category: 'web',
  imageUrl: 'https://placehold.co/600x400?text=New+Project',
  technologies: []
};

const ProjectForm = () => {
  const { addProject } = useProjects();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title.trim() === '') {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await addProject({ ...formData, title: formData.title.trim() });
      setFormData(EMPTY_FORM);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form" noValidate>
      <div className="form-group">
        <label htmlFor="project-title">Title</label>
        <input
          type="text"
          id="project-title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={error ? 'error' : ''}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="project-description">Description</label>
        <textarea
          id="project-description"
          name="description"
          rows="2"
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="project-category">Category</label>
        <select
          id="project-category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
          <option value="data">Data</option>
        </select>
      </div>

      {error && <span className="form-error">{error}</span>}

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
