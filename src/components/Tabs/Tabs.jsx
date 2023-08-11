import { Tab } from "../Tab/Tab";
import { useState } from "react";
import styles from "./tabs.module.css";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { selectRestaurantIdsFilteredByName } from "../../store/restaurant/selectors";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

const InputWithDebounce = ({ initialValue, onChange, className }) => {
  const onChangeWithDebounce = useDebouncedCallback(onChange, 1000);
  const [setValue] = useState(initialValue);


  return (
    <input
      // value={search.get("RestaurantName") || ""}
      onChange={(event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChangeWithDebounce()
      }}
      placeholder="Search..."
      className={className}
    />

  );
};
export const Tabs = ({ className }) => {
  const [search, setSearch] = useSearchParams();
  const restaurantIds = useSelector((state) =>
    selectRestaurantIdsFilteredByName(state, {
      searchValue: search.get("restaurantName") || "",
    })
  );

  return (
    <div className={classnames(styles.root, className)}>
      <InputWithDebounce
        initialValue={search.get("restaurantName") || ""}
        onChange={(value) => setSearch({ restaurantName: value })}
        className={styles.searchInput}
      />
      <div>
        {restaurantIds.map((restaurantId) => (
          <Tab
            key={restaurantId}
            restaurantId={restaurantId}
            className={styles.tab}
          />
        ))}
      </div>
    </div>
  );
};
