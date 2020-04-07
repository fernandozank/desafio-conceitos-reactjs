import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {setRepos(response.data)});
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Some Title ${Date.now()}`,
      url: "",
      techs: ["NodeJS"]
    });
    
    const repo = response.data;

    setRepos([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repo = repositories.filter(
      (repo) => repo.id !== id
    );

    setRepos(repo);
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        
        {repositories.map(repo => (
          <li key={repo.id}>{repo.title}
            <button onClick={() => handleRemoveRepository(`${repo.id}`)}>
              Remover
            </button>
          </li>
          )
        
          )}
      </ul>

      
    </div>
  );
}

export default App;
