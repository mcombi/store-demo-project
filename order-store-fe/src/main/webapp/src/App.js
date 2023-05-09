import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import withListLoading from './components/withListLoading';
import axios from 'axios'


function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });

useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = 'http://quarkus-store-project-store-demo-test.apps.cluster-j6jf7.j6jf7.sandbox838.opentlc.com/order';
    axios.get(apiUrl).then((repos) => {
      const allRepos = repos.data;
      setAppState({ loading: false, repos: allRepos });
    });
  }, [setAppState]);

  return (
    <div className='App'>
      <div className='container'>
        <h1>Quarkus Shop</h1>
      </div>
      <div className='repo-container'>
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
      <footer>
        <div className='footer'>


        </div>
      </footer>
    </div>
  );
}
export default App;
