import { PropertyDataT } from '@/modals/dashboard/property/common/components/property.types'
import { cloneDeep } from 'lodash'
import { PROPERTY_ACTION } from '../action-types/property'
import { ReduxAction } from '../common'

export type PropertyReducerState = {
  data: PropertyDataT[]
}

const initialPropertyData: PropertyReducerState = {
  data: [],
}

export const propertyReducer = (state = initialPropertyData, action: ReduxAction<any>): PropertyReducerState => {
  switch (action.type) {
    case PROPERTY_ACTION.SET_PROPERTY:
      return { ...state, data: action.payload }
    default:
      return cloneDeep(state)
  }
}
