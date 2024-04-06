import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import serializeAxiosError from "@/utils/serializeAxiosError";
import { Status } from "@/types";
import { Post } from "./types";
import { createPost, getAllPostsByTopicId } from "@/api/postClient";
import { RootState } from "@/store";

interface PostsState {
  posts: Post[];
  createPostStatus: Status;
  getPostsStatus: Record<string, Status>;
  error: SerializedError | null;
}

const initialState = {
  posts: [],
  createPostStatus: "idle",
  getPostsStatus: {},
  error: null,
} as PostsState;

const postsSlice = createSlice({
  reducers: {},
  name: "post",
  initialState,
  selectors: {
    selectPostById: (state, id: number) =>
      state.posts.find((post) => post.id === id),
  },
  extraReducers(builder) {
    builder.addCase(createPostAction.pending, (state) => {
      state.createPostStatus = "loading";
    });

    builder.addCase(
      createPostAction.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.createPostStatus = "succeeded";
        state.posts.push(action.payload);
      }
    );
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.createPostStatus = "failed";
      state.error = action.error;
    });

    builder.addCase(getAllPostsAction.pending, (state, action) => {
      state.getPostsStatus[action.meta.arg.topicId] = "loading";
    });
    builder.addCase(getAllPostsAction.fulfilled, (state, action) => {
      state.getPostsStatus[action.meta.arg.topicId] = "succeeded";
      state.posts = action.payload;
    });
  },
});

export const createPostAction = createAsyncThunk("/posts/create", createPost, {
  serializeError: serializeAxiosError as (arg: unknown) => SerializedError,
});

export const getAllPostsAction = createAsyncThunk(
  "/posts/get",
  getAllPostsByTopicId,
  {
    serializeError: serializeAxiosError as (arg: unknown) => SerializedError,
  }
);

export function selectPostsByTopicId(state: RootState, topicId: number) {
  return state.post.posts.filter((post) => post.topicId === topicId);
}

export const { selectPostById } = postsSlice.selectors;

export default postsSlice.reducer;
