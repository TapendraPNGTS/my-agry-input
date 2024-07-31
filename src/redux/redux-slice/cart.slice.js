import { createSlice } from "@reduxjs/toolkit";
import {
  getCartLocal,
  setCartLocal,
  getPriceLocal,
  setPriceLocal,
  getGSTLocal,
  setGSTLocal
} from "../../utils/localStorage.util";
// import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Cart: getCartLocal() ? getCartLocal() : [],
  TotalPrice: getPriceLocal() ? getPriceLocal() : 0,
  GSTMain: getGSTLocal() ? getGSTLocal() : 0,

};

const cartSystem = createSlice({
  name: "cartData",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      const { ProductID, CoverImage, Price, Name, Quantity, GST } =
        action.payload;
      console.log(action.payload ,"REDUX");
      const existingProduct = state.Cart.find(
        (item) => item.ProductID === ProductID
      );
      if (existingProduct) {
        existingProduct.Quantity = Quantity;
        existingProduct.GSTPrice = parseFloat(parseFloat(parseFloat(existingProduct.Quantity * existingProduct.Price) * existingProduct.GST / 100).toFixed(0)),
          existingProduct.TotalPrice = (existingProduct.Quantity * existingProduct.Price);
        // console.log((existingProduct.Quantity * existingProduct.Price) * GST / 100, 'existingProduct.gst');
        // console.log((existingProduct.Quantity * existingProduct.Price) * GST / 100 + existingProduct.Price, 'price.gst');

      } else {
        const newProduct = {
          ProductID,
          CoverImage,
          Price,
          Name,
          Quantity,
          GST : GST,
          GSTPrice : parseFloat(parseFloat((Price*GST)/100).toFixed(0)),
          TotalPrice: Price, // Initial total Price is the product Price itself
        };
        state.Cart.push(newProduct);
      }
      state.TotalPrice = state.Cart.reduce((total, product) => total + product.TotalPrice, 0);
      state.GSTMain = state.Cart.reduce((total, product) => total + product.GSTPrice, 0);
      setGSTLocal(state.GSTMain);
      setCartLocal(state.Cart);
      setPriceLocal(state.TotalPrice);
    },
    removeCart: (state, action) => {
      const { ProductID, Price, Quantity,GST } = action.payload;

      // Find the product to remove
      const productToRemove = state.Cart.find(
        (item) => item.ProductID === ProductID
      );

      if (productToRemove) {
        // Calculate the total Price to subtract
        const totalPriceToRemove = Quantity * Price;
        const gst = parseFloat(parseFloat(totalPriceToRemove *GST)/100);
        // Update the TotalPrice
        state.TotalPrice -= totalPriceToRemove;
        state.GSTMain -= gst;

        // Remove the product from the cart
        state.Cart = state.Cart.filter((item) => item.ProductID !== ProductID);

        setCartLocal(state.Cart);
        setPriceLocal(state.TotalPrice);
        setGSTLocal(state.GSTMain);

      }
    },
    resetCart: (state, action) => {
      state.Cart = [];
      state.GSTMain = 0;
      state.TotalPrice = 0;
    },
  },
});
export const { updateCart, removeCart, resetCart } = cartSystem.actions;
export default cartSystem.reducer;
