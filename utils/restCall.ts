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
  options: HttpOptions = {}
) => {
  const {headers = {}, params = null, requestBody = null} = options;

  const requestUrl = !params ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`
    : `${process.env.rootUrl}${url}?` + new URLSearchParams(params);

  const headerObject = new Headers({'Content-Type': 'application/json', ...headers});

  return fetch(requestUrl,
    {
      headers: headerObject,
      method: method,
      body: requestBody ? JSON.stringify(requestBody) : null
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new CCHTTPError(response.status, response.statusText);
      }})
    .then((result: Result) => {
      if (result.errors?.length > 0) {
        return Promise.reject(result.errors[0]);
      }
      return result.data;
    });
};
