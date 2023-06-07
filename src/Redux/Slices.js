import {createSlice} from '@reduxjs/toolkit';

export const todosSlice = createSlice({
  name: 'todo',
  initialState: {
    _name: 'abdullah',
    accessToken: '',
    profile: {},
    testing: 'testing',
    docs: [],
    wishList: [],
  },

  reducers: {
    addItem(state = null, action) {
      const value = action.payload;

      state.docs.push(value);
      //    console.log(state.docs)
    },
    getItem(state = null, action) {
      console.log('getItem');
    },
    reduxSetAccessToken(state = null, action) {
      state.accessToken = action.payload;
    },
    reduxRemoveAccessToken(state = null) {
      state.accessToken = '';
    },
    setProfileData(state = null, action) {
      state.profile = {...action.payload};
    },
    removeProfileData(state = 0) {
      state.profile = {};
    },
  },
});

export const {
  addItem,
  getItem,
  reduxSetAccessToken,
  reduxRemoveAccessToken,
  setProfileData,
  removeProfileData,
} = todosSlice.actions;
export default todosSlice.reducer;
