import React, { useState, useEffect, useContext, FunctionComponent } from 'react';
import pet, { ANIMALS, Animal } from '@frontendmasters/pet';
import Results from './Results';
import useDropdown from './useDropdown';
import ThemeContext from './ThemeContext';
import { RouteComponentProps } from '@reach/router';

const SearchParams: FunctionComponent<RouteComponentProps> = () => {
  const [ location, setLocation ] = useState('Bangkok, TH');
  const [ breeds, setBreeds ] = useState([] as string[]);
  const [ animal, AnimalDropdown ] = useDropdown('Animal', 'dog', ANIMALS);
  const [ breed, BreedDropdown, setBreed ] = useDropdown('Breed', '', breeds);
  const [ pets, setPets ] = useState([] as Animal[]);
  const [ theme, setTheme ] = useContext(ThemeContext);

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
        <label htmlFor='location'>
          Theme
          <select
            value={theme}
            name='buttonColor'
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}>
            <option value='yellow'>Yellow</option>
            <option value='darkblue'>Dark Blue</option>
            <option value='chartreuse'>Chartreuse</option>
            <option value='mediumorchid'>Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
