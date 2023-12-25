import {
  authReducerI,
  entitiesReducerI,
  FpTableReducerI,
  profileDataI,
  teamsDataReducerI,
  usersDataReducerI,
} from '../../redux';
import { GlobalReducerI } from './globalReducer';

declare interface Selector {
  auth: authReducerI;
  global: GlobalReducerI;
  profileData: profileDataI;
  entities: entitiesReducerI;
  teamsData: teamsDataReducerI;
  usersData: usersDataReducerI;
  fpTableData: FpTableReducerI;
}
