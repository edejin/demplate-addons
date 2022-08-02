import {applyMiddleware, StoreInterface} from '@/utils/zustand';
import {Map} from 'maplibre-gl';
import {mapMiddleware} from '@/middleware/map';

export interface MapStore {
  map?: Map;
  setMap: (map?: Map) => void;
}

const store: StoreInterface<MapStore> = (set, get) => ({
  setMap: (map?: Map) => set(state => ({map})),
});

export const useMapStore = applyMiddleware<MapStore>(store, [
  mapMiddleware
]);
