import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import { Topic } from "./types";
import {
  addMember,
  createTopic,
  getMembers,
  getTopics,
} from "@/api/topicClient";
import serializeAxiosError from "@/utils/serializeAxiosError";
import { Status, User } from "@/types";

interface TopicsState {
  topics: Topic[];
  status: Status;
  error: SerializedError | null;
  createTopicStatus: Status;
  getTopicsStatus: Status;
  getTopicsError: SerializedError | null;
  addMemberStatus: Record<string, Status>;
  getMembersStatus: Record<string, Status>;
}

const initialState = {
  topics: [],
  status: "idle",
  error: null,
  createTopicStatus: "idle",
  addMemberStatus: {},
  getTopicsError: null,
  getTopicsStatus: "idle",
  getMembersStatus: {},
} as TopicsState;

const topicsSlice = createSlice({
  name: "topics",

  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getTopicsAction.pending, (state) => {
      state.getTopicsStatus = "loading";
    });
    builder.addCase(
      getTopicsAction.fulfilled,
      (state, action: PayloadAction<Topic[]>) => {
        state.getTopicsStatus = "succeeded";
        state.topics = action.payload;
      }
    );
    builder.addCase(createTopicAction.pending, (state) => {
      state.createTopicStatus === "loading";
    });
    builder.addCase(createTopicAction.rejected, (state, action) => {
      state.createTopicStatus = "failed";
      state.error = action.error;
    });
    builder.addCase(
      createTopicAction.fulfilled,
      (state, action: PayloadAction<Topic>) => {
        state.createTopicStatus = "succeeded";
        state.topics.push(action.payload);
      }
    );

    builder.addCase(addNewMemberAction.pending, (state, action) => {
      const { member, topic } = action.meta.arg;
      state.addMemberStatus[`${member.id}` + topic.id] = "loading";
    });
    builder.addCase(addNewMemberAction.fulfilled, (state, action) => {
      const { member, topic } = action.meta.arg;
      state.addMemberStatus[`${member.id}` + topic.id] = "succeeded";
      const found = state.topics.find(({ id }) => id === topic.id);
      found!.members.push(member);
    });

    builder.addCase(addNewMemberAction.rejected, (state, action) => {
      const { member, topic } = action.meta.arg;
      state.addMemberStatus[`${member.id}` + topic.id] = "failed";
      state.error = action.error;
    });

    builder.addCase(getMembersAction.pending, (state, action) => {
      const topicId = action.meta.arg.id;
      state.getMembersStatus[topicId] = "loading";
    });
    builder.addCase(getMembersAction.fulfilled, (state, action) => {
      const topicId = action.meta.arg.id;
      state.getMembersStatus[topicId] = "succeeded";
      const found = state.topics.find(({ id }) => id === topicId);
      found!.members = action.payload;
    });
  },
});

// Thunks

export const createTopicAction = createAsyncThunk(
  "/topics/create",
  createTopic,
  {
    serializeError: serializeAxiosError as (arg: unknown) => SerializedError,
  }
);

export const getTopicsAction = createAsyncThunk("/topics/get", getTopics, {
  serializeError: serializeAxiosError as (arg: unknown) => SerializedError,
});

export const addNewMemberAction = createAsyncThunk(
  "/topics/addMember",
  async ({ topic, member }: { topic: Topic; member: User }) =>
    await addMember({ topicId: topic.id, userId: member.id }),
  { serializeError: serializeAxiosError as (arg: unknown) => SerializedError }
);

export const getMembersAction = createAsyncThunk(
  "/topics/getMembers",
  (topic: Topic) => getMembers(topic.id),
  { serializeError: serializeAxiosError as (arg: unknown) => SerializedError }
);

// Selectors

export function selectTopicById(topics: Topic[], id: number) {
  return topics.find((topic) => topic.id === id);
}

export function selectTopicMemberById(topic: Topic, id: number) {
  return topic.members.find((member) => member.id === id);
}

export function selectTopicMemberExistsById(topic: Topic, id: number) {
  return topic.members.some((member) => member.id === id);
}

export default topicsSlice.reducer;
