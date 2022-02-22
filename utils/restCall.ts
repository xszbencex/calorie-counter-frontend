import {getKeycloakInstance} from '@react-keycloak/ssr';
import {keycloakConfig} from '../constants/keycloakConfig';

type CallMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type HttpOptions = {
  headers?: any,
  params?: any,
  requestBody?: any
}

export class CCHTTPError extends Error {
  status: number;
  statusText: string;

  constructor(status: number, statusText: string) {
    super(statusText);
    this.status = status;
    this.statusText = statusText;
  }
}

export type CCApplicationError = {
  code: string;
  info: string;
  message: string;
  title: string;
}

type Result = {
  data: any | any[],
  errors: CCApplicationError[],
  path: string,
  status: string,
  timestamp: Date
}

export const restCall = (
  url: string,
  method: CallMethod,
  options: HttpOptions = {},
  responseType: 'json' | 'blob' | 'arraybuffer' = 'json'
) => {
  const keycloakInstance = getKeycloakInstance(keycloakConfig);

  const {headers = {}, params = null, requestBody = null} = options;

  const requestUrl = !params ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}?` + new URLSearchParams(params);

  const headerObject = new Headers({'Content-Type': 'application/json', ...headers});
  keycloakInstance.token && headerObject.append('authorization', `Bearer ${keycloakInstance.token}`);

  return fetch(requestUrl,
    {
      headers: headerObject,
      method: method,
      body: requestBody ? JSON.stringify(requestBody) : null,
    })
    .then(response => {
      if (response.ok) {
        switch (responseType) {
          case 'json':
            return response.json();
          case 'blob':
            return response.blob();
          case 'arraybuffer':
            return response.arrayBuffer();
        }
      } else {
        throw new CCHTTPError(response.status, response.statusText);
      }})
    .then((result: Result | Blob | ArrayBuffer) => {
      if (result instanceof Blob || result instanceof ArrayBuffer) {
        return result;
      }
      if (result.errors?.length > 0) {
        return Promise.reject(result.errors[0]);
      }
      return result.data;
    });
};
