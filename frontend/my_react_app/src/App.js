import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Dashboard from './components/Dashboard';

const App = () => {
  const [franchises, setFranchises ] = useState([]);
  const [branches, setBranches ] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/franchises/');
      setFranchises(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/branches/');
      setBranches(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <div>      
      <Dashboard />

      <h2>List of Franchises:</h2>
      <ul>
        {franchises.map((franchise) => (
          <li key={franchise.id}>{franchise.name}</li>
        ))}

      </ul>
      <h2>List of Branches:</h2>
      <ul>
        {branches.map((branch) => (
          <li key={branch.id}>{branch.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
