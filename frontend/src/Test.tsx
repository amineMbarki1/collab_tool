import { useEffect } from "react";

import { useAppStore } from "./hooks";
import { connectAction } from "./features/notifications";

export default function Test() {
  const { dispatch } = useAppStore();
  useEffect(() => {
    dispatch(connectAction());
  }, [dispatch]);

  return null;
}
