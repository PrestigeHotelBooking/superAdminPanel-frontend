import { ENDPOINTS } from '@/components/lang/EndPoints';
import { BackendPost } from '@/components/services/BackendServices';
import { CONSTANTS } from '@/modals/common/constants';
import Cookies from 'js-cookie';

export const SigninUserService = async (email: string, password: string) => {
  const loggedIn = await BackendPost(ENDPOINTS.LOGIN.SIGNIN, { email: email, password: password });

  if (loggedIn.success) {
    const { token, refresh_token } = loggedIn.responseData;
    Cookies.set(CONSTANTS.STORAGE_KEYS.TOKEN, token);
    Cookies.set(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, refresh_token);
    return true;
  } else {
    return false;
  }
};
