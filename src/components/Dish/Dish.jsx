import { Button } from "../Button/Button";
import React, { useCallback } from "react";
import { Ingredient } from "../Ingredient/Ingredient";

import styles from "./styles.module.css";
import classnames from "classnames";
import { Size } from "../../constants/ui";
import { useSelector, useDispatch } from "react-redux";
import { selectDishCountById } from "../../store/cart/selectors";
import { selectDishById } from "../../store/dish/selectors";
import { cartSlice } from "../../store/cart";


export const Dish = ({ dishId, className }) => {
  const count = useSelector((state) => selectDishCountById(state, { dishId }));
  const dish = useSelector((state) => selectDishById(state, { dishId }));
  const dispatch = useDispatch();

  const decrement = () => dispatch(cartSlice.actions.removeDish(dish.id));
  const increment = () => dispatch(cartSlice.actions.addDish(dish.id));

  // const selector = useCallback(selectRestaurantRating(), []);

  // const rating = useSelector(selector);

  if (!dish) {
    return null;
  }

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.mainInfo}>
        <span className={styles.title}>{dish.name}</span>
        <div className={styles.controls}>
          <Button onClick={decrement} size={Size.s} borderRadiusSize={Size.s}>
            <span>-</span>
          </Button>
          {count}
          <Button onClick={increment} size={Size.s} borderRadiusSize={Size.s}>
            <span>+</span>
          </Button>
        </div>
      </div>
      {count > 0 && (
        <div className={styles.ingredients}>
          {dish.ingredients.map((ingredient) => (
            <Ingredient
              key={ingredient}
              ingredient={ingredient}
              className={styles.ingredient}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const DishWithMemo = React.memo(Dish);
