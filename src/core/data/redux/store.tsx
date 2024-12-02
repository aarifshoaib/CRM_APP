import { configureStore } from '@reduxjs/toolkit';
import api from '../../../store/middleware/api';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import slice from './commonSlice';


const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, slice);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(api)
});

const persistor = persistStore(store);

export { store, persistor };