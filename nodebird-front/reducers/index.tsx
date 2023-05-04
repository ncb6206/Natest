import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import post from "./post";

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  index: (state: Record<string, unknown> = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
