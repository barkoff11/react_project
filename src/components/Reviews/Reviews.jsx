import React, { useEffect } from "react";
import { Review } from "../Review/Review";
import classnames from "classnames";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurantReviewIdsById } from "../../store/restaurant/selectors";
import { selectIsReviewLoading } from "../../store/review/selectors";
import { fetchReviews } from "../../store/review";
import { fetchUsers } from "../../store/user";
import { useParams } from "react-router-dom";

export const Reviews = ({ className }) => {
  const { restaurantId } = useParams();

  const dispatch = useDispatch();
  const reviews = useSelector((state) =>
    selectRestaurantReviewIdsById(state, { restaurantId })
  );
  const isLoading = useSelector(selectIsReviewLoading);

  useEffect(() => {
    dispatch(fetchReviews(restaurantId));
  }, [restaurantId]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!reviews?.length) {
    return null;
  }

  return (
    <div className={classnames(styles.root, className)}>
      <h2 className={styles.title}>Reviews</h2>
      {reviews.length > 0 ? (
        <div>
          {reviews.map((reviewId) => (
            <Review
              key={reviewId}
              reviewId={reviewId}
              className={styles.review}
            />
          ))}
        </div>
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};
