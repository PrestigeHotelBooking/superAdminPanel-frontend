import { useSelector } from 'react-redux'
import { rootReducersI } from '../root' // Define rootReducersI based on your actual root reducer structure

export const useConfigurationHook = () => {
  return useSelector((state: rootReducersI) => state.configuration.data)
}
