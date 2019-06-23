import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import Results from './Results';
import useDropdown from './useDropdown';
import ThemeContext from './ThemeContext';

const SearchParams = () => {
  const [ location, setLocation ] = useState('Bangkok, TH');
  const [ breeds, setBreeds ] = useState([]);
  const [ animal, AnimalDropdown ] = useDropdown('Animal', 'dog', ANIMALS);
  const [ breed, BreedDropdown, setBreed ] = useDropdown('Breed', '', breeds);
  const [ pets, setPets ] = useState([]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type     : animal
    });

    setPets(animals || []);
  }

  useEffect(
    () => {
      setBreeds([]);
      setBreed('');

      pet.breeds(animal).then(({ breeds }) => {
        const breedNames = breeds.map(({ name }) => name);
        setBreeds(breedNames);
      }, console.error);
    },
    [ animal, setBreed, setBreeds ]
  );

  return (
    <div className='search-params'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}>
        <label htmlFor='location'>
          Location
          <input
            id='location'
            value={location}
            placeholder='Location'
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <ThemeContext.Consumer>
          {([ theme ]) => <button style={{ backgroundColor: theme }}>Submit</button>}
        </ThemeContext.Consumer>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
