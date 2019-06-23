import React, { useState } from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router';
import SearchParams from './SearchParams';
import Details from './Details';
import ThemeContext from './ThemeContext';

const App = () => {
  const theme = useState({
    buttonColor : 'yellow',
    borderColor : 'blue'
  });
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <header>
          <Link to='/'>
            <h1>Pet Adoption</h1>
          </Link>
        </header>
        <Router>
          <SearchParams path='/' />
          <Details path='/details/:id' />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

render(<App />, document.getElementById('root'));
