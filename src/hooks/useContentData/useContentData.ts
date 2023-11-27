import { useEffect, useState } from 'react';
import { BackendGet } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints';

export interface ContentT {
  content_id: number;
  content_title: string;
  content: string;
  content_image: string;
}

interface ContentListHookResult {
  loading: boolean;
  data: ContentT[];
  error: Error | null;
  getContentData: () => void;
  dataMap: Record<number, ContentT>;
}

const useContentData = (): ContentListHookResult => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ContentT[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [dataMap, setDataMap] = useState<Record<number, ContentT>>({});

  const fetchContentList = async () => {
    try {
      const response = await BackendGet(ENDPOINTS.CONTENT.GET);
      if (response.success) {
        const dataList = response['responseData']['message'];
        setData(dataList);
        const contentDataMap = dataList.reduce(
          (acc: any, content: ContentT) => {
            acc[content.content_id] = content;
            return acc;
          },
          {} as Record<number, ContentT>,
        );

        setDataMap(contentDataMap);

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };

  const getContentData = () => {
    setLoading(true);
    fetchContentList();
  };

  useEffect(() => {
    fetchContentList();
  }, []);

  return { loading, data, dataMap, error, getContentData };
};

export default useContentData;
