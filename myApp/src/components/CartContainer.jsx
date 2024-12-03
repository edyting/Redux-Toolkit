import React from 'react'
import CartItem from './CartItem';
import { useSelector,useDispatch } from 'react-redux';
import { clearCart } from '../redux/features/cart/cartSlice';

const CartContainer = () => {
    const dispatch = useDispatch();


    const {cartItems,amount,total,}=useSelector((store)=>store.cart)

    if(amount < 1){
        return(
            <section className='cart'>
                <header>
                    <h2>Your bag</h2>
                    <h4 className='empty-cart'>is currently empty</h4>
                </header>
            </section>
        )
    }

  return (
    <section className='cart'>
      <header>
        <h2>your bag</h2>
      </header>
      <div className="">
        {cartItems.map((item)=>(
            <CartItem key={item.id} {...item}/> //{...item} is a spread opterator to get the rest of the items
        ))}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
        <h4>total <span>${total}</span></h4>
        </div>
        <button className='btn clear-btn' onClick={()=>dispatch(clearCart())}>Clear cart</button>
      </footer>
     
    </section>
  )
}

export default CartContainer
