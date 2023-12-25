import { useRef, useMemo, useEffect, useState } from 'react';

interface MapComponentProps {
  initialLatitude: number;
  initialLongitude: number;
  className: string;
  onMapDrag: (latitude: number, longitude: number) => void;
}

const PrMapComponent: React.FC<MapComponentProps> = ({
  initialLatitude: initialLatitudeProp,
  initialLongitude: initialLongitudeProp,
  className,
  onMapDrag,
}) => {
  console.log(initialLatitudeProp, initialLongitudeProp);
  const mapContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '400px',
  };

  const [initialLatitude, setInitialLatitude] = useState(initialLatitudeProp);
  const [initialLongitude, setInitialLongitude] = useState(initialLongitudeProp);

  const mapOptions = useMemo(() => {
    return {
      center: { lat: initialLatitude, lng: initialLongitude }, // Set the initial map center
      zoom: 12, // Set the initial zoom level
    };
  }, [initialLatitude, initialLongitude]);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const initializeMap = () => {
    if (typeof window !== 'undefined') {
      const google = window.google;

      if (google) {
        const mapRef = new google.maps.Map(mapContainerRef.current as any, mapOptions);

        const markerRef = new google.maps.Marker({
          position: mapOptions.center,
          map: mapRef,
          draggable: true,
          title: 'Marker Title',
        });

        markerRef.addListener('dragend', () => {
          const newPosition = markerRef?.getPosition();
          const latitude = newPosition?.lat();
          const longitude = newPosition?.lng();
          setInitialLatitude(latitude || 0); // Update the state with the new latitude
          setInitialLongitude(longitude || 0); // Update the state with the new longitude
          onMapDrag(latitude as any, longitude as any);
        });

        mapRef.addListener('click', (event: any) => {
          const clickedLatitude = event.latLng.lat();
          const clickedLongitude = event.latLng.lng();
          markerRef.setPosition(event.latLng);
          setInitialLatitude(clickedLatitude); // Update the state with the clicked latitude
          setInitialLongitude(clickedLongitude); // Update the state with the clicked longitude
          onMapDrag(clickedLatitude, clickedLongitude);
        });
      }
    }
  };

  useEffect(() => {
    initializeMap();
  }, [onMapDrag, mapOptions]);

  return (
    <div className={className}>
      <div ref={mapContainerRef} style={mapContainerStyle}></div>
    </div>
  );
};

export default PrMapComponent;
