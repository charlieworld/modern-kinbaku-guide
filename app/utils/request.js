import { baseApi } from '../../config';

const getHost = () => baseApi;


function parseJson(response, method) {
  try {
    /*
    if (response.status >= 400 && typeof window === 'undefined') {
      console.error(`[ERROR][API][${method}]`, response);
    }
    */
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function requestGet(url = '', params = {}, local = false, token = null) {
  const qs = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  const fullUrl = local ? `${url}${qs && `?${qs}`}` : `${getHost(url)}${url}${qs && `?${qs}`}`;

  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(fullUrl, {
    method: 'GET',
    headers,
  });

  return parseJson(response, 'GET');
}



export async function requestPost(
  url = '',
  data = {},
  auth = null,
) {
  const fullUrl = `${getHost(url)}${url}`;
/*
  const headers = {
    'Content-Type': 'application/json',
  }
  if (auth) {
    headers.Authorization = `Bearer ${auth}`;
  */
  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(data),
  });
  return parseJson(response, 'POST');
}

export async function requestPut(url = '', data = {}, auth = null) {
  const fullUrl = `${getHost(url)}${url}`;

  const headers = {
    'Content-Type': 'application/json',
    mode: 'no-cors',
  }
  if (auth) {
    headers.Authorization = `Bearer ${auth}`;
  }

  const response = await fetch(fullUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return parseJson(response, 'PUT');
}


export async function requestDelete(url = '', payload = {}, auth = null) {
  const fullUrl = `${getHost(url)}${url}`;

  const headers = {
    'Content-Type': 'application/json',
  }
  if (auth) {
    headers.Authorization = `Bearer ${auth}`;
  }

  const response = await fetch(fullUrl, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(payload),
  });

  return parseJson(response, 'DELETE');
}

