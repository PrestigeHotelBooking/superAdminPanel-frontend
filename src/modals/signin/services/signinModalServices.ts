import { ENDPOINTS } from '@/components/lang/EndPoints';
import { BackendPost } from '@/components/services/BackendServices';
import { CONSTANTS } from '@/modals/common/constants';
import Cookies from 'js-cookie';

export const SigninUserService = async (email: string, password: string) => {
  const loggedIn = await BackendPost(ENDPOINTS.LOGIN.SIGNIN, { email: email, password: password });

  if (loggedIn.success) {
    const token = loggedIn.responseData.token as string;
    const expirationTimeInMinutes = 1440;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expirationTimeInMinutes * 60 * 1000);
    Cookies.set(CONSTANTS.STORAGE_KEYS.TOKEN, token, { expires: expirationDate });
    return true;
  } else {
    return false;
  }
};
