import {restCall} from '../restCall';
import {NutritionDTO} from '../../types/dto/NutritionDTO';

const rootUrl = '/nutrition';

export async function getAllNutrition(): Promise<NutritionDTO[]> {
  const url = `${rootUrl}`;
  return await restCall(url, 'GET');
}

export async function getAllNutritionByUserId(userId: string): Promise<NutritionDTO[]> {
  const url = `${rootUrl}/user/${userId}`;
  return await restCall(url, 'GET');
}

export async function getNutritionById(id: string): Promise<NutritionDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'GET');
}

export async function createNutrition(request: NutritionDTO): Promise<NutritionDTO> {
  const url = `${rootUrl}`;
  return await restCall(url, 'POST', {requestBody: request});
}

export async function updateNutrition(request: NutritionDTO, id: string): Promise<NutritionDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'PUT', {requestBody: request});
}

export async function deleteNutrition(id: string): Promise<void> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'DELETE');
}
