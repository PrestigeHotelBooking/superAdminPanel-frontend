import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { CONSTANTS } from '@/modals/common/constants';
import { BackendGet } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints';


async function isUserAuthenticated(): Promise<boolean> {
  const userToken = Cookies.get(CONSTANTS.STORAGE_KEYS.TOKEN);
  const refreshToken=Cookies.get(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);

  if (userToken) {
    const decoded = jwtDecode(userToken) as { exp: number | undefined };
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const check= !!decoded.exp && decoded.exp > currentTimeInSeconds;
    if(!check && refreshToken){
      const decoded = jwtDecode(refreshToken) as { exp: number | undefined };
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const checkingExpiry=!!decoded.exp && decoded.exp > currentTimeInSeconds;
      if(!checkingExpiry){
        const addRefreshToken=await BackendGet(`${ENDPOINTS.LOGIN.NEW_TOKEN}/${refreshToken}`);
        if(addRefreshToken.success){
          const {responseData}=addRefreshToken;
          Cookies.set(CONSTANTS.STORAGE_KEYS.TOKEN,responseData['token']);
          return true;
        }
        return false;
      }
      return false;
    }
  }
  return false;
}


export default function privateRoute<T>(WrappedComponent: any) {
  return (props: T) => {

    const router = useRouter();

    console.log(!isUserAuthenticated());
    useEffect(() => {
      if (!isUserAuthenticated()) {
        Cookies.remove('x-access-token');
        router.push('/signin');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}
