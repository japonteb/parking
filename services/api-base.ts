import ky from 'ky';
import type { NormalizedOptions } from 'ky';

export const enum RESPONSE_STATUS {
  SUCCESS = 'OK',
  FAIL = 'FAIL',
}

export const enum YN_BOOLEAN {
  true = 'Y',
  false = 'N',
}

export interface StatusResponse {
  readonly result: RESPONSE_STATUS;
  readonly msg?: string;
}

export function toNumber(value: string): number {
  return +value;
}

export const afterResponseFn = async (
  _request: Request,
  _options: NormalizedOptions,
  response: Response
) => {
  const data = await response.json();
  if (data.result === RESPONSE_STATUS.FAIL) {
    throw data;
  }
};

export const kyBase = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_API_URL,
  method: 'GET',
  retry: 0,
  hooks: {
    afterResponse: [afterResponseFn],
  },
});

export const kyBaseBusiness = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_API_URL_BUSINESS,
  method: 'GET',
  retry: 0,
  hooks: {
    afterResponse: [afterResponseFn],
  },
});
