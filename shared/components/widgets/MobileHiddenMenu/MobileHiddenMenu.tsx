"use client";

import styles from "./MobileHiddenMenu.module.css";

type MobileHiddenMenuProps = {
  children: React.ReactNode;
};

export const MobileHiddenMenu: React.FC<MobileHiddenMenuProps> = ({
  children,
}) => {
  return <div className={styles.menu}>{children}</div>;
};
