import { API_ENDPOINT } from "@/Global/api/api";
import { CONSTANTS } from "@/modals/common/constants";
import Cookies from "js-cookie";
type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method: HttpMethod;
  headers:any;
  body?: string;
}

interface ApiError {
  message: string;
}

interface ApiResponse<T> {
  success: boolean;
  responseData?: any;
  errorData?: ApiError;
  statusCode?:number;
}

const callApi = async <T>(
  method: HttpMethod,
  endpoint: string,
  data: any = null,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> => {
  const url = API_ENDPOINT + endpoint;

  const requestOptions: RequestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  const accessToken = Cookies.get(CONSTANTS.STORAGE_KEYS.TOKEN);
  if (accessToken) {
    requestOptions.headers[CONSTANTS.STORAGE_KEYS.TOKEN] = `${accessToken}`;
  }

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    if (responseData.success) {
    
      return { success: true, responseData: responseData, statusCode: responseData.statusCode };
    } else {
      return { success: false, errorData: responseData.error };
    }
  } catch (error) {
    // Handle network errors and server errors here
    console.error(`Error in ${method} request to ${endpoint}:`, error);
    return { success: false, errorData: { message: 'Server is not running' } };
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
