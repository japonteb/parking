import { kyBase } from "./api-base";

// Types //

export interface ParkingSpace {
  id: number;
  location: string;
  type: string;
  state: string;
}

const parkingURL = "parking";

export const getParkingSpacesService = (): Promise<ParkingSpace[]> => {
  return kyBase(parkingURL).json();
};

export const getParkingSpaceByLocationService = (
  location: string
): Promise<ParkingSpace[]> => {
  return kyBase(`${parkingURL}?location=${location}`).json();
};

export const changeParkingState = (
  parkingSpaceId: number,
  state: string
): Promise<ParkingSpace> => {
  return kyBase
    .patch(`${parkingURL}/${parkingSpaceId}`, {
      json: { state },
    })
    .json();
};
