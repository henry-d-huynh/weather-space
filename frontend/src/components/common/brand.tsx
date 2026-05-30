import styles from "./brand.module.scss";
import type { ReactElement } from "react";

export const Brand = (): ReactElement => {
  return (
    <div className={styles.brand}>
      <div className={styles.brandLogo} />
      <span className={styles.brandName}>
        WEATHER <strong>SPACE</strong>
      </span>
    </div>
  );
};
