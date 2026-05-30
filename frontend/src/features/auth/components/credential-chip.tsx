import styles from "./credential-chip.module.scss";
import type { ReactElement } from "react";

type Props = {
  username: string;
  password: string;
  onClick: () => void;
};

export const CredentialChip = ({
  username,
  password,
  onClick,
}: Props): ReactElement => {
  return (
    <button type="button" className={styles.credentialChip} onClick={onClick}>
      {username} · {password}
    </button>
  );
};
