import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "submit",
  initialState: {
    guild: { name: "none" },
    option: "blog",
    blog: [],
    image: "",
    blogOptionVisibility: "hidden"
  },
  reducers: {
    toGuild: (state, action) => {
      state.guild = action.payload;
    },
    setOption: (state, action) => {
      state.option = action.payload;
    },
    addElement: (state, action) => {
      state.blog.push(action.payload);
    },
    removeElement: (state, action) => {
      state.blog.splice(action.payload, 1);
    },
    updateElement: (state, action) => {
      state.blog[action.payload.index].value = action.payload.value;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setBlogOptionVisibility: (state, action) => {
      state.blogOptionVisibility = action.payload;
    }
  }
});

export const guildSelector = state => state.submit.guild;
export const optionSelector = state => state.submit.option;
export const blogSelector = state => state.submit.blog;
export const imageSelector = state => state.submit.image;
export const blogOptionVisibilitySelector = state =>
  state.submit.blogOptionVisibility;
export const submitActions = slice.actions;

export default slice.reducer;
