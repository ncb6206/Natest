import { createSlice, createAsyncThunk, PayloadAction, current, AnyAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { api as axios } from "./axios";
import { HYDRATE } from "next-redux-wrapper";

export interface IMainPost {
  id: number;
  UserId: number;
  User: {
    id: number;
    nickname: string;
  };
  content: string;
  Images: Array<{ id: number; src: string }>;
  Comments: Array<{
    id: number;
    content: string;
    UserId: number;
    PostId: number;
    createdAt: string;
    updatedAt: string;
    User: {
      id: number;
      nickname: string;
    };
  }>;
  Likers: Array<{
    id: number;
    Like?: Array<{
      UserId: number;
      PostId: number;
      createdAt: string;
      updatedAt: string;
    }>;
  }>;
  Retweet: {
    id: number;
    UserId: number;
    content: string;
    RetweetId: number | null;
    User: { id: number; nickname: string };
    Images: Array<{ id: number; src: string }>;
    createdAt: string;
    updatedAt: string;
  } | null;
  RetweetId: number | null;
  createdAt: string;
  updatedAt: string;
}

interface IPostReducerState {
  mainPosts: IMainPost[];
  singlePost: IMainPost | null;
  imagePaths: string[];
  hasMorePosts: boolean;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: any;
  unlikePostLoading: boolean;
  unlikePostDone: boolean;
  unlikePostError: any;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: any;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: any;
  updatePostLoading: boolean;
  updatePostDone: boolean;
  updatePostError: any;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: any;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: any;
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: any;
  uploadImagesLoading: boolean;
  uploadImagesDone: boolean;
  uploadImagesError: any;
  retweetLoading: boolean;
  retweetDone: boolean;
  retweetError: any;
}

export const initialState: IPostReducerState = {
  mainPosts: [],
  singlePost: null,
  imagePaths: [],
  hasMorePosts: true,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};

//  createAsyncThunk를 사용하여 Redux에서 비동기 작업 처리
// prettier-ignore
export const loadPostsAPI = createAsyncThunk("post/loadPostsAPI", async(lastId?:number) => {
  return await axios.get(`/posts?lastId=${lastId || 0}`).then((response) => response.data);
});

// prettier-ignore
export const loadHashtagPostsAPI = createAsyncThunk("post/loadHashtagPostsAPI",async ({ lastId, tag }: { lastId?: number; tag: string }) => {
  return await axios.get(`/hashtag/${encodeURIComponent(tag)}?lastId=${lastId || 0}`).then((response) => response.data);
})

// prettier-ignore
export const loadUserPostsAPI = createAsyncThunk("post/loadUserPostsAPI", async ({ lastId, id }: { lastId?: number; id: string }) => {
  return await axios.get(`/user/${id}/posts?lastId=${lastId || 0}`).then((response) => response.data);
});

export const retweetAPI = createAsyncThunk("post/retweetAPI", async (data: number) => {
  return await axios.post(`/post/${data}/retweet`).then((response) => response.data);
});

export const uploadImageAPI = createAsyncThunk("post/uploadImageAPI", async (data: FormData) => {
  return await axios.post("/post/images", data).then((response) => response.data);
});

export const likePostAPI = createAsyncThunk("post/likePostAPI", async (data: number) => {
  return await axios.patch(`/post/${data}/like`).then((response) => response.data);
});

export const unlikePostAPI = createAsyncThunk("post/unlikePostAPI", async (data: number) => {
  return await axios.delete(`/post/${data}/like`).then((response) => response.data);
});

export const loadPostAPI = createAsyncThunk("post/loadPostAPI", async (data: number) => {
  return await axios.get(`/post/${data}`).then((response) => response.data);
});

export const addPostAPI = createAsyncThunk("post/addPostAPI", async (data: FormData) => {
  return await axios.post("/post", data).then((response) => response.data);
});

// prettier-ignore
export const updatePostAPI = createAsyncThunk( "post/upadatePostAPI", async (data: { PostId: number; content: string }) => {
  return await axios.patch(`/post/${data.PostId}`, data).then((response) => response.data);
});

// prettier-ignore
export const removePostAPI = createAsyncThunk( "post/removePostAPI", async (data: { PostId: number }) => {
  return await axios.delete(`/post/${data.PostId}`).then((response) => response.data);
});

// prettier-ignore
export const addCommentAPI = createAsyncThunk("post/addCommentAPI", async (data: { content: string; PostId: number; userId: number }) => {
  return await axios.post(`/post/${data.PostId}/comment`, data).then((response) => response.data);
});

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수 (불변성은 지키면서)
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removeImageAPI(draft, action) {
      draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (draft, action: AnyAction) => ({
        ...draft,
        ...action.payload.post,
      }))
      .addCase(retweetAPI.pending, (draft) => {
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
      })
      .addCase(retweetAPI.fulfilled, (draft, action) => {
        draft.retweetLoading = false;
        draft.retweetDone = true;
        draft.mainPosts.unshift(action.payload);
      })
      .addCase(retweetAPI.rejected, (draft, action) => {
        draft.retweetLoading = false;
        draft.retweetError = action.error.message;
      })
      .addCase(uploadImageAPI.pending, (draft) => {
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
      })
      .addCase(uploadImageAPI.fulfilled, (draft, action) => {
        draft.imagePaths = draft.imagePaths.concat(action.payload);
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
      })
      .addCase(uploadImageAPI.rejected, (draft, action) => {
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error.message;
      })
      .addCase(likePostAPI.pending, (draft) => {
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
      })
      .addCase(likePostAPI.fulfilled, (draft, action) => {
        const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
        post?.Likers.push({ id: action.payload.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
      })
      .addCase(likePostAPI.rejected, (draft, action) => {
        draft.likePostLoading = false;
        draft.likePostError = action.error.message;
      })
      .addCase(unlikePostAPI.pending, (draft) => {
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
      })
      .addCase(unlikePostAPI.fulfilled, (draft, action) => {
        const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
        post && (post.Likers = post?.Likers.filter((v) => v.id !== action.payload.UserId));
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
      })
      .addCase(unlikePostAPI.rejected, (draft, action) => {
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error.message;
      })
      .addCase(loadPostAPI.pending, (draft) => {
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
      })
      .addCase(loadPostAPI.fulfilled, (draft, action) => {
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.payload;
      })
      .addCase(loadPostAPI.rejected, (draft, action) => {
        draft.loadPostLoading = false;
        draft.loadPostError = action.error.message;
      })
      .addCase(loadPostsAPI.pending, (draft) => {
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
      })
      .addCase(loadPostsAPI.fulfilled, (draft, action) => {
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.payload);
        draft.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadPostsAPI.rejected, (draft, action) => {
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error.message;
      })
      .addCase(loadUserPostsAPI.pending, (draft) => {
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
      })
      .addCase(loadUserPostsAPI.fulfilled, (draft, action) => {
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.payload);
        draft.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadUserPostsAPI.rejected, (draft, action) => {
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error.message;
      })
      .addCase(loadHashtagPostsAPI.pending, (draft) => {
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
      })
      .addCase(loadHashtagPostsAPI.fulfilled, (draft, action) => {
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.payload);
        draft.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadHashtagPostsAPI.rejected, (draft, action) => {
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error.message;
      })
      .addCase(addPostAPI.pending, (draft) => {
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
      })
      .addCase(addPostAPI.fulfilled, (draft, action) => {
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.payload);
        draft.imagePaths = [];
      })
      .addCase(addPostAPI.rejected, (draft, action) => {
        draft.addPostLoading = false;
        draft.addPostError = action.error.message;
      })
      .addCase(updatePostAPI.pending, (draft) => {
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
      })
      .addCase(updatePostAPI.fulfilled, (draft, action) => {
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
        post && (post.content = action.payload.content);
      })
      .addCase(updatePostAPI.rejected, (draft, action) => {
        draft.updatePostLoading = false;
        draft.updatePostError = action.error.message;
      })
      .addCase(removePostAPI.pending, (draft) => {
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
      })
      .addCase(removePostAPI.fulfilled, (draft, action) => {
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.payload.PostId);
      })
      .addCase(removePostAPI.rejected, (draft, action) => {
        draft.removePostLoading = false;
        draft.removePostError = action.error.message;
      })
      .addCase(addCommentAPI.pending, (draft) => {
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
      })
      .addCase(addCommentAPI.fulfilled, (draft, action) => {
        const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
        console.log("draft", draft, "post", post, "Comments", post?.Comments);
        post?.Comments.unshift(action.payload);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
      })
      .addCase(addCommentAPI.rejected, (draft, action) => {
        draft.addCommentLoading = false;
        draft.addCommentError = action.error.message;
      })
      .addDefaultCase((draft) => draft),
});

export default postSlice;
