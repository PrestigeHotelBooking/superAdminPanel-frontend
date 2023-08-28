// store.ts
import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk'; // Import any middleware you need
import {rootReducer} from '../root'; // Import your combined reducers

// Define the type for the Redux store
export type RootState = ReturnType<typeof rootReducer>;

// Create the store with middleware
const store: Store<RootState> = createStore(rootReducer, applyMiddleware(thunk));

export default store;
