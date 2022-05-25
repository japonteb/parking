import {z} from 'zod';

const genderSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const ageRangeSchema = z.object({
  age_group: z.string(),
  age_low: z.string(),
  age_high: z.string(),
  age_text: z.string(),
});

const notificationTypeSchema = z.object({
  byte_position: z.string(),
  description: z.string(),
});

export const parkResultSchema = z.object({
  genders: z.array(genderSchema),
  age_ranges: z.array(ageRangeSchema),
  result: z.string(),
  parkid: z.string(),
  parkname_public: z.string(),
  subtitle: z.string(),
  parkname_ww: z.string(),
  timezone: z.string(),
  maxguestcapacity: z.string(),
  measurement_units: z.string(),
  age_of_majority: z.string(),
  notification_types: z.array(notificationTypeSchema),
  ios_version: z.string(),
  android_version: z.string(),
  occupancy: z.string(),
  busy_level: z.string(),
});
