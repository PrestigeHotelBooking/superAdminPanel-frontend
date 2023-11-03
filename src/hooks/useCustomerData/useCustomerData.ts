import { useEffect, useState } from 'react';

import { BackendGet } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints'; // Define EndpointType based on your actual endpoint structure
import { PropertyDataT } from '@/modals/dashboard/property/common/components/property.types';
import { useDispatch } from 'react-redux';
import { CUSTOMER_ACTIONS, PROPERTY_ACTIONS } from '@/redux';
import { CustomerDataT } from '@/modals/dashboard/user/common/userCommon';





interface CustomerApiResponse {
  responseData: {
    message: any;
  };
  // Add other properties if needed
}

interface CustomerListHookResult {
  loading: boolean;
  data: CustomerDataT[];
  error: Error | null;
  getCustomerData:()=>void;
}

const useCustomerData = (): CustomerListHookResult => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CustomerDataT[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const dispatch=useDispatch();
  const fetchCustomerList = async () => {
    try {
      const data = await BackendGet(ENDPOINTS.USER.GET_USER);
        if(data.success){
            const dataList=data['responseData']['message'];

            setData(dataList);
            dispatch(CUSTOMER_ACTIONS.setCustomerData(dataList))
            setLoading(false);
        }
        else{
          setLoading(false); 
        }
      
      
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };
  const getCustomerData = () => {
    setLoading(true); // Set loading to true before fetching data
    fetchCustomerList();
  };


  useEffect(() => {
    fetchCustomerList();
  }, []);


  return { loading, data, error,getCustomerData };
};

export default useCustomerData;


