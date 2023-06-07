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
      state.accessToken = null;
    },
    setProfileData(state = null, action) {
      state.profile = {...action.payload};
    },
    removeProfileData(state = 0) {
      state.profile = {};
    },
    setWishList(state = null, action) {
      state.wishList = action.payload;
    },
    AddToWishlist(state = null, action) {
      state.wishList.push(action.payload);
    },
    RemoveFromWishList(state = null, action) {
      state.wishList = state.wishList.filter(x => x != action.payload);
    },
  },
});

// Selectors
export const selectAccessToken = state => state.todo.accessToken;
export const selectProfileData = state => state.todo.profile;
export const selectWishlist = state => state.todo.wishList;

export const {
  addItem,
  getItem,
  setAccessToken,
  logoutUser,
  setProfileData,
  removeProfileData,
  setWishList,
  AddToWishlist,
  RemoveFromWishList,
} = todosSlice.actions;
export default todosSlice.reducer;
