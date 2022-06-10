import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Map} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapElement = styled.div`
  width: 500px;
  height: 500px;
`;

export const Page2 = () => {
  const [map, setMap] = useState<Map | undefined>(undefined);
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapElement.current) {
      const m = new Map({
        container: mapElement.current,
        style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });
      setMap(m);
      return () => {
        m.remove();
        setMap(undefined)
      }
    }
  }, [mapElement])

  return (
    <>
      <p>Page 2</p>
      <MapElement ref={mapElement}/>
    </>
  );
};
