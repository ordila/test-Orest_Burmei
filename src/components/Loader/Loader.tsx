import { FC } from "react";

import { InfinitySpin } from "react-loader-spinner";

import styles from "./Loader.module.scss";

export const Loader: FC = () => {
  return (
    <div className={styles.loader_wrapper}>
      <InfinitySpin color="#4fa94d" />
    </div>
  );
};
