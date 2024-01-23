import { createSlice } from "@reduxjs/toolkit";
import { Node } from "../../utils/Node";

export const navigateSlice = createSlice({
  name: "navigate",
  initialState: {
    currentPage: new Node(`${window.location.pathname}`),
  },
  reducers: {
    next: (state, action) => {
      if (state.currentPage === null)
        state.currentPage = new Node(action.payload);
      else if (state.currentPage.next !== null) {
        state.currentPage = state.currentPage.next;
      } else {
        const newNode = new Node(action.payload);
        state.currentPage.next = newNode;
        newNode.prev = state.currentPage;
        state.currentPage = newNode;
      }
    },
    back: (state, action) => {
      if (state.currentPage === null) return;
      state.currentPage = state.currentPage.prev;
    },
    link: (state, action) => {
       const newNode = new Node(action.payload);
       state.currentPage.next = newNode;
       newNode.prev = state.currentPage;
       state.currentPage = newNode;
    }
  },
});
export const { next, back, link } = navigateSlice.actions;
export default navigateSlice.reducer;
