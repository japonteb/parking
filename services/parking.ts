import { kyBase } from "./api-base";

// Types //

export interface ParkingResult {
  id: number;
  location: string;
  type: string;
  state: string;
}

export const getPark = (): Promise<ParkingResult> => kyBase("/parking").json();
