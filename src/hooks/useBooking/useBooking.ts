import { useEffect, useState } from 'react'
import { BackendGet } from '@/components/services/BackendServices'
import { ENDPOINTS } from '@/components/lang/EndPoints'
import { BookingT } from '@/modals/dashboard/booking/common/booking.types'

interface BookingListHookResult {
  loading: boolean
  data: BookingT[]
  bookingHashMap: { [key: string]: BookingT }
  error: Error | null
  getBookingData: () => void
}

const useBookingData = (): BookingListHookResult => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<BookingT[]>([])
  const [bookingHashMap, setBookingHashMap] = useState<{ [key: string]: BookingT }>({})
  const [error, setError] = useState<Error | null>(null)

  const fetchBookingList = async () => {
    try {
      const response = await BackendGet(ENDPOINTS.BOOKING.GET)
      if (response.success) {
        const dataList = response['responseData']['message']
        setData(dataList)
        setLoading(false)
        const hashMap = {} as any
        dataList.forEach((booking: BookingT) => {
          hashMap[booking.booking_id.toString()] = booking
        })
        setBookingHashMap(hashMap)
      } else {
        setLoading(false)
      }
    } catch (error) {
      setError(error as Error)
      setLoading(false)
    }
  }

  const getBookingData = () => {
    setLoading(true)
    fetchBookingList()
  }

  useEffect(() => {
    fetchBookingList()
  }, [])

  return { loading, data, bookingHashMap, error, getBookingData }
}

export default useBookingData
