import { useEffect, useState } from 'react';
import { BackendGet } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints';

interface Property {
  property_id: number;
  property_name: string;
  property_city: string;
  property_addressLine1: string;
  property_addressLine2: string;
  property_state: string | null;
  property_primaryphone_number: string;
  property_secondaryphone_number: string;
  property_roomid: number[] | null;
  property_userid: number;
  property_cancellation_policy: string;
  property_payment_policy: string;
  property_country: string;
  property_pincode: string | null;
  property_offer_percentage: number | null;
  property_latitude: number;
  property_longitude: number;
  available: number;
  property_policy: string;
  ratings_number: number;
  price_per_night: number;
  special_offer_id: string;
  admin_id: string;
  amenity: string[] | null;
  property_images: string[] | null;
  is_deleted: number;
  created_at: string;
  propertyuser_userid: string;
  propertyuser_username: string;
  propertyuser_password: string;
  propertyuser_accountHolderName: string | null;
  propertyuser_accountNo: string | null;
  propertyuser_ifscCode: string | null;
  propertyuser_bankName: string | null;
  propertyuser_panDetail: string | null;
  propertyuser_gstNumber: string | null;
}

export interface PropertyApiResponse {
  responseData: {
    message: Property[];
  };
}

export interface PropertySingleHookResult {
  loading: boolean;
  data: Property; 
  error: Error | null;
  fetchProperty: () => Promise<void>;
}

const usePropertySingle = (id: string): PropertySingleHookResult => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null); 
  const [error, setError] = useState<Error | null>(null);


  const fetchProperty = async () => {
    try {
      const data = await BackendGet<PropertyApiResponse>(`${ENDPOINTS.PROPERTY.GET}/${id}`);
      if(data.success){
        setData(data.responseData['message'][0])
      }
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  return { loading, data, error, fetchProperty };
};

export default usePropertySingle;
