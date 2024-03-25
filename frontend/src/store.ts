import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./features/auth";
import { teamReducer } from "./features/team";
import { topicsReducer, postsReducer } from "./features/topics";
import { notificationsReducer } from "./features/notifications";
import { chatReducer } from "./features/chat";
import { sideSectionReducer } from "./components/Layout";

const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    topic: topicsReducer,
    post: postsReducer,
    notification: notificationsReducer,
    chat: chatReducer,
    sidesection: sideSectionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
