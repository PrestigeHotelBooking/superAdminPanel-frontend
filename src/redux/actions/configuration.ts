import { ConfigurationT } from '@/hooks/useConfigurationData/useConfigurationData'
import { CONFIGURATION_ACTIONS_TYPE } from '../action-types/configuration'

export const setConfigurationData = (payload: ConfigurationT[]) => ({
  type: CONFIGURATION_ACTIONS_TYPE.SET_CONFIGURATION,
  payload,
})

export const CONFIGURATION_ACTIONS = {
  setConfigurationData,
}
