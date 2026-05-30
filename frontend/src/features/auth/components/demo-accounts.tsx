import type { ReactElement } from "react";
import { CredentialChip } from "./credential-chip";
import styles from "./demo-accounts.module.scss";
import { DEMO_ACCOUNTS } from "@weather-space/shared";

type Props = {
  onSelect: (username: string, password: string) => void;
};

export const DemoAccounts = ({ onSelect }: Props): ReactElement => {
  const credentialChips = DEMO_ACCOUNTS.map(({ username, password }) => (
    <CredentialChip
      key={username}
      username={username}
      password={password}
      onClick={() => onSelect(username, password)}
    />
  ));

  return (
    <div className={styles.demoAccounts}>
      <span className={styles.demoAccountsLabel}>Demo accounts</span>
      <div className={styles.demoAccountsChips}>{credentialChips}</div>
    </div>
  );
};
