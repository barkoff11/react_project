import { LoadingStatuses } from "../constants/statuses";
import { createSelector } from "@reduxjs/toolkit";
import { selectReviewEntities } from "../review/selectors";

export const selectRestaurantModule = (state) => state.restaurant;

export const selectRestaurantEntities = (state) =>
  selectRestaurantModule(state).entities;

export const selectRestaurantIds = (state) => selectRestaurantModule(state).ids;

export const selectRestaurantIdsFilteredByName = createSelector(
  [selectRestaurantEntities, (_, { searchValue }) => searchValue],
  (entities, searchValue) =>
    Object.values(entities).reduce((acc, { id, name }) => {
      if (name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
        acc.push(id);
      }
      return acc;
    }, [])
);

export const selectRestaurantById = (state, { restaurantId }) =>
  selectRestaurantEntities(state)[restaurantId];

export const selectRestaurantDishIdsById = (state, { restaurantId }) =>
  selectRestaurantById(state, { restaurantId })?.menu;

export const selectRestaurantReviewIdsById = (state, { restaurantId }) =>
  selectRestaurantById(state, { restaurantId })?.reviews;

export const selectRestaurantLoadingStatuses = (state) =>
  selectRestaurantModule(state).status;
export const selectIsRestaurantLoading = (state) =>
  selectRestaurantLoadingStatuses(state) === LoadingStatuses.inProgress;

export const selectRestaurantRating = createSelector([selectReviewEntities, selectRestaurantReviewIdsById],
  (reviewEntities, restaurantReviewIds) => {
    if (!restaurantReviewIds?.length) {
      return 0;
    }

    if (!restaurantReviewIds.every(id => reviewEntities[id])) {
      return 0;
    }
    return Math.floor(
      restaurantReviewIds.reduce(
        (sum, id) => sum + reviewEntities[id].rating, 0) /
      restaurantReviewIds.length
    );
  }
);