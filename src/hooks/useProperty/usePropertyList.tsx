import { useEffect, useState } from 'react';

import { BackendGet } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints'; // Define EndpointType based on your actual endpoint structure
import { PropertyDataT } from '@/modals/dashboard/property/common/property.types';
import { useDispatch } from 'react-redux';
import { PROPERTY_ACTION } from '@/redux/action-types';
import { PROPERTY_ACTIONS } from '@/redux';





interface PropertyApiResponse {
  responseData: {
    message: any;
  };
  // Add other properties if needed
}

interface PropertyListHookResult {
  loading: boolean;
  data: PropertyDataT[];
  error: Error | null;
}

const usePropertyList = (): PropertyListHookResult => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PropertyDataT[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const dispatch=useDispatch();
  const fetchPropertyList = async () => {
    try {
      const data = await BackendGet<PropertyApiResponse>(ENDPOINTS.PROPERTY.GET);

      if (typeof data === 'object' && data !== null) {
        const dataMessageWithAddress = data.responseData['message'].map((d:any) => ({
          ...d,
          address: {
            addressLine1: d.addressLine1 || '',
            addressLine2: d.addressLine2 || ''
          }
        }));

        setData(dataMessageWithAddress);
        dispatch(PROPERTY_ACTIONS.setPropertyData(dataMessageWithAddress))
        setLoading(false);
      }
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyList();
  }, []);
  
  return { loading, data, error };
};

export default usePropertyList;