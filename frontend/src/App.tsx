import { useAppSelector } from "./store/hooks";
import { authSlice } from "./features/auth/store/auth.slice";
import { LOADABLE_STATUS } from "./types/loadable.type";

export const App = () => {
  const authState = useAppSelector((state) =>
    authSlice.selectors.getAuth(state.auth),
  );

  if (authState.status !== LOADABLE_STATUS.LOADED) {
    return <div>Login page goes here</div>;
  }

  return <div>Home page goes here</div>;
};
