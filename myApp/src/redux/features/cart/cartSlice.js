import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    cartItems:[],
    amount:2,
    total:0,
    isLoading:true,
};
// async operation in redux toolkit
const url = 'https://www.course-api.com/react-useReducer-cart-projects';

//**** this is the basic method */
// export const getCartItems = createAsyncThunk('cart/getCartItems',()=>{
//     return fetch(url)
//     .then((res)=>res.json())
//     .catch((err)=>console.log(err));
// });

export const getCartItems = createAsyncThunk('cart/getCartItems',async(name,thunkAPI)=>{
    try {
        const res = await axios(url);
        return res.data; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
});



const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{   //action that empties the cartItems
        clearCart:(state)=>{
            state.cartItems=[];
        },
        removeItem:(state,action)=>{
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item)=>{return itemId !== item.id}) //delete logic {filter returns what passes the condition}
        },
        increase:(state,action)=>{
            const id = action.payload;
            const cartItem = state.cartItems.find((item)=>item.id === id);
            cartItem.amount = cartItem.amount +1;
            // console.log(id)
        },
        decrease:(state,{payload})=>{
            // since payload is recieved as an object, the parameter has to be an object
            // get the item you want to update and work on the property you want to modify
            const cartItem = state.cartItems.find((item)=> item.id === payload.id);
            cartItem.amount = cartItem.amount -1;
        },
        calculateTotals:(state)=>{
            let amount =0;
            let total =0;
            state.cartItems.forEach((item)=>{
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers:{
        [getCartItems.pending]:(state)=>{
            state.isLoading = true
        },
        [getCartItems.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]:(state,action)=>{
            console.log(action.payload)
            state.isLoading = false;
        },
    }
});

// console.log(cartSlice) 
export const {clearCart,removeItem,increase,decrease,calculateTotals} = cartSlice.actions; 

export default cartSlice.reducer;