import { create } from 'zustand';

const usePlaceStore = create((set) => ({
  placeList: {},
  day: '',

  setDay: (day) =>
    set(() => ({
      day,
    })),

  addPlace: (day, dayList) =>
    set((state) => ({
      placeList: {
        ...state.placeList,
        [day]: dayList,
      },
    })),

  movePlace: (day, oldIndex, newIndex) =>
    set((state) => {
      const places = state.placeList[day] || [];
      // 배열을 직접 수정합니다.
      const [movedPlace] = places.splice(oldIndex, 1);
      places.splice(newIndex, 0, movedPlace);
      return {
        placeList: {
          ...state.placeList,
          [day]: places,
        },
      };
    }),

  movePlaceBetweenDays: (sourceDay, targetDay, oldIndex, newIndex) =>
    set((state) => {
      const placeToMove = state.placeList[sourceDay][oldIndex];
      const newSourceDayList = state.placeList[sourceDay].filter(
        (_, index) => index !== oldIndex
      );
      const newTargetDayList = [
        ...(state.placeList[targetDay] || []).slice(0, newIndex),
        placeToMove,
        ...(state.placeList[targetDay] || []).slice(newIndex),
      ];

      return {
        placeList: {
          ...state.placeList,
          [sourceDay]: newSourceDayList,
          [targetDay]: newTargetDayList,
        },
      };
    }),

  removePlace: (day, id) =>
    set((state) => ({
      placeList: {
        ...state.placeList,
        [day]: state.placeList[day].filter((place) => place.id !== id),
      },
    })),

  initList: () => set(() => ({ placeList: {} })),
}));

export default usePlaceStore;
