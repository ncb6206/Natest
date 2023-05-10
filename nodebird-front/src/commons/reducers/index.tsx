import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "@reduxjs/toolkit";

import user from "./user";
import post from "./post";

// (이전상태, 액션) => 다음상태
const rootReducer = (state: Record<string, unknown> = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        post,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
