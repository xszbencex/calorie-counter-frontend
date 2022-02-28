import {restCall} from '../restCall';
import {ClientDTO} from '../../types/dto/ClientDTO';

const rootUrl = '/client';

export async function getClientById(id: string): Promise<ClientDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'GET');
}

export async function getClientByUserId(userId: string): Promise<ClientDTO> {
  const url = `${rootUrl}/user/${userId}`;
  return await restCall(url, 'GET');
}

export async function createClient(request: ClientDTO): Promise<ClientDTO> {
  const url = `${rootUrl}`;
  return await restCall(url, 'POST', {requestBody: request});
}

export async function updateClient(request: ClientDTO, id: string): Promise<ClientDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'PUT', {requestBody: request});
}
