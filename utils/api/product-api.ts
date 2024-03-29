import {restCall} from '../restCall';
import {ProductDTO} from '../../types/dto/ProductDTO';
import {ProductType} from '../../types/enum/ProductType';

const rootUrl = '/product';

export async function getAllProductByUserId(userId: string): Promise<ProductDTO[]> {
  const url = `${rootUrl}/user/${userId}`;
  return await restCall(url, 'GET');
}

export async function getAllProductByProductTypeAndUserId(productType: ProductType, userId: string): Promise<ProductDTO[]> {
  const url = `${rootUrl}/type/${productType}/user/${userId}`;
  return await restCall(url, 'GET');
}

export async function getProductById(id: string): Promise<ProductDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'GET');
}

export async function getWaterProduct(): Promise<ProductDTO> {
  const url = `${rootUrl}/water`;
  return await restCall(url, 'GET');
}

export async function createProduct(request: ProductDTO): Promise<ProductDTO> {
  const url = `${rootUrl}`;
  return await restCall(url, 'POST', {requestBody: request});
}

export async function updateProduct(request: ProductDTO, id: string): Promise<ProductDTO> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'PUT', {requestBody: request});
}

export async function deleteProduct(id: string): Promise<void> {
  const url = `${rootUrl}/${id}`;
  return await restCall(url, 'DELETE');
}
