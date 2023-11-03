import { useEffect, useState } from 'react';

import { BackendGet } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints'; // Define EndpointType based on your actual endpoint structure
import { useDispatch } from 'react-redux';
import { CUSTOMER_ACTIONS, PROPERTY_ACTIONS } from '@/redux';
import { CustomerDataT, SingleCustomerBooking } from '@/modals/dashboard/user/common/userCommon';





interface CustomerApiResponse {
  responseData: {
    message: any;
  };
  // Add other properties if needed
}

interface CustomerListHookResult {
  loading: boolean;
  data: SingleCustomerBooking[];
  error: Error | null;

}

const useSingleCustomerBookingData = (id:string): CustomerListHookResult => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SingleCustomerBooking[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const dispatch=useDispatch();
  const fetchCustomerList = async () => {
    try {
      const data = await BackendGet(`${ENDPOINTS.USER.SINGLE_CUSTOMER_BOOKING}/${id}`);
        if(data.success){
            const dataList=data['responseData']['message'];
            setData(dataList);
            // dispatch(CUSTOMER_ACTIONS.setCustomerData(dataList))
            setLoading(false);
        }
      
      
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCustomerList();
  }, []);


  return { loading, data, error };
};

export default useSingleCustomerBookingData;
