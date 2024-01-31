import useAppDispatch from "./UseAppDispatch";
import useAppSelector from "./UseAppSelector";

export default function useAppStore() {
  const dispatch = useAppDispatch();

  return { dispatch, useAppSelector };
}
