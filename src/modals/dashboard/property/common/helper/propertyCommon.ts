import { OptionT } from '@/components/common/PrSelect/PrSelect'

export const propertySearchFilterOption: OptionT[] = [
  {
    label: 'Property Name',
    value: 'property_name',
  },
  {
    label: 'Address 1',
    value: 'property_address1',
  },
  {
    label: 'Address 2',
    value: 'property_address2',
  },
]

export const propertyDateFilterOption: OptionT[] = [
  {
    label: 'Joined Date',
    value: 'created_at',
  },
]
