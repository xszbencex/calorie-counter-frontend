import {restCall} from '../restCall';
import {WeightChangeDTO} from '../../types/dto/WeightChangeDTO';

const rootUrl = '/weightChange';

export async function getWeightChangeById(id: string): Promise<WeightChangeDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'GET');
}

export async function getAllWeightChangeByUserId(userId: string): Promise<WeightChangeDTO[]> {
  const url = `${rootUrl}/user/${userId}`;
  return await restCall(url, 'GET');
}

export async function createWeightChange(request: WeightChangeDTO): Promise<WeightChangeDTO> {
  const url = `${rootUrl}`;
  return await restCall(url, 'POST', {requestBody: request});
}

export async function updateWeightChange(request: WeightChangeDTO, id: string): Promise<WeightChangeDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'PUT', {requestBody: request});
}

export async function deleteWeightChange(id: string): Promise<void> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'DELETE');
}
