import { useEffect, useState } from 'react';
import { BackendGet } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints';
import { OptionT } from '@/components/common/PrSelect/PrSelect';

export interface ConfigurationT {
  id: number;
  configuration_id: string;
  configuration_data: string; // Keep configuration_data as a string
  is_deleted: number;
}

interface ConfigurationApiResponse {
  responseData: {
    message: ConfigurationT[];
  };
}

interface ConfigurationHookResultT {
  loading: boolean;
  amenities: OptionT[];
  roomType: OptionT[];
  bedType: OptionT[];
  mealTypes: OptionT[];
  error: Error | null;
}

const useConfigurationData = (): ConfigurationHookResultT => {
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState<OptionT[]>([]); // Initialize as an empty array
  const [roomType, setRoomType] = useState<OptionT[]>([]); // Initialize as an empty array
  const [bedType, setBedType] = useState<OptionT[]>([]); // Initialize as an empty array
  const [mealTypes, setMealTypes] = useState<OptionT[]>([]); // Initialize as an empty array
  const [error, setError] = useState<Error | null>(null);

  const fetchConfigurationList = async () => {
    try {
      const response = await BackendGet(`${ENDPOINTS.CONFIGURATION.GET}`);
      if (response.success) {
        const allConfigurations = response['responseData']['message'];

        allConfigurations.forEach((config: ConfigurationT) => {
          switch (config.configuration_id) {
            case 'amenities':
              setAmenities(JSON.parse(config.configuration_data) as OptionT[]);
              break;
            case 'roomType':
              setRoomType(JSON.parse(config.configuration_data) as OptionT[]);
              break;
            case 'bedType':
              setBedType(JSON.parse(config.configuration_data) as OptionT[]);
              break;
            case 'mealTypes':
              setMealTypes(JSON.parse(config.configuration_data) as OptionT[]);
              break;
            default:
              // Handle other configurations if needed
              break;
          }
        });

        setLoading(false);
      } else {
        setError(new Error('Failed to fetch configuration data'));
        setLoading(false);
      }
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigurationList();
  }, []);

  return { loading, amenities, roomType, bedType, mealTypes, error };
};

export default useConfigurationData;
