import { kyBase } from "../api-base";

interface Gender {
  value: string;
  label: string;
}

interface AgeRange {
  age_group: string;
  age_low: string;
  age_high: string;
  age_text: string;
}

interface NotificationType {
  byte_position: string;
  description: string;
}

export interface ParkResult {
  genders: Gender[];
  age_ranges: AgeRange[];
  result: string;
  parkid: string;
  parkname_public: string;
  subtitle: string;
  parkname_ww: string;
  timezone: string;
  maxguestcapacity: string;
  measurement_units: string;
  age_of_majority: string;
  notification_types: NotificationType[];
  ios_version: string;
  android_version: string;
  occupancy: string;
  busy_level: string;
}

export const getPark = (): Promise<ParkResult> =>
  kyBase("v2_core/getPark.php").json();
