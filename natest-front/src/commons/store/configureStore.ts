import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers";
import { createWrapper } from "next-redux-wrapper";

function getServerState() {
  return typeof document !== "undefined"
    ? JSON.parse(document.querySelector("#__NEXT_DATA__").textContent)?.props.pageProps.initialState
    : undefined;
}
const serverState = getServerState();
console.log("serverState", serverState);

const makeStore = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState: serverState, // SSR
  });

const store = makeStore();

export default createWrapper(makeStore);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
