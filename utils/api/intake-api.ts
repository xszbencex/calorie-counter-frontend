import {restCall} from '../restCall';
import {IntakeDTO} from '../../types/dto/IntakeDTO';
import {IntakeSumResponse} from '../../types/response/IntakeSumResponse';
import {WaterIntakeRequest} from '../../types/request/WaterIntakeRequest';

const rootUrl = '/intake';

export async function getAllIntakeByUserId(userId: string): Promise<IntakeDTO[]> {
  const url = `${rootUrl}/user/${userId}`;
  return await restCall(url, 'GET');
}

export async function getIntakeById(id: string): Promise<IntakeDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'GET');
}

export async function getAllIntakeByDateAndUserId(intakeDate: string): Promise<IntakeDTO[]> {
  const url = `${rootUrl}/date/${intakeDate}`;
  return await restCall(url, 'GET');
}

export async function getIntakeSumByDate(intakeDate: string): Promise<IntakeSumResponse> {
  const url = `${rootUrl}/sum/${intakeDate}`;
  return await restCall(url, 'GET');
}

export async function getIntakeSumByMonth(year: number | string, month: number | string): Promise<IntakeSumResponse[]> {
  const url = `${rootUrl}/sum/year/${year}/month/${month}`;
  return await restCall(url, 'GET');
}

export async function createIntake(request: IntakeDTO): Promise<IntakeDTO> {
  const url = `${rootUrl}`;
  return await restCall(url, 'POST', {requestBody: request});
}

export async function createWaterIntake(request: WaterIntakeRequest): Promise<IntakeDTO> {
  const url = `${rootUrl}/water`;
  return await restCall(url, 'POST', {requestBody: request});
}

export async function updateIntake(request: IntakeDTO, id: string): Promise<IntakeDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'PUT', {requestBody: request});
}

export async function deleteIntake(id: string): Promise<void> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'DELETE');
}
