import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

// Define a function to check if the user is authenticated
function isUserAuthenticated(): boolean {
  const userToken = Cookies.get('x-access-token');
  if (userToken) {
    const decoded = jwtDecode(userToken) as { exp: number | undefined };
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    return !!decoded.exp && decoded.exp > currentTimeInSeconds;
  }
  return false;
}

// Define the privateRoute HOC
export default function privateRoute<T>(WrappedComponent: any){
  return (props: T) => {
    const router = useRouter();

    useEffect(() => {
      if (!isUserAuthenticated()) {
        Cookies.remove('x-access-token')
        router.push('/signin');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}