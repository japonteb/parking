import { kyBase } from './api-base';

// Types //

export interface Constant {
  id: number;
  name: string;
  type: string;
  value: string;
  active: boolean;
}

export const getConstantsBusinessService = (): Promise<Constant[]> => {
  return kyBase('constant').json();
};
