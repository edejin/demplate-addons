import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import 'maplibre-gl/dist/maplibre-gl.css';
import {Scene, LineLayer} from '@antv/l7';
import {Mapbox} from '@antv/l7-maps';
import {Map} from 'maplibre-gl';

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
`;

const MapElement = styled.div`
  flex: 0 0 100%;
`;

interface Props {
  className?: string;
  style?: CSSProperties;
}

export const MapComponent: React.FC<Props> = (props) => {
  const {
    className,
    style
  } = props;
  const [map, setMap] = useState<Map | undefined>(undefined);
  const [scene, setScene] = useState<Scene | undefined>(undefined);
  const mapElement = useRef<HTMLDivElement>(null);
  const rootElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootElement.current && mapElement.current) {
      const m = new Map({
        container: mapElement.current,
        style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
        center: [101.94365594271085, 40.46139674355291], // starting position [lng, lat]
        zoom: 2.5, // starting zoom
        pitch: 60
      });
      setMap(m);

      const s = new Scene({
        id: m.getContainer() as HTMLDivElement,
        map: new Mapbox({
          mapInstance: m
        })
      });
      setScene(s);

      return () => {
        s.destroy();
        setMap(undefined);
        setScene(undefined);
        if (rootElement.current) {
          rootElement.current.appendChild(mapElement.current!);
        }
      };
    }
  }, [rootElement, mapElement]);

  useEffect(() => {
    if (scene) {
      scene.on('load', () => {
        fetch('https://gw.alipayobjects.com/os/rmsportal/UEXQMifxtkQlYfChpPwT.txt')
          .then(res => res.text())
          .then(data => {
            const layer = new LineLayer({})
              .source(data, {
                parser: {
                  type: 'csv',
                  x: 'lng1',
                  y: 'lat1',
                  x1: 'lng2',
                  y1: 'lat2'
                }
              })
              .size(1)
              .shape('arc3d')
              .color('#FF7C6A')
              .style({
                opacity: 0.8,
                sourceColor: '#f00',
                targetColor: '#6F19FF'
              });
            scene.addLayer(layer);
          });
      })
    }
  }, [scene]);

  return (
    <Wrapper ref={rootElement} className={className} style={style}>
      <MapElement ref={mapElement}/>
    </Wrapper>
  )
}
