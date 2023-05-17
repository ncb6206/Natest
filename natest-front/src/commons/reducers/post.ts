import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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

const loadPostsThrottle = async (lastId: string) => {
  const response = await axios.get(`/posts?lastId=${lastId || 0}`);
  return response.data;
};
//  createAsyncThunk를 사용하여 Redux에서 비동기 작업 처리, `_.throttle` 함수를 사용하여 서버로의 요청을 1초당 최대 1회로 제한
export const loadPosts = createAsyncThunk("post/loadPosts", _.throttle(loadPostsThrottle, 2000));

const loadHashtagPostsThrottle = async ({ lastId, tag }: { lastId: string; tag: string }) => {
  const response = await axios.get(`/hashtag/${encodeURIComponent(tag)}?lastId=${lastId || 0}`);
  return response.data;
};
export const loadHashtagPosts = createAsyncThunk(
  "post/loadHashtagPosts",
  _.throttle(loadHashtagPostsThrottle, 2000)
);

const loadUserPostsThrottle = async ({ lastId, id }: { lastId: string; id: string }) => {
  const response = await axios.get(`/user/${id}/posts?lastId=${lastId || 0}`);
  return response.data;
};
export const loadUserPosts = createAsyncThunk(
  "post/loadUserPosts",
  _.throttle(loadUserPostsThrottle, 2000)
);

export const retweet = createAsyncThunk("post/retweet", async (data) => {
  const response = await axios.post(`/post/${data}/retweet`);
  return response.data;
});

export const uploadImage = createAsyncThunk("post/uploadImage", async (data) => {
  const response = await axios.post("/post/images", data);
  return response.data;
});

export const likePost = createAsyncThunk("post/likePost", async (data) => {
  const response = await axios.patch(`/post/${data}/like`);
  return response.data;
});

export const unlikePost = createAsyncThunk("post/unlikePost", async (data) => {
  const response = await axios.delete(`/post/${data}/like`);
  return response.data;
});

export const loadPost = createAsyncThunk("post/loadPost", async (data) => {
  const response = await axios.get(`/post/${data}`);
  return response.data;
});

export const addPost = createAsyncThunk("post/addPost", async (data) => {
  const response = await axios.post("/post", data);
  return response.data;
});

export const updatePost = createAsyncThunk(
  "post/upadatePost",
  async (data: { PostId: string; content: string }) => {
    const response = await axios.patch(`/post/${data.PostId}`, data);
    return response.data;
  }
);

export const removePost = createAsyncThunk("post/removePost", async (data: { PostId: string }) => {
  const response = await axios.delete(`/post/${data.PostId}`);
  return response.data;
});

export const addComment = createAsyncThunk(
  "post/addComment",
  async (data: { content: string; PostId: string; userId: string }) => {
    const response = await axios.post(`/post/${data.PostId}/comment`, data);
    return response.data;
  }
);

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수 (불변성은 지키면서)
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removeImage(state, action) {
      state.imagePaths = state.imagePaths.filter((v, i) => i !== action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase([HYDRATE], (state: any, action: PayloadAction<any>) => ({
        ...state,
        ...action.payload.post,
      }))
      .addCase(retweet.pending, (state, action) => {
        state.retweetLoading = true;
        state.retweetDone = false;
        state.retweetError = null;
      })
      .addCase(retweet.fulfilled, (state, action) => {
        state.retweetLoading = false;
        state.retweetDone = true;
        state.mainPosts.unshift(action.data);
      })
      .addCase(retweet.rejected, (state, action) => {
        state.retweetLoading = false;
        state.retweetError = action.error.message;
      })
      .addCase(uploadImage.pending, (draft, action) => {
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
      })
      .addCase(uploadImage.fulfilled, (draft, action) => {
        draft.imagePaths = draft.imagePaths.concat(action.data);
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
      })
      .addCase(uploadImage.rejected, (draft, action) => {
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error.message;
      })
      .addCase(likePost.pending, (draft, action) => {
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
      })
      .addCase(likePost.fulfilled, (draft, action) => {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post?.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
      })
      .addCase(likePost.rejected, (draft, action) => {
        draft.likePostLoading = false;
        draft.likePostError = action.error.message;
      })
      .addCase(unlikePost.pending, (draft, action) => {
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
      })
      .addCase(unlikePost.fulfilled, (draft, action) => {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post && (post.Likers = post?.Likers.filter((v) => v.id !== action.data.UserId));
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
      })
      .addCase(unlikePost.rejected, (draft, action) => {
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error.message;
      })
      .addCase(loadPost.pending, (draft, action) => {
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
      })
      .addCase(loadPost.fulfilled, (draft, action) => {
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
      })
      .addCase(loadPost.rejected, (draft, action) => {
        draft.loadPostLoading = false;
        draft.loadPostError = action.error.message;
      })
      .addCase(loadPosts.pending, (state, action) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = state.mainPosts.concat(action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
      .addCase(loadUserPosts.pending, (state, action) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = state.mainPosts.concat(action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadUserPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
      .addCase(loadHashtagPosts.pending, (state, action) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadHashtagPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = state.mainPosts.concat(action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadHashtagPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
      .addCase(addPost.pending, (draft, action) => {
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
      })
      .addCase(addPost.fulfilled, (draft, action) => {
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
      })
      .addCase(addPost.rejected, (draft, action) => {
        draft.addPostLoading = false;
        draft.addPostError = action.error.message;
      })
      .addCase(updatePost.pending, (draft, action) => {
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
      })
      .addCase(updatePost.fulfilled, (draft, action) => {
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        draft.mainPosts.find((v) => v.id === action.data.PostId).content = action.data.content;
      })
      .addCase(updatePost.rejected, (draft, action) => {
        draft.updatePostLoading = false;
        draft.updatePostError = action.error.message;
      })
      .addCase(removePost.pending, (draft, action) => {
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
      })
      .addCase(removePost.fulfilled, (draft, action) => {
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
      })
      .addCase(removePost.rejected, (draft, action) => {
        draft.removePostLoading = false;
        draft.removePostError = action.error.message;
      })
      .addCase(addComment.pending, (draft, action) => {
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
      })
      .addCase(addComment.fulfilled, (draft, action) => {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        console.log("draft", draft, "post", post, "Comments", post?.Comments);
        post?.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
      })
      .addCase(addComment.rejected, (draft, action) => {
        draft.addCommentLoading = false;
        draft.addCommentError = action.error.message;
      })
      .addDefaultCase((state) => state),
});

export default postSlice;
