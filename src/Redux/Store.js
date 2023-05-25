import {configureStore} from '@reduxjs/toolkit';
import todoSlice from './Slices';

const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export default store;
