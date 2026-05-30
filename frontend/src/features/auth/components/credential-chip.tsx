import styles from "./credential-chip.module.scss";
import type { ReactElement } from "react";

type CredentialChipProps = {
  username: string;
  password: string;
  onClick: () => void;
};

export const CredentialChip = ({
  username,
  password,
  onClick,
}: CredentialChipProps): ReactElement => {
  return (
    <button type="button" className={styles.credentialChip} onClick={onClick}>
      {username} · {password}
    </button>
  );
};
