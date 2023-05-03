import axios from "axios";
import { all, delay, put } from "redux-saga/effects";

import {LOG_IN_SUCCESS} from "../reducers/user";

function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action){
    try{
        console.log('saga logIn');
        // const result = yield call(logInAPI);
        yield delay(100);
        yield put({
          type: LOG_IN_SUCCESS,
          data: action.data,
        })
    }
}

export default function* userSaga() {
  yield all([]);
}
