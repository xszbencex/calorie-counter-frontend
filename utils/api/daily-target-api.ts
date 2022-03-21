import {restCall} from '../restCall';
import {DailyTargetDTO} from '../../types/dto/DailyTargetDTO';

const rootUrl = '/dailyTarget';

export async function getAllDailyTargetByUserId(userId: string): Promise<DailyTargetDTO[]> {
  const url = `${rootUrl}/user/${userId}`;
  return await restCall(url, 'GET');
}

export async function getDailyTargetByUserId(useId: string): Promise<DailyTargetDTO> {
  const url = `${rootUrl}/user/${useId}`;
  return await restCall(url, 'GET');
}

export async function getDailyTargetById(id: string): Promise<DailyTargetDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'GET');
}

export async function createDailyTarget(request: DailyTargetDTO): Promise<DailyTargetDTO> {
  const url = `${rootUrl}`;
  return await restCall(url, 'POST', {requestBody: request});
}

export async function updateDailyTarget(request: DailyTargetDTO, id: string): Promise<DailyTargetDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'PUT', {requestBody: request});
}

export async function deleteDailyTarget(id: string): Promise<void> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'DELETE');
}
