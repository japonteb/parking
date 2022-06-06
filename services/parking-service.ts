import { kyBase, kyBaseBusiness } from './api-base';

// Types //

export interface ParkingSpace {
  id: number;
  location: string;
  type: string;
  state: string;
}

const parkingURL = 'parking';

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
export const isVehicleInTrafficRestriction = (
  licensePlate: string,
  vehicleType: string
): Promise<boolean> => {
  const entryDateTime: Date = new Date();
  return kyBaseBusiness
    .post(`${parkingURL}/traffic-restriction`, {
      json: { licensePlate, entry: entryDateTime.toUTCString(), vehicleType },
    })
    .json();
};
