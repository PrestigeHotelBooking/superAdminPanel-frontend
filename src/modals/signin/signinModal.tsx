import React, { useState, useRef } from 'react'
import Image from 'next/image'
import prestigeImage from '../../assets/signin/LoginImage.png'
import PrInputField from '@/components/common/PrInputField/PrInputField'
import PrLabel from '@/components/common/PrLabel/PrLabel'
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2'
import useEnterNavigation from '@/hooks/useEnterNavigation/useEnterNavigation'
import { useRouter } from 'next/router'
import PrCircularProgressIndicator from '@/components/common/Loader/PrCircularProgressIndicator'
import { SigninUserService } from './services/signinModalServices'

interface UserLoginT {
  email: string
  password: string
  errorMessage: string
  loading: boolean
}

const initialUserLogin: UserLoginT = {
  email: '',
  password: '',
  loading: false,
  errorMessage: '',
}

function SignInModal() {
  const [loginData, setLoginData] = useState<UserLoginT>(initialUserLogin)
  const emailInputRef = useRef<HTMLInputElement | null>(null)
  const passwordInputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  const handleFieldChange = <K extends keyof UserLoginT>(field: K, e: UserLoginT[K]) => {
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [field]: e,
    }))
  }

  const handleLogin = async () => {
    const login = await SigninUserService(loginData.email, loginData.password)
    if (login) {
      router.push('/dashboard')
    } else {
      alert('your not a valid user')
    }
  }

  useEnterNavigation([emailInputRef, passwordInputRef], handleLogin)

  return (
    <div>
      {loginData.loading ? (
        <PrCircularProgressIndicator />
      ) : (
        <div className='flex w-full h-[100vh] bg-white'>
          <div className='flex-1 flex justify-center items-center'>
            <div className='w-full p-48'>
              <PrLabel text={'Welcome Back !'} className='text-[32px] text-blue-700 '></PrLabel>
              <div className='mt-10'>
                <PrInputField
                  label={'Email'}
                  className='w-full'
                  type='email'
                  value={loginData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  ref={emailInputRef}
                />
                <PrInputField
                  label={'Password'}
                  className='w-full'
                  type='password'
                  value={loginData.password}
                  onChange={(e) => handleFieldChange('password', e.target.value)}
                  ref={passwordInputRef}
                />
              </div>
              {loginData.errorMessage && (
                <div className=' p-4 text-red-800 font-bold'>{`🚷   ${loginData.errorMessage}`}</div>
              )}
              <PrButtonV2 label={'LOGIN'} className='w-full h-[4rem] mt-6 rounded-md' onClick={handleLogin} />
            </div>
          </div>
          <div className='flex-1 flex'>
            <div className='relative w-full h-full'>
              <Image src={prestigeImage} alt='hotel' layout='fill' objectFit='cover' />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignInModal
