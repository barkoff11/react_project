import React from "react";
import { Dish } from "../Dish/Dish";

export const Menu = ({ menu }) => {
  return (
    <div>
      <h3>Menu</h3>
      {menu.length > 0 ? (
        <ul>
          {menu.map((dish) => (
            <li key={dish.id}>
              <Dish dish={dish} />
            </li>
          ))}
        </ul>
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};
