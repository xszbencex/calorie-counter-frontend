import {restCall} from '../restCall';

const rootUrl = '/users';

export async function getAllCompany(): Promise<any> {
  const url = `${rootUrl}/asd`;
  return await restCall(url, 'GET');
}
