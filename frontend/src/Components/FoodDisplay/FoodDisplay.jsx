import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list
          .filter(
            (item) => item && (category === "All" || category === item.category)
          ) // skip undefined
          .map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name || "Unnamed"}
              description={item.description || "No description"}
              price={item.price ?? 20} // default if undefined
              image={item.image || ""}
            />
          ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
