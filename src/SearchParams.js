import React, { useState, useEffect, useContext } from 'react';
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

  const updateTheme = (e) => {
    setTheme({
      ...theme,
      [e.target.name]: e.target.value
    });
  };

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
            value={theme.buttonColor}
            name='buttonColor'
            onChange={updateTheme}
            onBlur={updateTheme}>
            <option value='yellow'>Yellow</option>
            <option value='darkblue'>Dark Blue</option>
            <option value='chartreuse'>Chartreuse</option>
            <option value='mediumorchid'>Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme.buttonColor, borderColor: theme.borderColor }}>
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
