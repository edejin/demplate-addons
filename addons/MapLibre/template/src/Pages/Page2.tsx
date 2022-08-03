import React from 'react';
import styled from 'styled-components';
import 'maplibre-gl/dist/maplibre-gl.css';
import {useMapStore} from '@/store/map';
import {useMap} from '@/utils/hooks';

const MapElement = styled.div`
  width: 500px;
  height: 500px;
  position: relative;
`;

export const Page2 = () => {
  const setMap = useMapStore(state => state.setMap);
  const element = useMap({
    center: [54.32313290648384, 24.46175140019264], // starting position [lng, lat]
    zoom: 14 // starting zoom
  }, (m) => {
    setMap(m);
    return () => {
      setMap(undefined);
    }
  });

  return (
    <>
      <p>Page 2</p>
      <MapElement ref={element}/>
    </>
  );
};
