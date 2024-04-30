import { useEffect } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const createShortUrl = async () => {
      const url = 'http://mattshelley.dev/';
  
      try {
        const response = await axios.post('http://localhost:8000/api/short-url', {
          url,
        });
  
        console.log(response);
      } catch (error) {
        console.log(error)
      }
    }

    createShortUrl();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
