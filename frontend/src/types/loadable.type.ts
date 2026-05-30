export const LOADABLE_STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
} as const;

type LoadableIdle = {
  status: typeof LOADABLE_STATUS.IDLE;
};

type LoadableLoading = {
  status: typeof LOADABLE_STATUS.LOADING;
};

type LoadableLoaded<T> = {
  status: typeof LOADABLE_STATUS.LOADED;
  data: T;
};

type LoadableError = {
  status: typeof LOADABLE_STATUS.ERROR;
  error: string | undefined;
};

export type Loadable<T> =
  | LoadableIdle
  | LoadableError
  | LoadableLoading
  | LoadableLoaded<T>;
