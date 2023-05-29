import { combineReducers } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store/configureStore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import userSlice from "./user";
import postSlice from "./post";
import { followersApi } from "../api/FollowersApi";
import { followingsApi } from "../api/FollowingsApi";

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
  [followersApi.reducerPath]: followersApi.reducer,
  [followingsApi.reducerPath]: followingsApi.reducer,
});

export default rootReducer;

// useDispatch는 thunkAction에 대해서 타입에러를 발생시키므로 커스터 마이징해서 사용합니다.
export const useAppDispatch: () => AppDispatch = useDispatch;
// useSelector를 사용할 경우, 매번 state의 타입을 지정해줘야 하기 때문에 커스터 마이징해서 사용합니다.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
