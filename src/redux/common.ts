export declare interface ReduxAction<T1, T2 = object> {
  type: string;
  payload: T1;
  additional?: T2;
}
