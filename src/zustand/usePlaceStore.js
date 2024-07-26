import { create } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';

const usePlaceStore = create((set) => ({
  placeList: [],
  addPlace: (place) =>
    set((state) => ({
      placeList: [...state.placeList, place],
    })),
  movePlace: (oldIndex, newIndex) =>
    set((state) => ({
      placeList: arrayMove(state.placeList, oldIndex, newIndex),
    })),
}));

export default usePlaceStore;
