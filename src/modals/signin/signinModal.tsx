import React, { useState, useRef } from 'react';
import Image from 'next/image';
import prestigeImage from '../../assets/signin/LoginImage.png';
import PrInputField from '@/components/common/PrInputField/PrInputField';
import PrLabel from '@/components/common/PrLabel/PrLabel';
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import useEnterNavigation from '@/hooks/useEnterNavigation/useEnterNavigation';
import adminDetail from '../common/adminDetails.json';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface UserLoginT {
    email: string;
    password: string;
    loading:boolean;
}

const initialUserLogin: UserLoginT = {
    email: '',
    password: '',
    loading:false
};

function SignInModal() {
    const [loginData, setLoginData] = useState<UserLoginT>(initialUserLogin);
    const emailInputRef = useRef<HTMLInputElement | null>(null);
    const passwordInputRef = useRef<HTMLInputElement | null>(null);
    const router=useRouter();

    const handleFieldChange = <K extends keyof UserLoginT>(field: K,e:UserLoginT[K]) => {
        setLoginData(prevLoginData => ({
            ...prevLoginData,
            [field]: e
        }));
    };

    const handleLogin = () => {
        handleFieldChange('loading',true);
        const validUser=adminDetail.find((d)=>{ if(d.email===loginData.email && d.password===loginData.password){
            return true;
        } })
   
        if(validUser){
            const auth='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
            Cookies.set('x-access-token', auth);
            router.push('/dashboard')
        }
        handleFieldChange('loading',false);
    };

    useEnterNavigation([emailInputRef, passwordInputRef], handleLogin);

    return (
        <div className="flex w-full h-[100vh] bg-white">
            <div className='flex-1 flex justify-center items-center'> 
                <div className="w-full p-48">
                    <PrLabel text={"Welcome Back !"} className="text-[32px] text-blue-700 "></PrLabel>
                    <div className="mt-10">
                        <PrInputField
                            label={"Email"}
                            className="w-full"
                            type='email'
                            value={loginData.email}
                            onChange={(e)=>handleFieldChange('email',e.target.value)}
                            ref={emailInputRef}
                        />
                        <PrInputField
                            label={"Password"}
                            className="w-full"
                            type='password'
                            value={loginData.password}
                            onChange={(e)=>handleFieldChange('password',e.target.value)}
                            ref={passwordInputRef}
                        />
                    </div>
                    <PrButtonV2
                        label={"LOGIN"}
                        className="w-full h-[4rem] mt-6 rounded-md"
                        onClick={handleLogin}
                    />
                </div>
            </div>
            <div className="flex-1 flex">
                <div className="relative w-full h-full">
                    <Image src={prestigeImage} alt="hotel" layout="fill" objectFit="cover" />
                </div>
            </div>
        </div>
    );
}

export default SignInModal;
