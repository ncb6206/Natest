import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import reducer from "../reducers";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { followersApi } from "../api/FollowersApi";
import { followingsApi } from "../api/FollowingsApi";

function getServerState() {
  return typeof document !== "undefined"
    ? JSON.parse(String(document.querySelector("#__NEXT_DATA__")?.textContent))?.props.pageProps
        .initialState
    : undefined;
}
const serverState = getServerState();
console.log("serverState", serverState);

const makeStore = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(followersApi.middleware, followingsApi.middleware),
    preloadedState: serverState, // SSR
  });

const store = makeStore();
setupListeners(store.dispatch);

export default createWrapper(makeStore);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
