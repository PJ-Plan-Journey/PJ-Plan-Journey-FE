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
  removePlace: (id) =>
    set((state) => ({
      placeList: state.placeList.filter((place) => place.id !== id),
    })),
  initList: () => set(() => ({ placeList: [] })),
}));

export default usePlaceStore;
