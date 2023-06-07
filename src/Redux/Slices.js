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
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    addItem(state = null, action) {
      const value = action.payload;

      state.docs.push(value);
      //    console.log(state.docs)
    },
    getItem(state = null, action) {
      console.log('getItem');
    },
    logoutUser(state = null) {
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

// Selectors
export const selectAccessToken = state => state.todo.accessToken;
export const selectProfileData = state => state.todo.profile;

export const {
  addItem,
  getItem,
  setAccessToken,
  logoutUser,
  setProfileData,
  removeProfileData,
} = todosSlice.actions;
export default todosSlice.reducer;
