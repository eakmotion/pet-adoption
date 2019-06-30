import React, { useState, Suspense, lazy } from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router';
import SearchParams from './SearchParams';
import ThemeContext from './ThemeContext';

const Details = lazy(() => import('./Details'));

const App = () => {
  const theme = useState('yellow');
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <header>
          <Link to='/'>
            <h1>Pet Adoption</h1>
          </Link>
        </header>
        <Suspense fallback={<h1>loading route ...</h1>}>
          <Router>
            <SearchParams path='/' />
            <Details path='/details/:id' />
          </Router>
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
};

render(<App />, document.getElementById('root'));
