import { API_ENDPOINT } from "@/Global/api/api";

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method: HttpMethod;
  headers: {
    'Content-Type': 'application/json';
  };
  body?: string;
}

interface ApiError {
  message: string;
}

interface ApiResponse<T> {
  success: boolean;
  responseData?: any;
  errorData?: ApiError;
}

const callApi = async <T>(method: HttpMethod, endpoint: string, data: any = null): Promise<ApiResponse<T>> => {
  const url = API_ENDPOINT + endpoint;

  const requestOptions: RequestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const responseData: T = await response.json();
      return { success: true, responseData };
    } else {
      const errorData: ApiError = await response.json();
      throw new Error(`API request failed: ${errorData.message}`);
    }
  } catch (error) {
    throw error; // Re-throw the caught error
  }
};

const BackendPost = async <T>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
  try {
    return await callApi<T>('POST', endpoint, data);
  } catch (error) {
    console.error(`Error in POST request to ${endpoint}:`, error);
    throw error;
  }
};

const BackendGet = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    return await callApi<T>('GET', endpoint);
  } catch (error) {
    console.error(`Error in GET request to ${endpoint}:`, error);
    throw error;
  }
};

const BackendPatch = async <T>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
  try {
    return await callApi<T>('PATCH', endpoint, data);
  } catch (error) {
    console.error(`Error in PATCH request to ${endpoint}:`, error);
    throw error;
  }
};

const BackendDelete = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    return await callApi<T>('DELETE', endpoint);
  } catch (error) {
    console.error(`Error in DELETE request to ${endpoint}:`, error);
    throw error;
  }
};

export { BackendPost, BackendGet, BackendPatch, BackendDelete };
