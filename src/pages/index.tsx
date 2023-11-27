import PrCircularProgressIndicator from '@/components/common/Loader/PrCircularProgressIndicator'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function HomePage() {
  const userToken = Cookies.get(`x-access-token`)
  const router = useRouter()
  useEffect(() => {
    if (userToken) {
      router.push('/dashboard')
    } else {
      router.push('/signin')
    }
  }, [])

  return <PrCircularProgressIndicator />
}
