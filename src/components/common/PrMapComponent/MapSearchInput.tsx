// MapSearchInput.tsx

import React, { useRef, useEffect } from 'react';

interface MapSearchInputProps {
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
}

const MapSearchInput: React.FC<MapSearchInputProps> = ({ setLatitude, setLongitude }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current && window.google) {
      const input = inputRef.current;
      const searchBox = new window.google.maps.places.SearchBox(input);

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places && places.length > 0) {
          const selectedPlace = places[0];
          const newLatitude = selectedPlace?.geometry?.location?.lat();
          const newLongitude = selectedPlace?.geometry?.location?.lng();

          setLatitude(newLatitude as any);
          setLongitude(newLongitude as any);
        }
      });
    }
  }, [setLatitude, setLongitude]);

  return <input ref={inputRef} id='pac-input' type='text' placeholder='Search for a place' />;
};

export default MapSearchInput;
