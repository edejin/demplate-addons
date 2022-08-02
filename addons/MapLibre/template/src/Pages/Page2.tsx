import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Map, StyleSpecification} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {useMapStore} from '@/store/map';

const MapElement = styled.div`
  width: 500px;
  height: 500px;
`;

export const Page2 = () => {
  const setMap = useMapStore(state => state.setMap);
  const [style, setStyle] = useState<StyleSpecification | undefined>(undefined);
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/map-styles/style-dark.json')
      .then((res) => res.text())
      .then((text) => {
        const path = document.location.origin + document.location.pathname;
        return (JSON.parse(text.replaceAll('__REPLACE_ME__', path)) as unknown) as StyleSpecification;
      })
      .then((s) => setStyle(s));
  }, []);

  useEffect(() => {
    if (mapElement.current && style) {
      const m = new Map({
        container: mapElement.current,
        style,
        center: [54.32313290648384, 24.46175140019264], // starting position [lng, lat]
        zoom: 14 // starting zoom
      });
      setMap(m);
      return () => {
        m.remove();
        setMap(undefined);
      };
    }
  }, [mapElement, style, setMap]);

  return (
    <>
      <p>Page 2</p>
      <MapElement ref={mapElement}/>
    </>
  );
};
