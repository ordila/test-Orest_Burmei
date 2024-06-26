import { FC, useEffect } from "react";

import styles from "./Home.module.scss";

import { useAppDispatch, useAppSelector } from "@/hooks";

import { fetchProducts } from "@/redux/thunk";

import { Loader, ProductCardGrid } from "@/components";

export const Home: FC = () => {
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "failed") {
    return <div>Error fetching products.</div>;
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to My App!</h1>

      <ProductCardGrid />
    </div>
  );
};
