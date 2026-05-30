import type { ChangeEvent, ReactElement, SubmitEvent } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { authSlice } from "../store/auth.slice";
import { LOADABLE_STATUS } from "../../../types/loadable.type";
import { DemoAccounts } from "./demo-accounts";
import styles from "./login-form.module.scss";

export const LoginForm = (): ReactElement => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) =>
    authSlice.selectors.getAuth(state.auth),
  );

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);

  const isLoading = authState.status === LOADABLE_STATUS.LOADING;
  const error =
    authState.status === LOADABLE_STATUS.ERROR ? authState.error : undefined;

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    dispatch(authSlice.actions.loginThunk({ username, password }));
  };

  const handleDemoSelect = (
    selectedUsername: string,
    selectedPassword: string,
  ) => {
    setUsername(selectedUsername);
    setPassword(selectedPassword);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((show) => !show);
  };

  const passwordInputType = showPassword ? "text" : "password";
  const passwordToggleLabel = showPassword ? "HIDE" : "SHOW";
  const submitLabel = isLoading ? "Signing in…" : "Sign in";

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.loginFormField}>
        <label className={styles.loginFormLabel} htmlFor="username">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="admin"
          className={styles.loginFormInput}
        />
      </div>

      <div className={styles.loginFormField}>
        <label className={styles.loginFormLabel} htmlFor="password">
          PASSWORD
        </label>
        <div className={styles.loginFormPasswordWrap}>
          <input
            id="password"
            type={passwordInputType}
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            className={styles.loginFormInput}
          />
          <button
            type="button"
            className={styles.loginFormPasswordToggle}
            onClick={handleTogglePassword}
          >
            {passwordToggleLabel}
          </button>
        </div>
      </div>

      {error && <div className={styles.loginFormError}>{error}</div>}

      <button
        type="submit"
        className={styles.loginFormSubmit}
        disabled={isLoading}
      >
        {submitLabel}
      </button>

      <DemoAccounts onSelect={handleDemoSelect} />
    </form>
  );
};
