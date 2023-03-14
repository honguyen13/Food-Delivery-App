import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import restaurantReducer from "./features/restaurantSlice";
import userReducer from "./features/userSlice";
import themeReducer from "./features/themeSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
    user: userReducer,
    theme: themeReducer,
  },
});
