import { configureStore ,getDefaultMiddleware} from "@reduxjs/toolkit";
import userReducer from "../redux-slice/user.slice";
import productReducer from "../redux-slice/product.slice";
import cartReducer from "../redux-slice/cart.slice"
import stateReducer from "../redux-slice/state.slice"
import categoriesReducer from "../redux-slice/categories.slice"
import wishlistReducer from "../redux-slice/wishlist.slice";
import addressReducer from "../redux-slice/address.slice";
import orderReducer from "../redux-slice/order.slice";
import viewReducer from "../redux-slice/viewCart.slice";
import locationReducer from "../redux-slice/location.slice";
import formReducer from '../redux-slice/editfield.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    categories: categoriesReducer, // Renamed to ""
    cart: cartReducer,
    state: stateReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    order: orderReducer,
    viewCarts: viewReducer,
    location: locationReducer,
    editField: formReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  //   serializableCheck: {
  //     ignoredActions: ['your/action/type'], 
  //   },
  // }),
}); 