import type { ReactElement } from "react";
import { Brand } from "../../../components/common/brand";
import { LoginForm } from "./login-form";
import styles from "./login-page.module.scss";

export const LoginPage = (): ReactElement => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginPageCard}>
        <Brand />
        <h1 className={styles.loginPageTitle}>Sign in.</h1>
        <p className={styles.loginPageLede}>
          Live conditions and real-time weather alerts, on one sky.
        </p>
        <LoginForm />
      </div>
    </div>
  );
};
