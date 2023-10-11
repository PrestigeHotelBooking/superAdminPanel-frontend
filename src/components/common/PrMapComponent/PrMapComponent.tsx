import { API_KEY } from '@/Global/ApiKey/apiKey';
import React, { useRef, useState, useEffect } from 'react';

interface MapComponentProps {
  initialLatitude: number;
  initialLongitude: number;
  className:string;
  onMapDrag: (latitude: number, longitude: number) => void;
}

const PrMapComponent: React.FC<MapComponentProps> = ({
  initialLatitude: initialLatitudeProp = 20.5937,
  initialLongitude: initialLongitudeProp = 78.9629,
  className,
  onMapDrag,
}) => {
  const mapContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '400px',
  };

  const [initialLatitude, setInitialLatitude] = useState(initialLatitudeProp);
  const [initialLongitude, setInitialLongitude] = useState(initialLongitudeProp);


  const center: google.maps.LatLngLiteral = {
    lat: initialLatitude,
    lng: initialLongitude,
  };

  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null); // Reference to the marker

  useEffect(() => {
    const onLoad = (map: google.maps.Map) => {
      mapRef.current = map;

      // Create the marker at the initial location
      markerRef.current = new window.google.maps.Marker({
        position: center,
        map: map, // Add the marker to the map
        icon: {
          url: 'https://img.icons8.com/color/48/000000/map-pin.png',
          scaledSize: new window.google.maps.Size(50, 50),
        },
      });

      const input = document.getElementById('search-input') as HTMLInputElement;
      setSearchBox(new window.google.maps.places.SearchBox(input));

      // Add a click event listener to the map to place a marker
      map.addListener('click', (event: google.maps.MouseEvent) => {
        if (markerRef.current) {
          const newPosition = event?.latLng?.toJSON();
          markerRef.current.setPosition(event.latLng); // Set the marker position to the clicked location
          setInitialLatitude(newPosition?.lat as any);
          setInitialLongitude(newPosition?.lng as any);
          onMapDrag(newPosition?.lat as any, newPosition?.lng as any); // Call onMapDrag with new coordinates
        } else {
          // Create the marker at the clicked location
          markerRef.current = new window.google.maps.Marker({
            position: event.latLng,
            map: map, // Add the marker to the map
            icon: {
              url: 'https://img.icons8.com/color/48/000000/map-pin.png',
              scaledSize: new window.google.maps.Size(50, 50),
            },
          });
          const newPosition = event?.latLng?.toJSON();
          setInitialLatitude(newPosition?.lat as any);
          setInitialLongitude(newPosition?.lng as any);
 
          onMapDrag(newPosition?.lat as any, newPosition?.lng as any); // Call onMapDrag with new coordinates
        }
      });

      // Add an event listener for when the search box places are changed
      searchBox?.addListener('places_changed', onPlacesChanged);
    };

    const onPlacesChanged = () => {
      const places = searchBox?.getPlaces();
      if (places && places.length > 0) {
        const newPosition = places[0].geometry?.location;
        if (newPosition) {
          const newLatitude = newPosition.lat() || 0;
          const newLongitude = newPosition.lng() || 0;
          mapRef.current?.setCenter(newPosition);
          onMapDrag(newLatitude, newLongitude);
  
          // Update initialLatitude and initialLongitude with the new values using useState
          setInitialLatitude(newLatitude);
          setInitialLongitude(newLongitude);
        }
      }
    };
    // Load the Google Maps API and initialize the map
    const script = document.createElement('script');
    
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY.GOOGLE_MAP_API_KEY}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (mapContainerRef.current) {
        onLoad(new window.google.maps.Map(mapContainerRef.current, {
          zoom: 6,
          center: center,
          draggable: true,
        }));
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [initialLatitude, initialLongitude, onMapDrag]);

  return (
    <div className={`${className}`}>
      <div ref={mapContainerRef} style={mapContainerStyle}>
      <input
  id="search-input"
  type="text"
  placeholder="Search for a place"
  style={{
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1,
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '5px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  }}
/>

      </div>
    </div>
  );
};

export default PrMapComponent;
