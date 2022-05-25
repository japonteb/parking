import { kyBase } from './api-base';
import type { StatusResponse } from './api-base';

// Types //


export interface CreateAccountRequestOptions {
  nickname?: string;
  fullname?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  telephone?: string;
}

export interface CreateAccountRequestResponse extends StatusResponse {
  gid?: string;
}


export const createAccount = (
  email: string,
  password: string,
  options?: CreateAccountRequestOptions
): Promise<CreateAccountRequestResponse> =>
  kyBase('v2_accounts/createAccount.php', {
    searchParams: options
      ? { ...options, email, password }
      : { email, password },
  }).json();

