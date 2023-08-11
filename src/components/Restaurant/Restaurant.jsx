import { Rating } from "../Rating/Rating";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurantById, selectRestaurantRating } from "../../store/restaurant/selectors";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { fetchReviews } from "../../store/review";
import { useEffect } from "react";
import { MenuWithAutorization } from "../Menu/Menu";
import { Reviews } from "../Reviews/Reviews";



// const CustomInput = () => {
//   const [value, setValue] = useState("");
//   return (
//     <>
//       <span>{value}</span>
//       <input value={value} onChange={(event) => setValue(event.target.value)} />
//     </>
//   )
// }

export const Restaurant = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) =>
    selectRestaurantById(state, { restaurantId })
  );
  const rating = useSelector((state) =>
    selectRestaurantRating(state, { restaurantId })
  );


  useEffect(() => {
    dispatch(fetchReviews(restaurantId));
  }, [restaurantId]);




  if (!restaurant) {
    return <span>NotFound</span>;
  }

  return (
    <div>
      {/* <CustomInput /> */}
      <h1>{restaurant.name}</h1>
      <Rating value={rating} />

      <ul>
        <li>
          <NavLink to="menu">Menu</NavLink>
        </li>
        <li>
          <NavLink to="reviews" >Reviews</NavLink>
        </li>
      </ul>

      <div className={styles.mainContent}>
        <Outlet />
      </div>
      {/* <MenuWithAutorization restaurantId={restaurantId} className={styles.menu} />

      <Reviews restaurantId={restaurantId} className={styles.review} /> */}


    </div>
  );
};
