import {restCall} from '../restCall';
import {PersonalDataDTO} from '../../types/dto/PersonalDataDTO';

const rootUrl = '/personalData';

export async function getPersonalDataById(id: string): Promise<PersonalDataDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'GET');
}

export async function getPersonalDataByUserId(userId: string): Promise<PersonalDataDTO> {
  const url = `${rootUrl}/user/${userId}`;
  return await restCall(url, 'GET');
}

export async function createPersonalData(request: PersonalDataDTO): Promise<PersonalDataDTO> {
  const url = `${rootUrl}`;
  return await restCall(url, 'POST', {requestBody: request});
}

export async function updatePersonalData(request: PersonalDataDTO, id: string): Promise<PersonalDataDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'PUT', {requestBody: request});
}
