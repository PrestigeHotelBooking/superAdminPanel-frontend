import { DateFilterT, SearchFilterT } from '@/modals/common/filter';
import { useEffect, useState } from 'react';

type ApiCallFunction = () => void;

type UseDataFetchResult = {
  apiCallMade: boolean;
};

export function useDateFilter(apiCallFunction: ApiCallFunction, userDetailInput: DateFilterT): UseDataFetchResult {
  const [apiCallMade, setApiCallMade] = useState(false);

  useEffect(() => {
    const hasAllValues =
      userDetailInput?.calenderColumn && userDetailInput?.calendarStartDate && userDetailInput?.calendarEndDate;
    if (!apiCallMade && hasAllValues) {
      apiCallFunction();
      setApiCallMade(true);
    } else if (!hasAllValues) {
      setApiCallMade(false);
    }
  }, [userDetailInput, apiCallFunction, apiCallMade]);

  return { apiCallMade };
}

export function useSearchFilter(apiCallFunction: ApiCallFunction, userDetailInput: SearchFilterT): UseDataFetchResult {
  const [apiCallMade, setApiCallMade] = useState(false);

  useEffect(() => {
    const hasAllValues = userDetailInput?.searchOption && userDetailInput?.searchText && userDetailInput?.searchText;
    if (!apiCallMade && hasAllValues) {
      apiCallFunction();
      setApiCallMade(true);
    } else if (!hasAllValues) {
      setApiCallMade(false);
    }
  }, [userDetailInput, apiCallFunction, apiCallMade]);

  return { apiCallMade };
}
