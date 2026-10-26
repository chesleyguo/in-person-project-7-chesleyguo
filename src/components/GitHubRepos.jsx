import { useState, useEffect } from 'react';

const GITHUB_USERNAME = 'chesleyguo';

const GitHubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Same shape as ProjectsContext: fetch on mount, ignore the response after cleanup
  useEffect(() => {
    let isCancelled = false;

    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        if (!response.ok) {
          throw new Error(`HTTP error, status ${response.status}`);
        }
        const data = await response.json();
        if (!isCancelled) {
          setRepos(data);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchRepos();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section id="github" className="github-repos">
      <div className="container">
        <h2>My GitHub Repositories</h2>
        {loading && <p className="status">Loading repositories...</p>}
        {error && <p className="status">Could not load repositories: {error}</p>}
        {!loading && !error && (
          <ul>
            {repos.map(repo => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default GitHubRepos;
