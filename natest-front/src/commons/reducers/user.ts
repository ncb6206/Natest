import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api as axios } from "./axios";
import { HYDRATE } from "next-redux-wrapper";
import { IMainPost } from "./post";

export interface IMe {
  email: string;
  id: number;
  nickname: string;
  Posts: IMainPost[];
  Followings: Array<{
    id: number;
    nickname?: string;
    Follow?: Array<{
      createdAt: string;
      updatedAt: string;
      FollowingId: string;
      FollowerId: string;
    }>;
  }>;
  Followers: Array<{
    id: number;
    nickname?: string;
    Follow?: Array<{
      createdAt: string;
      updatedAt: string;
      FollowingId: string;
      FollowerId: string;
    }>;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface ILoadUserInfoData {
  email: string;
  id: number;
  nickname: string;
  Posts: number;
  Followings: number;
  Followers: number;
  createdAt: string;
  updatedAt: string;
}

export interface IUserState {
  loadMyInfoLoading: boolean; // 유저 정보 가져오기 시도중
  loadMyInfoDone: boolean;
  loadMyInfoError: any;
  loadUserLoading: boolean;
  loadUserDone: boolean;
  loadUserError: any;
  logInLoading: boolean; // 로그인 시도중
  logInDone: boolean;
  logInError: any;
  logOutLoading: boolean; // 로그아웃 시도중
  logOutDone: boolean;
  logOutError: any;
  signUpLoading: boolean; // 회원가입 시도중
  signUpDone: boolean;
  signUpError: any;
  changeNicknameLoading: boolean; // 닉네임 변경 시도중
  changeNicknameDone: boolean;
  changeNicknameError: any;
  followLoading: boolean; // 팔로우 시도중
  followDone: boolean;
  followError: any;
  unfollowLoading: boolean; // 언팔로우 시도중
  unfollowDone: boolean;
  unfollowError: any;
  loadFollowingsLoading: boolean;
  loadFollowingsDone: boolean;
  loadFollowingsError: any;
  loadFollowersLoading: boolean;
  loadFollowersDone: boolean;
  loadFollowersError: any;
  removeFollowerLoading: boolean;
  removeFollowerDone: boolean;
  removeFollowerError: any;
  me: IMe | null;
  userInfo: ILoadUserInfoData | null;
}

export const initialState: IUserState = {
  loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserLoading: false, // 유저 정보 가져오기 시도중
  loadUserDone: false,
  loadUserError: null,
  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: null,
  unfollowLoading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  me: null,
  userInfo: null,
};

export type IUserReducerState = typeof initialState;

//prettier-ignore
export const logInAPI = createAsyncThunk("user/loginAPI", async (data: { email: string; password: string }) => {
  return await axios.post("/user/login", data).then((response) => response.data);
});

//prettier-ignore
export const removeFollowerAPI = createAsyncThunk("user/removeFollowerAPI", async (data: number) => {
  return await axios.delete(`/user/follower/${data}`).then((response) => response.data);
});

//prettier-ignore
export const loadFollowingsAPI = createAsyncThunk("user/loadFollowingsAPI", async (page: number) => {
  return await axios.get(`/user/followings?page=${page}`).then((response) => response.data);
});

export const loadFollowersAPI = createAsyncThunk("user/loadFollowersAPI", async (page: number) => {
  return await axios.get(`/user/followers?page=${page}`).then((response) => response.data);
});

export const loadMyInfoAPI = createAsyncThunk("user/loadMyInfoAPI", async () => {
  return await axios.get("/user").then((response) => response.data);
});

export const loadUserAPI = createAsyncThunk("user/loadUserAPI", async (data: number) => {
  return await axios.get(`/user/${data}`).then((response) => response.data);
});

export const followAPI = createAsyncThunk("user/followAPI", async (data: number) => {
  return await axios.patch(`/user/${data}/follow`).then((response) => response.data);
});

export const unfollowAPI = createAsyncThunk("user/unfollowAPI", async (data: number) => {
  return await axios.delete(`/user/${data}/follow`).then((response) => response.data);
});

export const logoutAPI = createAsyncThunk("user/logoutAPI", async () => {
  return await axios.post(`/user/logout`).then((response) => response.data);
});

//prettier-ignore
export const signupAPI = createAsyncThunk("user/signupAPI", async (data: { email: string; nickname: string; password: string }) => {
  return await axios.post(`/user`, data).then((response) => response.data);
});

//prettier-ignore
export const changeNicknameAPI = createAsyncThunk("user/changeNicknameAPI", async (data: string) => {
  return await axios.patch(`/user/nickname`, { nickname: data }).then((response) => response.data);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addPostToMeAPI(draft, action) {
      draft.me && draft.me.Posts.unshift({ id: action.payload });
    },
    removePostOfMeAPI(draft, action) {
      draft.me && (draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.payload));
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase([HYDRATE], (draft: any, action: PayloadAction<any>) => ({
        ...draft,
        ...action.payload.user,
      }))
      .addCase(logInAPI.pending, (draft, action) => {
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
      })
      .addCase(logInAPI.fulfilled, (draft, action) => {
        draft.logInLoading = false;
        draft.me = action.payload;
        draft.logInDone = true;
      })
      .addCase(logInAPI.rejected, (draft, action) => {
        draft.logInLoading = false;
        draft.logInError = action.error.message;
      })
      .addCase(removeFollowerAPI.pending, (draft, action) => {
        draft.removeFollowerLoading = true;
        draft.removeFollowerError = null;
        draft.removeFollowerDone = false;
      })
      .addCase(removeFollowerAPI.fulfilled, (draft, action) => {
        draft.removeFollowerLoading = false;
        draft.me &&
          (draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.payload.UserId));
        draft.removeFollowerDone = true;
      })
      .addCase(removeFollowerAPI.rejected, (draft, action) => {
        draft.removeFollowerLoading = false;
        draft.removeFollowerError = action.error.message;
      })
      .addCase(loadFollowingsAPI.pending, (draft, action) => {
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsError = null;
        draft.loadFollowingsDone = false;
      })
      .addCase(loadFollowingsAPI.fulfilled, (draft, action) => {
        draft.loadFollowingsLoading = false;
        draft.me && (draft.me.Followings = action.payload);
        draft.loadFollowingsDone = true;
      })
      .addCase(loadFollowingsAPI.rejected, (draft, action) => {
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error.message;
      })
      .addCase(loadFollowersAPI.pending, (draft, action) => {
        draft.loadFollowersLoading = true;
        draft.loadFollowersError = null;
        draft.loadFollowersDone = false;
      })
      .addCase(loadFollowersAPI.fulfilled, (draft, action) => {
        draft.loadFollowersLoading = false;
        draft.me && (draft.me.Followers = action.payload);
        draft.loadFollowersDone = true;
      })
      .addCase(loadFollowersAPI.rejected, (draft, action) => {
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error.message;
      })
      .addCase(loadMyInfoAPI.pending, (draft, action) => {
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
      })
      .addCase(loadMyInfoAPI.fulfilled, (draft, action) => {
        draft.loadMyInfoLoading = false;
        draft.me = action.payload;
        draft.loadMyInfoDone = true;
      })
      .addCase(loadMyInfoAPI.rejected, (draft, action) => {
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error.message;
      })
      .addCase(loadUserAPI.pending, (draft, action) => {
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
      })
      .addCase(loadUserAPI.fulfilled, (draft, action) => {
        draft.loadUserLoading = false;
        draft.userInfo = action.payload;
        draft.loadUserDone = true;
      })
      .addCase(loadUserAPI.rejected, (draft, action) => {
        draft.loadUserLoading = false;
        draft.loadUserError = action.error.message;
      })
      .addCase(followAPI.pending, (draft, action) => {
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
      })
      .addCase(followAPI.fulfilled, (draft, action) => {
        draft.followLoading = false;
        draft.me && draft.me.Followings.push({ id: action.payload.UserId });
        draft.followDone = true;
      })
      .addCase(followAPI.rejected, (draft, action) => {
        draft.followLoading = false;
        draft.followError = action.error.message;
      })
      .addCase(unfollowAPI.pending, (draft, action) => {
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
      })
      .addCase(unfollowAPI.fulfilled, (draft, action) => {
        draft.unfollowLoading = false;
        draft.me &&
          (draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.payload.UserId));
        draft.unfollowDone = true;
      })
      .addCase(unfollowAPI.rejected, (draft, action) => {
        draft.unfollowLoading = false;
        draft.unfollowError = action.error.message;
      })
      .addCase(logoutAPI.pending, (draft, action) => {
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
      })
      .addCase(logoutAPI.fulfilled, (draft, action) => {
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
      })
      .addCase(logoutAPI.rejected, (draft, action) => {
        draft.logOutLoading = false;
        draft.logOutError = action.error.message;
      })
      .addCase(signupAPI.pending, (draft, action) => {
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
      })
      .addCase(signupAPI.fulfilled, (draft, action) => {
        draft.signUpLoading = false;
        draft.signUpDone = true;
      })
      .addCase(signupAPI.rejected, (draft, action) => {
        draft.signUpLoading = false;
        draft.signUpError = action.error.message;
      })
      .addCase(changeNicknameAPI.pending, (draft, action) => {
        draft.changeNicknameLoading = true;
        draft.changeNicknameError = null;
        draft.changeNicknameDone = false;
      })
      .addCase(changeNicknameAPI.fulfilled, (draft, action) => {
        draft.me && (draft.me.nickname = action.payload.nickname);
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
      })
      .addCase(changeNicknameAPI.rejected, (draft, action) => {
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error.message;
      })
      .addDefaultCase((draft) => draft),
});

export default userSlice;
