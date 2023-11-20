import { API_ENDPOINT } from "@/Global/api/api";
import Cookies from "js-cookie";
import { CONSTANTS } from "@/modals/common/constants";
type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method: HttpMethod;
  headers?: {
    'Content-Type'?: string;
    // Add your custom headers here
    'X-Access-Token'?: string;
    // More custom headers...
  };
  body?: FormData | string; // Updated the body type to accept FormData or string
}

interface ApiError {
  message: string;
}

interface ApiResponse<T> {
  success: boolean;
  responseData?: T;
  errorData?: ApiError;
}

const callApiV2 = async <T>(
  method: HttpMethod,
  endpoint: string,
  data: FormData | string = '', // Updated the default value to an empty string
  customHeaders: { [key: string]: string } = {} // You can pass custom headers as an argument
): Promise<ApiResponse<T>> => {
  const url = API_ENDPOINT + endpoint;

  const requestOptions: RequestOptions = {
    method: method,
    headers: {
      ...customHeaders, // Merge custom headers with default headers
    },
    body: data, // Assign the data directly to the body
  };


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

const BackendPostV2 = async <T>(
  endpoint: string,
  data: FormData,
  customHeaders: { [key: string]: string } = {}
): Promise<ApiResponse<T>> => {
  try {
    // Generate a unique boundary string
    const boundary = '----your-unique-boundary-string-here';
    const accessToken = Cookies.get(CONSTANTS.STORAGE_KEYS.TOKEN);
    const requestOptions: RequestOptions = {
      method: 'POST',
      headers: {
        'X-Access-Token':`${accessToken}`
      },
      body: data,
    };
    

    const response = await fetch(API_ENDPOINT + endpoint, requestOptions);

    if (response.ok) {
      const responseData: T = await response.json();
      return { success: true, responseData };
    } else {
      const errorData: ApiError = await response.json();
      throw new Error(`API request failed: ${errorData.message}`);
    }
  } catch (error) {
    console.error(`Error in POST request to ${endpoint}:`, error);
    throw error;
  }
};



const BackendPatchV2 = async <T>(
  endpoint: string,
  data: FormData | string = '',
  customHeaders: { [key: string]: string } = {}
): Promise<ApiResponse<T>> => {
  try {
    // Generate a unique boundary string
    const boundary = '----your-unique-boundary-string-here';
    const accessToken = Cookies.get(CONSTANTS.STORAGE_KEYS.TOKEN);
    const requestOptions: RequestOptions = {
      method: 'PATCH',
      headers: {
        'X-Access-Token': `${accessToken}`,
        ...customHeaders,
      },
      body: data,
    };

    const response = await fetch(API_ENDPOINT + endpoint, requestOptions);

    if (response.ok) {
      const responseData: T = await response.json();
      return { success: true, responseData };
    } else {
      const errorData: ApiError = await response.json();
      throw new Error(`API request failed: ${errorData.message}`);
    }
  } catch (error) {
    console.error(`Error in PATCH request to ${endpoint}:`, error);
    throw error;
  }
};

export { BackendPostV2, BackendPatchV2 };
