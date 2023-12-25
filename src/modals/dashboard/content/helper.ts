import { DateFilterT, SearchFilterT } from '@/modals/common/filter';
import { OptionT } from '../property/common/components/property.types';
import { ContentT } from '@/hooks/useContentData/useContentData';

export interface contentDataT {
  datePicker: DateFilterT;
  searchPicker: SearchFilterT;
  contentModalData: ContentT[];
}

export const commonDateFilterOptions: OptionT[] = [
  {
    label: 'Created At',
    value: 'created_at',
  },
  {
    label: 'Deleted At',
    value: 'deleted_at',
  },
];

export const searchFilterOptions: OptionT[] = [
  {
    label: 'Content Id',
    value: 'content_id',
  },
  {
    label: 'Content',
    value: 'content',
  },
  {
    label: 'Title',
    value: 'content_title',
  },
];

export const initialContentModal: contentDataT = {
  datePicker: {
    calendarEndDate: null,
    calendarStartDate: null,
    calenderColumn: '',
    calenderColumnOptions: commonDateFilterOptions,
  },
  searchPicker: {
    searchOption: searchFilterOptions,
    searchText: '',
    searchOptionValue: '',
  },
  contentModalData: [],
};
