export const LOADABLE_STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
} as const;

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

export type Loadable<T> = LoadableError | LoadableLoading | LoadableLoaded<T>;
