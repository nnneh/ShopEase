import { createSlice } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: number;
}


interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
    };

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },
  },
});

export const { setProducts, addProduct } = productSlice.actions;

export default productSlice.reducer;
