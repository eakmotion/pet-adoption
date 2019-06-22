import React from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router';
import SearchParams from './SearchParams';
import Details from './Details';

const App = () => {
  return (
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
  );
};

render(<App />, document.getElementById('root'));
