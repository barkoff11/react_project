import React, { useEffect } from "react";
import { Tabs } from "../../components/Tabs/Tabs";

import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRestaurantLoading } from "../../store/restaurant/selectors";
import { fetchRestaurants } from "../../store/restaurant";
import { Outlet } from "react-router-dom";

export const RestaurantPage = () => {
  const isLoading = useSelector(selectIsRestaurantLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.root}>
      <Tabs className={styles.tabs} />
      <Outlet />
    </div>
  );
};
