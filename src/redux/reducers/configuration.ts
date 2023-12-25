import { cloneDeep } from 'lodash';
import { type ReduxAction } from '../common'
import { type ConfigurationT } from '@/hooks/useConfigurationData/useConfigurationData'
import { CONFIGURATION_ACTIONS_TYPE } from '../action-types/configuration'

export interface ConfigurationReducerState {
  data: ConfigurationT[]
}

const initialPropertyData: ConfigurationReducerState = {
  data: []
};

export const configurationReducer = (
  state = initialPropertyData,
  action: ReduxAction<any>
): ConfigurationReducerState => {
  switch (action.type) {
    case CONFIGURATION_ACTIONS_TYPE.SET_CONFIGURATION:
      return { ...state, data: action.payload };
    default:
      return cloneDeep(state)
  }
}
