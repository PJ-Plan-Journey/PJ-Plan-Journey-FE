export const convertToPlanDetails = (placeList) => {
  let planDetails = [];

  // 날짜별로 그룹화
  for (const [date, places] of Object.entries(placeList)) {
    let sequence = 1;
    places.forEach((place) => {
      planDetails.push({
        sequence: sequence++,
        date: date,
        placeName: place.place_name,
        latitude: parseFloat(place.y),
        longitude: parseFloat(place.x),
      });
    });
  }

  return planDetails;
};
