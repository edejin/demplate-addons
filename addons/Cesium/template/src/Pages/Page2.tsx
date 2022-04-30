import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import * as Cesium from 'cesium';

const MapElement = styled.div`
  width: 500px;
  height: 500px;
`;

export const Page2 = () => {
  const [map, setMap] = useState<Cesium.Viewer | undefined>(undefined);
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapElement.current) {
      const m = new Cesium.Viewer(mapElement.current);
      setMap(m);
      return () => {
        m.destroy();
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
