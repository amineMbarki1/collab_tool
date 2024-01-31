import { addMember, getTeam, removeMember } from "@/api/userClient";
import { Status, User } from "@/types";
import { searchUsers } from "@/api/userClient";
import serializeAxiosError from "@/utils/serializeAxiosError";

import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";

interface TeamState {
  status: Status;
  searchUsersStatus: Status;
  addMemberStatus: Record<string, Status>;
  removeMemberStatus: Record<string, Status>;
  members: User[];
  searchedUsers: User[];
}

const initialState: TeamState = {
  status: "idle",
  members: [],
  searchedUsers: [],
  searchUsersStatus: "idle",
  addMemberStatus: {},
  removeMemberStatus: {},
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    resetSearchedUsers: (state) => {
      state.searchUsersStatus = "idle";
      state.searchedUsers = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getTeamAction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getTeamAction.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.members = action.payload;
    });

    builder.addCase(searchUsersAction.pending, (state) => {
      state.searchUsersStatus = "loading";
    });
    builder.addCase(searchUsersAction.fulfilled, (state, action) => {
      state.searchedUsers = action.payload;
      state.searchUsersStatus = "succeeded";
    });
    builder.addCase(searchUsersAction.rejected, (state) => {
      state.searchUsersStatus = "failed";
    });
    builder.addCase(addMemberAction.pending, (state, action) => {
      state.addMemberStatus[action.meta.arg.id] = "loading";
    });
    builder.addCase(addMemberAction.fulfilled, (state, action) => {
      const user = action.meta.arg;
      state.members.push(user);
      // state.searchedUsers = state.searchedUsers.filter(
      //   ({ id }) => id !== user.id
      // );
      state.addMemberStatus[user.id] = "succeeded";
    });
    builder.addCase(addMemberAction.rejected, (state, action) => {
      state.addMemberStatus[action.meta.arg.id] = "failed";
    });

    builder.addCase(removeMemberAction.pending, (state, action) => {
      const user = action.meta.arg;
      state.removeMemberStatus[user.id] = "loading";
    });

    builder.addCase(removeMemberAction.fulfilled, (state, action) => {
      const user = action.meta.arg;
      state.members = state.members.filter(({ id }) => id !== user.id);
      state.removeMemberStatus[user.id] = "succeeded";
    });
  },
});

export const getTeamAction = createAsyncThunk("team/getAllMembers", getTeam, {
  serializeError: serializeAxiosError as (arg: unknown) => SerializedError,
});

export const searchUsersAction = createAsyncThunk(
  "team/searchUsers",
  searchUsers,
  {
    serializeError: serializeAxiosError as (arg: unknown) => SerializedError,
  }
);

export const addMemberAction = createAsyncThunk(
  "team/addMember",
  async (user: User) => await addMember(user.id),
  {
    serializeError: serializeAxiosError as (arg: unknown) => SerializedError,
  }
);

export const removeMemberAction = createAsyncThunk(
  "team/removeMember",
  async (user: User) => removeMember(user.id),
  {
    serializeError: serializeAxiosError as (arg: unknown) => SerializedError,
  }
);

export const { resetSearchedUsers } = teamSlice.actions;

export default teamSlice.reducer;

export function selectUserById(users: User[], id: number) {
  return users.find((user) => user.id === id);
}

export function selectUserExistsById(users: User[], id: number) {
  return users.some((user) => user.id === id);
}
